import React, { useEffect, useRef } from 'react';
import { Animated, Platform } from 'react-native';
import { distances, durations, easings } from './motionTokens';
import useReduceMotion from './useReduceMotion';

const useNativeDriver = Platform.OS !== 'web';

export default function FadeSlideIn({
  children,
  delay = 0,
  enabled = true,
  style,
}) {
  const reduceMotion = useReduceMotion();
  const opacity = useRef(new Animated.Value(enabled ? 0 : 1)).current;
  const translateY = useRef(new Animated.Value(distances.entrance)).current;

  useEffect(() => {
    if (!enabled) {
      opacity.setValue(1);
      translateY.setValue(0);
      return undefined;
    }

    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: reduceMotion ? durations.reducedMotionFade : durations.entrance,
        delay: reduceMotion ? 0 : delay,
        easing: easings.entrance,
        useNativeDriver,
      }),
      ...(reduceMotion
        ? []
        : [
            Animated.timing(translateY, {
              toValue: 0,
              duration: durations.entrance,
              delay,
              easing: easings.entrance,
              useNativeDriver,
            }),
          ]),
    ]);

    animation.start();
    return () => animation.stop();
  }, [delay, enabled, opacity, translateY]);

  useEffect(() => {
    if (reduceMotion) {
      opacity.stopAnimation();
      translateY.stopAnimation();
      opacity.setValue(1);
      translateY.setValue(0);
    }
  }, [opacity, reduceMotion, translateY]);

  return (
    <Animated.View
      style={[
        style,
        { opacity },
        !reduceMotion && { transform: [{ translateY }] },
      ]}
    >
      {children}
    </Animated.View>
  );
}
