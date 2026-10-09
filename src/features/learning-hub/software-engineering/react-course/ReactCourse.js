// Same pattern as CSSCourse.js: all the flow and UI live in shared/CourseRunner.
import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import reactCourse from './course';

export default function ReactCourseScreen({ navigation }) {
  return <CourseRunner course={reactCourse} navigation={navigation} />;
}
