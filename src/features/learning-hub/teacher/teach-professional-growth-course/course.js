import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-professional-growth',
  title: 'Professional Growth and Licensure Preparation',
  shortCode: 'PRO',
  subtitle: 'Building a teaching career.',
  outcome: 'Explain the path to becoming a licensed teacher and how teachers keep growing.',
  prerequisites: 'The other elementary-track courses are recommended.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
