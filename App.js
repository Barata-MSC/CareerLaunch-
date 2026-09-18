import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen.js';
import DashboardScreen from './DashboardScreen/DashboardScreen.js';

export default function App() {
  return (
    <View style={styles.container}>
      <DashboardScreen />
      <StatusBar style="auto" />  

    </View>
  );
}


const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
});
