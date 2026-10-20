import AppPressable from '@components/AppPressable';
// Tap-to-build chart, like dragging fields in Power BI or Tableau.
// Pick a field for the axis and a field for the values, choose how to total it, and the chart
// updates live. Optional sorting and a "Top 3" filter are switched on with `controls`.
//   activity = { type: 'visualBuilder', title, task, goal, target, controls, hint, explanation }
//   target   = what the learner must build, e.g. { axis: 'Region', value: 'Sales', agg: 'Sum', chart: 'Column' }
//              (only the keys you list are checked: axis, value, agg, chart, sort, limit)
//   controls = extra controls to show: 'chart', 'sort', 'limit'
// The sample data is invented for practice (Region, Category, Month, Sales, Profit).
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PURPLE, LIGHT_PURPLE, GREEN, RED } from '../styles';

const ROWS = [
  { Region: 'East', Category: 'Tech', Month: 'Jan', Sales: 120, Profit: 30 },
  { Region: 'East', Category: 'Office', Month: 'Jan', Sales: 80, Profit: 10 },
  { Region: 'East', Category: 'Tech', Month: 'Feb', Sales: 150, Profit: 45 },
  { Region: 'West', Category: 'Tech', Month: 'Jan', Sales: 200, Profit: 60 },
  { Region: 'West', Category: 'Office', Month: 'Feb', Sales: 90, Profit: 15 },
  { Region: 'West', Category: 'Tech', Month: 'Mar', Sales: 170, Profit: 50 },
  { Region: 'North', Category: 'Office', Month: 'Jan', Sales: 60, Profit: 5 },
  { Region: 'North', Category: 'Tech', Month: 'Feb', Sales: 110, Profit: 20 },
  { Region: 'North', Category: 'Office', Month: 'Mar', Sales: 70, Profit: 12 },
  { Region: 'South', Category: 'Tech', Month: 'Mar', Sales: 130, Profit: 35 },
  { Region: 'South', Category: 'Office', Month: 'Jan', Sales: 50, Profit: 4 },
  { Region: 'South', Category: 'Office', Month: 'Feb', Sales: 75, Profit: 9 },
];

const DIMENSIONS = ['Region', 'Category', 'Month'];
const MEASURES = ['Sales', 'Profit'];
const AGGS = ['Sum', 'Average', 'Count'];
const CHARTS = ['Column', 'Bar', 'Table'];
const SORTS = ['None', 'Descending', 'Ascending'];
const LIMITS = ['All', 'Top 3'];
const START = { axis: null, value: null, agg: 'Sum', chart: 'Column', sort: 'None', limit: 'All' };

// Group the rows by the axis field and total the values field
export const buildSeries = (rows, { axis, value, agg, sort, limit }) => {
  if (!axis || !value) return [];
  const order = [];
  const groups = {};
  rows.forEach((r) => {
    const key = r[axis];
    if (!groups[key]) {
      groups[key] = [];
      order.push(key);
    }
    groups[key].push(r[value]);
  });

  let list = order.map((key) => {
    const nums = groups[key];
    const sum = nums.reduce((a, b) => a + b, 0);
    const total = agg === 'Count' ? nums.length : agg === 'Average' ? sum / nums.length : sum;
    return { label: key, value: Math.round(total * 10) / 10 };
  });

  if (limit === 'Top 3') {
    const keep = [...list].sort((a, b) => b.value - a.value).slice(0, 3).map((x) => x.label);
    list = list.filter((x) => keep.includes(x.label));
  }
  if (sort === 'Descending') list = [...list].sort((a, b) => b.value - a.value);
  if (sort === 'Ascending') list = [...list].sort((a, b) => a.value - b.value);
  return list;
};

function Chips({ label, options, selected, onPick }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupLabel}>{label}</Text>
      <View style={styles.chips}>
        {options.map((opt) => (
          <AppPressable
            key={opt}
            style={[styles.chip, selected === opt && styles.chipOn]}
            onPress={() => onPick(opt)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, selected === opt && styles.chipTextOn]}>{opt}</Text>
          </AppPressable>
        ))}
      </View>
    </View>
  );
}

