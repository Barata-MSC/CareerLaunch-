import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppPressable from '@components/AppPressable';
import { getCareerById } from './careers';

export default function CareerDetailScreen({ navigation, route }) {
  const career = getCareerById(route?.params?.careerId);

  if (!career) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Career not found</Text>
          <AppPressable style={styles.primaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryButtonText}>Back</Text>
          </AppPressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <AppPressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backText}>{'<'}</Text>
        </AppPressable>
        <Text style={styles.headerTitle}>Career</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.iconBadge, { backgroundColor: career.color || '#5B21F5' }]}>
          <Text style={styles.iconText}>{career.icon || '📘'}</Text>
        </View>

        <Text style={styles.title}>{career.title}</Text>
        <Text style={styles.subtitle}>{career.subtitle}</Text>
        {career.educationalNote ? (
          <Text style={styles.bodyText}>{career.educationalNote}</Text>
        ) : null}

        <View style={styles.infoCard}>
          <Text style={styles.sectionLabel}>Overview</Text>
          <Text style={styles.bodyText}>{career.overview}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionLabel}>Skills</Text>
          <View style={styles.skillRow}>
            {career.skillsPreview?.map((skill) => (
              <View key={skill} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {career.status !== 'available' ? (
          <View style={styles.noticeCard}>
            {career.trackIds?.length ? (
              <>
                <Text style={styles.noticeTitle}>Preview Doctor lessons</Text>
                <Text style={styles.noticeText}>
                  The learning path and lessons are available as an educational preview while expert review is pending. This content is not medical advice or clinical training.
                </Text>
                <AppPressable
                  accessibilityRole="button"
                  style={styles.primaryButton}
                  onPress={() =>
                    navigation.navigate('LearningHub', { careerId: career.id })
                  }
                >
                  <Text style={styles.primaryButtonText}>Open track and lessons</Text>
                </AppPressable>
              </>
            ) : (
              <>
                <Text style={styles.noticeTitle}>Courses for this career are coming soon.</Text>
                <Text style={styles.noticeText}>
                  This career is listed for exploration, but complete tracks, courses, and practice content are not yet available here.
                </Text>
              </>
            )}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    width: 32,
  },
  backText: {
    fontSize: 24,
    color: '#111827',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  spacer: {
    width: 32,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  iconBadge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 18,
  },
  infoCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    padding: 16,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#374151',
  },
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    backgroundColor: '#EFEAFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  skillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5B21F5',
  },
  noticeCard: {
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    padding: 16,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#9A4D00',
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#7C2D12',
  },
  primaryButton: {
    backgroundColor: '#5B21F5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 18,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
