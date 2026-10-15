import { createAudioPlayer } from 'expo-audio';

const SOURCES = {
  tap: require('../assets/sounds/tap.mp3'),
  success: require('../assets/sounds/success.mp3'),
  error: require('../assets/sounds/error.mp3'),
};

// Players live at module level so they survive screen unmounts.
const players = {};

export function playSound(name) {
  try {
    if (!players[name]) players[name] = createAudioPlayer(SOURCES[name]);
    const player = players[name];
    player.seekTo(0); // rewind so it can replay after finishing
    player.play();
  } catch (e) {
    // Sound is decoration; never let it break login.
  }
}