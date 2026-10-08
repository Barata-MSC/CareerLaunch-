import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// npx expo install expo-image-picker
// (or "react-native-image-picker" if this is a bare RN project, not Expo)
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { createIsolatedClient } from './isolatedClient';
import { meetsAllRules } from './passwordRules';
import PasswordRequirements from './PasswordRequirements';

const formatBirthday = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}/${date.getFullYear()}`;
};

const parseBirthday = (birthday) => {
  const match = birthday.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return match ? new Date(Number(match[3]), Number(match[1]) - 1, Number(match[2])) : new Date();
};

const toDateInputValue = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};

const birthdayToDateInputValue = (birthday) => {
  const match = birthday.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return match ? `${match[3]}-${match[1]}-${match[2]}` : '';
};

const showAlert = (title, message, onOk) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}: ${message}`);
    if (onOk) onOk();
  } else {
    Alert.alert(title, message, [{ text: 'OK', onPress: onOk }]);
  }
};


// Same theme tokens as WelcomeScreen / LoginScreen.
const COLORS = {
  background: '#FFFFFF',
  primary: '#5B2EFF',
  text: '#1A1A1A',
  subtext: '#8A8A8E',
  border: '#E3E3E8',
  placeholder: '#A9A9B2',
  divider: '#E3E3E8',
  avatarBg: '#F1EEFF',
};

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
  const [pendingBirthday, setPendingBirthday] = useState(new Date());

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const openBirthdayPicker = () => {
    setPendingBirthday(parseBirthday(birthday));
    setShowBirthdayPicker(true);
  };

  const handleBirthdayValueChange = (_event, selectedDate) => {
    if (selectedDate) {
      setPendingBirthday(selectedDate);
      if (Platform.OS === 'android') {
        setBirthday(formatBirthday(selectedDate));
        setBirthdayError('');
      }
    }

    if (Platform.OS === 'android') setShowBirthdayPicker(false);
  };

  const dismissBirthdayPicker = () => setShowBirthdayPicker(false);

  const pickProfileImage = async () => {

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      showAlert('Permission needed', 'Allow photo access to set a profile picture.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Uploads the picked photo to the "avatars" storage bucket and saves the
  // public URL onto the user's profiles row. Only works once we have a
  // session (i.e. email confirmation is off, or they're already verified).
  // `client` is the temporary sign-up client that holds the new session.
  const uploadAvatar = async (client, userId) => {
    try {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      const fileExt = profileImage.split('.').pop() || 'jpg';
      const filePath = `${userId}/avatar.${fileExt}`;

      const { error: uploadError } = await client.storage
        .from('avatars')
        .upload(filePath, blob, { upsert: true, contentType: blob.type || 'image/jpeg' });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = client.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await client
        .from('profiles')
        .update({ avatar_url: publicUrlData.publicUrl })
        .eq('id', userId);
    } catch (e) {
      // Non-fatal: account was still created successfully.
      console.log('Avatar upload failed:', e.message);
    }
  };

  const handleRegister = async () => {
    const missingFirstName = !firstName.trim();
    const missingLastName = !lastName.trim();
    const missingEmail = !email.trim();
    const missingContactNumber = !contactNumber.trim();
    const invalidContactNumber = !/^9\d{9}$/.test(contactNumber);
    const missingBirthday = !birthday.trim();
    const missingPassword = !password;
    const weakPassword = !missingPassword && !meetsAllRules(password);
    const missingConfirm = !confirmPassword;
    const passwordMismatch = !missingConfirm && password !== confirmPassword;

    setFirstNameError(missingFirstName ? 'Please enter your first name' : '');
    setLastNameError(missingLastName ? 'Please enter your last name' : '');
    setEmailError(missingEmail ? 'Please enter your email' : '');
    setContactNumberError(
      missingContactNumber
        ? 'Please enter your contact number'
        : invalidContactNumber
          ? 'Contact number must be exactly 10 digits and start with 9.'
          : '',
    );
    setBirthdayError(missingBirthday ? 'Please enter your birthday' : '');
    setPasswordError(
      missingPassword
        ? 'Please create a password'
        : weakPassword
          ? 'Your password does not meet all the requirements below'
          : '',
    );
    setConfirmPasswordError(
      missingConfirm
        ? 'Please confirm your password'
        : passwordMismatch
          ? 'Passwords do not match'
          : '',
    );

    if (
      missingFirstName ||
      missingLastName ||
      missingEmail ||
      missingContactNumber ||
      invalidContactNumber ||
      missingBirthday ||
      missingPassword ||
      weakPassword ||
      missingConfirm ||
      passwordMismatch
    ) return;

    setLoading(true);

    // Sign up through a throwaway client that keeps its session in memory only.
    // The main `supabase` client (and App.js's auth listener) never sees a
    // session, so the app does NOT jump to the dashboard after registering.
    const signupClient = createIsolatedClient('careerlaunch-signup-temp');

    const { data: { session, user }, error } = await signupClient.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          middle_name: middleName.trim(),
          contact_number: contactNumber.trim(),
          birthday: birthday.trim(),
        },
      },
    });

    if (error) {
      setLoading(false);
      console.log("Signup Error:", error.message); // Add this for debugging
      showAlert('Registration Error', error.message); // Use showAlert
      return;
    }

    if (session && profileImage && user) {
      await uploadAvatar(signupClient, user.id);
    }

    setLoading(false);

    showAlert(
      'Account created!',
      session
        ? 'Your account is ready. Please log in to continue.'
        : 'Please check your email inbox to confirm your account, then log in.',
      () => navigation?.navigate('Login'),
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
            disabled={loading}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Tell us a bit about yourself</Text>

          <TouchableOpacity style={styles.avatarWrap} onPress={pickProfileImage} disabled={loading}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlus}>+</Text>
              </View>
            )}
            <Text style={styles.avatarLabel}>
              {profileImage ? 'Change photo' : 'Add profile photo'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>First name</Text>
          <TextInput
            style={[styles.input, firstNameError ? styles.inputError : null]}
            placeholder="Enter your first name"
            placeholderTextColor={COLORS.placeholder}
            value={firstName}
            editable={!loading}
            onChangeText={(text) => {
              setFirstName(text);
              if (firstNameError) setFirstNameError('');
            }}
            autoCapitalize="words"
          />
          {firstNameError ? (
            <Text style={styles.errorText}>{firstNameError}</Text>
          ) : null}

          <Text style={styles.label}>Last name</Text>
          <TextInput
            style={[styles.input, lastNameError ? styles.inputError : null]}
            placeholder="Enter your last name"
            placeholderTextColor={COLORS.placeholder}
            value={lastName}
            editable={!loading}
            onChangeText={(text) => {
              setLastName(text);
              if (lastNameError) setLastNameError('');
            }}
            autoCapitalize="words"
          />
          {lastNameError ? (
            <Text style={styles.errorText}>{lastNameError}</Text>
          ) : null}

          <Text style={styles.label}>Middle name (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your middle name (optional)"
            placeholderTextColor={COLORS.placeholder}
            value={middleName}
            editable={!loading}
            onChangeText={setMiddleName}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.placeholder}
            value={email}
            editable={!loading}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <Text style={styles.label}>Contact number</Text>
          <View style={[styles.phoneContainer, contactNumberError ? styles.inputError : null]}>
            <Text style={styles.countryCode}>+63</Text>
            <TextInput
              style={[
                styles.phoneInput,
                Platform.OS === 'web' ? styles.phoneInputWeb : null,
              ]}
              placeholder="Enter your contact number"
              placeholderTextColor={COLORS.placeholder}
              value={contactNumber}
              editable={!loading}
              onChangeText={(text) => {
                let numbersOnly = text.replace(/[^0-9]/g, '');
                if (numbersOnly.startsWith('0')) {
                  numbersOnly = numbersOnly.substring(1);
                }
                setContactNumber(numbersOnly.slice(0, 10));
                if (contactNumberError) setContactNumberError('');
              }}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          {contactNumberError ? (
            <Text style={styles.errorText}>{contactNumberError}</Text>
          ) : null}

          <Text style={styles.label}>Birthday</Text>
          <View style={[styles.birthdayField, birthdayError ? styles.inputError : null]}>
            {Platform.OS === 'web' ? React.createElement('input', {
              type: 'date',
              value: birthdayToDateInputValue(birthday),
              max: toDateInputValue(new Date()),
              disabled: loading,
              'aria-label': 'Birthday',
              onChange: (event) => {
                const [year, month, day] = event.target.value.split('-');
                if (year && month && day) {
                  setBirthday(`${month}/${day}/${year}`);
                  setBirthdayError('');
                }
              },
              style: {
                width: '100%',
                height: '100%',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                color: COLORS.text,
                fontSize: 14,
                padding: '0 14px',
                boxSizing: 'border-box',
              },
            }) : (
              <TouchableOpacity
                style={styles.birthdayPickerButton}
                onPress={openBirthdayPicker}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel={birthday ? `Birthday: ${birthday}` : 'Select your birthday'}
              >
                <Text style={[styles.birthdayText, !birthday && styles.birthdayPlaceholder]}>
                  {birthday || 'Select your birthday'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {birthdayError ? (
            <Text style={styles.errorText}>{birthdayError}</Text>
          ) : null}
          {Platform.OS === 'ios' && showBirthdayPicker ? (
            <Modal
              transparent
              animationType="fade"
              visible={showBirthdayPicker}
              onRequestClose={() => setShowBirthdayPicker(false)}
            >
              <View style={styles.datePickerBackdrop}>
                <View style={styles.datePickerModal}>
                  <View style={styles.datePickerActions}>
                    <TouchableOpacity onPress={() => setShowBirthdayPicker(false)}>
                      <Text style={styles.datePickerAction}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setBirthday(formatBirthday(pendingBirthday));
                        setBirthdayError('');
                        setShowBirthdayPicker(false);
                      }}
                    >
                      <Text style={styles.datePickerAction}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={pendingBirthday}
                    mode="date"
                    display="spinner"
                    textColor={COLORS.text}
                    themeVariant="light"
                    maximumDate={new Date()}
                    onValueChange={handleBirthdayValueChange}
                    onDismiss={dismissBirthdayPicker}
                  />
                </View>
              </View>
            </Modal>
          ) : null}
          {Platform.OS === 'android' && showBirthdayPicker ? (
            <DateTimePicker
              value={pendingBirthday}
              mode="date"
              maximumDate={new Date()}
              onValueChange={handleBirthdayValueChange}
              onDismiss={dismissBirthdayPicker}
            />
          ) : null}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Create a password"
            placeholderTextColor={COLORS.placeholder}
            value={password}
            editable={!loading}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <PasswordRequirements password={password} />

          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            style={[styles.input, confirmPasswordError ? styles.inputError : null]}
            placeholder="Re-enter your password"
            placeholderTextColor={COLORS.placeholder}
            value={confirmPassword}
            editable={!loading}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (confirmPasswordError) setConfirmPasswordError('');
            }}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : confirmPassword.length > 0 && confirmPassword === password ? (
            <Text style={styles.matchText}>✓ Passwords match</Text>
          ) : null}

          <TouchableOpacity
            style={[styles.registerButton, loading && { opacity: 0.7 }]}
            onPress={handleRegister}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.registerButtonText}>Sign up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Login')} disabled={loading}>
              <Text style={styles.footerLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },
  backButton: { width: 32, height: 32, justifyContent: 'center', marginBottom: 10 },
  backArrow: { fontSize: 26, color: COLORS.text, fontWeight: '400' },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  subtitle: { fontSize: 13, color: COLORS.subtext, marginBottom: 20 },
  avatarWrap: { alignItems: 'center', marginBottom: 8 },
  avatarPlaceholder: { width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.avatarBg, borderWidth: 1, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  avatarImage: { width: 72, height: 72, borderRadius: 36 },
  avatarPlus: { fontSize: 26, fontWeight: '600', color: COLORS.primary },
  avatarLabel: { marginTop: 6, fontSize: 12, fontWeight: '600', color: COLORS.primary },
  label: { fontSize: 12, fontWeight: '600', color: COLORS.text, marginBottom: 6, marginTop: 10 },
  input: { height: 44, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 14, fontSize: 14, color: COLORS.text },
  birthdayField: { height: 44, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, overflow: 'hidden' },
  birthdayPickerButton: { flex: 1, justifyContent: 'center', paddingHorizontal: 14 },
  birthdayText: { fontSize: 14, color: COLORS.text },
  birthdayPlaceholder: { color: COLORS.placeholder },
  datePickerBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.35)', paddingHorizontal: 12, paddingBottom: 12 },
  datePickerModal: { alignSelf: 'center', width: '100%', maxWidth: 360, backgroundColor: COLORS.background, borderRadius: 12, overflow: 'hidden' },
  datePickerActions: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  datePickerAction: { color: COLORS.primary, fontSize: 15, fontWeight: '600' },
  phoneContainer: { flexDirection: 'row', alignItems: 'center', height: 44, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 14 },
  countryCode: { fontSize: 14, color: COLORS.text, marginRight: 8, fontWeight: '500' },
  phoneInput: { flex: 1, height: '100%', fontSize: 14, color: COLORS.text, paddingVertical: 0 },
  phoneInputWeb: { borderWidth: 0, outlineStyle: 'none' },
  inputError: { borderColor: '#E5484D' },
  errorText: { color: '#E5484D', fontSize: 12, marginTop: 6 },
  matchText: { color: '#2E9E5B', fontSize: 12, marginTop: 6 },
  registerButton: { height: 50, backgroundColor: COLORS.primary, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 22, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 4 },
  registerButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 22 },
  footerText: { fontSize: 13, color: COLORS.subtext },
  footerLink: { fontSize: 13, fontWeight: '700', color: COLORS.primary },
});