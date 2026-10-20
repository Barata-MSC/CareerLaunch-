import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_profession_ethicsCourse = {
  id: 'law-profession-ethics',
  title: 'The Legal Profession and Ethics',
  shortCode: 'LEG',
  subtitle: 'What lawyers do and the duties they carry.',
  outcomes: [COURSE_DETAILS['law-profession-ethics'].outcome],
  prerequisites: COURSE_DETAILS['law-profession-ethics'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_profession_ethicsCourse;
