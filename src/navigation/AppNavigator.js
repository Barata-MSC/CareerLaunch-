import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  DashboardScreen,
  ProfileScreen,
  JobFinderScreen,
  CareerRoadmapScreen,
  JobApplicationTracker,
  AIInterviewCoachScreen,
} from '@features';

import MainTabs from '../features/resume-builder/MainTabs';
import ResumeBuilderScreen from '../features/resume-builder/ResumeBuilder';
import PersonalInfoScreen from '../features/resume-builder/PersonalInfoScreen';
import EducationScreen from '../features/resume-builder/EducationScreen';
import SkillsScreen from '../features/resume-builder/SkillsScreen';
import ExperienceScreen from '../features/resume-builder/ExperienceScreen';
import CertificatesScreen from '../features/resume-builder/CertificateScreen';
import ProjectsScreen from '../features/resume-builder/ProjectScreen';
import ResumePreviewScreen from '../features/resume-builder/ResumePreviewScreen';

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
