import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppPressable from '@components/AppPressable';
import BackButton from '@components/BackButton';
import { CAREERS } from '../../learning-hub/careers/careers';
import { ASSESSMENT_COPY as copy } from '../data/copy';
import { RIASEC_ORDER, RIASEC_TYPES } from '../data/riasecTypes';
import { matchCareers } from '../matching';
import useAssessment from '../useAssessment';

export default function AssessmentResultScreen({ navigation, route }) {
  const {
    latestResult,
    loading,
    error,
    remoteMessage,
    refresh,
    startAttempt,
    isFullAccount,
    unsyncedLocalResult,
    saveLocalResultToAccount,
  } = useAssessment();
  const [starting, setStarting] = useState(false);
  const [savingExisting, setSavingExisting] = useState(false);
  const autoSyncAttemptedRef = useRef(null);
  const normalized = latestResult?.scores?.normalized;
  const matches = useMemo(
    () =>
      latestResult
        ? matchCareers({ code: latestResult.code, normalized }, CAREERS)
        : [],
    [latestResult, normalized],
  );

  useEffect(() => {
    const requestedTakenAt = route?.params?.syncResultAt;
    if (
      !isFullAccount ||
      !requestedTakenAt ||
      loading ||
      latestResult?.takenAt !== requestedTakenAt ||
      unsyncedLocalResult?.takenAt !== requestedTakenAt ||
      autoSyncAttemptedRef.current === requestedTakenAt
    ) {
      return;
    }
    autoSyncAttemptedRef.current = requestedTakenAt;
    saveLocalResultToAccount(latestResult);
  }, [
    isFullAccount,
    latestResult,
    loading,
    route?.params?.syncResultAt,
    saveLocalResultToAccount,
    unsyncedLocalResult,
  ]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator color="#5B21F5" />
          <Text style={styles.body}>{copy.loading}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!latestResult || !normalized) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <Text style={styles.title}>{copy.loadError}</Text>
          <Text style={styles.body}>{error || copy.loadError}</Text>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel={copy.retry}
            onPress={refresh}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryText}>{copy.retry}</Text>
          </AppPressable>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel={copy.back}
            onPress={navigation.goBack}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryText}>{copy.back}</Text>
          </AppPressable>
        </View>
      </SafeAreaView>
    );
  }

  const topMatches = matches.slice(0, 3);
  const alsoExplore = matches.slice(3, 5);
  const bestAvailable = matches.find(({ career }) => career.status === 'available');
  const retake = async () => {
    setStarting(true);
    const started = await startAttempt();
    setStarting(false);
    if (started) navigation.navigate('CareerAssessmentQuestions');
  };
  const saveExistingResult = async () => {
    setSavingExisting(true);
    await saveLocalResultToAccount(unsyncedLocalResult);
    setSavingExisting(false);
  };

  const renderMatch = ({ career, score, why }) => {
    const available = career.status === 'available';
    return (
      <View key={career.id} style={styles.matchCard}>
        <View style={styles.matchHeading}>
          <Text style={styles.matchTitle}>{career.title}</Text>
          {available ? (
            <Text style={styles.matchScore}>{score}%</Text>
          ) : (
            <Text style={styles.comingSoon}>{copy.comingSoon}</Text>
          )}
        </View>
        <Text style={styles.matchWhy}>{why}</Text>
        {available ? (
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel={copy.exploreCareer}
            onPress={() => navigation.navigate('LearningHub', { careerId: career.id })}
            style={styles.careerButton}
          >
            <Text style={styles.careerButtonText}>{copy.exploreCareer}</Text>
          </AppPressable>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <BackButton accessibilityLabel={copy.back} onPress={() => navigation.goBack()} />
        <Text style={styles.eyebrow}>{copy.resultTitle}</Text>
        <Text style={styles.title}>{copy.codeLabel}: {latestResult.code.join('')}</Text>
        <Text style={styles.body}>{copy.resultDisclaimer}</Text>
        {latestResult.scores.undifferentiated ? (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>{copy.undifferentiated}</Text>
          </View>
        ) : null}

        <Text style={styles.sectionTitle}>{copy.topTypes}</Text>
        <View style={styles.scoreList}>
          {RIASEC_ORDER.map((type) => (
            <View key={type} style={styles.scoreRow}>
              <View style={styles.scoreLabel}>
                <Text style={styles.scoreType}>{RIASEC_TYPES[type].name}</Text>
                <Text style={styles.scoreDescription}>{RIASEC_TYPES[type].description}</Text>
              </View>
              <View style={styles.barColumn}>
                <Text style={styles.scoreValue}>{normalized[type]}%</Text>
                <View
                  accessibilityRole="progressbar"
                  accessibilityLabel={`${RIASEC_TYPES[type].name} ${copy.resultRange}`}
                  accessibilityValue={{ min: 0, max: 100, now: normalized[type] }}
                  style={styles.barTrack}
                >
                  <View style={[styles.barFill, { width: `${normalized[type]}%` }]} />
                </View>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>{copy.matchesTitle}</Text>
        {topMatches.map(renderMatch)}
        <Text style={styles.subheading}>{copy.alsoExplore}</Text>
        {alsoExplore.map(renderMatch)}
        {bestAvailable && bestAvailable.score < 50 ? (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>{copy.lowMatch}</Text>
          </View>
        ) : null}

        {remoteMessage ? (
          <Text style={styles.syncMessage} accessibilityRole="alert">{remoteMessage}</Text>
        ) : null}
        {unsyncedLocalResult && isFullAccount ? (
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel={copy.saveOnDeviceResult}
            disabled={savingExisting}
            onPress={saveExistingResult}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryText}>{copy.saveOnDeviceResult}</Text>
          </AppPressable>
        ) : null}
        <View style={styles.buttons}>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel={copy.openWorksheet}
            onPress={() => navigation.navigate('CareerAssessmentWorksheet')}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryText}>{copy.openWorksheet}</Text>
          </AppPressable>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel={copy.retake}
            disabled={starting}
            onPress={retake}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryText}>{copy.retake}</Text>
          </AppPressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F7FB' },
  content: { padding: 18, paddingBottom: 36 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  eyebrow: { color: '#5B21F5', fontSize: 13, fontWeight: '800', letterSpacing: 0.8 },
  title: { color: '#17152B', fontSize: 27, lineHeight: 34, fontWeight: '800', marginTop: 6 },
  body: { color: '#4B5563', fontSize: 14, lineHeight: 21, marginTop: 10 },
  infoBox: { borderRadius: 14, padding: 14, backgroundColor: '#F0EBFF', marginTop: 14 },
  infoText: { color: '#3B2A70', fontSize: 14, lineHeight: 21 },
  sectionTitle: { color: '#17152B', fontSize: 19, fontWeight: '800', marginTop: 24, marginBottom: 12 },
  scoreList: { gap: 12 },
  scoreRow: { backgroundColor: '#fff', borderRadius: 14, padding: 13, gap: 10 },
  scoreLabel: { gap: 3 },
  scoreType: { color: '#29253B', fontSize: 15, fontWeight: '800' },
  scoreDescription: { color: '#5E5A6D', fontSize: 13, lineHeight: 18 },
  barColumn: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  scoreValue: { width: 38, color: '#4A1DD0', fontSize: 13, fontWeight: '700' },
  barTrack: { height: 9, flex: 1, borderRadius: 9, backgroundColor: '#E8E5EF', overflow: 'hidden' },
  barFill: { height: 9, borderRadius: 9, backgroundColor: '#5B21F5' },
  matchCard: { backgroundColor: '#fff', borderRadius: 15, padding: 14, marginBottom: 10 },
  matchHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  matchTitle: { color: '#242136', fontSize: 16, fontWeight: '800', flex: 1 },
  matchScore: { color: '#4A1DD0', fontSize: 14, fontWeight: '800' },
  comingSoon: { color: '#7A5200', fontSize: 12, fontWeight: '800' },
  matchWhy: { color: '#5E5A6D', fontSize: 13, lineHeight: 19, marginTop: 6 },
  careerButton: {
    minHeight: 44,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 11,
    backgroundColor: '#F0EBFF',
    marginTop: 10,
  },
  careerButtonText: { color: '#4A1DD0', fontSize: 13, fontWeight: '800' },
  subheading: { color: '#39354A', fontSize: 16, fontWeight: '800', marginTop: 10, marginBottom: 10 },
  syncMessage: { color: '#7C4A03', fontSize: 13, lineHeight: 19, marginTop: 12 },
  buttons: { gap: 10, marginTop: 16 },
  primaryButton: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#5B21F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  secondaryButton: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#5B21F5',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  secondaryText: { color: '#4A1DD0', fontSize: 15, fontWeight: '800' },
});
