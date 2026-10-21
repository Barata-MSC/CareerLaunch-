import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-sec-career-licensure',
  title: 'Teaching Career and Licensure Preparation',
  shortCode: 'TCL',
  subtitle: 'From student to licensed teacher.',
  outcome: 'Explain the path to becoming a licensed teacher and how to keep developing.',
  prerequisites: 'No prior course is required.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
