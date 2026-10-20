import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const learningHub = path.join(root, 'src', 'features', 'learning-hub');
const supportedActivities = new Set(['miniSheet', 'quickCheck', 'playground', 'jsRunner', 'reactRunner', 'order', 'pyRunner', 'visualBuilder', 'matchPairs']);
const nursingActivities = new Set(['quickCheck', 'order', 'matchPairs']);
const restrictedNursingContent = /\b(injections?|wound care|catheters?|CPR|medications?|dosage|normal ranges?|vital[- ]sign ranges?|lab[- ]value ranges?|symptom checklists?|salaries?|salary|nurse-to-patient ratios?|overseas demand|hiring demand|exam dates?|exam fees?|passing rates?|exam coverage)\b/i;
const issues = [];
const warnings = [];

function resolveModule(fromFile, request) {
  const base = path.resolve(path.dirname(fromFile), request);
  for (const candidate of [base, `${base}.js`, path.join(base, 'index.js')]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  throw new Error(`Cannot resolve ${request} from ${path.relative(root, fromFile)}`);
}

function loadModule(filePath, cache = new Map()) {
  const absolutePath = path.resolve(filePath);
  if (cache.has(absolutePath)) return cache.get(absolutePath);

  let source = fs.readFileSync(absolutePath, 'utf8');
  const bindings = {};
  const firstDeclaration = source.search(/^(?:export\s+)?(?:const|let|var|function)\s/m);
  const header = firstDeclaration < 0 ? source : source.slice(0, firstDeclaration);
  const body = firstDeclaration < 0 ? '' : source.slice(firstDeclaration);
  const importPattern = /^\s*import\s+([^;\r\n]+?)\s+from\s+['"]([^'"]+)['"]\s*;?\s*$/gm;
  let importMatch;
  while ((importMatch = importPattern.exec(header))) {
    const [, clauseText, request] = importMatch;
    const clause = clauseText.trim();
    const imported = loadModule(resolveModule(absolutePath, request), cache);
    const namedImport = clause.match(/^\{([\s\S]*)\}$/);
    if (namedImport) {
      for (const item of namedImport[1].split(',')) {
        const [importedName, localName] = item.trim().split(/\s+as\s+/);
        if (importedName) bindings[localName || importedName] = imported[importedName];
      }
    } else {
      bindings[clause] = imported.default;
    }
  }
  source = `${header.replace(importPattern, '')}${body}`;

  source = source
    .replace(/export\s+default\s+/g, '')
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/export\s+function\s+/g, 'function ');
  const namedExports = [...source.matchAll(/\bconst\s+([A-Za-z_$][\w$]*)\s*=/g)].map((match) => match[1]);
  const defaultExport = fs.readFileSync(absolutePath, 'utf8').match(/export\s+default\s+([A-Za-z_$][\w$]*)\s*;/)?.[1];
  const returnNames = [...new Set(namedExports)].map((name) => `${JSON.stringify(name)}: typeof ${name} === 'undefined' ? undefined : ${name}`);
  if (defaultExport) returnNames.push(`default: ${defaultExport}`);

  try {
    const evaluator = new Function(...Object.keys(bindings), `${source}\nreturn { ${returnNames.join(', ')} };`);
    const result = evaluator(...Object.values(bindings));
    cache.set(absolutePath, result);
    return result;
  } catch (error) {
    throw new Error(`${path.relative(root, absolutePath)}: ${error.message}`);
  }
}

