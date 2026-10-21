import AppPressable from '@components/AppPressable';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useResume } from './ResumeContext';

export default function ResumeDataGate({ children }) {
  const { hasAccount, isReady, loadStatus, loadError, retryLoad } = useResume();

  useEffect(() => {
    if (hasAccount && loadStatus === 'idle') retryLoad();
  }, [hasAccount, loadStatus, retryLoad]);

  if (loadStatus === 'error') {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{loadError}</Text>
        <AppPressable style={styles.button} onPress={retryLoad}>
          <Text style={styles.buttonText}>Retry</Text>
        </AppPressable>
      </View>
    );
  }

  if (!isReady) {
    return (
      <View style={styles.container}>
        {hasAccount ? (
          <>
            <ActivityIndicator size="large" color="#5B21F5" />
            <Text style={styles.message}>
              {loadStatus === 'loading' ? 'Loading your resume…' : 'Preparing your resume…'}
            </Text>
          </>
        ) : (
          <Text style={styles.message}>Sign in to load your resume.</Text>
        )}
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  message: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#5B21F5',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 11,
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
