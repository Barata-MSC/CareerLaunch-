import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const babel = require('@babel/core');
const commonJsPlugin = require('@babel/plugin-transform-modules-commonjs');
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceCache = new Map();

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
      throw new Error(`Walkthrough validation only loads local pure modules; found ${specifier}.`);
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

function verify() {
  const onboardingDir = path.join(projectRoot, 'src/features/onboarding');
  const { WALKTHROUGH_STEPS, WALKTHROUGH_VERSION } = loadPureSource(
    path.join(onboardingDir, 'data/walkthroughSteps.js'),
  );
  const { buildStoredValue, shouldShowWalkthrough } = loadPureSource(
    path.join(onboardingDir, 'walkthroughLogic.js'),
  );

  assert.ok(Number.isInteger(WALKTHROUGH_VERSION) && WALKTHROUGH_VERSION > 0);
  assert.ok(WALKTHROUGH_STEPS.length > 0, 'At least one walkthrough step is required.');
  assert.equal(
    new Set(WALKTHROUGH_STEPS.map((step) => step.id)).size,
    WALKTHROUGH_STEPS.length,
    'Walkthrough step IDs must be unique.',
  );
  WALKTHROUGH_STEPS.forEach((step) => {
    assert.ok(typeof step.title === 'string' && step.title.trim(), `${step.id} needs a title.`);
    assert.ok(typeof step.body === 'string' && step.body.trim(), `${step.id} needs body copy.`);
  });

  assert.equal(shouldShowWalkthrough(null), true, 'A missing preference should show the tour.');
  assert.equal(
    shouldShowWalkthrough({ dismissed: true, version: WALKTHROUGH_VERSION }),
    false,
    'A current dismissed preference should hide the tour.',
  );
  assert.equal(
    shouldShowWalkthrough({ dismissed: true, version: WALKTHROUGH_VERSION - 1 }),
    true,
    'An older dismissed preference should show the updated tour.',
  );
  assert.equal(
    shouldShowWalkthrough(null, { readFailed: true }),
    false,
    'A preference read failure must not show the tour.',
  );
  assert.equal(
    shouldShowWalkthrough(null, { alreadyShown: true }),
    false,
    'The tour must not automatically repeat in the same app session.',
  );

  const storedValue = buildStoredValue('2026-10-23T00:00:00.000Z');
  assert.deepEqual(
    Object.keys(storedValue).sort(),
    ['at', 'dismissed', 'version'],
    'Stored preference must contain only allowed fields.',
  );
  assert.deepEqual(storedValue, {
    dismissed: true,
    version: WALKTHROUGH_VERSION,
    at: '2026-10-23T00:00:00.000Z',
  });

  const walkthroughCopy = WALKTHROUGH_STEPS
    .map(({ title, body }) => `${title} ${body}`)
    .join(' ');
  assert.doesNotMatch(
    walkthroughCopy,
    /job finder|coach ai|voice|doctor|marine|accountancy|civil engineering|hospitality\s*&\s*tourism/i,
    'Walkthrough copy must not promise unavailable features or coming-soon careers.',
  );

  console.log(
    `Walkthrough validation passed (${WALKTHROUGH_STEPS.length} steps, version ${WALKTHROUGH_VERSION}).`,
  );
}

verify();