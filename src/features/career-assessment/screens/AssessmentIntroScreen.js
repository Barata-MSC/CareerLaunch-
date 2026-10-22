import React, { useState } from 'react';
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
import { ASSESSMENT_COPY as copy } from '../data/copy';
import useAssessment from '../useAssessment';

export default function AssessmentIntroScreen({ navigation }) {
  const {
    draft,
    latestResult,
    unsyncedLocalResult,
    loading,
    error,
    remoteMessage,
    refresh,
    startAttempt,
    saveLocalResultToAccount,
  } = useAssessment();
  const [busy, setBusy] = useState(false);
  const [upgradeSaved, setUpgradeSaved] = useState(false);

  const begin = async (continueDraft = false) => {
    setBusy(true);
    if (!continueDraft && !(await startAttempt())) {
      setBusy(false);
      return;
    }
    setBusy(false);
    navigation.navigate('CareerAssessmentQuestions');
  };

  const saveExistingResult = async () => {
    setBusy(true);
    const saved = await saveLocalResultToAccount(unsyncedLocalResult);
    setUpgradeSaved(saved);
    setBusy(false);
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <BackButton accessibilityLabel={copy.back} onPress={goBack} style={styles.backButton} />
        <Text style={styles.eyebrow}>{copy.eyebrow}</Text>
        <Text style={styles.title}>{copy.title}</Text>
        <Text style={styles.body}>{copy.intro}</Text>
        <Text style={styles.duration}>{copy.duration}</Text>
        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>{copy.disclaimerTitle}</Text>
          <Text style={styles.noticeText}>{copy.disclaimer}</Text>
        </View>

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color="#5B21F5" />
            <Text style={styles.muted}>{copy.introLoading}</Text>
          </View>
        ) : (
          <View style={styles.actions}>
            {error ? (
              <View style={styles.errorBox} accessibilityRole="alert">
                <Text style={styles.error}>{copy.loadError}</Text>
                <AppPressable
                  accessibilityRole="button"
                  accessibilityLabel={copy.retry}
                  onPress={refresh}
                  style={styles.secondaryButton}
                >
                  <Text style={styles.secondaryText}>{copy.retry}</Text>
                </AppPressable>
              </View>
            ) : null}

            {draft ? (
              <AppPressable
                accessibilityRole="button"
                accessibilityLabel={copy.continue}
                disabled={busy}
                onPress={() => begin(true)}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryText}>{copy.continue}</Text>
              </AppPressable>
            ) : null}

            {latestResult ? (
              <>
                <AppPressable
                  accessibilityRole="button"
                  accessibilityLabel={copy.viewLastResult}
                  onPress={() => navigation.navigate('CareerAssessmentResult')}
                  style={styles.secondaryButton}
                >
                  <Text style={styles.secondaryText}>{copy.viewLastResult}</Text>
                </AppPressable>
                <AppPressable
                  accessibilityRole="button"
                  accessibilityLabel={copy.retake}
                  disabled={busy}
                  onPress={() => begin(false)}
                  style={styles.primaryButton}
                >
                  <Text style={styles.primaryText}>{copy.retake}</Text>
                </AppPressable>
              </>
            ) : !draft ? (
              <AppPressable
                accessibilityRole="button"
                accessibilityLabel={copy.start}
                disabled={busy}
                onPress={() => begin(false)}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryText}>{copy.start}</Text>
              </AppPressable>
            ) : null}

            {unsyncedLocalResult ? (
              <View style={styles.upgradeBox}>
                <Text style={styles.muted}>{copy.upgradeNote}</Text>
                <AppPressable
                  accessibilityRole="button"
                  accessibilityLabel={copy.saveOnDeviceResult}
                  disabled={busy || upgradeSaved}
                  onPress={saveExistingResult}
                  style={styles.secondaryButton}
                >
                  <Text style={styles.secondaryText}>
                    {upgradeSaved ? copy.resultSaved : copy.saveOnDeviceResult}
                  </Text>
                </AppPressable>
              </View>
            ) : null}

            {remoteMessage ? (
              <Text style={styles.syncMessage} accessibilityRole="alert">
                {remoteMessage}
              </Text>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F7FB' },
  content: { padding: 20, paddingBottom: 36, flexGrow: 1 },
  backButton: { marginBottom: 8 },
  eyebrow: { color: '#5B21F5', fontSize: 12, fontWeight: '700', letterSpacing: 1.2 },
  title: { color: '#17152B', fontSize: 30, lineHeight: 36, fontWeight: '800', marginTop: 10 },
  body: { color: '#4B5563', fontSize: 16, lineHeight: 24, marginTop: 12 },
  duration: { color: '#5B21F5', fontSize: 14, fontWeight: '700', marginTop: 18 },
  notice: { backgroundColor: '#F0EBFF', borderRadius: 16, padding: 16, marginTop: 22 },
  noticeTitle: { color: '#352070', fontSize: 15, fontWeight: '700', marginBottom: 6 },
  noticeText: { color: '#403A54', fontSize: 14, lineHeight: 21 },
  actions: { gap: 12, marginTop: 24 },
  loading: { alignItems: 'center', gap: 12, marginTop: 32 },
  muted: { color: '#5B6473', fontSize: 14, lineHeight: 21 },
  primaryButton: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#5B21F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
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
  secondaryText: { color: '#4A1DD0', fontSize: 15, fontWeight: '700', textAlign: 'center' },
  errorBox: { backgroundColor: '#FEF2F2', borderRadius: 14, padding: 14, gap: 8 },
  error: { color: '#991B1B', fontSize: 14, lineHeight: 20 },
  syncMessage: { color: '#7C4A03', fontSize: 13, lineHeight: 19 },
  upgradeBox: { gap: 10, padding: 14, backgroundColor: '#FFF8E7', borderRadius: 14 },
});
