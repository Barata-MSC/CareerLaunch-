import AppPressable from '@components/AppPressable';
// Tap-to-order activity: tap the items in the right order to build the sequence.
//   activity = { type: 'order', title, task, items: [in the CORRECT order], hint, explanation }
// Items are shown shuffled. Tap one to add it, "Undo" removes the last, "Reset" starts over.
import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { PURPLE, LIGHT_PURPLE, GREEN, RED } from '../styles';

const shuffle = (items) => {
  const same = (a) => a.every((v, i) => v === items[i]);
  let out = items;
  for (let tries = 0; tries < 6 && (out === items || same(out)); tries++) {
    out = [...items];
    for (let i = out.length - 1; i > 0; i--) {
      const k = Math.floor(Math.random() * (i + 1));
      [out[i], out[k]] = [out[k], out[i]];
    }
  }
  return out;
};

export default function StepOrder({ title, task, items, hint, explanation }) {
  const [pool] = useState(() => shuffle(items));
  const [picked, setPicked] = useState([]);

  const full = picked.length === items.length;
  const correct = full && picked.every((p, i) => p === items[i]);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>PUT IN ORDER</Text>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {!!task && <Text style={styles.task}>{task}</Text>}

      <View style={styles.slots}>
        {items.map((_, i) => (
          <View key={i} style={[styles.slot, picked[i] && styles.slotFilled]}>
            <Text style={styles.slotNum}>{i + 1}</Text>
            <Text style={styles.slotText} numberOfLines={2}>
              {picked[i] || ''}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.pool}>
        {pool.map((item) => {
          const used = picked.includes(item);
          return (
            <AppPressable
              key={item}
              style={[styles.chip, used && styles.chipUsed]}
              disabled={used || full}
              onPress={() => setPicked([...picked, item])}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, used && styles.chipTextUsed]}>{item}</Text>
            </AppPressable>
          );
        })}
      </View>

      <View style={styles.row}>
        <AppPressable style={styles.undo} onPress={() => setPicked(picked.slice(0, -1))} disabled={!picked.length}>
          <Text style={styles.undoText}>Undo</Text>
        </AppPressable>
        <AppPressable style={styles.undo} onPress={() => setPicked([])} disabled={!picked.length}>
          <Text style={styles.undoText}>Reset</Text>
        </AppPressable>
      </View>

      {correct && <Text style={[styles.feedback, { color: GREEN }]}>Correct! {explanation}</Text>}
      {full && !correct && (
        <Text style={[styles.feedback, { color: RED }]}>Not quite. {hint || 'Press Reset and try again.'}</Text>
      )}
    </View>
  );
}

const mono = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const styles = StyleSheet.create({
  card: { backgroundColor: LIGHT_PURPLE, borderRadius: 12, padding: 14, marginBottom: 15 },
  label: { fontSize: 10, fontWeight: '800', color: PURPLE, marginBottom: 6 },
  title: { fontSize: 14, fontWeight: '700', color: '#222222', marginBottom: 4 },
  task: { fontSize: 12, lineHeight: 18, color: '#555555', marginBottom: 10 },
  slots: { marginBottom: 10 },
  slot: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 36,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#C9BDFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 6,
    backgroundColor: '#FFFFFF',
  },
  slotFilled: { borderStyle: 'solid', borderColor: PURPLE },
  slotNum: { width: 18, fontSize: 11, fontWeight: '800', color: PURPLE },
  slotText: { flex: 1, fontSize: 11, color: '#222222', fontFamily: mono },
  pool: { marginBottom: 6 },
  chip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD6FF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  chipUsed: { backgroundColor: '#EDEDED', borderColor: '#E0E0E0' },
  chipText: { fontSize: 11, color: '#333333', fontFamily: mono },
  chipTextUsed: { color: '#AAAAAA' },
  row: { flexDirection: 'row', gap: 10 },
  undo: { borderWidth: 1, borderColor: PURPLE, borderRadius: 8, paddingVertical: 7, paddingHorizontal: 14 },
  undoText: { color: PURPLE, fontSize: 12, fontWeight: '700' },
  feedback: { fontSize: 12, fontWeight: '600', lineHeight: 18, marginTop: 10 },
});
