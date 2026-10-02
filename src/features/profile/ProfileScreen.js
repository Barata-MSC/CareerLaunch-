import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator, // Added for loading states
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as ImagePicker from 'expo-image-picker';

// 1. Import Supabase and the Profile Context
import { supabase } from '@config/supabase';
import { useProfile } from '../../context/ProfileContext';

const AVATAR_PLACEHOLDER = require('@assets/icon-profile.png');

const PURPLE = '#5B21F5';
const PURPLE_DARK = '#3D14C4';

export default function ProfileScreen({ navigation }) {
  // 2. Use the Profile Context to get the current profile and update function
  const { profile, updateProfile } = useProfile();

  const [avatarUri, setAvatarUri] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [loading, setLoading] = useState(false);

  // 3. Populate the local state when the profile data loads from the context
  useEffect(() => {
    if (profile) {
      setAvatarUri(profile.avatar_url || null);
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
      setMiddleName(profile.middle_name || '');
      setEmail(profile.email || '');
      setContactNumber(profile.contact_number || '');
      setBirthday(profile.birthday || '');
    }
  }, [profile]);

  // --------------------------------------------------
  // CHANGE PROFILE PHOTO
  // --------------------------------------------------
  const handleChangePhoto = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert('Permission needed', 'Allow photo access to change your profile picture.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Image picker error:', error);
      Alert.alert('Error', 'Something went wrong while selecting your profile picture.');
    }
  };

  // --------------------------------------------------
  // VALIDATION FUNCTIONS
  // --------------------------------------------------
  const validateBirthday = (dateString) => {
    const match = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return false;

    const month = Number(match[1]);
    const day = Number(match[2]);
    const year = Number(match[3]);
    const currentYear = new Date().getFullYear();

    if (year < 1900 || year > currentYear) return false;
    if (month < 1 || month > 12) return false;

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) return false;

    return true;
  };

  const validateEmail = (emailAddress) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailAddress);
  };

  // --------------------------------------------------
  // UPLOAD AVATAR TO SUPABASE STORAGE
  // --------------------------------------------------
  const uploadAvatar = async (userId) => {
    // If the avatar is already a URL (from a previous upload), return it as is
    if (!avatarUri || avatarUri.startsWith('http')) return avatarUri;

    try {
      const response = await fetch(avatarUri);
      const blob = await response.blob();
      const fileExt = avatarUri.split('.').pop() || 'jpg';
      const filePath = `${userId}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, { upsert: true, contentType: blob.type || 'image/jpeg' });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (e) {
      console.log('Avatar upload failed:', e.message);
      return avatarUri; // Fallback to local URI if upload fails
    }
  };

  // --------------------------------------------------
  // SAVE PROFILE
  // --------------------------------------------------
  const handleSave = async () => {
    // 1. Email Validation
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // 2. Contact Number Validation
    if (!/^9\d{9}$/.test(contactNumber)) {
      Alert.alert('Invalid Contact Number', 'Your contact number must be exactly 10 digits and start with 9.');
      return;
    }

    // 3. Birthday Validation
    if (!validateBirthday(birthday)) {
      Alert.alert('Invalid Birthday', 'Please enter a valid birthday in MM/DD/YYYY format.');
      return;
    }

    setLoading(true);

    // 4. Get the current user ID
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      Alert.alert('Error', 'User not found. Please log in again.');
      return;
    }

    // 5. Upload avatar if a new one was picked
    const newAvatarUrl = await uploadAvatar(user.id);

    // 6. Prepare updates
    const updates = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      middle_name: middleName.trim(),
      email: email.trim(),
      contact_number: contactNumber.trim(),
      birthday: birthday.trim(),
      avatar_url: newAvatarUrl,
    };

    // 7. Update the database via ProfileContext
    const { error } = await updateProfile(updates);

    setLoading(false);

    if (error) {
      Alert.alert('Update Failed', error.message);
    } else {
      Alert.alert('Profile updated', 'Your changes have been saved successfully.');
    }
  };

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------
  const handleLogout = async () => {
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      Alert.alert('Logout Error', error.message);
    }
    
  };

  // --------------------------------------------------
  // SCREEN
  // --------------------------------------------------
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation?.goBack()}
              disabled={loading}
            >
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Profile</Text>
            <View style={styles.backButton} />
          </View>

          {/* PROFILE PICTURE */}
          <View style={styles.avatarWrap}>
            <TouchableOpacity onPress={handleChangePhoto} activeOpacity={0.85} disabled={loading}>
              <Image
                source={avatarUri ? { uri: avatarUri } : AVATAR_PLACEHOLDER}
                style={styles.avatar}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleChangePhoto} disabled={loading}>
              <Text style={styles.changePhotoText}>Change profile picture</Text>
            </TouchableOpacity>
          </View>

          {/* FIRST NAME */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              placeholderTextColor="#9A9A9A"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
              editable={!loading}
            />
          </View>

          {/* LAST NAME */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              placeholderTextColor="#9A9A9A"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
              editable={!loading}
            />
          </View>

          {/* MIDDLE NAME */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Middle Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your middle name"
              placeholderTextColor="#9A9A9A"
              value={middleName}
              onChangeText={setMiddleName}
              autoCapitalize="words"
              editable={!loading}
            />
          </View>

          {/* EMAIL */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9A9A9A"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
            {email.length > 0 && !validateEmail(email) && (
              <Text style={styles.errorText}>Please enter a valid email address.</Text>
            )}
          </View>

          {/* CONTACT NUMBER */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Contact Number</Text>
            <View style={styles.phoneContainer}>
              <Text style={styles.countryCode}>+63</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter your contact number"
                placeholderTextColor="#9A9A9A"
                value={contactNumber}
                onChangeText={(text) => {
                  let numbersOnly = text.replace(/[^0-9]/g, '');
                  if (numbersOnly.startsWith('0')) {
                    numbersOnly = numbersOnly.substring(1);
                  }
                  const limitedNumber = numbersOnly.slice(0, 10);
                  setContactNumber(limitedNumber);
                }}
                keyboardType="number-pad"
                maxLength={10}
                editable={!loading}
              />
            </View>
            {contactNumber.length > 0 && contactNumber[0] !== '9' && (
              <Text style={styles.errorText}>Contact number must start with 9.</Text>
            )}
            {contactNumber.length > 0 && contactNumber[0] === '9' && contactNumber.length < 10 && (
              <Text style={styles.errorText}>Contact number must be exactly 10 digits.</Text>
            )}
          </View>

          {/* BIRTHDAY */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Birthday</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#9A9A9A"
              value={birthday}
              onChangeText={(text) => {
                let numbersOnly = text.replace(/[^0-9]/g, '');
                numbersOnly = numbersOnly.slice(0, 8);
                let formattedDate = numbersOnly;

                if (numbersOnly.length > 2) {
                  formattedDate = numbersOnly.slice(0, 2) + '/' + numbersOnly.slice(2);
                }
                if (numbersOnly.length > 4) {
                  formattedDate =
                    numbersOnly.slice(0, 2) + '/' + numbersOnly.slice(2, 4) + '/' + numbersOnly.slice(4);
                }
                setBirthday(formattedDate);
              }}
              keyboardType="number-pad"
              maxLength={10}
              editable={!loading}
            />
            {birthday.length === 10 && !validateBirthday(birthday) && (
              <Text style={styles.errorText}>Please enter a valid date.</Text>
            )}
          </View>

          {/* SAVE BUTTON */}
          <TouchableOpacity
            style={[styles.primaryButton, loading && { opacity: 0.7 }]}
            activeOpacity={0.85}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>

          {/* LOGOUT BUTTON */}
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.85}
            onPress={handleLogout}
            disabled={loading}
          >
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ==================================================
// STYLES
// ==================================================
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 40 },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: { width: 32, height: 32, justifyContent: 'center' },
  backArrow: { fontSize: 26, color: '#111111', fontWeight: '400' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111111' },

  avatarWrap: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#EEF1FB' },
  changePhotoText: { marginTop: 10, fontSize: 13, fontWeight: '600', color: PURPLE },

  fieldGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', color: '#111111', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111111',
  },

  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  countryCode: { fontSize: 15, color: '#111111', marginRight: 8, fontWeight: '500' },
  phoneInput: { flex: 1, fontSize: 15, color: '#111111', paddingVertical: 0 },

  errorText: { color: '#D32F2F', fontSize: 12, marginTop: 5 },

  primaryButton: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: PURPLE_DARK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },

  // Added Logout Button Styles
  logoutButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5484D',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  logoutButtonText: {
    color: '#E5484D',
    fontSize: 17,
    fontWeight: '700',
  },
});