export default function VisualBuilder({ title, task, goal, target, controls = [], hint, explanation }) {
  const [sel, setSel] = useState(START);
  const set = (key) => (val) => setSel((s) => ({ ...s, [key]: val }));

  const series = buildSeries(ROWS, sel);
  const max = Math.max(...series.map((s) => s.value), 1);
  const ready = !!(sel.axis && sel.value);
  const ok = ready && Object.keys(target).every((k) => sel[k] === target[k]);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>BUILD A VISUAL</Text>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {!!task && <Text style={styles.task}>{task}</Text>}
      {!!goal && (
        <View style={styles.goal}>
          <Text style={styles.goalLabel}>Goal</Text>
          <Text style={styles.goalText}>{goal}</Text>
        </View>
      )}

      <Chips label="Axis (dimension)" options={DIMENSIONS} selected={sel.axis} onPick={set('axis')} />
      <Chips label="Values (measure)" options={MEASURES} selected={sel.value} onPick={set('value')} />
      <Chips label="Aggregation" options={AGGS} selected={sel.agg} onPick={set('agg')} />
      {controls.includes('chart') && <Chips label="Chart type" options={CHARTS} selected={sel.chart} onPick={set('chart')} />}
      {controls.includes('sort') && <Chips label="Sort" options={SORTS} selected={sel.sort} onPick={set('sort')} />}
      {controls.includes('limit') && <Chips label="Filter" options={LIMITS} selected={sel.limit} onPick={set('limit')} />}

      <View style={styles.preview}>
        {!ready && <Text style={styles.empty}>Pick an axis field and a values field to build the visual.</Text>}

        {ready && (
          <>
            <Text style={styles.chartTitle}>
              {sel.agg} of {sel.value} by {sel.axis}
            </Text>

            {sel.chart === 'Column' && (
              <View style={styles.colWrap}>
                {series.map((s) => (
                  <View key={s.label} style={styles.colItem}>
                    <Text style={styles.colValue}>{s.value}</Text>
                    <View style={[styles.colBar, { height: Math.max(4, (s.value / max) * 100) }]} />
                    <Text style={styles.colLabel} numberOfLines={1}>
                      {s.label}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {sel.chart === 'Bar' &&
              series.map((s) => (
                <View key={s.label} style={styles.barRow}>
                  <Text style={styles.barLabel} numberOfLines={1}>
                    {s.label}
                  </Text>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: `${Math.max(2, (s.value / max) * 100)}%` }]} />
                  </View>
                  <Text style={styles.barValue}>{s.value}</Text>
                </View>
              ))}

            {sel.chart === 'Table' && (
              <View>
                <View style={styles.tRow}>
                  <Text style={[styles.tCell, styles.tHead]}>{sel.axis}</Text>
                  <Text style={[styles.tCell, styles.tHead, styles.tRight]}>
                    {sel.agg} of {sel.value}
                  </Text>
                </View>
                {series.map((s) => (
                  <View key={s.label} style={styles.tRow}>
                    <Text style={styles.tCell}>{s.label}</Text>
                    <Text style={[styles.tCell, styles.tRight]}>{s.value}</Text>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </View>

      <AppPressable onPress={() => setSel(START)} style={styles.reset}>
        <Text style={styles.resetText}>Reset</Text>
      </AppPressable>

      {ok && <Text style={[styles.feedback, { color: GREEN }]}>Correct! {explanation}</Text>}
      {ready && !ok && (
        <Text style={[styles.feedback, { color: RED }]}>Not quite yet. {hint || 'Compare your choices with the goal.'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#E2D9FF', borderRadius: 12, padding: 14, marginBottom: 15 },
  label: { fontSize: 10, fontWeight: '800', color: PURPLE, marginBottom: 6 },
  title: { fontSize: 14, fontWeight: '700', color: '#222222', marginBottom: 4 },
  task: { fontSize: 12, lineHeight: 18, color: '#555555', marginBottom: 10 },
  goal: { backgroundColor: '#F7F7F7', borderRadius: 8, padding: 10, marginBottom: 10 },
  goalLabel: { fontSize: 10, fontWeight: '700', color: '#929292', marginBottom: 4 },
  goalText: { fontSize: 12, lineHeight: 18, color: '#333333' },
  group: { marginBottom: 8 },
  groupLabel: { fontSize: 11, fontWeight: '700', color: '#929292', marginBottom: 5 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    borderWidth: 1,
    borderColor: '#DDD6FF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
  },
  chipOn: { backgroundColor: PURPLE, borderColor: PURPLE },
  chipText: { fontSize: 12, color: '#444444', fontWeight: '600' },
  chipTextOn: { color: '#FFFFFF' },
  preview: {
    backgroundColor: LIGHT_PURPLE,
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
    minHeight: 120,
    justifyContent: 'center',
  },
  empty: { fontSize: 12, color: '#8A8A8A', textAlign: 'center', lineHeight: 18 },
  chartTitle: { fontSize: 12, fontWeight: '700', color: '#222222', marginBottom: 10 },
  colWrap: { flexDirection: 'row', alignItems: 'flex-end', height: 150, gap: 8 },
  colItem: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  colValue: { fontSize: 10, color: '#555555', marginBottom: 3 },
  colBar: { width: '70%', backgroundColor: PURPLE, borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  colLabel: { fontSize: 10, color: '#555555', marginTop: 4 },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  barLabel: { width: 60, fontSize: 11, color: '#555555' },
  barTrack: { flex: 1, height: 14, backgroundColor: '#FFFFFF', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: PURPLE },
  barValue: { width: 40, fontSize: 11, color: '#555555', textAlign: 'right' },
  tRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#D0C6F5', paddingVertical: 5 },
  tCell: { flex: 1, fontSize: 12, color: '#333333' },
  tHead: { fontWeight: '700', color: '#222222' },
  tRight: { textAlign: 'right' },
  reset: { alignSelf: 'flex-start', marginTop: 10, borderWidth: 1, borderColor: PURPLE, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 14 },
  resetText: { color: PURPLE, fontSize: 12, fontWeight: '700' },
  feedback: { fontSize: 12, fontWeight: '600', lineHeight: 18, marginTop: 10 },
});
