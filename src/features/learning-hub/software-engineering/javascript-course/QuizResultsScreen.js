import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import { LESSONS, PASS_PERCENT } from './CourseData';
import { COLORS, ScreenHeader, PrimaryButton, OutlineButton, FooterBar } from './UI';

function ScoreRing({ percent, color, track }) {
  const size = 124;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Circle cx={center} cy={center} r={radius} stroke={track} strokeWidth={stroke} fill="none" />
        {percent > 0 && (
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(circumference * percent) / 100} ${circumference}`}
            transform={`rotate(-90 ${center} ${center})`}
          />
        )}
      </Svg>
      <Text style={styles.ringText}>{percent}%</Text>
    </View>
  );
}

function ReviewCard({ item }) {
  const { question, number, picked, isCorrect } = item;
  return (
    <View style={styles.reviewCard}>
      <Text style={styles.reviewTitle}>Review · Question {number}</Text>
      <Text style={styles.reviewPrompt}>{question.prompt}</Text>
      <Text style={[styles.answerLine, { color: isCorrect ? COLORS.green : COLORS.red }]}>
        Your answer: {picked === null ? 'No answer' : question.options[picked]}
      </Text>
      {!isCorrect && (
        <Text style={[styles.answerLine, { color: COLORS.green }]}>
          Correct answer: {question.options[question.correctIndex]}
        </Text>
      )}
      <Text style={styles.explanation}>{question.explanation}</Text>
    </View>
  );
}

export default function QuizResultScreen({
  result,
  onBack,
  onViewRoadmap,
  onReviewLesson,
  onRetake,
}) {
  const { results, score, total, percent, passed } = result;
  const [showAll, setShowAll] = useState(false);

  const accent = passed ? COLORS.green : COLORS.orange;
  const accentLight = passed ? COLORS.greenLight : COLORS.orangeLight;

  const wrong = results.filter((r) => !r.isCorrect);
  const reviewItems = showAll ? results : wrong.slice(0, 1);

  // Group missed questions by lesson: "Questions 3, 4" -> Lesson 3
  const topics = LESSONS.map((lesson, lessonIndex) => ({
    lesson,
    lessonIndex,
    numbers: wrong.filter((r) => r.question.lessonId === lesson.id).map((r) => r.number),
  })).filter((t) => t.numbers.length > 0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScreenHeader title="Quiz Result" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScoreRing percent={percent} color={accent} track={accentLight} />

        <View style={[styles.statusPill, { backgroundColor: accentLight }]}>
          <Text style={[styles.statusPillText, { color: accent }]}>
            {passed ? 'Passed' : 'Not passed'}
          </Text>
        </View>

        <Text style={styles.title}>{passed ? 'Great job!' : 'Almost there!'}</Text>
        <Text style={styles.subtitle}>
          {passed
            ? 'You passed JavaScript fundamentals.'
            : `You need ${PASS_PERCENT}% to pass. Review and try again.`}
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: COLORS.purple }]}>
              {score}/{total}
            </Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: COLORS.green }]}>{score}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: COLORS.red }]}>{total - score}</Text>
            <Text style={styles.statLabel}>Incorrect</Text>
          </View>
        </View>
        <Text style={styles.passingNote}>Passing score: {PASS_PERCENT}%</Text>

        {passed ? (
          <>
            <View style={styles.badgeCard}>
              <View style={styles.badgeIcon}>
                <Text style={styles.badgeStar}>★</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.badgeLabel}>Badge earned</Text>
                <Text style={styles.badgeTitle}>JavaScript Fundamentals Completed</Text>
              </View>
            </View>

            {['Course marked as Completed', 'Skill updated in Career Roadmap', 'Overall learning progress updated'].map(
              (line) => (
                <View key={line} style={styles.checkRow}>
                  <View style={styles.checkCircle}>
                    <Text style={styles.checkMark}>✓</Text>
                  </View>
                  <Text style={styles.checkText}>{line}</Text>
                </View>
              )
            )}

            {reviewItems.map((item) => (
              <ReviewCard key={item.question.id} item={item} />
            ))}
          </>
        ) : (
          <>
            <Text style={styles.topicsTitle}>Topics to review</Text>
            {topics.map((t) => (
              <TouchableOpacity
                key={t.lesson.id}
                style={styles.topicRow}
                onPress={() => onReviewLesson(t.lessonIndex)}
              >
                <View style={styles.xCircle}>
                  <Text style={styles.xMark}>✕</Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.topicTitle}>
                    {t.lessonIndex + 1}. {t.lesson.title}
                  </Text>
                  <Text style={styles.muted}>
                    {t.numbers.length === 1 ? 'Question' : 'Questions'} {t.numbers.join(', ')}
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.retakeNote}>
              <Text style={styles.retakeNoteText}>You can retake the quiz as many times as you need.</Text>
            </View>
          </>
        )}
      </ScrollView>

      <FooterBar>
        {passed ? (
          <>
            <OutlineButton
              label={showAll ? 'Show less' : 'Review answers'}
              onPress={() => setShowAll(!showAll)}
            />
            <PrimaryButton label="View Roadmap" onPress={onViewRoadmap} />
          </>
        ) : (
          <>
            <OutlineButton label="Review lessons" onPress={() => onReviewLesson(0)} />
            <PrimaryButton label="Retake quiz" onPress={onRetake} />
          </>
        )}
      </FooterBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  flex: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 24, alignItems: 'center' },
  muted: { fontSize: 12, color: COLORS.muted },

  ringText: { position: 'absolute', fontSize: 30, fontWeight: '800', color: COLORS.text },
  statusPill: { borderRadius: 999, paddingHorizontal: 14, paddingVertical: 4, marginTop: 10 },
  statusPillText: { fontSize: 12, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginTop: 12 },
  subtitle: { fontSize: 14, color: COLORS.muted, marginTop: 4, marginBottom: 16, textAlign: 'center' },

  statsRow: { flexDirection: 'row', gap: 10, alignSelf: 'stretch' },
  statCard: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
  },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  passingNote: { fontSize: 12, color: COLORS.muted, marginTop: 8, marginBottom: 14 },

  badgeCard: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.purpleLight,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  badgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeStar: { color: COLORS.white, fontSize: 20 },
  badgeLabel: { fontSize: 11, fontWeight: '700', color: COLORS.purple },
  badgeTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginTop: 2 },

  checkRow: { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 5 },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { color: COLORS.white, fontSize: 12, fontWeight: '800' },
  checkText: { fontSize: 14, color: COLORS.text },

  reviewCard: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  reviewTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 6 },
  reviewPrompt: { fontSize: 14, color: COLORS.text, marginBottom: 6 },
  answerLine: { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  explanation: { fontSize: 13, color: COLORS.muted, lineHeight: 19, marginTop: 6 },

  topicsTitle: { alignSelf: 'flex-start', fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  topicRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  xCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  xMark: { color: COLORS.white, fontSize: 11, fontWeight: '800' },
  topicTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  chevron: { fontSize: 22, color: '#C7C7CC' },
  retakeNote: { alignSelf: 'stretch', backgroundColor: COLORS.purpleLight, borderRadius: 10, padding: 14, marginTop: 6 },
  retakeNoteText: { fontSize: 13, color: COLORS.purple, fontWeight: '600' },
});