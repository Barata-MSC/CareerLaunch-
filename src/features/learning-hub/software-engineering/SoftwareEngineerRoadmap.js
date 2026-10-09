import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import htmlCourse from './html-course/course';
import cssCourse from './css-course/course';
import javascriptCourse from './javascript-course/course';
import gitCourse from './git-github-course/course';
import reactCourse from './react-course/course';
import nodeCourse from './nodejs-course/course';
import databaseCourse from './database-course/course';
import sqlCourse from './sql-course/course';
import dataVisualizationCourse from './data-visualization-course/course';
import statisticsCourse from './statistics-course/course'; 

import excelCourse from './excel-course/course';
import pandasCourse from './panda-course/course';
import designFundamentalsCourse from '../ui-ux-designer/design-fundamentals-course/course';
import userResearchCourse from '../ui-ux-designer/user-research-course/course';
import wireframingCourse from '../ui-ux-designer/wireframing-course/course';

import useAllCoursesProgress, { getCourseStatus } from '../shared/progress/useAllCoursesProgress';
import { PURPLE, GREEN } from '../shared/styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;



const COURSES = [
  htmlCourse,
  cssCourse,
  javascriptCourse,
  gitCourse,
  reactCourse,
  nodeCourse,
  databaseCourse,
  dataVisualizationCourse,
  statisticsCourse,
  excelCourse,
  pandasCourse,
  designFundamentalsCourse,
  userResearchCourse,
  wireframingCourse,
  sqlCourse,
];




const TRACKS = {
  'Software Engineer': {
    estimatedTime: '5 Months',
    steps: [
      {
        id: '1',
        title: 'HTML',
        course: htmlCourse,
        route: 'HTMLCourse',
        description: 'The building blocks of every web page: structuring content with tags, forms, and semantic elements.',
      },
      {
        id: '2',
        title: 'CSS',
        course: cssCourse,
        route: 'CSSCourse',
        description: 'Style layouts, use Flexbox/Grid, and make responsive designs.',
      },
      {
        id: '3',
        title: 'JavaScript',
        course: javascriptCourse,
        route: 'JavaScriptCourse',
        description: 'Learn variables, functions, DOM manipulation, and async code — the language that powers interactivity.',
      },
      {
        id: '4',
        title: 'React',
        course: reactCourse,
        route: 'ReactCourse',
        description: 'Learn components, props, state, and hooks. This is the step that turns JS into real apps.',
      },
      {
        id: '5',
        title: 'Node js',
        course: nodeCourse,
        route: 'NodeCourse',
        description: 'Server-side JavaScript: build APIs and handle backend logic.',
      },
      {
        id: '6',
        title: 'Database',
        course: databaseCourse,
        route: 'DatabaseCourse',
        description: 'Storing and querying data with SQL or NoSQL databases like PostgreSQL or MongoDB.',
      },
      {
        id: '7',
        title: 'Git & Github',
        course: gitCourse,
        route: 'GitCourse',
        description: 'Version control and collaboration — tracking changes and working with a team.',
      },
    ],
  },
  'Data Analyst': {
    estimatedTime: '4 Months',
    steps: [
      {
        id: '1',
        title: 'Excel & Spreadsheets',
        course: excelCourse,
        route: 'ExcelCourse',
        description: 'Clean data, use formulas, and build pivot tables to summarize information.',
      },
      {
        id: '2',
        title: 'SQL',
        course: sqlCourse,
        route: 'SQLCourse',
        description: 'Query, join, and filter data across relational database tables.',
      },
      {
        id: '3',
        title: 'Python (Pandas)',
        course: pandasCourse,
        route: 'PandasCourse',
        description: 'Clean and analyze datasets using Python and the Pandas library.',
      },
      {
        id: '4',
        title: 'Data Visualization',
        course: dataVisualizationCourse,
        route: 'DataCourse',
        description: 'Tell stories with data using charts and dashboards (e.g. Matplotlib, Power BI, Tableau).',
      },
      {
        id: '5',
        title: 'Statistics',
        course: statisticsCourse,
        route: 'StatisticsCourse',
        description: 'Hypothesis testing, distributions, and the math behind trustworthy insights.',
      },
      {
        id: '6',
        title: 'Dashboards (Power BI / Tableau)',
        description: 'Build interactive dashboards stakeholders can explore on their own.',
      },
    ],
  },
  'UI/UX Designer': {
    estimatedTime: '3 Months',
    steps: [
      {
        id: '1',
        title: 'Design Fundamentals',
        course: designFundamentalsCourse,
        route: 'DesignFundamentalsCourse',
        description: 'Color theory, typography, spacing, and visual hierarchy.',
      },
      {
        id: '2',
        title: 'User Research',
        course: userResearchCourse,
        route: 'UserResearchCourse',
        description: 'Interview users, run surveys, and turn findings into actionable insights.',
      },
      {
        id: '3',
        title: 'Wireframing',
        course: wireframingCourse,
        route: 'WireframingCourse',
        description: 'Practice low-fidelity wireframes to map out layouts before visual design.',
      },
      {
        id: '4',
        title: 'Figma / Prototyping',
        description: 'Build interactive, high-fidelity prototypes that feel like the real app.',
      },
      {
        id: '5',
        title: 'Usability Testing',
        description: 'Test your designs with real users and iterate on the feedback.',
      },
      {
        id: '6',
        title: 'Design Systems',
        description: 'Build reusable components and a consistent design language.',
      },
    ],
  },
};

