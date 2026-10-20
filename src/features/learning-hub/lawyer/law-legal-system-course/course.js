import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_legal_systemCourse = {
  id: 'law-legal-system',
  title: 'The Philippine Legal System',
  shortCode: 'SYS',
  subtitle: 'How laws are made, applied, and interpreted.',
  outcomes: [COURSE_DETAILS['law-legal-system'].outcome],
  prerequisites: COURSE_DETAILS['law-legal-system'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_legal_systemCourse;
