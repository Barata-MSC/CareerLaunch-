import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-classroom-management',
  title: 'Classroom Management',
  shortCode: 'CLM',
  subtitle: 'Building a calm, respectful classroom.',
  outcome: 'Describe routines and positive strategies for managing a young class.',
  prerequisites: 'Foundations of Teaching is recommended; no specialist background is assumed.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
