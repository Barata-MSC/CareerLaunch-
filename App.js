import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './RegisterScreen/RegisterScreen';

import WelcomeScreen from './WelcomeScreen/WelcomeScreen.js';
import LoginScreen from './LoginScreen/LoginScreen.js';
import DashboardScreen from './DashboardScreen/DashboardScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.appWrapper}>
      <View style={styles.phoneFrame}>
        <NavigationContainer>
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
    ...(Platform.OS === 'web' && {
      alignItems: 'center',
      justifyContent: 'center',
    }),
  },
  phoneFrame: {
    flex: 1,                    // always flex: 1
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 430 : undefined,
    backgroundColor: '#FFFFFF',
    ...(Platform.OS === 'web' && {
      height: '100%',           // or '100vh' — both work once flex is 1
      boxShadow: '0 0 40px rgba(0,0,0,0.08)',
      overflow: 'hidden',
    }),
  },
});