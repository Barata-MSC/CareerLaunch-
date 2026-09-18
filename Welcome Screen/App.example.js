// App.example.js
// Example of how to render the screen as your app's root component.
// Rename to App.js (or import WelcomeScreen into your navigator) to use it.

import React from 'react';
import { Alert } from 'react-native';
import { WelcomeScreen } from './index';
import WelcomeScreen from './index';

export default function App() {
  return (
    <WelcomeScreen
      onGetStarted={() => Alert.alert('Get started pressed')}
      onLogin={() => Alert.alert('Login pressed')}
    />
  );
}







