import React, { useCallback, useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet } from 'react-native';

import { playSound } from '../utils/sounds';
import useReduceMotion from './motion/useReduceMotion';

// Styles that position/size the component within its parent. These must live
// on the outer wrapper, otherwise percentages and alignSelf resolve against a
// shrink-wrapped box.
const OUTER_KEYS = new Set([
  'width', 'minWidth', 'maxWidth',
  'flex', 'flexGrow', 'flexShrink', 'flexBasis',
  'alignSelf',
  'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
  'marginHorizontal', 'marginVertical', 'marginStart', 'marginEnd',
  'position', 'top', 'bottom', 'left', 'right', 'zIndex',
]);

function splitStyle(style) {
  const flat = StyleSheet.flatten(style) || {};
  const outer = {};
  const inner = {};
  Object.keys(flat).forEach((key) => {
    (OUTER_KEYS.has(key) ? outer : inner)[key] = flat[key];
  });
  return { outer, inner };
}

export default function AppPressable({
  children,
  disabled,
  onPress,
  onPressIn,
  onPressOut,
  activeOpacity,
  style,
  sound = 'tap',
  animatePress = true,
  ...props
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const reducedMotion = useReduceMotion();

  const resolveStyle = (state) => (typeof style === 'function' ? style(state) : style);
  const { outer } = splitStyle(resolveStyle({ pressed: false }));

  const pressableStyle = (state) => {
    const { inner } = splitStyle(resolveStyle(state));
    return [
      inner,
      { flexGrow: 1 },
      activeOpacity !== undefined && state.pressed && { opacity: activeOpacity },
    ];
  };

  const animateToPress = useCallback(
    (pressed) => {
      if (!animatePress || disabled || reducedMotion) {
        return;
      }

      Animated.spring(scale, {
        toValue: pressed ? 0.97 : 1,
        friction: 7,
        tension: 180,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    },
    [animatePress, disabled, reducedMotion, scale],
  );

  const handlePressIn = useCallback(
    (event) => {
      if (!disabled && sound !== 'none') {
        playSound(sound);
      }
      animateToPress(true);
      onPressIn?.(event);
    },
    [animateToPress, disabled, onPressIn, sound],
  );

  const handlePressOut = useCallback(
    (event) => {
      animateToPress(false);
      onPressOut?.(event);
    },
    [animateToPress, onPressOut],
  );

  return (
    <Animated.View style={[outer, { transform: [{ scale }] }]}>
      <Pressable
        {...props}
        disabled={disabled}
        style={pressableStyle}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}