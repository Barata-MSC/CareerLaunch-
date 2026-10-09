import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import sqlCourse from './course';

export default function SQLCourseScreen({ navigation }) {
  return <CourseRunner course={sqlCourse} navigation={navigation} />;
}
