import React, { useRef } from 'react';
import { Animated, Platform } from 'react-native';
import { distances, springs } from './motionTokens';
import useReduceMotion from './useReduceMotion';

const useNativeDriver = Platform.OS !== 'web';

export default function PressScale({ children, style, disabled = false, onPressIn, onPressOut }) {
  const scale = useRef(new Animated.Value(1)).current;
  const reduceMotion = useReduceMotion();

  const animateScale = (toValue) => {
    scale.stopAnimation();
    if (reduceMotion || disabled) {
      scale.setValue(1);
      return;
    }

    Animated.spring(scale, {
      toValue,
      ...springs.press,
      useNativeDriver,
    }).start();
  };

  if (!React.isValidElement(children)) {
    return children;
  }

  return (
    <Animated.View style={[style, { transform: [{ scale }] }]}>
      {React.cloneElement(children, {
        onPressIn: (event) => {
          animateScale(distances.pressScale);
          onPressIn?.(event);
        },
        onPressOut: (event) => {
          animateScale(1);
          onPressOut?.(event);
        },
      })}
    </Animated.View>
  );
}
