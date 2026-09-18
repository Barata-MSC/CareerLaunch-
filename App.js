import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './RegisterScreen/RegisterScreen';

import WelcomeScreen from './WelcomeScreen/WelcomeScreen.js';
import LoginScreen from './LoginScreen/LoginScreen.js';
import DashboardScreen from './DashboardScreen/DashboardScreen.js';

const Stack = createNativeStackNavigator();

//Github link
const linking = {
  prefixes: ['https://github.io'],
  config: {
    screens: {
      Welcome: '', 
      Login: 'login',
      Dashboard: 'dashboard',
      Register: 'register',
    },
  },
};

export default function App() {
  return (
    <View style={styles.appWrapper}>
      <View style={styles.phoneFrame}>
        <NavigationContainer linking={linking}>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#EDEDF2' : '#FFFFFF',
    // Fix: Ensure the canvas fills the entire web viewport height
    ...(Platform.OS === 'web' && {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', 
      width: '100vw',
    }),
  },
  phoneFrame: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 430 : undefined,
    backgroundColor: '#FFFFFF',
    ...(Platform.OS === 'web' && {
      minHeight: '100vh', // Fix: Guarantees the frame takes full height on desktop views
      boxShadow: '0 0 40px rgba(0,0,0,0.08)',
      overflow: 'hidden',
    }),
  },
});
