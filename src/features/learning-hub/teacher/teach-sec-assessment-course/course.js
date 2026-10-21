import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-sec-assessment',
  title: 'Assessment and Feedback',
  shortCode: 'AFB',
  subtitle: 'Measuring learning and helping it grow.',
  outcome: 'Design assessments and give feedback that helps learners improve.',
  prerequisites: 'No prior course is required.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
