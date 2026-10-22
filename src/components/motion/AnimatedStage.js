import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Platform, View } from 'react-native';
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

  const resolvedDirection = useMemo(() => {
    if (direction === 'forward' || direction === 'back' || direction === 'none') {
      return direction;
    }
    return 'none';
  }, [direction]);

  useEffect(() => {
    const isNewStage = stageKey !== previousKeyRef.current;

    if (!isNewStage) {
      opacity.stopAnimation();
      translateX.stopAnimation();
      opacity.setValue(1);
      translateX.setValue(0);
      previousKeyRef.current = stageKey;
      return undefined;
    }

    if (reduceMotion) {
      opacity.setValue(1);
      translateX.setValue(0);
      previousKeyRef.current = stageKey;
      return undefined;
    }

    const stageDirection = resolvedDirection === 'none' ? 'none' : resolvedDirection;
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
    previousKeyRef.current = stageKey;

    return () => animation.stop();
  }, [opacity, reduceMotion, resolvedDirection, stageKey, translateX]);

  useEffect(() => {
    return () => {
      opacity.stopAnimation();
      translateX.stopAnimation();
    };
  }, [opacity, translateX]);

  return (
    <Animated.View
      style={[
        style,
        { opacity },
        !reduceMotion && { transform: [{ translateX }] },
      ]}
    >
      {children}
    </Animated.View>
  );
}
