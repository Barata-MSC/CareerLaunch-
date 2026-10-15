// Tappable mini spreadsheet. Tap a cell to see its address (Name Box) and its
// contents (Formula Bar), like real Excel. Optional `challenge` asks the learner
// to find a cell and gives instant feedback.
//   cell = value, or { f: '=SUM(B2:B4)', v: 105 } to show a formula
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { PURPLE, LIGHT_PURPLE, GREEN, RED } from '../styles';

const shown = (c) => (c && typeof c === 'object' ? c.v : c ?? '');
const raw = (c) => (c && typeof c === 'object' ? c.f : c ?? '');

export default function MiniSheet({ title, columns, rows, challenge }) {
  const [sel, setSel] = useState(null); // { r, c }

  const address = sel ? `${columns[sel.c]}${sel.r + 1}` : '';
  const content = sel ? raw(rows[sel.r][sel.c]) : '';
  const hit = challenge && sel ? address === challenge.target : null;

  return (
    <View style={styles.card}>
      {!!title && <Text style={styles.title}>{title}</Text>}

      <View style={styles.bar}>
        <Text style={styles.nameBox}>{address || '–'}</Text>
        <Text style={styles.fx}>fx</Text>
        <Text style={styles.formula} numberOfLines={1}>
          {sel ? String(content) : 'Tap any cell'}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={styles.row}>
            <View style={[styles.cell, styles.head]} />
            {columns.map((col, c) => (
              <View key={col} style={[styles.cell, styles.head, sel?.c === c && styles.headOn]}>
                <Text style={styles.headText}>{col}</Text>
              </View>
            ))}
          </View>

          {rows.map((row, r) => (
            <View key={r} style={styles.row}>
              <View style={[styles.cell, styles.head, sel?.r === r && styles.headOn]}>
                <Text style={styles.headText}>{r + 1}</Text>
              </View>
              {columns.map((col, c) => (
                <TouchableOpacity
                  key={col}
                  style={[styles.cell, sel?.r === r && sel?.c === c && styles.cellOn]}
                  onPress={() => setSel({ r, c })}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cellText} numberOfLines={1}>
                    {String(shown(row[c]))}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {!!challenge && (
        <Text style={[styles.feedback, hit === true && styles.good, hit === false && styles.bad]}>
          {hit === null
            ? challenge.text
            : hit
            ? `Correct! ${address} is the right cell.`
            : `Not quite. You tapped ${address}. Try again.`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#E2D9FF', borderRadius: 12, padding: 12, marginBottom: 15 },
  title: { fontSize: 13, fontWeight: '700', color: '#222222', marginBottom: 10 },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 6,
    marginBottom: 10,
    height: 32,
  },
  nameBox: {
    width: 44,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: PURPLE,
    borderRightWidth: 1,
    borderRightColor: '#DDDDDD',
    lineHeight: 30,
  },
  fx: { fontSize: 12, color: '#999999', fontStyle: 'italic', marginHorizontal: 8 },
  formula: { flex: 1, fontSize: 12, color: '#333333' },
  row: { flexDirection: 'row' },
  cell: {
    width: 76,
    height: 34,
    borderWidth: 0.5,
    borderColor: '#D0D0D0',
    justifyContent: 'center',
    paddingHorizontal: 6,
    backgroundColor: '#FFFFFF',
  },
  cellText: { fontSize: 12, color: '#222222' },
  cellOn: { borderWidth: 2, borderColor: PURPLE, backgroundColor: LIGHT_PURPLE },
  head: { width: 40, backgroundColor: '#F3F3F3', alignItems: 'center' },
  headOn: { backgroundColor: '#DCD0FF' },
  headText: { fontSize: 11, fontWeight: '700', color: '#666666' },
  feedback: { fontSize: 12, color: '#555555', marginTop: 10, lineHeight: 18 },
  good: { color: GREEN, fontWeight: '700' },
  bad: { color: RED, fontWeight: '700' },
});
