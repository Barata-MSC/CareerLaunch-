import { CAREER_FIT } from './data/careerFit';
import { RIASEC_TYPES } from './data/riasecTypes';

const POSITION_WEIGHTS = [3, 2, 1];

export function matchCareers(result, careers, careerFit = CAREER_FIT) {
  if (!result?.code || !result?.normalized || !Array.isArray(careers)) {
    throw new Error('A scored assessment and career list are required.');
  }

  const matches = careers.map((career) => {
    const types = careerFit[career.id];
    if (!types) throw new Error(`No Holland fit is configured for ${career.id}.`);
    const totalWeight = POSITION_WEIGHTS.reduce((sum, weight) => sum + weight, 0);
    const weightedScore = types.reduce(
      (sum, type, index) =>
        sum + POSITION_WEIGHTS[index] * (result.normalized[type] ?? 0),
      0,
    );
    const whyTypes = result.code
      .slice(0, 2)
      .map((type) => RIASEC_TYPES[type]?.name)
      .filter(Boolean);
    return {
      career,
      score: Math.round(weightedScore / totalWeight),
      why: `Your ${whyTypes.join(' and ')} interests may connect with this career.`,
    };
  });

  return matches.sort((left, right) => {
    if (right.score !== left.score) return right.score - left.score;
    if (left.career.id < right.career.id) return -1;
    if (left.career.id > right.career.id) return 1;
    return 0;
  });
}
