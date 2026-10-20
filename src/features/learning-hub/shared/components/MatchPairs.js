import AppPressable from '@components/AppPressable';
// Tap-to-match activity: tap an item on the left, then its match on the right.
//   activity = { type: 'match', title, task, pairs: [{ left, right }], hint, explanation }
// Right-hand items are shown shuffled. A correct pair turns green and locks.
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PURPLE, LIGHT_PURPLE, GREEN, RED } from '../styles';

const shuffle = (items) => {
  let out = items;
  for (let tries = 0; tries < 6 && out.every((v, i) => v === items[i]); tries++) {
    out = [...items];
    for (let i = out.length - 1; i > 0; i--) {
      const k = Math.floor(Math.random() * (i + 1));
      [out[i], out[k]] = [out[k], out[i]];
    }
  }
  return out;
};

export default function MatchPairs({ title, task, pairs, hint, explanation }) {
  const [rights] = useState(() => shuffle(pairs.map((p) => p.right)));
  const [selected, setSelected] = useState(null); // the chosen left item
  const [done, setDone] = useState({}); // left item -> matched
  const [miss, setMiss] = useState(false);

  const matched = pairs.filter((p) => done[p.left]);
  const matchedRights = matched.map((p) => p.right);
  const complete = matched.length === pairs.length;

  const pickLeft = (left) => {
    if (done[left]) return;
    setSelected(left);
    setMiss(false);
  };

  const pickRight = (right) => {
    if (!selected || matchedRights.includes(right)) return;
    const pair = pairs.find((p) => p.left === selected);
    if (pair.right === right) {
      setDone({ ...done, [selected]: true });
      setMiss(false);
    } else {
      setMiss(true);
    }
    setSelected(null);
  };

  const reset = () => {
    setDone({});
    setSelected(null);
    setMiss(false);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>MATCH THE PAIRS</Text>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {!!task && <Text style={styles.task}>{task}</Text>}

      <View style={styles.cols}>
        <View style={styles.col}>
          {pairs.map((p) => (
            <AppPressable
              key={p.left}
              style={[styles.item, selected === p.left && styles.itemSel, done[p.left] && styles.itemDone]}
              onPress={() => pickLeft(p.left)}
              disabled={!!done[p.left]}
              activeOpacity={0.7}
            >
              <Text style={[styles.itemText, styles.leftText]}>{p.left}</Text>
            </AppPressable>
          ))}
        </View>
        <View style={styles.col}>
          {rights.map((r) => (
            <AppPressable
              key={r}
              style={[styles.item, matchedRights.includes(r) && styles.itemDone]}
              onPress={() => pickRight(r)}
              disabled={matchedRights.includes(r)}
              activeOpacity={0.7}
            >
              <Text style={styles.itemText}>{r}</Text>
            </AppPressable>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.progress}>
          {matched.length} of {pairs.length} matched
        </Text>
        <AppPressable onPress={reset} disabled={!matched.length && !selected}>
          <Text style={styles.resetText}>Reset</Text>
        </AppPressable>
      </View>

      {miss && <Text style={[styles.feedback, { color: RED }]}>Not quite. {hint || 'Try another match.'}</Text>}
      {complete && <Text style={[styles.feedback, { color: GREEN }]}>Correct! {explanation}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: LIGHT_PURPLE, borderRadius: 12, padding: 14, marginBottom: 15 },
  label: { fontSize: 10, fontWeight: '800', color: PURPLE, marginBottom: 6 },
  title: { fontSize: 14, fontWeight: '700', color: '#222222', marginBottom: 4 },
  task: { fontSize: 12, lineHeight: 18, color: '#555555', marginBottom: 10 },
  cols: { flexDirection: 'row', gap: 8 },
  col: { flex: 1 },
  item: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD6FF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  itemSel: { borderColor: PURPLE, borderWidth: 2 },
  itemDone: { borderColor: GREEN, backgroundColor: '#EAF9EF' },
  itemText: { fontSize: 11, lineHeight: 16, color: '#333333' },
  leftText: { fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  progress: { fontSize: 11, color: '#777777' },
  resetText: { fontSize: 12, fontWeight: '700', color: PURPLE },
  feedback: { fontSize: 12, fontWeight: '600', lineHeight: 18, marginTop: 8 },
});
