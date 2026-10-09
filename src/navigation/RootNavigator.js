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

  // Remount when the active navigator changes so auth and app navigation state
  // cannot leak across authentication or password-recovery transitions.
  const navigationKey = recovery
    ? 'recovery'
    : showApp
      ? 'app'
      : `auth-${authInitialRoute}`;

  return (
    <NavigationContainer key={navigationKey}>
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
