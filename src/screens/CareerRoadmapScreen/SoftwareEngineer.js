import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
 
 
// Roadmap step statuses: 'completed' | 'in-progress' | 'not-started'
const roadmapSteps = [
  { id: '1', title: 'HTML', status: 'completed' },
  { id: '2', title: 'CSS', status: 'completed' },
  { id: '3', title: 'JavaScript', status: 'completed' },
  { id: '4', title: 'React', status: 'in-progress' },
  { id: '5', title: 'Node js', status: 'not-started' },
  { id: '6', title: 'Database', status: 'not-started' },
  { id: '7', title: 'Git & Github', status: 'not-started' },
];
 
const STATUS_LABEL = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  'not-started': 'Not started',
};
 
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
 
  // Called when the user taps a completed step. Swap this out for
  // navigation.navigate('SkillDetail', { skill: step }) once you have
  // a screen to show the completed materials/certificate for it.
  const handleCompletedPress = (step) => {
    Alert.alert(step.title, `You've completed ${step.title}. Nice work!`);
  };
 
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
 
        <Text style={styles.sectionTitle}>Your Roadmap</Text>
 
        <View style={styles.roadmapList}>
          {roadmapSteps.map((step, index) => {
            const isCompleted = step.status === 'completed';
            const Row = isCompleted ? TouchableOpacity : View;
 
            return (
              <Row
                key={step.id}
                style={styles.stepRow}
                activeOpacity={isCompleted ? 0.6 : 1}
                onPress={
                  isCompleted
                    ? () => handleCompletedPress(step)
                    : undefined
                }
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
                {isCompleted && <Text style={styles.chevron}>›</Text>}
              </Row>
            );
          })}
        </View>
 
        <View style={styles.estimateCard}>
          <Text style={styles.estimateLabel}>Estimated Time</Text>
          <Text style={styles.estimateValue}>{estimatedTime}</Text>
        </View>
      </ScrollView>
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
});
 