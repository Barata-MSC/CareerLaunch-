import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_client_intake_confidentialityCourse = {
  id: 'law-client-intake-confidentiality',
  title: 'Client Intake and Confidentiality',
  shortCode: 'CIC',
  subtitle: 'First contact and protecting information.',
  outcomes: [COURSE_DETAILS['law-client-intake-confidentiality'].outcome],
  prerequisites: COURSE_DETAILS['law-client-intake-confidentiality'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_client_intake_confidentialityCourse;
