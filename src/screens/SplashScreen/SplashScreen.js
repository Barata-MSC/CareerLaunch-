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

const LOGO_SIZE = 112;
const BG = '#FEFEFE'; // matches the logo PNG's background so no box shows while it moves
const NAME_COLOR = '#0A2A6B';

/**
 * Animated splash screen.
 *
 * Sequence (~2.5s):
 *  1. Rocket flies in from the bottom-left, along the direction it points
 *  2. App name fades in while the rocket hovers
 *  3. Rocket blasts off toward the top-right and the screen fades out
 *  4. onFinish() is called
 *
 * Props:
 *  - onFinish: () => void   called when the animation is done
 *  - appName:  string       optional, shown under the rocket
 */
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
        // Simple fade for people who have "Reduce Motion" turned on
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
          // 1. Fly in
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
          // 2. Hover + app name
          Animated.parallel([
            hoverCycle,
            Animated.timing(nameOpacity, {
              toValue: 1,
              duration: 450,
              useNativeDriver: true,
            }),
          ]),
          // 3. Blast off
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hoverY = hover.interpolate({ inputRange: [0, 1], outputRange: [4, -6] });
  const translateY = Animated.add(flyY, hoverY);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <Animated.Image
        source={require('@assets/rocket-icon.png')} // adjust path to where you saved the logo
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
    justifyContent: 'center',
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  name: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: NAME_COLOR,
  },
});