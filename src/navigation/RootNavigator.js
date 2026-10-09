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
  const effectiveInitialRoute = authInitialRoute || 'Welcome';

  // While a password-reset link is being handled, always show the auth stack
  // (even if someone happens to be logged in) so the Reset screen can appear.
  const isAuthenticated = Boolean(session?.user);
  const isRecoveringPassword = Boolean(recovery);
  const showApp = isAuthenticated && !isRecoveringPassword;

  // Remount when the active navigator changes so auth and app navigation state
  // cannot leak across authentication or password-recovery transitions.
  const navigationKey = isRecoveringPassword
    ? 'recovery'
    : showApp
      ? 'app'
      : `auth-${effectiveInitialRoute}`;

  return (
    <NavigationContainer key={navigationKey}>
      {showApp ? (
        <AppNavigator />
      ) : (
        <AuthNavigator
          initialRouteName={effectiveInitialRoute}
          recovery={recovery}
          onRecoveryDone={onRecoveryDone}
        />
      )}
    </NavigationContainer>
  );
}
