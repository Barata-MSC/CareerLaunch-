import AppPressable from '@components/AppPressable';
import BackButton from '@components/BackButton';
import FadeSlideIn from '@components/motion/FadeSlideIn';
import PressScale from '@components/motion/PressScale';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResume } from './ResumeContext';
import { ResumeEmptyState, ResumeEntry, useResumeEntryRemoval } from './ResumeMotion';

const PURPLE = '#5B21F5';

export default function SkillsScreen({ navigation }) {
  // Grab global data arrays and state engine hooks from context
  const { resumeData, updateResumeData } = useResume();
  const currentSkills = resumeData.skills || [];
  const currentSkillsRef = useRef(currentSkills);
  currentSkillsRef.current = currentSkills;

  // Local state to capture the currently typed skill string input
  const [skillInput, setSkillInput] = useState('');
  const [newlyAddedSkill, setNewlyAddedSkill] = useState(null);

  // Appends a valid new skill entry into your global data tracker array
  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (!trimmedSkill) return;

    // Prevent duplicate entries from cluttering the data collection
    if (currentSkillsRef.current.includes(trimmedSkill)) {
      setSkillInput('');
      return;
    }

    const updatedSkills = [...currentSkillsRef.current, trimmedSkill];
    currentSkillsRef.current = updatedSkills;
    updateResumeData('skills', updatedSkills);
    setNewlyAddedSkill(trimmedSkill);
    setSkillInput('');
  };

  // Filters out specific string badges dynamically when the user clicks 'X'
  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = currentSkillsRef.current.filter((skill) => skill !== skillToRemove);
    currentSkillsRef.current = updatedSkills;
    updateResumeData('skills', updatedSkills);
  };
  const { removingKeys, requestRemoval, completeRemoval } =
    useResumeEntryRemoval(handleRemoveSkill);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Navigation Header */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation?.goBack()} style={styles.headerBack} />
        <Text style={styles.headerTitle}>Skills</Text>
        <View style={{ width: 44 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <FadeSlideIn>
            <Text style={styles.sectionSubtitle}>
              Add key professional capabilities, frameworks, and core technologies that highlight your strengths.
            </Text>
          </FadeSlideIn>

          {/* Interactive Entry Input Row */}
          <FadeSlideIn>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="e.g. JavaScript, Public Speaking..."
              placeholderTextColor="#B5B5B9"
              value={skillInput}
              onChangeText={setSkillInput}
              onSubmitEditing={handleAddSkill} // Allows adding via keyboard "Return" button
            />
            <PressScale>
              <AppPressable
                style={styles.addButton}
                activeOpacity={0.8}
                onPress={handleAddSkill}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </AppPressable>
            </PressScale>
          </View>
          </FadeSlideIn>

          <Text style={styles.listLabel}>Your Skills ({currentSkills.length})</Text>

          {/* Dynamic Chip Flex Layout Matrix Container */}
          <ResumeEmptyState visible={currentSkills.length === 0}>
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No skills added yet. Type a skill above to start building your profile matrix!</Text>
            </View>
          </ResumeEmptyState>
          {currentSkills.length > 0 && (
            <View style={styles.chipsContainer}>
              {currentSkills.map((skill, index) => {
                const key = skill;
                const isRemoving = removingKeys.includes(key);
                return (
                <ResumeEntry
                  key={key}
                  entryKey={key}
                  isNew={newlyAddedSkill === skill && index === currentSkills.length - 1}
                  removing={isRemoving}
                  onRemoveComplete={completeRemoval}
                  delay={Math.min(index * 25, 400)}
                >
                <View style={styles.chip}>
                  <Text style={styles.chipText}>{skill}</Text>
                  <PressScale>
                    <AppPressable
                      onPress={() => requestRemoval(key)}
                      disabled={isRemoving}
                      hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                    >
                      <Text style={styles.chipDelete}>×</Text>
                    </AppPressable>
                  </PressScale>
                </View>
                </ResumeEntry>
                );
              })}
            </View>
          )}

          {/* Complete Flow Block Confirmation Action Button */}
          <PressScale>
            <AppPressable
              style={styles.saveButton}
              activeOpacity={0.85}
              onPress={() => navigation?.goBack()}
            >
              <Text style={styles.saveButtonText}>Done</Text>
            </AppPressable>
          </PressScale>
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
  headerBack: { width: 44 },
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
