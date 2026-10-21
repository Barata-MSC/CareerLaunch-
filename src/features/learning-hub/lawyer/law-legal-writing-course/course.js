import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_legal_writingCourse = {
  id: 'law-legal-writing',
  title: 'Legal Writing and Analysis',
  shortCode: 'WRT',
  subtitle: 'Reasoning and writing clearly.',
  outcomes: [COURSE_DETAILS['law-legal-writing'].outcome],
  prerequisites: COURSE_DETAILS['law-legal-writing'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_legal_writingCourse;
