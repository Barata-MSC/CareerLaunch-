import AsyncStorage from '@react-native-async-storage/async-storage';
import { WALKTHROUGH_VERSION } from './data/walkthroughSteps';

const STORAGE_PREFIX = 'walkthrough:v1:';

function storageKey(userId) {
  return `${STORAGE_PREFIX}${userId || 'local'}`;
}

function isValidPreference(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    typeof value.dismissed === 'boolean' &&
    Number.isInteger(value.version) &&
    value.version > 0 &&
    typeof value.at === 'string' &&
    !Number.isNaN(Date.parse(value.at))
  );
}

export async function readWalkthroughPreference(userId) {
  const serialized = await AsyncStorage.getItem(storageKey(userId));
  if (serialized === null) return null;

  let value;
  try {
    value = JSON.parse(serialized);
  } catch {
    throw new Error('Stored walkthrough preference is invalid.');
  }
  if (!isValidPreference(value)) {
    throw new Error('Stored walkthrough preference is invalid.');
  }
  return value;
}

export async function saveWalkthroughPreference(userId, value) {
  if (
    value?.dismissed !== true ||
    value.version !== WALKTHROUGH_VERSION ||
    typeof value.at !== 'string'
  ) {
    throw new Error('Walkthrough preference is invalid.');
  }
  await AsyncStorage.setItem(storageKey(userId), JSON.stringify(value));
}