import React, { useEffect, useRef } from 'react';
import { Animated, Platform } from 'react-native';
import { distances, springs } from './motionTokens';
import useReduceMotion from './useReduceMotion';

const useNativeDriver = Platform.OS !== 'web';

export default function Pop({ children, value, style, playOnMount = false }) {
  const reduceMotion = useReduceMotion();
  const scale = useRef(new Animated.Value(1)).current;
  const previousValue = useRef(playOnMount ? false : value);

  useEffect(() => {
    if (value && !previousValue.current && !reduceMotion) {
      const animation = Animated.sequence([
        Animated.spring(scale, {
          toValue: distances.popScale,
          ...springs.pop,
          useNativeDriver,
        }),
        Animated.spring(scale, {
          toValue: 1,
          ...springs.pop,
          useNativeDriver,
        }),
      ]);
      animation.start();
      previousValue.current = value;
      return () => animation.stop();
    }

    previousValue.current = value;
    scale.setValue(1);
    return undefined;
  }, [reduceMotion, scale, value]);

  return (
    <Animated.View style={[style, { transform: [{ scale }] }]}>
      {children}
    </Animated.View>
  );
}
