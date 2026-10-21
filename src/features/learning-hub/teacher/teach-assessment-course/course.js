import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-assessment',
  title: 'Assessment of Learning',
  shortCode: 'ASM',
  subtitle: 'Knowing what learners have learned.',
  outcome: 'Distinguish formative and summative assessment and design a simple one.',
  prerequisites: 'Curriculum and Lesson Planning is recommended.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
