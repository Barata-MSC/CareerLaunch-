import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const babel = require('@babel/core');
const expoPreset = require('babel-preset-expo');
const commonJsPlugin = require('@babel/plugin-transform-modules-commonjs');

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(projectRoot, 'src/features/learning-hub/careers/registry.js');
const nursingCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/nursing/courseLessons.js',
);
const doctorCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/doctor/courseLessons.js',
);
const lawyerCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/lawyer/courseLessons.js',
);
const marineCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/marine/courseLessons.js',
);
const accountancyCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/accountancy/courseLessons.js',
);
const civilEngineeringCourseLessonsPath = path.join(
  projectRoot,
  'src/features/learning-hub/civil-engineering/courseLessons.js',
);
const moduleCache = new Map();
const nullComponent = () => null;
const ReactMock = {
  createElement: () => null,
  useCallback: (callback) => callback,
  useMemo: (callback) => callback(),
  useRef: (current) => ({ current }),
  useState: (value) => [value, () => {}],
};
const reactNativeMock = new Proxy(
  {
    Dimensions: { get: () => ({ height: 800, width: 400 }) },
    PanResponder: { create: () => ({ panHandlers: {} }) },
    Platform: { OS: 'web', select: (options) => options.web ?? options.default },
    StyleSheet: { create: (styles) => styles, hairlineWidth: 1 },
    StatusBar: { currentHeight: 0 },
  },
  { get: (target, key) => target[key] ?? nullComponent },
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
      const aliasPath = path.join(projectRoot, root, specifier.slice(alias[0].length));
      const resolved = [aliasPath, `${aliasPath}.js`, path.join(aliasPath, 'index.js')]
        .find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
      if (!resolved) throw new Error(`Cannot resolve alias ${specifier}`);
      return loadSourceModule(resolved);
    }

    const resolved = resolveLocalModule(specifier, absolutePath);
    if (!resolved) throw new Error(`Cannot resolve ${specifier} from ${path.relative(projectRoot, absolutePath)}`);
    if (path.basename(resolved).endsWith('Course.js')) {
      return { __esModule: true, default: nullComponent };
    }
    if (resolved.endsWith(`${path.sep}src${path.sep}utils${path.sep}sounds.js`)) {
      return { playSound: () => {} };
    }
    return loadSourceModule(resolved);
  };

  new Function('require', 'module', 'exports', transformed.code)(
    localRequire,
    module,
    module.exports,
  );
  return module.exports;
}

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const requestTimeout = 12000;
const requestDelay = 250;
let lastRequestAt = 0;

