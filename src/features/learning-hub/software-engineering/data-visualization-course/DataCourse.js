// learning-hub/software-engineering/data-visualization-course/DataCourse.js
import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import course from './course';

export default function DataCourseScreen({ navigation }) {
  return <CourseRunner course={course} navigation={navigation} />;
}
