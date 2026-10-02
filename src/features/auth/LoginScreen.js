import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';

// Explicit alias pointing to your configuration
import { supabase } from '@config/supabase';

const GOOGLE_ICON = require('@assets/google-icon.png');
const PURPLE = '#5B21F5';
const PURPLE_DARK = '#3D14C4';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const missingEmail = !email.trim();
    const missingPassword = !password.trim();

    setEmailError(missingEmail ? 'Please enter your email' : '');
    setPasswordError(missingPassword ? 'Please enter your password' : '');

    if (missingEmail || missingPassword) return;

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Login Failed', error.message);
    }
   navigation.navigate('MainTabs', { screen: 'Dashboard' });
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
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="Enter your email"
          placeholderTextColor="#9A9A9A"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          editable={!loading}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError('');
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>

      {/* Password */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder="Enter your password"
          placeholderTextColor="#9A9A9A"
          secureTextEntry
          value={password}
          editable={!loading}
          onChangeText={(text) => {
            setPassword(text);
            if (passwordError) setPasswordError('');
          }}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotWrapper} disabled={loading}>
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
      <TouchableOpacity style={styles.googleButton} activeOpacity={0.85} disabled={loading}>
        <Image
          source={require('@assets/google-icon.png')}
          style={styles.googleIcon}
          resizeMode="contain"
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

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
  googleButton: { width: '90%', alignSelf: 'center', height: 52, flexDirection: 'row', borderWidth: 1, borderColor: '#DADADA', borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  googleIcon: { width: 20, height: 20 },
  googleButtonText: { marginLeft: 10, fontSize: 15, fontWeight: '600', color: '#111111' },
  signUpRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  signUpText: { fontSize: 14, color: '#666666' },
  signUpLink: { fontSize: 14, color: PURPLE, fontWeight: '700' },
});
