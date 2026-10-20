import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { MOTION, useNativeDriver } from './motionTokens';
import useReduceMotion from './useReduceMotion';

export default function AnimatedStage({
  children,
  stageKey,
  direction = 1,
  duration = MOTION.screen,
  style,
}) {
  const reducedMotion = useReduceMotion();
  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const prevKeyRef = useRef(stageKey);

  useEffect(() => {
    if (reducedMotion) {
      opacity.setValue(1);
      translateY.setValue(0);
      prevKeyRef.current = stageKey;
      return undefined;
    }

    if (prevKeyRef.current === stageKey) {
      opacity.setValue(1);
      translateY.setValue(0);
      return undefined;
    }

    const startValue = direction > 0 ? 12 : -12;
    translateY.setValue(startValue);
    opacity.setValue(0);

    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        useNativeDriver,
      }),
    ]);

    animation.start();
    prevKeyRef.current = stageKey;
    return () => animation.stop();
  }, [direction, duration, opacity, reducedMotion, stageKey, translateY]);

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
