// Same pattern as CSSCourse.js: all the flow and UI live in shared/CourseRunner.
import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import gitCourse from './course';

export default function GitCourseScreen({ navigation }) {
  return <CourseRunner course={gitCourse} navigation={navigation} />;
}
