import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const babel = require('@babel/core');
const commonJsPlugin = require('@babel/plugin-transform-modules-commonjs');
const parser = require('@babel/parser');
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceCache = new Map();
const errors = [];

function resolveSource(specifier, parentPath) {
  const basePath = path.resolve(path.dirname(parentPath), specifier);
  const candidates = [basePath, `${basePath}.js`, path.join(basePath, 'index.js')];
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
}

function loadPureSource(filePath) {
  const absolutePath = path.resolve(filePath);
  if (sourceCache.has(absolutePath)) return sourceCache.get(absolutePath).exports;
  const module = { exports: {} };
  sourceCache.set(absolutePath, module);
  const transformed = babel.transformFileSync(absolutePath, {
    babelrc: false,
    configFile: false,
    plugins: [commonJsPlugin],
    sourceType: 'module',
  });
  const localRequire = (specifier) => {
    if (!specifier.startsWith('.')) {
      throw new Error(`Assessment validation only loads local pure modules; found ${specifier}.`);
    }
    const resolved = resolveSource(specifier, absolutePath);
    if (!resolved) throw new Error(`Cannot resolve ${specifier} from ${absolutePath}.`);
    return loadPureSource(resolved);
  };
  new Function('require', 'module', 'exports', transformed.code)(
    localRequire,
    module,
    module.exports,
  );
  return module.exports;
}

function loadCareerMetadata() {
  const careerPath = path.join(
    projectRoot,
    'src/features/learning-hub/careers/careers.js',
  );
  const source = fs.readFileSync(careerPath, 'utf8');
  const ast = parser.parse(source, { sourceType: 'module' });
  const exported = ast.program.body.find(
    (node) =>
      node.type === 'ExportNamedDeclaration' &&
      node.declaration?.type === 'VariableDeclaration' &&
      node.declaration.declarations.some((declaration) => declaration.id.name === 'CAREERS'),
  );
  const declaration = exported?.declaration.declarations.find((item) => item.id.name === 'CAREERS');
  assert.ok(declaration?.init?.type === 'ArrayExpression', 'CAREERS must remain an array literal.');
  return vm.runInNewContext(source.slice(declaration.init.start, declaration.init.end));
}

function recordError(label, callback) {
  try {
    callback();
  } catch (error) {
    errors.push(`${label}: ${error.message}`);
  }
}

function answersByType(items, valuesByType) {
  return items.map((item) => ({ itemId: item.id, value: valuesByType[item.type] ?? 3 }));
}

