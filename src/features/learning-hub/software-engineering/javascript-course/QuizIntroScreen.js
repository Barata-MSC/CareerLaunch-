import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LESSONS, QUESTIONS, PASS_PERCENT } from './CourseData';
import { COLORS, ScreenHeader, PrimaryButton, FooterBar } from './UI';

const HOW_IT_WORKS = [
  'Choose one answer for each question',
  'Go back to change an answer before submitting',
  'See your score and explanations at the end',
  "Retake the quiz if you don't pass",
];

export default function QuizIntroScreen({ onBack, onStart }) {
  const stats = [
    { label: 'Questions', value: `${QUESTIONS.length} questions` },
    { label: 'Format', value: 'Multiple choice' },
    { label: 'Estimated time', value: 'About 5 min' },
    { label: 'Passing score', value: `${PASS_PERCENT}% or higher` },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScreenHeader title="Quiz" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>📋</Text>
        </View>
        <Text style={styles.title}>JavaScript fundamentals Quiz</Text>
        <Text style={styles.subtitle}>
          Check your understanding of the lessons before completing the course.
        </Text>

        <View style={styles.grid}>
          {stats.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerCheck}>✓</Text>
          <Text style={styles.bannerText}>All {LESSONS.length} lessons completed</Text>
        </View>

        <Text style={styles.sectionTitle}>How it works</Text>
        {HOW_IT_WORKS.map((line) => (
          <View key={line} style={styles.bulletRow}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>{line}</Text>
          </View>
        ))}
      </ScrollView>

      <FooterBar>
        <PrimaryButton label="Take the quiz" onPress={onStart} />
      </FooterBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: 20, paddingBottom: 24, alignItems: 'center' },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  icon: { fontSize: 32 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginTop: 14, textAlign: 'center' },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 18,
    lineHeight: 20,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, alignSelf: 'stretch' },
  statCard: {
    flexBasis: '47%',
    flexGrow: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
  },
  statLabel: { fontSize: 12, color: COLORS.muted, marginBottom: 4 },
  statValue: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  banner: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.greenLight,
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
  },
  bannerCheck: { color: COLORS.green, fontWeight: '800', fontSize: 16 },
  bannerText: { color: COLORS.green, fontWeight: '600', fontSize: 14 },
  sectionTitle: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 18,
    marginBottom: 8,
  },
  bulletRow: { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 4 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.purple },
  bulletText: { flex: 1, fontSize: 14, color: '#374151' },
});