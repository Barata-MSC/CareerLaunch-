import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { supabase } from './src/config/supabase';
import { ProfileProvider } from './src/context/ProfileContext';
import {
  WelcomeScreen,
  LoginScreen,
  DashboardScreen,
  RegisterScreen,
  SplashScreen,
  ProfileScreen,
  JobFinderScreen,
  CareerRoadmapScreen,
  JobApplicationTracker,
  AIInterviewCoachScreen,
} from '@screens';
import { ApplicationsProvider } from './src/context/ApplicationsContext';

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
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch initial local storage session on startup
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    // 2. Continually listen for real-time auth changes (Sign-In, Sign-Out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth State Changed:", _event, session); // <-- Add this log
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Avoid visual flashing while verifying state
  if (authLoading) {
    return (
      <View style={[styles.backdrop, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#5B21F5" />
      </View>
    );
  }

    return (
      // 1. Wrap everything with all three providers
      <ProfileProvider session={session}>
        <ApplicationsProvider>
          <ResumeProvider>
            <View style={styles.backdrop}>
              <View style={styles.phone}>
                <NavigationContainer>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    
                    {session && session.user ? (
                      // 2. PROTECTED INTERNAL STACK (Only visible when logged in)
                      <>
                        {/* Keep both MainTabs and Dashboard depending on your design */}
                        <Stack.Screen name="MainTabs" component={MainTabs} />
                        <Stack.Screen name="Dashboard" component={DashboardScreen} />
                        
                        {/* Existing Screens */}
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        <Stack.Screen name="JobFinder" component={JobFinderScreen} />
                        <Stack.Screen name="CareerRoadmap" component={CareerRoadmapScreen} />
                        
                        {/* New Screens from 'main' */}
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
                      </>
                    ) : (
                      // 3. PUBLIC AUTHENTICATION STACK (Only visible when logged out)
                      <>
                        <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                      </>
                    )}
                    
                  </Stack.Navigator>
                </NavigationContainer>

                {showSplash && (
                  <SplashScreen 
                    appName="CareerLaunch!" 
                    onFinish={() => setShowSplash(false)} 
                  />
                )}
              </View>
            </View>
          </ResumeProvider>
        </ApplicationsProvider>
      </ProfileProvider>
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