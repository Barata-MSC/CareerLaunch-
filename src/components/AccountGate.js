import React from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAccountTier } from '../features/auth/accountTier';

const PURPLE = '#5B21F5';

export default function AccountGate({ featureName, description, children, navigation }) {
  const nav = navigation || useNavigation();
  const { isGuest, isFullAccount, loading } = useAccountTier();

  if (loading) {
    return (
      <View style={styles.loadingContainer} accessibilityLabel="Checking account">
        <ActivityIndicator size="large" color="#6B7280" />
      </View>
    );
  }

  if (isFullAccount) {
    return <>{children}</>;
  }

  if (!isGuest) {
    return <>{children}</>;
  }

  const bodyText = description || `Complete your account to unlock ${featureName} and keep your progress saved.`;

  return (
    <View style={styles.safeArea}>
      <View style={styles.card}>
        <Text style={styles.icon} accessibilityRole="image" aria-label="Locked feature">
          🔒
        </Text>
        <Text style={styles.title}>Complete your account to use {featureName}</Text>
        <Text style={styles.body}>{bodyText}</Text>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`Complete account to use ${featureName}`}
          style={styles.primaryButton}
          activeOpacity={0.9}
          onPress={() => nav.navigate('CreateAccount')}
        >
          <Text style={styles.primaryButtonText}>Complete account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={() => nav.goBack?.()}
        >
          <Text style={styles.secondaryButtonText}>Not now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9E3FF',
    backgroundColor: '#F6F3FF',
    paddingHorizontal: 22,
    paddingVertical: 28,
    alignItems: 'center',
  },
  icon: {
    fontSize: 42,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 22,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: PURPLE,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    width: '100%',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#4B5563',
    fontSize: 15,
    fontWeight: '600',
  },
});
