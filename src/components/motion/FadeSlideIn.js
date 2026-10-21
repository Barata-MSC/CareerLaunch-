import React, { useLayoutEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { MOTION, useNativeDriver } from './motionTokens';
import useReduceMotion from './useReduceMotion';

export default function FadeSlideIn({
  children,
  delay = 0,
  duration = MOTION.small,
  distance = 10,
  style,
}) {
  const reducedMotion = useReduceMotion();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(distance)).current;

  useLayoutEffect(() => {
    if (reducedMotion) {
      opacity.setValue(1);
      translateY.setValue(0);
      return undefined;
    }

    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver,
      }),
    ]);

    animation.start();
    return () => animation.stop();
  }, [delay, duration, distance, opacity, reducedMotion, translateY]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
