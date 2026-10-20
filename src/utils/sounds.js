import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';

export const SOUND_ENABLED_KEY = 'careerlaunch:sound-enabled';

export const SOUNDS = {
  tap: require('../assets/sounds/tap.mp3'),
  lessonComplete: require('../assets/sounds/lesson-complete.mp3'),
  quizPass: require('../assets/sounds/quiz-pass.mp3'),
  success: require('../assets/sounds/success.mp3'),
  error: require('../assets/sounds/error.mp3'),
};

const players = {};
let soundEnabled = true;

export function getSoundEnabled() {
  return soundEnabled;
}

export async function initializeSound() {
  try {
    const storedValue = await AsyncStorage.getItem(SOUND_ENABLED_KEY);
    soundEnabled = storedValue === null ? true : storedValue === 'true';
  } catch (error) {
    soundEnabled = true;
  }

  try {
    // Keep system audio available even when the phone is on silent; the app-level
    // toggle remains the user-controlled on/off switch for these UI cues.
    await setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: 'mixWithOthers',
    });
  } catch (error) {
    // Sound is decorative and must never block the app.
  }

  return soundEnabled;
}

export async function setSoundEnabled(enabled) {
  soundEnabled = Boolean(enabled);

  try {
    await AsyncStorage.setItem(SOUND_ENABLED_KEY, String(soundEnabled));
  } catch (error) {
    // Ignore persistence failures so the app remains usable.
  }

  return soundEnabled;
}

export function playSound(name) {
  const soundName = name || 'tap';

  if (soundName === 'none' || !soundEnabled || !SOUNDS[soundName]) {
    return;
  }

  try {
    if (!players[soundName]) {
      players[soundName] = createAudioPlayer(SOUNDS[soundName]);
    }

    const player = players[soundName];
    player.seekTo(0);
    player.play();
  } catch (error) {
    // Sound is decoration; never let it break the UI.
  }
}