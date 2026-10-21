import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_constitutional_basicsCourse = {
  id: 'law-constitutional-basics',
  title: 'Constitutional Law Concepts',
  shortCode: 'CON',
  subtitle: 'The ideas behind the Constitution.',
  outcomes: [COURSE_DETAILS['law-constitutional-basics'].outcome],
  prerequisites: COURSE_DETAILS['law-constitutional-basics'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_constitutional_basicsCourse;
