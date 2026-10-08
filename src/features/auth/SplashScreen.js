import React, { useEffect, useRef } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

const { width: W, height: H } = Dimensions.get('window');

const LOGO_SIZE = Math.min(W, H) * 0.32;
const BG = '#FEFEFE';
const NAME_COLOR = '#0A2A6B';

export default function SplashScreen({ onFinish, appName }) {
  const flyX = useRef(new Animated.Value(-W * 0.7)).current;
  const flyY = useRef(new Animated.Value(H * 0.7)).current;
  const hover = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const nameOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let animation;
    let cancelled = false;

    const run = (reduceMotion) => {
      if (cancelled) return;

      if (reduceMotion) {
        flyX.setValue(0);
        flyY.setValue(0);
        animation = Animated.sequence([
          Animated.parallel([
            Animated.timing(logoOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(nameOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
          ]),
          Animated.delay(900),
          Animated.timing(screenOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]);
      } else {
        const hoverCycle = Animated.sequence([
          Animated.timing(hover, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(hover, {
            toValue: 0,
            duration: 500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]);

        animation = Animated.sequence([
          Animated.parallel([
            Animated.timing(flyX, {
              toValue: 0,
              duration: 850,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(flyY, {
              toValue: 0,
              duration: 850,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(logoOpacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            hoverCycle,
            Animated.timing(nameOpacity, {
              toValue: 1,
              duration: 450,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(flyX, {
              toValue: W,
              duration: 650,
              easing: Easing.in(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(flyY, {
              toValue: -H,
              duration: 650,
              easing: Easing.in(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(nameOpacity, {
              toValue: 0,
              duration: 250,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.delay(350),
              Animated.timing(screenOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }),
            ]),
          ]),
        ]);
      }

      animation.start(({ finished }) => {
        if (finished && !cancelled && onFinish) onFinish();
      });
    };

    AccessibilityInfo.isReduceMotionEnabled()
      .then(run)
      .catch(() => run(false));

    return () => {
      cancelled = true;
      if (animation) animation.stop();
    };
  }, []);

  const hoverY = hover.interpolate({ inputRange: [0, 1], outputRange: [4, -6] });
  const translateY = Animated.add(flyY, hoverY);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      {/* Rocket keeps its own flight path, positioned above center */}
      <Animated.Image
        source={require('@assets/rocket-icon.png')}
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [{ translateX: flyX }, { translateY }],
          },
        ]}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />

      {/* App name is now pinned to the true vertical center of the screen */}
      {appName ? (
        <Animated.Text style={[styles.name, { opacity: nameOpacity }]}>{appName}</Animated.Text>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BG,
    alignItems: 'center',
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    position: 'absolute',
    top: H / 2 - LOGO_SIZE - 20,
  },
  name: {
    position: 'absolute',
    top: H / 2 + 10,
    left: 0,
    right: 0,
    fontSize: 35,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: NAME_COLOR,
    textAlign: 'center',
  },
});