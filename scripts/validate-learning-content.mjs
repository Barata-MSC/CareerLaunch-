import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const learningHubRoot = path.join(root, 'src', 'features', 'learning-hub');
const moduleCache = new Map();
const errors = [];
const warnings = [];
const teacherCourseSpecs = {
  'teach-foundations': {
    title: 'Foundations of Teaching',
    shortCode: 'FND',
    subtitle: 'What teachers do and why it matters.',
    outcome: 'Describe the roles, responsibilities, and ethics of a teacher.',
  },
  'teach-child-development': {
    title: 'Child Development and Learning',
    shortCode: 'CDL',
    subtitle: 'How young children grow and learn.',
    outcome: 'Explain major stages of child development and how they shape teaching.',
  },
  'teach-curriculum-planning': {
    title: 'Curriculum and Lesson Planning',
    shortCode: 'CLP',
    subtitle: 'Turning goals into lessons.',
    outcome: 'Write a clear lesson objective and plan a simple lesson.',
  },
  'teach-classroom-management': {
    title: 'Classroom Management',
    shortCode: 'CLM',
    subtitle: 'Building a calm, respectful classroom.',
    outcome: 'Describe routines and positive strategies for managing a young class.',
  },
  'teach-literacy-numeracy': {
    title: 'Teaching Literacy and Numeracy',
    shortCode: 'LIT',
    subtitle: 'Reading, writing, and math in the early grades.',
    outcome: 'Explain how early reading and number skills develop and common ways to teach them.',
  },
  'teach-assessment': {
    title: 'Assessment of Learning',
    shortCode: 'ASM',
    subtitle: 'Knowing what learners have learned.',
    outcome: 'Distinguish formative and summative assessment and design a simple one.',
  },
  'teach-inclusive-education': {
    title: 'Inclusive and Differentiated Instruction',
    shortCode: 'INC',
    subtitle: 'Teaching every learner.',
    outcome: 'Describe ways to adjust teaching for learners with different needs and backgrounds.',
  },
  'teach-professional-growth': {
    title: 'Professional Growth and Licensure Preparation',
    shortCode: 'PRO',
    subtitle: 'Building a teaching career.',
    outcome: 'Explain the path to becoming a licensed teacher and how teachers keep growing.',
  },
  'teach-sec-adolescent-development': {
    title: 'Adolescent Development and Learning',
    shortCode: 'ADL',
    subtitle: 'How teenagers grow and learn.',
    outcome: 'Explain key features of adolescent development and their effect on learning.',
  },
  'teach-sec-content-pedagogy': {
    title: 'Subject Content and Pedagogy',
    shortCode: 'PED',
    subtitle: 'Teaching your subject well.',
    outcome: 'Describe how teachers turn subject knowledge into clear, engaging instruction.',
  },
  'teach-sec-curriculum-design': {
    title: 'Curriculum Design and Unit Planning',
    shortCode: 'CUR',
    subtitle: 'Planning units that build on each other.',
    outcome: 'Plan a short unit with aligned objectives, activities, and assessment.',
  },
  'teach-sec-classroom-culture': {
    title: 'Classroom Culture and Behavior',
    shortCode: 'CCB',
    subtitle: 'Respect, routines, and responsibility.',
    outcome: 'Describe strategies for a positive classroom culture with teenagers.',
  },
  'teach-sec-assessment': {
    title: 'Assessment and Feedback',
    shortCode: 'AFB',
    subtitle: 'Measuring learning and helping it grow.',
    outcome: 'Design assessments and give feedback that helps learners improve.',
  },
  'teach-sec-guidance-wellbeing': {
    title: 'Learner Guidance and Wellbeing',
    shortCode: 'GWB',
    subtitle: "The teacher's supporting role.",
    outcome: "Describe a teacher's role in supporting learners and when and how to refer concerns.",
  },
  'teach-sec-career-licensure': {
    title: 'Teaching Career and Licensure Preparation',
    shortCode: 'TCL',
    subtitle: 'From student to licensed teacher.',
    outcome: 'Explain the path to becoming a licensed teacher and how to keep developing.',
  },
};

