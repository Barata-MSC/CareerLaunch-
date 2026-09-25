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

const PURPLE = '#5B21F5';
const PURPLE_DARK = '#3D14C4';

// Required fields per section — used to calculate progress.
// Array sections just need at least 1 entry to count as "started".
const SECTIONS = [
  { key: 'personalInfo', label: 'Personal Information', type: 'object' },
  { key: 'education', label: 'Education', type: 'array' },
  { key: 'skills', label: 'Skills', type: 'array' },
  { key: 'experience', label: 'Experience', type: 'array' },
  { key: 'certificates', label: 'Certificates', type: 'array' },
  { key: 'projects', label: 'Projects', type: 'array' },
];

function isPersonalInfoComplete(info) {
  return !!(info.fullName && info.email && info.phone);
}

export default function ResumeBuilderScreen({ navigation }) {
  const { resumeData } = useResume();

  const progress = useMemo(() => {
    let completed = 0;
    SECTIONS.forEach((section) => {
      if (section.type === 'object') {
        if (isPersonalInfoComplete(resumeData.personalInfo)) completed += 1;
      } else {
        if (resumeData[section.key].length > 0) completed += 1;
      }
    });
    return Math.round((completed / SECTIONS.length) * 100);
  }, [resumeData]);

  const canGenerate = progress >= 60; // adjust threshold as needed

  const sectionStatus = (section) => {
    if (section.type === 'object') {
      return isPersonalInfoComplete(resumeData.personalInfo) ? 'done' : 'empty';
    }
    return resumeData[section.key].length > 0 ? 'done' : 'empty';
  };

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
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.generateButton, !canGenerate && styles.generateButtonDisabled]}
          activeOpacity={0.85}
          disabled={!canGenerate}
          onPress={() => navigation?.navigate('ResumePreview')}
        >
          <Text style={styles.generateButtonText}>Generate Resume</Text>
        </TouchableOpacity>

        {!canGenerate && (
          <Text style={styles.hintText}>
            Complete more sections to unlock resume generation.
          </Text>
        )}

        <TouchableOpacity onPress={() => navigation?.navigate('ResumePreview')}>
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