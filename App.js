import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  WelcomeScreen,
  LoginScreen,
  DashboardScreen,
  RegisterScreen,
  SplashScreen,
  ProfileScreen,
  JobFinderScreen,
  CareerRoadmapScreen,
  AIInterviewCoachScreen,
} from '@screens';

const Stack = createNativeStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <View style={styles.backdrop}>
      <View style={styles.phone}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            {/* Remove Stack.Screen name="Splash" from here */}
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="JobFinder" component={JobFinderScreen} />
            <Stack.Screen name="CareerRoadmap" component={CareerRoadmapScreen} />
            <Stack.Screen name="AIInterviewCoach" component={AIInterviewCoachScreen} />
          </Stack.Navigator>
        </NavigationContainer>


        {showSplash && (
          <SplashScreen
            appName="CareerLaunch!"
            onFinish={() => setShowSplash(false)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#e9eaf2' : '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  phone: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',

    ...(Platform.OS === 'web' && {
      width: 390,
      height: 844,
      borderRadius: 40,
      borderWidth: 8,
      borderColor: '#111',
      overflow: 'hidden',
    }),
  },
});