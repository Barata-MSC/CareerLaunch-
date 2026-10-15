// Everything that makes this course "the Statistics course". The shared screens read
// all course text and numbers from here, so a new course = new data + new config.
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const statisticsCourse = {
  id: 'statistics', // saved as course_id in Supabase, so don't rename it later
  title: 'Statistics',
  shortCode: 'STA', // course icon and topic label
  subtitle: 'Learn the statistics every data analyst needs.',
  passingPercent: 70,
  estimatedMinutes: 10,
  quizSize: 10, // each attempt picks 10 of the 100 questions, one per lesson
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default statisticsCourse;