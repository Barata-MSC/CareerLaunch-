import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'nurs-fundamentals-of-care',
  title: 'Fundamentals of Nursing Care',
  shortCode: 'FNC',
  subtitle: 'The ideas behind everyday patient care.',
  outcome: 'Explain the nursing process as a framework and the principles of comfort, safety, and dignity.',
  prerequisites: 'The course builds on the profession and communication foundations; it stays conceptual and does not teach procedures.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
