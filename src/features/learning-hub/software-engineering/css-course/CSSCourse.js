import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PURPLE = '#5B21F5';
const LIGHT_PURPLE = '#F0EBFF';
const GREEN = '#16A34A';
const RED = '#F97316';
const GRAY = '#9CA3AF';

const LESSONS = [
  {
    id: 1,
    title: 'CSS fundamentals',
    subtitle: 'Selectors, properties, and values',
    status: 'completed',
    contentTitle: 'CSS basics',
    description:
      'CSS is used to style HTML elements. It controls colors, spacing, fonts, layouts, and the overall appearance of a webpage.',
    code: `body {
  background-color: white;
  color: black;
}`,
  },
  {
    id: 2,
    title: 'Selectors',
    subtitle: 'Targeting HTML elements',
    status: 'in-progress',
    contentTitle: 'CSS selectors',
    description:
      'Selectors are used to choose which HTML elements you want to style. Common selectors include element, class, and ID selectors.',
    code: `.title {
  color: purple;
  font-size: 24px;
}`,
  },
  {
    id: 3,
    title: 'Box model',
    subtitle: 'Margin, border, padding, content',
    status: 'not-started',
    contentTitle: 'The CSS box model',
    description:
      'Every HTML element can be understood as a box. The box model contains content, padding, border, and margin.',
    code: `.card {
  padding: 20px;
  border: 1px solid gray;
  margin: 10px;
}`,
  },
  {
    id: 4,
    title: 'Flexbox',
    subtitle: 'Creating flexible layouts',
    status: 'not-started',
    contentTitle: 'Flexbox layout',
    description:
      'Flexbox makes it easier to arrange elements in rows or columns and control their alignment and spacing.',
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
  },
  {
    id: 5,
    title: 'Responsive design',
    subtitle: 'Making websites adapt',
    status: 'not-started',
    contentTitle: 'Responsive CSS',
    description:
      'Responsive design allows a webpage to adjust to different screen sizes using flexible layouts and media queries.',
    code: `@media (max-width: 600px) {
  .container {
    width: 100%;
  }
}`,
  },
];

const QUESTIONS = [
  {
    question: 'What does CSS stand for?',
    answers: [
      'Computer Style Sheets',
      'Cascading Style Sheets',
      'Creative Style System',
      'Colorful Style Sheets',
    ],
    correct: 1,
  },
  {
    question: 'Which property changes the text color?',
    answers: [
      'font-style',
      'background',
      'color',
      'text-size',
    ],
    correct: 2,
  },
  {
    question: 'Which property is used to create space inside an element?',
    answers: [
      'margin',
      'padding',
      'border',
      'spacing',
    ],
    correct: 1,
  },
  {
    question: 'Which CSS layout system is useful for arranging items in rows or columns?',
    answers: [
      'Flexbox',
      'HTML',
      'SQL',
      'JSON',
    ],
    correct: 0,
  },
  {
    question: 'Which rule is commonly used for responsive designs?',
    answers: [
      '@screen',
      '@responsive',
      '@media',
      '@mobile',
    ],
    correct: 2,
  },
];

