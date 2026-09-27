import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Dimensions,
} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;


// Roadmap step statuses: 'completed' | 'in-progress' | 'not-started'
// `description` is shown in the detail modal for each step.
const roadmapSteps = [
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
];

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
  const goal = route?.params?.goal ?? 'Become a Software Engineer';
  const estimatedTime = route?.params?.estimatedTime ?? '5 Months';

  // Which step's detail panel is currently open (null = closed)
  const [selectedStep, setSelectedStep] = useState(null);

  const completedCount = roadmapSteps.filter((s) => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / roadmapSteps.length) * 100);

  // Every step is tappable now. This opens the detail modal below.
  // Swap this out for navigation.navigate('SkillDetail', { skill: step })
  // once you have a dedicated screen for lesson content.
  const handleStepPress = (step) => {
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
      >
        <View style={styles.goalCard}>
          <Text style={styles.goalLabel}>Your goal</Text>
          <Text style={styles.goalText}>{goal}</Text>
        </View>

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

        <View style={styles.estimateCard}>
          <Text style={styles.estimateLabel}>Estimated Time</Text>
          <Text style={styles.estimateValue}>{estimatedTime}</Text>
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
          {/* Stop taps inside the card from closing the modal */}
          <TouchableOpacity activeOpacity={1} style={styles.modalCard}>
            {selectedStep && (
              <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
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
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const PURPLE = '#5B2EFF';
const GREEN = '#2ECC71';
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
    marginBottom: 24,
  },
  goalLabel: { color: '#E4DBFF', fontSize: 13, marginBottom: 6 },
  goalText: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 26 },
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
    width: '80%',
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
  modalCloseButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
