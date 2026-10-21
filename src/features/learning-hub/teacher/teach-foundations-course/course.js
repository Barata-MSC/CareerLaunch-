import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-foundations',
  title: 'Foundations of Teaching',
  shortCode: 'FND',
  subtitle: 'What teachers do and why it matters.',
  outcome: 'Describe the roles, responsibilities, and ethics of a teacher.',
  prerequisites: 'None; designed as an introduction for beginning learners.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
