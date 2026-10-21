import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { MOTION } from './motionTokens';
import useReduceMotion from './useReduceMotion';

export default function AnimatedProgressFill({ progress, style, duration = MOTION.small }) {
  const reducedMotion = useReduceMotion();
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const safeProgress = Math.min(Math.max(progress || 0, 0), 100);

  useEffect(() => {
    if (reducedMotion) {
      animatedProgress.setValue(safeProgress);
      return undefined;
    }

    const animation = Animated.timing(animatedProgress, {
      toValue: safeProgress,
      duration,
      useNativeDriver: false,
    });

    animation.start();
    return () => animation.stop();
  }, [animatedProgress, duration, reducedMotion, safeProgress]);

  return (
    <Animated.View
      style={[
        style,
        {
          width: animatedProgress.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
        },
      ]}
    />
  );
}