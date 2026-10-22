import AppPressable from '@components/AppPressable';
import BackButton from '@components/BackButton';
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResume } from './ResumeContext';
import {
  areRequiredResumeSectionsComplete,
  isResumeSectionComplete,
} from './validators';
import AccountGate from '../../components/AccountGate';
import ResumeDataGate from './ResumeDataGate';

const PURPLE = '#5B21F5';
const PURPLE_DARK = '#3D14C4';


const SECTIONS = [
  { key: 'personalInfo', label: 'Personal Information', required: true },
  { key: 'education', label: 'Education', required: true },
  { key: 'skills', label: 'Skills', required: true },
  { key: 'experience', label: 'Experience', required: false },
  { key: 'certificates', label: 'Certificates', required: false },
  { key: 'projects', label: 'Projects', required: false },
];

function isSectionDone(section, resumeData) {
  return isResumeSectionComplete(section.key, resumeData);
}

function ResumeBuilderContent({ navigation }) {
  const { resumeData, saveStatus, saveNow, deleteResume, deleting } = useResume();
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    if (!navigation) return undefined;
    return navigation.addListener('blur', saveNow);
  }, [navigation, saveNow]);

  const progress = useMemo(() => {
    const completed = SECTIONS.filter((s) => isSectionDone(s, resumeData)).length;
    return Math.round((completed / SECTIONS.length) * 100);
  }, [resumeData]);

  // Generating unlocks once every required section is filled in
  const missingRequired = SECTIONS.filter((s) => s.required && !isSectionDone(s, resumeData));
  const canGenerate = areRequiredResumeSectionsComplete(resumeData);
  const hasResumeContent =
    Object.values(resumeData.personalInfo).some((value) => typeof value === 'string' && value.trim()) ||
    ['education', 'skills', 'experience', 'certificates', 'projects'].some(
      (section) => resumeData[section].length > 0,
    );

  const sectionStatus = (section) => (isSectionDone(section, resumeData) ? 'done' : 'empty');

  const deleteConfirmedResume = async () => {
    const deleted = await deleteResume();
    if (deleted) {
      setDeleteError('');
    } else {
      setDeleteError('Could not delete resume. Check your connection and try again.');
      if (Platform.OS !== 'web') {
        Alert.alert('Could not delete resume', 'Check your connection and try again.');
      }
    }
  };

  const confirmDeleteResume = () => {
    const message = 'This permanently deletes the resume saved to your account.';
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm(message)) {
        deleteConfirmedResume();
      }
      return;
    }

    Alert.alert(
      'Delete my resume?',
      message,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: deleteConfirmedResume,
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation?.goBack()} style={styles.headerBack} />
        <Text style={styles.headerTitle}>Resume Builder</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.privacyNote}>
          Your resume is saved to your account and can be deleted at any time. Profile photos are not saved yet.
        </Text>
        {(saveStatus === 'pending' || saveStatus === 'saving') && (
          <Text accessibilityLiveRegion="polite" style={styles.saveStatus}>Saving…</Text>
        )}
        {saveStatus === 'saved' && (
          <Text accessibilityLiveRegion="polite" style={styles.saveStatus}>Saved</Text>
        )}
        {saveStatus === 'error' && (
          <View style={styles.saveErrorRow}>
            <Text accessibilityLiveRegion="polite" style={styles.saveError}>Couldn’t save. </Text>
            <AppPressable onPress={saveNow}>
              <Text style={styles.retryText}>Retry</Text>
            </AppPressable>
          </View>
        )}
        {!hasResumeContent && (
          <Text style={styles.emptyState}>
            You have not added any resume details yet. Choose a section below to get started.
          </Text>
        )}

        <Text style={styles.progressLabel}>Resume progress</Text>
        <Text style={styles.progressPercent}>{progress}% complete</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <View style={styles.sectionList}>
          {SECTIONS.map((section) => (
            <AppPressable
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
            </AppPressable>
          ))}
        </View>

        <AppPressable
          style={[styles.generateButton, !canGenerate && styles.generateButtonDisabled]}
          activeOpacity={0.85}
          disabled={!canGenerate}
          onPress={() => navigation?.navigate('ResumePreview', { mode: 'generate' })}
        >
          <Text style={styles.generateButtonText}>Generate Resume</Text>
        </AppPressable>

        {!canGenerate && (
          <Text style={styles.hintText}>
            Complete the required sections to unlock resume generation: {missingRequired.map((s) => s.label).join(', ')}.
          </Text>
        )}

        <AppPressable onPress={() => navigation?.navigate('ResumePreview', { mode: 'test' })}>
          <Text style={styles.testLink}>Test Resume here</Text>
        </AppPressable>

        <AppPressable
          style={styles.deleteButton}
          disabled={deleting}
          onPress={confirmDeleteResume}
        >
          <Text style={styles.deleteButtonText}>
            {deleting ? 'Deleting…' : 'Delete my resume'}
          </Text>
        </AppPressable>
        {deleteError ? <Text style={styles.deleteError}>{deleteError}</Text> : null}
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
  headerBack: { width: 44 },
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
  privacyNote: {
    color: '#6B7280',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  saveStatus: {
    color: '#4B5563',
    fontSize: 12,
    marginBottom: 12,
  },
  saveErrorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  saveError: {
    color: '#B42318',
    fontSize: 12,
  },
  emptyState: {
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },
  retryText: {
    color: PURPLE,
    fontSize: 12,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  deleteButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 12,
  },
  deleteButtonText: {
    color: '#B42318',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteError: {
    color: '#B42318',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
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

export default function ResumeBuilderScreen(props) {
  return (
    <AccountGate
      featureName="Resume Builder"
      description="Build and preview your resume with confidence. Complete your account to unlock the Resume Builder and keep your work saved."
      navigation={props.navigation}
    >
      <ResumeDataGate>
        <ResumeBuilderContent {...props} />
      </ResumeDataGate>
    </AccountGate>
  );
}