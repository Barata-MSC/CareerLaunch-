import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createIsolatedClient } from './isolatedClient';
import { meetsAllRules } from './passwordRules';
import PasswordRequirements from './PasswordRequirements';

const PURPLE = '#5B21F5';
const PURPLE_DARK = '#3D14C4';

const showAlert = (title, message, onOk) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}: ${message}`);
    if (onOk) onOk();
  } else {
    Alert.alert(title, message, [{ text: 'OK', onPress: onOk }]);
  }
};

// Shown when the user opens the reset link from their email.
// `recovery` comes from App.js ({ accessToken, refreshToken } or { error }).
// `onDone` clears the recovery state and sends the user to the Login screen.
export default function ResetPasswordScreen({ recovery, onDone }) {
  const clientRef = useRef(null);
  const [status, setStatus] = useState('verifying'); // verifying | ready | invalid
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check the link's tokens on an isolated client so the app never logs in.
  useEffect(() => {
    if (!recovery || recovery.error || !recovery.accessToken || !recovery.refreshToken) {
      setStatus('invalid');
      return undefined;
    }

    let cancelled = false;
    const client = createIsolatedClient('careerlaunch-reset-temp');
    clientRef.current = client;

    client.auth
      .setSession({
        access_token: recovery.accessToken,
        refresh_token: recovery.refreshToken,
      })
      .then(({ error }) => {
        if (!cancelled) setStatus(error ? 'invalid' : 'ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('invalid');
      });

    return () => {
      cancelled = true;
    };
  }, [recovery]);

  const handleSubmit = async () => {
    const missingPassword = !password;
    const weakPassword = !missingPassword && !meetsAllRules(password);
    const missingConfirm = !confirmPassword;
    const mismatch = !missingConfirm && password !== confirmPassword;

    setFormError('');
    setPasswordError(
      missingPassword
        ? 'Please enter a new password'
        : weakPassword
          ? 'Your password does not meet all the requirements below'
          : '',
    );
    setConfirmError(
      missingConfirm ? 'Please confirm your password' : mismatch ? 'Passwords do not match' : '',
    );

    if (missingPassword || weakPassword || missingConfirm || mismatch) return;

    const client = clientRef.current;
    if (!client) return;

    setLoading(true);
    const { error } = await client.auth.updateUser({ password });

    if (error) {
      setLoading(false);
      if (error.code === 'same_password') {
        setFormError('Your new password must be different from your old password.');
      } else {
        setFormError(error.message || 'Could not update your password. Please try again.');
      }
      return;
    }

    await client.auth.signOut({ scope: 'local' });
    setLoading(false);

    showAlert(
      'Password updated',
      'Your password has been changed. Please log in with your new password.',
      onDone,
    );
  };

  if (status === 'verifying') {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <ActivityIndicator size="large" color={PURPLE} />
      </SafeAreaView>
    );
  }

  if (status === 'invalid') {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <Text style={styles.title}>Link expired</Text>
        <Text style={[styles.subtitle, { marginBottom: 28 }]}>
          This reset link is invalid or has expired. Go back to Login and tap "Forgot password?" to
          get a new one.
        </Text>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={onDone}>
          <Text style={styles.primaryButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.subtitle}>Choose a new password for your account.</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>New password</Text>
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Enter a new password"
            placeholderTextColor="#9A9A9A"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            editable={!loading}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          <PasswordRequirements password={password} />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Confirm new password</Text>
          <TextInput
            style={[styles.input, confirmError ? styles.inputError : null]}
            placeholder="Re-enter your new password"
            placeholderTextColor="#9A9A9A"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={confirmPassword}
            editable={!loading}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (confirmError) setConfirmError('');
            }}
          />
          {confirmError ? (
            <Text style={styles.errorText}>{confirmError}</Text>
          ) : confirmPassword.length > 0 && confirmPassword === password ? (
            <Text style={styles.matchText}>✓ Passwords match</Text>
          ) : null}
          {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, loading && { opacity: 0.7 }]}
          activeOpacity={0.85}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Update password</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24 },
  center: { alignItems: 'center', justifyContent: 'center' },
  scroll: { paddingBottom: 32 },
  headerWrapper: { alignItems: 'center', marginTop: 40, marginBottom: 28, paddingHorizontal: 12 },
  title: { fontSize: 26, fontWeight: '800', color: '#111111', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#888888', marginTop: 6, textAlign: 'center' },
  fieldGroup: { width: '90%', alignSelf: 'center', marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', color: '#111111', marginBottom: 8 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#DADADA', borderRadius: 10, paddingHorizontal: 14, fontSize: 14, color: '#111111' },
  inputError: { borderColor: '#E5484D' },
  errorText: { color: '#E5484D', fontSize: 12, marginTop: 6 },
  matchText: { color: '#2E9E5B', fontSize: 12, marginTop: 6 },
  primaryButton: { width: '90%', alignSelf: 'center', backgroundColor: PURPLE, borderRadius: 14, height: 52, alignItems: 'center', justifyContent: 'center', shadowColor: PURPLE_DARK, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 4 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
