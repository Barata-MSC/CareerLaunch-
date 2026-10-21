import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'nurs-safety-documentation',
  title: 'Patient Safety, Documentation, and Teamwork',
  shortCode: 'PSD',
  subtitle: 'Working safely with a care team.',
  outcome: 'Explain why accurate records, handoffs, and teamwork protect patients.',
  prerequisites: 'This course builds on communication and care foundations; examples remain conceptual and do not define procedures or scope.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
