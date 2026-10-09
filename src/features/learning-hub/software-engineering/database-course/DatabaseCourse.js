import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import databaseCourse from './course';

export default function DatabaseCourseScreen({ navigation }) {
  return <CourseRunner course={databaseCourse} navigation={navigation} />;
}
