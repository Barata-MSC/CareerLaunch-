import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_court_filingCourse = {
  id: 'law-court-filing',
  title: 'Court Processes and Filing Basics',
  shortCode: 'FIL',
  subtitle: 'How documents reach the court.',
  outcomes: [COURSE_DETAILS['law-court-filing'].outcome],
  prerequisites: COURSE_DETAILS['law-court-filing'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_court_filingCourse;
