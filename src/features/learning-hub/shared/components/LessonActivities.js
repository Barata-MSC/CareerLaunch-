// Renders a lesson's optional `activities` list. Lessons without it show nothing,
// so older courses are not affected. To add an activity type: import it, add to MAP.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MiniSheet from './MiniSheet';
import QuickCheck from './QuickCheck';
import CodePlayground from './CodePlayground';
import JsPlayground from './JsPlayground';

const MAP = {
  miniSheet: MiniSheet,
  quickCheck: QuickCheck,
  playground: CodePlayground,
  jsRunner: JsPlayground,
};

export default function LessonActivities({ activities }) {
  if (!activities?.length) return null;

  return (
    <View>
      <Text style={styles.heading}>Try it yourself</Text>
      {activities.map((activity, i) => {
        const Activity = MAP[activity.type];
        return Activity ? <Activity key={i} {...activity} /> : null;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 15, fontWeight: '700', color: '#222222', marginBottom: 10, marginTop: 4 },
});
