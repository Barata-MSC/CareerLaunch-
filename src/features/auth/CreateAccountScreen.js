// Lets a guest turn their anonymous account into a full account WITHOUT losing
// anything: it attaches an email + password to the guest's existing session
// (supabase.auth.updateUser), so the user id, and every progress row tied to it,
// stays the same. This is why it uses the main `supabase` client, not the
// isolated sign-up client that RegisterScreen uses.
//
// Place this file next to RegisterScreen.js (it imports ./passwordRules and
// ./PasswordRequirements from the same folder). If your folder depth differs,
// adjust the ProfileContext import path below.
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { supabase } from '@config/supabase';
import { useProfile } from '../../context/ProfileContext';
import { meetsAllRules } from './passwordRules';
import PasswordRequirements from './PasswordRequirements';

const PURPLE = '#5B21F5';
const PURPLE_DARK = '#3D14C4';

const showAlert = (title, message, onOk) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}: ${message}`);
    if (onOk) onOk();
  } else {
    Alert.alert(title, message, [{ text: 'OK', onPress: onOk }]);
  }
};

const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validateBirthday = (dateString) => {
  const match = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return false;

  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);

  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;

  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
};

export default function CreateAccountScreen({ navigation }) {
  const { updateProfile } = useProfile();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleCreate = async () => {
    if (loading) return;

    const trimmedEmail = email.trim();
    const missingFirstName = !firstName.trim();
    const missingLastName = !lastName.trim();
    const missingEmail = !trimmedEmail;
    const invalidEmail = !missingEmail && !validateEmail(trimmedEmail);
    const missingContact = !contactNumber.trim();
    const invalidContact = !missingContact && !/^9\d{9}$/.test(contactNumber);
    const missingBirthday = !birthday.trim();
    const invalidBirthday = !missingBirthday && !validateBirthday(birthday);
    const missingPassword = !password;
    const weakPassword = !missingPassword && !meetsAllRules(password);
    const missingConfirm = !confirmPassword;
    const mismatch = !missingConfirm && password !== confirmPassword;

    setFirstNameError(missingFirstName ? 'Please enter your first name' : '');
    setLastNameError(missingLastName ? 'Please enter your last name' : '');
    setEmailError(
      missingEmail ? 'Please enter your email' : invalidEmail ? 'Please enter a valid email address' : '',
    );
    setContactNumberError(
      missingContact
        ? 'Please enter your contact number'
        : invalidContact
          ? 'Contact number must be exactly 10 digits and start with 9.'
          : '',
    );
    setBirthdayError(
      missingBirthday
        ? 'Please enter your birthday'
        : invalidBirthday
          ? 'Please enter a valid date (MM/DD/YYYY)'
          : '',
    );
    setPasswordError(
      missingPassword
        ? 'Please create a password'
        : weakPassword
          ? 'Your password does not meet all the requirements below'
          : '',
    );
    setConfirmPasswordError(
      missingConfirm ? 'Please confirm your password' : mismatch ? 'Passwords do not match' : '',
    );

    if (
      missingFirstName ||
      missingLastName ||
      missingEmail ||
      invalidEmail ||
      missingContact ||
      invalidContact ||
      missingBirthday ||
      invalidBirthday ||
      missingPassword ||
      weakPassword ||
      missingConfirm ||
      mismatch
    ) {
      return;
    }

    setLoading(true);

    // 1. Attach the email to the guest's account.
    const { error: emailUpdateError } = await supabase.auth.updateUser({ email: trimmedEmail });

    if (emailUpdateError) {
      setLoading(false);
      const message = (emailUpdateError.message || '').toLowerCase();

      if (emailUpdateError.code === 'email_exists' || message.includes('already')) {
        setEmailError('This email is already registered. Please use a different email.');
      } else if (message.includes('network') || message.includes('fetch')) {
        showAlert('Network error', 'Please check your connection and try again.');
      } else {
        showAlert('Could not create account', emailUpdateError.message);
      }
      return;
    }

    // 2. Set the password.
    const { error: passwordUpdateError } = await supabase.auth.updateUser({ password });

    if (passwordUpdateError) {
      setLoading(false);
      showAlert(
        'Almost there',
        `Your email was saved, but the password could not be set: ${passwordUpdateError.message}. ` +
          'Use "Forgot password" on the login screen to set one.',
        () => navigation?.goBack(),
      );
      return;
    }

    // 3. Save the personal details on the existing profile row (same user id).
    const { error: profileError } = await updateProfile({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      middle_name: middleName.trim(),
      email: trimmedEmail,
      contact_number: contactNumber.trim(),
      birthday: birthday.trim(),
    });

    // Refresh the session so the app sees the account as a full (non-guest) account.
    await supabase.auth.refreshSession();

    setLoading(false);

    showAlert(
      'Account created!',
      profileError
        ? 'Your account is ready and your progress is saved to it, but we could not save your details. You can add them on your Profile screen.'
        : 'Your account is ready and your progress is saved to it.',
      () => navigation?.goBack(),
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
          <Text style={styles.subtitle}>
            Keep your progress by turning your guest account into a full account.
          </Text>

          {/* FIRST NAME */}
          <Text style={styles.label}>First name</Text>
          <TextInput
            style={[styles.input, firstNameError ? styles.inputError : null]}
            placeholder="Enter your first name"
            placeholderTextColor="#9A9A9A"
            value={firstName}
            editable={!loading}
            onChangeText={(text) => {
              setFirstName(text);
              if (firstNameError) setFirstNameError('');
            }}
            autoCapitalize="words"
          />
          {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}

          {/* LAST NAME */}
          <Text style={styles.label}>Last name</Text>
          <TextInput
            style={[styles.input, lastNameError ? styles.inputError : null]}
            placeholder="Enter your last name"
            placeholderTextColor="#9A9A9A"
            value={lastName}
            editable={!loading}
            onChangeText={(text) => {
              setLastName(text);
              if (lastNameError) setLastNameError('');
            }}
            autoCapitalize="words"
          />
          {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}

          {/* MIDDLE NAME */}
          <Text style={styles.label}>Middle name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your middle name (optional)"
            placeholderTextColor="#9A9A9A"
            value={middleName}
            editable={!loading}
            onChangeText={setMiddleName}
            autoCapitalize="words"
          />

          {/* EMAIL */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            placeholder="Enter your email"
            placeholderTextColor="#9A9A9A"
            value={email}
            editable={!loading}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          {/* CONTACT NUMBER */}
          <Text style={styles.label}>Contact number</Text>
          <View style={[styles.phoneContainer, contactNumberError ? styles.inputError : null]}>
            <Text style={styles.countryCode}>+63</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter your contact number"
              placeholderTextColor="#9A9A9A"
              value={contactNumber}
              editable={!loading}
              onChangeText={(text) => {
                let numbersOnly = text.replace(/[^0-9]/g, '');
                if (numbersOnly.startsWith('0')) numbersOnly = numbersOnly.substring(1);
                setContactNumber(numbersOnly.slice(0, 10));
                if (contactNumberError) setContactNumberError('');
              }}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>
          {contactNumberError ? <Text style={styles.errorText}>{contactNumberError}</Text> : null}

          {/* BIRTHDAY */}
          <Text style={styles.label}>Birthday</Text>
          <TextInput
            style={[styles.input, birthdayError ? styles.inputError : null]}
            placeholder="MM/DD/YYYY"
            placeholderTextColor="#9A9A9A"
            value={birthday}
            editable={!loading}
            onChangeText={(text) => {
              const numbersOnly = text.replace(/[^0-9]/g, '').slice(0, 8);
              let formatted = numbersOnly;
              if (numbersOnly.length > 2) {
                formatted = numbersOnly.slice(0, 2) + '/' + numbersOnly.slice(2);
              }
              if (numbersOnly.length > 4) {
                formatted =
                  numbersOnly.slice(0, 2) + '/' + numbersOnly.slice(2, 4) + '/' + numbersOnly.slice(4);
              }
              setBirthday(formatted);
              if (birthdayError) setBirthdayError('');
            }}
            keyboardType="number-pad"
            maxLength={10}
          />
          {birthdayError ? <Text style={styles.errorText}>{birthdayError}</Text> : null}

          {/* PASSWORD */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Create a password"
            placeholderTextColor="#9A9A9A"
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
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <PasswordRequirements password={password} />

          {/* CONFIRM PASSWORD */}
          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            style={[styles.input, confirmPasswordError ? styles.inputError : null]}
            placeholder="Re-enter your password"
            placeholderTextColor="#9A9A9A"
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
            style={[styles.primaryButton, loading && { opacity: 0.7 }]}
            onPress={handleCreate}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Create account</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },
  backButton: { width: 32, height: 32, justifyContent: 'center', marginBottom: 10 },
  backArrow: { fontSize: 26, color: '#111111', fontWeight: '400' },
  title: { fontSize: 24, fontWeight: '700', color: '#111111', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#888888', marginBottom: 20, lineHeight: 19 },
  label: { fontSize: 12, fontWeight: '600', color: '#111111', marginBottom: 6, marginTop: 10 },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#111111',
  },
  inputError: { borderColor: '#E5484D' },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  countryCode: { fontSize: 14, color: '#111111', marginRight: 8, fontWeight: '500' },
  phoneInput: { flex: 1, height: '100%', fontSize: 14, color: '#111111', paddingVertical: 0 },
  errorText: { color: '#E5484D', fontSize: 12, marginTop: 6 },
  matchText: { color: '#2E9E5B', fontSize: 12, marginTop: 6 },
  primaryButton: {
    height: 50,
    backgroundColor: PURPLE,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    shadowColor: PURPLE_DARK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});
