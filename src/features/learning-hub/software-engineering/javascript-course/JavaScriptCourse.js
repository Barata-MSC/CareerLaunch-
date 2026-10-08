// Entry point for the JavaScript course.
// Registered in AppNavigator as the "JavaScriptCourse" screen.
// It switches between four views (lessons -> quiz intro -> quiz -> result)
// using plain state, so the main navigator doesn't need extra routes.
import React, { useState } from 'react';

import { LESSONS, gradeQuiz } from './CourseData';
import { getCourseProgress, recordQuizResult } from './CourseStore';
import LessonsScreen from './LessonScreen';
import QuizIntroScreen from './QuizIntroScreen';
import QuizScreen from './QuizScreen';
import QuizResultScreen from './QuizResultsScreen';

export default function JavaScriptCourse({ navigation }) {
  const [view, setView] = useState('lessons'); // 'lessons' | 'intro' | 'quiz' | 'result'
  const [result, setResult] = useState(null);
  const [quizAttempt, setQuizAttempt] = useState(0); // changing this restarts the quiz fresh

  // Open on the first lesson that isn't completed yet (or lesson 1).
  const [lessonIndex, setLessonIndex] = useState(() => {
    const { completedLessonIds } = getCourseProgress();
    return Math.max(0, LESSONS.findIndex((l) => !completedLessonIds.includes(l.id)));
  });

  const handleSubmit = (answers) => {
    const graded = gradeQuiz(answers);
    recordQuizResult(graded);
    setResult(graded);
    setView('result');
  };

  const startQuiz = () => {
    setQuizAttempt((n) => n + 1);
    setView('quiz');
  };

  const goToLesson = (index) => {
    setLessonIndex(index);
    setView('lessons');
  };

  if (view === 'intro') {
    return <QuizIntroScreen onBack={() => setView('lessons')} onStart={startQuiz} />;
  }

  if (view === 'quiz') {
    return (
      <QuizScreen
        key={quizAttempt}
        onBack={() => setView('intro')}
        onSubmit={handleSubmit}
      />
    );
  }

  if (view === 'result') {
    return (
      <QuizResultScreen
        result={result}
        onBack={() => setView('intro')}
        onViewRoadmap={() => navigation.popTo('CareerRoadmap')}
        onReviewLesson={goToLesson}
        onRetake={startQuiz}
      />
    );
  }

  return (
    <LessonsScreen
      lessonIndex={lessonIndex}
      onChangeLesson={setLessonIndex}
      onBack={() => navigation.goBack()}
      onGoToQuiz={() => setView('intro')}
    />
  );
}