import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

let reducedMotionSnapshot = false;
let hasReadInitialSetting = false;
let subscription = null;
const subscribers = new Set();

function updateSnapshot(value) {
  const nextValue = Boolean(value);
  if (reducedMotionSnapshot === nextValue) return;

  reducedMotionSnapshot = nextValue;
  subscribers.forEach((subscriber) => subscriber(nextValue));
}

function subscribeToSystemSetting() {
  if (!hasReadInitialSetting) {
    hasReadInitialSetting = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then(updateSnapshot)
      .catch(() => {});
  }

  if (!subscription && AccessibilityInfo.addEventListener) {
    subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', updateSnapshot);
  }
}

export default function useReduceMotion() {
  const [reducedMotion, setReducedMotion] = useState(reducedMotionSnapshot);

  useEffect(() => {
    subscribers.add(setReducedMotion);
    subscribeToSystemSetting();
    setReducedMotion(reducedMotionSnapshot);

    return () => {
      subscribers.delete(setReducedMotion);
    };
  }, []);

  return reducedMotion;
}
