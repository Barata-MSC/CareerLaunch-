import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_PREFIX = 'careerlaunch:daily-tip:v1:';
const memoryStates = new Map();

const randomIndex = (max, random) => {
  const value = Number(random());
  const normalized = Number.isFinite(value) ? Math.min(Math.max(value, 0), 0.999999999) : 0;
  return Math.floor(normalized * max);
};

export function createTipBag(tipCount, random = Math.random, lastTipIndex = null) {
  const order = Array.from({ length: tipCount }, (_, index) => index);

  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1, random);
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }

  if (order.length > 1 && order[0] === lastTipIndex) {
    const swapIndex = 1 + randomIndex(order.length - 1, random);
    [order[0], order[swapIndex]] = [order[swapIndex], order[0]];
  }

  return order;
}

export function isValidTipState(state, tipCount) {
  if (
    !state ||
    !Array.isArray(state.order) ||
    state.order.length !== tipCount ||
    !Number.isInteger(state.position) ||
    state.position < 0 ||
    state.position > tipCount ||
    !(
      state.lastIndex === null ||
      (Number.isInteger(state.lastIndex) &&
        state.lastIndex >= 0 &&
        state.lastIndex < tipCount)
    )
  ) {
    return false;
  }

  const uniqueIndexes = new Set(state.order);
  if (
    uniqueIndexes.size !== tipCount ||
    state.order.some((index) => !Number.isInteger(index) || index < 0 || index >= tipCount)
  ) {
    return false;
  }

  return state.position === 0
    ? state.lastIndex === null
    : state.lastIndex === state.order[state.position - 1];
}

export function takeNextTipIndex(state, tipCount, random = Math.random) {
  if (!Number.isInteger(tipCount) || tipCount < 1) {
    throw new Error('A daily tip bag requires at least one tip.');
  }

  const previousTipIndex =
    Number.isInteger(state?.lastIndex) && state.lastIndex >= 0 && state.lastIndex < tipCount
      ? state.lastIndex
      : null;
  let currentState = isValidTipState(state, tipCount)
    ? state
    : {
        order: createTipBag(tipCount, random, previousTipIndex),
        position: 0,
        lastIndex: previousTipIndex,
      };

  if (currentState.position === tipCount) {
    currentState = {
      order: createTipBag(tipCount, random, currentState.lastIndex),
      position: 0,
      lastIndex: currentState.lastIndex,
    };
  }

  const tipIndex = currentState.order[currentState.position];
  return {
    tipIndex,
    state: {
      order: currentState.order,
      position: currentState.position + 1,
      lastIndex: tipIndex,
    },
  };
}

export function getDailyTipStorageKey(userId) {
  return `${STORAGE_KEY_PREFIX}${userId}`;
}

export function getSessionTipCacheKey(session) {
  const userId = session?.user?.id;
  if (!userId) return null;

  let sessionId = null;
  try {
    const payload = session.access_token?.split('.')[1];
    const decodeBase64 = globalThis.atob;
    if (payload && typeof decodeBase64 === 'function') {
      const unpadded = payload.replace(/-/g, '+').replace(/_/g, '/');
      const base64 = unpadded.padEnd(unpadded.length + ((4 - (unpadded.length % 4)) % 4), '=');
      const decoded = JSON.parse(decodeBase64(base64));
      if (typeof decoded.session_id === 'string') sessionId = decoded.session_id;
    }
  } catch {
    sessionId = null;
  }

  return `${userId}:${sessionId || 'active'}`;
}

export async function getNextDailyTipIndex(userId, tipCount, random = Math.random) {
  const key = getDailyTipStorageKey(userId);
  let state = memoryStates.get(key);
  let canPersist = true;

  if (!state) {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      if (storedValue) {
        try {
          state = JSON.parse(storedValue);
        } catch {
          state = null;
        }
      }
    } catch (error) {
      console.warn('Could not read the daily tip rotation from local storage.', error);
      canPersist = false;
    }
  }

  const next = takeNextTipIndex(state, tipCount, random);
  memoryStates.set(key, next.state);

  if (canPersist) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(next.state));
    } catch (error) {
      console.warn('Could not save the daily tip rotation to local storage.', error);
    }
  }

  return next.tipIndex;
}
