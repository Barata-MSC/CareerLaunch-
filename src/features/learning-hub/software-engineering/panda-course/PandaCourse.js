// src/features/learning-hub/software-engineering/pandas-course/PandasCourse.js
import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import course from './course';

export default function PandasCourse({ navigation }) {
  return <CourseRunner course={course} navigation={navigation} />;
}
