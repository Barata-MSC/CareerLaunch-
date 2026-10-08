import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResume } from './ResumeContext';
import {
  getPhoneError,
  getLocalNumber,
  sanitizePhoneInput,
  toStoredPhone,
} from './validators';
 
const PURPLE = '#5B21F5';
 
export default function PersonalInfoScreen({ navigation }) {
  // Grab global data and sync updater from your global state provider
  const { resumeData, updateResumeData } = useResume();
  const info = resumeData.personalInfo;
 
  // Errors only show after a field is touched or the user taps Save
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
 
  const errors = {
    fullName: info.fullName?.trim() ? '' : 'Full name is required.',
    email: info.email?.trim() ? '' : 'Email address is required.',
    phone: getPhoneError(info.phone),
  };
 
  // The phone error shows live while typing (like the Profile screen);
  // other fields wait until they are touched or the user taps Save.
  const errorFor = (field) => {
    if (field === 'phone' && getLocalNumber(info.phone).length > 0) return errors.phone;
    return submitted || touched[field] ? errors[field] : '';
  };
  const markTouched = (field) => setTouched((prev) => ({ ...prev, [field]: true }));
 
  // Local helper to merge text field changes live into global state
  const handleInputChange = (field, value) => {
    updateResumeData('personalInfo', {
      ...info,
      [field]: value,
    });
  };
 
  // Opens the gallery, lets the user crop to a square, and stores the photo as a
  // base64 data URI so it can be shown in the preview and embedded in the PDF.
  const handlePickPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });
      if (result.canceled || !result.assets?.length) return;
 
      const asset = result.assets[0];
      if (!asset.base64) {
        Alert.alert('Photo error', 'Could not read that image. Please try another one.');
        return;
      }
      const mime = asset.mimeType || 'image/jpeg';
      handleInputChange('photo', `data:${mime};base64,${asset.base64}`);
    } catch (error) {
      Alert.alert('Photo error', error?.message || 'Could not open your photos.');
    }
  };
 
  const handleRemovePhoto = () => handleInputChange('photo', '');
 
  // Only leave the screen when every required field is valid
  const handleSave = () => {
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) return;
    navigation?.goBack();
  };
 
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation?.goBack()} 
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
        <View style={{ width: 24 }} />
      </View>
 
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <Text style={styles.sectionSubtitle}>
            This section is required. Enter your contact details to display at the top of your resume.
            Fields marked * must be filled in.
          </Text>
 
          {/* Profile Photo (optional) */}
          <View style={styles.photoSection}>
            <TouchableOpacity activeOpacity={0.8} onPress={handlePickPhoto}>
              {info.photo ? (
                <Image source={{ uri: info.photo }} style={styles.photo} />
              ) : (
                <View style={[styles.photo, styles.photoPlaceholder]}>
                  <Text style={styles.photoPlus}>+</Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.photoActions}>
              <TouchableOpacity onPress={handlePickPhoto} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={styles.photoActionText}>{info.photo ? 'Change photo' : 'Add photo'}</Text>
              </TouchableOpacity>
              {info.photo ? (
                <TouchableOpacity onPress={handleRemovePhoto} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text style={styles.photoRemoveText}>Remove</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.optionalTag}>(Optional)</Text>
              )}
            </View>
          </View>
 
          {/* Full Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Full Name <Text style={styles.requiredStar}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errorFor('fullName') ? styles.inputError : null]}
              placeholder="e.g. John Doe"
              placeholderTextColor="#B5B5B9"
              value={info.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
              onBlur={() => markTouched('fullName')}
            />
            {errorFor('fullName') ? <Text style={styles.errorText}>{errorFor('fullName')}</Text> : null}
          </View>
 
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Email Address <Text style={styles.requiredStar}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errorFor('email') ? styles.inputError : null]}
              placeholder="e.g. johndoe@example.com"
              placeholderTextColor="#B5B5B9"
              keyboardType="email-address"
              autoCapitalize="none"
              value={info.email}
              onChangeText={(text) => handleInputChange('email', text)}
              onBlur={() => markTouched('email')}
            />
            {errorFor('email') ? <Text style={styles.errorText}>{errorFor('email')}</Text> : null}
          </View>
 
          {/* Phone Number Input (PH format: +63 9XX XXX XXXX) */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Mobile Number <Text style={styles.requiredStar}>*</Text>
            </Text>
            <View style={[styles.phoneContainer, errorFor('phone') ? styles.inputError : null]}>
              <Text style={styles.countryCode}>+63</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="9XX XXX XXXX"
                placeholderTextColor="#B5B5B9"
                keyboardType="number-pad"
                maxLength={10}
                value={getLocalNumber(info.phone)}
                onChangeText={(text) =>
                  handleInputChange('phone', toStoredPhone(sanitizePhoneInput(text)))
                }
                onBlur={() => markTouched('phone')}
              />
            </View>
            {errorFor('phone') ? <Text style={styles.errorText}>{errorFor('phone')}</Text> : null}
          </View>
 
          {/* Professional Summary Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Professional Summary <Text style={styles.optionalTag}>(Optional)</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Briefly describe your career goals and background..."
              placeholderTextColor="#B5B5B9"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={info.summary}
              onChangeText={(text) => handleInputChange('summary', text)}
            />
          </View>
 
          {/* Save & Return Button */}
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.85}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Details</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photo: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EDEBFB',
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: PURPLE,
  },
  photoPlus: {
    fontSize: 36,
    color: PURPLE,
    lineHeight: 40,
  },
  photoActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  photoActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: PURPLE,
    marginRight: 16,
  },
  photoRemoveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF3B30',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E8',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 48,
    backgroundColor: '#FAFAFC',
  },
  countryCode: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    color: '#1C1C1E',
    paddingVertical: 0,
    textAlignVertical: 'center',
  },
  requiredStar: {
    color: '#FF3B30',
    fontWeight: '700',
  },
  optionalTag: {
    color: '#8A8A8E',
    fontWeight: '400',
    fontSize: 12,
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#F2F2F7',
  },
  backArrow: {
    fontSize: 32,
    color: '#111111',
    lineHeight: 32,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8A8A8E',
    marginBottom: 24,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E3E3E8',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1C1C1E',
    backgroundColor: '#FAFAFC',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  saveButton: {
    backgroundColor: PURPLE,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#3D14C4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});