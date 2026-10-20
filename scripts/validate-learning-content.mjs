import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'src');
const babel = require('@babel/core');
const Module = require('node:module');

global.__DEV__ = false;

require.extensions['.js'] = (module, filename) => {
  if (!filename.startsWith(sourceRoot)) {
    module._compile(fs.readFileSync(filename, 'utf8'), filename);
    return;
  }

  const source = fs.readFileSync(filename, 'utf8');
  const result = babel.transformSync(source, {
    filename,
    configFile: path.join(root, 'babel.config.js'),
    babelrc: false,
    plugins: ['@babel/plugin-transform-modules-commonjs'],
  });
  module._compile(result.code, filename);
};

const nativeComponent = () => null;
const reactNativeMock = {
  View: nativeComponent,
  Text: nativeComponent,
  ScrollView: nativeComponent,
  Modal: nativeComponent,
  PanResponder: { create: () => ({}) },
  Dimensions: { get: () => ({ height: 800, width: 400 }) },
  StyleSheet: { create: (styles) => styles, absoluteFillObject: {} },
  Platform: { OS: 'web', select: (values) => values.default },
  StatusBar: nativeComponent,
  BackHandler: { addEventListener: () => ({ remove() {} }) },
};
const originalLoad = Module._load;

Module._load = function loadWithUiMocks(request, parent, isMain) {
  const requestPath = String(request);
  if (requestPath === 'react-native') return reactNativeMock;
  if (requestPath === 'react-native-safe-area-context') {
    return { SafeAreaView: nativeComponent };
  }
  if (requestPath === '@react-navigation/native') {
    return { useFocusEffect() {} };
  }
  if (requestPath.includes('useAllCoursesProgress')) {
    return { __esModule: true, default: () => ({}), getCourseStatus: () => 'not-started' };
  }
  if (requestPath.includes('utils/sounds')) {
    return { playSound() {} };
  }

  const resolved = path.resolve(parent?.filename ? path.dirname(parent.filename) : root, requestPath);
  if (resolved.endsWith(path.join('src', 'components', 'AppPressable'))
    || resolved.endsWith(path.join('src', 'components', 'AppPressable.js'))) {
    return { __esModule: true, default: nativeComponent };
  }
  if (parent?.filename?.includes(`${path.sep}lawyer${path.sep}tracks.js`)
    && /Course$/.test(path.basename(requestPath))) {
    return { __esModule: true, default: nativeComponent };
  }

  return originalLoad.call(this, request, parent, isMain);
};

const { default: validateLearningContent } = require(
  path.join(sourceRoot, 'features', 'learning-hub', 'shared', 'validateLearningContent.js'),
);
const { CAREERS } = require(path.join(sourceRoot, 'features', 'learning-hub', 'careers', 'careers.js'));
const {
  TRACKS,
  COURSES,
  COURSE_ROUTES,
  REGISTERED_COURSE_ROUTE_NAMES,
} = require(path.join(sourceRoot, 'features', 'learning-hub', 'careers', 'registry.js'));

const result = validateLearningContent({
  careers: CAREERS,
  tracks: TRACKS,
  courses: COURSES,
  courseRoutes: COURSE_ROUTES,
  registeredRoutes: REGISTERED_COURSE_ROUTE_NAMES,
});

console.log(`Checked ${Object.keys(TRACKS).length} tracks, ${COURSES.length} courses, and ${COURSE_ROUTES.length} dynamic course routes.`);
result.warnings.forEach((warning) => console.warn(`WARN: ${warning}`));
result.errors.forEach((error) => console.error(`ERROR: ${error}`));
if (result.errors.length) {
  process.exitCode = 1;
} else {
  console.log('Learning content validation passed.');
}
