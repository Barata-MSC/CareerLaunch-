import { Platform } from 'react-native';

export const MOTION = {
  small: 180,
  float: 3000,
  floatAmplitude: 6,
};

export const useNativeDriver = Platform.OS !== 'web';
