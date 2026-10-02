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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResume } from './ResumeContext';

const PURPLE = '#5B21F5';

export default function EducationScreen({ navigation }) {
  // Pull data maps and array updating tools from global context
  const { resumeData, updateResumeData } = useResume();
  const educationList = resumeData.education || [];

  // Local component state to track text field values
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [year, setYear] = useState('');

  // Appends a complete, structured data object to the global collection
  const handleAddEducation = () => {
    const trimmedSchool = school.trim();
    const trimmedDegree = degree.trim();
    const trimmedYear = year.trim();

    // Ensure necessary basic fields are populated before committing record
    if (!trimmedSchool || !trimmedDegree || !trimmedYear) return;

    const newEducationItem = {
      id: Date.now().toString(), // Generate clean unique record timestamp string key
      school: trimmedSchool,
      degree: trimmedDegree,
      year: trimmedYear,
    };

    const updatedList = [...educationList, newEducationItem];
    updateResumeData('education', updatedList);

    // Clear local inputs to refresh input row forms
    setSchool('');
    setDegree('');
    setYear('');
  };

  // Filters out specific data nodes when user triggers delete action
  const handleRemoveEducation = (itemId) => {
    const updatedList = educationList.filter((item) => item.id !== itemId);
    updateResumeData('education', updatedList);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Navigation Title Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation?.goBack()} 
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Education</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionSubtitle}>
            Add details about your high school, college, or university degree milestones.
          </Text>

          {/* Form Entry Field Modules Deck */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Add New Academic Record</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>School / University Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Stanford University"
                placeholderTextColor="#B5B5B9"
                value={school}
                onChangeText={setSchool}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Degree / Field of Study</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. BS Computer Science"
                placeholderTextColor="#B5B5B9"
                value={degree}
                onChangeText={setDegree}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Graduation Year / Timeline</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 2022 or 2021 - Present"
                placeholderTextColor="#B5B5B9"
                value={year}
                onChangeText={setYear}
              />
            </View>

            <TouchableOpacity 
              style={styles.addButton} 
              activeOpacity={0.8} 
              onPress={handleAddEducation}
            >
              <Text style={styles.addButtonText}>+ Add Academic History</Text>
            </TouchableOpacity>
          </View>

          {/* Render List Array Output Cards Section */}
          <Text style={styles.listLabel}>Your History ({educationList.length})</Text>

          {educationList.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No education history entries compiled yet.</Text>
            </View>
          ) : (
            <View style={styles.historyContainer}>
              {educationList.map((item) => (
                <View key={item.id} style={styles.historyCard}>
                  <View style={styles.historyCardLeft}>
                    <Text style={styles.cardSchool}>{item.school}</Text>
                    <Text style={styles.cardDegree}>{item.degree}</Text>
                    <Text style={styles.cardYear}>{item.year}</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => handleRemoveEducation(item.id)}
                    style={styles.deleteButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.deleteButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Close Section Global Button */}
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
  cardSchool: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  cardDegree: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 2,
  },
  cardYear: {
    fontSize: 12,
    color: '#8A8A8E',
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
