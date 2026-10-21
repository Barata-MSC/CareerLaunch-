import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-literacy-numeracy',
  title: 'Teaching Literacy and Numeracy',
  shortCode: 'LIT',
  subtitle: 'Reading, writing, and math in the early grades.',
  outcome: 'Explain how early reading and number skills develop and common ways to teach them.',
  prerequisites: 'Foundations of Teaching and Child Development are recommended.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
