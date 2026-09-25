import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';

// Replace with your own asset, e.g. require('../assets/avatar.png')
const AVATAR_PLACEHOLDER = require('@assets/icon-profile.png');

const PROGRESS_ITEMS = [
  { id: '1', label: 'Resume completed', done: true },
  { id: '2', label: 'Interview practice', done: true },
  { id: '3', label: 'Apply for internship', done: false },
];

const QUICK_ACTIONS = [
  { id: '1', label: 'Resume Editor', icon: '📄', color: '#6C4CE0' },
  { id: '2', label: 'Job Finder', icon: '🔍', color: '#C24CDE', screen: 'JobFinder' },
  { id: '3', label: 'AI Coach', icon: '🤖', color: '#33C46A' },
  { id: '4', label: 'Skills Roadmap', icon: '🗺️', color: '#F0637D' },
];

export default function DashboardScreen({
  navigation,
  userName = 'JP',
  profileProgress = 0.8,
}) {
  // Tracks which quick-action tile is currently pressed
  const [pressedId, setPressedId] = useState(null);

  const handleQuickAction = (action) => {
    if (action.label === 'Skills Roadmap') {
      navigation.navigate('CareerRoadmap', {
        goal: 'Become a Software Engineer',
        estimatedTime: '5 Months',
      });
      return;
    }
    if (action.label === 'Job Finder') {
      navigation.navigate('JobFinder');
      return;
    }
    if (action.label === 'AI Coach') {
      navigation.navigate('AIInterviewCoach');
      return;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <Text style={styles.greeting}>Hello, {userName}!👋</Text>

        {/* Profile completion card */}
        <TouchableOpacity
          style={styles.profileCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.profileTextWrap}>
            <Text style={styles.profileTitle}>Complete your profile</Text>
            <Text style={styles.profileSubtitle}>
              {Math.round(profileProgress * 100)}% complete
            </Text>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${profileProgress * 100}%` },
                ]}
              />
            </View>
          </View>
          <Image source={AVATAR_PLACEHOLDER} style={styles.avatar} />
        </TouchableOpacity>

        {/* Quick Actions section */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsRow}>
          {QUICK_ACTIONS.map((action) => {
            const isPressed = pressedId === action.id;
            return (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionWrap}
                activeOpacity={0.8}
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
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Daily tip */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Daily tip</Text>
          <Text style={styles.tipBody}>
            Small steps today,{'\n'}big opportunities tomorrow.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
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
  profileTextWrap: {
    flex: 1,
    paddingRight: 12,
  },
  profileTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 8,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E5EA',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#6C4CE0',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D6E4F0',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 12,
  },

  progressList: {
    marginBottom: 28,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  progressItemLabel: {
    fontSize: 14,
    color: '#1C1C1E',
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  quickActionWrap: {
    alignItems: 'center',
    width: '23%',
  },
  quickActionTile: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  // Highlighted-circle feedback: a light ring around the tile while
  // it's being pressed, so the tap registers visually before the
  // screen navigates away.
  quickActionTileActive: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  quickActionIcon: {
    fontSize: 24,
  },
  quickActionLabel: {
    fontSize: 11,
    textAlign: 'center',
    color: '#1C1C1E',
  },

  tipCard: {
    backgroundColor: '#AAB4F0',
    borderRadius: 16,
    padding: 18,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  tipBody: {
    fontSize: 13,
    lineHeight: 19,
    color: '#F1F1FB',
  },
});
