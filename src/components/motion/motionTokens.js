import { Easing } from 'react-native';

export const durations = {
  entrance: 200,
  reducedMotionFade: 80,
  press: 100,
  progress: 350,
  stage: 240,
  floatHalfCycle: 1500,
};

export const easings = {
  entrance: Easing.out(Easing.cubic),
  float: Easing.inOut(Easing.sin),
};

export const springs = {
  press: { speed: 30, bounciness: 0 },
  pop: { speed: 35, bounciness: 5 },
};

export const distances = {
  entrance: 8,
  stage: 20,
  floatAmplitude: 5,
  pressScale: 0.97,
  popScale: 1.12,
};
