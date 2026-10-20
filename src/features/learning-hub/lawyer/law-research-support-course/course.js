import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { COURSE_DETAILS } from '../courseCatalog';

const law_research_supportCourse = {
  id: 'law-research-support',
  title: 'Legal Research Support',
  shortCode: 'RSP',
  subtitle: 'Helping lawyers find what they need.',
  outcomes: [COURSE_DETAILS['law-research-support'].outcome],
  prerequisites: COURSE_DETAILS['law-research-support'].prerequisites,
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default law_research_supportCourse;
