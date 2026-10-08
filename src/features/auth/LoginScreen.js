import React, { useState } from 'react';
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
import GoogleButton from '@components/GoogleButton';

// Explicit alias pointing to your configuration
import { supabase } from '@config/supabase';

const PURPLE = '#5B21F5';
const PURPLE_DARK = '#3D14C4';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

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

    const { error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password: password,
    });

    setLoading(false);

    if (error) {
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
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

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
          editable={!loading}
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
          editable={!loading}
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
        disabled={loading}
        onPress={() => navigation?.navigate('ForgotPassword', { email: email.trim() })}
      >
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.primaryButton, loading && { opacity: 0.7 }]}
        activeOpacity={0.85}
        onPress={handleLogin}
        disabled={loading}
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
      <GoogleButton disabled={loading} />

      {/* Sign Up */}
      <View style={styles.signUpRow}>
        <Text style={styles.signUpText}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={() => navigation?.navigate('Register')} disabled={loading}>
          <Text style={styles.signUpLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ... styles object remains unchanged to perfectly protect your exact UI design ...
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24 },
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
});