const TRACK_NAMES = Object.keys(TRACKS);

const STATUS_LABEL = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  'not-started': 'Not started',
};

function ProgressBar({ percent }) {
  return (
    <View style={styles.progressWrap}>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.progressLabel}>{percent}% complete</Text>
    </View>
  );
}

function StepIndicator({ status, isLast }) {
  return (
    <View style={styles.indicatorColumn}>
      <View
        style={[
          styles.circle,
          status === 'completed' && styles.circleCompleted,
          status === 'in-progress' && styles.circleInProgress,
          status === 'not-started' && styles.circleNotStarted,
        ]}
      >
        {status === 'completed' && <Text style={styles.checkMark}>✓</Text>}
        {status === 'in-progress' && <View style={styles.innerDot} />}
      </View>
      {!isLast && <View style={styles.connectorLine} />}
    </View>
  );
}

export default function CareerRoadmapScreen({ navigation, route }) {
  // If a valid track name is passed in via navigation params, start there.
  // Otherwise default to the first track in the TRACKS object.
  const initialTrack =
    route?.params?.goal && TRACKS[route.params.goal]
      ? route.params.goal
      : TRACK_NAMES[0];

  const [selectedTrack, setSelectedTrack] = useState(initialTrack);
  // Which step's detail panel is currently open (null = closed)
  const [selectedStep, setSelectedStep] = useState(null);

  // Saved progress for every course. The roadmap stays mounted behind the course
  // screens, so reload whenever it comes back into focus (including the first time).
  const { progressByCourseId, refresh } = useAllCoursesProgress(COURSES);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const trackData = TRACKS[selectedTrack];
  const roadmapSteps = useMemo(
    () =>
      trackData.steps.map((step) => ({
        ...step,
        status: step.course
          ? getCourseStatus(step.course, progressByCourseId[step.course.id])
          : 'not-started',
      })),
    [trackData, progressByCourseId],
  );

  const completedCount = roadmapSteps.filter((s) => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / roadmapSteps.length) * 100);

  const handleTrackPress = (trackName) => {
    setSelectedTrack(trackName);
  };

  const currentIndex = TRACK_NAMES.indexOf(selectedTrack);

  const goToTrack = (direction) => {
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % TRACK_NAMES.length
        : (currentIndex - 1 + TRACK_NAMES.length) % TRACK_NAMES.length;
    setSelectedTrack(TRACK_NAMES[nextIndex]);
  };

  const panResponder = useRef(
    PanResponder.create({

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return (
          Math.abs(gestureState.dx) > 20 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.5
        );
      },
      onPanResponderRelease: (evt, gestureState) => {
        const SWIPE_THRESHOLD = 50;
        if (gestureState.dx < -SWIPE_THRESHOLD) {
          goToTrack('next'); // swiped left
        } else if (gestureState.dx > SWIPE_THRESHOLD) {
          goToTrack('prev'); // swiped right
        }
      },
    })
  ).current;

  const handleStepPress = (step) => {
    // Steps that have a course open it; the others show the detail panel.
    if (step.route) {
      navigation.navigate(step.route);
      return;
    }
    setSelectedStep(step);
  };

  const closeModal = () => setSelectedStep(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Career Roadmap</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        {...panResponder.panHandlers}
      >
        <View style={styles.goalCard}>
          <Text style={styles.goalLabel}>Your goal</Text>
          <Text style={styles.goalText}>Become a {selectedTrack}</Text>
        </View>

        <Text style={styles.sectionLabel}>Choose a track</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.chipRow}
        >
          {TRACK_NAMES.map((trackName) => {
            const active = trackName === selectedTrack;
            return (
              <TouchableOpacity
                key={trackName}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => handleTrackPress(trackName)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {trackName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ProgressBar percent={progressPercent} />

        <Text style={styles.sectionTitle}>Your Roadmap</Text>

        <View style={styles.roadmapList}>
          {roadmapSteps.map((step, index) => {
            return (
              <TouchableOpacity
                key={step.id}
                style={styles.stepRow}
                activeOpacity={0.6}
                onPress={() => handleStepPress(step)}
              >
                <StepIndicator
                  status={step.status}
                  isLast={index === roadmapSteps.length - 1}
                />
                <View style={styles.stepTextWrap}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text
                    style={[
                      styles.stepStatus,
                      step.status === 'in-progress' && styles.stepStatusActive,
                    ]}
                  >
                    {STATUS_LABEL[step.status]}
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>


      </ScrollView>

      <Modal
        visible={!!selectedStep}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeModal}
        >
          <View style={styles.modalCard}>
            {selectedStep && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                <View style={styles.modalHeaderRow}>
                  <View
                    style={[
                      styles.modalStatusDot,
                      selectedStep.status === 'completed' && styles.circleCompleted,
                      selectedStep.status === 'in-progress' && styles.circleInProgress,
                      selectedStep.status === 'not-started' && styles.circleNotStarted,
                    ]}
                  />
                  <Text style={styles.modalTitle}>{selectedStep.title}</Text>
                </View>

                <Text
                  style={[
                    styles.modalStatusBadge,
                    selectedStep.status === 'completed' && styles.badgeCompleted,
                    selectedStep.status === 'in-progress' && styles.badgeInProgress,
                    selectedStep.status === 'not-started' && styles.badgeNotStarted,
                  ]}
                >
                  {STATUS_LABEL[selectedStep.status]}
                </Text>

                <Text style={styles.modalDescription}>
                  {selectedStep.description}
                </Text>

                <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

// PURPLE and GREEN come from ../shared/styles so the roadmap matches the courses.
const GRAY = '#D9D9D9';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#1A1A1A' },
  backArrow: { fontSize: 30, color: '#1A1A1A', lineHeight: 30 },
  checkMark: { color: '#fff', fontSize: 14, fontWeight: '700' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  goalCard: {
    backgroundColor: PURPLE,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },
  goalLabel: { color: '#E4DBFF', fontSize: 13, marginBottom: 6 },
  goalText: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 26 },

  // Track picker (mirrors JobFinderScreen's category chips)
  sectionLabel: { fontSize: 13, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
  chipRow: { paddingVertical: 10 },
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

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  roadmapList: { marginBottom: 24 },
  stepRow: { flexDirection: 'row' },
  indicatorColumn: { alignItems: 'center', width: 32 },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  circleCompleted: { backgroundColor: GREEN, borderColor: GREEN },
  circleInProgress: { backgroundColor: '#fff', borderColor: PURPLE },
  circleNotStarted: { backgroundColor: '#fff', borderColor: GRAY },
  innerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: PURPLE,
  },
  connectorLine: {
    width: 2,
    flex: 1,
    minHeight: 28,
    backgroundColor: GRAY,
  },
  stepTextWrap: { flex: 1, paddingBottom: 22, paddingLeft: 12 },
  chevron: { fontSize: 22, color: '#C7C7CC', paddingBottom: 22 },
  stepTitle: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  stepStatus: { fontSize: 13, color: '#9B9B9B', marginTop: 2 },
  stepStatusActive: { color: PURPLE, fontWeight: '600' },
  estimateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9E4FF',
    backgroundColor: '#F7F5FF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  estimateLabel: { color: PURPLE, fontWeight: '600', fontSize: 14 },
  estimateValue: { color: '#1A1A1A', fontWeight: '700', fontSize: 14 },

  // Progress bar
  progressWrap: { marginBottom: 24 },
  progressBarBackground: {
    height: 10,
    borderRadius: 5,
    backgroundColor: GRAY,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: PURPLE,
  },
  progressLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#7A7A7A',
    fontWeight: '600',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '82%',
    maxWidth: 320,
    maxHeight: SCREEN_HEIGHT * 0.4,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalStatusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    marginRight: 10,
  },
  modalTitle: { fontSize: 17, fontWeight: '700', color: '#1A1A1A' },
  modalStatusBadge: {
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  badgeCompleted: { backgroundColor: '#E5FAEF', color: GREEN },
  badgeInProgress: { backgroundColor: '#EFEAFF', color: PURPLE },
  badgeNotStarted: { backgroundColor: '#F1F1F1', color: '#8A8A8A' },
  modalDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4A4A4A',
    marginBottom: 14,
  },
  modalCloseButton: {
    backgroundColor: PURPLE,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
