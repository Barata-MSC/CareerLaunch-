import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const babel = require('@babel/core');
const expoPreset = require('babel-preset-expo');
const commonJsPlugin = require('@babel/plugin-transform-modules-commonjs');
const parser = require('@babel/parser');

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(
  projectRoot,
  'src/features/learning-hub/careers/registry.js',
);
const careersPath = path.join(
  projectRoot,
  'src/features/learning-hub/careers/careers.js',
);
const navigatorPath = path.join(projectRoot, 'src/navigation/AppNavigator.js');
const issues = [];
const warnings = [];
const moduleCache = new Map();
globalThis.__DEV__ = false;
const CYBERSECURITY_ALLOWED_DOMAINS = [
  'nist.gov',
  'cisa.gov',
  'owasp.org',
  'ncsc.gov.uk',
  'cloudflare.com',
  'privacy.gov.ph',
];

const ReactMock = {
  createElement: () => null,
  useCallback: (callback) => callback,
  useMemo: (callback) => callback(),
  useRef: (current) => ({ current }),
  useState: (value) => [value, () => {}],
};

const nullComponent = () => null;
const reactNativeMock = new Proxy(
  {
    Dimensions: { get: () => ({ height: 800, width: 400 }) },
    PanResponder: { create: () => ({ panHandlers: {} }) },
    Platform: { OS: 'web', select: (options) => options.web ?? options.default },
    StyleSheet: { create: (styles) => styles, hairlineWidth: 1 },
    StatusBar: { currentHeight: 0 },
  },
  {
    get(target, key) {
      return target[key] ?? nullComponent;
    },
  },
);

function resolveLocalModule(specifier, parentPath) {
  const basePath = path.resolve(path.dirname(parentPath), specifier);
  const candidates = [basePath, `${basePath}.js`, `${basePath}.mjs`, path.join(basePath, 'index.js')];
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
}

function loadSourceModule(filePath) {
  const absolutePath = path.resolve(filePath);
  if (moduleCache.has(absolutePath)) return moduleCache.get(absolutePath).exports;

  const module = { exports: {} };
  moduleCache.set(absolutePath, module);

  const transformed = babel.transformFileSync(absolutePath, {
    babelrc: false,
    configFile: false,
    filename: absolutePath,
    plugins: [commonJsPlugin],
    presets: [expoPreset],
    sourceType: 'unambiguous',
  });

  const localRequire = (specifier) => {
    if (specifier === 'react') return ReactMock;
    if (specifier === 'react/jsx-runtime') {
      return { Fragment: null, jsx: nullComponent, jsxs: nullComponent };
    }
    if (specifier === 'react-native') return reactNativeMock;
    if (specifier === 'react-native-safe-area-context') return { SafeAreaView: nullComponent };
    if (specifier === '@react-navigation/native') return { useFocusEffect: () => {} };
    if (specifier === '@config/supabase') return { supabase: {} };
    if (specifier.startsWith('@babel/runtime/')) return require(specifier);

    const aliasRoots = {
      '@assets/': 'src/assets/',
      '@components/': 'src/components/',
      '@config/': 'src/config/',
      '@features/': 'src/features/',
    };
    const alias = Object.entries(aliasRoots).find(([prefix]) => specifier.startsWith(prefix));
    if (alias) {
      const [, root] = alias;
      const aliasedPath = path.join(projectRoot, root, specifier.slice(alias[0].length));
      const resolvedAlias = [aliasedPath, `${aliasedPath}.js`, path.join(aliasedPath, 'index.js')]
        .find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
      if (!resolvedAlias) throw new Error(`Cannot resolve alias ${specifier}`);
      return loadSourceModule(resolvedAlias);
    }

    const resolvedPath = resolveLocalModule(specifier, absolutePath);
    if (!resolvedPath) {
      throw new Error(`Cannot resolve ${specifier} from ${path.relative(projectRoot, absolutePath)}`);
    }

    if (path.basename(resolvedPath).endsWith('Course.js')) {
      return { __esModule: true, default: nullComponent };
    }
    if (resolvedPath.endsWith(`${path.sep}src${path.sep}utils${path.sep}sounds.js`)) {
      return { playSound: () => {} };
    }

    return loadSourceModule(resolvedPath);
  };

  const execute = new Function('require', 'module', 'exports', transformed.code);
  execute(localRequire, module, module.exports);
  return module.exports;
}

function collectStaticStackRouteNames(source) {
  const ast = parser.parse(source, { sourceType: 'module', plugins: ['jsx'] });
  const names = new Set();

  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (
      node.type === 'JSXOpeningElement' &&
      node.name.type === 'JSXMemberExpression' &&
      node.name.object.name === 'Stack' &&
      node.name.property.name === 'Screen'
    ) {
      const nameAttribute = node.attributes.find(
        (attribute) => attribute.type === 'JSXAttribute' && attribute.name.name === 'name',
      );
      if (nameAttribute?.value?.type === 'StringLiteral') names.add(nameAttribute.value.value);
    }

    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  }

  visit(ast);
  return names;
}

