import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  WelcomeScreen,
  LoginScreen,
  DashboardScreen,
  RegisterScreen,
  SplashScreen,
  ProfileScreen,
  JobFinderScreen,
  CareerRoadmapScreen,
  AIInterviewCoachScreen,
} from '@screens';

// Direct import path to bypass the barrel loop
import MainTabs from './src/screens/ResumeBuilderScreen/MainTabs';

// Resume Builder sub-flow screens (Absolute mapping via @screens alias)
import ResumeBuilderScreen from '@screens/ResumeBuilderScreen/ResumeBuilder';
import PersonalInfoScreen from '@screens/ResumeBuilderScreen/PersonalInfoScreen';
import EducationScreen from '@screens/ResumeBuilderScreen/EducationScreen';
import SkillsScreen from '@screens/ResumeBuilderScreen/SkillsScreen';
import ExperienceScreen from '@screens/ResumeBuilderScreen/ExperienceScreen';
import CertificatesScreen from '@screens/ResumeBuilderScreen/CertificateScreen';
import ProjectsScreen from '@screens/ResumeBuilderScreen/ProjectScreen';
import ResumePreviewScreen from '@screens/ResumeBuilderScreen/ResumePreviewScreen';

// Global Data State Provider
import { ResumeProvider } from '@screens/ResumeBuilderScreen/ResumeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <View style={styles.backdrop}>
      <View style={styles.phone}>
        <ResumeProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="MainTabs" component={MainTabs} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="JobFinder" component={JobFinderScreen} />
              <Stack.Screen name="CareerRoadmap" component={CareerRoadmapScreen} />
              <Stack.Screen name="AIInterviewCoach" component={AIInterviewCoachScreen} />

              {/* Resume Builder flow */}
              <Stack.Screen name="ResumeBuilder" component={ResumeBuilderScreen} />
              <Stack.Screen name="personalInfo" component={PersonalInfoScreen} />
              <Stack.Screen name="education" component={EducationScreen} />
              <Stack.Screen name="skills" component={SkillsScreen} />
              <Stack.Screen name="experience" component={ExperienceScreen} />
              <Stack.Screen name="certificates" component={CertificatesScreen} />
              <Stack.Screen name="projects" component={ProjectsScreen} />
              <Stack.Screen name="ResumePreview" component={ResumePreviewScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ResumeProvider>

        {showSplash && (
          <SplashScreen
            appName="CareerLaunch!"
            onFinish={() => setShowSplash(false)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#e9eaf2' : '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    ...(Platform.OS === 'web' && {
      width: 390,
      height: 844,
      borderRadius: 40,
      borderWidth: 8,
      borderColor: '#111',
      overflow: 'hidden',
    }),
  },
});