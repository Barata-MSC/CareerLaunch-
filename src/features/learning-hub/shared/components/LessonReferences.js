import AppPressable from '@components/AppPressable';
// Sources used for a lesson (APA 7th). Tapping a reference opens its link.
import React from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';
import { PURPLE } from '../styles';

export default function LessonReferences({ references }) {
  if (!references?.length) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>References</Text>
      {references.map((ref) => (
        <AppPressable
          key={ref.url}
          onPress={() => Linking.openURL(ref.url).catch(() => {})}
          style={styles.item}
        >
          <Text style={styles.text}>
            {ref.text} <Text style={styles.link}>{ref.url}</Text>
          </Text>
        </AppPressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#F7F7F7', borderRadius: 12, padding: 14, marginBottom: 15 },
  title: { fontSize: 12, fontWeight: '700', color: '#222222', marginBottom: 8 },
  item: { marginBottom: 6 },
  text: { fontSize: 11, lineHeight: 17, color: '#555555' },
  link: { color: PURPLE },
});
