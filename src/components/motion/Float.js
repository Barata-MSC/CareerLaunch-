import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { MOTION, useNativeDriver } from './motionTokens';
import useReduceMotion from './useReduceMotion';
import { useIsFocused } from '@react-navigation/native';

export default function Float({
  children,
  amplitude = MOTION.floatAmplitude,
  duration = MOTION.float,
  phaseOffset = 0,
  style,
}) {
  const isFocused = useIsFocused();
  const reducedMotion = useReduceMotion();
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isFocused || reducedMotion) {
      translateY.setValue(0);
      return undefined;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -amplitude,
          duration: duration / 2,
          delay: phaseOffset,
          useNativeDriver,
        }),
        Animated.timing(translateY, {
          toValue: amplitude,
          duration,
          useNativeDriver,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [amplitude, duration, isFocused, phaseOffset, reducedMotion, translateY]);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
