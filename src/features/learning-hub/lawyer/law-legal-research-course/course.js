import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_legal_researchCourse = {
  id: 'law-legal-research',
  title: 'Legal Research Skills',
  shortCode: 'RES',
  subtitle: 'Finding and evaluating legal sources.',
  outcomes: [COURSE_DETAILS['law-legal-research'].outcome],
  prerequisites: COURSE_DETAILS['law-legal-research'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_legal_researchCourse;
