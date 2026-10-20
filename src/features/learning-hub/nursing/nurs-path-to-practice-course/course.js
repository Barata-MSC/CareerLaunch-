import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'nurs-path-to-practice',
  title: 'Path to Practice and Caring for Yourself',
  shortCode: 'PTP',
  subtitle: 'Becoming a nurse and staying well while caring for others.',
  outcome: 'Describe the general path to becoming a licensed nurse and healthy habits for a demanding career.',
  prerequisites: 'This closing course brings together the pathway’s foundations and points learners toward current official education and licensing information.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
