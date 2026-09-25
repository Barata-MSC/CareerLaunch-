import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Connected to your configuration path
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
  CareerRoadmapScreen 
} from '@screens';

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
    // ProfileProvider re-fetches the `profiles` row any time `session` changes
    // (login, logout, signup) so Dashboard/Profile always see fresh data.
    <ProfileProvider session={session}>
      <View style={styles.backdrop}>
        <View style={styles.phone}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {session && session.user ? (
                // PROTECTED INTERNAL STACK (Only visible when logged in)
                <>
                  <Stack.Screen name="Dashboard" component={DashboardScreen} />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                  <Stack.Screen name="JobFinder" component={JobFinderScreen} />
                  <Stack.Screen name="CareerRoadmap" component={CareerRoadmapScreen} />
                </>
              ) : (
                // PUBLIC AUTHENTICATION STACK (Only visible when logged out)
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