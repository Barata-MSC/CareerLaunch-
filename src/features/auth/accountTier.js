import { useMemo } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { isGuestUser } from './guestAccount';

export function useAccountTier() {
  const { session, loading } = useProfile();

  return useMemo(() => {
    const user = session?.user;
    const isGuest = isGuestUser(user);
    return {
      isGuest,
      isFullAccount: !loading && !!user && !isGuest,
      loading,
    };
  }, [session, loading]);
}
