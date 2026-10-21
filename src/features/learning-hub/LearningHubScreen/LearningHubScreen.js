// Learning Hub entrance. Same look as JobFinderScreen.
//   view 'tracks'  -> the 3 tracks
//   view 'courses' -> the courses of the track the user tapped
// Tapping a course opens that course's own lessons screen (CourseRunner),
// so nothing about the lessons changes.
import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import AppPressable from '@components/AppPressable';
import AnimatedStage from '@components/motion/AnimatedStage';
import FadeSlideIn from '@components/motion/FadeSlideIn';
import { ALL_COURSES, TRACKS } from '../careers/registry';
import useAllCoursesProgress, { getCourseStatus } from '../shared/progress/useAllCoursesProgress';
import { CAREERS, getCareerById } from '../careers/careers';
import { PURPLE } from '../shared/styles';

const TRACK_NAMES = Object.keys(TRACKS);

// Every course of every track, so progress loads with one query per table.
// Look of each track card. A new track in TRACKS still works without an entry here.
const TRACK_META = {
  'Security Analyst': {
    icon: '🛡️',
    color: '#2E7DFF',
    blurb: 'Monitor systems, recognize concerns, and support authorized defense.',
  },
  'Security Governance and Compliance': {
    icon: '📋',
    color: '#2F8F83',
    blurb: 'Understand security policy, risk, privacy, and responsible oversight.',
  },
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
const FALLBACK_META = { icon: '📚', color: PURPLE, blurb: '' };

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'not-started', label: 'Not started' },
  { key: 'in-progress', label: 'In progress' },
  { key: 'completed', label: 'Completed' },
];

const BUTTON_LABEL = {
  'not-started': 'Start',
  'in-progress': 'Continue',
  completed: 'Review',
};

