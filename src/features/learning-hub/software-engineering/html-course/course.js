// Everything that makes this course "the HTML course". The shared screens read
// all course text and numbers from here.
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const htmlCourse = {
  id: 'html', // saved as course_id in Supabase, so don't rename it later
  title: 'HTML fundamentals',
  shortCode: 'HTML', // course icon and topic label
  subtitle: 'Learn how to structure webpages with HTML.',
  passingPercent: 70,
  quizSize: 10, // each attempt shows 10 questions, one per lesson, from the 100 in the bank
  estimatedMinutes: 8,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default htmlCourse;
