import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useResume } from './ResumeContext';
import ResumeBuilderScreen from '../screens/ResumeScreen/ResumeBuilderScreen';
import PersonalInfoScreen from '../screens/ResumeScreen/PersonalInfoScreen';
import EducationScreen from '../screens/ResumeScreen/EducationScreen';
import SkillsScreen from '../screens/ResumeScreen/SkillsScreen';
import ExperienceScreen from '../screens/ResumeScreen/ExperienceScreen';
import CertificatesScreen from '../screens/ResumeScreen/CertificatesScreen';
import ProjectsScreen from '../screens/ResumeScreen/ProjectsScreen';
import ResumePreviewScreen from '../screens/ResumeScreen/ResumePreviewScreen';

const Stack = createNativeStackNavigator();

export default function ResumeStack({ onExit }) {
  return (
    <ResumeProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ResumeBuilder">
          {(props) => <ResumeBuilderScreen {...props} onExit={onExit} />}
        </Stack.Screen>
        <Stack.Screen name="personalInfo" component={PersonalInfoScreen} />
        <Stack.Screen name="education" component={EducationScreen} />
        <Stack.Screen name="skills" component={SkillsScreen} />
        <Stack.Screen name="experience" component={ExperienceScreen} />
        <Stack.Screen name="certificates" component={CertificatesScreen} />
        <Stack.Screen name="projects" component={ProjectsScreen} />
        <Stack.Screen name="ResumePreview" component={ResumePreviewScreen} />
      </Stack.Navigator>
    </ResumeProvider>
  );
}