import React from 'react';
import CourseRunner from '../shared/CourseRunner';
import { courses } from './courses';

const coursesByRoute = Object.fromEntries(courses.map((course) => [course.route, course]));

export default function CybersecurityCourseScreen({ navigation, route }) {
  const course = coursesByRoute[route?.name];
  if (!course) return null;
  return <CourseRunner course={course} navigation={navigation} />;
}