export default function LearningHubScreen({ navigation }) {
  const [view, setView] = useState('careers'); // 'careers' | 'tracks' | 'courses'
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [progressLoaded, setProgressLoaded] = useState(false);

  // Saved progress. Reload whenever the screen is focused, so it also updates
  // after the user comes back from a course.
  const { progressByCourseId, refresh, loading, error } = useAllCoursesProgress(ALL_COURSES);

  useFocusEffect(
    useCallback(() => {
      setView('careers');
      setSelectedTrack(null);
      setSelectedCareerId(null);
      setQuery('');
      setFilter('all');
      setProgressLoaded(false);
      refresh().finally(() => setProgressLoaded(true));
    }, [refresh]),
  );

  // Android back button: from the courses list go back to the tracks.
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        if (view === 'courses') {
          setSelectedTrack(null);
          setView('tracks');
          return true;
        }
        if (view === 'tracks') {
          setSelectedCareerId(null);
          setView('careers');
          return true;
        }
        return false;
      });
      return () => sub.remove();
    }, [view]),
  );

  // Each track with its steps, their status, and its overall progress.
  const tracks = useMemo(
    () =>
      TRACK_NAMES.map((name) => {
        const track = TRACKS[name];
        const steps = track.steps.map((step) => ({
          ...step,
          status: step.course
            ? getCourseStatus(step.course, progressByCourseId[step.course.id])
            : 'not-started',
        }));
        const available = steps.filter((step) => step.course);
        const done = available.filter((step) => step.status === 'completed').length;

        return {
          id: name,
          name: track.title || name,
          subtitle: track.subtitle || '',
          steps,
          courseCount: available.length,
          percent: available.length ? Math.round((done / available.length) * 100) : 0,
        };
      }),
    [progressByCourseId],
  );

  const currentTrack = tracks.find((track) => track.id === selectedTrack);

  const visibleCourses = useMemo(() => {
    if (!currentTrack) return [];
    const q = query.trim().toLowerCase();

    return currentTrack.steps.filter((step) => {
      if (!step.course) return false; // only steps that have a real course
      const matchesFilter = filter === 'all' || step.status === filter;
      const matchesQuery =
        !q ||
        step.title.toLowerCase().includes(q) ||
        (step.description || '').toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [currentTrack, query, filter]);

  // ---------- Actions ----------
  const openTrack = (track) => {
    if (!track.courseCount) return; // "Coming soon" tracks do nothing
    setSelectedTrack(track.id);
    setQuery('');
    setFilter('all');
    setView('courses');
  };

  const openCareer = (career) => {
    if (career.status === 'available') {
      setSelectedCareerId(career.id);
      setQuery('');
      setView('tracks');
      return;
    }
    navigation.navigate('CareerDetail', { careerId: career.id });
  };

  const handleBack = () => {
    if (view === 'courses') {
      setSelectedTrack(null);
      setView('tracks');
      return;
    }
    if (view === 'tracks') {
      setSelectedCareerId(null);
      setView('careers');
      return;
    }
    navigation.navigate('Dashboard');
  };

  const openCourse = (step) => {
    if (!step?.route) return;
    navigation.navigate(step.route);
  };

  const currentCareer = getCareerById(selectedCareerId) || getCareerById('software-engineering');
  // Career progress is derived from the underlying course statuses, not saved as a
  // separate career record. The percentage is completed courses divided by total
  // courses in that career, using the same per-course status rule as the roadmap.
  const title = view === 'courses' && currentTrack ? currentTrack.name : view === 'tracks' && currentCareer ? currentCareer.title : 'Learning Hub';

  const filteredCareers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CAREERS.filter((career) => !q || career.title.toLowerCase().includes(q));
  }, [query]);

  const renderProgress = (percent) => {
    if (loading || !progressLoaded) {
      return <Text style={styles.progressLoading}>Loading progress…</Text>;
    }
    if (error) {
      return <Text style={styles.progressError}>Progress unavailable</Text>;
    }

    return (
      <>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${percent}%` }]} />
        </View>
        <Text style={styles.progressText}>{percent}%</Text>
      </>
    );
  };

  const renderCareers = () => (
    <View style={styles.flex}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search careers..."
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
        {query.trim() ? (
          <AppPressable onPress={() => setQuery('')} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear</Text>
          </AppPressable>
        ) : null}
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        <Text style={styles.intro}>Pick a career to explore.</Text>

        {filteredCareers.length === 0 ? (
          <Text style={styles.empty}>No careers match your search</Text>
        ) : (
          filteredCareers.map((career, index) => {
            const isAvailable = career.status === 'available';
            const careerCourseIds = (career.trackIds || [])
              .map((trackId) => TRACKS[trackId])
              .filter(Boolean)
              .flatMap((track) => (track.steps || []).filter((step) => step.course).map((step) => step.course));
            const totalCourses = careerCourseIds.length;
            const completedCourses = careerCourseIds.filter((course) => getCourseStatus(course, progressByCourseId[course.id]) === 'completed').length;
            const percent = totalCourses ? Math.round((completedCourses / totalCourses) * 100) : 0;

            return (
              <FadeSlideIn key={career.id} delay={Math.min(index * 65, 380)}>
                <AppPressable
                  accessibilityRole="button"
                  accessibilityLabel={`${career.title}, ${career.status}`}
                  style={[styles.card, !isAvailable && styles.cardMuted]}
                  onPress={() => openCareer(career)}
                >
                  <View style={[styles.icon, { backgroundColor: career.color }]}>
                    <Text style={styles.iconEmoji}>{career.icon}</Text>
                  </View>

                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{career.title}</Text>
                    <Text style={styles.meta}>{isAvailable ? `${career.trackIds.length} tracks` : 'Coming soon'}</Text>
                    <Text style={styles.desc} numberOfLines={2}>{career.subtitle}</Text>

                    {isAvailable ? (
                      <View style={styles.progressRow}>
                        {renderProgress(percent)}
                      </View>
                    ) : (
                      <View style={styles.comingSoonBadge}>
                        <Text style={styles.comingSoonLabel}>Coming soon</Text>
                      </View>
                    )}
                  </View>

                  {isAvailable && <Text style={styles.chevron}>›</Text>}
                </AppPressable>
              </FadeSlideIn>
            );
          })
        )}
      </ScrollView>
    </View>
  );

  // ---------- Step 1: tracks ----------
  const renderTracks = () => {
    const careerTracks = tracks.filter((track) =>
      (currentCareer?.trackIds || []).includes(track.id),
    );

    return (
      <ScrollView contentContainerStyle={styles.listContent}>
        <Text style={styles.intro}>Pick a track to see its courses.</Text>

        {careerTracks.length === 0 ? (
          <Text style={styles.empty}>No tracks match this career yet.</Text>
        ) : (
          careerTracks.map((track, index) => {
            const meta = TRACK_META[track.name] || FALLBACK_META;
            const comingSoon = !track.courseCount;

            return (
                    <FadeSlideIn
                    key={track.name}
                delay={Math.min(index * 65, 380)}
                >
                <AppPressable
                  accessibilityRole="button"
                  accessibilityLabel={`${track.name}, ${
                    comingSoon ? 'coming soon' : 'available'
                  }`}
                  style={[
                    styles.card,
                    comingSoon && styles.cardMuted,
                  ]}
                  disabled={comingSoon}
                  onPress={() => openTrack(track)}
                >
                  <View
                    style={[
                      styles.icon,
                      { backgroundColor: meta.color },
                    ]}
                  >
                    <Text style={styles.iconEmoji}>
                      {meta.icon}
                    </Text>
                  </View>

                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>
                      {track.name}
                    </Text>

                    <Text style={styles.meta}>
                      {comingSoon
                        ? 'Coming soon'
                        : `${track.courseCount} courses`}
                    </Text>

                    {(meta.blurb || track.subtitle) && (
                      <Text style={styles.desc} numberOfLines={2}>
                        {meta.blurb || track.subtitle}
                      </Text>
                    )}
                  </View>
                </AppPressable>
              </FadeSlideIn>
                    </Text>
                    {!!meta.blurb && (
                      <Text style={styles.desc} numberOfLines={2}>
                        {meta.blurb}
                      </Text>
                    )}

                    {!comingSoon && (
                      <View style={styles.progressRow}>
                        {renderProgress(track.percent)}
                      </View>
                    )}
                  </View>

                  {!comingSoon && <Text style={styles.chevron}>›</Text>}
                </AppPressable>
              </FadeSlideIn>
            );
          })
        )}
      </ScrollView>
    );
  };

  // ---------- Step 2: courses of the chosen track ----------
  const renderCourseCard = ({ item }) => {
    if (!item?.course) return null;

    const done = item.status === 'completed';
    const lessonCount = item.course.lessons ? item.course.lessons.length : 0;
    const code = (item.course.shortCode || item.title).slice(0, 4).toUpperCase();

    return (
      <AppPressable style={styles.card} activeOpacity={0.85} onPress={() => openCourse(item)}>
        <View style={styles.courseIcon}>
          <Text style={styles.courseIconText}>{code}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.meta}>{lessonCount} lessons</Text>
          <Text style={styles.desc} numberOfLines={2}>
            {item.description}
          </Text>
        </View>

        <View style={[styles.actionBtn, done && styles.actionBtnDone]}>
          <Text style={[styles.actionText, done && styles.actionTextDone]}>
            {BUTTON_LABEL[item.status] || 'Start'}
          </Text>
        </View>
      </AppPressable>
    );
  };

  const renderCourses = () => {
    if (!currentTrack) {
      return renderTracks();
    }

    return (
      <View style={styles.flex}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for courses..."
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
        </View>

        <Text style={styles.sectionLabel}>Status</Text>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {FILTERS.map((f) => {
              const active = f.key === filter;
              return (
                <AppPressable
                  key={f.key}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setFilter(f.key)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{f.label}</Text>
                </AppPressable>
              );
            })}
          </ScrollView>
        </View>

        <FlatList
          data={visibleCourses}
          keyExtractor={(item) => item.id}
          renderItem={renderCourseCard}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.empty}>No courses match your search. Try another keyword or status.</Text>
          }
        />

        <AppPressable
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('CareerRoadmap', {
            goal: selectedTrack,
            trackIds: currentCareer?.trackIds,
          })}
        >
          <Text style={styles.primaryBtnText}>View Roadmap</Text>
        </AppPressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <AppPressable
          onPress={handleBack}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backText}>{'<'}</Text>
        </AppPressable>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.backBtn} />
      </View>

      {view === 'careers' && (
        <AnimatedStage stageKey={view} direction={1}>
          {renderCareers()}
        </AnimatedStage>
      )}
      {view === 'tracks' && (
        <AnimatedStage stageKey={view} direction={1}>
          {renderTracks()}
        </AnimatedStage>
      )}
      {view === 'courses' && (
        <AnimatedStage stageKey={view} direction={1}>
          {renderCourses()}
        </AnimatedStage>
      )}
    </SafeAreaView>
  );
}

// Values copied from JobFinderScreen so both screens look the same.
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { width: 32 },
  backText: { fontSize: 22, color: '#111827' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },

  intro: { fontSize: 13, color: '#6B7280', marginBottom: 14 },

  searchBox: {
    marginHorizontal: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: { flex: 1, height: 44, fontSize: 14, paddingHorizontal: 10, color: '#111827' },
  clearButton: { paddingVertical: 6, paddingHorizontal: 8 },
  clearText: { color: PURPLE, fontWeight: '700', fontSize: 12 },

  sectionLabel: { marginTop: 16, marginHorizontal: 16, fontSize: 13, fontWeight: '700', color: '#111827' },
  chipRow: { paddingHorizontal: 16, paddingVertical: 10 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  chipActive: { backgroundColor: PURPLE, borderColor: PURPLE },
  chipText: { fontSize: 13, color: '#374151' },
  chipTextActive: { color: '#fff', fontWeight: '600' },

  listContent: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12, flexGrow: 1 },
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
  cardMuted: { opacity: 0.55 },
  cardBody: { flex: 1, marginHorizontal: 12 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#111827' },
  meta: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  desc: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  chevron: { fontSize: 22, color: '#C7C7CC' },

  // Track icon (emoji on a colored square)
  icon: {
    width: 44,
    height: 44,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: { fontSize: 22 },

  // Course icon (short code on a light square, like the company logos)
  courseIcon: {
    width: 44,
    height: 44,
    borderRadius: 11,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseIconText: { fontSize: 11, fontWeight: '800', color: PURPLE },

  progressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3, backgroundColor: PURPLE },
  progressText: { fontSize: 11, fontWeight: '600', color: '#6B7280', marginLeft: 8 },
  progressLoading: { fontSize: 11, color: '#6B7280' },
  progressError: { fontSize: 11, color: '#DC2626' },

  actionBtn: {
    backgroundColor: PURPLE,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionBtnDone: { backgroundColor: '#EDE9FE' },
  actionText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  actionTextDone: { color: PURPLE },

  primaryBtn: {
    backgroundColor: PURPLE,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  empty: { textAlign: 'center', color: '#6B7280', marginTop: 40, paddingHorizontal: 24 },
});