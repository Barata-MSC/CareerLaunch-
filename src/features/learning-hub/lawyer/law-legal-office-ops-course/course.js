import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_legal_office_opsCourse = {
  id: 'law-legal-office-ops',
  title: 'Legal Office Operations',
  shortCode: 'LOP',
  subtitle: 'How a legal office runs.',
  outcomes: [COURSE_DETAILS['law-legal-office-ops'].outcome],
  prerequisites: COURSE_DETAILS['law-legal-office-ops'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_legal_office_opsCourse;