export default function CSSCourseScreen({ navigation }) {
  const [screen, setScreen] = useState('lessons');
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const completedLessons = LESSONS.filter(
    lesson => lesson.status === 'completed'
  ).length;

  const progress = Math.round(
    (completedLessons / LESSONS.length) * 100
  );

  const openLesson = index => {
    setSelectedLesson(index);
    setScreen('lesson');
  };

  const nextLesson = () => {
    if (selectedLesson < LESSONS.length - 1) {
      setSelectedLesson(selectedLesson + 1);
    } else {
      setScreen('lessonList');
    }
  };

  const previousLesson = () => {
    if (selectedLesson > 0) {
      setSelectedLesson(selectedLesson - 1);
    }
  };

  const startQuiz = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(0);
    setScreen('quiz');
  };

  const selectAnswer = index => {
    setSelectedAnswer(index);
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) {
      return;
    }

    const updatedAnswers = [...answers, selectedAnswer];
    setAnswers(updatedAnswers);

    if (selectedAnswer === QUESTIONS[questionIndex].correct) {
      setScore(score + 1);
    }

    setSelectedAnswer(null);

    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      const finalScore =
        score +
        (selectedAnswer === QUESTIONS[questionIndex].correct ? 1 : 0);

      setScore(finalScore);
      setScreen('result');
    }
  };

  const retakeQuiz = () => {
    startQuiz();
  };

  const renderHeader = title => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (screen === 'lessons') {
              navigation?.goBack();
            } else {
              setScreen('lessons');
            }
          }}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{title}</Text>

        <View style={styles.headerSpacer} />
      </View>
    );
  };

  const renderLessons = () => {
    return (
      <>
        {renderHeader('Lessons')}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.courseHeader}>
            <View style={styles.courseIcon}>
              <Text style={styles.courseIconText}>CSS</Text>
            </View>

            <View style={styles.courseHeaderText}>
              <Text style={styles.courseTitle}>CSS fundamentals</Text>
              <Text style={styles.courseSubtitle}>
                Learn how to style and design webpages.
              </Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressTop}>
              <Text style={styles.progressText}>
                {completedLessons} of {LESSONS.length} lessons
              </Text>

              <Text style={styles.progressPercent}>
                {progress}%
              </Text>
            </View>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%` },
                ]}
              />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Your lessons</Text>

          <View style={styles.lessonList}>
            {LESSONS.map((lesson, index) => (
              <TouchableOpacity
                key={lesson.id}
                style={styles.lessonCard}
                onPress={() => openLesson(index)}
              >
                <View
                  style={[
                    styles.lessonNumber,
                    lesson.status === 'completed' &&
                      styles.lessonCompleted,
                    lesson.status === 'in-progress' &&
                      styles.lessonCurrent,
                  ]}
                >
                  {lesson.status === 'completed' ? (
                    <Text style={styles.check}>✓</Text>
                  ) : (
                    <Text
                      style={[
                        styles.lessonNumberText,
                        lesson.status === 'in-progress' &&
                          styles.currentNumber,
                      ]}
                    >
                      {lesson.id}
                    </Text>
                  )}
                </View>

                <View style={styles.lessonText}>
                  <Text style={styles.lessonTitle}>
                    {lesson.title}
                  </Text>

                  <Text style={styles.lessonSubtitle}>
                    {lesson.subtitle}
                  </Text>

                  <Text
                    style={[
                      styles.lessonStatus,
                      lesson.status === 'in-progress' &&
                        styles.activeStatus,
                    ]}
                  >
                    {lesson.status === 'completed'
                      ? 'Completed'
                      : lesson.status === 'in-progress'
                      ? 'In progress'
                      : 'Not started'}
                  </Text>
                </View>

                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.quizButton}
            onPress={() => setScreen('quizIntro')}
          >
            <Text style={styles.quizButtonText}>
              Take the Quiz
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </>
    );
  };

  const renderLesson = () => {
    const lesson = LESSONS[selectedLesson];

    return (
      <>
        {renderHeader(`Lesson ${lesson.id} of ${LESSONS.length}`)}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.lessonProgressHeader}>
            <Text style={styles.smallText}>
              Lesson {lesson.id} of {LESSONS.length}
            </Text>

            <View style={styles.smallProgressBackground}>
              <View
                style={[
                  styles.smallProgressFill,
                  {
                    width: `${
                      (lesson.id / LESSONS.length) * 100
                    }%`,
                  },
                ]}
              />
            </View>
          </View>

          <Text style={styles.bigLessonTitle}>
            {lesson.title}
          </Text>

          <Text style={styles.topicLabel}>CSS</Text>

          <Text style={styles.contentTitle}>
            {lesson.contentTitle}
          </Text>

          <Text style={styles.description}>
            {lesson.description}
          </Text>

          <View style={styles.codeCard}>
            <Text style={styles.codeText}>{lesson.code}</Text>
          </View>

          <TouchableOpacity style={styles.completeCard}>
            <View style={styles.radioCircle} />
            <Text style={styles.completeText}>
              Mark as completed
            </Text>
          </TouchableOpacity>

          <View style={styles.lessonButtons}>
            <TouchableOpacity
              style={[
                styles.previousButton,
                selectedLesson === 0 &&
                  styles.disabledButton,
              ]}
              onPress={previousLesson}
              disabled={selectedLesson === 0}
            >
              <Text style={styles.previousText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={nextLesson}
            >
              <Text style={styles.nextText}>
                {selectedLesson === LESSONS.length - 1
                  ? 'Lessons'
                  : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  };

  const renderLessonList = () => {
    return (
      <>
        {renderHeader('Lessons')}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Text style={styles.sectionTitle}>
            CSS fundamentals · Lessons
          </Text>

          {LESSONS.map((lesson, index) => (
            <TouchableOpacity
              key={lesson.id}
              style={styles.lessonRow}
              onPress={() => openLesson(index)}
            >
              <View
                style={[
                  styles.radioCircle,
                  lesson.status === 'completed' &&
                    styles.radioCompleted,
                  lesson.status === 'in-progress' &&
                    styles.radioActive,
                ]}
              >
                {lesson.status === 'completed' && (
                  <Text style={styles.radioCheck}>✓</Text>
                )}

                {lesson.status === 'in-progress' && (
                  <View style={styles.radioDot} />
                )}
              </View>

              <View style={styles.lessonRowText}>
                <Text style={styles.lessonRowTitle}>
                  {lesson.id}. {lesson.title}
                </Text>

                <Text style={styles.lessonRowSubtitle}>
                  {lesson.status === 'completed'
                    ? 'Completed'
                    : lesson.status === 'in-progress'
                    ? 'In progress'
                    : 'Not started'}
                </Text>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.quizButton}
            onPress={() => setScreen('quizIntro')}
          >
            <Text style={styles.quizButtonText}>
              Continue to Quiz
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </>
    );
  };

  const renderQuizIntro = () => {
    return (
      <>
        {renderHeader('Quiz')}

        <View style={styles.quizIntro}>
          <View style={styles.quizIcon}>
            <Text style={styles.quizIconText}>✓</Text>
          </View>

          <Text style={styles.quizTitle}>
            CSS fundamentals Quiz
          </Text>

          <Text style={styles.quizDescription}>
            Check your understanding of the lessons you have
            completed.
          </Text>

          <View style={styles.quizInfo}>
            <View>
              <Text style={styles.infoLabel}>Questions</Text>
              <Text style={styles.infoValue}>5 questions</Text>
            </View>

            <View>
              <Text style={styles.infoLabel}>Format</Text>
              <Text style={styles.infoValue}>Multiple choice</Text>
            </View>

            <View>
              <Text style={styles.infoLabel}>Estimated time</Text>
              <Text style={styles.infoValue}>About 5 min</Text>
            </View>

            <View>
              <Text style={styles.infoLabel}>Passing score</Text>
              <Text style={styles.infoValue}>70% or higher</Text>
            </View>
          </View>

          <View style={styles.quizRules}>
            <Text style={styles.rulesTitle}>How it works</Text>
            <Text style={styles.rule}>• Choose one answer for each question</Text>
            <Text style={styles.rule}>• Go back to change an answer before submitting</Text>
            <Text style={styles.rule}>• See your score and explanations at the end</Text>
            <Text style={styles.rule}>• Retake the quiz anytime</Text>
          </View>

          <TouchableOpacity
            style={styles.quizButton}
            onPress={startQuiz}
          >
            <Text style={styles.quizButtonText}>
              Take the Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderQuiz = () => {
    const question = QUESTIONS[questionIndex];

    return (
      <>
        {renderHeader('Quiz')}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.questionHeader}>
            <Text style={styles.smallText}>
              HTML fundamentals · Quiz
            </Text>

            <Text style={styles.questionCounter}>
              Question {questionIndex + 1} of {QUESTIONS.length}
            </Text>
          </View>

          <View style={styles.questionProgressBackground}>
            <View
              style={[
                styles.questionProgressFill,
                {
                  width: `${
                    ((questionIndex + 1) /
                      QUESTIONS.length) *
                    100
                  }%`,
                },
              ]}
            />
          </View>

          <Text style={styles.questionText}>
            {question.question}
          </Text>

          <View style={styles.answerList}>
            {question.answers.map((answer, index) => {
              const selected = selectedAnswer === index;

              return (
                <TouchableOpacity
                  key={answer}
                  style={[
                    styles.answerButton,
                    selected && styles.answerSelected,
                  ]}
                  onPress={() => selectAnswer(index)}
                >
                  <View
                    style={[
                      styles.answerCircle,
                      selected && styles.answerCircleSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.answerLetter,
                        selected &&
                          styles.answerLetterSelected,
                      ]}
                    >
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.answerText,
                      selected && styles.answerTextSelected,
                    ]}
                  >
                    {answer}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.lessonButtons}>
            <TouchableOpacity
              style={styles.previousButton}
              onPress={() => {
                if (questionIndex > 0) {
                  setQuestionIndex(questionIndex - 1);
                  setSelectedAnswer(answers[questionIndex - 1]);
                } else {
                  setScreen('quizIntro');
                }
              }}
            >
              <Text style={styles.previousText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.nextButton,
                selectedAnswer === null &&
                  styles.disabledNext,
              ]}
              onPress={nextQuestion}
              disabled={selectedAnswer === null}
            >
              <Text style={styles.nextText}>
                {questionIndex === QUESTIONS.length - 1
                  ? 'Submit'
                  : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  };

  const renderResult = () => {
    const percentage = Math.round(
      (score / QUESTIONS.length) * 100
    );

    const passed = percentage >= 70;

    return (
      <>
        {renderHeader('Quiz Result')}

        <View style={styles.resultContainer}>
          <View
            style={[
              styles.scoreCircle,
              passed
                ? styles.scorePassed
                : styles.scoreFailed,
            ]}
          >
            <Text
              style={[
                styles.scoreText,
                passed
                  ? styles.scoreTextPassed
                  : styles.scoreTextFailed,
              ]}
            >
              {percentage}%
            </Text>
          </View>

          <Text style={styles.resultTitle}>
            {passed ? 'Great job!' : 'Almost there!'}
          </Text>

          <Text style={styles.resultSubtitle}>
            {passed
              ? 'You passed the CSS fundamentals quiz.'
              : 'Review the lessons and try the quiz again.'}
          </Text>

          <View style={styles.resultStats}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {score}/{QUESTIONS.length}
              </Text>
              <Text style={styles.statLabel}>Score</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>{score}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {QUESTIONS.length - score}
              </Text>
              <Text style={styles.statLabel}>Incorrect</Text>
            </View>
          </View>

          <View
            style={[
              styles.resultBanner,
              passed
                ? styles.resultBannerPassed
                : styles.resultBannerFailed,
            ]}
          >
            <Text style={styles.resultBannerTitle}>
              {passed
                ? 'CSS fundamentals completed'
                : 'Keep practicing'}
            </Text>

            <Text style={styles.resultBannerText}>
              {passed
                ? 'Your learning progress has been updated.'
                : 'You can review the lessons and retake the quiz.'}
            </Text>
          </View>

          <View style={styles.resultButtons}>
            <TouchableOpacity
              style={styles.previousButton}
              onPress={() => setScreen('lessonList')}
            >
              <Text style={styles.previousText}>
                Review lessons
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={retakeQuiz}
            >
              <Text style={styles.nextText}>
                Retake quiz
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {screen === 'lessons' && renderLessons()}
      {screen === 'lesson' && renderLesson()}
      {screen === 'lessonList' && renderLessonList()}
      {screen === 'quizIntro' && renderQuizIntro()}
      {screen === 'quiz' && renderQuiz()}
      {screen === 'result' && renderResult()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },

  backArrow: {
    fontSize: 32,
    color: '#222222',
    lineHeight: 32,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
  },

  headerSpacer: {
    width: 25,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
  },

  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: LIGHT_PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  courseIconText: {
    color: PURPLE,
    fontWeight: '800',
    fontSize: 13,
  },

  courseHeaderText: {
    flex: 1,
  },

  courseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222222',
  },

  courseSubtitle: {
    fontSize: 12,
    color: '#8A8A8A',
    marginTop: 4,
  },

  progressSection: {
    marginBottom: 25,
  },

  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  progressText: {
    fontSize: 12,
    color: '#777777',
  },

  progressPercent: {
    fontSize: 12,
    color: PURPLE,
    fontWeight: '700',
  },

  progressBackground: {
    height: 7,
    borderRadius: 5,
    backgroundColor: '#E8E8E8',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: PURPLE,
    borderRadius: 5,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 14,
  },

  lessonList: {
    gap: 10,
  },

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

  lessonCompleted: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },

  lessonCurrent: {
    borderColor: PURPLE,
  },

  lessonNumberText: {
    color: '#999999',
    fontWeight: '600',
    fontSize: 12,
  },

  currentNumber: {
    color: PURPLE,
  },

  check: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  lessonText: {
    flex: 1,
  },

  lessonTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222222',
  },

  lessonSubtitle: {
    fontSize: 11,
    color: '#929292',
    marginTop: 3,
  },

  lessonStatus: {
    fontSize: 10,
    color: '#AAAAAA',
    marginTop: 5,
  },

  activeStatus: {
    color: PURPLE,
    fontWeight: '700',
  },

  chevron: {
    fontSize: 24,
    color: '#BDBDBD',
    marginLeft: 8,
  },

  quizButton: {
    backgroundColor: PURPLE,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 25,
  },

  quizButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  lessonProgressHeader: {
    marginBottom: 20,
  },

  smallText: {
    fontSize: 11,
    color: '#929292',
  },

  smallProgressBackground: {
    height: 5,
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
    marginTop: 9,
    overflow: 'hidden',
  },

  smallProgressFill: {
    height: '100%',
    backgroundColor: PURPLE,
  },

  bigLessonTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 10,
  },

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

  contentTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 8,
  },

  description: {
    fontSize: 13,
    lineHeight: 20,
    color: '#555555',
    marginBottom: 18,
  },

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
    fontFamily: 'monospace',
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

  completeText: {
    fontSize: 12,
    color: '#555555',
    marginLeft: 9,
  },

  lessonButtons: {
    flexDirection: 'row',
    gap: 10,
  },

  previousButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: PURPLE,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },

  previousText: {
    color: PURPLE,
    fontSize: 13,
    fontWeight: '700',
  },

  nextButton: {
    flex: 1,
    backgroundColor: PURPLE,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },

  nextText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  disabledButton: {
    borderColor: '#D9D9D9',
  },

  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 11,
    padding: 13,
    marginBottom: 9,
  },

  lessonRowText: {
    flex: 1,
    marginLeft: 12,
  },

  lessonRowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222222',
  },

  lessonRowSubtitle: {
    fontSize: 10,
    color: '#999999',
    marginTop: 3,
  },

  radioCompleted: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },

  radioActive: {
    borderColor: PURPLE,
  },

  radioCheck: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PURPLE,
  },

  quizIntro: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 50,
  },

  quizIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: LIGHT_PURPLE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  quizIconText: {
    fontSize: 26,
    color: PURPLE,
    fontWeight: '700',
  },

  quizTitle: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: '700',
    color: '#222222',
  },

  quizDescription: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: '#888888',
    marginTop: 8,
    marginBottom: 25,
  },

  quizInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    paddingVertical: 18,
  },

  infoLabel: {
    fontSize: 10,
    color: '#999999',
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333333',
  },

  quizRules: {
    marginTop: 22,
  },

  rulesTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },

  rule: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 7,
    lineHeight: 16,
  },

  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  questionCounter: {
    fontSize: 11,
    color: '#888888',
  },

  questionProgressBackground: {
    height: 5,
    borderRadius: 5,
    backgroundColor: '#E5E5E5',
    marginBottom: 30,
    overflow: 'hidden',
  },

  questionProgressFill: {
    height: '100%',
    backgroundColor: PURPLE,
  },

  questionText: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 20,
  },

  answerList: {
    gap: 10,
  },

  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD6FF',
    borderRadius: 11,
    padding: 13,
  },

  answerSelected: {
    backgroundColor: LIGHT_PURPLE,
    borderColor: PURPLE,
  },

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

  answerCircleSelected: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },

  answerLetter: {
    fontSize: 11,
    color: '#777777',
    fontWeight: '600',
  },

  answerLetterSelected: {
    color: '#FFFFFF',
  },

  answerText: {
    flex: 1,
    fontSize: 12,
    color: '#444444',
  },

  answerTextSelected: {
    color: PURPLE,
    fontWeight: '600',
  },

  disabledNext: {
    opacity: 0.45,
  },

  resultContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 40,
  },

  scoreCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scorePassed: {
    borderColor: GREEN,
  },

  scoreFailed: {
    borderColor: RED,
  },

  scoreText: {
    fontSize: 26,
    fontWeight: '800',
  },

  scoreTextPassed: {
    color: GREEN,
  },

  scoreTextFailed: {
    color: RED,
  },

  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222222',
    marginTop: 18,
  },

  resultSubtitle: {
    fontSize: 12,
    color: '#888888',
    marginTop: 5,
    textAlign: 'center',
  },

  resultStats: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 25,
    gap: 8,
  },

  statBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222222',
  },

  statLabel: {
    fontSize: 10,
    color: '#999999',
    marginTop: 3,
  },

  resultBanner: {
    width: '100%',
    borderRadius: 10,
    padding: 14,
    marginTop: 15,
  },

  resultBannerPassed: {
    backgroundColor: '#EAF9EF',
  },

  resultBannerFailed: {
    backgroundColor: '#FFF1EC',
  },

  resultBannerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 4,
  },

  resultBannerText: {
    fontSize: 10,
    color: '#777777',
  },

  resultButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginTop: 20,
  },
});