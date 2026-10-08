import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COURSE_TITLE, LESSONS } from './CourseData';
import { useCourseProgress, toggleLessonComplete } from './CourseStore';
import {
  COLORS,
  ScreenHeader,
  SegmentBar,
  Pill,
  PrimaryButton,
  OutlineButton,
  FooterBar,
} from './UI';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

export default function LessonsScreen({ lessonIndex, onChangeLesson, onBack, onGoToQuiz }) {
  const { completedLessonIds } = useCourseProgress();
  const [sheetOpen, setSheetOpen] = useState(false);

  const lesson = LESSONS[lessonIndex];
  const isDone = completedLessonIds.includes(lesson.id);
  const isFirst = lessonIndex === 0;
  const isLast = lessonIndex === LESSONS.length - 1;
  const allDone = completedLessonIds.length === LESSONS.length;
  const percent = Math.round((completedLessonIds.length / LESSONS.length) * 100);

  const segments = LESSONS.map((l, i) =>
    i === lessonIndex ? 'active' : completedLessonIds.includes(l.id) ? 'done' : 'todo'
  );

  const lessonStatus = (l, i) =>
    completedLessonIds.includes(l.id) ? 'Completed' : i === lessonIndex ? 'In progress' : 'Not started';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.flex}>
        <ScreenHeader title="Lessons" onBack={onBack} />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <Text style={styles.muted}>
              Lesson {lessonIndex + 1} of {LESSONS.length}
            </Text>
            <TouchableOpacity style={styles.allBtn} onPress={() => setSheetOpen(true)}>
              <Text style={styles.allBtnText}>All lessons</Text>
            </TouchableOpacity>
          </View>

          <SegmentBar segments={segments} />

          <Text style={styles.courseTitle}>{COURSE_TITLE}</Text>
          <View style={styles.metaRow}>
            <Pill label="Coding" />
            <Text style={styles.muted}>
              {lesson.minutes} min · {percent}% complete
            </Text>
          </View>

          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.body}>{lesson.body}</Text>

          <View style={styles.definition}>
            <Text style={styles.definitionLabel}>Definition</Text>
            <Text style={styles.definitionText}>{lesson.definition}</Text>
          </View>

          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{lesson.code}</Text>
          </View>
          <Text style={styles.caption}>{lesson.caption}</Text>

          <TouchableOpacity
            style={styles.completeRow}
            onPress={() => toggleLessonComplete(lesson.id)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, isDone && styles.checkboxDone]}>
              {isDone && <Text style={styles.checkMark}>✓</Text>}
            </View>
            <Text style={styles.completeText}>
              {isDone ? 'Completed' : 'Mark as completed'}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {isLast && !allDone && (
          <Text style={styles.lockHint}>Complete all lessons to unlock the quiz</Text>
        )}

        <FooterBar>
          <OutlineButton
            label="Previous"
            disabled={isFirst}
            onPress={() => onChangeLesson(lessonIndex - 1)}
          />
          {isLast ? (
            <PrimaryButton label="Take the quiz" disabled={!allDone} onPress={onGoToQuiz} />
          ) : (
            <PrimaryButton label="Next" onPress={() => onChangeLesson(lessonIndex + 1)} />
          )}
        </FooterBar>

        {/* "All lessons" bottom sheet. Drawn inside the screen (not a Modal)
            so it stays inside the phone frame on web. */}
        {sheetOpen && (
          <View style={StyleSheet.absoluteFill}>
            <Pressable style={styles.overlay} onPress={() => setSheetOpen(false)} />
            <View style={styles.sheet}>
              <View style={styles.grabber} />
              <Text style={styles.sheetTitle}>{COURSE_TITLE} · Lessons</Text>

              {LESSONS.map((l, i) => {
                const done = completedLessonIds.includes(l.id);
                const current = i === lessonIndex;
                return (
                  <TouchableOpacity
                    key={l.id}
                    style={[styles.sheetRow, current && styles.sheetRowActive]}
                    onPress={() => {
                      onChangeLesson(i);
                      setSheetOpen(false);
                    }}
                  >
                    <View
                      style={[
                        styles.statusCircle,
                        done && { backgroundColor: COLORS.green, borderColor: COLORS.green },
                        !done && current && { borderColor: COLORS.purple },
                      ]}
                    >
                      {done && <Text style={styles.checkMark}>✓</Text>}
                    </View>
                    <View style={styles.flex}>
                      <Text style={styles.sheetRowTitle}>
                        {i + 1}. {l.title}
                      </Text>
                      <Text style={styles.muted}>
                        {l.minutes} min · {lessonStatus(l, i)}
                      </Text>
                    </View>
                    <Text style={styles.chevron}>›</Text>
                  </TouchableOpacity>
                );
              })}

              <Text style={styles.sheetHint}>Complete all lessons to unlock the quiz</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  flex: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  muted: { fontSize: 13, color: COLORS.muted },

  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  allBtn: {
    backgroundColor: COLORS.purpleLight,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  allBtnText: { color: COLORS.purple, fontSize: 12, fontWeight: '700' },

  courseTitle: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 10 },
  lessonTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginTop: 6, marginBottom: 8 },
  body: { fontSize: 15, lineHeight: 22, color: '#374151' },

  definition: {
    backgroundColor: COLORS.purpleLight,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.purple,
    borderRadius: 8,
    padding: 14,
    marginTop: 16,
  },
  definitionLabel: { fontSize: 12, fontWeight: '700', color: COLORS.purple, marginBottom: 4 },
  definitionText: { fontSize: 14, lineHeight: 20, color: COLORS.text },

  codeBlock: {
    backgroundColor: '#1B1530',
    borderRadius: 10,
    padding: 14,
    marginTop: 16,
  },
  codeText: { color: '#E8E4FF', fontSize: 13, lineHeight: 20, fontFamily: MONO },
  caption: { fontSize: 12, color: COLORS.muted, marginTop: 6 },

  completeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  checkMark: { color: COLORS.white, fontSize: 13, fontWeight: '800' },
  completeText: { fontSize: 14, fontWeight: '600', color: COLORS.text },

  lockHint: { textAlign: 'center', fontSize: 12, color: COLORS.muted, paddingVertical: 6 },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  grabber: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray,
    marginVertical: 12,
  },
  sheetTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  sheetRowActive: { borderColor: COLORS.purple, backgroundColor: COLORS.purpleLight },
  sheetRowTitle: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  statusCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: { fontSize: 22, color: '#C7C7CC' },
  sheetHint: { textAlign: 'center', fontSize: 12, color: COLORS.muted, marginTop: 8 },
});