async function fetchPolite(url, options = {}) {
  const wait = Math.max(0, requestDelay - (Date.now() - lastRequestAt));
  if (wait) await delay(wait);
  lastRequestAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeout);
  try {
    return await fetch(url, {
      ...options,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CareerLaunchLinkCheck/1.0)',
        Accept: 'text/html,application/json;q=0.9,*/*;q=0.8',
        ...options.headers,
      },
      redirect: 'follow',
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function checkReference(url) {
  try {
    let response = await fetchPolite(url, { method: 'HEAD' });
    if (!response.ok) response = await fetchPolite(url, { method: 'GET' });
    if (!response.ok) {
      const status = response.status === 403 || response.status === 429 ? 'UNVERIFIED' : 'FAILED';
      return { url, status, detail: `HTTP ${response.status}` };
    }
    if (response.redirected || response.url !== url) {
      return { url, status: 'REDIRECTED', detail: response.url };
    }
    return { url, status: 'OK', detail: `HTTP ${response.status}` };
  } catch (error) {
    const timedOut = error.name === 'AbortError';
    return {
      url,
      status: timedOut ? 'UNVERIFIED' : 'FAILED',
      detail: timedOut ? 'Timed out; check manually' : error.message,
    };
  }
}

async function checkVideo(video) {
  const endpoint = new URL('https://www.youtube.com/oembed');
  endpoint.searchParams.set('url', `https://www.youtube.com/watch?v=${video.id}`);
  endpoint.searchParams.set('format', 'json');
  try {
    const response = await fetchPolite(endpoint);
    if (!response.ok) {
      const status = response.status === 403 || response.status === 429 ? 'UNVERIFIED' : 'FAILED';
      return { url: `https://youtu.be/${video.id}`, status, detail: `oEmbed HTTP ${response.status}` };
    }
    const result = await response.json();
    const matches = result.title.trim().toLowerCase() === video.title.trim().toLowerCase();
    return {
      url: `https://youtu.be/${video.id}`,
      status: matches ? 'OK' : 'FAILED',
      detail: matches ? `Title matched: ${result.title}` : `Title mismatch: ${result.title}`,
    };
  } catch (error) {
    const timedOut = error.name === 'AbortError';
    return {
      url: `https://youtu.be/${video.id}`,
      status: timedOut ? 'UNVERIFIED' : 'FAILED',
      detail: timedOut ? 'Timed out; check manually' : error.message,
    };
  }
}

async function run() {
  const careerId = process.argv[2];
  if (!careerId) {
    throw new Error('Usage: node scripts/check-lesson-links.mjs <career-id>');
  }

  const registry = loadSourceModule(registryPath);
  const career = registry.CAREER_CONTENT.find((entry) => entry.careerId === careerId);
  if (!career) throw new Error(`Career not found in the shared registry: ${careerId}`);

  const courses = registry.COURSE_ENTRIES
    .filter(({ course }) => career.tracks && Object.values(career.tracks).some((track) =>
      track.steps?.some((step) => step.course?.id === course.id),
    ))
    .map(({ course }) => course);
  const coursesWithRuntimeLessons = [
    'nursing',
    'doctor',
    'lawyer',
    'marine',
    'accountancy',
    'civil-engineering',
  ].includes(careerId)
    ? courses.map((course) => ({
      ...course,
      lessons: careerId === 'nursing'
        ? loadSourceModule(nursingCourseLessonsPath).getNursingLessons(course.lessons || [])
        : careerId === 'doctor'
          ? loadSourceModule(doctorCourseLessonsPath).getDoctorLessons(course.lessons || [])
          : careerId === 'lawyer'
            ? loadSourceModule(lawyerCourseLessonsPath).getLawyerLessons(course.lessons || [])
            : careerId === 'marine'
              ? loadSourceModule(marineCourseLessonsPath).getMarineLessons(course.lessons || [])
              : careerId === 'accountancy'
                ? loadSourceModule(accountancyCourseLessonsPath).getAccountancyLessons(course.lessons || [])
                : loadSourceModule(civilEngineeringCourseLessonsPath).getCivilEngineeringLessons(course.lessons || []),
    }))
    : courses;
  const references = new Set();
  const videos = new Map();
  coursesWithRuntimeLessons.forEach((course) => (course.lessons || []).forEach((lesson) => {
    (lesson.references || []).forEach((reference) => references.add(reference.url));
    if (lesson.video?.id) videos.set(lesson.video.id, lesson.video);
  }));

  const checks = [];
  const queue = [
    ...Array.from(references, (url) => () => checkReference(url)),
    ...Array.from(videos.values(), (video) => () => checkVideo(video)),
  ];
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < queue.length) {
      const index = nextIndex;
      nextIndex += 1;
      checks[index] = await queue[index]();
    }
  }
  await Promise.all(Array.from({ length: Math.min(2, queue.length) }, () => worker()));

  const counts = checks.reduce((result, check) => {
    result[check.status] += 1;
    return result;
  }, { OK: 0, REDIRECTED: 0, UNVERIFIED: 0, FAILED: 0 });
  const timestamp = new Date().toISOString();
  const rows = checks.map(({ status, url, detail }) =>
    `| ${status} | ${url} | ${detail.replaceAll('|', '\\|')} |`,
  );
  const report = [
    `# Lesson link check: ${careerId}`,
    '',
    `Checked: ${timestamp}`,
    `Courses: ${courses.length}; unique reference URLs: ${references.size}; videos: ${videos.size}.`,
    `Result: ${counts.OK} OK, ${counts.REDIRECTED} redirected, ${counts.UNVERIFIED} unverified, ${counts.FAILED} failed.`,
    'HTTP 403, HTTP 429, and request timeouts are unverified and require a manual check; they are not reported as failures.',
    '',
    'This report reflects live checks made when the command ran; if the command is not run, link status is unknown and must not be described as verified.',
    '',
    '| Status | URL | Result |',
    '|---|---|---|',
    ...rows,
    '',
  ].join('\n');
  const reportPath = path.join(projectRoot, 'docs/tasks/progress', `link-check-${careerId}.md`);
  fs.writeFileSync(reportPath, report);
  console.log(`Link check ${careerId}: ${counts.OK} OK, ${counts.REDIRECTED} redirected, ${counts.UNVERIFIED} unverified, ${counts.FAILED} failed.`);
  console.log(`Report: ${path.relative(projectRoot, reportPath)}`);
  if (counts.FAILED) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
