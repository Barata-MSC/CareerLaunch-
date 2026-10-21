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
  LearningHubScreen,
  CareerDetailScreen,
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
import AccountGate from '../components/AccountGate';
import MainTabs from '@features/resume-builder/MainTabs';
import { COURSE_ROUTES } from '../features/learning-hub/careers/registry';

const Stack = createNativeStackNavigator();

function withResumeAccountGate(Screen) {
  function GatedResumeScreen(props) {
    return (
      <AccountGate
        featureName="Resume Builder"
        description="Build and preview your resume with confidence. Complete your account to unlock the Resume Builder and keep your work saved."
        navigation={props.navigation}
      >
        <Screen {...props} />
      </AccountGate>
    );
  }

  return GatedResumeScreen;
}

const GatedPersonalInfoScreen = withResumeAccountGate(PersonalInfoScreen);
const GatedEducationScreen = withResumeAccountGate(EducationScreen);
const GatedSkillsScreen = withResumeAccountGate(SkillsScreen);
const GatedExperienceScreen = withResumeAccountGate(ExperienceScreen);
const GatedCertificatesScreen = withResumeAccountGate(CertificatesScreen);
const GatedProjectsScreen = withResumeAccountGate(ProjectsScreen);
const GatedResumePreviewScreen = withResumeAccountGate(ResumePreviewScreen);

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
      <Stack.Screen name="CareerDetail" component={CareerDetailScreen} />
      <Stack.Screen name="CareerRoadmap" component={CareerRoadmapScreen} />
      {COURSE_ROUTES.map(({ name, component, options }) => (
        <Stack.Screen key={name} name={name} component={component} options={options} />
      ))}
      <Stack.Screen name="AIInterviewCoach" component={AIInterviewCoachScreen} />
      <Stack.Screen name="ResumeBuilder" component={ResumeBuilderScreen} />
      <Stack.Screen name="personalInfo" component={GatedPersonalInfoScreen} />
      <Stack.Screen name="education" component={GatedEducationScreen} />
      <Stack.Screen name="skills" component={GatedSkillsScreen} />
      <Stack.Screen name="experience" component={GatedExperienceScreen} />
      <Stack.Screen name="certificates" component={GatedCertificatesScreen} />
      <Stack.Screen name="projects" component={GatedProjectsScreen} />
      <Stack.Screen name="ResumePreview" component={GatedResumePreviewScreen} />
      <Stack.Screen name="JobApplicationTracker" component={JobApplicationTracker} />
      <Stack.Screen name="LearningHub" component={LearningHubScreen} />
    </Stack.Navigator>
  );
}
