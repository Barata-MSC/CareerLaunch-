import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoogleButton from '@components/GoogleButton';

// Explicit alias pointing to your configuration
import { supabase } from '@config/supabase';

import { meetsAllRules } from './passwordRules';
import PasswordRequirements from './PasswordRequirements';
import {
  GUEST_EMAIL_DOMAIN,
  guestEmailFromUsername,
  validateGuestUsername,
} from './guestAccount';

const PURPLE = '#5B21F5';
const PURPLE_DARK = '#3D14C4';

// Turns a Supabase sign-up error into a message a guest can act on.
const describeGuestSignUpError = (error) => {
  const message = (error.message || '').toLowerCase();

  if (
    error.code === 'user_already_exists' ||
    error.code === 'email_exists' ||
    message.includes('already registered') ||
    message.includes('already been registered')
  ) {
    return 'Username already exists. Please choose another.';
  }
  if (
    error.code === '23505' ||
    message.includes('duplicate key') ||
    message.includes('unique constraint') ||
    message.includes('database error saving new user')
  ) {
    return 'We could not save that username. It may already be taken. Please choose another.';
  }
  if (error.code === 'email_address_invalid' || (message.includes('email') && message.includes('invalid'))) {
    return `Supabase rejected the guest email domain (${GUEST_EMAIL_DOMAIN}). Change GUEST_EMAIL_DOMAIN in guestAccount.js to a domain you control.`;
  }
  if (error.code === 'signup_disabled' || message.includes('signups not allowed')) {
    return 'New sign-ups are turned off in Supabase.';
  }
  if (error.code === 'weak_password') {
    return error.message || 'That password is too weak. Please choose a stronger one.';
  }
  if (message.includes('network') || message.includes('fetch')) {
    return 'Network error. Please check your connection and try again.';
  }
  return error.message || 'Something went wrong. Please try again.';
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Guest profile: a username and a password, no email needed.
  const [showGuest, setShowGuest] = useState(false);
  const [guestMode, setGuestMode] = useState('create'); // 'create' | 'login'
  const [guestName, setGuestName] = useState('');
  const [guestPassword, setGuestPassword] = useState('');
  const [guestConfirm, setGuestConfirm] = useState('');
  const [guestError, setGuestError] = useState('');
  const [guestPasswordError, setGuestPasswordError] = useState('');
  const [guestConfirmError, setGuestConfirmError] = useState('');
  const [showGuestUpgradeHint, setShowGuestUpgradeHint] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const busy = loading || guestLoading;
  const isCreate = guestMode === 'create';

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const missingEmail = !trimmedEmail;
    const invalidEmail = !missingEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    const missingPassword = !password.trim();

    setLoginError('');
    setEmailError(
      missingEmail ? 'Please enter your email' : invalidEmail ? 'Please enter a valid email address' : '',
    );
    setPasswordError(missingPassword ? 'Please enter your password' : '');

    if (missingEmail || invalidEmail || missingPassword) return;

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (!error) return;

      const message = (error.message || '').toLowerCase();

      if (error.code === 'email_not_confirmed' || message.includes('not confirmed')) {
        setLoginError('Your email is not confirmed yet. Please check your inbox for the confirmation link.');
      } else if (error.code === 'invalid_credentials' || message.includes('invalid login credentials')) {
        // Supabase intentionally returns the same error for a wrong password and
        // for an email that has no account, so we show one combined message.
        setLoginError('Incorrect email or password. If you don\'t have an account yet, please sign up.');
      } else if (message.includes('network') || message.includes('fetch')) {
        setLoginError('Network error. Please check your connection and try again.');
      } else {
        setLoginError(error.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message.toLowerCase() : '';
      setLoginError(
        message.includes('network') || message.includes('fetch')
          ? 'Network error. Please check your connection and try again.'
          : error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const clearGuestErrors = () => {
    setGuestError('');
    setGuestPasswordError('');
    setGuestConfirmError('');
    setShowGuestUpgradeHint(false);
  };

  const switchGuestMode = (mode) => {
    if (busy || mode === guestMode) return;
    setGuestMode(mode);
    clearGuestErrors();
    setGuestPassword('');
    setGuestConfirm('');
  };

  // Create a guest profile. Supabase signs up an account whose email is built from
  // the username (see guestAccount.js) and flags it as a guest in its sign-up data.
  // The new-user trigger copies the username into profiles.username. When the
  // session arrives, App.js / RootNavigator switch to the app by themselves, so no
  // navigation is needed.
  const handleGuestCreate = async () => {
    if (busy) return;

    const name = guestName.trim();
    const nameProblem = validateGuestUsername(name);
    const missingPassword = !guestPassword;
    const weakPassword = !missingPassword && !meetsAllRules(guestPassword);
    const missingConfirm = !guestConfirm;
    const mismatch = !missingConfirm && guestPassword !== guestConfirm;

    setGuestError(nameProblem);
    setGuestPasswordError(
      missingPassword
        ? 'Please create a password'
        : weakPassword
          ? 'Your password does not meet all the requirements below'
          : '',
    );
    setGuestConfirmError(
      missingConfirm ? 'Please confirm your password' : mismatch ? 'Passwords do not match' : '',
    );

    if (nameProblem || missingPassword || weakPassword || missingConfirm || mismatch) return;

    setGuestLoading(true);

    try {
      const { data: usernameTaken, error: usernameCheckError } = await supabase.rpc(
        'is_guest_username_taken',
        { candidate_username: name },
      );

      if (usernameCheckError) {
        console.error('Guest username availability check failed:', {
          code: usernameCheckError.code,
          message: usernameCheckError.message,
          details: usernameCheckError.details,
          hint: usernameCheckError.hint,
        });

        if (
          usernameCheckError.code === 'PGRST202' ||
          usernameCheckError.message?.toLowerCase().includes('schema cache')
        ) {
          setGuestError(
            "Supabase's API has not loaded the username check yet. Refresh its schema cache in Supabase, then try again.",
          );
        } else {
          setGuestError('Could not check username availability. Please try again.');
        }
        return;
      }

      if (usernameTaken) {
        setGuestError('Username already exists. Choose another, or tap "I already have one" if it is yours.');
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: guestEmailFromUsername(name),
        password: guestPassword,
        options: { data: { username: name, is_guest: true } },
      });

      if (error) {
        setGuestError(describeGuestSignUpError(error));
        return;
      }

      if (!data?.session) {
        // The account exists but Supabase did not sign it in, which happens when
        // "Confirm email" is switched on. A guest has no inbox to confirm from.
        setGuestError(
          'Guest sign-up needs "Confirm email" turned off in Supabase (Authentication, Sign In / Providers, Email).',
        );
      }
    } catch (error) {
      setGuestError(
        error instanceof Error ? error.message : 'Could not create a guest profile. Please try again.',
      );
    } finally {
      setGuestLoading(false);
    }
  };

  // Log back in to an existing guest profile with username + password.
  const handleGuestLogin = async () => {
    if (busy) return;
    setShowGuestUpgradeHint(false);

    const name = guestName.trim();
    const missingName = !name;
    const missingPassword = !guestPassword;
    const wrongCredentials = 'Incorrect username or password.';

    setGuestError(missingName ? 'Please enter your username' : '');
    setGuestPasswordError(missingPassword ? 'Please enter your password' : '');
    setGuestConfirmError('');

    if (missingName || missingPassword) return;

    // Names with spaces or symbols cannot belong to a guest who signed up with a
    // password, so there is no point asking Supabase.
    if (validateGuestUsername(name)) {
      setGuestPasswordError(wrongCredentials);
      return;
    }

    setGuestLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: guestEmailFromUsername(name),
        password: guestPassword,
      });

      if (error) {
        const message = (error.message || '').toLowerCase();
        const invalidCredentials =
          error.code === 'invalid_credentials' || message.includes('invalid login credentials');

        if (invalidCredentials) {
          setGuestPasswordError(wrongCredentials);
          setShowGuestUpgradeHint(true);
        } else if (message.includes('network') || message.includes('fetch')) {
          setGuestPasswordError('Network error. Please check your connection and try again.');
        } else {
          setGuestPasswordError(error.message || 'Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      setGuestPasswordError(
        error instanceof Error ? error.message : 'Could not log in. Please try again.',
      );
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Login to continue your journey</Text>
        </View>

        {/* Email */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, emailError || loginError ? styles.inputError : null]}
            placeholder="Enter your email"
            placeholderTextColor="#9A9A9A"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            editable={!busy}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
              if (loginError) setLoginError('');
            }}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        {/* Password */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, passwordError || loginError ? styles.inputError : null]}
            placeholder="Enter your password"
            placeholderTextColor="#9A9A9A"
            secureTextEntry
            value={password}
            editable={!busy}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
              if (loginError) setLoginError('');
            }}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          style={styles.forgotWrapper}
          disabled={busy}
          onPress={() => navigation?.navigate('ForgotPassword', { email: email.trim() })}
        >
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.primaryButton, loading && { opacity: 0.7 }]}
          activeOpacity={0.85}
          onPress={handleLogin}
          disabled={busy}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google Button */}
        <GoogleButton disabled={busy} />

        {/* Continue as guest */}
        <TouchableOpacity
          style={styles.guestButton}
          activeOpacity={0.85}
          onPress={() => setShowGuest(!showGuest)}
          disabled={busy}
        >
          <Text style={styles.guestButtonText}>👤 Continue as guest</Text>
        </TouchableOpacity>

        {showGuest && (
          <View style={styles.guestPanel}>
            {/* Create a guest profile / log back in to one */}
            <View style={styles.segmentRow}>
              <TouchableOpacity
                style={[styles.segment, isCreate && styles.segmentActive]}
                activeOpacity={0.85}
                onPress={() => switchGuestMode('create')}
                disabled={busy}
              >
                <Text style={[styles.segmentText, isCreate && styles.segmentTextActive]}>
                  Create guest profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segment, !isCreate && styles.segmentActive]}
                activeOpacity={0.85}
                onPress={() => switchGuestMode('login')}
                disabled={busy}
              >
                <Text style={[styles.segmentText, !isCreate && styles.segmentTextActive]}>
                  I already have one
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>{isCreate ? 'Choose a username' : 'Username'}</Text>
            <TextInput
              style={[styles.input, guestError ? styles.inputError : null]}
              placeholder={isCreate ? 'Enter a username' : 'Enter your username'}
              placeholderTextColor="#9A9A9A"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={30}
              value={guestName}
              editable={!busy}
              onChangeText={(text) => {
                setGuestName(text);
                if (guestError) setGuestError('');
                if (!isCreate && guestPasswordError) setGuestPasswordError('');
                if (showGuestUpgradeHint) setShowGuestUpgradeHint(false);
              }}
            />
            {guestError ? <Text style={styles.errorText}>{guestError}</Text> : null}

            <Text style={[styles.label, styles.guestFieldGap]}>Password</Text>
            <TextInput
              style={[styles.input, guestPasswordError ? styles.inputError : null]}
              placeholder={isCreate ? 'Create a password' : 'Enter your password'}
              placeholderTextColor="#9A9A9A"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              value={guestPassword}
              editable={!busy}
              onChangeText={(text) => {
                setGuestPassword(text);
                if (guestPasswordError) setGuestPasswordError('');
                if (showGuestUpgradeHint) setShowGuestUpgradeHint(false);
              }}
              onSubmitEditing={isCreate ? undefined : handleGuestLogin}
            />
            {guestPasswordError ? <Text style={styles.errorText}>{guestPasswordError}</Text> : null}
            {showGuestUpgradeHint && !isCreate ? (
              <Text style={styles.errorText}>
                If you upgraded this guest profile, log in with your email and password above.
              </Text>
            ) : null}

            {isCreate ? <PasswordRequirements password={guestPassword} /> : null}

            {isCreate ? (
              <>
                <Text style={[styles.label, styles.guestFieldGap]}>Confirm password</Text>
                <TextInput
                  style={[styles.input, guestConfirmError ? styles.inputError : null]}
                  placeholder="Re-enter your password"
                  placeholderTextColor="#9A9A9A"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  value={guestConfirm}
                  editable={!busy}
                  onChangeText={(text) => {
                    setGuestConfirm(text);
                    if (guestConfirmError) setGuestConfirmError('');
                  }}
                  onSubmitEditing={handleGuestCreate}
                />
                {guestConfirmError ? (
                  <Text style={styles.errorText}>{guestConfirmError}</Text>
                ) : guestConfirm.length > 0 && guestConfirm === guestPassword ? (
                  <Text style={styles.matchText}>✓ Passwords match</Text>
                ) : null}
              </>
            ) : null}

            <Text style={styles.guestNote}>
              {isCreate
                ? 'No email needed. Remember your password: a guest password cannot be reset. You can create a full account later and keep your progress.'
                : 'Guest passwords cannot be reset because guests have no email.'}
            </Text>

            <TouchableOpacity
              style={[styles.primaryButton, styles.fullWidth, guestLoading && { opacity: 0.7 }]}
              activeOpacity={0.85}
              onPress={isCreate ? handleGuestCreate : handleGuestLogin}
              disabled={busy}
            >
              {guestLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>
                  {isCreate ? 'Start as guest' : 'Log in as guest'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Sign Up */}
        <View style={styles.signUpRow}>
          <Text style={styles.signUpText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Register')} disabled={busy}>
            <Text style={styles.signUpLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Original styles are unchanged. Added: scrollContent, guestButton, guestButtonText,
// guestPanel, guestNote, fullWidth, segmentRow, segment, segmentActive, segmentText,
// segmentTextActive, guestFieldGap, matchText.
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24 },
  scrollContent: { paddingBottom: 32 },
  headerWrapper: { alignItems: 'center', marginTop: 48, marginBottom: 32 },
  title: { fontSize: 26, fontWeight: '800', color: '#111111' },
  subtitle: { fontSize: 14, color: '#888888', marginTop: 6 },
  fieldGroup: { width: '90%', alignSelf: 'center', marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', color: '#111111', marginBottom: 8 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#DADADA', borderRadius: 10, paddingHorizontal: 14, fontSize: 14, color: '#111111' },
  inputError: { borderColor: '#E5484D' },
  errorText: { color: '#E5484D', fontSize: 12, marginTop: 6 },
  forgotWrapper: { width: '90%', alignSelf: 'center', marginBottom: 10 },
  forgotText: { color: PURPLE, fontSize: 14, fontWeight: '600' },
  primaryButton: { width: '90%', alignSelf: 'center', backgroundColor: PURPLE, borderRadius: 14, height: 52, alignItems: 'center', justifyContent: 'center', shadowColor: PURPLE_DARK, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 4 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  dividerRow: { width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginVertical: 28 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  dividerText: { marginHorizontal: 12, color: '#888888', fontSize: 13 },
  signUpRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  signUpText: { fontSize: 14, color: '#666666' },
  signUpLink: { fontSize: 14, color: PURPLE, fontWeight: '700' },

  guestButton: { width: '90%', alignSelf: 'center', height: 50, borderRadius: 14, borderWidth: 1.5, borderColor: PURPLE, alignItems: 'center', justifyContent: 'center', marginTop: 14 },
  guestButtonText: { color: PURPLE, fontSize: 15, fontWeight: '700' },
  guestPanel: { width: '90%', alignSelf: 'center', marginTop: 16 },
  guestNote: { fontSize: 12, color: '#888888', marginTop: 8, marginBottom: 14, lineHeight: 17 },
  fullWidth: { width: '100%' },
  segmentRow: { flexDirection: 'row', backgroundColor: '#F1EEFF', borderRadius: 12, padding: 4, marginBottom: 18 },
  segment: { flex: 1, height: 40, borderRadius: 9, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  segmentActive: { backgroundColor: PURPLE },
  segmentText: { fontSize: 13, fontWeight: '600', color: PURPLE, textAlign: 'center' },
  segmentTextActive: { color: '#FFFFFF' },
  guestFieldGap: { marginTop: 14 },
  matchText: { color: '#2E9E5B', fontSize: 12, marginTop: 6 },
});
