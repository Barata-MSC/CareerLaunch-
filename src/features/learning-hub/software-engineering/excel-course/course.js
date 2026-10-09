// Everything that makes this course "the Excel and Spreadsheets course". The shared screens read
// all course text and numbers from here, so a new course = new data + new config.
import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const excelCourse = {
  id: 'excel-spreadsheets', // saved as course_id in Supabase, so don't rename it later
  title: 'Excel & Spreadsheets',
  shortCode: 'XLS', // course icon and topic label
  subtitle: 'Clean data, use formulas, and build pivot tables.',
  passingPercent: 70,
  estimatedMinutes: 10,
  quizSize: 11, // one random question per lesson each attempt
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default excelCourse;
