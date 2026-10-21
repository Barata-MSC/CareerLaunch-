import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-sec-content-pedagogy',
  title: 'Subject Content and Pedagogy',
  shortCode: 'PED',
  subtitle: 'Teaching your subject well.',
  outcome: 'Describe how teachers turn subject knowledge into clear, engaging instruction.',
  prerequisites: 'No prior course is required.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
