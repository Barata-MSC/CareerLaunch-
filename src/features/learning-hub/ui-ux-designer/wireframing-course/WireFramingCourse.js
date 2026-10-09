import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import wireframingCourse from './course';

export default function WireframingCourseScreen({ navigation }) {
    return <CourseRunner course={wireframingCourse} navigation={navigation} />;
}