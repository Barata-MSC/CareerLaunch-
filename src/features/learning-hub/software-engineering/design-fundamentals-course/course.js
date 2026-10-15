// Everything that makes this course "the Design Fundamentals course". The shared screens read
// all course text and numbers from here, so a new course = new data + new config.
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const designFundamentalsCourse = {
  id: 'design-fundamentals', // saved as course_id in Supabase, so don't rename it later
  title: 'Design Fundamentals',
  shortCode: 'UX', // course icon and topic label
  subtitle: 'Learn the core principles behind good UI and UX design.',
  passingPercent: 70,
  estimatedMinutes: 10,
  lessons: LESSONS,
  questions: QUESTIONS, // 10 questions, one per lesson; no quizSize means all are used
};

export default designFundamentalsCourse;
