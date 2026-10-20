import { Platform } from 'react-native';

export const MOTION = {
  screen: 300,
  small: 180,
  press: 120,
  float: 3000,
  spring: {
    tension: 150,
    friction: 8,
    mass: 0.4,
  },
  easings: {
    standard: 'easeInOut',
    emphasis: 'easeOut',
  },
  floatAmplitude: 6,
  slideOffset: 16,
  springScale: 0.96,
};

export const useNativeDriver = Platform.OS !== 'web';
