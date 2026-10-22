import AppPressable from '@components/AppPressable';
import BackButton from '@components/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@config/supabase';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../../context/ProfileContext';
import AccountGate from '../../components/AccountGate';
import { usePractice } from '../../context/PracticeContext';

const MIC_ICON = require('@assets/mic-icon.png');
const AI_PRIVACY_KEY_PREFIX = 'careerlaunch:interview-ai-privacy:v1';

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
    source: 'local',
    overall,
    stars: overall,
    metricAName: 'Confidence',
    metricAValue: RATING_LABELS[confidenceStars - 1],
    metricBName: 'Clarity',
    metricBValue: RATING_LABELS[clarityStars - 1],
    suggestion: VOICE_SUGGESTIONS[Math.floor(Math.random() * VOICE_SUGGESTIONS.length)],
    strengths: ['Good flow and confidence'],
    improvements: ['Add more specific examples and clearer structure'],
  };
}

function generateTextFeedback(answerText) {
  const trimmed = answerText.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  let grammarIssues = 0;
  if (!/^[A-Z]/.test(trimmed)) grammarIssues += 1;
  if (/\bi\b/.test(trimmed)) grammarIssues += 1;
  if (/ {2,}/.test(trimmed)) grammarIssues += 1;
  if (/\b(\w+)\s+\1\b/i.test(trimmed)) grammarIssues += 1;
  const grammarStars = Math.min(5, Math.max(1, 5 - grammarIssues));

  let punctuationIssues = 0;
  if (!/[.!?]$/.test(trimmed)) punctuationIssues += 1;
  const sentenceCount = trimmed.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0).length;
  if (sentenceCount === 0) punctuationIssues += 1;
  if (/[.,](?=\S)/.test(trimmed)) punctuationIssues += 1;
  const punctuationStars = Math.min(5, Math.max(1, 5 - punctuationIssues));

  let completenessStars = 2;
  if (wordCount >= 45) completenessStars = 5;
  else if (wordCount >= 30) completenessStars = 4;
  else if (wordCount >= 18) completenessStars = 3;
  else if (wordCount < 8) completenessStars = 1;

  const overall = Math.round((grammarStars + punctuationStars + completenessStars) / 3);
  return {
    source: 'local',
    overall,
    stars: overall,
    metricAName: 'Grammar',
    metricAValue: RATING_LABELS[grammarStars - 1],
    metricBName: 'Punctuation',
    metricBValue: RATING_LABELS[punctuationStars - 1],
    suggestion: TEXT_SUGGESTIONS[Math.floor(Math.random() * TEXT_SUGGESTIONS.length)],
    strengths: ['Clear effort and a complete response'],
    improvements: ['Add a stronger structure and more specific examples'],
  };
}

function toDisplayFeedback(rawFeedback) {
  const source = rawFeedback?.source === 'ai' ? 'ai' : 'local';
  const overall = Number(rawFeedback?.overall ?? rawFeedback?.stars ?? 0);
  const criteria = rawFeedback?.criteria ?? {};

  if (source === 'ai') {
    const strengths = Array.isArray(rawFeedback?.strengths) && rawFeedback.strengths.length
      ? rawFeedback.strengths
      : ['Clear and useful answer'];
    const improvements = Array.isArray(rawFeedback?.improvements) && rawFeedback.improvements.length
      ? rawFeedback.improvements
      : ['Add more specific examples.'];
    const fallbackSuggestion = improvements[0] || strengths[0] || 'Keep practicing with more specific examples.';

    return {
      source,
      overall: Math.max(0, Math.min(100, overall || 75)),
      stars: Math.max(1, Math.min(5, Math.round((overall || 75) / 20))),
      metricAName: 'Relevance',
      metricAValue: `${Math.max(0, Math.min(10, Number(criteria.relevance ?? 7)))}/10`,
      metricBName: 'Structure',
      metricBValue: `${Math.max(0, Math.min(10, Number(criteria.structure ?? 7)))}/10`,
      suggestion: fallbackSuggestion,
      strengths,
      improvements,
      suggestedAnswer: rawFeedback?.suggestedAnswer || '',
      followUpQuestion: rawFeedback?.followUpQuestion || '',
    };
  }

  return {
    source,
    overall: Math.max(0, Math.min(100, overall || 70)),
    stars: Math.max(1, Math.min(5, Number(rawFeedback?.stars ?? 3))),
    metricAName: rawFeedback?.metricAName || 'Feedback',
    metricAValue: rawFeedback?.metricAValue || 'Good',
    metricBName: rawFeedback?.metricBName || 'Next step',
    metricBValue: rawFeedback?.metricBValue || 'Keep going',
    suggestion: rawFeedback?.suggestion || 'Keep practicing with a clearer example.',
    strengths: rawFeedback?.strengths || ['Good effort'],
    improvements: rawFeedback?.improvements || ['Add more structure and examples'],
    suggestedAnswer: rawFeedback?.suggestedAnswer || '',
    followUpQuestion: rawFeedback?.followUpQuestion || '',
  };
}

