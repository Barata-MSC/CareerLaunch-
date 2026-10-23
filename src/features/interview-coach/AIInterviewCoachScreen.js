import AppPressable from '@components/AppPressable';
import BackButton from '@components/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@config/supabase';
import React, { useEffect, useState } from 'react';
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
import { useIsFocused } from '@react-navigation/native';
import { useProfile } from '../../context/ProfileContext';
import AccountGate from '../../components/AccountGate';
import { usePractice } from '../../context/PracticeContext';
import useVoiceInput, { MAX_ANSWER_LENGTH } from './useVoiceInput';

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
const TEXT_SUGGESTIONS = [
  'Start each sentence with a capital letter for a more polished answer.',
  'End your sentences with proper punctuation (. ! ?).',
  'Remember to capitalize "I" whenever you refer to yourself.',
  'Watch out for double spaces or accidentally repeated words.',
  'Try breaking a long answer into a few clear, separate sentences.',
];

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
  const isFocused = useIsFocused();
  const [view, setView] = useState('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
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
  const voiceInput = useVoiceInput({ active: isFocused && view === 'question', maxLength: MAX_ANSWER_LENGTH });
  const canSubmit =
    answerText.trim().length > 0 && !voiceInput.listening && !voiceInput.starting && !voiceInput.processing;

  useEffect(() => {
    setAnswerText(voiceInput.transcript);
  }, [voiceInput.transcript]);

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
    setAnswerText('');
    voiceInput.reset();
  };

  const persistPrivacyNotice = async () => {
    if (!userId) {
      setAiNoticeAccepted(true);
      return;
    }
    await AsyncStorage.setItem(getPrivacyKey(userId), '1');
    setAiNoticeAccepted(true);
  };

  const handleAcceptPrivacyNotice = async () => {
    try {
      await persistPrivacyNotice();
      setStatusMessage('');
    } catch (error) {
      setStatusMessage(error?.message || 'Could not save your privacy choice. Please try again.');
    }
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
    if (voiceInput.listening) {
      voiceInput.stop();
    } else {
      voiceInput.start(answerText);
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

  const runLocalFeedback = () => {
    return { ...generateTextFeedback(answerText), source: 'local' };
  };

  const handleSubmitAnswer = async () => {
    if (!canSubmit) return;

    if (!aiNoticeAccepted) {
      setStatusMessage('Please review and accept the AI feedback notice before submitting.');
      return;
    }

    setView('analyzing');
    setStatusMessage('');

    try {
      let feedbackResult;
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
        feedbackResult = runLocalFeedback();
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
        feedbackResult = runLocalFeedback();
      } else if (data?.fallback) {
        setStatusMessage('AI feedback is unavailable right now. Basic feedback is being used instead.');
        feedbackResult = runLocalFeedback();
      } else {
        feedbackResult = runLocalFeedback();
      }

      const normalizedAnswer = {
        question: currentQuestion,
        answerText,
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
          input: voiceInput.didRecognizeSpeech ? 'voice' : 'text',
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
          answerText,
          ...runLocalFeedback(),
          evaluation: { input: voiceInput.didRecognizeSpeech ? 'voice' : 'text' },
          source: 'local',
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
        Answer {QUESTIONS.length} common interview questions by typing or speaking. On supported
        development builds, speech is transcribed into editable text and evaluated like a typed answer.
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

      {!aiNoticeAccepted && (
        <View style={styles.privacyNoticeBox}>
          <Text style={styles.privacyNoticeTitle}>AI feedback notice</Text>
          <Text style={styles.privacyNoticeText}>
            Your answer text is sent to an AI service for feedback and may be saved to your account.
            Speech is transcribed by your device's speech service; audio handling depends on your device
            and its settings. Avoid personal or sensitive details.
          </Text>
          <AppPressable
            style={styles.noticeButton}
            onPress={handleAcceptPrivacyNotice}
            accessibilityRole="button"
          >
            <Text style={styles.noticeButtonText}>I understand and agree</Text>
          </AppPressable>
        </View>
      )}

      <View style={styles.answerInputRow}>
        <TextInput
          style={styles.textAnswerInput}
          placeholder="Type your answer or use the microphone..."
          placeholderTextColor="#9A9A9A"
          multiline
          maxLength={MAX_ANSWER_LENGTH}
          value={answerText}
          onChangeText={setAnswerText}
          editable={!voiceInput.listening && !voiceInput.starting && !voiceInput.processing}
          accessibilityLabel="Interview answer"
        />
        <AppPressable
          style={[
            styles.micButton,
            voiceInput.listening && styles.micButtonActive,
            !voiceInput.available && styles.micButtonUnavailable,
          ]}
          activeOpacity={0.85}
          onPress={handleMicPress}
          disabled={
            !voiceInput.available ||
            voiceInput.requestingPermission ||
            voiceInput.starting ||
            voiceInput.processing
          }
          accessibilityRole="button"
          accessibilityLabel={voiceInput.listening ? 'Stop listening' : 'Start voice input'}
        >
          <Image source={MIC_ICON} style={styles.micIcon} resizeMode="contain" />
          <Text style={styles.micButtonLabel}>
            {voiceInput.processing ? 'Wait' : voiceInput.listening ? 'Stop' : 'Speak'}
          </Text>
        </AppPressable>
      </View>
      <Text style={styles.micHint} accessibilityLiveRegion="polite" accessibilityRole="text">
        {voiceInput.requestingPermission
          ? 'Requesting microphone and speech permission…'
          : voiceInput.starting
          ? 'Starting speech recognition…'
          : voiceInput.processing
          ? 'Finishing transcription…'
          : voiceInput.listening
          ? 'Listening… tap Stop to finish.'
          : voiceInput.error || voiceInput.availabilityMessage || 'Tap the microphone to speak, or type your answer.'}
      </Text>
      {voiceInput.available ? (
        <Text style={styles.voicePrivacyText}>
          Speech is converted to text by your device's speech service. Audio handling depends on your
          device and settings; the transcript is sent to the AI service for feedback.
        </Text>
      ) : null}
      <Text style={styles.answerLimitHint}>Maximum {MAX_ANSWER_LENGTH.toLocaleString()} characters.</Text>

      {statusMessage ? <Text style={styles.statusText}>{statusMessage}</Text> : null}

      <AppPressable
        style={[
          styles.primaryButton,
          (!canSubmit || !aiNoticeAccepted) && styles.primaryButtonDisabled,
        ]}
        activeOpacity={0.85}
        disabled={!canSubmit || !aiNoticeAccepted}
        onPress={handleSubmitAnswer}
        accessibilityRole="button"
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
    const rawRating = Number(latest?.overall ?? latest?.stars ?? 0);
    const ratingOutOfTen = Math.max(
      0,
      Math.min(10, Math.round(latest?.source === 'ai' ? rawRating / 10 : rawRating * 2)),
    );

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
            <Text style={styles.feedbackValueGood}>{ratingOutOfTen}/10</Text>
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

        <AppPressable
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={handleNextQuestion}
          accessibilityRole="button"
        >
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
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PURPLE_LIGHT,
    alignSelf: 'center',
    gap: 2,
  },
  micButtonActive: { transform: [{ scale: 1.08 }] },
  micButtonUnavailable: { opacity: 0.45 },
  micIcon: { width: 32, height: 32 },
  micButtonLabel: { fontSize: 10, fontWeight: '700', color: PURPLE },
  micHint: { fontSize: 13, color: '#8E8E93', marginBottom: 16, textAlign: 'center' },
  answerInputRow: { width: '100%', flexDirection: 'row', alignItems: 'stretch', gap: 10 },
  textAnswerInput: {
    flex: 1,
    minHeight: 110,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#111111',
    textAlignVertical: 'top',
    marginBottom: 12,
    minWidth: 0,
  },
  voicePrivacyText: {
    width: '100%',
    color: '#6B6B85',
    fontSize: 11.5,
    lineHeight: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  answerLimitHint: { alignSelf: 'flex-end', color: '#8E8E93', fontSize: 11, marginBottom: 8 },
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