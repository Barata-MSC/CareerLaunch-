import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  DashboardScreen,
  ProfileScreen,
  JobFinderScreen,
  CareerRoadmapScreen,
  JobApplicationTracker,
  AIInterviewCoachScreen,
  CSSCourseScreen,
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

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="JobFinder" component={JobFinderScreen} />
      <Stack.Screen name="CareerRoadmap" component={CareerRoadmapScreen} />
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
