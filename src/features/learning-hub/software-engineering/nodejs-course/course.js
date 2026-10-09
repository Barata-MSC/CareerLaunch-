// Everything that makes this course "the Node.js course". The shared screens read
// all course text and numbers from here, so a new course = new data + new config.
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const nodeCourse = {
  id: 'nodejs', // saved as course_id in Supabase, so don't rename it later
  title: 'Node.js fundamentals',
  shortCode: 'NODE', // course icon and topic label
  subtitle: 'Learn how to build servers and APIs with JavaScript.',
  passingPercent: 70,
  estimatedMinutes: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default nodeCourse;
