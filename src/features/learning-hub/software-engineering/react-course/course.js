// Everything that makes this course "the React course". The shared screens read
// all course text and numbers from here, so a new course = new data + new config.
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const reactCourse = {
  id: 'react', // saved as course_id in Supabase, so don't rename it later
  title: 'React fundamentals',
  shortCode: 'REACT', // course icon and topic label
  subtitle: 'Learn how to build interactive user interfaces.',
  passingPercent: 70,
  estimatedMinutes: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default reactCourse;
