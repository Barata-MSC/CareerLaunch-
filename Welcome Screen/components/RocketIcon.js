// components/RocketIcon.js
// Simple flat rocket mark used next to the "CareerLaunch" wordmark.

import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '../theme';

export default function RocketIcon({ size = 40 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Path
        d="M24 4c7 4 12 12 12 20 0 3-1 6-2 8l-6 4-4-4 4-6c4-6 3-14-4-22Z"
        fill={colors.rocketBlue}
      />
      <Path
        d="M24 4c-7 4-12 12-12 20 0 3 1 6 2 8l6 4 4-4-4-6c-4-6-3-14 4-22Z"
        fill={colors.rocketBlue}
      />
      <Circle cx="24" cy="18" r="4" fill="#FFFFFF" />
      <Path d="M18 32c-3 1-5 4-5 8 4 0 7-2 8-5" fill={colors.rocketBlue} />
      <Path d="M30 32c3 1 5 4 5 8-4 0-7-2-8-5" fill={colors.rocketBlue} />
      <Path d="M6 40c4-6 10-4 10-4" stroke={colors.rocketBlue} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
