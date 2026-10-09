// Same default export name (DataCourseScreen in features/index.js) so AppNavigator
// doesn't change. All the flow and UI live in shared/CourseRunner.
import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import statisticsCourse from './course';

export default function DataCourseScreen({ navigation }) {
  return <CourseRunner course={statisticsCourse} navigation={navigation} />;
}