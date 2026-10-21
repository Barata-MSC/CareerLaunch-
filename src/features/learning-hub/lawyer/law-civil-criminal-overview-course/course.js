import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_civil_criminal_overviewCourse = {
  id: 'law-civil-criminal-overview',
  title: 'Civil and Criminal Law Overview',
  shortCode: 'CCL',
  subtitle: 'The big picture of private and public law.',
  outcomes: [COURSE_DETAILS['law-civil-criminal-overview'].outcome],
  prerequisites: COURSE_DETAILS['law-civil-criminal-overview'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_civil_criminal_overviewCourse;
