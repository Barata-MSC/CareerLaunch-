// components/HeroIllustration.js
// The big circular illustration near the top of the screen: a soft lavender
// bubble, a stylized character holding a phone, and four floating icon
// badges (briefcase, cap, chart, clipboard) arranged around the edge.

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';
import { colors } from '../theme';
import IconBadge from './IconBadge';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIZE = Math.min(SCREEN_WIDTH - 32, 380);

function Character() {
  return (
    <Svg width={SIZE * 0.62} height={SIZE * 0.78} viewBox="0 0 200 250">
      {/* backpack straps */}
      <Path d="M70 120 Q75 200 85 235" stroke={colors.hair} strokeWidth={10} strokeLinecap="round" fill="none" />
      <Path d="M130 120 Q125 200 115 235" stroke={colors.hair} strokeWidth={10} strokeLinecap="round" fill="none" />

      {/* body / hoodie */}
      <Path
        d="M45 235 Q40 150 55 120 Q75 100 100 100 Q125 100 145 120 Q160 150 155 235 Z"
        fill={colors.hoodie}
      />
      {/* hoodie pocket */}
      <Path d="M75 190 Q100 205 125 190 L125 215 Q100 228 75 215 Z" fill={colors.hoodieDark} />
      {/* hoodie strings */}
      <Circle cx="92" cy="140" r="3" fill={colors.hoodieDark} />
      <Circle cx="108" cy="140" r="3" fill={colors.hoodieDark} />

      {/* neck */}
      <Rect x="88" y="88" width="24" height="24" rx="8" fill={colors.skinTone} />

      {/* head */}
      <Circle cx="100" cy="65" r="42" fill={colors.skinTone} />

      {/* ears */}
      <Circle cx="60" cy="66" r="6" fill={colors.skinTone} />
      <Circle cx="140" cy="66" r="6" fill={colors.skinTone} />

      {/* hair */}
      <Path
        d="M58 60 Q52 18 100 16 Q150 16 142 60 Q140 40 120 38 Q122 52 108 46 Q100 60 90 44 Q78 56 76 40 Q60 42 58 60 Z"
        fill={colors.hair}
      />

      {/* face */}
      <Circle cx="84" cy="68" r="4" fill={colors.hair} />
      <Circle cx="116" cy="68" r="4" fill={colors.hair} />
      <Path d="M90 84 Q100 92 110 84" stroke={colors.hair} strokeWidth={3} strokeLinecap="round" fill="none" />
      <Path d="M78 58 Q84 52 92 56" stroke={colors.hair} strokeWidth={2.5} strokeLinecap="round" fill="none" />
      <Path d="M108 56 Q116 52 122 58" stroke={colors.hair} strokeWidth={2.5} strokeLinecap="round" fill="none" />

      {/* left arm resting */}
      <Path d="M55 140 Q40 170 45 200" stroke={colors.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />

      {/* right arm holding phone, bent up */}
      <Path d="M148 140 Q168 155 158 182" stroke={colors.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />
      <Circle cx="157" cy="188" r="13" fill={colors.skinTone} />

      {/* phone */}
      <Rect x="146" y="168" width="24" height="42" rx="5" fill={colors.phoneBody} />
      <Rect x="149" y="173" width="18" height="30" rx="2" fill="#4C6BFF" />
    </Svg>
  );
}

export default function HeroIllustration() {
  const badgeOffset = SIZE * 0.06;

  return (
    <View style={[styles.wrapper, { width: SIZE, height: SIZE }]}>
      {/* soft background bubble */}
      <View
        style={[
          styles.bubble,
          {
            width: SIZE * 0.82,
            height: SIZE * 0.82,
            borderRadius: (SIZE * 0.82) / 2,
          },
        ]}
      />

      {/* decorative dots */}
      <View style={[styles.dot, { top: SIZE * 0.06, left: SIZE * 0.28 }]} />
      <View style={[styles.dot, { top: SIZE * 0.28, right: SIZE * 0.04 }]} />
      <View style={[styles.dot, { bottom: SIZE * 0.14, left: SIZE * 0.06 }]} />
      <View style={[styles.plusDot, { bottom: SIZE * 0.1, right: SIZE * 0.14 }]} />

      {/* character */}
      <View style={styles.characterWrap}>
        <Character />
      </View>

      {/* floating icon badges */}
      <IconBadge icon="briefcase" style={{ top: badgeOffset + 34, left: badgeOffset - 6 }} />
      <IconBadge icon="cap" style={{ top: badgeOffset, right: badgeOffset + 10 }} size={56} />
      <IconBadge icon="chart" style={{ bottom: badgeOffset + 40, left: badgeOffset - 10 }} />
      <IconBadge icon="clipboard" style={{ bottom: badgeOffset + 4, right: badgeOffset - 8 }} size={54} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: colors.bubbleBg,
  },
  characterWrap: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.dot,
  },
  plusDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.purple,
  },
});
