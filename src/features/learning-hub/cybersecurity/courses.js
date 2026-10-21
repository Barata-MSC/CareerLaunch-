import { buildCourse, COURSES as COURSE_DEFINITIONS } from './data/curriculum';

export const courses = COURSE_DEFINITIONS.map((definition, index) => buildCourse(definition, index));
export const coursesById = Object.fromEntries(courses.map((course) => [course.id, course]));