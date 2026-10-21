import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'nurs-body-basics',
  title: 'Human Body Basics',
  shortCode: 'HBB',
  subtitle: 'A friendly tour of how the body is organized.',
  outcome: 'Name the major body systems and describe in general terms what each one does.',
  prerequisites: 'No biology background is required; this course introduces cells, tissues, organs, and major systems.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
