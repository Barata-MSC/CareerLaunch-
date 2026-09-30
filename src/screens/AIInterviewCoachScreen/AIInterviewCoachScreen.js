// src/screens/AIInterviewCoachScreen/AIInterviewCoachScreen.js
// Uses only core React Native, so no extra packages are needed.
// Simulated interview practice: pick a question, "answer" it by voice
// (tap-to-record) or by typing, get instant feedback, then a final
// results summary once all questions are done. Past session scores are
// kept in memory so the user can see their progress improve over time.
//
// Text answers are scored on Grammar + Punctuation (heuristic checks
// on the actual typed text). Voice answers are scored on Confidence +
// Clarity (simulated, since there's no real speech analysis here).

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';

const MIC_ICON = require('@assets/mic-icon.png');

const PURPLE = '#5B21F5';
const PURPLE_DARK = '#3D14C4';
const PURPLE_LIGHT = '#F1EEFF';
const GOLD = '#FFB020';
const GRAY_STAR = '#E5E5EA';
const GREEN = '#2ECC71';

const QUESTIONS = [
  { id: '1', category: 'Introduction', prompt: 'Tell me a little about yourself.' },
  { id: '2', category: 'Introduction', prompt: 'Why do you want to work in this field?' },
  { id: '3', category: 'Strengths & Weaknesses', prompt: 'What would you say is your greatest strength?' },
  { id: '4', category: 'Strengths & Weaknesses', prompt: 'What is one weakness you are working to improve?' },
  { id: '5', category: 'Work Experience', prompt: 'Describe a project or task you are proud of.' },
  { id: '6', category: 'Problem-Solving', prompt: 'Tell me about a time you solved a difficult problem.' },
  { id: '7', category: 'Problem-Solving', prompt: 'How do you approach a task you have never done before?' },
  { id: '8', category: 'Career Goals', prompt: 'Where do you see yourself in five years?' },
  { id: '9', category: 'Behavioral', prompt: 'Describe a time you worked well in a team.' },
  { id: '10', category: 'Behavioral', prompt: 'How do you handle feedback or criticism?' },
];

const RATING_LABELS = ['Needs Work', 'Fair', 'Good', 'Very Good', 'Excellent'];

const VOICE_SUGGESTIONS = [
  'Try to give more specific examples from your own experience.',
  'Keep your answer a bit more concise and focused on the outcome.',
  'Structure your answer with a clear beginning, middle, and end.',
  'Mention a measurable result to make your answer stronger.',
  'Slow down slightly and emphasize your key point.',
];

const TEXT_SUGGESTIONS = [
  'Start each sentence with a capital letter for a more polished answer.',
  'End your sentences with proper punctuation (. ! ?).',
  'Remember to capitalize "I" whenever you refer to yourself.',
  'Watch out for double spaces or accidentally repeated words.',
  'Try breaking a long answer into a few clear, separate sentences.',
];

// ----- Voice scoring: simulated confidence/clarity based on a
// simulated transcript length (there's no real speech analysis here). -----
function generateVoiceFeedback() {
  const wordCount = 12 + Math.floor(Math.random() * 40);

  let stars = 2;
  if (wordCount >= 45) stars = 5;
  else if (wordCount >= 30) stars = 4;
  else if (wordCount >= 18) stars = 3;
  else stars = 2;

  const confidenceStars = Math.min(5, Math.max(1, stars + (Math.random() > 0.5 ? 0 : -1)));
  const clarityStars = Math.min(5, Math.max(1, stars + (Math.random() > 0.5 ? 0 : 1) - 1));
  const overall = Math.round((stars + confidenceStars + clarityStars) / 3);

  return {
    usedVoice: true,
    stars: overall,
    metricAName: 'Confidence',
    metricAValue: RATING_LABELS[confidenceStars - 1],
    metricBName: 'Clarity',
    metricBValue: RATING_LABELS[clarityStars - 1],
    suggestion: VOICE_SUGGESTIONS[Math.floor(Math.random() * VOICE_SUGGESTIONS.length)],
  };
}

