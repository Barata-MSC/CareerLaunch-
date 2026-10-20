import React, { useCallback } from 'react';
import { Pressable } from 'react-native';

import { playSound } from '../utils/sounds';

export default function AppPressable({
  children,
  disabled,
  onPress,
  onPressIn,
  onPressOut,
  sound = 'tap',
  ...props
}) {
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
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={onPressOut}
    >
      {children}
    </Pressable>
  );
}
