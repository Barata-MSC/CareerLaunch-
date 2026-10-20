import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'nurs-profession-ethics',
  title: 'The Nursing Profession and Ethics',
  shortCode: 'NPE',
  subtitle: 'What nurses do and the duties they carry.',
  outcome: 'Describe the roles of a nurse and why ethics, dignity, and confidentiality matter.',
  prerequisites: 'No prior nursing study is expected; this course introduces the profession and its shared foundations.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
