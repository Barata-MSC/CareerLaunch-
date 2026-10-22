import AppPressable from '@components/AppPressable';
import Pop from '@components/motion/Pop';
import React from 'react';
import { Animated, View, Text, ScrollView, StyleSheet } from 'react-native';
import CourseHeader from '../components/CourseHeader';
import common, { PURPLE, LIGHT_PURPLE } from '../styles';
import { distances, durations } from '@components/motion/motionTokens';
import useReduceMotion from '@components/motion/useReduceMotion';

const useNativeDriver = false;

function AnimatedProgressBar({ value }) {
  const reduceMotion = useReduceMotion();
  const progress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: value,
      duration: reduceMotion ? 0 : durations.progress,
      useNativeDriver,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, reduceMotion, value]);

  return (
    <View style={styles.questionProgressBackground}>
      <Animated.View
        style={[
          styles.questionProgressFill,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

export default function QuizScreen({
  course,
  questionIndex,
  selectedAnswer,
  onSelectAnswer,
  onPrevious,
  onNext,
  onBack,
}) {
  const questions = course.questions;
  const question = questions[questionIndex];
  const isLast = questionIndex === questions.length - 1;

  return (
    <>
      <CourseHeader title="Quiz" onBack={onBack} />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={common.container}
      >
        <View style={styles.questionHeader}>
          <Text style={common.smallText}>{course.title} · Quiz</Text>
          <Text style={styles.questionCounter}>
            Question {questionIndex + 1} of {questions.length}
          </Text>
        </View>

        <AnimatedProgressBar value={(questionIndex + 1) / questions.length} />

        <Text style={styles.questionText}>{question.question}</Text>

        <View style={styles.answerList}>
          {question.answers.map((answer, index) => {
            const selected = selectedAnswer === index;

            return (
              <Pop key={answer} value={selected}>
                <AppPressable
                  style={[styles.answerButton, selected && styles.answerSelected]}
                  onPress={() => onSelectAnswer(index)}
                >
                  <View style={[styles.answerCircle, selected && styles.answerCircleSelected]}>
                    <Text style={[styles.answerLetter, selected && styles.answerLetterSelected]}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>

                  <Text style={[styles.answerText, selected && styles.answerTextSelected]}>
                    {answer}
                  </Text>
                </AppPressable>
              </Pop>
            );
          })}
        </View>

        <View style={[common.buttonRow, styles.buttons]}>
          <AppPressable style={common.previousButton} onPress={onPrevious}>
            <Text style={common.previousText}>Previous</Text>
          </AppPressable>

          <AppPressable
            style={[common.nextButton, selectedAnswer === null && styles.disabledNext]}
            onPress={onNext}
            disabled={selectedAnswer === null}
            sound={isLast ? 'none' : 'tap'}
          >
            <Text style={common.nextText}>{isLast ? 'Submit' : 'Next'}</Text>
          </AppPressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, minHeight: 0 },
  questionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  questionCounter: { fontSize: 11, color: '#888888' },
  questionProgressBackground: {
    height: 5,
    borderRadius: 5,
    backgroundColor: '#E5E5E5',
    marginBottom: 30,
    overflow: 'hidden',
  },
  questionProgressFill: { height: '100%', backgroundColor: PURPLE },
  questionText: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 20,
  },
  answerList: { gap: 10 },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD6FF',
    borderRadius: 11,
    padding: 13,
  },
  answerSelected: { backgroundColor: LIGHT_PURPLE, borderColor: PURPLE },
  answerCircle: {
    width: 27,
    height: 27,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C5C5C5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  answerCircleSelected: { backgroundColor: PURPLE, borderColor: PURPLE },
  answerLetter: { fontSize: 11, color: '#777777', fontWeight: '600' },
  answerLetterSelected: { color: '#FFFFFF' },
  answerText: { flex: 1, fontSize: 12, color: '#444444' },
  answerTextSelected: { color: PURPLE, fontWeight: '600' },
  buttons: { marginTop: 25 },
  disabledNext: { opacity: 0.45 },
});
