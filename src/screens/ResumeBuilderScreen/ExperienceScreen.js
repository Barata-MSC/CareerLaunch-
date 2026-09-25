import React, { useState } from 'react';
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

export default function ExperienceScreen({ navigation }) {
  // Extract state records and global updaters from our provider context
  const { resumeData, updateResumeData } = useResume();
  const experienceList = resumeData.experience || [];

  // Local component form field trackers
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  // Bundles values into a standard node item and pushes to global context array
  const handleAddExperience = () => {
    const trimmedCompany = company.trim();
    const trimmedRole = role.trim();
    const trimmedDuration = duration.trim();
    const trimmedDescription = description.trim();

    // Prevent submission if mandatory fields are missing
    if (!trimmedCompany || !trimmedRole || !trimmedDuration) return;

    const newExperienceItem = {
      id: Date.now().toString(), // Clean timestamp string hash identifier
      company: trimmedCompany,
      role: trimmedRole,
      duration: trimmedDuration,
      description: trimmedDescription,
    };

    const updatedList = [...experienceList, newExperienceItem];
    updateResumeData('experience', updatedList);

    // Refresh and clear input modules local cache state
    setCompany('');
    setRole('');
    setDuration('');
    setDescription('');
  };

  // Safely slices selected history nodes away from the main array index map
  const handleRemoveExperience = (itemId) => {
    const updatedList = experienceList.filter((item) => item.id !== itemId);
    updateResumeData('experience', updatedList);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Structural Action Title Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation?.goBack()} 
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Work Experience</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionSubtitle}>
            Add jobs, internships, or freelance roles to demonstrate your professional background history.
          </Text>

          {/* Form Entry Field Modules Deck */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Add New Work History</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Company / Organization</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Google, Tech Startup Corp"
                placeholderTextColor="#B5B5B9"
                value={company}
                onChangeText={setCompany}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Job Title / Role</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Software Engineer Intern, Sales Associate"
                placeholderTextColor="#B5B5B9"
                value={role}
                onChangeText={setRole}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Duration / Dates Active</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. June 2023 - Present or 1 Year"
                placeholderTextColor="#B5B5B9"
                value={duration}
                onChangeText={setDuration}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description / Key Responsibilities</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Developed features using React... Led team sprints..."
                placeholderTextColor="#B5B5B9"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <TouchableOpacity 
              style={styles.addButton} 
              activeOpacity={0.8} 
              onPress={handleAddExperience}
            >
              <Text style={styles.addButtonText}>+ Add Work Experience</Text>
            </TouchableOpacity>
          </View>

          {/* Render List Array Output Cards Section */}
          <Text style={styles.listLabel}>Your History ({experienceList.length})</Text>

          {experienceList.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No professional work experience items added yet.</Text>
            </View>
          ) : (
            <View style={styles.historyContainer}>
              {experienceList.map((item) => (
                <View key={item.id} style={styles.historyCard}>
                  <View style={styles.historyCardLeft}>
                    <Text style={styles.cardCompany}>{item.company}</Text>
                    <Text style={styles.cardRole}>{item.role}</Text>
                    <Text style={styles.cardDuration}>{item.duration}</Text>
                    {item.description ? (
                      <Text style={styles.cardDesc}>{item.description}</Text>
                    ) : null}
                  </View>
                  <TouchableOpacity 
                    onPress={() => handleRemoveExperience(item.id)}
                    style={styles.deleteButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.deleteButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Safe Dismiss Save Panel View Button */}
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.85}
            onPress={() => navigation?.goBack()}
          >
            <Text style={styles.saveButtonText}>Done</Text>
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
    marginBottom: 20,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#FAFAFC',
    borderWidth: 1,
    borderColor: '#E3E3E8',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 14,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E3E3E8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1C1C1E',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 75,
    paddingTop: 10,
  },
  addButton: {
    backgroundColor: PURPLE,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  listLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  emptyContainer: {
    borderWidth: 1,
    borderColor: '#E3E3E8',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  emptyText: {
    fontSize: 13,
    color: '#8A8A8E',
  },
  historyContainer: {
    marginBottom: 32,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E3E3E8',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  historyCardLeft: {
    flex: 1,
    paddingRight: 8,
  },
  cardCompany: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  cardRole: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 2,
  },
  cardDuration: {
    fontSize: 12,
    color: '#8A8A8E',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#444444',
    lineHeight: 18,
  },
  deleteButton: {
    padding: 6,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
  },
    saveButton: {
    backgroundColor: PURPLE,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
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
