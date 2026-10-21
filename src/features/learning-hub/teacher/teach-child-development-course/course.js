import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-child-development',
  title: 'Child Development and Learning',
  shortCode: 'CDL',
  subtitle: 'How young children grow and learn.',
  outcome: 'Explain major stages of child development and how they shape teaching.',
  prerequisites: 'Foundations of Teaching is recommended; no specialist background is assumed.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
