import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COURSE_TITLE, QUESTIONS } from './CourseData';
import {
  COLORS,
  ScreenHeader,
  SegmentBar,
  Pill,
  PrimaryButton,
  OutlineButton,
  FooterBar,
} from './UI';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizScreen({ onBack, onSubmit }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => QUESTIONS.map(() => null));

  const question = QUESTIONS[index];
  const selected = answers[index];
  const isLast = index === QUESTIONS.length - 1;

  const choose = (optionIndex) =>
    setAnswers((prev) => prev.map((a, i) => (i === index ? optionIndex : a)));

  const segments = QUESTIONS.map((_, i) =>
    i < index ? 'done' : i === index ? 'active' : 'todo'
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScreenHeader title="Quiz" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SegmentBar segments={segments} />
        <View style={styles.metaRow}>
          <Text style={styles.muted}>{COURSE_TITLE} · Quiz</Text>
          <Text style={styles.muted}>
            Question {index + 1} of {QUESTIONS.length}
          </Text>
        </View>

        <Pill label="Multiple Choice" />
        <Text style={styles.prompt}>{question.prompt}</Text>

        {question.options.map((option, i) => {
          const active = selected === i;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.option, active && styles.optionActive]}
              onPress={() => choose(i)}
              activeOpacity={0.85}
            >
              <View style={[styles.letter, active && styles.letterActive]}>
                <Text style={[styles.letterText, active && { color: COLORS.white }]}>
                  {LETTERS[i]}
                </Text>
              </View>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {selected === null && <Text style={styles.hint}>Select one answer to continue</Text>}

      <FooterBar>
        <OutlineButton
          label="Previous"
          disabled={index === 0}
          onPress={() => setIndex(index - 1)}
        />
        <PrimaryButton
          label={isLast ? 'Submit' : 'Next'}
          disabled={selected === null}
          onPress={() => (isLast ? onSubmit(answers) : setIndex(index + 1))}
        />
      </FooterBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  muted: { fontSize: 13, color: COLORS.muted },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  prompt: { fontSize: 20, fontWeight: '800', color: COLORS.text, lineHeight: 28, marginTop: 14, marginBottom: 18 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  optionActive: { borderColor: COLORS.purple, backgroundColor: COLORS.purpleLight, borderWidth: 1.5 },
  letter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterActive: { backgroundColor: COLORS.purple },
  letterText: { fontSize: 13, fontWeight: '700', color: COLORS.purple },
  optionText: { flex: 1, fontSize: 15, color: COLORS.text },
  hint: { textAlign: 'center', fontSize: 12, color: COLORS.muted, paddingVertical: 6 },
});