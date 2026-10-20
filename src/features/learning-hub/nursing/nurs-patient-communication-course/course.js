import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'nurs-patient-communication',
  title: 'Communication with Patients and Families',
  shortCode: 'PCM',
  subtitle: 'Listening, explaining, and showing empathy.',
  outcome: 'Describe good communication habits with patients, families, and the care team.',
  prerequisites: 'No prior healthcare communication study is expected; the course builds from respectful everyday conversation.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
