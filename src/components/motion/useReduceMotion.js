import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export default function useReduceMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    let mounted = true;

    AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (mounted) {
        setReducedMotion(Boolean(value));
      }
    });

    const subscription = AccessibilityInfo.addEventListener
      ? AccessibilityInfo.addEventListener('reduceMotionChanged', (value) => {
          if (mounted) {
            setReducedMotion(Boolean(value));
          }
        })
      : null;

    return () => {
      mounted = false;
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      }
    };
  }, []);

  return reducedMotion;
}
