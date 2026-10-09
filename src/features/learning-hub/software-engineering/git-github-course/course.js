// Everything that makes this course "the Git and GitHub course". The shared screens read
// all course text and numbers from here, so a new course = new data + new config.
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const gitCourse = {
  id: 'git-github', // saved as course_id in Supabase, so don't rename it later
  title: 'Git and GitHub',
  shortCode: 'GIT', // course icon and topic label
  subtitle: 'Learn how to track code and collaborate.',
  passingPercent: 70,
  estimatedMinutes: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default gitCourse;
