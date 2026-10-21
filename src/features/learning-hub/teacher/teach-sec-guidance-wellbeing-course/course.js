import { LESSONS } from './data/lessons';
import { QUESTIONS } from './data/questions';

const course = {
  id: 'teach-sec-guidance-wellbeing',
  title: 'Learner Guidance and Wellbeing',
  shortCode: 'GWB',
  subtitle: "The teacher's supporting role.",
  outcome: "Describe a teacher's role in supporting learners and when and how to refer concerns.",
  prerequisites: 'No prior course is required.',
  passingPercent: 70,
  quizSize: 10,
  lessons: LESSONS,
  questions: QUESTIONS,
};

export default course;
