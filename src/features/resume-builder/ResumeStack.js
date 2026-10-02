import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useResume } from './ResumeContext';
import ResumeBuilderScreen from './ResumeBuilder';
import PersonalInfoScreen from './PersonalInfoScreen';
import EducationScreen from './EducationScreen';
import SkillsScreen from './SkillsScreen';
import ExperienceScreen from './ExperienceScreen';
import CertificatesScreen from './CertificateScreen';
import ProjectsScreen from './ProjectScreen';
import ResumePreviewScreen from './ResumePreviewScreen';

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