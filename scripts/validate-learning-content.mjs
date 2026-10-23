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
const teacherLinksPath = path.join(projectRoot, 'src/features/learning-hub/teacher/links.js');
const teacherCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/teacher/courseLessons.js',
);
const nursingLinksPath = path.join(projectRoot, 'src/features/learning-hub/nursing/links.js');
const nursingCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/nursing/courseLessons.js',
);
const doctorLinksPath = path.join(projectRoot, 'src/features/learning-hub/doctor/links.js');
const doctorCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/doctor/courseLessons.js',
);
const lawyerLinksPath = path.join(projectRoot, 'src/features/learning-hub/lawyer/links.js');
const lawyerCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/lawyer/courseLessons.js',
);
const marineLinksPath = path.join(projectRoot, 'src/features/learning-hub/marine/links.js');
const marineCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/marine/courseLessons.js',
);
const accountancyLinksPath = path.join(
  projectRoot,
  'src/features/learning-hub/accountancy/links.js',
);
const accountancyCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/accountancy/courseLessons.js',
);
const civilEngineeringLinksPath = path.join(
  projectRoot,
  'src/features/learning-hub/civil-engineering/links.js',
);
const civilEngineeringCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/civil-engineering/courseLessons.js',
);
const hospitalityTourismLinksPath = path.join(
  projectRoot,
  'src/features/learning-hub/hospitality-tourism/links.js',
);
const hospitalityTourismCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/hospitality-tourism/courseLessons.js',
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
const REFERENCE_ALLOWED_DOMAINS = {
  cybersecurity: [
    'nist.gov',
    'cisa.gov',
    'owasp.org',
    'ncsc.gov.uk',
    'cloudflare.com',
    'privacy.gov.ph',
    'youtu.be',
  ],
  teacher: ['deped.gov.ph', 'ched.gov.ph', 'prc.gov.ph', 'unesco.org', 'edutopia.org', 'youtu.be'],
  nursing: [
    'openstax.org',
    'who.int',
    'cdc.gov',
    'nursingworld.org',
    'ana.org',
    'prc.gov.ph',
    'ched.gov.ph',
    'youtu.be',
  ],
  doctor: [
    'who.int',
    'doh.gov.ph',
    'medlineplus.gov',
    'ncbi.nlm.nih.gov',
    'khanacademy.org',
    'openstax.org',
    'cdc.gov',
    'prc.gov.ph',
    'ched.gov.ph',
  ],
  lawyer: [
    'lawphil.net',
    'ibp.ph',
    'law.upd.edu.ph',
    'privacy.gov.ph',
    'officialgazette.gov.ph',
    'congress.gov.ph',
    'senate.gov.ph',
    'youtu.be',
  ],
  marine: [
    'marina.gov.ph',
    'imo.org',
    'ched.gov.ph',
    'prc.gov.ph',
    'noaa.gov',
    'pagasa.dost.gov.ph',
  ],
  accountancy: [
    'openstax.org',
    'bir.gov.ph',
    'prc.gov.ph',
    'ched.gov.ph',
    'ifrs.org',
    'aicpa-cima.com',
    'coso.org',
    'sba.gov',
  ],
  'civil-engineering': [
    'asce.org',
    'nspe.org',
    'nist.gov',
    'khanacademy.org',
    'fhwa.dot.gov',
    'fema.gov',
    'epa.gov',
    'usgs.gov',
    'noaa.gov',
    'osha.gov',
    'dpwh.gov.ph',
    'ched.gov.ph',
    'prc.gov.ph',
    'pice.org.ph',
  ],
  'hospitality-tourism': [
    'tourism.gov.ph',
    'ched.gov.ph',
    'tesda.gov.ph',
    'untourism.int',
    'youtu.be',
  ],
};

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
  const teacherLinks = loadSourceModule(teacherLinksPath).LESSON_LINKS;
  const { getTeacherLessons } = loadSourceModule(teacherCourseLessonsPath);
  const nursingLinks = loadSourceModule(nursingLinksPath).LESSON_LINKS;
  const { getNursingLessons } = loadSourceModule(nursingCourseLessonsPath);
  const doctorLinks = loadSourceModule(doctorLinksPath).LESSON_LINKS;
  const { getDoctorLessons } = loadSourceModule(doctorCourseLessonsPath);
  const lawyerLinks = loadSourceModule(lawyerLinksPath).LESSON_LINKS;
  const { getLawyerLessons } = loadSourceModule(lawyerCourseLessonsPath);
  const marineLinks = loadSourceModule(marineLinksPath).LESSON_LINKS;
  const { getMarineLessons } = loadSourceModule(marineCourseLessonsPath);
  const accountancyLinks = loadSourceModule(accountancyLinksPath).LESSON_LINKS;
  const { getAccountancyLessons } = loadSourceModule(accountancyCourseLessonsPath);
  const civilEngineeringLinks = loadSourceModule(civilEngineeringLinksPath).LESSON_LINKS;
  const { getCivilEngineeringLessons } = loadSourceModule(civilEngineeringCourseLessonsPath);
  const hospitalityTourismLinks = loadSourceModule(hospitalityTourismLinksPath).LESSON_LINKS;
  const { getHospitalityTourismLessons } = loadSourceModule(hospitalityTourismCourseLessonsPath);

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

  const teacherLessonIds = new Set(
    Array.from(courseById.entries())
      .filter(([courseId]) => courseId.startsWith('teach-'))
      .flatMap(([, { course }]) => (course.lessons || []).map((lesson) => lesson.id)),
  );
  Object.keys(teacherLinks).forEach((lessonId) => {
    requireValue(
      teacherLessonIds.has(lessonId),
      `Teacher lesson links contain an unknown lesson id: ${lessonId}`,
    );
  });
  teacherLessonIds.forEach((lessonId) => {
    requireValue(
      Object.hasOwn(teacherLinks, lessonId),
      `Teacher lesson has no link entry: ${lessonId}`,
    );
  });
  requireValue(
    Object.keys(teacherLinks).length === teacherLessonIds.size,
    `Teacher lesson link count does not match real lesson ids: ${Object.keys(teacherLinks).length} entries for ${teacherLessonIds.size} lessons`,
  );
  console.log(
    `Teacher runtime link coverage: ${teacherLessonIds.size} lesson ids, ${Object.keys(teacherLinks).length} link entries.`,
  );

  const nursingLessonIds = new Set(
    Array.from(courseById.entries())
      .filter(([courseId]) => courseId.startsWith('nurs-'))
      .flatMap(([, { course }]) => (course.lessons || []).map((lesson) => lesson.id)),
  );
  Object.keys(nursingLinks).forEach((lessonId) => {
    requireValue(
      nursingLessonIds.has(lessonId),
      `Nursing lesson links contain an unknown lesson id: ${lessonId}`,
    );
  });
  nursingLessonIds.forEach((lessonId) => {
    requireValue(
      Object.hasOwn(nursingLinks, lessonId),
      `Nursing lesson has no link entry: ${lessonId}`,
    );
  });
  requireValue(
    Object.keys(nursingLinks).length === nursingLessonIds.size,
    `Nursing lesson link count does not match real lesson ids: ${Object.keys(nursingLinks).length} entries for ${nursingLessonIds.size} lessons`,
  );
  console.log(
    `Nursing runtime link coverage: ${nursingLessonIds.size} lesson ids, ${Object.keys(nursingLinks).length} link entries.`,
  );

  const doctorLessonIds = new Set(
    Array.from(courseById.entries())
      .filter(([courseId]) => courseId.startsWith('med-'))
      .flatMap(([, { course }]) => (course.lessons || []).map((lesson) => lesson.id)),
  );
  Object.keys(doctorLinks).forEach((lessonId) => {
    requireValue(
      doctorLessonIds.has(lessonId),
      `Doctor lesson links contain an unknown lesson id: ${lessonId}`,
    );
  });
  doctorLessonIds.forEach((lessonId) => {
    requireValue(
      Object.hasOwn(doctorLinks, lessonId),
      `Doctor lesson has no link entry: ${lessonId}`,
    );
  });
  requireValue(
    Object.keys(doctorLinks).length === doctorLessonIds.size,
    `Doctor lesson link count does not match real lesson ids: ${Object.keys(doctorLinks).length} entries for ${doctorLessonIds.size} lessons`,
  );
  console.log(
    `Doctor runtime link coverage: ${doctorLessonIds.size} lesson ids, ${Object.keys(doctorLinks).length} link entries.`,
  );

  const lawyerLessonIds = new Set(
    Array.from(courseById.entries())
      .filter(([courseId]) => courseId.startsWith('law-'))
      .flatMap(([, { course }]) => (course.lessons || []).map((lesson) => lesson.id)),
  );
  Object.keys(lawyerLinks).forEach((lessonId) => {
    requireValue(
      lawyerLessonIds.has(lessonId),
      `Lawyer lesson links contain an unknown lesson id: ${lessonId}`,
    );
  });
  lawyerLessonIds.forEach((lessonId) => {
    requireValue(
      Object.hasOwn(lawyerLinks, lessonId),
      `Lawyer lesson has no link entry: ${lessonId}`,
    );
  });
  requireValue(
    Object.keys(lawyerLinks).length === lawyerLessonIds.size,
    `Lawyer lesson link count does not match real lesson ids: ${Object.keys(lawyerLinks).length} entries for ${lawyerLessonIds.size} lessons`,
  );
  console.log(
    `Lawyer runtime link coverage: ${lawyerLessonIds.size} lesson ids, ${Object.keys(lawyerLinks).length} link entries.`,
  );

  const marineLessonIds = new Set(
    Array.from(courseById.entries())
      .filter(([courseId]) => courseId.startsWith('mar-'))
      .flatMap(([, { course }]) => (course.lessons || []).map((lesson) => lesson.id)),
  );
  Object.keys(marineLinks).forEach((lessonId) => {
    requireValue(
      marineLessonIds.has(lessonId),
      `Marine lesson links contain an unknown lesson id: ${lessonId}`,
    );
  });
  marineLessonIds.forEach((lessonId) => {
    requireValue(
      Object.hasOwn(marineLinks, lessonId),
      `Marine lesson has no link entry: ${lessonId}`,
    );
  });
  requireValue(
    Object.keys(marineLinks).length === marineLessonIds.size,
    `Marine lesson link count does not match real lesson ids: ${Object.keys(marineLinks).length} entries for ${marineLessonIds.size} lessons`,
  );
  console.log(
    `Marine runtime link coverage: ${marineLessonIds.size} lesson ids, ${Object.keys(marineLinks).length} link entries.`,
  );

  const accountancyLessonIds = new Set(
    Array.from(courseById.entries())
      .filter(([courseId]) => courseId.startsWith('acct-'))
      .flatMap(([, { course }]) => (course.lessons || []).map((lesson) => lesson.id)),
  );
  Object.keys(accountancyLinks).forEach((lessonId) => {
    requireValue(
      accountancyLessonIds.has(lessonId),
      `Accountancy lesson links contain an unknown lesson id: ${lessonId}`,
    );
  });
  accountancyLessonIds.forEach((lessonId) => {
    requireValue(
      Object.hasOwn(accountancyLinks, lessonId),
      `Accountancy lesson has no link entry: ${lessonId}`,
    );
  });
  requireValue(
    Object.keys(accountancyLinks).length === accountancyLessonIds.size,
    `Accountancy lesson link count does not match real lesson ids: ${Object.keys(accountancyLinks).length} entries for ${accountancyLessonIds.size} lessons`,
  );
  console.log(
    `Accountancy runtime link coverage: ${accountancyLessonIds.size} lesson ids, ${Object.keys(accountancyLinks).length} link entries.`,
  );

  const civilEngineeringLessonIds = new Set(
    Array.from(courseById.entries())
      .filter(([courseId]) => courseId.startsWith('civ-'))
      .flatMap(([, { course }]) => (course.lessons || []).map((lesson) => lesson.id)),
  );
  Object.keys(civilEngineeringLinks).forEach((lessonId) => {
    requireValue(
      civilEngineeringLessonIds.has(lessonId),
      `Civil Engineering lesson links contain an unknown lesson id: ${lessonId}`,
    );
  });
  civilEngineeringLessonIds.forEach((lessonId) => {
    requireValue(
      Object.hasOwn(civilEngineeringLinks, lessonId),
      `Civil Engineering lesson has no link entry: ${lessonId}`,
    );
  });
  requireValue(
    Object.keys(civilEngineeringLinks).length === civilEngineeringLessonIds.size,
    `Civil Engineering lesson link count does not match real lesson ids: ${Object.keys(civilEngineeringLinks).length} entries for ${civilEngineeringLessonIds.size} lessons`,
  );
  console.log(
    `Civil Engineering runtime link coverage: ${civilEngineeringLessonIds.size} lesson ids, ${Object.keys(civilEngineeringLinks).length} link entries.`,
  );

  const hospitalityTourismLessonIds = new Set(
    Array.from(courseById.entries())
      .filter(([courseId]) => courseId.startsWith('ht-'))
      .flatMap(([, { course }]) => (course.lessons || []).map((lesson) => lesson.id)),
  );
  Object.keys(hospitalityTourismLinks).forEach((lessonId) => {
    requireValue(
      hospitalityTourismLessonIds.has(lessonId),
      `Hospitality & Tourism lesson links contain an unknown lesson id: ${lessonId}`,
    );
  });
  hospitalityTourismLessonIds.forEach((lessonId) => {
    requireValue(
      Object.hasOwn(hospitalityTourismLinks, lessonId),
      `Hospitality & Tourism lesson has no link entry: ${lessonId}`,
    );
  });
  requireValue(
    Object.keys(hospitalityTourismLinks).length === hospitalityTourismLessonIds.size,
    `Hospitality & Tourism lesson link count does not match real lesson ids: ${Object.keys(hospitalityTourismLinks).length} entries for ${hospitalityTourismLessonIds.size} lessons`,
  );
  console.log(
    `Hospitality & Tourism runtime link coverage: ${hospitalityTourismLessonIds.size} lesson ids, ${Object.keys(hospitalityTourismLinks).length} link entries.`,
  );

  courseById.forEach(({ course }, courseId) => {
    const referenceCareerId = courseId.startsWith('cyber-')
      ? 'cybersecurity'
      : courseId.startsWith('teach-')
        ? 'teacher'
        : courseId.startsWith('nurs-')
          ? 'nursing'
          : courseId.startsWith('med-')
            ? 'doctor'
            : courseId.startsWith('law-')
              ? 'lawyer'
              : courseId.startsWith('mar-')
                ? 'marine'
                : courseId.startsWith('acct-')
                  ? 'accountancy'
                : courseId.startsWith('civ-')
                  ? 'civil-engineering'
                  : courseId.startsWith('ht-')
                    ? 'hospitality-tourism'
                : null;
    const lessons = referenceCareerId === 'teacher'
      ? getTeacherLessons(course.lessons || [])
      : referenceCareerId === 'nursing'
        ? getNursingLessons(course.lessons || [])
        : referenceCareerId === 'doctor'
          ? getDoctorLessons(course.lessons || [])
          : referenceCareerId === 'lawyer'
            ? getLawyerLessons(course.lessons || [])
            : referenceCareerId === 'marine'
              ? getMarineLessons(course.lessons || [])
              : referenceCareerId === 'accountancy'
                ? getAccountancyLessons(course.lessons || [])
                : referenceCareerId === 'civil-engineering'
                  ? getCivilEngineeringLessons(course.lessons || [])
                  : referenceCareerId === 'hospitality-tourism'
                    ? getHospitalityTourismLessons(course.lessons || [])
              : course.lessons || [];
    const lessonIds = new Set();
    const questionsByLesson = new Map();
    const questionTexts = new Set();
    const correctCounts = [0, 0, 0, 0];
    const referenceUrlCounts = new Map();

    lessons.forEach((lesson) => {
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

      if (referenceCareerId) {
        const references = Array.isArray(lesson.references) ? lesson.references : [];
        requireValue(
          references.length > 0,
          `Course ${courseId}, lesson ${lesson.id} has no references`,
        );
        if (
          referenceCareerId === 'teacher' ||
          referenceCareerId === 'nursing' ||
          referenceCareerId === 'doctor' ||
          referenceCareerId === 'lawyer' ||
          referenceCareerId === 'marine' ||
          referenceCareerId === 'accountancy' ||
          referenceCareerId === 'civil-engineering' ||
          referenceCareerId === 'hospitality-tourism'
        ) {
          requireValue(
            lesson.referencesHeading === 'Further reading',
            `Course ${courseId}, lesson ${lesson.id} has no Further reading heading`,
          );
        }
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
            REFERENCE_ALLOWED_DOMAINS[referenceCareerId].some(
              (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
            ),
            `Course ${courseId}, lesson ${lesson.id} uses a domain outside the ${referenceCareerId} allowlist: ${reference.url}`,
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

    if (referenceCareerId) {
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
