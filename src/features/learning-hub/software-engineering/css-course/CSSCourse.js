// Same path and default export as before, so features/index.js and
// AppNavigator don't change. All the flow and UI now live in shared/CourseRunner.
import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import cssCourse from './course';

export default function CSSCourseScreen({ navigation }) {
  return <CourseRunner course={cssCourse} navigation={navigation} />;
}
