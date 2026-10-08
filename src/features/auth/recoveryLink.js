import { Platform } from 'react-native';
import * as Linking from 'expo-linking';

// Where Supabase should send the user after they click the reset link in the
// email. This exact URL (or a pattern matching it) must be in the Supabase
// dashboard: Authentication -> URL Configuration -> Redirect URLs.
export const getRecoveryRedirectUrl = () => {
  if (Platform.OS === 'web') {
    return window.location.origin + window.location.pathname;
  }
  // Expo Go: exp://<your-ip>:8081/--/reset-password
  // Built app: <scheme>://reset-password (scheme is set in app.config.js)
  return Linking.createURL('reset-password');
};

const parseParams = (str) =>
  str.split('&').reduce((acc, pair) => {
    if (!pair) return acc;
    const [key, value = ''] = pair.split('=');
    try {
      acc[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
    } catch (e) {
      // ignore malformed pairs
    }
    return acc;
  }, {});

// Reads a URL the app was opened with. Returns:
//   { accessToken, refreshToken }  -> a valid password-recovery link
//   { error }                      -> Supabase reported the link as invalid/expired
//   null                           -> not a recovery link (ignore it)
export const parseRecoveryUrl = (url) => {
  if (!url || typeof url !== 'string') return null;

  const [beforeHash, hash = ''] = url.split('#');
  const query = beforeHash.includes('?') ? beforeHash.split('?')[1] : '';
  const params = { ...parseParams(query), ...parseParams(hash) };

  if (params.error_description || params.error_code) {
    return { error: params.error_description || 'This link is invalid or has expired.' };
  }

  if (params.type === 'recovery' && params.access_token && params.refresh_token) {
    return { accessToken: params.access_token, refreshToken: params.refresh_token };
  }

  return null;
};
