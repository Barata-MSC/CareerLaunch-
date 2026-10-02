import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { supabase } from './src/config/supabase';
import { ProfileProvider } from './src/context/ProfileContext';
import { ApplicationsProvider } from './src/context/ApplicationsContext';
import { ResumeProvider } from './src/features/resume-builder/ResumeContext';

import SplashScreen from './src/features/auth/SplashScreen';
import RootNavigator from './src/navigation/RootNavigator';

function AppContent() {
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth State Changed:', event);
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

  // Show ONLY the splash screen first — nothing else mounts underneath it
  if (showSplash) {
    return (
      <View style={styles.backdrop}>
        <View style={styles.phone}>
          <SplashScreen
            appName="CareerLaunch!"
            onFinish={() => setShowSplash(false)}
          />
        </View>
      </View>
    );
  }

  return (
    <ProfileProvider session={session}>
      <ApplicationsProvider>
        <ResumeProvider>
          <View style={styles.backdrop}>
            <View style={styles.phone}>
              <RootNavigator session={session} />
            </View>
          </View>
        </ResumeProvider>
      </ApplicationsProvider>
    </ProfileProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
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
