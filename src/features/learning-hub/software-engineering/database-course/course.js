import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const databaseCourse = {
  id: 'database',
  title: 'Database fundamentals',
  shortCode: 'DB',
  subtitle: 'Learn how data is stored, queried, and connected.',
  passingPercent: 70,
  estimatedMinutes: 30,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default databaseCourse;
