// Everything that makes this course "the Node.js course". The shared screens read
// all course text and numbers from here, so a new course = new data + new config.
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';


const sqlCourse = {
  id: 'sql', // saved as course_id in Supabase, so don't rename it later
  title: 'SQL Fundamentals',
  shortCode: 'SQL', // course icon and topic label
  subtitle: 'Learn how to query and manage databases with SQL.',
  passingPercent: 70,
  quizSize: 10, // each attempt shows 10 questions, one per lesson, from the 100 in the bank
  estimatedMinutes: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default sqlCourse;
