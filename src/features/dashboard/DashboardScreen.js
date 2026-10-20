import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../../context/ProfileContext';
import { usePractice } from '../../context/PracticeContext';
import { useApplications } from '../../context/ApplicationsContext';
import { useResume } from '../resume-builder/ResumeContext';
import { areRequiredResumeSectionsComplete } from '../resume-builder/validators';
import AppPressable from '@components/AppPressable';
import { playSound } from '../../utils/sounds';

const AVATAR_PLACEHOLDER = require('@assets/icon-profile.png');

const QUICK_ACTIONS = [
  { id: '1', label: 'Resume Editor', icon: '💼', color: '#6C4CE0' },
  { id: '2', label: 'Job Finder', icon: '🔍', color: '#C24CDE' },
  { id: '3', label: 'AI Coach', icon: '🤖', color: '#33C46A' },
  { id: '4', label: 'Learning Hub', icon: '📖', color: '#F0637D' },
];

const PROFILE_FIELDS = [
  'first_name',
  'last_name',
  'contact_number',
  'birthday',
  'avatar_url',
];

const CAREER_CHECKLIST = [
  { label: 'Complete your profile', route: 'Profile', key: 'profile' },
  { label: 'Prepare your resume', route: 'ResumeBuilder', key: 'resume' },
  { label: 'Practice interview questions', route: 'AIInterviewCoach', key: 'practice' },
  { label: 'Explore career opportunities', route: 'JobFinder', key: 'applications' },
];

export default function DashboardScreen({ navigation }) {
  const [pressedId, setPressedId] = useState(null);
  const { profile, isGuest } = useProfile();
  const { hasPracticed } = usePractice();
  const { applications } = useApplications();
  const { resumeData } = useResume();

  const displayName = profile?.first_name || profile?.username || 'there';
  const filledCount = PROFILE_FIELDS.filter((key) => !!profile?.[key]).length;
  const profileProgress = profile ? filledCount / PROFILE_FIELDS.length : 0;
  const isProfileComplete = !!profile && filledCount === PROFILE_FIELDS.length;
  const isResumeComplete = areRequiredResumeSectionsComplete(resumeData);
  const hasAppliedToJob = applications.length > 0;

  const handleQuickAction = (action) => {
    playSound('tap');
    if (action.label === 'Learning Hub') {
      navigation.navigate('LearningHub');
    } else if (action.label === 'Job Finder') {
      navigation.navigate('JobFinder');
    } else if (action.label === 'AI Coach') {
      navigation.navigate('AIInterviewCoach');
    } else if (action.label === 'Resume Editor') {
      navigation.navigate('ResumeBuilder');
    }
  };

  const handleChecklistPress = (item) => {
    playSound('tap');
    navigation.navigate(item.route);
  };

  const isChecklistItemComplete = (item) => {
    if (item.key === 'profile') return isProfileComplete;
    if (item.key === 'resume') return isResumeComplete;
    if (item.key === 'practice') return hasPracticed;
    if (item.key === 'applications') return hasAppliedToJob;
    return false;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Hello, {displayName}!👋</Text>

        <AppPressable
          style={styles.profileCard}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        >
          <View style={styles.profileTextWrap}>
            <Text style={styles.profileTitle}>Complete your profile</Text>
            <Text style={styles.profileSubtitle}>
              {Math.round(profileProgress * 100)}% complete
            </Text>
            <View style={styles.progressTrack}>
              <View
                style={[styles.progressFill, { width: `${profileProgress * 100}%` }]}
              />
            </View>
          </View>
          <Image
            source={
              profile?.avatar_url
                ? { uri: profile.avatar_url }
                : AVATAR_PLACEHOLDER
            }
            style={styles.avatar}
          />
        </AppPressable>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsRow}>
          {QUICK_ACTIONS.map((action) => {
            const isPressed = pressedId === action.id;
            return (
              <AppPressable
                key={action.id}
                style={styles.quickActionWrap}
                onPressIn={() => setPressedId(action.id)}
                onPressOut={() => setPressedId(null)}
                onPress={() => handleQuickAction(action)}
              >
                <View
                  style={[
                    styles.quickActionTile,
                    { backgroundColor: action.color },
                    isPressed && styles.quickActionTileActive,
                  ]}
                >
                  <Text style={styles.quickActionIcon}>{action.icon}</Text>
                  {isGuest && ['Resume Editor', 'Job Finder', 'AI Coach'].includes(action.label) ? (
                    <View style={styles.lockBadge} accessibilityRole="image" accessibilityLabel="Locked feature">
                      <Text style={styles.lockBadgeText}>🔒</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </AppPressable>
            );
          })}
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Daily tip</Text>
          <Text style={styles.tipBody}>{'Small steps today,\nbig opportunities tomorrow.'}</Text>
        </View>

        <View style={styles.checklistCard}>
          <Text style={styles.checklistTitle}>Career Preparation</Text>
          <Text style={styles.checklistSubtitle}>
            Small steps to help you get career-ready.
          </Text>
          {CAREER_CHECKLIST.map((item, index) => {
            const isComplete = isChecklistItemComplete(item);
            return (
              <AppPressable
                key={item.label}
                style={styles.checklistItem}
                onPress={() => handleChecklistPress(item)}
              >
                <View
                  style={[
                    styles.checklistNumber,
                    isComplete && styles.checklistNumberDone,
                  ]}
                >
                  <Text
                    style={[
                      styles.checklistNumberText,
                      isComplete && styles.checklistNumberTextDone,
                    ]}
                  >
                    {isComplete ? '✓' : index + 1}
                  </Text>
                </View>
                <Text style={styles.checklistItemText}>{item.label}</Text>
                <Text style={styles.checklistChevron}>›</Text>
              </AppPressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1C1C1E',
    marginBottom: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
  },
  profileTextWrap: { flex: 1, paddingRight: 12 },
  profileTitle: { fontSize: 15, fontWeight: '600', color: '#1C1C1E', marginBottom: 4 },
  profileSubtitle: { fontSize: 13, color: '#8E8E93', marginBottom: 8 },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E5EA',
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3, backgroundColor: '#6C4CE0' },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#D6E4F0' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  quickActionWrap: { alignItems: 'center', width: '23%' },
  quickActionTile: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    position: 'relative',
  },
  quickActionTileActive: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  quickActionIcon: { fontSize: 24 },
  lockBadge: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockBadgeText: { fontSize: 11 },
  quickActionLabel: { fontSize: 11, textAlign: 'center', color: '#1C1C1E' },
  tipCard: {
    backgroundColor: '#AAB4F0',
    borderRadius: 16,
    padding: 18,
    marginBottom: 22,
  },
  tipTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginBottom: 6 },
  tipBody: { fontSize: 13, lineHeight: 19, color: '#F1F1FB' },
  checklistCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  checklistTitle: { fontSize: 16, fontWeight: '700', color: '#1C1C1E', marginBottom: 4 },
  checklistSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: '#8E8E93',
    marginBottom: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F7FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  checklistNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EEE9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checklistNumberDone: { backgroundColor: '#DDF5E5' },
  checklistNumberText: { fontSize: 13, fontWeight: '700', color: '#6C4CE0' },
  checklistNumberTextDone: { color: '#1F9D55' },
  checklistItemText: { flex: 1, fontSize: 13, color: '#33333A' },
  checklistChevron: { fontSize: 20, color: '#B5B5B9', marginLeft: 8 },
});
