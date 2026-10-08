import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TRACKS = {
  'Software Engineer': {
    estimatedTime: '5 Months',
    steps: [
      {
        id: '1',
        title: 'HTML',
        status: 'completed',
        description: 'The building blocks of every web page. You know how to structure content with tags, forms, and semantic elements.',
      },
      {
        id: '2',
        title: 'CSS',
        status: 'completed',
        description: 'You can style layouts, use Flexbox/Grid, and make responsive designs.',
      },
      {
        id: '3',
        title: 'JavaScript',
        status: 'completed',
        description: 'You understand variables, functions, DOM manipulation, and async code — the language that powers interactivity.',
      },
      {
        id: '4',
        title: 'React',
        status: 'in-progress',
        description: "You're currently learning components, props, state, and hooks. This is the step that turns JS into real apps.",
      },
      {
        id: '5',
        title: 'Node js',
        status: 'not-started',
        description: 'Up next: server-side JavaScript. You will learn to build APIs and handle backend logic.',
      },
      {
        id: '6',
        title: 'Database',
        status: 'not-started',
        description: 'Coming later: storing and querying data with SQL or NoSQL databases like PostgreSQL or MongoDB.',
      },
      {
        id: '7',
        title: 'Git & Github',
        status: 'not-started',
        description: 'Coming later: version control and collaboration — tracking changes and working with a team.',
      },
    ],
  },
  'Data Analyst': {
    estimatedTime: '4 Months',
    steps: [
      {
        id: '1',
        title: 'Excel & Spreadsheets',
        status: 'completed',
        description: 'You can clean data, use formulas, and build pivot tables to summarize information.',
      },
      {
        id: '2',
        title: 'SQL',
        status: 'completed',
        description: 'You know how to query, join, and filter data across relational database tables.',
      },
      {
        id: '3',
        title: 'Python (Pandas)',
        status: 'in-progress',
        description: "You're currently learning to clean and analyze datasets using Python and the Pandas library.",
      },
      {
        id: '4',
        title: 'Data Visualization',
        status: 'not-started',
        description: 'Up next: telling stories with data using charts and dashboards (e.g. Matplotlib, Power BI, Tableau).',
      },
      {
        id: '5',
        title: 'Statistics',
        status: 'not-started',
        description: 'Coming later: hypothesis testing, distributions, and the math behind trustworthy insights.',
      },
      {
        id: '6',
        title: 'Dashboards (Power BI / Tableau)',
        status: 'not-started',
        description: 'Coming later: building interactive dashboards stakeholders can explore on their own.',
      },
    ],
  },
  'UI/UX Designer': {
    estimatedTime: '3 Months',
    steps: [
      {
        id: '1',
        title: 'Design Fundamentals',
        status: 'completed',
        description: 'You understand color theory, typography, spacing, and visual hierarchy.',
      },
      {
        id: '2',
        title: 'User Research',
        status: 'completed',
        description: 'You know how to interview users, run surveys, and turn findings into actionable insights.',
      },
      {
        id: '3',
        title: 'Wireframing',
        status: 'in-progress',
        description: "You're currently practicing low-fidelity wireframes to map out layouts before visual design.",
      },
      {
        id: '4',
        title: 'Figma / Prototyping',
        status: 'not-started',
        description: 'Up next: building interactive, high-fidelity prototypes that feel like the real app.',
      },
      {
        id: '5',
        title: 'Usability Testing',
        status: 'not-started',
        description: 'Coming later: testing your designs with real users and iterating on the feedback.',
      },
      {
        id: '6',
        title: 'Design Systems',
        status: 'not-started',
        description: 'Coming later: building reusable components and a consistent design language.',
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
  const initialTrack =
    route?.params?.goal && TRACKS[route.params.goal]
      ? route.params.goal
      : TRACK_NAMES[0];

  const [selectedTrack, setSelectedTrack] = useState(initialTrack);
  const [selectedStep, setSelectedStep] = useState(null);

  const trackData = TRACKS[selectedTrack];
  const roadmapSteps = trackData.steps;
  const completedCount = roadmapSteps.filter((step) => step.status === 'completed').length;
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
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 20 &&
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.5,
      onPanResponderRelease: (_, gestureState) => {
        const threshold = 50;
        if (gestureState.dx < -threshold) {
          goToTrack('next');
        } else if (gestureState.dx > threshold) {
          goToTrack('prev');
        }
      },
    })
  ).current;

  const handleStepPress = (step) => {
    if (
      selectedTrack === 'Software Engineer' &&
      (step.title === 'CSS' || step.title === 'HTML')
    ) {
      navigation.navigate('CSSCourse');
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
          {roadmapSteps.map((step, index) => (
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
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal transparent visible={Boolean(selectedStep)} animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selectedStep?.title}</Text>
            <Text style={styles.modalText}>{selectedStep?.description}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F7FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backArrow: {
    fontSize: 32,
    color: '#5B21F5',
    lineHeight: 32,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  goalLabel: {
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 4,
  },
  goalText: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  chipRow: {
    paddingBottom: 10,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#E5E7EB',
  },
  chipActive: {
    backgroundColor: '#5B21F5',
  },
  chipText: {
    color: '#374151',
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  progressWrap: {
    marginTop: 20,
    marginBottom: 24,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#5B21F5',
    borderRadius: 999,
  },
  progressLabel: {
    marginTop: 8,
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  roadmapList: {
    gap: 12,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
  },
  indicatorColumn: {
    alignItems: 'center',
    width: 34,
    marginRight: 12,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleCompleted: {
    backgroundColor: '#16A34A',
  },
  circleInProgress: {
    backgroundColor: '#5B21F5',
  },
  circleNotStarted: {
    backgroundColor: '#E5E7EB',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  connectorLine: {
    width: 2,
    height: 30,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
  },
  stepTextWrap: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  stepStatus: {
    fontSize: 12,
    color: '#6B7280',
  },
  stepStatusActive: {
    color: '#5B21F5',
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(17,24,39,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  modalText: {
    color: '#374151',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  modalButton: {
    backgroundColor: '#5B21F5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});