// ----- Text scoring: real heuristic checks on the typed answer for
// grammar and punctuation, plus a length-based completeness check. -----
function generateTextFeedback(answerText) {
  const trimmed = answerText.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  let grammarIssues = 0;
  if (!/^[A-Z]/.test(trimmed)) grammarIssues++;
  if (/\bi\b/.test(trimmed)) grammarIssues++;
  if (/ {2,}/.test(trimmed)) grammarIssues++;
  if (/\b(\w+)\s+\1\b/i.test(trimmed)) grammarIssues++;
  const grammarStars = Math.min(5, Math.max(1, 5 - grammarIssues));

  let punctuationIssues = 0;
  if (!/[.!?]$/.test(trimmed)) punctuationIssues++;
  const sentenceCount = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  if (sentenceCount === 0) punctuationIssues++;
  if (/[.,](?=\S)/.test(trimmed)) punctuationIssues++;
  const punctuationStars = Math.min(5, Math.max(1, 5 - punctuationIssues));

  let completenessStars = 2;
  if (wordCount >= 45) completenessStars = 5;
  else if (wordCount >= 30) completenessStars = 4;
  else if (wordCount >= 18) completenessStars = 3;
  else if (wordCount < 8) completenessStars = 1;

  const overall = Math.round((grammarStars + punctuationStars + completenessStars) / 3);

  return {
    usedVoice: false,
    stars: overall,
    metricAName: 'Grammar',
    metricAValue: RATING_LABELS[grammarStars - 1],
    metricBName: 'Punctuation',
    metricBValue: RATING_LABELS[punctuationStars - 1],
    suggestion: TEXT_SUGGESTIONS[Math.floor(Math.random() * TEXT_SUGGESTIONS.length)],
  };
}

function generateFeedback(answerText, usedVoice) {
  return usedVoice ? generateVoiceFeedback() : generateTextFeedback(answerText);
}

function StarRow({ count, size = 20 }) {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text
          key={i}
          style={{ fontSize: size, color: i <= count ? GOLD : GRAY_STAR, marginRight: 2 }}
        >
          ★
        </Text>
      ))}
    </View>
  );
}

