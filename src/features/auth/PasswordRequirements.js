import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PASSWORD_RULES, getPasswordChecks, getPasswordStrength } from './passwordRules';

// Strength meter + live requirements checklist shown under a password input.
export default function PasswordRequirements({ password = '' }) {
  const checks = getPasswordChecks(password);
  const strength = getPasswordStrength(password);

  return (
    <View>
      {password.length > 0 ? (
        <View style={styles.strengthRow}>
          <View style={styles.strengthBars}>
            {[1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.strengthBar,
                  { backgroundColor: i <= strength.level ? strength.color : '#E3E3E8' },
                ]}
              />
            ))}
          </View>
          <Text style={[styles.strengthLabel, { color: strength.color }]}>{strength.label}</Text>
        </View>
      ) : null}

      <View style={styles.rulesWrap}>
        {PASSWORD_RULES.map((rule) => {
          const met = password.length > 0 && checks[rule.key];
          const failed = password.length > 0 && !checks[rule.key];
          return (
            <Text
              key={rule.key}
              style={[styles.ruleText, met && { color: '#2E9E5B' }, failed && { color: '#E5484D' }]}
            >
              {met ? '✓' : '•'} {rule.label}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  strengthRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  strengthBars: { flexDirection: 'row', flex: 1, gap: 6 },
  strengthBar: { flex: 1, height: 5, borderRadius: 3 },
  strengthLabel: { marginLeft: 10, fontSize: 12, fontWeight: '700', minWidth: 54 },
  rulesWrap: { marginTop: 8 },
  ruleText: { fontSize: 12, color: '#666666', marginTop: 3 },
});
