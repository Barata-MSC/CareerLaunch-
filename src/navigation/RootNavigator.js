import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

export default function RootNavigator({
  session,
  recovery = null,
  authInitialRoute = 'Welcome',
  onRecoveryDone,
}) {
  // While a password-reset link is being handled, always show the auth stack
  // (even if someone happens to be logged in) so the Reset screen can appear.
  const showApp = session && session.user && !recovery;

  // The key remounts the container when we enter/leave the recovery flow so the
  // auth stack starts on the right screen (Reset Password, then Login).
  return (
    <NavigationContainer key={recovery ? 'recovery' : authInitialRoute}>
      {showApp ? (
        <AppNavigator />
      ) : (
        <AuthNavigator
          initialRouteName={authInitialRoute}
          recovery={recovery}
          onRecoveryDone={onRecoveryDone}
        />
      )}
    </NavigationContainer>
  );
}