function verify() {
  const assessmentDir = path.join(projectRoot, 'src/features/career-assessment');
  const { ASSESSMENT_ITEMS, ASSESSMENT_VERSION } = loadPureSource(
    path.join(assessmentDir, 'data/questions.v1.js'),
  );
  const { scoreAssessment, createQuestionOrder } = loadPureSource(
    path.join(assessmentDir, 'scoring.js'),
  );
  const { matchCareers } = loadPureSource(path.join(assessmentDir, 'matching.js'));
  const { CAREER_FIT } = loadPureSource(path.join(assessmentDir, 'data/careerFit.js'));
  const careers = loadCareerMetadata();
  const ids = careers.map((career) => career.id);
  const types = ['R', 'I', 'A', 'S', 'E', 'C'];
  const typeCounts = Object.fromEntries(types.map((type) => [type, 0]));

  assert.equal(ASSESSMENT_VERSION, 'v1', 'Assessment version must be present and stable.');
  assert.equal(ASSESSMENT_ITEMS.length, 36, 'The question bank must contain exactly 36 items.');
  assert.equal(new Set(ASSESSMENT_ITEMS.map((item) => item.id)).size, 36, 'Question IDs must be unique.');
  ASSESSMENT_ITEMS.forEach((item) => {
    assert.ok(item.text.trim(), `${item.id} must have text.`);
    assert.ok(types.includes(item.type), `${item.id} uses an unknown RIASEC type.`);
    typeCounts[item.type] += 1;
  });
  types.forEach((type) => assert.equal(typeCounts[type], 6, `${type} must have six items.`));

  const allFives = scoreAssessment(answersByType(ASSESSMENT_ITEMS, { R: 5, I: 5, A: 5, S: 5, E: 5, C: 5 }), ASSESSMENT_ITEMS);
  assert.deepEqual(allFives.raw, Object.fromEntries(types.map((type) => [type, 30])));
  assert.deepEqual(allFives.normalized, Object.fromEntries(types.map((type) => [type, 100])));
  assert.deepEqual(allFives.code, ['R', 'I', 'A']);

  const allOnes = scoreAssessment(answersByType(ASSESSMENT_ITEMS, { R: 1, I: 1, A: 1, S: 1, E: 1, C: 1 }), ASSESSMENT_ITEMS);
  assert.deepEqual(allOnes.normalized, Object.fromEntries(types.map((type) => [type, 0])));
  assert.deepEqual(allOnes.code, ['R', 'I', 'A']);

  const mixed = scoreAssessment(
    answersByType(ASSESSMENT_ITEMS, { R: 5, I: 4, A: 3, S: 2, E: 1, C: 3 }),
    ASSESSMENT_ITEMS,
  );
  assert.equal(mixed.normalized.R, 100);
  assert.equal(mixed.normalized.E, 0);
  assert.deepEqual(mixed.code, ['R', 'I', 'A']);

  const tieAnswers = ASSESSMENT_ITEMS.map((item) => {
    const itemIndex = Number(item.id.slice(1)) - 1;
    const value = item.type === 'A' ? [5, 5, 2, 2, 2, 2][itemIndex] : 3;
    return { itemId: item.id, value };
  });
  const tieResult = scoreAssessment(tieAnswers, ASSESSMENT_ITEMS);
  assert.equal(tieResult.normalized.A, tieResult.normalized.R);
  assert.equal(tieResult.code[0], 'R', 'Tied scores must first use RIASEC hexagon order.');
  assert.deepEqual(tieResult.code, ['R', 'I', 'A']);

  const flat = scoreAssessment(answersByType(ASSESSMENT_ITEMS, {}), ASSESSMENT_ITEMS);
  assert.equal(flat.undifferentiated, true);
  assert.throws(
    () => scoreAssessment(ASSESSMENT_ITEMS.slice(1).map((item) => ({ itemId: item.id, value: 3 })), ASSESSMENT_ITEMS),
    /answer every question/i,
  );

  const firstOrder = createQuestionOrder(ASSESSMENT_ITEMS, 'stable-test-seed');
  assert.deepEqual(createQuestionOrder(ASSESSMENT_ITEMS, 'stable-test-seed'), firstOrder);
  assert.equal(new Set(firstOrder).size, ASSESSMENT_ITEMS.length);
  firstOrder.forEach((itemId, index) => {
    if (index === 0) return;
    const previous = ASSESSMENT_ITEMS.find((item) => item.id === firstOrder[index - 1]);
    const current = ASSESSMENT_ITEMS.find((item) => item.id === itemId);
    assert.notEqual(previous.type, current.type, 'Same-type questions cannot be adjacent.');
  });

  assert.deepEqual(
    Object.keys(CAREER_FIT).sort(),
    [...ids].sort(),
    'Career fit entries must exactly match the current CAREERS IDs.',
  );
  Object.entries(CAREER_FIT).forEach(([careerId, fit]) => {
    assert.equal(fit.length, 3, `${careerId} must have three Holland weights.`);
    fit.forEach((type) => assert.ok(types.includes(type), `${careerId} has invalid type ${type}.`));
  });

  const weighted = matchCareers(
    { code: ['C', 'E', 'I'], normalized: { C: 60, E: 50, I: 20 } },
    careers,
  );
  const accountancy = weighted.find((match) => match.career.id === 'accountancy');
  assert.equal(accountancy.score, 50, 'Primary, secondary, tertiary weights must be 3, 2, and 1.');
  assert.ok(weighted.every((match, index) => index === 0 || weighted[index - 1].score >= match.score));

  const tiedMatches = matchCareers(
    { code: ['R', 'I', 'A'], normalized: Object.fromEntries(types.map((type) => [type, 50])) },
    careers,
  );
  assert.equal(
    tiedMatches.map((match) => match.career.id).join('|'),
    [...ids].sort().join('|'),
    'Equal match scores must be sorted alphabetically by career ID.',
  );

  careers.forEach((career) => {
    const [primary, secondary, tertiary] = CAREER_FIT[career.id];
    const synthetic = scoreAssessment(
      answersByType(ASSESSMENT_ITEMS, {
        [primary]: 5,
        [secondary]: 4,
        [tertiary]: 3,
      }),
      ASSESSMENT_ITEMS,
    );
    const ranking = matchCareers(
      { code: synthetic.code, normalized: synthetic.normalized },
      careers,
    );
    assert.ok(
      ranking.slice(0, 3).some((match) => match.career.id === career.id),
      `${career.id} must rank in the top three for its synthetic interest pattern.`,
    );
  });

  ['doctor', 'marine'].forEach((id) => {
    const career = careers.find((entry) => entry.id === id);
    assert.equal(career?.status, 'coming-soon', `${id} must remain unavailable pending expert review.`);
  });

  recordError('route ids', () => {
    const navigator = fs.readFileSync(path.join(projectRoot, 'src/navigation/AppNavigator.js'), 'utf8');
    ['CareerAssessmentIntro', 'CareerAssessmentQuestions', 'CareerAssessmentResult', 'CareerAssessmentWorksheet']
      .forEach((route) => assert.ok(navigator.includes(`name="${route}"`), `${route} is not registered.`));
  });
}

try {
  verify();
} catch (error) {
  errors.push(error.message);
}

if (errors.length) {
  console.error(`Assessment validation failed:\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log('Assessment validation passed (36 items, deterministic scoring and matching, all registered careers covered).');
}
