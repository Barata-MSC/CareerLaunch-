import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useReduceMotion from '@components/motion/useReduceMotion';

// Import screens from the feature barrel.
import { DashboardScreen, JobFinderScreen, LearningHubScreen, ProfileScreen } from '@features';
import ResumeBuilderScreen from './ResumeBuilder';

const ICONS = {
  Dashboard: require('@assets/dashboard.png'),
  ResumeBuilder: require('@assets/resume_builder.png'),
  JobFinder: require('@assets/job_search.png'),
  LearningHub: require('@assets/roadmap.png'),
  Profile: require('@assets/profile.png'),
};

const PURPLE = '#5B21F5';
const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const reducedMotion = useReduceMotion();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        animation: reducedMotion ? 'none' : 'fade',
        tabBarShowLabel: false,
        tabBarActiveTintColor: PURPLE,
        tabBarInactiveTintColor: '#B5B5B9',
        tabBarIcon: ({ focused }) => (
          <Image
            source={ICONS[route.name]}
            style={[styles.icon, { tintColor: focused ? PURPLE : '#B5B5B9' }]}
            resizeMode="contain"
          />
        ),
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tab.Screen name="ResumeBuilder" component={ResumeBuilderScreen} />
      <Tab.Screen name="JobFinder" component={JobFinderScreen} />
      <Tab.Screen name="LearningHub" component={LearningHubScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: { width: 22, height: 22 },
});