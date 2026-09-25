import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Absolute screen imports via your working Babel alias
import { DashboardScreen, JobFinderScreen, CareerRoadmapScreen, ProfileScreen } from '@screens';

// Local peer file import (MainTabs and ResumeBuilder sit in the same folder)
import ResumeBuilderScreen from './ResumeBuilder';

const ICONS = {
  Dashboard: require('@assets/dashboard.png'),
  ResumeBuilder: require('@assets/resume_builder.png'),
  JobFinder: require('@assets/job_search.png'),
  CareerRoadmap: require('@assets/roadmap.png'),
  Profile: require('@assets/icon-profile.png'),
};

const PURPLE = '#5B21F5';
const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
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
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="ResumeBuilder" component={ResumeBuilderScreen} />
      <Tab.Screen name="JobFinder" component={JobFinderScreen} />
      <Tab.Screen name="CareerRoadmap" component={CareerRoadmapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: { width: 22, height: 22 },
});