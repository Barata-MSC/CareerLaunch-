import React, { useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { useResume } from './ResumeContext';
import { isPersonalInfoComplete } from './validators';

const PURPLE = '#5B21F5';
const PURPLE_DARK = '#3D14C4';


const SECTIONS = [
  { key: 'personalInfo', label: 'Personal Information', type: 'object', required: true },
  { key: 'education', label: 'Education', type: 'array', required: true },
  { key: 'skills', label: 'Skills', type: 'array', required: true },
  { key: 'experience', label: 'Experience', type: 'array', required: false },
  { key: 'certificates', label: 'Certificates', type: 'array', required: false },
  { key: 'projects', label: 'Projects', type: 'array', required: false },
];

function isSectionDone(section, resumeData) {
  if (section.type === 'object') return isPersonalInfoComplete(resumeData.personalInfo);
  return (resumeData[section.key] || []).length > 0;
}

export default function ResumeBuilderScreen({ navigation }) {
  const { resumeData } = useResume();

  const progress = useMemo(() => {
    const completed = SECTIONS.filter((s) => isSectionDone(s, resumeData)).length;
    return Math.round((completed / SECTIONS.length) * 100);
  }, [resumeData]);

  // Generating unlocks once every required section is filled in
  const missingRequired = SECTIONS.filter((s) => s.required && !isSectionDone(s, resumeData));
  const canGenerate = missingRequired.length === 0;

  const sectionStatus = (section) => (isSectionDone(section, resumeData) ? 'done' : 'empty');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resume Builder</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.progressLabel}>Resume progress</Text>
        <Text style={styles.progressPercent}>{progress}% complete</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <View style={styles.sectionList}>
          {SECTIONS.map((section) => (
            <TouchableOpacity
              key={section.key}
              style={styles.sectionRow}
              activeOpacity={0.7}
              onPress={() => navigation?.navigate(section.key)}
            >
              <View style={styles.sectionRowLeft}>
                <View
                  style={[
                    styles.statusDot,
                    sectionStatus(section) === 'done' && styles.statusDotDone,
                  ]}
                />
                <Text style={styles.sectionLabel}>{section.label}</Text>
              </View>
              <View style={styles.sectionRowRight}>
                <Text
                  style={[
                    styles.badge,
                    section.required && sectionStatus(section) === 'empty' && styles.badgeRequiredEmpty,
                  ]}
                >
                  {section.required ? 'Required' : 'Optional'}
                </Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.generateButton, !canGenerate && styles.generateButtonDisabled]}
          activeOpacity={0.85}
          disabled={!canGenerate}
          onPress={() => navigation?.navigate('ResumePreview', { mode: 'generate' })}
        >
          <Text style={styles.generateButtonText}>Generate Resume</Text>
        </TouchableOpacity>

        {!canGenerate && (
          <Text style={styles.hintText}>
            Complete the required sections to unlock resume generation: {missingRequired.map((s) => s.label).join(', ')}.
          </Text>
        )}

        <TouchableOpacity onPress={() => navigation?.navigate('ResumePreview', { mode: 'test' })}>
          <Text style={styles.testLink}>Test Resume here</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  backArrow: {
    fontSize: 26,
    color: '#111111',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  progressLabel: {
    fontSize: 13,
    color: '#8A8A8E',
    marginTop: 4,
  },
  progressPercent: {
    fontSize: 13,
    color: PURPLE,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 10,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EDEBFB',
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: PURPLE,
  },
  sectionList: {
    marginBottom: 28,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E3E3E8',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DADADA',
    marginRight: 10,
  },
  statusDotDone: {
    backgroundColor: PURPLE,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  chevron: {
    fontSize: 18,
    color: '#B5B5B9',
  },
  sectionRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8A8A8E',
    marginRight: 8,
  },
  badgeRequiredEmpty: {
    color: '#FF3B30',
  },
  generateButton: {
    backgroundColor: PURPLE,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: PURPLE_DARK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  generateButtonDisabled: {
    backgroundColor: '#C9BDF7',
    shadowOpacity: 0,
    elevation: 0,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  hintText: {
    fontSize: 12,
    color: '#8A8A8E',
    textAlign: 'center',
    marginTop: 10,
  },
  testLink: {
    fontSize: 13,
    color: PURPLE,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 18,
  },
});