function StarRow({ count, size = 20 }) {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text key={i} style={{ fontSize: size, color: i <= count ? GOLD : GRAY_STAR, marginRight: 2 }}>
          ★
        </Text>
      ))}
    </View>
  );
}

function getPrivacyKey(userId) {
  return userId ? `${AI_PRIVACY_KEY_PREFIX}:${userId}` : AI_PRIVACY_KEY_PREFIX;
}

function AIInterviewCoachContent({ navigation }) {
  const { session } = useProfile();
  const { markPracticed } = usePractice();
  const [view, setView] = useState('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [useTextInput, setUseTextInput] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [answers, setAnswers] = useState([]);
  const [pastResults, setPastResults] = useState([]);
  const [aiNoticeAccepted, setAiNoticeAccepted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [savingHistory, setSavingHistory] = useState(false);
  const [saveHistoryError, setSaveHistoryError] = useState('');
  const [deleteState, setDeleteState] = useState('idle');

  const userId = session?.user?.id;
  const currentQuestion = QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  const canSubmit = !isRecording && (useTextInput ? answerText.trim().length > 0 : hasRecording);

  useEffect(() => {
    let active = true;
    if (!userId) return undefined;

    AsyncStorage.getItem(getPrivacyKey(userId))
      .then((stored) => {
        if (active) setAiNoticeAccepted(stored === '1');
      })
      .catch(() => {
        if (active) setAiNoticeAccepted(false);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const resetAnswerInputs = () => {
    setIsRecording(false);
    setHasRecording(false);
    setUseTextInput(false);
    setAnswerText('');
  };

  const persistPrivacyNotice = async () => {
    if (!userId) {
      setAiNoticeAccepted(true);
      return;
    }
    await AsyncStorage.setItem(getPrivacyKey(userId), '1');
    setAiNoticeAccepted(true);
  };

  const showPrivacyNotice = async () => {
    const message =
      'Answers are sent to an AI service to generate feedback. Avoid personal or sensitive details, and remember that your answers are saved to your account and can be deleted.';

    Alert.alert(
      'AI feedback notice',
      `${message}\n\nThis feedback is guidance, not a hiring verdict. Google AI Studio terms apply for the provider used by this app.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'I understand',
          onPress: async () => {
            await persistPrivacyNotice();
          },
        },
      ],
    );
  };

  const handleStart = () => {
    setStatusMessage('');
    setSaveHistoryError('');
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

  const persistInterviewHistory = async (finalAnswers) => {
    if (!userId || !Array.isArray(finalAnswers) || finalAnswers.length === 0) return;

    setSavingHistory(true);
    try {
      const { data: sessionData, error: sessionError } = await supabase
        .from('interview_sessions')
        .insert({ user_id: userId, category: 'General', overall: Math.round((finalAnswers.reduce((sum, answer) => sum + Number(answer.overall || 0), 0) / finalAnswers.length) || 0) })
        .select('id')
        .single();

      if (sessionError) throw sessionError;

      const sessionId = sessionData?.id;
      if (!sessionId) return;

      const answerRows = finalAnswers.map((answer) => ({
        session_id: sessionId,
        user_id: userId,
        question: answer.question?.prompt || answer.question || '',
        answer_text: answer.answerText || 'Voice answer',
        evaluation: answer.evaluation || {},
        source: answer.source === 'ai' ? 'ai' : 'local',
      }));

      const { error: answersError } = await supabase.from('interview_answers').insert(answerRows);
      if (answersError) throw answersError;
    } catch (error) {
      const errorMessage = error?.message || 'Your interview history could not be saved.';
      setSaveHistoryError(errorMessage);
    } finally {
      setSavingHistory(false);
    }
  };

  const runLocalFeedback = (usedVoice) => {
    const feedback = usedVoice ? generateVoiceFeedback() : generateTextFeedback(answerText);
    return { ...feedback, source: 'local' };
  };

  const handleSubmitAnswer = async () => {
    if (!canSubmit) return;

    const usedVoice = hasRecording && !useTextInput;
    if (useTextInput && !aiNoticeAccepted) {
      await showPrivacyNotice();
      return;
    }

    setView('analyzing');
    setStatusMessage('');

    try {
      let feedbackResult;
      if (useTextInput) {
        const { data, error } = await supabase.functions.invoke('interview-coach', {
          body: {
            question: currentQuestion.prompt,
            answer: answerText,
            category: currentQuestion.category,
          },
        });

        const fallbackErrorMessage = error?.message || data?.error?.message || '';
        const hasDailyLimit = data?.error?.code === 'daily_limit_reached' || fallbackErrorMessage.toLowerCase().includes('limit reached');

        if (hasDailyLimit) {
          setStatusMessage('AI daily limit reached. Basic feedback is shown instead.');
          feedbackResult = runLocalFeedback(false);
        } else if (data?.evaluation && typeof data.evaluation === 'object') {
          feedbackResult = toDisplayFeedback({ ...data.evaluation, source: 'ai' });
        } else if (error) {
          const messageText = String(error?.message || '');
          const networkWarning = messageText.toLowerCase().includes('fetch') || messageText.toLowerCase().includes('network') || messageText.toLowerCase().includes('offline');
          if (networkWarning) {
            setStatusMessage('You are offline, so the basic local feedback is being used instead.');
          } else if (messageText.toLowerCase().includes('429') || messageText.toLowerCase().includes('limit')) {
            setStatusMessage('AI feedback is temporarily limited. Basic feedback is being used instead.');
          } else {
            setStatusMessage('AI feedback is unavailable right now. Basic feedback is being used instead.');
          }
          feedbackResult = runLocalFeedback(false);
        } else if (data?.fallback) {
          setStatusMessage('AI feedback is unavailable right now. Basic feedback is being used instead.');
          feedbackResult = runLocalFeedback(false);
        } else {
          feedbackResult = runLocalFeedback(false);
        }
      } else {
        feedbackResult = runLocalFeedback(usedVoice);
      }

      const normalizedAnswer = {
        question: currentQuestion,
        answerText: useTextInput ? answerText : 'Voice answer recorded',
        source: feedbackResult.source === 'ai' ? 'ai' : 'local',
        overall: Number(feedbackResult.overall || 0),
        stars: Number(feedbackResult.stars || 0),
        metricAName: feedbackResult.metricAName,
        metricAValue: feedbackResult.metricAValue,
        metricBName: feedbackResult.metricBName,
        metricBValue: feedbackResult.metricBValue,
        suggestion: feedbackResult.suggestion,
        strengths: feedbackResult.strengths || [],
        improvements: feedbackResult.improvements || [],
        evaluation: {
          overall: Number(feedbackResult.overall || 0),
          criteria: {
            relevance: Number(feedbackResult?.criteria?.relevance ?? 7),
            structure: Number(feedbackResult?.criteria?.structure ?? 7),
            clarity: Number(feedbackResult?.criteria?.clarity ?? 7),
            specificity: Number(feedbackResult?.criteria?.specificity ?? 7),
            professionalism: Number(feedbackResult?.criteria?.professionalism ?? 7),
          },
          strengths: feedbackResult.strengths || [],
          improvements: feedbackResult.improvements || [],
          suggestedAnswer: feedbackResult.suggestedAnswer || '',
          followUpQuestion: feedbackResult.followUpQuestion || '',
        },
      };

      setAnswers((prev) => [...prev, normalizedAnswer]);
      setView('feedback');
    } catch (error) {
      const message = error?.message || 'Unexpected feedback error';
      setStatusMessage(message);
      setAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion,
          answerText: useTextInput ? answerText : 'Voice answer recorded',
          ...runLocalFeedback(usedVoice),
          source: 'local',
          evaluation: {},
        },
      ]);
      setView('feedback');
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const total = answers.reduce((sum, answer) => sum + Number(answer.stars || 0), 0);
      const scorePercent = answers.length ? Math.round((total / (answers.length * 5)) * 100) : 0;
      setPastResults((prev) => [{ date: new Date().toLocaleDateString(), score: scorePercent }, ...prev]);
      markPracticed();
      persistInterviewHistory(answers).finally(() => setView('results'));
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
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

  const handleDeleteHistory = async () => {
    if (!userId) return;

    Alert.alert(
      'Delete my interview history?',
      'This removes your saved interview sessions and answers from your account.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeleteState('deleting');
            try {
              const { error: answersError } = await supabase.from('interview_answers').delete().eq('user_id', userId);
              const { error: sessionsError } = await supabase.from('interview_sessions').delete().eq('user_id', userId);
              if (answersError || sessionsError) {
                throw answersError || sessionsError;
              }
              Alert.alert('History deleted', 'Your interview history was removed from your account.');
            } catch (error) {
              Alert.alert('Could not delete history', error?.message || 'Please try again.');
            } finally {
              setDeleteState('idle');
            }
          },
        },
      ],
    );
  };

  const renderIntro = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.introIconWrap}>
        <Image source={MIC_ICON} style={styles.introIcon} resizeMode="contain" />
      </View>
      <Text style={styles.introTitle}>Practice with the AI Interview Coach</Text>
      <Text style={styles.introBody}>
        Answer {QUESTIONS.length} common interview questions by voice or text. Voice answers use the
        existing simulated coaching flow, and typed answers use AI feedback when available.
      </Text>

      <View style={styles.noticeBox}>
        <Text style={styles.noticeText}>
          AI feedback is guidance, not a hiring verdict. It can be wrong, so use it to improve your answers.
        </Text>
      </View>

      <AppPressable style={styles.primaryButton} activeOpacity={0.85} onPress={handleStart}>
        <Text style={styles.primaryButtonText}>Start Practice</Text>
      </AppPressable>

      {userId && (
        <AppPressable
          style={styles.secondaryInlineButton}
          activeOpacity={0.85}
          onPress={handleDeleteHistory}
          disabled={deleteState === 'deleting'}
        >
          <Text style={styles.secondaryInlineButtonText}>
            {deleteState === 'deleting' ? 'Deleting…' : 'Delete my interview history'}
          </Text>
        </AppPressable>
      )}

      {pastResults.length > 0 && (
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          {pastResults.map((result, index) => (
            <View key={index} style={styles.progressRow}>
              <Text style={styles.progressDate}>{result.date}</Text>
              <Text style={styles.progressScore}>{result.score}%</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );

  const renderQuestion = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.progressLabel}>Question {currentIndex + 1} of {QUESTIONS.length}</Text>
      <View style={styles.categoryPill}>
        <Text style={styles.categoryPillText}>{currentQuestion.category}</Text>
      </View>
      <Text style={styles.questionText}>{currentQuestion.prompt}</Text>

      {useTextInput && !aiNoticeAccepted && (
        <View style={styles.privacyNoticeBox}>
          <Text style={styles.privacyNoticeTitle}>AI feedback notice</Text>
          <Text style={styles.privacyNoticeText}>
            Answers are sent to an AI service to generate feedback. Avoid personal or sensitive details.
          </Text>
          <AppPressable style={styles.noticeButton} onPress={showPrivacyNotice}>
            <Text style={styles.noticeButtonText}>Review notice</Text>
          </AppPressable>
        </View>
      )}

      {!useTextInput ? (
        <>
          <AppPressable
            style={[styles.micButton, isRecording && styles.micButtonActive]}
            activeOpacity={0.85}
            onPress={handleMicPress}
          >
            <Image source={MIC_ICON} style={styles.micIcon} resizeMode="contain" />
          </AppPressable>
          <Text style={styles.micHint}>
            {isRecording
              ? 'Recording… tap again to stop'
              : hasRecording
              ? 'Answer recorded — tap Submit, or record again'
              : 'Tap to speak'}
          </Text>

          <AppPressable
            onPress={() => {
              setIsRecording(false);
              setHasRecording(false);
              setAnswerText('');
              setUseTextInput(true);
            }}
          >
            <Text style={styles.switchInputText}>Type my answer instead</Text>
          </AppPressable>
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
          <AppPressable
            onPress={() => {
              setUseTextInput(false);
              setAnswerText('');
              setHasRecording(false);
              setIsRecording(false);
            }}
          >
            <Text style={styles.switchInputText}>Use voice instead</Text>
          </AppPressable>
        </>
      )}

      {statusMessage ? <Text style={styles.statusText}>{statusMessage}</Text> : null}

      <AppPressable
        style={[styles.primaryButton, !canSubmit && styles.primaryButtonDisabled]}
        activeOpacity={0.85}
        disabled={!canSubmit}
        onPress={handleSubmitAnswer}
      >
        <Text style={styles.primaryButtonText}>Submit Answer</Text>
      </AppPressable>
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
    const feedbackLabel = latest?.source === 'ai' ? 'AI feedback' : 'Basic feedback (AI unavailable)';
    const reminder = 'AI feedback can be wrong and is guidance, not a hiring verdict.';

    return (
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.progressLabel}>Feedback · Question {currentIndex + 1} of {QUESTIONS.length}</Text>

        <View style={styles.feedbackCard}>
          <View style={styles.feedbackRowTop}>
            <Text style={styles.feedbackLabel}>{feedbackLabel}</Text>
            <View style={styles.modePill}>
              <Text style={styles.modePillText}>{latest?.question?.category || 'Interview'} </Text>
            </View>
          </View>

          <View style={styles.feedbackRow}>
            <Text style={styles.feedbackLabel}>Overall rating</Text>
            <Text style={styles.feedbackValueGood}>{latest?.overall ?? latest?.stars ?? 0}/100</Text>
          </View>

          <StarRow count={Math.max(1, Math.min(5, Number(latest?.stars || 3)))} size={24} />

          <View style={styles.feedbackRow}>
            <Text style={styles.feedbackLabel}>{latest?.metricAName || 'Relevance'}</Text>
            <Text style={styles.feedbackValueGood}>{latest?.metricAValue || '7/10'}</Text>
          </View>
          <View style={styles.feedbackRow}>
            <Text style={styles.feedbackLabel}>{latest?.metricBName || 'Structure'}</Text>
            <Text style={styles.feedbackValueGood}>{latest?.metricBValue || '7/10'}</Text>
          </View>

          <Text style={[styles.feedbackLabel, { marginTop: 14 }]}>Suggestions</Text>
          <Text style={styles.suggestionText}>{latest?.suggestion || 'Keep practicing with a clearer example.'}</Text>
          {latest?.suggestedAnswer ? (
            <Text style={styles.suggestedAnswerText}>Suggested answer: {latest.suggestedAnswer}</Text>
          ) : null}
          {latest?.followUpQuestion ? (
            <Text style={styles.suggestedAnswerText}>Follow-up: {latest.followUpQuestion}</Text>
          ) : null}
        </View>

        <Text style={styles.reminderText}>{reminder}</Text>

        <AppPressable style={styles.primaryButton} activeOpacity={0.85} onPress={handleNextQuestion}>
          <Text style={styles.primaryButtonText}>{isLastQuestion ? 'See My Results' : 'Next Question'}</Text>
        </AppPressable>
      </ScrollView>
    );
  };

  const renderResults = () => {
    const total = answers.reduce((sum, answer) => sum + Number(answer.stars || 0), 0);
    const scorePercent = answers.length ? Math.round((total / (answers.length * 5)) * 100) : 0;
    const strengths = answers.flatMap((answer) => answer.strengths || []);
    const improvements = answers.flatMap((answer) => answer.improvements || []);
    const uniqueStrengths = Array.from(new Set(strengths));
    const uniqueImprovements = Array.from(new Set(improvements.length ? improvements : ['Add more concise, concrete examples']));

    return (
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.resultsScoreWrap}>
          <Text style={styles.resultsScoreValue}>{scorePercent}%</Text>
          <Text style={styles.resultsScoreLabel}>Interview Score</Text>
        </View>

        {saveHistoryError ? <Text style={styles.saveErrorText}>{saveHistoryError}</Text> : null}
        {savingHistory ? <Text style={styles.statusText}>Saving your interview history…</Text> : null}

        <Text style={styles.sectionTitle}>Strengths</Text>
        {uniqueStrengths.length ? (
          uniqueStrengths.map((strength, index) => <Text key={index} style={styles.resultBullet}>• {strength}</Text>)
        ) : (
          <Text style={styles.resultBullet}>Keep practicing to build up your strengths.</Text>
        )}

        <Text style={styles.sectionTitle}>Areas for Improvement</Text>
        {uniqueImprovements.map((improvement, index) => (
          <Text key={index} style={styles.resultBullet}>• {improvement}</Text>
        ))}

        <AppPressable style={styles.primaryButton} activeOpacity={0.85} onPress={handleStart}>
          <Text style={styles.primaryButtonText}>Practice Again</Text>
        </AppPressable>
        <AppPressable style={styles.secondaryButton} onPress={() => navigation?.goBack()}>
          <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
        </AppPressable>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <BackButton onPress={handleExit} style={styles.backButton} />
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
  backButton: { width: 44 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111111' },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40, alignItems: 'center' },
  centerFill: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  introIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: PURPLE_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  introIcon: { width: 44, height: 44 },
  introTitle: { fontSize: 22, fontWeight: '800', color: '#111111', textAlign: 'center', marginBottom: 10 },
  introBody: { fontSize: 14, color: '#6B6B85', textAlign: 'center', lineHeight: 20, marginBottom: 18 },
  noticeBox: {
    backgroundColor: '#F5F3FF',
    borderWidth: 1,
    borderColor: '#E7DEFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: '100%',
    marginBottom: 18,
  },
  noticeText: { color: '#4C3BAE', fontSize: 12.5, lineHeight: 18, textAlign: 'center' },
  privacyNoticeBox: {
    width: '100%',
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E7DEFF',
  },
  privacyNoticeTitle: { fontSize: 13, fontWeight: '700', color: '#312E81', marginBottom: 6 },
  privacyNoticeText: { fontSize: 12.5, color: '#4C3BAE', lineHeight: 18 },
  noticeButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#E9E4FF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  noticeButtonText: { color: '#4C1D95', fontWeight: '700', fontSize: 12 },
  progressSection: { width: '100%', marginTop: 28 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111111', marginTop: 20, marginBottom: 10, alignSelf: 'flex-start' },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    width: '100%',
  },
  progressDate: { fontSize: 13, color: '#6B6B85' },
  progressScore: { fontSize: 14, fontWeight: '700', color: PURPLE },
  progressLabel: { fontSize: 13, color: '#8E8E93', alignSelf: 'flex-start', marginTop: 4, marginBottom: 10 },
  categoryPill: {
    backgroundColor: PURPLE_LIGHT,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  categoryPillText: { fontSize: 12, fontWeight: '700', color: PURPLE },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 28,
    width: '100%',
  },
  micButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  micButtonActive: { transform: [{ scale: 1.08 }] },
  micIcon: { width: 88, height: 88 },
  micHint: { fontSize: 13, color: '#8E8E93', marginBottom: 16, textAlign: 'center' },
  switchInputText: { fontSize: 13, fontWeight: '600', color: PURPLE, marginBottom: 24 },
  textAnswerInput: {
    width: '100%',
    minHeight: 110,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#111111',
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  statusText: { color: '#4B5563', fontSize: 12.5, marginBottom: 12, textAlign: 'center' },
  saveErrorText: { color: '#B91C1C', fontSize: 12.5, marginBottom: 12, textAlign: 'center' },
  feedbackCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
  },
  feedbackRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  modePill: { backgroundColor: PURPLE_LIGHT, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  modePillText: { fontSize: 11, fontWeight: '700', color: PURPLE },
  feedbackLabel: { fontSize: 13, color: '#6B6B85', marginBottom: 6 },
  starRow: { flexDirection: 'row', marginBottom: 14 },
  feedbackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F1F5',
  },
  feedbackValueGood: { fontSize: 14, fontWeight: '700', color: GREEN },
  suggestionText: { fontSize: 13, color: '#4B4B63', lineHeight: 19, marginTop: 4 },
  suggestedAnswerText: { fontSize: 12.5, color: '#374151', lineHeight: 18, marginTop: 10 },
  reminderText: { color: '#4B5563', fontSize: 12, lineHeight: 18, marginBottom: 12, textAlign: 'center' },
  analyzingText: { marginTop: 14, fontSize: 14, color: '#6B6B85' },
  resultsScoreWrap: { alignItems: 'center', marginTop: 12, marginBottom: 8 },
  resultsScoreValue: { fontSize: 44, fontWeight: '800', color: PURPLE },
  resultsScoreLabel: { fontSize: 14, color: '#6B6B85', marginTop: 4 },
  resultBullet: { fontSize: 14, color: '#333344', lineHeight: 22, alignSelf: 'flex-start' },
  primaryButton: {
    width: '100%',
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: PURPLE_DARK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonDisabled: { backgroundColor: '#C7BBFA' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  secondaryButton: { alignItems: 'center', paddingVertical: 14 },
  secondaryButtonText: { color: PURPLE, fontSize: 14, fontWeight: '600' },
  secondaryInlineButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  secondaryInlineButtonText: { color: '#374151', fontSize: 14, fontWeight: '700' },
});

export default function AIInterviewCoachScreen(props) {
  return (
    <AccountGate
      featureName="AI Interview Coach"
      description="Build confidence with practice responses and feedback. Complete your account to unlock this feature and keep your progress saved."
      navigation={props.navigation}
    >
      <AIInterviewCoachContent {...props} />
    </AccountGate>
  );
}