// Small shared building blocks used by every screen in the course.
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const COLORS = {
  purple: '#5B2EFF',
  purpleLight: '#EFEAFF',
  purpleBorder: '#D9CEFF',
  green: '#1E9E5A',
  greenLight: '#E5FAEF',
  red: '#DC2626',
  redLight: '#FDECEC',
  orange: '#F26A1B',
  orangeLight: '#FFE9DB',
  text: '#1A1A1A',
  muted: '#6B7280',
  border: '#E5E7EB',
  gray: '#E5E5EA',
  white: '#FFFFFF',
};

export function ScreenHeader({ title, onBack }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerSide}
        onPress={onBack}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.backArrow}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerSide} />
    </View>
  );
}

// segments: array of 'done' | 'active' | 'todo'
export function SegmentBar({ segments }) {
  return (
    <View style={styles.segRow}>
      {segments.map((s, i) => (
        <View
          key={i}
          style={[
            styles.seg,
            s === 'done' && { backgroundColor: COLORS.green },
            s === 'active' && { backgroundColor: COLORS.purple },
          ]}
        />
      ))}
    </View>
  );
}

export function Pill({ label, color = COLORS.purple, bg = COLORS.purpleLight }) {
  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <Text style={[styles.pillText, { color }]}>{label}</Text>
    </View>
  );
}

export function PrimaryButton({ label, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.btn, styles.btnPrimary, disabled && styles.btnDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <Text style={styles.btnPrimaryText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function OutlineButton({ label, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.btn, styles.btnOutline, disabled && styles.btnDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <Text style={styles.btnOutlineText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function FooterBar({ children }) {
  return <View style={styles.footer}>{children}</View>;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerSide: { width: 32 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  backArrow: { fontSize: 34, color: COLORS.text, lineHeight: 34 },

  segRow: { flexDirection: 'row', gap: 6, marginVertical: 12 },
  seg: { flex: 1, height: 4, borderRadius: 2, backgroundColor: COLORS.gray },

  pill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  pillText: { fontSize: 12, fontWeight: '700' },

  btn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.purple,
  },
  btnPrimary: { backgroundColor: COLORS.purple },
  btnPrimaryText: { color: COLORS.white, fontWeight: '700', fontSize: 15 },
  btnOutline: { backgroundColor: COLORS.white },
  btnOutlineText: { color: COLORS.purple, fontWeight: '700', fontSize: 15 },
  btnDisabled: { opacity: 0.4 },

  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
});