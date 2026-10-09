// The standard course flow (taken from the original CSSCourse.js):
//   lessons -> lesson -> lessonList -> quizIntro -> quiz -> result
// Every course renders this with its own `course` config, so all courses share
// one design and one flow. Progress is saved to Supabase by useCourseProgress.
import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, BackHandler, View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useCourseProgress from './progress/useCourseProgress';
import { withStatus, pickQuizQuestions } from './courseUtils';
import { PURPLE } from './styles';

import LessonsScreen from './screens/LessonsScreen';
import LessonScreen from './screens/LessonScreen';
import LessonListScreen from './screens/LessonListScreen';
import QuizIntroScreen from './screens/QuizIntroScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';

export default function CourseRunner({ course, navigation }) {
  // The quiz uses a set picked from the question bank (see pickQuizQuestions).
  // Courses without `quizSize` use all of their questions, same as before.
  const [questions, setQuestions] = useState(() =>
    pickQuizQuestions(course.questions, course.quizSize),
  );
  const quizCourse = useMemo(() => ({ ...course, questions }), [course, questions]);

  const progress = useCourseProgress(course.id);
  const lessons = useMemo(
    () => withStatus(course.lessons, progress.completedLessonIds),
    [course.lessons, progress.completedLessonIds],
  );

  const [screen, setScreen] = useState('lessons');
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [saveError, setSaveError] = useState(false);

  // ---------- Navigation ----------
  const goToLessons = () => setScreen('lessons');

  // Back button: leave the course from the main list, otherwise go back to it
  const handleBack = () => {
    if (screen === 'lessons') {
      navigation?.goBack();
    } else {
      goToLessons();
    }
  };

  // Android hardware back button follows the same rule as the header arrow
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen === 'lessons') return false; // let the navigator handle it
      goToLessons();
      return true;
    });
    return () => sub.remove();
  }, [screen]);

  // ---------- Lessons ----------
  const openLesson = (index) => {
    setSelectedLesson(index);
    setScreen('lesson');
  };

  const nextLesson = () => {
    if (selectedLesson < lessons.length - 1) {
      setSelectedLesson(selectedLesson + 1);
    } else {
      setScreen('lessonList');
    }
  };

  const previousLesson = () => {
    if (selectedLesson > 0) setSelectedLesson(selectedLesson - 1);
  };

  // ---------- Quiz ----------
  const startQuiz = () => {
    setQuestions(pickQuizQuestions(course.questions, course.quizSize));
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(0);
    setSaveError(false);
    setScreen('quiz');
  };

  const previousQuestion = () => {
    if (questionIndex > 0) {
      const updatedAnswers = [...answers];
      if (selectedAnswer !== null) updatedAnswers[questionIndex] = selectedAnswer;

      const previousIndex = questionIndex - 1;
      setAnswers(updatedAnswers);
      setQuestionIndex(previousIndex);
      setSelectedAnswer(updatedAnswers[previousIndex] ?? null);
    } else {
      setScreen('quizIntro');
    }
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) return;

    // Store the answer by position so going back and re-answering works
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(updatedAnswers[questionIndex + 1] ?? null);
    } else {
      const finalScore = updatedAnswers.filter(
        (answer, i) => answer === questions[i].correct,
      ).length;
      const percent = Math.round((finalScore / questions.length) * 100);

      setScore(finalScore);
      setSelectedAnswer(null);
      setSaveError(false);
      setScreen('result');

      // Save in the background; the result screen says so if it fails.
      progress
        .recordAttempt({
          score: finalScore,
          total: questions.length,
          percent,
          passed: percent >= course.passingPercent,
        })
        .then(({ error }) => {
          if (error) setSaveError(true);
        });
    }
  };

  // Wait for saved progress so lesson statuses don't flash the wrong value.
  if (progress.loading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centered]}>
        <ActivityIndicator size="large" color={PURPLE} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {!!progress.error && (
        <View style={styles.errorBar}>
          <Text style={styles.errorBarText}>{progress.error}</Text>
        </View>
      )}

      {screen === 'lessons' && (
        <LessonsScreen
          course={course}
          lessons={lessons}
          onBack={handleBack}
          onOpenLesson={openLesson}
          onStartQuiz={() => setScreen('quizIntro')}
        />
      )}

      {screen === 'lesson' && (
        <LessonScreen
          course={course}
          lessons={lessons}
          lessonIndex={selectedLesson}
          onBack={handleBack}
          onPrevious={previousLesson}
          onNext={nextLesson}
          onToggleComplete={progress.toggleLesson}
        />
      )}

      {screen === 'lessonList' && (
        <LessonListScreen
          course={course}
          lessons={lessons}
          onBack={handleBack}
          onOpenLesson={openLesson}
          onStartQuiz={() => setScreen('quizIntro')}
        />
      )}

      {screen === 'quizIntro' && (
        <QuizIntroScreen course={quizCourse} onBack={handleBack} onStart={startQuiz} />
      )}

      {screen === 'quiz' && (
        <QuizScreen
          course={quizCourse}
          questionIndex={questionIndex}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={setSelectedAnswer}
          onPrevious={previousQuestion}
          onNext={nextQuestion}
          onBack={handleBack}
        />
      )}

      {screen === 'result' && (
        <ResultScreen
          course={{ ...quizCourse, lessons }}
          answers={answers}
          score={score}
          saveError={saveError}
          onBack={handleBack}
          onOpenLesson={openLesson}
          onReviewLessons={() => setScreen('lessonList')}
          onRetake={startQuiz}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBar: {
    backgroundColor: '#FFF1EC',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  errorBarText: {
    color: '#C2410C',
    fontSize: 11,
    textAlign: 'center',
  },
});
