import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_path_to_practiceCourse = {
  id: 'law-path-to-practice',
  title: 'Path to Practice and Client Communication',
  shortCode: 'PTP',
  subtitle: 'Becoming a lawyer and working with clients.',
  outcomes: [COURSE_DETAILS['law-path-to-practice'].outcome],
  prerequisites: COURSE_DETAILS['law-path-to-practice'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_path_to_practiceCourse;
