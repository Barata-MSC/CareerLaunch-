import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import userResearchCourse from './course';

export default function UserResearchCourseScreen({ navigation }) {
    return <CourseRunner course={userResearchCourse} navigation={navigation} />;
}