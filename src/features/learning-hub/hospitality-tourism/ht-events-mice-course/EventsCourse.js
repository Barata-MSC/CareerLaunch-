import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import course from './course';

export default function EventsCourse({ navigation }) {
  return <CourseRunner course={course} navigation={navigation} />;
}
