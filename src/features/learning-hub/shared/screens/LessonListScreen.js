import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import CourseHeader from '../components/CourseHeader';
import common, { PURPLE, GREEN } from '../styles';
import { getStatusLabel } from '../courseUtils';

export default function LessonListScreen({ course, lessons, onBack, onOpenLesson, onStartQuiz }) {
  return (
    <>
      <CourseHeader title="Lessons" onBack={onBack} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={common.container}>
        <Text style={common.sectionTitle}>{course.title} · Lessons</Text>

        {lessons.map((lesson, index) => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.lessonRow}
            onPress={() => onOpenLesson(index)}
          >
            <View
              style={[
                styles.radioCircle,
                lesson.status === 'completed' && styles.radioCompleted,
                lesson.status === 'in-progress' && styles.radioActive,
              ]}
            >
              {lesson.status === 'completed' && <Text style={styles.radioCheck}>✓</Text>}
              {lesson.status === 'in-progress' && <View style={styles.radioDot} />}
            </View>

            <View style={styles.lessonRowText}>
              <Text style={styles.lessonRowTitle}>
                {index + 1}. {lesson.title}
              </Text>
              <Text style={styles.lessonRowSubtitle}>{getStatusLabel(lesson.status)}</Text>
            </View>

            <Text style={common.chevron}>›</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={common.quizButton} onPress={onStartQuiz}>
          <Text style={common.quizButtonText}>Continue to Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 11,
    padding: 13,
    marginBottom: 9,
  },
  lessonRowText: { flex: 1, marginLeft: 12 },
  lessonRowTitle: { fontSize: 13, fontWeight: '700', color: '#222222' },
  lessonRowSubtitle: { fontSize: 10, color: '#999999', marginTop: 3 },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#BEBEBE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCompleted: { backgroundColor: GREEN, borderColor: GREEN },
  radioActive: { borderColor: PURPLE },
  radioCheck: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: PURPLE },
});
