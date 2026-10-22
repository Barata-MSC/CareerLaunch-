import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppPressable from '@components/AppPressable';
import BackButton from '@components/BackButton';
import { CAREERS } from '../../learning-hub/careers/careers';
import { ASSESSMENT_COPY as copy, WORKSHEET_SHARE_TITLE } from '../data/copy';
import { RIASEC_TYPES } from '../data/riasecTypes';
import { matchCareers } from '../matching';
import useAssessment from '../useAssessment';

export default function CareerWorksheetScreen({ navigation }) {
  const { latestResult, loading } = useAssessment();
  const [reflectionAnswers, setReflectionAnswers] = useState(['', '', '']);
  const [actions, setActions] = useState(['', '', '']);
  const [shareError, setShareError] = useState('');
  const matches = useMemo(
    () =>
      latestResult
        ? matchCareers(
            { code: latestResult.code, normalized: latestResult.scores.normalized },
            CAREERS,
          )
        : [],
    [latestResult],
  );

  const shareWorksheet = async () => {
    if (!latestResult) return;
    const typeLines = latestResult.code
      .map((type) => `- ${RIASEC_TYPES[type].name}: ${RIASEC_TYPES[type].description}`)
      .join('\n');
    const careerLines = matches
      .slice(0, 3)
      .map(({ career }) =>
        `- ${career.title}${career.status === 'available' ? '' : ` (${copy.comingSoon})`}`,
      )
      .join('\n');
    const actionLines = copy.actionPeriods
      .map((period, index) => `${period}: ${actions[index] || copy.emptyAction}`)
      .join('\n');
    const message = [
      WORKSHEET_SHARE_TITLE,
      `${copy.codeLabel}: ${latestResult.code.join('')}`,
      '',
      copy.topTypes,
      typeLines,
      '',
      copy.matchesTitle,
      careerLines,
      '',
      ...copy.reflectionPrompts.map((prompt, index) => `${prompt}\n${reflectionAnswers[index] || copy.emptyAction}`),
      '',
      actionLines,
    ].join('\n');

    try {
      setShareError('');
      await Share.share({ message, title: WORKSHEET_SHARE_TITLE });
    } catch {
      setShareError(copy.shareUnavailable);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}><Text style={styles.body}>{copy.loading}</Text></View>
      </SafeAreaView>
    );
  }

  if (!latestResult) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <Text style={styles.title}>{copy.loadError}</Text>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel={copy.back}
            onPress={navigation.goBack}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryText}>{copy.back}</Text>
          </AppPressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <BackButton accessibilityLabel={copy.back} onPress={() => navigation.goBack()} />
        <Text style={styles.eyebrow}>{copy.worksheet}</Text>
        <Text style={styles.title}>{copy.codeLabel}: {latestResult.code.join('')}</Text>
        <Text style={styles.body}>{copy.worksheetIntro}</Text>
        <Text style={styles.sectionTitle}>{copy.topTypes}</Text>
        {latestResult.code.map((type) => (
          <Text key={type} style={styles.listText}>
            {RIASEC_TYPES[type].name} — {RIASEC_TYPES[type].description}
          </Text>
        ))}
        <Text style={styles.sectionTitle}>{copy.matchesTitle}</Text>
        {matches.slice(0, 3).map(({ career }) => (
          <Text key={career.id} style={styles.listText}>
            {career.title}{career.status === 'available' ? '' : ` · ${copy.comingSoon}`}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>{copy.reflectionHeading}</Text>
        {copy.reflectionPrompts.map((prompt, index) => (
          <View key={prompt} style={styles.fieldGroup}>
            <Text style={styles.label}>{prompt}</Text>
            <TextInput
              accessibilityLabel={prompt}
              multiline
              maxLength={500}
              value={reflectionAnswers[index]}
              onChangeText={(value) =>
                setReflectionAnswers((current) =>
                  current.map((entry, answerIndex) => answerIndex === index ? value : entry),
                )
              }
              style={[styles.input, styles.multilineInput]}
              textAlignVertical="top"
            />
          </View>
        ))}

        <Text style={styles.sectionTitle}>{copy.actionPlanHeading}</Text>
        {copy.actionPeriods.map((period, index) => (
          <View key={period} style={styles.fieldGroup}>
            <Text style={styles.label}>{period}</Text>
            <TextInput
              accessibilityLabel={copy.actionFieldLabel(period)}
              maxLength={300}
              value={actions[index]}
              onChangeText={(value) =>
                setActions((current) =>
                  current.map((entry, actionIndex) => actionIndex === index ? value : entry),
                )
              }
              placeholder={copy.actionPlaceholder}
              placeholderTextColor="#848091"
              style={styles.input}
            />
          </View>
        ))}
        <Text style={styles.note}>{copy.saveDeviceNote}</Text>
        {shareError ? <Text style={styles.error} accessibilityRole="alert">{shareError}</Text> : null}
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel={copy.share}
          onPress={shareWorksheet}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryText}>{copy.share}</Text>
        </AppPressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F7FB' },
  content: { padding: 18, paddingBottom: 36 },
  eyebrow: { color: '#5B21F5', fontSize: 13, fontWeight: '800', letterSpacing: 0.8 },
  title: { color: '#17152B', fontSize: 26, lineHeight: 33, fontWeight: '800', marginTop: 7 },
  body: { color: '#4B5563', fontSize: 14, lineHeight: 21, marginTop: 10 },
  sectionTitle: { color: '#17152B', fontSize: 18, fontWeight: '800', marginTop: 23, marginBottom: 10 },
  listText: { color: '#39354A', fontSize: 14, lineHeight: 21, marginBottom: 7 },
  fieldGroup: { gap: 7, marginBottom: 13 },
  label: { color: '#343044', fontSize: 14, lineHeight: 20, fontWeight: '700' },
  input: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D4D0DF',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#211E31',
    fontSize: 14,
  },
  multilineInput: { minHeight: 76 },
  note: { color: '#686477', fontSize: 12, lineHeight: 18, marginVertical: 10 },
  error: { color: '#991B1B', fontSize: 14, lineHeight: 20, marginBottom: 10 },
  primaryButton: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#5B21F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  primaryText: { color: '#fff', fontSize: 15, fontWeight: '800' },
});
