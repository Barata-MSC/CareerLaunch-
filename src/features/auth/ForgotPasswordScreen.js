import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { supabase } from '@config/supabase';
import { getRecoveryRedirectUrl } from './recoveryLink';

const PURPLE = '#5B21F5';
const PURPLE_DARK = '#3D14C4';
const COOLDOWN_SECONDS = 60;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordScreen({ navigation, route }) {
  const [email, setEmail] = useState(route?.params?.email ?? '');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Counts down so the user can't spam the "resend" button.
  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSend = async () => {
    const trimmed = email.trim();

    if (!trimmed) {
      setEmailError('Please enter your email');
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    setFormError('');
    setLoading(true);

    try {
      const { data: emailExists, error: emailCheckError } = await supabase.rpc(
        'does_auth_email_exist',
        { candidate_email: trimmed },
      );

      if (emailCheckError) {
        setFormError('Could not verify this email address. Please try again.');
        return;
      }

      if (!emailExists) {
        setFormError('Email address does not exist. Please check it or create an account.');
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(trimmed, {
        redirectTo: getRecoveryRedirectUrl(),
      });

      if (error) {
        if (error.status === 429 || error.code === 'over_email_send_rate_limit') {
          setFormError('Too many requests. Please wait a minute before trying again.');
        } else {
          setFormError(error.message || 'Something went wrong. Please try again.');
        }
        return;
      }

      setSent(true);
      setCooldown(COOLDOWN_SECONDS);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => navigation?.navigate('Login');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Forgot password?</Text>
        <Text style={styles.subtitle}>
          Enter your email and we'll send you a link to reset your password.
        </Text>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="Enter your email"
          placeholderTextColor="#9A9A9A"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          editable={!loading}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError('');
            if (formError) setFormError('');
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
      </View>

      {sent ? (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            We've sent a link to {email.trim()} to reset your password. Check your inbox (and your
            spam folder). The link opens the app so you can choose a new password.
          </Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={[styles.primaryButton, (loading || cooldown > 0) && { opacity: 0.7 }]}
        activeOpacity={0.85}
        onPress={handleSend}
        disabled={loading || cooldown > 0}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.primaryButtonText}>
            {cooldown > 0
              ? `Resend link in ${cooldown}s`
              : sent
                ? 'Resend link'
                : 'Send reset link'}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.linkRow}>
        <Text style={styles.linkText}>Remembered your password?</Text>
        <TouchableOpacity onPress={goToLogin} disabled={loading}>
          <Text style={styles.linkAction}> Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24 },
  headerWrapper: { alignItems: 'center', marginTop: 48, marginBottom: 32, paddingHorizontal: 12 },
  title: { fontSize: 26, fontWeight: '800', color: '#111111' },
  subtitle: { fontSize: 14, color: '#888888', marginTop: 6, textAlign: 'center' },
  fieldGroup: { width: '90%', alignSelf: 'center', marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', color: '#111111', marginBottom: 8 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#DADADA', borderRadius: 10, paddingHorizontal: 14, fontSize: 14, color: '#111111' },
  inputError: { borderColor: '#E5484D' },
  errorText: { color: '#E5484D', fontSize: 12, marginTop: 6 },
  infoBox: { width: '90%', alignSelf: 'center', backgroundColor: '#F3EFFF', borderRadius: 12, padding: 16, marginBottom: 18 },
  infoText: { fontSize: 13, color: PURPLE_DARK, lineHeight: 19 },
  primaryButton: { width: '90%', alignSelf: 'center', backgroundColor: PURPLE, borderRadius: 14, height: 52, alignItems: 'center', justifyContent: 'center', shadowColor: PURPLE_DARK, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 4 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  linkRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  linkText: { fontSize: 14, color: '#666666' },
  linkAction: { fontSize: 14, color: PURPLE, fontWeight: '700' },
});
