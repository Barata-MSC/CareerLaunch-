import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Platform } from 'react-native';
import { distances, durations, easings } from './motionTokens';
import useReduceMotion from './useReduceMotion';

const useNativeDriver = Platform.OS !== 'web';

export default function AnimatedStage({
  children,
  stageKey,
  direction = 'none',
  style,
}) {
  const reduceMotion = useReduceMotion();
  const opacity = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const previousKeyRef = useRef(stageKey);
  const motionSettingsRef = useRef({ direction: 'none', reduceMotion: false });

  const resolvedDirection = useMemo(() => {
    if (direction === 'forward' || direction === 'back' || direction === 'none') {
      return direction;
    }
    return 'none';
  }, [direction]);

  motionSettingsRef.current = {
    direction: resolvedDirection,
    reduceMotion,
  };

  useEffect(() => {
    if (stageKey === previousKeyRef.current) return undefined;
    previousKeyRef.current = stageKey;

    const { direction: stageDirection, reduceMotion: shouldReduceMotion } =
      motionSettingsRef.current;
    opacity.stopAnimation();
    translateX.stopAnimation();

    if (shouldReduceMotion) {
      opacity.setValue(1);
      translateX.setValue(0);
      return undefined;
    }

    const travel = stageDirection === 'forward' ? distances.stage : stageDirection === 'back' ? -distances.stage : 0;

    opacity.setValue(0);
    translateX.setValue(travel);

    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: durations.stage,
        easing: easings.entrance,
        useNativeDriver,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: durations.stage,
        easing: easings.entrance,
        useNativeDriver,
      }),
    ]);

    animation.start();

    return () => animation.stop();
  }, [opacity, stageKey, translateX]);

  useEffect(() => {
    if (!reduceMotion) return undefined;
    opacity.stopAnimation();
    translateX.stopAnimation();
    opacity.setValue(1);
    translateX.setValue(0);
    return undefined;
  }, [opacity, reduceMotion, translateX]);

  useEffect(() => {
    return () => {
      opacity.stopAnimation();
      translateX.stopAnimation();
    };
  }, [opacity, translateX]);

  return (
    <Animated.View
      style={[
        { flex: 1, minHeight: 0 },
        style,
        { opacity },
        !reduceMotion && { transform: [{ translateX }] },
      ]}
    >
      {children}
    </Animated.View>
  );
}
