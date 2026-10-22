import { createClient } from 'npm:@supabase/supabase-js@2';

// Keep this domain in sync with GUEST_EMAIL_DOMAIN in src/features/auth/guestAccount.js.
const GUEST_EMAIL_DOMAIN = 'guest.careerlaunch.invalid';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const jsonResponse = (status: number, code: string, error: string) =>
  new Response(JSON.stringify({ code, error }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const isGuestUser = (
  user:
    | {
        app_metadata?: { is_guest?: boolean };
        is_anonymous?: boolean;
        user_metadata?: { is_guest?: boolean };
        email?: string;
      }
    | null
    | undefined,
) =>
  !!user &&
  (user.app_metadata?.is_guest === true ||
    user.is_anonymous === true ||
    user.user_metadata?.is_guest === true ||
    user.email?.trim().toLowerCase().endsWith(`@${GUEST_EMAIL_DOMAIN}`));

export async function requireFullAccount(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return jsonResponse(401, 'not_authenticated', 'Authentication required.');
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

  if (!supabaseUrl || !supabaseAnonKey) {
    return jsonResponse(500, 'server_not_configured', 'Server configuration error.');
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;

  if (error || !user) {
    return jsonResponse(401, 'not_authenticated', 'Authentication required.');
  }

  if (isGuestUser(user)) {
    return jsonResponse(403, 'guest_account', 'Full account required.');
  }

  return { user };
}
