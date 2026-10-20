import React, { useMemo, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { getCareerById } from './careers';
import { TRACKS } from '../software-engineering/SoftwareEngineerRoadmap';
import useAllCoursesProgress, { getCourseStatus } from '../shared/progress/useAllCoursesProgress';
import { PURPLE } from '../shared/styles';

const TRACK_META = {
  'Software Engineer': {
    icon: '💻',
    color: '#6C4CE0',
    blurb: 'Build websites and apps, from the front end to the back end.',
  },
  'Data Analyst': {
    icon: '📊',
    color: '#33C46A',
    blurb: 'Turn raw data into charts, dashboards, and clear insights.',
  },
  'UI/UX Designer': {
    icon: '🎨',
    color: '#F0637D',
    blurb: 'Design clear, friendly experiences that people enjoy using.',
  },
};

export default function CareerTracksScreen({ navigation, route }) {
  const career = getCareerById(route?.params?.careerId);
  const trackIds = career?.trackIds || [];
  const resolvedTracks = useMemo(
    () => trackIds.map((trackId) => ({ ...TRACKS[trackId], name: trackId })).filter(Boolean),
    [trackIds],
  );

  const allCourses = useMemo(
    () =>
      resolvedTracks.flatMap((track) =>
        (track.steps || []).filter((step) => step.course).map((step) => step.course),
      ),
    [resolvedTracks],
  );

  const { progressByCourseId, refresh, loading, error } = useAllCoursesProgress(allCourses);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const trackCards = useMemo(
    () =>
      resolvedTracks.map((track) => {
        const steps = (track.steps || []).map((step) => ({
          ...step,
          status: step.course
            ? getCourseStatus(step.course, progressByCourseId[step.course.id])
            : 'not-started',
        }));
        const available = steps.filter((step) => step.course);
        const done = available.filter((step) => step.status === 'completed').length;
        const percent = available.length ? Math.round((done / available.length) * 100) : 0;

        return {
          ...track,
          steps,
          courseCount: available.length,
          percent,
        };
      }),
    [progressByCourseId, resolvedTracks],
  );

  const handleTrackPress = (track) => {
    if (!track?.courseCount) return;
    navigation.navigate('CareerRoadmap', { goal: track.name });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{career?.title || 'Career tracks'}</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {trackCards.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No tracks available yet.</Text>
            <Text style={styles.emptyText}>This career does not have any courses connected to it right now.</Text>
          </View>
        ) : (
          trackCards.map((track) => {
            const meta = TRACK_META[track.name] || { icon: '📚', color: PURPLE, blurb: '' };
            const comingSoon = !track.courseCount;
            const progressState = error ? 'Could not load progress' : loading ? 'Loading progress…' : `${track.percent}%`;

            return (
              <TouchableOpacity
                key={track.name}
                accessibilityRole="button"
                accessibilityLabel={`${track.name}, ${comingSoon ? 'coming soon' : 'available'}`}
                style={[styles.card, comingSoon && styles.cardMuted]}
                activeOpacity={0.85}
                onPress={() => handleTrackPress(track)}
              >
                <View style={[styles.iconBadge, { backgroundColor: meta.color }]}>
                  <Text style={styles.iconText}>{meta.icon}</Text>
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{track.name}</Text>
                  <Text style={styles.meta}>{comingSoon ? 'Coming soon' : `${track.courseCount} courses`}</Text>
                  {!!meta.blurb && <Text style={styles.desc} numberOfLines={2}>{meta.blurb}</Text>}

                  {!comingSoon && (
                    <View style={styles.progressRow}>
                      {error ? (
                        <Text style={styles.progressError}>Progress unavailable</Text>
                      ) : loading ? (
                        <Text style={styles.progressLoading}>Loading progress…</Text>
                      ) : (
                        <>
                          <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: `${track.percent}%` }]} />
                          </View>
                          <Text style={styles.progressText}>{progressState}</Text>
                        </>
                      )}
                    </View>
                  )}
                </View>

                {!comingSoon && <Text style={styles.chevron}>›</Text>}
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 32,
  },
  backText: {
    fontSize: 24,
    color: '#111827',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  spacer: {
    width: 32,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 24,
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  cardMuted: {
    opacity: 0.6,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 22,
  },
  cardBody: {
    flex: 1,
    marginHorizontal: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  meta: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  desc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: PURPLE,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
  progressLoading: {
    fontSize: 11,
    color: '#6B7280',
  },
  progressError: {
    fontSize: 11,
    color: '#DC2626',
  },
  chevron: {
    fontSize: 22,
    color: '#C7C7CC',
  },
  emptyState: {
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});
