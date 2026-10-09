import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  DashboardScreen,
  CreateAccountScreen,
  ProfileScreen,
  JobFinderScreen,
  CareerRoadmapScreen,
  JobApplicationTracker,
  AIInterviewCoachScreen,
  CSSCourseScreen,
  HTMLCourseScreen,
  JavaScriptCourseScreen,
  GitCourseScreen,
  ReactCourseScreen,
} from '@features';

import {
  CertificatesScreen,
  EducationScreen,
  ExperienceScreen,
  PersonalInfoScreen,
  ProjectsScreen,
  ResumeBuilderScreen,
  ResumePreviewScreen,
  SkillsScreen,
} from '@features/resume-builder';
import MainTabs from '@features/resume-builder/MainTabs';
import DesignFundamentalsCourseScreen from '../features/learning-hub/ui-ux-designer/design-fundamentals-course/DesignFundamentalsCourse';
import UserResearchCourseScreen from '../features/learning-hub/ui-ux-designer/user-research-course/UserResearchCourse';
import WireframingCourseScreen from '../features/learning-hub/ui-ux-designer/wireframing-course/WireFramingCourse';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="JobFinder" component={JobFinderScreen} />
      <Stack.Screen name="DesignFundamentalsCourse" component={DesignFundamentalsCourseScreen} />
      <Stack.Screen name="UserResearchCourse" component={UserResearchCourseScreen} />
      <Stack.Screen name="WireframingCourse" component={WireframingCourseScreen} />
      <Stack.Screen name="CareerRoadmap" component={CareerRoadmapScreen} />
      <Stack.Screen name="CSSCourse" component={CSSCourseScreen} />
      <Stack.Screen name="HTMLCourse" component={HTMLCourseScreen} />
      <Stack.Screen name="JavaScriptCourse" component={JavaScriptCourseScreen} />
      <Stack.Screen name="GitCourse" component={GitCourseScreen} />
      <Stack.Screen name="ReactCourse" component={ReactCourseScreen} />
      <Stack.Screen name="AIInterviewCoach" component={AIInterviewCoachScreen} />
      <Stack.Screen name="ResumeBuilder" component={ResumeBuilderScreen} />
      <Stack.Screen name="personalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="education" component={EducationScreen} />
      <Stack.Screen name="skills" component={SkillsScreen} />
      <Stack.Screen name="experience" component={ExperienceScreen} />
      <Stack.Screen name="certificates" component={CertificatesScreen} />
      <Stack.Screen name="projects" component={ProjectsScreen} />
      <Stack.Screen name="ResumePreview" component={ResumePreviewScreen} />
      <Stack.Screen name="JobApplicationTracker" component={JobApplicationTracker} />
    </Stack.Navigator>
  );
}
