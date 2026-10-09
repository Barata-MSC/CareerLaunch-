import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CourseHeader({ title, onBack }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <Text style={styles.backArrow}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.headerSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  backArrow: {
    fontSize: 32,
    color: '#222222',
    lineHeight: 32,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
  },
  headerSpacer: {
    width: 25,
  },
});
