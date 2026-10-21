import AppPressable from '@components/AppPressable';
// src/components/GuestNotice.js
// Full-screen "you're using a guest account" notice, styled like the guest
// card on ProfileScreen. Shown instead of a feature when the user is a guest.
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../context/ProfileContext';

const PURPLE = '#5B21F5';

// Confirmation shown before the guest notice. Works on web and native.
const confirmGuestAccess = (title) => {
  const heading = 'Guest account';
  const message = `You're using a guest account. Create an account to use ${title}.`;

  if (Platform.OS === 'web') {
    return Promise.resolve(window.confirm(`${heading}\n\n${message}\n\nContinue?`));
  }

  return new Promise((resolve) => {
    Alert.alert(
      heading,
      message,
      [
        { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
        { text: 'OK', onPress: () => resolve(true) },
      ],
      { cancelable: true, onDismiss: () => resolve(false) },
    );
  });
};

export default function GuestNotice({ navigation, title }) {
  const { profile, hasGuestLogin } = useProfile();
  const [confirmed, setConfirmed] = useState(false);
  const asked = useRef(false);

  // Ask once when the screen opens. OK shows the notice, Cancel goes back.
  useEffect(() => {
    if (asked.current) return;
    asked.current = true;
    confirmGuestAccess(title).then((ok) => {
      if (ok) setConfirmed(true);
      else navigation?.goBack();
    });
  }, [title, navigation]);

  // Blank screen while the alert is showing
  if (!confirmed) {
    return <SafeAreaView style={styles.safeArea} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.headerRow}>
        <AppPressable style={styles.backButton} onPress={() => navigation?.goBack()}>
          <Text style={styles.backArrow}>‹</Text>
        </AppPressable>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.content}>
        <View style={styles.guestCard}>
          <Text style={styles.guestEmoji}>👤</Text>
          <Text style={styles.guestTitle}>You're using a guest account</Text>
          <Text style={styles.guestName}>Username: {profile?.username || 'Guest'}</Text>
          <Text style={styles.guestBody}>
            {hasGuestLogin
              ? `Create an account with your email to use ${title}. Your progress stays with you, and you can recover it if you forget your password.`
              : `Create an account to use ${title} and to keep your progress if you log out or switch devices.`}
          </Text>

          <AppPressable
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => navigation?.navigate('CreateAccount')}
          >
            <Text style={styles.primaryButtonText}>Create account</Text>
          </AppPressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: { width: 32, height: 32, justifyContent: 'center' },
  backArrow: { fontSize: 26, color: '#111111', fontWeight: '400' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111111' },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 12 },
  guestCard: {
    borderWidth: 1,
    borderColor: '#E2D9FF',
    backgroundColor: '#F0EBFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  guestEmoji: { fontSize: 36, marginBottom: 8 },
  guestTitle: { fontSize: 17, fontWeight: '700', color: '#111111', textAlign: 'center' },
  guestName: { fontSize: 14, fontWeight: '600', color: PURPLE, marginTop: 6 },
  guestBody: {
    fontSize: 13,
    lineHeight: 19,
    color: '#555555',
    textAlign: 'center',
    marginTop: 10,
  },
  primaryButton: {
    width: '72%',
    maxWidth: 280,
    alignSelf: 'center',
    marginTop: 18,
    backgroundColor: PURPLE,
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});