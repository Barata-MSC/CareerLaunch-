import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import CourseHeader from '../components/CourseHeader';
import common, { PURPLE, LIGHT_PURPLE } from '../styles';

const RULES = [
  'Choose one answer for each question',
  'Go back to change an answer before submitting',
  'See your score and explanations at the end',
  'Retake the quiz anytime',
];

export default function QuizIntroScreen({ course, onBack, onStart }) {
  const info = [
    { label: 'Questions', value: `${course.questions.length} questions` },
    { label: 'Format', value: 'Multiple choice' },
    { label: 'Estimated time', value: `About ${course.estimatedMinutes} min` },
    { label: 'Passing score', value: `${course.passingPercent}% or higher` },
  ];

  return (
    <>
      <CourseHeader title="Quiz" onBack={onBack} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.quizIntro}
      >
        <View style={styles.quizIcon}>
          <Text style={styles.quizIconText}>✓</Text>
        </View>

        <Text style={styles.quizTitle}>{course.title} Quiz</Text>
        <Text style={styles.quizDescription}>
          Check your understanding of the lessons you have completed.
        </Text>

        <View style={styles.quizInfo}>
          {info.map((item) => (
            <View key={item.label} style={styles.infoItem}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.quizRules}>
          <Text style={styles.rulesTitle}>How it works</Text>
          {RULES.map((rule) => (
            <Text key={rule} style={styles.rule}>
              • {rule}
            </Text>
          ))}
        </View>

        <TouchableOpacity style={common.quizButton} onPress={onStart}>
          <Text style={common.quizButtonText}>Take the Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  quizIntro: { paddingHorizontal: 25, paddingTop: 40, paddingBottom: 35 },
  quizIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: LIGHT_PURPLE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quizIconText: { fontSize: 26, color: PURPLE, fontWeight: '700' },
  quizTitle: { textAlign: 'center', fontSize: 21, fontWeight: '700', color: '#222222' },
  quizDescription: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: '#888888',
    marginTop: 8,
    marginBottom: 25,
  },
  quizInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    paddingTop: 18,
    paddingBottom: 4,
  },
  infoItem: { width: '50%', marginBottom: 14 },
  infoLabel: { fontSize: 10, color: '#999999', marginBottom: 4 },
  infoValue: { fontSize: 11, fontWeight: '700', color: '#333333' },
  quizRules: { marginTop: 22 },
  rulesTitle: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  rule: { fontSize: 11, color: '#666666', marginBottom: 7, lineHeight: 16 },
});
