import React, { useCallback } from 'react';
import { Pressable } from 'react-native';

import { playSound } from '../utils/sounds';

export default function AppPressable({
  children,
  disabled,
  onPress,
  onPressIn,
  onPressOut,
  activeOpacity,
  style,
  sound = 'tap',
  ...props
}) {
  const pressableStyle =
    activeOpacity === undefined
      ? style
      : (state) => [
          typeof style === 'function' ? style(state) : style,
          state.pressed && { opacity: activeOpacity },
        ];

  const handlePressIn = useCallback(
    (event) => {
      if (!disabled && sound !== 'none') {
        playSound(sound);
      }
      onPressIn?.(event);
    },
    [disabled, onPressIn, sound],
  );

  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={pressableStyle}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={onPressOut}
    >
      {children}
    </Pressable>
  );
}
