// Same pattern as CSSCourse.js: all the flow and UI live in shared/CourseRunner.
import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import nodeCourse from './course';

export default function NodeCourseScreen({ navigation }) {
  return <CourseRunner course={nodeCourse} navigation={navigation} />;
}
