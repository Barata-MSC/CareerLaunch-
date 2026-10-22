import React, { useEffect, useRef } from 'react';
import { Animated, Platform, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { distances, durations, easings } from './motionTokens';
import useReduceMotion from './useReduceMotion';

const useNativeDriver = Platform.OS !== 'web';

export default function Float({
  children,
  amplitude = distances.floatAmplitude,
  duration = durations.floatHalfCycle * 2,
  phaseOffset = 0,
  style,
}) {
  const isFocused = useIsFocused();
  const reduceMotion = useReduceMotion();
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isFocused || reduceMotion) {
      translateY.stopAnimation();
      translateY.setValue(0);
      return undefined;
    }

    const halfCycle = duration / 2;
    const animation = Animated.sequence([
      Animated.delay(phaseOffset),
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -amplitude,
            duration: halfCycle,
            easing: easings.float,
            useNativeDriver,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: halfCycle,
            easing: easings.float,
            useNativeDriver,
          }),
        ]),
      ),
    ]);

    animation.start();
    return () => animation.stop();
  }, [
    amplitude,
    duration,
    isFocused,
    phaseOffset,
    reduceMotion,
    translateY,
  ]);

  if (!isFocused || reduceMotion) {
    return <View style={style}>{children}</View>;
  }

  return (
    <Animated.View style={[style, { transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}
