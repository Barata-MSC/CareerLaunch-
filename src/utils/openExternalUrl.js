import { Alert, Linking } from 'react-native';

export function isHttpUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false;

  const url = value.trim();
  if (!/^https?:\/\//i.test(url)) return false;

  try {
    const { protocol } = new URL(url);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

export async function openExternalUrl(value) {
  if (!isHttpUrl(value)) {
    Alert.alert('Invalid link', 'Only valid http or https links can be opened.');
    return false;
  }

  try {
    await Linking.openURL(value.trim());
    return true;
  } catch {
    Alert.alert('Could not open link', 'Please try again later.');
    return false;
  }
}
