import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_legal_tech_recordsCourse = {
  id: 'law-legal-tech-records',
  title: 'Legal Technology and Records Management',
  shortCode: 'LTR',
  subtitle: 'Tools and file systems that keep cases organized.',
  outcomes: [COURSE_DETAILS['law-legal-tech-records'].outcome],
  prerequisites: COURSE_DETAILS['law-legal-tech-records'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_legal_tech_recordsCourse;
