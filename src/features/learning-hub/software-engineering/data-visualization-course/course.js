// learning-hub/software-engineering/data-visualization-course/course.js
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const dataVisualizationCourse = {
  id: 'data-visualization',
  title: 'Data Visualization',
  subtitle: 'Turn raw numbers into clear stories and smarter decisions.',
  shortCode: 'DV',
  passingPercent: 70,
  estimatedMinutes: 30,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default dataVisualizationCourse;
