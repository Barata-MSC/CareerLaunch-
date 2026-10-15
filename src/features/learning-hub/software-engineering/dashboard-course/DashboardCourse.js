import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import dashboardCourse from './course';

export default function DashboardCourseScreen({ navigation }) {
  return <CourseRunner course={dashboardCourse} navigation={navigation} />;
}
