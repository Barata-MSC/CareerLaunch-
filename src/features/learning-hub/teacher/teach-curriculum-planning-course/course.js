import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-curriculum-planning',
  title: 'Curriculum and Lesson Planning',
  shortCode: 'CLP',
  subtitle: 'Turning goals into lessons.',
  outcome: 'Write a clear lesson objective and plan a simple lesson.',
  prerequisites: 'Foundations of Teaching is recommended; no specialist background is assumed.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
