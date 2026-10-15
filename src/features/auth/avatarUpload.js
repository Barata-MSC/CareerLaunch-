import AsyncStorage from '@react-native-async-storage/async-storage';

const PENDING_AVATAR_KEY_PREFIX = 'careerlaunch-pending-avatar:';
const uploadsInProgress = new Map();

const getPendingAvatarKey = (userId) => `${PENDING_AVATAR_KEY_PREFIX}${userId}`;

export const savePendingAvatar = async (userId, avatar) => {
  await AsyncStorage.setItem(getPendingAvatarKey(userId), JSON.stringify(avatar));
};

const decodeBase64 = (base64) => {
  const normalized = base64.replace(/^data:[^,]*,/, '').replace(/\s/g, '');
  if (!normalized || normalized.length % 4 === 1) {
    throw new Error('The saved profile photo data is invalid.');
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const bytes = new Uint8Array(Math.floor((normalized.length * 3) / 4));
  let buffer = 0;
  let bits = 0;
  let byteIndex = 0;

  for (const character of normalized.replace(/=+$/, '')) {
    const value = alphabet.indexOf(character);
    if (value === -1) {
      throw new Error('The saved profile photo data is invalid.');
    }
    buffer = (buffer << 6) | value;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes[byteIndex] = (buffer >> bits) & 0xff;
      byteIndex += 1;
    }
  }

  return bytes.subarray(0, byteIndex);
};

export const uploadAvatar = async (client, userId, avatar) => {
  const contentType = avatar.contentType || 'image/jpeg';
  let fileData;
  if (avatar.base64) {
    fileData = decodeBase64(avatar.base64);
  } else if (avatar.uri) {
    const response = await fetch(avatar.uri);
    if (!response.ok) {
      throw new Error(`Could not read the selected profile photo (HTTP ${response.status}).`);
    }
    fileData = new Uint8Array(await response.arrayBuffer());
  } else {
    throw new Error('The saved profile photo is missing its image data.');
  }

  if (fileData.byteLength === 0) {
    throw new Error('The selected profile photo is empty.');
  }

  const extensionByContentType = {
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/heic': 'heic',
    'image/heif': 'heif',
  };
  const mimeType = contentType.toLowerCase().split(';')[0].trim();
  const fileExtension = extensionByContentType[mimeType] || 'jpg';
  const filePath = `${userId}/avatar.${fileExtension}`;

  const { error: uploadError } = await client.storage
    .from('avatars')
    .upload(filePath, fileData, { upsert: true, contentType });
  if (uploadError) throw uploadError;

  const { data: publicUrlData } = client.storage.from('avatars').getPublicUrl(filePath);
  const { data: updatedProfile, error: profileError } = await client
    .from('profiles')
    .update({ avatar_url: publicUrlData.publicUrl })
    .eq('id', userId)
    .select('id')
    .maybeSingle();
  if (profileError) throw profileError;
  if (!updatedProfile) {
    throw new Error('The profile photo uploaded, but the profile record was not updated.');
  }
};

export const uploadPendingAvatar = (client, userId) => {
  const existingUpload = uploadsInProgress.get(userId);
  if (existingUpload) return existingUpload;

  const uploadPromise = (async () => {
    const key = getPendingAvatarKey(userId);
    const storedAvatar = await AsyncStorage.getItem(key);
    if (!storedAvatar) return false;

    let avatar;
    try {
      avatar = JSON.parse(storedAvatar);
    } catch {
      throw new Error('The saved profile photo information is invalid.');
    }

    if (!avatar?.base64 && !avatar?.uri) {
      throw new Error('The saved profile photo is missing its image data.');
    }

    try {
      await uploadAvatar(client, userId, avatar);
    } catch (error) {
      if (!avatar.base64 && /HTTP 404/.test(error.message)) {
        await AsyncStorage.removeItem(key);
      }
      throw error;
    }
    await AsyncStorage.removeItem(key);
    return true;
  })();

  uploadsInProgress.set(userId, uploadPromise);
  return uploadPromise.finally(() => {
    uploadsInProgress.delete(userId);
  });
};
