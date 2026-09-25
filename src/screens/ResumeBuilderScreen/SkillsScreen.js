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

export default function SkillsScreen({ navigation }) {
  // Grab global data arrays and state engine hooks from context
  const { resumeData, updateResumeData } = useResume();
  const currentSkills = resumeData.skills || [];

  // Local state to capture the currently typed skill string input
  const [skillInput, setSkillInput] = useState('');

  // Appends a valid new skill entry into your global data tracker array
  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (!trimmedSkill) return;

    // Prevent duplicate entries from cluttering the data collection
    if (currentSkills.includes(trimmedSkill)) {
      setSkillInput('');
      return;
    }

    const updatedSkills = [...currentSkills, trimmedSkill];
    updateResumeData('skills', updatedSkills);
    setSkillInput('');
  };

  // Filters out specific string badges dynamically when the user clicks 'X'
  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = currentSkills.filter((skill) => skill !== skillToRemove);
    updateResumeData('skills', updatedSkills);
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
        <Text style={styles.headerTitle}>Skills</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionSubtitle}>
            Add key professional capabilities, frameworks, and core technologies that highlight your strengths.
          </Text>

          {/* Interactive Entry Input Row */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="e.g. JavaScript, Public Speaking..."
              placeholderTextColor="#B5B5B9"
              value={skillInput}
              onChangeText={setSkillInput}
              onSubmitEditing={handleAddSkill} // Allows adding via keyboard "Return" button
            />
            <TouchableOpacity 
              style={styles.addButton} 
              activeOpacity={0.8} 
              onPress={handleAddSkill}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.listLabel}>Your Skills ({currentSkills.length})</Text>

          {/* Dynamic Chip Flex Layout Matrix Container */}
          {currentSkills.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No skills added yet. Type a skill above to start building your profile matrix!</Text>
            </View>
          ) : (
            <View style={styles.chipsContainer}>
              {currentSkills.map((skill, index) => (
                <View key={`${skill}-${index}`} style={styles.chip}>
                  <Text style={styles.chipText}>{skill}</Text>
                  <TouchableOpacity 
                    onPress={() => handleRemoveSkill(skill)}
                    hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                  >
                    <Text style={styles.chipDelete}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Complete Flow Block Confirmation Action Button */}
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
    marginBottom: 24,
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E3E3E8',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1C1C1E',
    backgroundColor: '#FAFAFC',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: PURPLE,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  emptyText: {
    fontSize: 13,
    color: '#8A8A8E',
    textAlign: 'center',
    lineHeight: 18,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEBFB',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 10,
  },
  chipText: {
    fontSize: 14,
    color: PURPLE,
    fontWeight: '600',
    marginRight: 6,
  },
  chipDelete: {
    fontSize: 18,
    color: PURPLE,
    fontWeight: '700',
    lineHeight: 18,
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
