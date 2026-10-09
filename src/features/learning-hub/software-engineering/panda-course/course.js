// src/features/learning-hub/software-engineering/pandas-course/course.js
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const pandasCourse = {
  id: 'pandas-data-analysis', // Track key identifier for UI progress mapping in Supabase
  title: 'Python (Pandas)',
  shortCode: 'PAN', // Badge key displayed on course index cards
  subtitle: 'Clean data, filter datasets, and visualize statistics using Python.',
  passingPercent: 70,
  estimatedMinutes: 15,
  quizSize: 10, // Selects exactly one question per lesson topic dynamically
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default pandasCourse;
