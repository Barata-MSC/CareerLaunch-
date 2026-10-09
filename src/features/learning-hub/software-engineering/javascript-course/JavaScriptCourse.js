import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import javascriptCourse from './course';

export default function JavaScriptCourseScreen({ navigation }) {
  return <CourseRunner course={javascriptCourse} navigation={navigation} />;
}
