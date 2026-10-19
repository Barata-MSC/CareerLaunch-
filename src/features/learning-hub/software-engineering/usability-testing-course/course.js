// Everything that makes this course "the Usability Testing course". The shared screens read
// all course text and numbers from here, so a new course = new data + new config.
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const usabilityTestingCourse = {
  id: 'usability-testing', // saved as course_id in Supabase, so don't rename it later
  title: 'Usability Testing',
  shortCode: 'UT', // course icon and topic label
  subtitle: 'Plan, run, and analyze tests that show how real users experience your design.',
  passingPercent: 70,
  estimatedMinutes: 10,
  lessons: LESSONS,
  questions: QUESTIONS, // 10 questions, one per lesson; no quizSize means all are used
};

export default usabilityTestingCourse;
