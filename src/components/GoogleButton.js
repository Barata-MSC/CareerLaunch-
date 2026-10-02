import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const GOOGLE_ICON = require('@assets/google-icon.png');

export default function GoogleButton({ disabled = false, onPress }) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Continue with Google"
    >
      <Image source={GOOGLE_ICON} style={styles.icon} resizeMode="contain" />
      <Text style={styles.label}>Continue with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '90%',
    alignSelf: 'center',
    height: 52,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { width: 20, height: 20 },
  label: { marginLeft: 10, fontSize: 15, fontWeight: '600', color: '#111111' },
});