function resolveModule(fromFile, request) {
  if (!request.startsWith('.')) return request;
  const basePath = path.resolve(path.dirname(fromFile), request);
  const candidates = [basePath, `${basePath}.js`, path.join(basePath, 'index.js')];
  const resolved = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!resolved) throw new Error(`Unable to resolve ${request} imported from ${fromFile}`);
  return resolved;
}

function parseImportClause(clause, importedModule, index) {
  const statements = [];
  const moduleName = `__importedModule${index}`;
  statements.push(`const ${moduleName} = require(${JSON.stringify(importedModule)});`);

  const trimmed = clause.trim();
  if (trimmed.startsWith('{')) {
    statements.push(`const ${trimmed.replace(/\bas\b/g, ':')} = ${moduleName};`);
    return statements.join('\n');
  }

  const namedStart = trimmed.indexOf('{');
  const defaultName = (namedStart === -1 ? trimmed : trimmed.slice(0, namedStart))
    .replace(/,$/, '')
    .trim();
  statements.push(`const ${defaultName} = ${moduleName}.default;`);
  if (namedStart !== -1) {
    const namedClause = trimmed.slice(namedStart).replace(/\bas\b/g, ':');
    statements.push(`const ${namedClause} = ${moduleName};`);
  }
  return statements.join('\n');
}

function loadModule(filePath) {
  const resolvedPath = path.resolve(filePath);
  if (moduleCache.has(resolvedPath)) return moduleCache.get(resolvedPath);

  if (
    resolvedPath.includes(`${path.sep}teacher${path.sep}`) &&
    path.basename(resolvedPath).endsWith('Course.js')
  ) {
    const stub = { default: () => null };
    moduleCache.set(resolvedPath, stub);
    return stub;
  }

  const module = { exports: {} };
  moduleCache.set(resolvedPath, module.exports);
  let source = fs.readFileSync(resolvedPath, 'utf8');
  let importIndex = 0;
  source = source.replace(
    /import\s+([\s\S]*?)\s+from\s+(['"])([^'"]+)\2\s*;?/g,
    (_match, clause, _quote, request) => {
      const importedModule = resolveModule(resolvedPath, request);
      return parseImportClause(clause, importedModule, importIndex++);
    },
  );

  const exportedNames = [];
  source = source.replace(/\bexport\s+const\s+([A-Za-z_$][\w$]*)\s*=/g, (_match, name) => {
    exportedNames.push(name);
    return `const ${name} =`;
  });
  source = source.replace(/\bexport\s+default\s+/g, 'module.exports.default = ');
  source += `\n${exportedNames.map((name) => `module.exports.${name} = ${name};`).join('\n')}`;

  const localRequire = (request) => {
    if (typeof request === 'string' && !request.startsWith('.') && !path.isAbsolute(request)) {
      throw new Error(`External module ${request} is not supported by the content validator`);
    }
    return loadModule(path.isAbsolute(request) ? request : resolveModule(resolvedPath, request));
  };

  vm.runInNewContext(source, { module, exports: module.exports, require: localRequire }, {
    filename: resolvedPath,
  });
  moduleCache.set(resolvedPath, module.exports);
  return module.exports;
}

function collectCourseFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (['careers', 'shared', 'LearningHubScreen'].includes(entry.name)) continue;
    const currentPath = path.join(directory, entry.name);
    const childFiles = fs.readdirSync(currentPath, { withFileTypes: true });
    if (childFiles.some((child) => child.isFile() && child.name === 'course.js')) {
      files.push(path.join(currentPath, 'course.js'));
    }
    files.push(...collectCourseFiles(currentPath));
  }
  return files;
}

function extractLiteral(source, marker, openingCharacter) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Could not find ${marker}`);
  const start = source.indexOf(openingCharacter, markerIndex + marker.length);
  if (start < 0) throw new Error(`Could not find ${openingCharacter} after ${marker}`);

  const closingCharacter = openingCharacter === '{' ? '}' : ']';
  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = start; index < source.length; index += 1) {
    const current = source[index];
    const next = source[index + 1];

    if (lineComment) {
      if (current === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (current === '*' && next === '/') {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (current === '\\') {
        escaped = true;
      } else if (current === quote) {
        quote = null;
      }
      continue;
    }
    if (current === '/' && next === '/') {
      lineComment = true;
      index += 1;
      continue;
    }
    if (current === '/' && next === '*') {
      blockComment = true;
      index += 1;
      continue;
    }
    if (current === "'" || current === '"' || current === '`') {
      quote = current;
      continue;
    }
    if (current === openingCharacter) depth += 1;
    if (current === closingCharacter) {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }

  throw new Error(`Unclosed ${openingCharacter} literal after ${marker}`);
}

