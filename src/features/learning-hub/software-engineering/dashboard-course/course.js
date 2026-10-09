import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const dashboardCourse = {
  id: 'dashboard', // saved as course_id in Supabase, so don't rename it later
  title: 'Dashboard (Power BI & Tableau)', // course title, used in the header and in the course list
  shortCode: 'DS', // course icon and topic label
  subtitle: 'Clean Dashboards',
  passingPercent: 70,
  estimatedMinutes: 10,
  quizSize: 10, // one random question per lesson each attempt
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default dashboardCourse;
