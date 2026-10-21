import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { MOTION, useNativeDriver } from './motionTokens';
import useReduceMotion from './useReduceMotion';

export default function Pop({
  children,
  trigger = 0,
  animateOnMount = false,
  scaleTo = 1.04,
  duration = MOTION.press,
}) {
  const reducedMotion = useReduceMotion();
  const scale = useRef(new Animated.Value(1)).current;
  const hasMounted = useRef(false);
  const previousTrigger = useRef(trigger);

  useEffect(() => {
    const changed = previousTrigger.current !== trigger;
    const shouldAnimate = hasMounted.current ? changed && trigger !== 0 : animateOnMount && trigger !== 0;
    hasMounted.current = true;
    previousTrigger.current = trigger;

    if (reducedMotion) {
      scale.setValue(1);
      return undefined;
    }

    if (!shouldAnimate) {
      scale.setValue(1);
      return undefined;
    }

    const animation = Animated.sequence([
      Animated.timing(scale, {
        toValue: scaleTo,
        duration: duration / 2,
        useNativeDriver,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 180,
        useNativeDriver,
      }),
    ]);

    animation.start();
    return () => animation.stop();
  }, [animateOnMount, duration, reducedMotion, scale, scaleTo, trigger]);

  return <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>;
}