function collectTrackData() {
  const softwareTracksPath = path.join(learningHubRoot, 'software-engineering', 'tracks.js');
  const teacherIndexPath = path.join(learningHubRoot, 'teacher', 'index.js');
  const softwareTracks = loadModule(softwareTracksPath).TRACKS;
  const teacherTracks = loadModule(teacherIndexPath).tracks;
  return { ...softwareTracks, ...teacherTracks };
}

function validateCourse(course) {
  const label = course?.id || course?.title || 'unknown course';
  const lessons = Array.isArray(course?.lessons) ? course.lessons : [];
  const questions = Array.isArray(course?.questions) ? course.questions : [];
  const isTeacherCourse = typeof course?.id === 'string' && course.id.startsWith('teach-');
  const expectedTeacherCourse = teacherCourseSpecs[course?.id];

  if (isTeacherCourse && !expectedTeacherCourse) {
    errors.push(`${label}: unexpected Teacher course id`);
  }
  if (
    expectedTeacherCourse &&
    ['title', 'shortCode', 'subtitle', 'outcome'].some((field) => course[field] !== expectedTeacherCourse[field])
  ) {
    errors.push(`${label}: title, shortCode, subtitle, or outcome does not match the binding spec`);
  }
  const lessonIds = new Set();
  const questionTexts = new Set();
  const questionCountByLesson = new Map();

  for (const field of ['id', 'title', 'shortCode', 'subtitle']) {
    if (typeof course?.[field] !== 'string' || !course[field].trim()) {
      errors.push(`${label}: missing course ${field}`);
    }
  }
  if (!Number.isInteger(course?.passingPercent) || course.passingPercent < 1 || course.passingPercent > 100) {
    errors.push(`${label}: passingPercent must be an integer from 1 to 100`);
  }
  if (course?.quizSize !== undefined && (!Number.isInteger(course.quizSize) || course.quizSize < 1)) {
    errors.push(`${label}: quizSize must be a positive integer`);
  }
  if (course?.quizSize && questions.length < course.quizSize) {
    errors.push(`${label}: bank size ${questions.length} is smaller than quizSize ${course.quizSize}`);
  }
  if (isTeacherCourse && (lessons.length !== 10 || questions.length !== 10 || course.quizSize !== 10)) {
    errors.push(`${label}: Teacher courses must have 10 lessons, 10 questions, and quizSize 10`);
  }

  for (const [index, lesson] of lessons.entries()) {
    if (!lesson || !['id', 'title', 'subtitle', 'contentTitle', 'description'].every((field) =>
      typeof lesson[field] === 'string' && lesson[field].trim(),
    )) {
      errors.push(`${label}: lesson ${index + 1} is missing required fields`);
      continue;
    }
    if (lessonIds.has(lesson.id)) errors.push(`${label}: duplicate lesson id ${lesson.id}`);
    lessonIds.add(lesson.id);
    if (isTeacherCourse) {
      if (!Array.isArray(lesson.keyPoints) || lesson.keyPoints.length < 3 || lesson.keyPoints.length > 5) {
        errors.push(`${label}/${lesson.id}: expected 3 to 5 keyPoints`);
      }
      if (!lesson.sections?.some((section) =>
        section.heading?.toLowerCase().includes('worked example') && section.text?.trim(),
      )) {
        errors.push(`${label}/${lesson.id}: missing a worked example`);
      }
      if (!Array.isArray(lesson.activities) || lesson.activities.length === 0) {
        errors.push(`${label}/${lesson.id}: expected a useful activity`);
      }
    }

    for (const activity of lesson.activities || []) {
      if (!['miniSheet', 'quickCheck', 'playground', 'jsRunner', 'reactRunner', 'order', 'pyRunner', 'visualBuilder', 'matchPairs'].includes(activity.type)) {
        errors.push(`${label}/${lesson.id}: unsupported activity type ${activity.type}`);
      }
      if (isTeacherCourse && !['quickCheck', 'order', 'matchPairs'].includes(activity.type)) {
        errors.push(`${label}/${lesson.id}: unsupported Teacher activity type ${activity.type}`);
      }
    }
  }

  for (const question of questions) {
    const text = typeof question?.question === 'string' ? question.question.trim() : '';
    const normalizedText = text.toLowerCase();
    if (!text) errors.push(`${label}: question is missing text`);
    if (question && !lessonIds.has(question.lessonId)) {
      errors.push(`${label}: question references missing lesson ${question.lessonId}`);
    }
    if (normalizedText && questionTexts.has(normalizedText)) {
      errors.push(`${label}: duplicate question text "${text}"`);
    }
    if (normalizedText) questionTexts.add(normalizedText);
    questionCountByLesson.set(question?.lessonId, (questionCountByLesson.get(question?.lessonId) || 0) + 1);

    const answers = question?.answers;
    if (
      !Array.isArray(answers) ||
      answers.length !== 4 ||
      answers.some((answer) => typeof answer !== 'string' || !answer.trim()) ||
      new Set(answers.map((answer) => answer.trim().toLowerCase())).size !== 4
    ) {
      errors.push(`${label}: every question must have four distinct, non-empty answers`);
    }
    if (!Number.isInteger(question?.correct) || question.correct < 0 || question.correct > 3) {
      errors.push(`${label}: correct answer index must be an integer from 0 to 3`);
    }
    if (typeof question?.explanation !== 'string' || !question.explanation.trim()) {
      errors.push(`${label}: question is missing an explanation`);
    }
  }

  for (const lessonId of lessonIds) {
    if (!questionCountByLesson.has(lessonId)) {
      errors.push(`${label}: lesson ${lessonId} has no quiz question`);
    }
  }

  if (questions.length > 0) {
    const counts = [0, 0, 0, 0];
    for (const question of questions) {
      if (Number.isInteger(question.correct) && question.correct >= 0 && question.correct <= 3) {
        counts[question.correct] += 1;
      }
    }
    if (Math.max(...counts) > questions.length / 2) {
      warnings.push(`${label}: correct answers are over 50% in one position (${counts.join('/')})`);
    }
  }

  return { lessons: lessons.length, questions: questions.length };
}

