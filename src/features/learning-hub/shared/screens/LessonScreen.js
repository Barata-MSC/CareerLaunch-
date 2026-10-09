import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import CourseHeader from '../components/CourseHeader';
import common, { PURPLE, LIGHT_PURPLE, GREEN } from '../styles';

export default function LessonScreen({
  course,
  lessons,
  lessonIndex,
  onBack,
  onPrevious,
  onNext,
  onToggleComplete,
}) {
  const lesson = lessons[lessonIndex];
  const lessonNumber = lessonIndex + 1;
  const isDone = lesson.status === 'completed';
  const isFirst = lessonIndex === 0;
  const isLast = lessonIndex === lessons.length - 1;

  return (
    <>
      <CourseHeader title={`Lesson ${lessonNumber} of ${lessons.length}`} onBack={onBack} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={common.container}>
        <View style={styles.lessonProgressHeader}>
          <Text style={common.smallText}>
            Lesson {lessonNumber} of {lessons.length}
          </Text>

          <View style={styles.smallProgressBackground}>
            <View
              style={[
                styles.smallProgressFill,
                { width: `${(lessonNumber / lessons.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        <Text style={styles.bigLessonTitle}>{lesson.title}</Text>
        <Text style={styles.topicLabel}>{course.shortCode}</Text>
        <Text style={styles.contentTitle}>{lesson.contentTitle}</Text>
        <Text style={styles.description}>{lesson.description}</Text>

        <View style={styles.codeCard}>
          <Text style={styles.codeText}>{lesson.code}</Text>
        </View>

        <TouchableOpacity
          style={styles.completeCard}
          onPress={() => onToggleComplete(lesson.id)}
          activeOpacity={0.8}
        >
          <View style={[styles.radioCircle, isDone && styles.radioDone]}>
            {isDone && <Text style={styles.radioCheck}>✓</Text>}
          </View>
          <Text style={styles.completeText}>{isDone ? 'Completed' : 'Mark as completed'}</Text>
        </TouchableOpacity>

        <View style={common.buttonRow}>
          <TouchableOpacity
            style={[common.previousButton, isFirst && styles.disabledButton]}
            onPress={onPrevious}
            disabled={isFirst}
          >
            <Text style={common.previousText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity style={common.nextButton} onPress={onNext}>
            <Text style={common.nextText}>{isLast ? 'Lessons' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  lessonProgressHeader: { marginBottom: 20 },
  smallProgressBackground: {
    height: 5,
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
    marginTop: 9,
    overflow: 'hidden',
  },
  smallProgressFill: { height: '100%', backgroundColor: PURPLE },
  bigLessonTitle: { fontSize: 24, fontWeight: '700', color: '#222222', marginBottom: 10 },
  topicLabel: {
    alignSelf: 'flex-start',
    backgroundColor: LIGHT_PURPLE,
    color: PURPLE,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 18,
  },
  contentTitle: { fontSize: 17, fontWeight: '700', color: '#222222', marginBottom: 8 },
  description: { fontSize: 13, lineHeight: 20, color: '#555555', marginBottom: 18 },
  codeCard: {
    backgroundColor: '#211A38',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  codeText: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 19,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
  },
  completeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 10,
    padding: 13,
    marginBottom: 25,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#BEBEBE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDone: { backgroundColor: GREEN, borderColor: GREEN },
  radioCheck: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  completeText: { fontSize: 12, color: '#555555', marginLeft: 9 },
  disabledButton: { borderColor: '#D9D9D9' },
});
