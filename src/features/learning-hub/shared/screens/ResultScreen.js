import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import CourseHeader from '../components/CourseHeader';
import common, { GREEN, RED } from '../styles';

export default function ResultScreen({
  course,
  answers,
  score,
  saveError,
  onBack,
  onOpenLesson,
  onReviewLessons,
  onRetake,
}) {
  const { questions, lessons } = course;
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= course.passingPercent;

  const results = questions.map((q, i) => ({
    question: q,
    number: i + 1,
    picked: answers[i],
    isCorrect: answers[i] === q.correct,
  }));

  const wrong = results.filter((r) => !r.isCorrect);

  // Missed questions grouped by the lesson that covers them, so each row can
  // open that lesson: "Questions 3, 4" -> Lesson 3.
  const topics = lessons
    .map((lesson, lessonIndex) => ({
      lesson,
      lessonIndex,
      numbers: wrong.filter((r) => r.question.lessonId === lesson.id).map((r) => r.number),
    }))
    .filter((t) => t.numbers.length > 0);

  return (
    <>
      <CourseHeader title="Quiz Result" onBack={onBack} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.resultContainer}
      >
        <View style={[styles.scoreCircle, passed ? styles.scorePassed : styles.scoreFailed]}>
          <Text style={[styles.scoreText, passed ? styles.scoreTextPassed : styles.scoreTextFailed]}>
            {percentage}%
          </Text>
        </View>

        <Text style={styles.resultTitle}>{passed ? 'Great job!' : 'Almost there!'}</Text>
        <Text style={styles.resultSubtitle}>
          {passed
            ? `You passed the ${course.title} quiz.`
            : 'Review the lessons and try the quiz again.'}
        </Text>

        <View style={styles.resultStats}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {score}/{questions.length}
            </Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{score}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{questions.length - score}</Text>
            <Text style={styles.statLabel}>Incorrect</Text>
          </View>
        </View>

        <View
          style={[
            styles.resultBanner,
            saveError || !passed ? styles.resultBannerFailed : styles.resultBannerPassed,
          ]}
        >
          <Text style={styles.resultBannerTitle}>
            {saveError
              ? 'Result not saved'
              : passed
              ? `${course.title} completed`
              : 'Keep practicing'}
          </Text>
          <Text style={styles.resultBannerText}>
            {saveError
              ? 'We could not save this result. Check your connection and try again.'
              : passed
              ? 'Your learning progress has been updated.'
              : 'You can review the lessons and retake the quiz.'}
          </Text>
        </View>

        {topics.length > 0 && (
          <View style={styles.section}>
            <Text style={common.sectionTitle}>Topics to review</Text>
            {topics.map((t) => (
              <TouchableOpacity
                key={t.lesson.id}
                style={styles.topicRow}
                onPress={() => onOpenLesson(t.lessonIndex)}
              >
                <View style={styles.topicText}>
                  <Text style={styles.topicTitle}>
                    {t.lessonIndex + 1}. {t.lesson.title}
                  </Text>
                  <Text style={styles.topicSubtitle}>
                    {t.numbers.length === 1 ? 'Question' : 'Questions'} {t.numbers.join(', ')}
                  </Text>
                </View>
                <Text style={common.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={common.sectionTitle}>Your answers</Text>
          {results.map((r) => (
            <View key={r.number} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View
                  style={[
                    styles.reviewMark,
                    { backgroundColor: r.isCorrect ? GREEN : RED },
                  ]}
                >
                  <Text style={styles.reviewMarkText}>{r.isCorrect ? '✓' : '✕'}</Text>
                </View>
                <Text style={styles.reviewNumber}>Question {r.number}</Text>
              </View>

              <Text style={styles.reviewQuestion}>{r.question.question}</Text>

              <Text style={[styles.answerLine, { color: r.isCorrect ? GREEN : RED }]}>
                Your answer: {r.picked == null ? 'No answer' : r.question.answers[r.picked]}
              </Text>
              {!r.isCorrect && (
                <Text style={[styles.answerLine, { color: GREEN }]}>
                  Correct answer: {r.question.answers[r.question.correct]}
                </Text>
              )}

              {!!r.question.explanation && (
                <Text style={styles.explanation}>{r.question.explanation}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={[common.buttonRow, styles.resultButtons]}>
          <TouchableOpacity style={common.previousButton} onPress={onReviewLessons}>
            <Text style={common.previousText}>Review lessons</Text>
          </TouchableOpacity>

          <TouchableOpacity style={common.nextButton} onPress={onRetake}>
            <Text style={common.nextText}>Retake quiz</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  resultContainer: { alignItems: 'center', paddingHorizontal: 25, paddingTop: 40, paddingBottom: 35 },
  scoreCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scorePassed: { borderColor: GREEN },
  scoreFailed: { borderColor: RED },
  scoreText: { fontSize: 26, fontWeight: '800' },
  scoreTextPassed: { color: GREEN },
  scoreTextFailed: { color: RED },
  resultTitle: { fontSize: 20, fontWeight: '700', color: '#222222', marginTop: 18 },
  resultSubtitle: { fontSize: 12, color: '#888888', marginTop: 5, textAlign: 'center' },
  resultStats: { flexDirection: 'row', width: '100%', marginTop: 25, gap: 8 },
  statBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statValue: { fontSize: 15, fontWeight: '700', color: '#222222' },
  statLabel: { fontSize: 10, color: '#999999', marginTop: 3 },
  resultBanner: { width: '100%', borderRadius: 10, padding: 14, marginTop: 15 },
  resultBannerPassed: { backgroundColor: '#EAF9EF' },
  resultBannerFailed: { backgroundColor: '#FFF1EC' },
  resultBannerTitle: { fontSize: 12, fontWeight: '700', color: '#222222', marginBottom: 4 },
  resultBannerText: { fontSize: 10, color: '#777777' },

  section: { width: '100%', marginTop: 25 },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 11,
    padding: 13,
    marginBottom: 9,
  },
  topicText: { flex: 1 },
  topicTitle: { fontSize: 13, fontWeight: '700', color: '#222222' },
  topicSubtitle: { fontSize: 10, color: '#999999', marginTop: 3 },

  reviewCard: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 11,
    padding: 14,
    marginBottom: 10,
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  reviewMark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  reviewMarkText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  reviewNumber: { fontSize: 11, fontWeight: '700', color: '#222222' },
  reviewQuestion: { fontSize: 13, fontWeight: '600', color: '#222222', marginBottom: 8, lineHeight: 19 },
  answerLine: { fontSize: 11, fontWeight: '700', marginBottom: 3 },
  explanation: { fontSize: 11, color: '#777777', lineHeight: 17, marginTop: 6 },

  resultButtons: { width: '100%', marginTop: 25 },
});
