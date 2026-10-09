// Supabase Edge Function: upgrade-guest-account
//
// Turns a username-and-password guest into a full account WITHOUT creating a new
// user, so the user id (and every row tied to it, such as lesson_progress and
// quiz_attempts) stays exactly the same. It swaps the guest's private email for
// the real one and clears the is_guest flag. It sends no email, because the
// private guest address cannot receive mail.
//
// The app calls it from CreateAccountScreen with the logged-in guest's session,
// so Supabase passes the guest's login token in the Authorization header.
//
// Keep GUEST_EMAIL_DOMAIN identical to GUEST_EMAIL_DOMAIN in
// src/features/auth/guestAccount.js.
import { createClient } from 'npm:@supabase/supabase-js@2';

const GUEST_EMAIL_DOMAIN = 'guest.careerlaunch.invalid';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The app is tested in a browser too, so the browser's preflight check must pass.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const reply = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return reply({ error: 'method_not_allowed' }, 405);

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return reply({ error: 'not_logged_in' }, 401);

  const url = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !anonKey || !serviceKey) return reply({ error: 'server_not_configured' }, 500);

  // 1. Who is calling? Ask Supabase to check the login token we were sent.
  const asCaller = createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: callerData, error: callerError } = await asCaller.auth.getUser();
  const user = callerData?.user;
  if (callerError || !user) return reply({ error: 'not_logged_in' }, 401);

  // 2. Only a username-and-password guest may use this. Both checks matter: the
  // flag can be edited by the app, but the private address cannot be faked
  // without actually being signed in with it.
  const hasGuestAddress = (user.email ?? '').toLowerCase().endsWith(`@${GUEST_EMAIL_DOMAIN}`);
  if (!hasGuestAddress || user.user_metadata?.is_guest !== true) {
    return reply({ error: 'not_a_guest' }, 403);
  }

  // 3. The new email.
  let body: { email?: unknown } = {};
  try {
    body = await req.json();
  } catch (_e) {
    return reply({ error: 'bad_request' }, 400);
  }

  const email = String(body?.email ?? '').trim().toLowerCase();
  if (!EMAIL_PATTERN.test(email) || email.endsWith(`@${GUEST_EMAIL_DOMAIN}`)) {
    return reply({ error: 'invalid_email' }, 400);
  }

  // 4. Swap it, as the admin. email_confirm: true means "treat the new email as
  // confirmed", so Supabase sends nothing and the change is immediate.
  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { error } = await admin.auth.admin.updateUserById(user.id, {
    email,
    email_confirm: true,
    user_metadata: { ...user.user_metadata, is_guest: false },
  });

  if (error) {
    const message = (error.message || '').toLowerCase();
    if (error.code === 'email_exists' || message.includes('already')) {
      return reply({ error: 'email_exists' }, 409);
    }
    return reply({ error: 'update_failed', message: error.message }, 500);
  }

  return reply({ ok: true });
});
