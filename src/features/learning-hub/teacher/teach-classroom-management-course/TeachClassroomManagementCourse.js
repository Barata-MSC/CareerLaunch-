import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import course from './course';

export default function TeachClassroomManagementCourse({ navigation }) {
  return <CourseRunner course={course} navigation={navigation} />;
}
