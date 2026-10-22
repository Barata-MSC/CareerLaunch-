import { ASSESSMENT_VERSION } from './data/questions.v1';
import { RIASEC_ORDER } from './data/riasecTypes';

export function scoreAssessment(answers, items) {
  if (!Array.isArray(items) || items.length !== 36 || !Array.isArray(answers)) {
    throw new Error('The assessment answer set is incomplete or invalid.');
  }

  const itemIds = new Set(items.map((item) => item.id));
  const answerMap = new Map();
  answers.forEach((answer) => {
    if (
      !answer ||
      !itemIds.has(answer.itemId) ||
      !Number.isInteger(answer.value) ||
      answer.value < 1 ||
      answer.value > 5 ||
      answerMap.has(answer.itemId)
    ) {
      throw new Error('The assessment answer set is incomplete or invalid.');
    }
    answerMap.set(answer.itemId, answer.value);
  });
  if (answerMap.size !== items.length) {
    throw new Error('Please answer every question before finishing.');
  }

  const raw = Object.fromEntries(RIASEC_ORDER.map((type) => [type, 0]));
  const strongestAnswerCount = Object.fromEntries(RIASEC_ORDER.map((type) => [type, 0]));
  items.forEach((item) => {
    const value = answerMap.get(item.id);
    raw[item.type] += value;
    if (value === 5) strongestAnswerCount[item.type] += 1;
  });

  const normalized = Object.fromEntries(
    RIASEC_ORDER.map((type) => [type, Math.round(((raw[type] - 6) / (30 - 6)) * 100)]),
  );
  const rankedTypes = [...RIASEC_ORDER].sort(
    (left, right) =>
      normalized[right] - normalized[left] ||
      RIASEC_ORDER.indexOf(left) - RIASEC_ORDER.indexOf(right) ||
      strongestAnswerCount[right] - strongestAnswerCount[left],
  );
  const scores = RIASEC_ORDER.map((type) => normalized[type]);

  return {
    version: ASSESSMENT_VERSION,
    raw,
    normalized,
    code: rankedTypes.slice(0, 3),
    undifferentiated: Math.max(...scores) - Math.min(...scores) <= 10,
    takenAt: new Date().toISOString(),
  };
}

function createRandom(seed) {
  let state = 2166136261;
  for (const character of String(seed)) {
    state ^= character.charCodeAt(0);
    state = Math.imul(state, 16777619);
  }
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function createQuestionOrder(items, seed) {
  if (!Array.isArray(items) || !items.length) {
    throw new Error('A question list is required to create an assessment.');
  }
  const random = createRandom(seed);
  const remaining = [...items];
  const ordered = [];
  while (remaining.length) {
    const previousType = ordered.length ? ordered[ordered.length - 1].type : null;
    const candidates = remaining
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.type !== previousType);
    if (!candidates.length) {
      throw new Error('Could not create an assessment order without repeated types.');
    }
    const { item, index } = candidates[Math.floor(random() * candidates.length)];
    ordered.push(item);
    remaining.splice(index, 1);
  }
  return ordered.map((item) => item.id);
}
