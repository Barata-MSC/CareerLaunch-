// components/IconBadge.js
// A small circular "floating" badge that sits on top of the illustration
// bubble (briefcase, graduation cap, trending-up chart, clipboard).
// Icons are drawn with react-native-svg so no external image assets or
// icon-font packages are required.

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle, Polyline } from 'react-native-svg';
import { colors } from '../theme';

const ICONS = {
  briefcase: (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="7.5" width="18" height="12" rx="2" stroke={colors.rocketBlue} strokeWidth={2} />
      <Path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" stroke={colors.rocketBlue} strokeWidth={2} strokeLinecap="round" />
      <Path d="M3 12.5h18" stroke={colors.rocketBlue} strokeWidth={2} />
    </Svg>
  ),
  cap: (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4 2 9l10 5 10-5-10-5Z" stroke={colors.purple} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" stroke={colors.purple} strokeWidth={2} strokeLinecap="round" />
      <Path d="M21 9.5v4" stroke={colors.purple} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  ),
  chart: (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Polyline points="3,17 9,11 13,15 21,6" stroke={colors.hoodie} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Polyline points="14,6 21,6 21,13" stroke={colors.hoodie} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  ),
  clipboard: (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Rect x="5" y="4" width="14" height="17" rx="2" stroke={colors.purple} strokeWidth={2} />
      <Rect x="9" y="2.5" width="6" height="3" rx="1" fill={colors.purple} />
      <Path d="M8.5 11.5 10.5 13.5 15 9" stroke={colors.purple} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8.5 17h7" stroke={colors.purple} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  ),
};

export default function IconBadge({ icon, style, size = 52 }) {
  return (
    <View
      style={[
        styles.badge,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      {ICONS[icon] || null}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    backgroundColor: colors.badgeBg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.badgeShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
});
