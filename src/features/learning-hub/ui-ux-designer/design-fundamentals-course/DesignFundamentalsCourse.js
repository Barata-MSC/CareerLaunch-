import React from 'react';
import CourseRunner from '../../shared/CourseRunner';
import designFundamentalsCourse from './course';

export default function DesignFundamentalsCourseScreen({ navigation }) {
    return <CourseRunner course={designFundamentalsCourse} navigation={navigation} />;
}