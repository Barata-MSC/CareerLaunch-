import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'nurs-health-promotion',
  title: 'Health Promotion and Community Health',
  shortCode: 'HPC',
  subtitle: 'Helping people stay well.',
  outcome: 'Describe prevention, health education, and the role of nurses in communities.',
  prerequisites: 'This course follows the communication and care foundations and discusses public-health ideas in general terms.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
