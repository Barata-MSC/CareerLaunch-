// Same pattern as CSSCourse.js: all the flow and UI live in shared/CourseRunner.
import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import htmlCourse from './course';

export default function HTMLCourseScreen({ navigation }) {
  return <CourseRunner course={htmlCourse} navigation={navigation} />;
}
