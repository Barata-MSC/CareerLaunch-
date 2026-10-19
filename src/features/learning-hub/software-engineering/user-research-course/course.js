// Everything that makes this course "the User Research course". The shared screens read
// all course text and numbers from here, so a new course = new data + new config.
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const userResearchCourse = {
  id: 'user-research', // saved as course_id in Supabase, so don't rename it later
  title: 'User Research',
  shortCode: 'UXR', // course icon and topic label
  subtitle: 'Learn how to study users and turn findings into design decisions.',
  passingPercent: 70,
  estimatedMinutes: 10,
  lessons: LESSONS,
  questions: QUESTIONS, // 10 questions, one per lesson; no quizSize means all are used
};

export default userResearchCourse;
