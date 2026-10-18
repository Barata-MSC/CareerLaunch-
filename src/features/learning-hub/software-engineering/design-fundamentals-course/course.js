import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';
import { EXTRAS } from './data/lessonExtras';

// Merge interactive extras into lessons array
const lessonsWithExtras = LESSONS.map((lesson) => ({
  ...lesson,
  ...(EXTRAS[lesson.id] || {}),
}));

const designFundamentalsCourse = {
  id: 'design-fundamentals',
  title: 'Design Fundamentals',
  shortCode: 'UX',
  subtitle: 'Learn the core principles behind good UI and UX design.',
  passingPercent: 70,
  lessons: lessonsWithExtras,
  questions: QUESTIONS,
};

export default designFundamentalsCourse;