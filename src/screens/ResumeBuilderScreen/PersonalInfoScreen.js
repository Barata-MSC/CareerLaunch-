import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useResume } from './ResumeContext';

const PURPLE = '#5B21F5';

export default function PersonalInfoScreen({ navigation }) {
  // Grab global data and sync updater from your global state provider
  const { resumeData, updateResumeData } = useResume();
  const info = resumeData.personalInfo;

  // Local helper to merge text field changes live into global state
  const handleInputChange = (field, value) => {
    updateResumeData('personalInfo', {
      ...info,
      [field]: value,
    });
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
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionSubtitle}>
            Enter your contact details to display at the top of your resume.
          </Text>

          {/* Full Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. John Doe"
              placeholderTextColor="#B5B5B9"
              value={info.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. johndoe@example.com"
              placeholderTextColor="#B5B5B9"
              keyboardType="email-address"
              autoCapitalize="none"
              value={info.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
          </View>

          {/* Phone Number Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. +1 234 567 890"
              placeholderTextColor="#B5B5B9"
              keyboardType="phone-pad"
              value={info.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
            />
          </View>

          {/* Professional Summary Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Professional Summary</Text>
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
            onPress={() => navigation?.goBack()}
          >
            <Text style={styles.saveButtonText}>Save Details</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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