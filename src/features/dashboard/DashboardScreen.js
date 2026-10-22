import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  ScrollView,
  Text,
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
import { supabase } from '@config/supabase';
import AppPressable from '@components/AppPressable';
import { WalkthroughModal, useWalkthrough } from '@features/onboarding';
import FadeSlideIn from '@components/motion/FadeSlideIn';
import Float from '@components/motion/Float';
import Pop from '@components/motion/Pop';
import { distances, durations, springs } from '@components/motion/motionTokens';
import useReduceMotion from '@components/motion/useReduceMotion';
import DAILY_TIPS from './data/dailyTips';
import {
  getNextDailyTipIndex,
  getSessionTipCacheKey,
} from './utils/dailyTip';

const AVATAR_PLACEHOLDER = require('@assets/icon-profile.png');
let cachedSessionTip = null;

const QUICK_ACTIONS = [
  { id: '1', label: 'Resume Editor', icon: '💼', color: '#6C4CE0' },
  { id: '2', label: 'Job Finder', icon: '🔍', color: '#C24CDE' },
  { id: '3', label: 'Interview Coach', icon: '🤖', color: '#33C46A' },
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

const useNativeDriver = Platform.OS !== 'web';

function DashboardPressable({
  children,
  contentStyle,
  onPressIn,
  onPressOut,
  ...props
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const reduceMotion = useReduceMotion();

  const animateScale = (toValue) => {
    scale.stopAnimation();
    if (reduceMotion) {
      scale.setValue(1);
      return;
    }

    Animated.spring(scale, {
      toValue,
      ...springs.press,
      useNativeDriver,
    }).start();
  };

  return (
    <AppPressable
      {...props}
      onPressIn={(event) => {
        animateScale(distances.pressScale);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animateScale(1);
        onPressOut?.(event);
      }}
    >
      <Animated.View style={[contentStyle, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </AppPressable>
  );
}

function AnimatedProgressFill({ progress }) {
  const animatedProgress = useRef(new Animated.Value(progress)).current;
  const [trackWidth, setTrackWidth] = useState(0);
  const fillOffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-trackWidth / 2, 0],
  });

  useEffect(() => {
    const animation = Animated.timing(animatedProgress, {
      toValue: progress,
      duration: durations.progress,
      useNativeDriver,
    });
    animation.start();
    return () => animation.stop();
  }, [animatedProgress, progress]);

  return (
    <View
      style={styles.progressTrack}
      onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
    >
      <Animated.View
        style={[
          styles.progressFill,
          {
            transform: [{ translateX: fillOffset }, { scaleX: animatedProgress }],
          },
        ]}
      />
    </View>
  );
}

export default function DashboardScreen({ navigation, route }) {
  const [pressedId, setPressedId] = useState(null);
  const { profile, isGuest, session, loading: profileLoading } = useProfile();
  const { hasPracticed } = usePractice();
  const { applications } = useApplications();
  const { resumeData } = useResume();
  const userId = session?.user?.id;
  const dashboardReady = Boolean(userId && !profileLoading && profile?.id === userId);
  const walkthrough = useWalkthrough(userId, dashboardReady);
  const sessionCacheKey = getSessionTipCacheKey(session);
  const [dailyTip, setDailyTip] = useState(
    cachedSessionTip?.key === sessionCacheKey
      ? cachedSessionTip.tip
      : DAILY_TIPS[0],
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') cachedSessionTip = null;
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId || !sessionCacheKey) {
      setDailyTip(null);
      return undefined;
    }

    let isActive = true;
    if (cachedSessionTip?.key === sessionCacheKey) {
      setDailyTip(cachedSessionTip.tip || DAILY_TIPS[0]);
      cachedSessionTip.promise.then((tip) => {
        if (isActive) setDailyTip(tip);
      });
    } else {
      const entry = { key: sessionCacheKey, tip: null, promise: null };
      entry.promise = getNextDailyTipIndex(userId, DAILY_TIPS.length).then((index) => {
        const tip = DAILY_TIPS[index] || DAILY_TIPS[0];
        entry.tip = tip;
        return tip;
      });
      cachedSessionTip = entry;
      entry.promise.then((tip) => {
        if (isActive) setDailyTip(tip);
      });
    }

    return () => {
      isActive = false;
    };
  }, [sessionCacheKey, userId]);

  useEffect(() => {
    if (!route?.params?.replayWalkthrough || !walkthrough.ready) return;
    walkthrough.replay();
    navigation.setParams({ replayWalkthrough: undefined });
  }, [navigation, route?.params?.replayWalkthrough, walkthrough.ready, walkthrough.replay]);

  const displayName = profile?.first_name || profile?.username || 'there';
  const filledCount = PROFILE_FIELDS.filter((key) => !!profile?.[key]).length;
  const profileProgress = profile ? filledCount / PROFILE_FIELDS.length : 0;
  const isProfileComplete = !!profile && filledCount === PROFILE_FIELDS.length;
  const isResumeComplete = areRequiredResumeSectionsComplete(resumeData);
  const hasAppliedToJob = applications.length > 0;

  const handleQuickAction = (action) => {
    if (action.label === 'Learning Hub') {
      navigation.navigate('LearningHub');
    } else if (action.label === 'Job Finder') {
      navigation.navigate('JobFinder');
    } else if (action.label === 'Interview Coach') {
      navigation.navigate('AIInterviewCoach');
    } else if (action.label === 'Resume Editor') {
      navigation.navigate('ResumeBuilder');
    }
  };

  const handleChecklistPress = (item) => {
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
        <FadeSlideIn delay={0}>
          <Text style={styles.greeting}>Hello, {displayName}!👋</Text>
        </FadeSlideIn>

        <FadeSlideIn delay={45}>
          <DashboardPressable
            style={styles.profileCard}
            contentStyle={styles.profileCardContents}
            onPress={() => {
              navigation.navigate('Profile');
            }}
          >
            <View style={styles.profileTextWrap}>
              <Text style={styles.profileTitle}>Complete your profile</Text>
              <Text style={styles.profileSubtitle}>
                {Math.round(profileProgress * 100)}% complete
              </Text>
              <AnimatedProgressFill progress={profileProgress} />
            </View>
            <Float phaseOffset={0}>
              <Image
                source={
                  profile?.avatar_url
                    ? { uri: profile.avatar_url }
                    : AVATAR_PLACEHOLDER
                }
                style={styles.avatar}
              />
            </Float>
          </DashboardPressable>
        </FadeSlideIn>

        <FadeSlideIn delay={90}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </FadeSlideIn>
        <View style={styles.quickActionsRow}>
          {QUICK_ACTIONS.map((action, index) => {
            const isPressed = pressedId === action.id;
            return (
              <FadeSlideIn
                key={action.id}
                delay={120 + index * 35}
                style={styles.quickActionEntrance}
              >
                <DashboardPressable
                  style={styles.quickActionWrap}
                  contentStyle={styles.quickActionContents}
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
                    <Float phaseOffset={index * 500}>
                      <Text style={styles.quickActionIcon}>{action.icon}</Text>
                    </Float>
                    {isGuest && ['Resume Editor', 'Job Finder', 'Interview Coach'].includes(action.label) ? (
                      <View style={styles.lockBadge} accessibilityRole="image" accessibilityLabel="Locked feature">
                        <Text style={styles.lockBadgeText}>🔒</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.quickActionLabel}>{action.label}</Text>
                </DashboardPressable>
              </FadeSlideIn>
            );
          })}
        </View>

        <FadeSlideIn delay={260}>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Daily tip</Text>
            <Text
              style={styles.tipBody}
              accessible
              accessibilityRole="text"
              accessibilityLabel={dailyTip || DAILY_TIPS[0]}
            >
              {dailyTip || DAILY_TIPS[0]}
            </Text>
          </View>
        </FadeSlideIn>

        <FadeSlideIn delay={300}>
          <View style={styles.checklistCard}>
            <Text style={styles.checklistTitle}>Career Preparation</Text>
            <Text style={styles.checklistSubtitle}>
              Small steps to help you get career-ready.
            </Text>
            {CAREER_CHECKLIST.map((item, index) => {
              const isComplete = isChecklistItemComplete(item);
              return (
                <FadeSlideIn key={item.label} delay={350 + index * 12}>
                  <DashboardPressable
                    style={styles.checklistItem}
                    contentStyle={styles.checklistItemContents}
                    onPress={() => handleChecklistPress(item)}
                  >
                    <Pop value={isComplete}>
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
                    </Pop>
                    <Text style={styles.checklistItemText}>{item.label}</Text>
                    <Text style={styles.checklistChevron}>›</Text>
                  </DashboardPressable>
                </FadeSlideIn>
              );
            })}
          </View>
        </FadeSlideIn>
      </ScrollView>
      <WalkthroughModal
        visible={walkthrough.visible}
        stepIndex={walkthrough.stepIndex}
        saveError={walkthrough.saveError}
        onBack={() => walkthrough.setStepIndex((index) => Math.max(0, index - 1))}
        onNext={walkthrough.next}
        onSkip={walkthrough.skip}
        onDontShowAgain={walkthrough.saveAndClose}
      />
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
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
  },
  profileCardContents: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  quickActionEntrance: { width: '23%' },
  quickActionWrap: { alignItems: 'center', width: '100%' },
  quickActionContents: { alignItems: 'center', width: '100%' },
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
    backgroundColor: '#F8F7FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  checklistItemContents: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
