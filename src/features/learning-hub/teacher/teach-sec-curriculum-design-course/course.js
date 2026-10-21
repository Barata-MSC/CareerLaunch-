import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-sec-curriculum-design',
  title: 'Curriculum Design and Unit Planning',
  shortCode: 'CUR',
  subtitle: 'Planning units that build on each other.',
  outcome: 'Plan a short unit with aligned objectives, activities, and assessment.',
  prerequisites: 'No prior course is required.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
