import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'nurs-infection-prevention',
  title: 'Infection Prevention Basics',
  shortCode: 'INF',
  subtitle: 'Why hygiene and safe habits protect everyone.',
  outcome: 'Explain in general terms how infections spread and why prevention practices exist.',
  prerequisites: 'No prior infection-control study is expected; this is a conceptual overview, not a procedural guide.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
