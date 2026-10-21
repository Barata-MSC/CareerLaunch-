import CybersecurityCourseScreen from './CybersecurityCourseScreen';
import { courses } from './courses';
import { tracks } from './tracks';

export { tracks };
export { courses };
export const courseRoutes = courses.map((course) => ({
  name: course.route,
  component: CybersecurityCourseScreen,
}));