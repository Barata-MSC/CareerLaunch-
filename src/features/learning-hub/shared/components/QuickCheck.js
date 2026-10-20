import AppPressable from '@components/AppPressable';
// One-tap question inside a lesson with instant feedback.
// Wrong answer -> hint and try again. Right answer -> explanation.
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PURPLE, LIGHT_PURPLE, GREEN, RED } from '../styles';

export default function QuickCheck({ question, options, correct, hint, explanation }) {
  const [picked, setPicked] = useState(null);
  const solved = picked === correct;
  const wrong = picked !== null && !solved;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>QUICK CHECK</Text>
      <Text style={styles.question}>{question}</Text>

      {options.map((opt, i) => {
        const isPicked = picked === i;
        return (
          <AppPressable
            key={opt}
            style={[
              styles.option,
              isPicked && solved && styles.optionRight,
              isPicked && wrong && styles.optionWrong,
            ]}
            onPress={() => setPicked(i)}
            disabled={solved}
            activeOpacity={0.7}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </AppPressable>
        );
      })}

      {solved && <Text style={[styles.feedback, { color: GREEN }]}>Correct! {explanation}</Text>}
      {wrong && (
        <Text style={[styles.feedback, { color: RED }]}>
          Not quite. {hint || 'Try another answer.'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: LIGHT_PURPLE, borderRadius: 12, padding: 14, marginBottom: 15 },
  label: { fontSize: 10, fontWeight: '800', color: PURPLE, marginBottom: 6 },
  question: { fontSize: 14, fontWeight: '700', color: '#222222', marginBottom: 10, lineHeight: 20 },
  option: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD6FF',
    borderRadius: 10,
    padding: 11,
    marginBottom: 8,
  },
  optionRight: { borderColor: GREEN, backgroundColor: '#EAF9EF' },
  optionWrong: { borderColor: RED, backgroundColor: '#FFF1EC' },
  optionText: { fontSize: 13, color: '#333333' },
  feedback: { fontSize: 12, fontWeight: '600', lineHeight: 18, marginTop: 4 },
});
