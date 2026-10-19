// Everything that makes this course "the Wireframing course". The shared screens read
// all course text and numbers from here, so a new course = new data + new config.
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const wireframingCourse = {
  id: 'wireframing', // saved as course_id in Supabase, so don't rename it later
  title: 'Wireframing',
  shortCode: 'WF', // course icon and topic label
  subtitle: 'Sketch layouts, map user flows, and test ideas before you design.',
  passingPercent: 70,
  estimatedMinutes: 10,
  lessons: LESSONS,
  questions: QUESTIONS, // 10 questions, one per lesson; no quizSize means all are used
};

export default wireframingCourse;
