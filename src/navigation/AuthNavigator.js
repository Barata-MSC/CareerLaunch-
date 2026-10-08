import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  ForgotPasswordScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  WelcomeScreen,
} from '@features/auth';

const Stack = createNativeStackNavigator();

// `recovery` is set by App.js when the app was opened from a password-reset
// email link. In that case we start directly on the Reset Password screen.
export default function AuthNavigator({
  initialRouteName = 'Welcome',
  recovery = null,
  onRecoveryDone,
}) {
  return (
    <Stack.Navigator
      initialRouteName={recovery ? 'ResetPassword' : initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword">
        {(props) => (
          <ResetPasswordScreen {...props} recovery={recovery} onDone={onRecoveryDone} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
