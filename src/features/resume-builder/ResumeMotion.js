import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Platform, Text, View } from 'react-native';
import FadeSlideIn from '@components/motion/FadeSlideIn';
import Pop from '@components/motion/Pop';
import { durations } from '@components/motion/motionTokens';
import useReduceMotion from '@components/motion/useReduceMotion';

const useNativeDriver = Platform.OS !== 'web';

export function ResumeProgressBar({ progress, trackStyle, fillStyle }) {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const [trackWidth, setTrackWidth] = useState(0);
  const reduceMotion = useReduceMotion();
  const fillOffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-trackWidth / 2, 0],
  });

  useEffect(() => {
    if (reduceMotion) {
      animatedProgress.stopAnimation();
      animatedProgress.setValue(progress);
      return undefined;
    }

    const animation = Animated.timing(animatedProgress, {
      toValue: progress,
      duration: durations.progress,
      useNativeDriver,
    });
    animation.start();
    return () => animation.stop();
  }, [animatedProgress, progress, reduceMotion]);

  return (
    <View style={trackStyle} onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}>
      <Animated.View
        style={[
          fillStyle,
          {
            transform: [{ translateX: fillOffset }, { scaleX: animatedProgress }],
          },
        ]}
      />
    </View>
  );
}

export function ResumeScoreCount({ value, style }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);
  const reduceMotion = useReduceMotion();

  useEffect(() => {
    if (reduceMotion) {
      animatedValue.stopAnimation();
      animatedValue.setValue(value);
      setDisplayValue(value);
      return undefined;
    }

    const listenerId = animatedValue.addListener(({ value: currentValue }) => {
      setDisplayValue(Math.round(currentValue));
    });
    const animation = Animated.timing(animatedValue, {
      toValue: value,
      duration: durations.progress,
      useNativeDriver,
    });
    animation.start(({ finished }) => {
      if (finished) setDisplayValue(value);
    });

    return () => {
      animatedValue.removeListener(listenerId);
      animation.stop();
    };
  }, [animatedValue, reduceMotion, value]);

  return <Text style={style}>{displayValue}</Text>;
}

export function ResumeEntry({ children, entryKey, isNew, removing, onRemoveComplete, delay = 0 }) {
  const opacity = useRef(new Animated.Value(1)).current;
  const scaleY = useRef(new Animated.Value(1)).current;
  const onRemoveCompleteRef = useRef(onRemoveComplete);
  const reduceMotion = useReduceMotion();
  onRemoveCompleteRef.current = onRemoveComplete;

  useEffect(() => {
    if (!removing) return undefined;
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: reduceMotion ? durations.reducedMotionFade : durations.press,
        useNativeDriver,
      }),
      ...(reduceMotion
        ? []
        : [
            Animated.timing(scaleY, {
              toValue: 0.85,
              duration: durations.press,
              useNativeDriver,
            }),
          ]),
    ]);
    animation.start(({ finished }) => {
      if (finished) onRemoveCompleteRef.current(entryKey);
    });
    return () => animation.stop();
  }, [entryKey, opacity, reduceMotion, removing, scaleY]);

  return (
    <FadeSlideIn delay={delay}>
      <Pop value={isNew} playOnMount>
        <Animated.View style={{ opacity, transform: [{ scaleY }] }}>{children}</Animated.View>
      </Pop>
    </FadeSlideIn>
  );
}

export function ResumeEmptyState({ visible, children }) {
  const [mounted, setMounted] = useState(visible);
  const opacity = useRef(new Animated.Value(visible ? 0 : 1)).current;
  const reduceMotion = useReduceMotion();

  useEffect(() => {
    if (visible) setMounted(true);

    if (reduceMotion) {
      opacity.setValue(visible ? 1 : 0);
      if (!visible) setMounted(false);
      return undefined;
    }

    const animation = Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: durations.entrance,
      useNativeDriver,
    });
    animation.start(({ finished }) => {
      if (finished && !visible) setMounted(false);
    });
    return () => animation.stop();
  }, [opacity, reduceMotion, visible]);

  if (!mounted) return null;
  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}

export function useResumeEntryRemoval(onRemove) {
  const [removingKeys, setRemovingKeys] = useState([]);
  const removingKeysRef = useRef(new Set());
  const onRemoveRef = useRef(onRemove);
  onRemoveRef.current = onRemove;

  const requestRemoval = useCallback((key) => {
    if (removingKeysRef.current.has(key)) return;
    removingKeysRef.current.add(key);
    setRemovingKeys([...removingKeysRef.current]);
  }, []);

  const completeRemoval = useCallback((key) => {
    if (!removingKeysRef.current.has(key)) return;
    removingKeysRef.current.delete(key);
    setRemovingKeys([...removingKeysRef.current]);
    onRemoveRef.current(key);
  }, []);

  return { removingKeys, requestRemoval, completeRemoval };
}
