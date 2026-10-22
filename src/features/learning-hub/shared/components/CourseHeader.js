import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '@components/BackButton';

export default function CourseHeader({ title, onBack }) {
  return (
    <View style={styles.header}>
      <BackButton onPress={onBack} style={styles.backButton} />

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.headerSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  backButton: { width: 44 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
  },
  headerSpacer: {
    width: 44,
  },
});
