import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from '@config/supabase';

// A throwaway Supabase client whose session lives in memory only.
// Because the main `supabase` client (and App.js's auth listener) never sees
// this session, using it does NOT log the user into the app. Used for:
//   - sign-up (so the new account lands on Login, not the dashboard)
//   - password reset (so the recovery session doesn't open the dashboard)
export const createIsolatedClient = (storageKey = 'careerlaunch-temp') =>
  createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storageKey,
    },
  });
