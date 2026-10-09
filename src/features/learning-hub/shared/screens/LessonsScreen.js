import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import CourseHeader from '../components/CourseHeader';
import common, { PURPLE, LIGHT_PURPLE, GREEN } from '../styles';
import { getStatusLabel } from '../courseUtils';

// `lessons` already carries a derived `status` (see courseUtils.withStatus).
export default function LessonsScreen({ course, lessons, onBack, onOpenLesson, onStartQuiz }) {
  const completedLessons = lessons.filter((l) => l.status === 'completed').length;
  const progress = Math.round((completedLessons / lessons.length) * 100);

  return (
    <>
      <CourseHeader title="Lessons" onBack={onBack} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={common.container}>
        <View style={styles.courseHeader}>
          <View style={styles.courseIcon}>
            <Text style={styles.courseIconText}>{course.shortCode}</Text>
          </View>

          <View style={styles.courseHeaderText}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseSubtitle}>{course.subtitle}</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressTop}>
            <Text style={styles.progressText}>
              {completedLessons} of {lessons.length} lessons
            </Text>
            <Text style={styles.progressPercent}>{progress}%</Text>
          </View>

          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <Text style={common.sectionTitle}>Your lessons</Text>

        <View style={styles.lessonList}>
          {lessons.map((lesson, index) => (
            <TouchableOpacity
              key={lesson.id}
              style={styles.lessonCard}
              onPress={() => onOpenLesson(index)}
            >
              <View
                style={[
                  styles.lessonNumber,
                  lesson.status === 'completed' && styles.lessonCompleted,
                  lesson.status === 'in-progress' && styles.lessonCurrent,
                ]}
              >
                {lesson.status === 'completed' ? (
                  <Text style={styles.check}>✓</Text>
                ) : (
                  <Text
                    style={[
                      styles.lessonNumberText,
                      lesson.status === 'in-progress' && styles.currentNumber,
                    ]}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>

              <View style={styles.lessonText}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>
                <Text
                  style={[
                    styles.lessonStatus,
                    lesson.status === 'in-progress' && styles.activeStatus,
                  ]}
                >
                  {getStatusLabel(lesson.status)}
                </Text>
              </View>

              <Text style={common.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={common.quizButton} onPress={onStartQuiz}>
          <Text style={common.quizButtonText}>Take the Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  courseHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: LIGHT_PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  courseIconText: { color: PURPLE, fontWeight: '800', fontSize: 13 },
  courseHeaderText: { flex: 1 },
  courseTitle: { fontSize: 20, fontWeight: '700', color: '#222222' },
  courseSubtitle: { fontSize: 12, color: '#8A8A8A', marginTop: 4 },

  progressSection: { marginBottom: 25 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressText: { fontSize: 12, color: '#777777' },
  progressPercent: { fontSize: 12, color: PURPLE, fontWeight: '700' },
  progressBackground: {
    height: 7,
    borderRadius: 5,
    backgroundColor: '#E8E8E8',
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: PURPLE, borderRadius: 5 },

  lessonList: { gap: 10 },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2D9FF',
    borderRadius: 12,
    padding: 13,
    backgroundColor: '#FFFFFF',
  },
  lessonNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#D4D4D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lessonCompleted: { backgroundColor: GREEN, borderColor: GREEN },
  lessonCurrent: { borderColor: PURPLE },
  lessonNumberText: { color: '#999999', fontWeight: '600', fontSize: 12 },
  currentNumber: { color: PURPLE },
  check: { color: '#FFFFFF', fontWeight: '800' },
  lessonText: { flex: 1 },
  lessonTitle: { fontSize: 14, fontWeight: '700', color: '#222222' },
  lessonSubtitle: { fontSize: 11, color: '#929292', marginTop: 3 },
  lessonStatus: { fontSize: 10, color: '#AAAAAA', marginTop: 5 },
  activeStatus: { color: PURPLE, fontWeight: '700' },
});
