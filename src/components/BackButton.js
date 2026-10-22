import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AppPressable from './AppPressable';

export default function BackButton({
  accessibilityLabel = 'Back',
  disabled,
  onPress,
  sound = 'tap',
  style,
}) {
  return (
    <AppPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      sound={sound}
      style={[style, styles.button]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={styles.label}>‹</Text>
    </AppPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingRight: 12,
  },
  label: {
    color: '#111111',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '400',
  },
});
