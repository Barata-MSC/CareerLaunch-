import { WALKTHROUGH_VERSION } from './data/walkthroughSteps';

export function shouldShowWalkthrough(
  storedValue,
  { readFailed = false, alreadyShown = false, version = WALKTHROUGH_VERSION } = {},
) {
  if (readFailed || alreadyShown) return false;
  if (!storedValue) return true;
  if (storedValue.dismissed !== true) return true;
  return storedValue.version < version;
}

export function buildStoredValue(at = new Date().toISOString()) {
  return {
    dismissed: true,
    version: WALKTHROUGH_VERSION,
    at,
  };
}