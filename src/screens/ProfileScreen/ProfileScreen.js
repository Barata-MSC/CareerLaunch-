import React, { useState } from 'react';
import {
  SafeAreaView,
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
} from 'react-native';

// npx expo install expo-image-picker
import * as ImagePicker from 'expo-image-picker';

const AVATAR_PLACEHOLDER = require('@assets/icon-profile.png');

const PURPLE = '#5B21F5';
const PURPLE_DARK = '#3D14C4';

export default function ProfileScreen({ navigation, route }) {
  // Get user information if it was passed through navigation
  const initialUser = route?.params?.user || {};

  // Profile information
  const [avatarUri, setAvatarUri] = useState(
    initialUser.avatarUri || null
  );

  const [firstName, setFirstName] = useState(
    initialUser.firstName || ''
  );

  const [lastName, setLastName] = useState(
    initialUser.lastName || ''
  );

  const [middleName, setMiddleName] = useState(
    initialUser.middleName || ''
  );

  const [email, setEmail] = useState(
    initialUser.email || ''
  );

  const [contactNumber, setContactNumber] = useState(
    initialUser.contactNumber || ''
  );

  const [birthday, setBirthday] = useState(
    initialUser.birthday || ''
  );

  // --------------------------------------------------
  // CHANGE PROFILE PHOTO
  // --------------------------------------------------

  const handleChangePhoto = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission needed',
          'Allow photo access to change your profile picture.'
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Image picker error:', error);

      Alert.alert(
        'Error',
        'Something went wrong while selecting your profile picture.'
      );
    }
  };

  // --------------------------------------------------
  // BIRTHDAY VALIDATION
  // --------------------------------------------------

  const validateBirthday = (dateString) => {
    // Must follow MM/DD/YYYY
    const match = dateString.match(
      /^(\d{2})\/(\d{2})\/(\d{4})$/
    );

    // If format is incorrect
    if (!match) {
      return false;
    }

    const month = Number(match[1]);
    const day = Number(match[2]);
    const year = Number(match[3]);

    const currentYear = new Date().getFullYear();

    // Year must be between 1900 and current year
    if (year < 1900 || year > currentYear) {
      return false;
    }

    // Month must be 1-12
    if (month < 1 || month > 12) {
      return false;
    }

    // Get number of days in the selected month
    // Example:
    // new Date(2024, 2, 0).getDate() = 29
    // because February 2024 has 29 days
    const daysInMonth = new Date(
      year,
      month,
      0
    ).getDate();

    // Day must be valid for that month
    if (day < 1 || day > daysInMonth) {
      return false;
    }

    return true;
  };
  const validateEmail = (emailAddress) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(emailAddress);
  };

  // --------------------------------------------------
  // SAVE PROFILE
  // --------------------------------------------------

  const handleSave = () => {
    // -----------------------------
    // EMAIL VALIDATION
    // -----------------------------

    if (!validateEmail(email)) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.'
      );
      return;
    }

    // -----------------------------
    // CONTACT NUMBER VALIDATION
    // -----------------------------

    if (!/^9\d{9}$/.test(contactNumber)) {
      Alert.alert(
        'Invalid Contact Number',
        'Your contact number must be exactly 10 digits and start with 9.'
      );
      return;
    }

    // -----------------------------
    // BIRTHDAY VALIDATION
    // -----------------------------

    if (!validateBirthday(birthday)) {
      Alert.alert(
        'Invalid Birthday',
        'Please enter a valid birthday in MM/DD/YYYY format.'
      );
      return;
    }

    // -----------------------------
    // SAVE INFORMATION
    // -----------------------------

    console.log({
      avatarUri,
      firstName,
      lastName,
      middleName,
      email,
      contactNumber,
      birthday,
    });

    Alert.alert(
      'Profile updated',
      'Your changes have been saved.'
    );
  };

  // --------------------------------------------------
  // SCREEN
  // --------------------------------------------------

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
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
            >
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              Profile
            </Text>

            {/* Invisible space to keep title centered */}
            <View style={styles.backButton} />

          </View>

          {/* PROFILE PICTURE */}
          <View style={styles.avatarWrap}>

            <TouchableOpacity
              onPress={handleChangePhoto}
              activeOpacity={0.85}
            >
              <Image
                source={
                  avatarUri
                    ? { uri: avatarUri }
                    : AVATAR_PLACEHOLDER
                }
                style={styles.avatar}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleChangePhoto}
            >
              <Text style={styles.changePhotoText}>
                Change profile picture
              </Text>
            </TouchableOpacity>

          </View>

          {/* FIRST NAME */}
          <View style={styles.fieldGroup}>

            <Text style={styles.label}>
              First Name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              placeholderTextColor="#9A9A9A"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />

          </View>

          {/* LAST NAME */}
          <View style={styles.fieldGroup}>

            <Text style={styles.label}>
              Last Name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              placeholderTextColor="#9A9A9A"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />

          </View>

          {/* MIDDLE NAME */}
          <View style={styles.fieldGroup}>

            <Text style={styles.label}>
              Middle Name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your middle name"
              placeholderTextColor="#9A9A9A"
              value={middleName}
              onChangeText={setMiddleName}
              autoCapitalize="words"
            />

          </View>

          {/* EMAIL */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>
              Email Address
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9A9A9A"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {email.length > 0 && !validateEmail(email) && (
              <Text style={styles.errorText}>
                Please enter a valid email address.
              </Text>
            )}
          </View>

          {/* CONTACT NUMBER */}
          <View style={styles.fieldGroup}>

            <Text style={styles.label}>
              Contact Number
            </Text>

            <View style={styles.phoneContainer}>

              {/* FIXED +63 */}
              <Text style={styles.countryCode}>
                +63
              </Text>

              {/* PHONE NUMBER */}
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter your contact number"
                placeholderTextColor="#9A9A9A"
                value={contactNumber}
                onChangeText={(text) => {

                  // Remove anything that isn't a number
                  const numbersOnly =
                    text.replace(/[^0-9]/g, '');

                  // Only allow 10 digits
                  const limitedNumber =
                    numbersOnly.slice(0, 10);

                  setContactNumber(limitedNumber);
                }}
                keyboardType="number-pad"
                maxLength={10}
              />

            </View>

            {/* CONTACT NUMBER ERROR */}
            {contactNumber.length > 0 &&
              contactNumber[0] !== '9' && (
                <Text style={styles.errorText}>
                  Contact number must start with 9.
                </Text>
              )}

            {contactNumber.length > 0 &&
              contactNumber[0] === '9' &&
              contactNumber.length < 10 && (
                <Text style={styles.errorText}>
                  Contact number must be exactly 10 digits.
                </Text>
              )}

          </View>

          {/* BIRTHDAY */}
          <View style={styles.fieldGroup}>

            <Text style={styles.label}>
              Birthday
            </Text>

            <TextInput
              style={styles.input}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#9A9A9A"
              value={birthday}
              onChangeText={(text) => {

                // Remove anything that isn't a number
                let numbersOnly =
                  text.replace(/[^0-9]/g, '');

                // Maximum 8 digits
                // MMDDYYYY
                numbersOnly =
                  numbersOnly.slice(0, 8);

                let formattedDate =
                  numbersOnly;

                // Add / after MM
                if (numbersOnly.length > 2) {
                  formattedDate =
                    numbersOnly.slice(0, 2) +
                    '/' +
                    numbersOnly.slice(2);
                }

                // Add / after DD
                if (numbersOnly.length > 4) {
                  formattedDate =
                    numbersOnly.slice(0, 2) +
                    '/' +
                    numbersOnly.slice(2, 4) +
                    '/' +
                    numbersOnly.slice(4);
                }

                setBirthday(formattedDate);
              }}
              keyboardType="number-pad"
              maxLength={10}
            />

            {/* BIRTHDAY ERROR */}
            {birthday.length === 10 &&
              !validateBirthday(birthday) && (
                <Text style={styles.errorText}>
                  Please enter a valid date.
                </Text>
              )}

          </View>

          {/* SAVE BUTTON */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={handleSave}
          >

            <Text style={styles.primaryButtonText}>
              Save Changes
            </Text>

          </TouchableOpacity>

          {/* ACCOUNT SETTINGS */}
          <TouchableOpacity
            style={styles.settingsRow}
            onPress={() =>
              navigation?.navigate('Settings')
            }
          >

            <Text style={styles.settingsText}>
              Account settings
            </Text>

            <Text style={styles.settingsArrow}>
              ›
            </Text>

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

  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
  },

  // HEADER
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },

  backArrow: {
    fontSize: 26,
    color: '#111111',
    fontWeight: '400',
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
  },

  // PROFILE PICTURE
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EEF1FB',
  },

  changePhotoText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    color: PURPLE,
  },

  // INPUT GROUP
  fieldGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 8,
  },

  // NORMAL INPUT
  input: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111111',
  },

  // PHONE INPUT CONTAINER
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },

  // +63
  countryCode: {
    fontSize: 15,
    color: '#111111',
    marginRight: 8,
    fontWeight: '500',
  },

  // PHONE NUMBER INPUT
  phoneInput: {
    flex: 1,
    fontSize: 15,
    color: '#111111',
    paddingVertical: 0,
  },

  // ERROR MESSAGE
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 5,
  },

  // SAVE BUTTON
  primaryButton: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: PURPLE_DARK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  // SETTINGS
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 20,
  },

  settingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },

  settingsArrow: {
    fontSize: 18,
    color: '#8E8E93',
  },

});