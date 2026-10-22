import React from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppPressable from '@components/AppPressable';
import useReduceMotion from '@components/motion/useReduceMotion';
import { WALKTHROUGH_STEPS } from './data/walkthroughSteps';

export default function WalkthroughModal({
  visible,
  stepIndex,
  saveError,
  onBack,
  onNext,
  onSkip,
  onDontShowAgain,
}) {
  const reduceMotion = useReduceMotion();
  const step = WALKTHROUGH_STEPS[stepIndex];
  if (!step) return null;

  const content = (
    <>
      <AppPressable
        accessibilityRole="button"
        accessibilityLabel="Close walkthrough"
        onPress={onSkip}
        sound="none"
        style={StyleSheet.absoluteFill}
      />
      <View accessibilityViewIsModal style={styles.card}>
        <ScrollView
          contentContainerStyle={styles.cardContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Text style={styles.icon} accessibilityLabel={step.title}>{step.icon}</Text>
          <Text style={styles.title}>{step.title}</Text>
          <Text style={styles.body}>{step.body}</Text>
          <Text style={styles.progress} accessibilityLiveRegion="polite">
            {stepIndex + 1} / {WALKTHROUGH_STEPS.length}
          </Text>
          <View style={styles.dots} accessibilityLabel="Walkthrough progress">
            {WALKTHROUGH_STEPS.map((entry, index) => (
              <View
                key={entry.id}
                accessibilityState={{ selected: index === stepIndex }}
                style={[styles.dot, index === stepIndex && styles.activeDot]}
              />
            ))}
          </View>

          {saveError ? (
            <Text style={styles.error} accessibilityRole="alert">{saveError}</Text>
          ) : null}

          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Don't show this again"
            onPress={onDontShowAgain}
            style={styles.preferenceButton}
          >
            <Text style={styles.preferenceText}>Don't show this again</Text>
          </AppPressable>

          <View style={styles.actions}>
            {stepIndex > 0 ? (
              <AppPressable
                accessibilityRole="button"
                accessibilityLabel="Back"
                onPress={onBack}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryText}>Back</Text>
              </AppPressable>
            ) : null}
            <AppPressable
              accessibilityRole="button"
              accessibilityLabel={stepIndex === WALKTHROUGH_STEPS.length - 1 ? 'Get started' : 'Next'}
              onPress={onNext}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryText}>
                {stepIndex === WALKTHROUGH_STEPS.length - 1 ? 'Get started' : 'Next'}
              </Text>
            </AppPressable>
          </View>
          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Skip walkthrough"
            onPress={onSkip}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip</Text>
          </AppPressable>
        </ScrollView>
      </View>
    </>
  );

  if (Platform.OS === 'web') {
    if (!visible) return null;
    return (
      <View style={[StyleSheet.absoluteFillObject, styles.overlay, styles.webOverlay]}>
        {content}
      </View>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType={reduceMotion ? 'none' : 'fade'}
      onRequestClose={onSkip}
      statusBarTranslucent
    >
      <View style={styles.overlay}>{content}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 17, 17, 0.58)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    maxHeight: '100%',
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.22,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },
  cardContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 18,
  },
  icon: { fontSize: 42, marginBottom: 12 },
  title: {
    color: '#17152B',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  body: {
    color: '#4B5563',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 10,
  },
  progress: { color: '#5B21F5', fontSize: 13, fontWeight: '700', marginTop: 22 },
  dots: { flexDirection: 'row', gap: 8, marginTop: 10, marginBottom: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D8D4E4' },
  activeDot: { width: 22, backgroundColor: '#5B21F5' },
  preferenceButton: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  preferenceText: { color: '#4A1DD0', fontSize: 14, fontWeight: '700', textAlign: 'center' },
  actions: { flexDirection: 'row', gap: 10, width: '100%', marginTop: 6 },
  primaryButton: {
    minHeight: 48,
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#5B21F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  secondaryButton: {
    minHeight: 48,
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5B21F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  secondaryText: { color: '#4A1DD0', fontSize: 15, fontWeight: '700' },
  skipButton: {
    width: '100%',
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  skipText: { color: '#5B6473', fontSize: 14, fontWeight: '600' },
  error: {
    width: '100%',
    color: '#991B1B',
    backgroundColor: '#FEF2F2',
    padding: 10,
    borderRadius: 8,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
  },
  webOverlay: {
    zIndex: 1000,
  },
});