try {
  const courseFiles = collectCourseFiles(learningHubRoot).sort();
  const courses = courseFiles.map((file) => loadModule(file).default);
  const teacherCourseCount = courses.filter((course) => course.id?.startsWith('teach-')).length;
  if (teacherCourseCount !== Object.keys(teacherCourseSpecs).length) {
    errors.push(`Expected ${Object.keys(teacherCourseSpecs).length} Teacher courses, found ${teacherCourseCount}`);
  }
  const courseById = new Map();
  let lessonTotal = 0;
  let questionTotal = 0;

  for (const course of courses) {
    if (courseById.has(course.id)) errors.push(`Duplicate course id: ${course.id}`);
    else courseById.set(course.id, course);
    const totals = validateCourse(course);
    lessonTotal += totals.lessons;
    questionTotal += totals.questions;
  }

  const tracks = collectTrackData();
  const careerPath = path.join(learningHubRoot, 'careers', 'careers.js');
  const careersSource = fs.readFileSync(careerPath, 'utf8');
  const careerLiteral = extractLiteral(careersSource, 'export const CAREERS =', '[');
  const careers = vm.runInNewContext(`(${careerLiteral})`, {}, { filename: careerPath });
  const trackIds = new Set();
  const routeNames = new Set();

  for (const [trackName, track] of Object.entries(tracks)) {
    const trackId = track.id || trackName;
    if (trackIds.has(trackId)) errors.push(`Duplicate track id: ${trackId}`);
    trackIds.add(trackId);
    const stepIds = new Set();

    for (const step of track.steps || []) {
      if (stepIds.has(step.id)) errors.push(`${trackId}: duplicate step id ${step.id}`);
      stepIds.add(step.id);
      if (!step.course) continue;
      if (!courseById.has(step.course.id)) errors.push(`${trackId}: missing course ${step.course.id}`);
      if (!step.route) errors.push(`${trackId}/${step.title}: course step has no route`);
      if (step.route && routeNames.has(step.route)) errors.push(`Duplicate route name: ${step.route}`);
      if (step.route) routeNames.add(step.route);
    }
  }

  for (const career of careers) {
    for (const trackId of career.trackIds || []) {
      if (!trackIds.has(trackId)) errors.push(`${career.id}: unresolved track id ${trackId}`);
    }
  }
  const teacherCareer = careers.find((career) => career.id === 'teacher');
  if (teacherCareer?.status !== 'available') {
    errors.push('Teacher career must be available after owner-confirmed team review');
  }
  const teacherTrack = tracks['teacher-elementary'];
  if (
    !teacherTrack ||
    teacherTrack.title !== 'Elementary Teacher' ||
    teacherTrack.subtitle !== 'Teach young learners in Kindergarten and Grades 1 to 6.' ||
    teacherTrack.estimatedDuration !== '5 months' ||
    teacherTrack.steps.length !== 8
  ) {
    errors.push('Teacher elementary track metadata or course count does not match the binding spec');
  }
  const teacherSecondaryTrack = tracks['teacher-secondary'];
  if (
    !teacherSecondaryTrack ||
    teacherSecondaryTrack.title !== 'Secondary Teacher' ||
    teacherSecondaryTrack.subtitle !== 'Teach adolescents in Junior and Senior High School (Grades 7 to 12).' ||
    teacherSecondaryTrack.estimatedDuration !== '4 months' ||
    teacherSecondaryTrack.steps.length !== 7
  ) {
    errors.push('Teacher secondary track metadata or course count does not match the binding spec');
  }
  if (!teacherCareer?.trackIds?.includes('teacher-elementary') || !teacherCareer?.trackIds?.includes('teacher-secondary')) {
    errors.push('Teacher career must register both Teacher tracks');
  }

  const registryPath = path.join(learningHubRoot, 'careers', 'registry.js');
  const registrySource = fs.readFileSync(registryPath, 'utf8');
  if (!registrySource.includes('export const CAREER_CONTENT =')) {
    errors.push('Career registry does not define CAREER_CONTENT');
  }
  if (!registrySource.includes('tracks: teacherTracks') || !registrySource.includes('courses: teacherCourses')) {
    errors.push('Teacher index is not registered through CAREER_CONTENT');
  }
  const componentBlock = extractLiteral(registrySource, 'const softwareCourseComponents =', '{');
  const softwareComponentNames = new Set(
    [...componentBlock.matchAll(/^\s*([A-Za-z_$][\w$]*)\s*,?\s*$/gm)].map((item) => item[1]),
  );
  const teacherIndexPath = path.join(learningHubRoot, 'teacher', 'index.js');
  const teacherIndexSource = fs.readFileSync(teacherIndexPath, 'utf8');
  const teacherRoutes = new Set(
    [...teacherIndexSource.matchAll(/route:\s*'([^']+)'/g)].map((item) => item[1]),
  );
  const navigatorPath = path.join(root, 'src', 'navigation', 'AppNavigator.js');
  const navigatorSource = fs.readFileSync(navigatorPath, 'utf8');
  if (!navigatorSource.includes('COURSE_ROUTES.map')) errors.push('AppNavigator does not map the shared COURSE_ROUTES registry');

  for (const route of routeNames) {
    if (!softwareComponentNames.has(route) && !teacherRoutes.has(route)) {
      errors.push(`Track route has no registered screen component: ${route}`);
    }
  }
  const staticScreenNames = new Set(
    [...navigatorSource.matchAll(/name="([^"]+)"/g)].map((item) => item[1]),
  );
  for (const route of routeNames) {
    if (staticScreenNames.has(route)) errors.push(`Course route is registered more than once: ${route}`);
  }

  if (warnings.length) {
    console.warn('Content warnings:');
    warnings.forEach((warning) => console.warn(`- ${warning}`));
  }
  if (errors.length) {
    console.error('Content validation errors:');
    errors.forEach((error) => console.error(`- ${error}`));
    console.error(`Validation failed: ${courses.length} courses, ${lessonTotal} lessons, ${questionTotal} questions checked.`);
    process.exitCode = 1;
  } else {
    console.log(`Content validation passed: ${courses.length} courses, ${lessonTotal} lessons, ${questionTotal} questions; ${trackIds.size} tracks and ${routeNames.size} track routes checked.`);
  }
} catch (error) {
  console.error(`Content validator failed: ${error.message}`);
  process.exitCode = 1;
}
