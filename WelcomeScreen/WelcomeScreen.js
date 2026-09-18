import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

// Update these paths to match where you place the images in your project,
// e.g. ./assets/rocket-icon.png and ./assets/student-illustration.png
const ROCKET_ICON = require('../assets/rocket-icon.png');
const STUDENT_ILLUSTRATION = require('../assets/student-illustration.png');

export default function WelcomeScreen({ navigation }) {
  const handleGetStarted = () => {
    // Navigate to your sign-up / onboarding flow
    navigation?.navigate('GetStarted');
  };

  const handleLogin = () => {
    // Navigate to your login screen
    navigation?.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Logo / brand */}
      <View style={styles.logoRow}>
        <Image source={ROCKET_ICON} style={styles.logoIcon} resizeMode="contain" />
        <Text style={styles.logoText}>
          Career<Text style={styles.logoTextAccent}>Launch</Text>
        </Text>
      </View>

      {/* Illustration */}
      <View style={styles.illustrationWrapper}>
        <View style={styles.illustrationCircle} />
        <Image
          source={STUDENT_ILLUSTRATION}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Tagline */}
      <View style={styles.taglineWrapper}>
        <Text style={styles.tagline}>Prepare.</Text>
        <Text style={styles.tagline}>Practice.</Text>
        <Text style={styles.tagline}>Get Hired.</Text>
      </View>

      {/* CTA button */}
      <TouchableOpacity
        style={styles.primaryButton}
        activeOpacity={0.85}
        onPress={handleGetStarted}
      >
        <Text style={styles.primaryButtonText}>Get started</Text>
      </TouchableOpacity>

      {/* Login link */}
      <View style={styles.loginRow}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#5B21F5';
const PURPLE_DARK = '#3D14C4';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  logoIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111111',
  },
  logoTextAccent: {
    color: PURPLE,
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    height: 280,
  },
  illustrationCircle: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#EEF1FB',
  },
  illustration: {
    width: 300,
    height: 280,
  },
  taglineWrapper: {
    alignItems: 'center',
    marginTop: 32,
  },
  tagline: {
    fontSize: 30,
    fontWeight: '800',
    color: PURPLE,
    lineHeight: 38,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 40,
    shadowColor: PURPLE_DARK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#666666',
  },
  loginLink: {
    fontSize: 14,
    color: PURPLE,
    fontWeight: '700',
  },
});