function extractObject(source, declaration) {
  const start = source.indexOf(declaration);
  if (start < 0) throw new Error(`Missing ${declaration}`);
  const braceStart = source.indexOf('{', start);
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = braceStart; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'" || character === '`') {
      quote = character;
    } else if (character === '{') {
      depth += 1;
    } else if (character === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(braceStart, index + 1);
    }
  }
  throw new Error(`Unclosed object for ${declaration}`);
}

function readSoftwareTracks(coursesByPath) {
  const filePath = path.join(learningHub, 'software-engineering', 'SoftwareEngineerRoadmap.js');
  const source = fs.readFileSync(filePath, 'utf8');
  const bindings = {};
  const importPattern = /import\s+(\w+)\s+from\s+['"](\.\/[^'"]+\/course)['"];?/g;
  for (const [, localName, request] of source.matchAll(importPattern)) {
    const modulePath = resolveModule(filePath, request);
    bindings[localName] = coursesByPath.get(modulePath)?.course;
  }
  const objectSource = extractObject(source, 'const SOFTWARE_ENGINEERING_TRACKS =');
  return new Function(...Object.keys(bindings), `return (${objectSource});`)(...Object.values(bindings));
}

function loadCourses(careerDir) {
  const courseFolders = fs.readdirSync(careerDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.endsWith('-course'))
    .map((entry) => path.join(careerDir, entry.name));
  const output = [];

  for (const courseFolder of courseFolders) {
    try {
      const courseModule = loadModule(path.join(courseFolder, 'course.js'));
      const course = courseModule.default || Object.values(courseModule).find((value) => value?.id);
      if (!course) throw new Error('course config has no default export');
      const lessonModule = loadModule(path.join(courseFolder, 'data', 'lessons.js'));
      const questionModule = loadModule(path.join(courseFolder, 'data', 'questions.js'));
      output.push({ folder: courseFolder, course, lessons: lessonModule.LESSONS, questions: questionModule.QUESTIONS });
    } catch (error) {
      issues.push(`${path.relative(root, courseFolder)}: ${error.message}`);
    }
  }
  return output;
}

function validateCourse({ folder, course, lessons, questions }, careerId, courseIds) {
  const label = path.relative(root, folder);
  const report = careerId === 'software-engineering' ? warnings : issues;
  const reportIssue = (message) => report.push(`${label}: ${message}`);
  if (!course?.id || !course?.title) reportIssue('course id and title are required');
  if (course?.id && courseIds.has(course.id)) reportIssue(`duplicate course id ${course.id}`);
  if (course?.id) courseIds.add(course.id);
  if (!Array.isArray(lessons) || lessons.length === 0) {
    reportIssue('lessons must be a non-empty array');
    return;
  }
  if (!Array.isArray(questions)) {
    reportIssue('questions must be an array');
    return;
  }
  if (course.quizSize && questions.length < course.quizSize) reportIssue('question bank is smaller than quizSize');
  if (!Number.isFinite(course.passingPercent) || course.passingPercent < 1 || course.passingPercent > 100) {
    reportIssue('passingPercent must be between 1 and 100');
  }
  if (careerId === 'nursing') {
    if (lessons.length !== 10 || questions.length !== 10 || course.quizSize !== 10) {
      reportIssue('Nursing courses must have exactly 10 lessons, 10 questions, and quizSize 10');
    }
    if (!course.outcome?.trim() || !course.prerequisites?.trim()) {
      reportIssue('Nursing courses must state an outcome and prerequisites');
    }
    if (!lessons[0]?.description?.includes('educational orientation, not medical advice or clinical training')) {
      reportIssue('first lesson must include the required educational-orientation note');
    }
    const contentText = JSON.stringify({ lessons, questions });
    if (restrictedNursingContent.test(contentText)) reportIssue('lesson or quiz text contains a restricted topic or claim');
  }

  const lessonIds = new Set();
  for (const lesson of lessons) {
    if (!lesson?.id || !lesson.title?.trim() || !lesson.description?.trim()) {
      reportIssue('lesson is missing a non-empty id, title, or description');
      continue;
    }
    if (lessonIds.has(lesson.id)) reportIssue(`duplicate lesson id ${lesson.id}`);
    lessonIds.add(lesson.id);
    if (careerId === 'nursing') {
      if (!Array.isArray(lesson.keyPoints) || lesson.keyPoints.length < 3 || lesson.keyPoints.length > 5) {
        reportIssue(`${lesson.id} must have 3 to 5 key points`);
      }
      if (!lesson.sections?.some((section) => /worked example/i.test(section.heading || '') && section.text?.trim())) {
        reportIssue(`${lesson.id} must include a concrete worked example`);
      }
      for (const activity of lesson.activities || []) {
        if (!nursingActivities.has(activity.type)) reportIssue(`unsupported Nursing activity type ${activity.type}`);
      }
    }
    for (const activity of lesson.activities || []) {
      if (!supportedActivities.has(activity.type)) reportIssue(`unsupported activity type ${activity.type}`);
    }
  }

  const questionTexts = new Set();
  const linkedLessonIds = new Set();
  const correctCounts = [0, 0, 0, 0];
  for (const question of questions) {
    if (!question?.question?.trim() || !question.lessonId) {
      reportIssue('question is missing text or lessonId');
      continue;
    }
    if (questionTexts.has(question.question)) reportIssue('duplicate question text');
    questionTexts.add(question.question);
    if (!lessonIds.has(question.lessonId)) reportIssue(`unresolved question lessonId ${question.lessonId}`);
    linkedLessonIds.add(question.lessonId);
    if (!Array.isArray(question.answers) || question.answers.length !== 4 || question.answers.some((answer) => typeof answer !== 'string' || !answer.trim()) || new Set(question.answers).size !== 4) {
      reportIssue(`${question.lessonId} must have four distinct, non-empty answers`);
    }
    if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct > 3) {
      reportIssue(`${question.lessonId} has an invalid correct-answer index`);
    } else {
      correctCounts[question.correct] += 1;
    }
    if (!question.explanation?.trim()) reportIssue(`${question.lessonId} has an empty question explanation`);
  }

  for (const lessonId of lessonIds) {
    if (!linkedLessonIds.has(lessonId)) reportIssue(`lesson ${lessonId} has no linked question`);
  }
  if (questions.length && Math.max(...correctCounts) / questions.length > 0.5) {
    warnings.push(`${label}: more than 50% of correct answers use the same index`);
  }
}

function readCareers(tracks) {
  const filePath = path.join(learningHub, 'careers', 'careers.js');
  const source = fs.readFileSync(filePath, 'utf8')
    .replace(/import\s+\{\s*TRACKS\s*\}\s+from\s+['"][^'"]+['"];?/, '')
    .replace(/if\s*\(__DEV__\)\s*\{[\s\S]*$/, '')
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/export\s+function\s+/g, 'function ');
  return new Function('TRACKS', `${source}\nreturn CAREERS;`)(tracks);
}

const softwareCareerDir = path.join(learningHub, 'software-engineering');
const softwareCourses = loadCourses(softwareCareerDir);
const softwareByPath = new Map(softwareCourses.map((entry) => [path.join(entry.folder, 'course.js'), entry]));
let tracks = {};
try {
  tracks = readSoftwareTracks(softwareByPath);
} catch (error) {
  issues.push(`software-engineering tracks: ${error.message}`);
}

const careerDirs = [softwareCareerDir];
for (const entry of fs.readdirSync(learningHub, { withFileTypes: true })) {
  if (!entry.isDirectory() || ['software-engineering', 'careers', 'shared', 'LearningHubScreen'].includes(entry.name)) continue;
  const candidate = path.join(learningHub, entry.name);
  if (fs.existsSync(path.join(candidate, 'tracks.js')) && fs.existsSync(path.join(candidate, 'index.js'))) careerDirs.push(candidate);
}

const coursesByCareer = new Map();
for (const careerDir of careerDirs) {
  if (careerDir === softwareCareerDir) {
    coursesByCareer.set('software-engineering', softwareCourses);
    continue;
  }
  const careerId = path.basename(careerDir);
  const careerCourses = loadCourses(careerDir);
  coursesByCareer.set(careerId, careerCourses);
  try {
    const trackModule = loadModule(path.join(careerDir, 'tracks.js'));
    const careerTracks = trackModule.tracks || trackModule.TRACKS || {};
    for (const trackId of Object.keys(careerTracks)) {
      if (trackId in tracks) issues.push(`duplicate registered track id ${trackId}`);
    }
    tracks = { ...tracks, ...careerTracks };
  } catch (error) {
    issues.push(`${careerId} tracks: ${error.message}`);
  }
}

const trackIds = new Set();
const courseIds = new Set();
for (const [careerId, careerCourses] of coursesByCareer) {
  for (const course of careerCourses) validateCourse(course, careerId, courseIds);
}
for (const [trackId, track] of Object.entries(tracks)) {
  if (trackIds.has(trackId)) issues.push(`duplicate track id ${trackId}`);
  trackIds.add(trackId);
  if (!Array.isArray(track?.steps)) issues.push(`track ${trackId} has no steps array`);
  for (const step of track?.steps || []) {
    if (!step.course && !step.title) issues.push(`${trackId}: a detail-only step has no title`);
  }
}

const routeCounts = new Map();
const navigatorPath = path.join(root, 'src', 'navigation', 'AppNavigator.js');
const navigatorSource = fs.readFileSync(navigatorPath, 'utf8');
for (const [, routeName] of navigatorSource.matchAll(/<Stack\.Screen\s+name="([^"]+)"/g)) {
  routeCounts.set(routeName, (routeCounts.get(routeName) || 0) + 1);
}
const nursingIndex = path.join(learningHub, 'nursing', 'index.js');
if (fs.existsSync(nursingIndex)) {
  const nursingSource = fs.readFileSync(nursingIndex, 'utf8');
  for (const [, routeName] of nursingSource.matchAll(/name:\s*'([^']+)'/g)) {
    routeCounts.set(routeName, (routeCounts.get(routeName) || 0) + 1);
  }
}
for (const [routeName, count] of routeCounts) {
  if (count > 1) issues.push(`duplicate registered route name ${routeName}`);
}

for (const [careerId, careerCourses] of coursesByCareer) {
  const ownedIds = new Set(careerCourses.map(({ course }) => course.id));
  for (const [trackId, track] of Object.entries(tracks)) {
    const containsCareerCourse = track.steps?.some((step) => step.course && ownedIds.has(step.course.id));
    if (!containsCareerCourse) continue;
    for (const step of track.steps) {
      if (step.course && !ownedIds.has(step.course.id)) issues.push(`${careerId}: track ${trackId} refers to a course from another career`);
      if (step.course && step.route && !routeCounts.has(step.route)) issues.push(`${careerId}: track ${trackId} route is not registered: ${step.route}`);
      if (step.course && !step.route) issues.push(`${careerId}: track ${trackId} course step has no route`);
    }
  }
}

try {
  const careers = readCareers(tracks);
  const seenCareerIds = new Set();
  for (const career of careers) {
    if (seenCareerIds.has(career.id)) issues.push(`duplicate career id ${career.id}`);
    seenCareerIds.add(career.id);
    for (const trackId of career.trackIds || []) {
      if (!(trackId in tracks)) issues.push(`${career.id}: trackIds entry does not resolve: ${trackId}`);
    }
    if (career.status === 'available' && !(career.trackIds || []).length) issues.push(`${career.id}: available career has no tracks`);
  }
} catch (error) {
  issues.push(`career registry: ${error.message}`);
}

if (issues.length) {
  console.error('Learning content validation failed:');
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  for (const warning of warnings) console.warn(`Warning: ${warning}`);
  const totalCourses = [...coursesByCareer.values()].flat().length;
  console.log(`Learning content validation passed: ${totalCourses} courses across ${coursesByCareer.size} registered career folders.`);
}
const stepRoutes = new Set();
for (const [trackId, track] of Object.entries(tracks)) {
  for (const step of track?.steps || []) {
    if (step.course && !courseIds.has(step.course.id)) issues.push(`${trackId}: step refers to an unknown course ${step.course.id}`);
    if (step.route && stepRoutes.has(step.route)) issues.push(`duplicate track step route ${step.route}`);
    if (step.route) stepRoutes.add(step.route);
  }
}