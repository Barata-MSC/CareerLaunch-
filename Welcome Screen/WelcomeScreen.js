// WelcomeScreen.js
// Top-level onboarding / welcome screen for the "CareerLaunch" app.
// Usage:
//
//   import WelcomeScreen from './src/CareerLaunch/WelcomeScreen';
//
//   <WelcomeScreen
//     onGetStarted={() => navigation.navigate('SignUp')}
//     onLogin={() => navigation.navigate('Login')}
//   />

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import RocketIcon from './components/RocketIcon';
import HeroIllustration from './components/HeroIllustration';
import PrimaryButton from './components/PrimaryButton';
import { colors, spacing, typography } from './theme';

export default function WelcomeScreen({ onGetStarted, onLogin }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Logo / wordmark */}
      <View style={styles.logoRow}>
        <RocketIcon size={34} />
        <Text style={styles.logoText}>
          Career
          <Text style={styles.logoTextAccent}>Launch</Text>
        </Text>
      </View>

      {/* Hero illustration */}
      <View style={styles.illustrationContainer}>
        <HeroIllustration />
      </View>

      {/* Tagline */}
      <View style={styles.taglineContainer}>
        <Text style={styles.tagline}>Prepare.</Text>
        <Text style={styles.tagline}>Practice.</Text>
        <Text style={styles.tagline}>Get Hired.</Text>
      </View>

      {/* Spacer pushes CTA toward the bottom like the reference design */}
      <View style={{ flex: 1 }} />

      {/* Call to action */}
      <View style={styles.ctaContainer}>
        <PrimaryButton title="Get started" onPress={onGetStarted} />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={onLogin} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.footerLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  logoText: {
    fontSize: typography.logo,
    fontWeight: '800',
    color: colors.black,
    marginLeft: spacing.sm,
  },
  logoTextAccent: {
    color: colors.purple,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  taglineContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  tagline: {
    fontSize: typography.tagline,
    fontWeight: '800',
    color: colors.purple,
    lineHeight: typography.tagline + 8,
    textAlign: 'center',
  },
  ctaContainer: {
    paddingBottom: spacing.xl,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    fontSize: typography.footer,
    color: colors.grayText,
  },
  footerLink: {
    fontSize: typography.footer,
    color: colors.purple,
    fontWeight: '700',
  },
});
