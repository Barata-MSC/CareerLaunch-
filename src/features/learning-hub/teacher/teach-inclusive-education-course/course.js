import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-inclusive-education',
  title: 'Inclusive and Differentiated Instruction',
  shortCode: 'INC',
  subtitle: 'Teaching every learner.',
  outcome: 'Describe ways to adjust teaching for learners with different needs and backgrounds.',
  prerequisites: 'Curriculum and Lesson Planning is recommended.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
