// Everything that makes this course "the CSS course". The shared screens read
// all course text and numbers from here, so a new course = new data + new config.
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const cssCourse = {
  id: 'css', // saved as course_id in Supabase, so don't rename it later
  title: 'CSS fundamentals',
  shortCode: 'CSS', // course icon and topic label
  subtitle: 'Learn how to style and design webpages.',
  passingPercent: 70,
  estimatedMinutes: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default cssCourse;
