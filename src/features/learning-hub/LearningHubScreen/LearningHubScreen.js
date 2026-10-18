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
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { TRACKS } from '../software-engineering/SoftwareEngineerRoadmap';
import useAllCoursesProgress, { getCourseStatus } from '../shared/progress/useAllCoursesProgress';
import { PURPLE } from '../shared/styles';
import { playSound } from '../../../utils/sounds';

const TRACK_NAMES = Object.keys(TRACKS);

// Every course of every track, so progress loads with one query per table.
const ALL_COURSES = Object.values(TRACKS)
  .flatMap((track) => track.steps.map((step) => step.course))
  .filter(Boolean);

// Look of each track card. A new track in TRACKS still works without an entry here.
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
  const [view, setView] = useState('tracks'); // 'tracks' | 'courses'
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  // Saved progress. Reload whenever the screen is focused, so it also updates
  // after the user comes back from a course.
  const { progressByCourseId, refresh } = useAllCoursesProgress(ALL_COURSES);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  // Android back button: from the courses list go back to the tracks.
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        if (view === 'courses') {
          setView('tracks');
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
          name,
          steps,
          courseCount: available.length,
          percent: available.length ? Math.round((done / available.length) * 100) : 0,
        };
      }),
    [progressByCourseId],
  );

  const currentTrack = tracks.find((track) => track.name === selectedTrack);

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
    setSelectedTrack(track.name);
    setQuery('');
    setFilter('all');
    setView('courses');
  };

  const handleBack = () => {
    if (view === 'courses') {
      setSelectedTrack(null);
      setView('tracks');
      return;
    }
    navigation.navigate('Dashboard');
  };

  const openCourse = (step) => {
    if (!step?.route) return;
    playSound('tap');
    navigation.navigate(step.route);
  };

  const title = view === 'courses' && currentTrack ? currentTrack.name : 'Learning Hub';

  // ---------- Step 1: tracks ----------
  const renderTracks = () => (
    <ScrollView contentContainerStyle={styles.listContent}>
      <Text style={styles.intro}>Pick a track to see its courses.</Text>

      {tracks.map((track) => {
        const meta = TRACK_META[track.name] || FALLBACK_META;
        const comingSoon = !track.courseCount;

        return (
          <TouchableOpacity
            key={track.name}
            style={[styles.card, comingSoon && styles.cardMuted]}
            activeOpacity={0.85}
            disabled={comingSoon}
            onPress={() => openTrack(track)}
          >
            <View style={[styles.icon, { backgroundColor: meta.color }]}>
              <Text style={styles.iconEmoji}>{meta.icon}</Text>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{track.name}</Text>
              <Text style={styles.meta}>
                {comingSoon
                  ? 'Coming soon'
                  : `${track.courseCount} courses`}
              </Text>
              {!!meta.blurb && (
                <Text style={styles.desc} numberOfLines={2}>
                  {meta.blurb}
                </Text>
              )}

              {!comingSoon && (
                <View style={styles.progressRow}>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${track.percent}%` }]} />
                  </View>
                  <Text style={styles.progressText}>{track.percent}%</Text>
                </View>
              )}
            </View>

            {!comingSoon && <Text style={styles.chevron}>›</Text>}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  // ---------- Step 2: courses of the chosen track ----------
  const renderCourseCard = ({ item }) => {
    if (!item?.course) return null;

    const done = item.status === 'completed';
    const lessonCount = item.course.lessons ? item.course.lessons.length : 0;
    const code = (item.course.shortCode || item.title).slice(0, 4).toUpperCase();

    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => openCourse(item)}>
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
      </TouchableOpacity>
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
                <TouchableOpacity
                  key={f.key}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setFilter(f.key)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{f.label}</Text>
                </TouchableOpacity>
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

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('CareerRoadmap', { goal: selectedTrack })}
        >
          <Text style={styles.primaryBtnText}>View Roadmap</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.backBtn} />
      </View>

      {view === 'tracks' ? renderTracks() : renderCourses()}
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
  },
  searchInput: { height: 44, fontSize: 14, paddingHorizontal: 10, color: '#111827' },

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