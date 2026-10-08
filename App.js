import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';

import { supabase } from './src/config/supabase';
import { ProfileProvider } from './src/context/ProfileContext';
import { ApplicationsProvider } from './src/context/ApplicationsContext';
import { ResumeProvider } from '@features/resume-builder';

import { SplashScreen, parseRecoveryUrl } from '@features/auth';
import RootNavigator from './src/navigation/RootNavigator';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [authRetry, setAuthRetry] = useState(0);
  // Set when the app is opened from a password-reset email link.
  const [recovery, setRecovery] = useState(null);
  const [authInitialRoute, setAuthInitialRoute] = useState('Welcome');

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (isMounted) {
          setSession(data.session);
          setAuthError('');
        }
      } catch (error) {
        if (isMounted) {
          setAuthError(error instanceof Error ? error.message : String(error));
        }
      } finally {
        if (isMounted) setAuthLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth State Changed:', event);
      setSession(session);
      setAuthError('');
      setAuthLoading(false);
    });

    loadSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [authRetry]);

  // Watch for a password-reset link (on web it's the page URL; on a phone it's
  // the deep link that opened the app). The tokens are NOT used to log in here;
  // ResetPasswordScreen verifies them on an isolated client.
  useEffect(() => {
    const handleUrl = (url) => {
      const result = parseRecoveryUrl(url);
      if (!result) return;
      setRecovery(result);
      // Remove the tokens from the address bar so a refresh doesn't replay them.
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    const initialUrl =
      Platform.OS === 'web' ? Promise.resolve(window.location.href) : Linking.getInitialURL();
    initialUrl.then(handleUrl).catch(() => {});

    const linkSubscription = Linking.addEventListener('url', ({ url }) => handleUrl(url));
    return () => linkSubscription.remove();
  }, []);

  const handleRecoveryDone = () => {
    setRecovery(null);
    setAuthInitialRoute('Login');
  };

  // Avoid visual flashing while verifying state
  if (authLoading) {
    return (
      <View style={[styles.backdrop, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#5B21F5" />
      </View>
    );
  }

  if (authError) {
    return (
      <View style={styles.backdrop}>
        <View style={[styles.phone, styles.authErrorContainer]}>
          <Text style={styles.authErrorTitle}>Could not load your session</Text>
          <Text style={styles.authErrorMessage}>{authError}</Text>
          <TouchableOpacity
            style={styles.authRetryButton}
            onPress={() => {
              setAuthError('');
              setAuthLoading(true);
              setAuthRetry((retry) => retry + 1);
            }}
          >
            <Text style={styles.authRetryButtonText}>Try again</Text>
          </TouchableOpacity>
        </View>
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
              <RootNavigator
                session={session}
                recovery={recovery}
                authInitialRoute={authInitialRoute}
                onRecoveryDone={handleRecoveryDone}
              />
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
  authErrorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  authErrorTitle: {
    color: '#111',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  authErrorMessage: {
    color: '#666',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  authRetryButton: {
    backgroundColor: '#5B21F5',
    borderRadius: 10,
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  authRetryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