export default function AIInterviewCoachScreen({ navigation }) {
  const [view, setView] = useState('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [useTextInput, setUseTextInput] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [answers, setAnswers] = useState([]);
  const [pastResults, setPastResults] = useState([]);

  const currentQuestion = QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  const canSubmit = hasRecording || answerText.trim().length > 0;

  const resetAnswerInputs = () => {
    setIsRecording(false);
    setHasRecording(false);
    setUseTextInput(false);
    setAnswerText('');
  };

  const handleStart = () => {
    setAnswers([]);
    setCurrentIndex(0);
    resetAnswerInputs();
    setView('question');
  };

  const handleMicPress = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecording(true);
    } else {
      setAnswerText('');
      setHasRecording(false);
      setIsRecording(true);
    }
  };

  const handleSubmitAnswer = () => {
    if (!canSubmit) return;
    setView('analyzing');
    const usedVoice = hasRecording && !useTextInput;
    setTimeout(() => {
      const feedback = generateFeedback(answerText, usedVoice);
      setAnswers((prev) => [...prev, { question: currentQuestion, ...feedback }]);
      setView('feedback');
    }, 900);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const total = answers.reduce((sum, a) => sum + a.stars, 0);
      const scorePercent = Math.round((total / (answers.length * 5)) * 100);
      setPastResults((prev) => [
        { date: new Date().toLocaleDateString(), score: scorePercent },
        ...prev,
      ]);
      setView('results');
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    resetAnswerInputs();
    setView('question');
  };

  const handleExit = () => {
    if (view === 'intro') {
      navigation?.goBack();
      return;
    }
    Alert.alert('Exit practice?', 'Your progress on this session will be lost.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Exit', style: 'destructive', onPress: () => setView('intro') },
    ]);
  };

  const renderIntro = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.introIconWrap}>
        <Image source={MIC_ICON} style={styles.introIcon} resizeMode="contain" />
      </View>
      <Text style={styles.introTitle}>Practice with the AI Interview Coach</Text>
      <Text style={styles.introBody}>
        Answer {QUESTIONS.length} common interview questions by voice or text. Voice answers are
        scored on confidence and clarity; typed answers are scored on grammar and punctuation.
      </Text>

      <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={handleStart}>
        <Text style={styles.primaryButtonText}>Start Practice</Text>
      </TouchableOpacity>

      {pastResults.length > 0 && (
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          {pastResults.map((r, i) => (
            <View key={i} style={styles.progressRow}>
              <Text style={styles.progressDate}>{r.date}</Text>
              <Text style={styles.progressScore}>{r.score}%</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );

  const renderQuestion = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.progressLabel}>
        Question {currentIndex + 1} of {QUESTIONS.length}
      </Text>
      <View style={styles.categoryPill}>
        <Text style={styles.categoryPillText}>{currentQuestion.category}</Text>
      </View>
      <Text style={styles.questionText}>{currentQuestion.prompt}</Text>

      {!useTextInput ? (
        <>
          <TouchableOpacity
            style={[styles.micButton, isRecording && styles.micButtonActive]}
            activeOpacity={0.85}
            onPress={handleMicPress}
          >
            <Image source={MIC_ICON} style={styles.micIcon} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.micHint}>
            {isRecording
              ? 'Recording… tap again to stop'
              : hasRecording
              ? 'Answer recorded — tap Submit, or record again'
              : 'Tap to speak'}
          </Text>

          <TouchableOpacity onPress={() => setUseTextInput(true)}>
            <Text style={styles.switchInputText}>Type my answer instead</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.textAnswerInput}
            placeholder="Type your answer here..."
            placeholderTextColor="#9A9A9A"
            multiline
            value={answerText}
            onChangeText={setAnswerText}
          />
          <TouchableOpacity onPress={() => { setUseTextInput(false); setAnswerText(''); }}>
            <Text style={styles.switchInputText}>Use voice instead</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={[styles.primaryButton, !canSubmit && styles.primaryButtonDisabled]}
        activeOpacity={0.85}
        disabled={!canSubmit}
        onPress={handleSubmitAnswer}
      >
        <Text style={styles.primaryButtonText}>Submit Answer</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderAnalyzing = () => (
    <View style={styles.centerFill}>
      <ActivityIndicator size="large" color={PURPLE} />
      <Text style={styles.analyzingText}>Analyzing your answer…</Text>
    </View>
  );

  const renderFeedback = () => {
    const latest = answers[answers.length - 1];
    return (
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.progressLabel}>
          Feedback · Question {currentIndex + 1} of {QUESTIONS.length}
        </Text>

        <View style={styles.feedbackCard}>
          <View style={styles.feedbackRowTop}>
            <Text style={styles.feedbackLabel}>Overall Rating</Text>
            <View style={styles.modePill}>
              <Text style={styles.modePillText}>{latest.usedVoice ? 'Voice answer' : 'Text answer'}</Text>
            </View>
          </View>
          <StarRow count={latest.stars} size={24} />

          <View style={styles.feedbackRow}>
            <Text style={styles.feedbackLabel}>{latest.metricAName}</Text>
            <Text style={styles.feedbackValueGood}>{latest.metricAValue}</Text>
          </View>
          <View style={styles.feedbackRow}>
            <Text style={styles.feedbackLabel}>{latest.metricBName}</Text>
            <Text style={styles.feedbackValueGood}>{latest.metricBValue}</Text>
          </View>

          <Text style={[styles.feedbackLabel, { marginTop: 14 }]}>Suggestions</Text>
          <Text style={styles.suggestionText}>{latest.suggestion}</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={handleNextQuestion}>
          <Text style={styles.primaryButtonText}>
            {isLastQuestion ? 'See My Results' : 'Next Question'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderResults = () => {
    const total = answers.reduce((sum, a) => sum + a.stars, 0);
    const scorePercent = Math.round((total / (answers.length * 5)) * 100);
    const strengths = answers.filter((a) => a.stars >= 4).map((a) => a.question.category);
    const improve = answers.filter((a) => a.stars <= 2).map((a) => a.question.category);
    const uniqueStrengths = [...new Set(strengths)];
    const uniqueImprove = [...new Set(improve.length ? improve : ['Overall detail and structure'])];

    return (
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.resultsScoreWrap}>
          <Text style={styles.resultsScoreValue}>{scorePercent}%</Text>
          <Text style={styles.resultsScoreLabel}>Interview Score</Text>
        </View>

        <Text style={styles.sectionTitle}>Strengths</Text>
        {uniqueStrengths.length ? (
          uniqueStrengths.map((s, i) => (
            <Text key={i} style={styles.resultBullet}>• {s}</Text>
          ))
        ) : (
          <Text style={styles.resultBullet}>Keep practicing to build up your strengths.</Text>
        )}

        <Text style={styles.sectionTitle}>Areas for Improvement</Text>
        {uniqueImprove.map((s, i) => (
          <Text key={i} style={styles.resultBullet}>• {s}</Text>
        ))}

        <Text style={styles.sectionTitle}>Suggestions</Text>
        {[...new Set(answers.map((a) => a.suggestion))].slice(0, 3).map((s, i) => (
          <Text key={i} style={styles.resultBullet}>• {s}</Text>
        ))}

        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={handleStart}>
          <Text style={styles.primaryButtonText}>Practice Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation?.goBack()}>
          <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleExit}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Interview Coach</Text>
        <View style={styles.backButton} />
      </View>

      {view === 'intro' && renderIntro()}
      {view === 'question' && renderQuestion()}
      {view === 'analyzing' && renderAnalyzing()}
      {view === 'feedback' && renderFeedback()}
      {view === 'results' && renderResults()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backButton: { width: 32, height: 32, justifyContent: 'center' },
  backArrow: { fontSize: 26, color: '#111111', fontWeight: '400' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111111' },

  scrollContent: { paddingHorizontal: 24, paddingBottom: 40, alignItems: 'center' },
  centerFill: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  introIconWrap: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: PURPLE_LIGHT, alignItems: 'center', justifyContent: 'center',
    marginTop: 12, marginBottom: 20,
  },
  introIcon: { width: 44, height: 44 },
  introTitle: { fontSize: 22, fontWeight: '800', color: '#111111', textAlign: 'center', marginBottom: 10 },
  introBody: { fontSize: 14, color: '#6B6B85', textAlign: 'center', lineHeight: 20, marginBottom: 28 },

  progressSection: { width: '100%', marginTop: 28 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111111', marginTop: 20, marginBottom: 10, alignSelf: 'flex-start' },
  progressRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#E5E5EA', borderRadius: 12,
    paddingVertical: 12, paddingHorizontal: 16, marginBottom: 8, width: '100%',
  },
  progressDate: { fontSize: 13, color: '#6B6B85' },
  progressScore: { fontSize: 14, fontWeight: '700', color: PURPLE },

  progressLabel: { fontSize: 13, color: '#8E8E93', alignSelf: 'flex-start', marginTop: 4, marginBottom: 10 },
  categoryPill: {
    backgroundColor: PURPLE_LIGHT, borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 6, alignSelf: 'flex-start', marginBottom: 16,
  },
  categoryPillText: { fontSize: 12, fontWeight: '700', color: PURPLE },
  questionText: {
    fontSize: 20, fontWeight: '700', color: '#111111',
    textAlign: 'center', lineHeight: 28, marginBottom: 28, width: '100%',
  },
  micButton: {
    width: 88, height: 88, borderRadius: 44,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#FFFFFF', marginBottom: 10,
  },
  micButtonActive: { transform: [{ scale: 1.08 }] },
  micIcon: { width: 88, height: 88 },
  micHint: { fontSize: 13, color: '#8E8E93', marginBottom: 16, textAlign: 'center' },
  switchInputText: { fontSize: 13, fontWeight: '600', color: PURPLE, marginBottom: 24 },
  textAnswerInput: {
    width: '100%', minHeight: 110, borderWidth: 1, borderColor: '#DADADA',
    borderRadius: 12, padding: 14, fontSize: 14, color: '#111111',
    textAlignVertical: 'top', marginBottom: 12,
  },

  feedbackCard: {
    width: '100%', borderWidth: 1, borderColor: '#E5E5EA',
    borderRadius: 16, padding: 18, marginBottom: 24,
  },
  feedbackRowTop: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6,
  },
  modePill: { backgroundColor: PURPLE_LIGHT, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  modePillText: { fontSize: 11, fontWeight: '700', color: PURPLE },
  feedbackLabel: { fontSize: 13, color: '#6B6B85', marginBottom: 6 },
  starRow: { flexDirection: 'row', marginBottom: 14 },
  feedbackRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#F1F1F5',
  },
  feedbackValueGood: { fontSize: 14, fontWeight: '700', color: GREEN },
  suggestionText: { fontSize: 13, color: '#4B4B63', lineHeight: 19, marginTop: 4 },

  analyzingText: { marginTop: 14, fontSize: 14, color: '#6B6B85' },

  resultsScoreWrap: { alignItems: 'center', marginTop: 12, marginBottom: 8 },
  resultsScoreValue: { fontSize: 44, fontWeight: '800', color: PURPLE },
  resultsScoreLabel: { fontSize: 14, color: '#6B6B85', marginTop: 4 },
  resultBullet: { fontSize: 14, color: '#333344', lineHeight: 22, alignSelf: 'flex-start' },

  primaryButton: {
    width: '100%', backgroundColor: PURPLE, borderRadius: 14,
    paddingVertical: 16, alignItems: 'center', marginTop: 8,
    shadowColor: PURPLE_DARK, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25, shadowRadius: 10, elevation: 4,
  },
  primaryButtonDisabled: { backgroundColor: '#C7BBFA' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  secondaryButton: { alignItems: 'center', paddingVertical: 14 },
  secondaryButtonText: { color: PURPLE, fontSize: 14, fontWeight: '600' },
});
