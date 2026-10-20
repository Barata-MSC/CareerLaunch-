import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_document_draftingCourse = {
  id: 'law-document-drafting',
  title: 'Legal Documents and Drafting Basics',
  shortCode: 'DOC',
  subtitle: 'Common legal documents and how they are prepared.',
  outcomes: [COURSE_DETAILS['law-document-drafting'].outcome],
  prerequisites: COURSE_DETAILS['law-document-drafting'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_document_draftingCourse;
