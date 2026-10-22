import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppPressable from '@components/AppPressable';
import { ANSWER_OPTIONS, ASSESSMENT_ITEMS, QUESTION_STEM } from '../data/questions.v1';
import { ASSESSMENT_COPY as copy } from '../data/copy';
import useAssessment from '../useAssessment';

export default function AssessmentQuestionScreen({ navigation }) {
  const {
    draft,
    loading,
    error,
    saveAnswer,
    setCurrentIndex,
    finishAttempt,
    refresh,
    isFullAccount,
  } = useAssessment();
  const [index, setIndex] = useState(null);
  const [saving, setSaving] = useState(false);

  const itemsById = useMemo(
    () => new Map(ASSESSMENT_ITEMS.map((item) => [item.id, item])),
    [],
  );
  const orderedItems = useMemo(
    () => (draft?.order || []).map((itemId) => itemsById.get(itemId)).filter(Boolean),
    [draft?.order, itemsById],
  );
  const item = index === null ? null : orderedItems[index];
  const selectedValue = draft?.answers.find((answer) => answer.itemId === item?.id)?.value;

  useEffect(() => {
    if (draft && index === null) {
      setIndex(Math.min(Math.max(draft.currentIndex || 0, 0), Math.max(orderedItems.length - 1, 0)));
    }
  }, [draft, index, orderedItems.length]);

  const selectAnswer = async (value) => {
    if (!item) return;
    setSaving(true);
    await saveAnswer(item.id, value);
    setSaving(false);
  };

  const goBack = async () => {
    if (index > 0) {
      const previous = index - 1;
      if (await setCurrentIndex(previous)) setIndex(previous);
      return;
    }
    navigation.goBack();
  };

  const goNext = async () => {
    if (!item || !selectedValue) return;
    setSaving(true);
    if (index === orderedItems.length - 1) {
      const result = await finishAttempt();
      setSaving(false);
      if (result) {
        navigation.replace('CareerAssessmentResult', {
          syncResultAt: isFullAccount ? result.takenAt : undefined,
        });
      }
      return;
    }
    const next = index + 1;
    if (await setCurrentIndex(next)) setIndex(next);
    setSaving(false);
  };

  if (loading || index === null) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator color="#5B21F5" />
          <Text style={styles.body}>{copy.loading}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!draft || orderedItems.length !== ASSESSMENT_ITEMS.length || !item) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <Text style={styles.title}>{copy.loadError}</Text>
          <Text style={styles.body}>{error || (draft ? copy.storageError : copy.noDraft)}</Text>
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

  const progress = ((index + 1) / ASSESSMENT_ITEMS.length) * 100;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.progressHeader}>
          <Text
            accessibilityRole="text"
            accessibilityLabel={copy.questionProgress(index + 1, ASSESSMENT_ITEMS.length)}
            style={styles.progressText}
          >
            {index + 1} / {ASSESSMENT_ITEMS.length}
          </Text>
          <Text style={styles.progressText}>{copy.questionCategory}</Text>
        </View>
        <View
          accessibilityRole="progressbar"
          accessibilityLabel={copy.questionProgress(index + 1, ASSESSMENT_ITEMS.length)}
          accessibilityValue={{ min: 1, max: ASSESSMENT_ITEMS.length, now: index + 1 }}
          style={styles.progressTrack}
        >
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.stem}>{QUESTION_STEM}</Text>
        <Text style={styles.question}>{item.text}</Text>
        <View style={styles.options}>
          {ANSWER_OPTIONS.map((option) => {
            const checked = selectedValue === option.value;
            return (
              <AppPressable
                key={option.value}
                accessibilityRole="radio"
                accessibilityLabel={option.label}
                accessibilityState={{ checked }}
                disabled={saving}
                onPress={() => selectAnswer(option.value)}
                style={[styles.option, checked && styles.optionSelected]}
              >
                <View style={[styles.radio, checked && styles.radioSelected]}>
                  {checked ? <View style={styles.radioDot} /> : null}
                </View>
                <Text style={[styles.optionText, checked && styles.optionTextSelected]}>
                  {option.label}
                </Text>
              </AppPressable>
            );
          })}
        </View>

        {error ? <Text style={styles.error} accessibilityRole="alert">{error}</Text> : null}
        <View style={styles.buttons}>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel={copy.back}
            disabled={saving}
            onPress={goBack}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryText}>{copy.back}</Text>
          </AppPressable>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel={index === orderedItems.length - 1 ? copy.finish : copy.next}
            disabled={saving || !selectedValue}
            onPress={goNext}
            style={[styles.primaryButton, (!selectedValue || saving) && styles.disabledButton]}
          >
            <Text style={styles.primaryText}>
              {index === orderedItems.length - 1 ? copy.finish : copy.next}
            </Text>
          </AppPressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F7FB' },
  content: { padding: 20, paddingBottom: 32, flexGrow: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressText: { color: '#555168', fontSize: 13, fontWeight: '700' },
  progressTrack: { height: 8, borderRadius: 8, overflow: 'hidden', backgroundColor: '#E5E1F0' },
  progressFill: { height: 8, borderRadius: 8, backgroundColor: '#5B21F5' },
  stem: { color: '#5B21F5', fontSize: 16, fontWeight: '700', marginTop: 30 },
  question: { color: '#17152B', fontSize: 25, lineHeight: 32, fontWeight: '800', marginTop: 8 },
  options: { gap: 10, marginTop: 24 },
  option: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9D7E2',
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    gap: 12,
  },
  optionSelected: { borderColor: '#5B21F5', backgroundColor: '#F2EEFF' },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#777185',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: '#5B21F5' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#5B21F5' },
  optionText: { color: '#27243A', fontSize: 15, flex: 1 },
  optionTextSelected: { color: '#35119B', fontWeight: '700' },
  buttons: { flexDirection: 'row', gap: 10, marginTop: 24 },
  primaryButton: {
    minHeight: 52,
    flex: 1,
    borderRadius: 14,
    backgroundColor: '#5B21F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  secondaryButton: {
    minHeight: 52,
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#5B21F5',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginTop: 12,
  },
  primaryText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  secondaryText: { color: '#4A1DD0', fontSize: 15, fontWeight: '700' },
  disabledButton: { opacity: 0.45 },
  body: { color: '#4B5563', fontSize: 15, lineHeight: 22, marginTop: 12 },
  title: { color: '#17152B', fontSize: 23, fontWeight: '800' },
  error: { color: '#991B1B', fontSize: 14, lineHeight: 20, marginTop: 12 },
});
