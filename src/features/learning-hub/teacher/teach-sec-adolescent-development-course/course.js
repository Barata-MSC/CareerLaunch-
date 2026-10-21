import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-sec-adolescent-development',
  title: 'Adolescent Development and Learning',
  shortCode: 'ADL',
  subtitle: 'How teenagers grow and learn.',
  outcome: 'Explain key features of adolescent development and their effect on learning.',
  prerequisites: 'No prior course is required.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