function requireValue(condition, message) {
  if (!condition) issues.push(message);
}

function validateRegistry(registry, careers) {
  const trackEntries = registry.CAREER_CONTENT.flatMap((career) =>
    Object.entries(career.tracks).map(([id, track]) => ({ id, track, careerId: career.careerId })),
  );
  const courseEntries = registry.COURSE_ENTRIES;
  const courseById = new Map();
  const routeNames = new Set();
  const trackIds = new Set();
  const careerIds = new Set();
  const staticRoutes = collectStaticStackRouteNames(fs.readFileSync(navigatorPath, 'utf8'));

  careers.forEach((career) => {
    requireValue(!careerIds.has(career.id), `Duplicate career id: ${career.id}`);
    careerIds.add(career.id);
    requireValue(Array.isArray(career.trackIds), `Career trackIds must be an array: ${career.id}`);
    if (!Array.isArray(career.trackIds)) return;

    if (career.status === 'available') {
      requireValue(career.trackIds.length > 0, `Available career has no tracks: ${career.id}`);
    }
    career.trackIds.forEach((trackId) => {
      requireValue(Boolean(registry.TRACKS[trackId]), `Unresolved track id for ${career.id}: ${trackId}`);
    });
  });

  trackEntries.forEach(({ id }) => {
    requireValue(!trackIds.has(id), `Duplicate track id: ${id}`);
    trackIds.add(id);
  });

  courseEntries.forEach(({ course, routeName }) => {
    if (!course?.id) {
      issues.push(`Course entry has no id or config for route ${routeName || '(missing)'}`);
      return;
    }
    requireValue(!courseById.has(course.id), `Duplicate course id: ${course.id}`);
    requireValue(Boolean(routeName), `Course has no route name: ${course.id}`);
    requireValue(!routeNames.has(routeName), `Duplicate course route name: ${routeName}`);
    requireValue(!staticRoutes.has(routeName), `Course route duplicates a static AppNavigator route: ${routeName}`);
    courseById.set(course.id, { course, routeName });
    routeNames.add(routeName);
  });

  trackEntries.forEach(({ id: trackId, track }) => {
    (track.steps || []).forEach((step) => {
      if (!step.course) return;
      const registeredCourse = courseById.get(step.course.id);
      requireValue(Boolean(registeredCourse), `Track ${trackId} references unknown course: ${step.course.id}`);
      requireValue(Boolean(step.route), `Track ${trackId} course has no route: ${step.course.id}`);
      if (registeredCourse) {
        requireValue(
          registeredCourse.routeName === step.route,
          `Route mismatch for ${step.course.id}: track uses ${step.route}, registry uses ${registeredCourse.routeName}`,
        );
      }
    });
  });

  const supportedActivityTypes = new Set([
    'miniSheet',
    'quickCheck',
    'playground',
    'jsRunner',
    'reactRunner',
    'order',
    'pyRunner',
    'visualBuilder',
    'matchPairs',
  ]);

  courseById.forEach(({ course }, courseId) => {
    const lessonIds = new Set();
    const questionsByLesson = new Map();
    const questionTexts = new Set();
    const correctCounts = [0, 0, 0, 0];
    const referenceUrlCounts = new Map();

    (course.lessons || []).forEach((lesson) => {
      requireValue(Boolean(lesson.id), `Course ${courseId} has a lesson with no id`);
      requireValue(!lessonIds.has(lesson.id), `Course ${courseId} has duplicate lesson id: ${lesson.id}`);
      lessonIds.add(lesson.id);
      ['title', 'subtitle', 'contentTitle', 'description'].forEach((field) => {
        requireValue(
          typeof lesson[field] === 'string' && lesson[field].trim().length > 0,
          `Course ${courseId}, lesson ${lesson.id || '(missing id)'} has no ${field}`,
        );
      });

      (lesson.activities || []).forEach((activity) => {
        requireValue(
          supportedActivityTypes.has(activity.type),
          `Course ${courseId}, lesson ${lesson.id} has unsupported activity type: ${activity.type}`,
        );
      });

      if (courseId.startsWith('cyber-')) {
        const references = Array.isArray(lesson.references) ? lesson.references : [];
        requireValue(
          references.length > 0,
          `Course ${courseId}, lesson ${lesson.id} has no references`,
        );
        const lessonUrls = new Set();
        references.forEach((reference) => {
          requireValue(
            typeof reference.text === 'string' && reference.text.trim().length > 0,
            `Course ${courseId}, lesson ${lesson.id} has a reference with no text`,
          );
          requireValue(
            typeof reference.url === 'string' && reference.url.startsWith('https://'),
            `Course ${courseId}, lesson ${lesson.id} has a reference without an https URL`,
          );
          if (typeof reference.url !== 'string') return;

          let hostname = '';
          try {
            hostname = new URL(reference.url).hostname.toLowerCase();
          } catch {
            issues.push(`Course ${courseId}, lesson ${lesson.id} has an invalid reference URL: ${reference.url}`);
          }
          requireValue(
            CYBERSECURITY_ALLOWED_DOMAINS.some(
              (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
            ),
            `Course ${courseId}, lesson ${lesson.id} uses a domain outside the cybersecurity allowlist: ${reference.url}`,
          );
          requireValue(
            !lessonUrls.has(reference.url),
            `Course ${courseId}, lesson ${lesson.id} has a duplicate reference URL: ${reference.url}`,
          );
          lessonUrls.add(reference.url);
          referenceUrlCounts.set(reference.url, (referenceUrlCounts.get(reference.url) || 0) + 1);
        });

        if (lesson.video) {
          requireValue(
            typeof lesson.video.id === 'string' && /^[\w-]{11}$/.test(lesson.video.id),
            `Course ${courseId}, lesson ${lesson.id} has an invalid YouTube video id`,
          );
          requireValue(
            Number.isInteger(lesson.video.start) && lesson.video.start >= 0,
            `Course ${courseId}, lesson ${lesson.id} has an invalid video start time`,
          );
          ['chapter', 'title', 'channel'].forEach((field) => {
            requireValue(
              typeof lesson.video[field] === 'string' && lesson.video[field].trim().length > 0,
              `Course ${courseId}, lesson ${lesson.id} has no video ${field}`,
            );
          });
        }
      }
    });

    if (courseId.startsWith('cyber-')) {
      referenceUrlCounts.forEach((count, url) => {
        if (count > 3) {
          warnings.push(`Course ${courseId}: reference URL appears on ${count} lessons: ${url}`);
        }
      });
    }

    (course.questions || []).forEach((question) => {
      requireValue(lessonIds.has(question.lessonId), `Course ${courseId} question references unknown lesson: ${question.lessonId}`);
      const answers = question.answers;
      requireValue(
        Array.isArray(answers) &&
          answers.length === 4 &&
          answers.every((answer) => typeof answer === 'string' && answer.trim().length > 0) &&
          new Set(answers.map((answer) => answer.trim())).size === 4,
        `Course ${courseId} question has invalid or duplicate answers: ${question.question || '(no question text)'}`,
      );
      requireValue(
        Number.isInteger(question.correct) && question.correct >= 0 && question.correct <= 3,
        `Course ${courseId} question has invalid correct index: ${question.question || '(no question text)'}`,
      );
      requireValue(
        typeof question.explanation === 'string' && question.explanation.trim().length > 0,
        `Course ${courseId} question has no explanation: ${question.question || '(no question text)'}`,
      );

      const normalizedText = typeof question.question === 'string' ? question.question.trim().toLowerCase() : '';
      requireValue(normalizedText.length > 0, `Course ${courseId} has a question with no text`);
      requireValue(!questionTexts.has(normalizedText), `Course ${courseId} has duplicate question text: ${question.question}`);
      questionTexts.add(normalizedText);

      if (Number.isInteger(question.correct) && question.correct >= 0 && question.correct <= 3) {
        correctCounts[question.correct] += 1;
      }
      questionsByLesson.set(question.lessonId, (questionsByLesson.get(question.lessonId) || 0) + 1);
    });

    lessonIds.forEach((lessonId) => {
      requireValue(
        (questionsByLesson.get(lessonId) || 0) > 0,
        `Course ${courseId} has no question for lesson ${lessonId}`,
      );
    });

    const quizSize = course.quizSize ?? 10;
    requireValue(
      (course.questions || []).length >= quizSize,
      `Course ${courseId} question bank has ${(course.questions || []).length} questions; quizSize is ${quizSize}`,
    );
    requireValue(
      Number.isFinite(course.passingPercent) && course.passingPercent >= 1 && course.passingPercent <= 100,
      `Course ${courseId} has invalid passingPercent: ${course.passingPercent}`,
    );

    const largestAnswerGroup = Math.max(...correctCounts);
    if (course.questions?.length && largestAnswerGroup / course.questions.length > 0.5) {
      warnings.push(`Course ${courseId}: ${Math.round((largestAnswerGroup / course.questions.length) * 100)}% of correct answers use the same index.`);
    }
  });
}

try {
  const registry = loadSourceModule(registryPath);
  const careersModule = loadSourceModule(careersPath);
  validateRegistry(registry, careersModule.CAREERS);
} catch (error) {
  console.error(`Could not load learning content: ${error.message}`);
  process.exitCode = 1;
}

warnings.forEach((warning) => console.warn(`WARN: ${warning}`));
if (issues.length > 0) {
  issues.forEach((issue) => console.error(`ERROR: ${issue}`));
  console.error(`Content validation failed with ${issues.length} error(s) and ${warnings.length} warning(s).`);
  process.exitCode = 1;
} else if (process.exitCode !== 1) {
  console.log(`Content validation passed (${registrySummary()}).`);
}

function registrySummary() {
  const registry = loadSourceModule(registryPath);
  const careersModule = loadSourceModule(careersPath);
  return `${careersModule.CAREERS.length} careers, ${registry.CAREER_CONTENT.reduce((count, career) => count + Object.keys(career.tracks).length, 0)} tracks, ${registry.COURSE_ENTRIES.length} courses`;
}
