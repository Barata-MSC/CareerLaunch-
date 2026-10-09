import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@config/supabase';
import { isGuestUser, isGuestEmail } from '../features/auth/guestAccount';

const ProfileContext = createContext(null);

/**
 * Wrap the app in this (App.js already does) and it will automatically
 * load/reload the `profiles` row for whoever is currently logged in.
 */
export function ProfileProvider({ session, children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // True while the user is on a guest account: either an old anonymous guest, or a
  // guest who signed up with a username and password (flagged is_guest). It flips
  // to false as soon as the guest upgrades to a full account on CreateAccountScreen.
  const isGuest = isGuestUser(session?.user);

  // True for a guest who can log back in with a username and password. Old
  // anonymous guests cannot, because they never set a password.
  const hasGuestLogin = isGuest && isGuestEmail(session?.user?.email);

  const fetchProfile = useCallback(async () => {
    if (!session?.user?.id) {
      setProfile(null);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    setLoading(false);
    if (!error) setProfile(data);
  }, [session?.user?.id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Call this from ProfileScreen (or anywhere) to save edits.
  const updateProfile = async (updates) => {
    if (!session?.user?.id) return { error: new Error('Not logged in') };
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', session.user.id)
      .select()
      .single();
    if (!error) setProfile(data);
    return { data, error };
  };

  return (
    <ProfileContext.Provider
      value={{ profile, loading, isGuest, hasGuestLogin, refreshProfile: fetchProfile, updateProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside a ProfileProvider');
  return ctx;
}
