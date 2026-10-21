import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_procedure_advocacyCourse = {
  id: 'law-procedure-advocacy',
  title: 'Procedure, Evidence, and Advocacy Basics',
  shortCode: 'PRC',
  subtitle: 'How cases move and how lawyers argue them.',
  outcomes: [COURSE_DETAILS['law-procedure-advocacy'].outcome],
  prerequisites: COURSE_DETAILS['law-procedure-advocacy'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_procedure_advocacyCourse;
