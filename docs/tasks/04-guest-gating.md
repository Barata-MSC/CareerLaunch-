# Brief 04: Guest Gating (Complete-Account Requirement)

**Run this before 05, 06, and 07.** It creates the shared pieces they reuse, so the three features do not each invent their own lock screen.

## Decision (already made)

Guest accounts cannot use **Resume Builder**, **Job Finder** (including the Application Tracker), or the **Interview Coach**. They must first complete their account with an email. Everything else (dashboard, Learning Hub, profile) stays open to guests.

## Prompt

### 1. Goal

Add one consistent rule across the app: guests see a friendly lock screen on the three gated features, with a clear way to complete their account. The rule must also be enforceable on the server, because hiding a button is not security.

### 2. Read first

- `CLAUDE.md` and `AGENTS.md`.
- `src/features/auth/`: the guest flow, registration, and the **account upgrade** flow. Find exactly how guest status is stored (user metadata flag, the reserved synthetic email, or both) and where the app reads it.
- `src/context/` (profile and auth context) and `App.js` provider composition.
- `supabase/functions/` (the existing `upgrade-guest-account` function) to see how it identifies guests on the server.
- The dashboard quick actions and bottom tabs: how users reach Resume Builder, Job Finder, the Application Tracker, and the Interview Coach.

### 3. One definition of "full account"

Create a single hook, for example `useAccountTier()` in the auth feature (or extend an existing context if one already exposes this), returning `{ isGuest, isFullAccount, loading }`. Reuse the existing way of detecting guests; do not invent a second one. While loading, do not flash the lock screen at full-account users.

### 4. The lock screen: `AccountGate`

Create `src/components/AccountGate.js`:

- Props: `featureName`, `description`, `children`.
- Guest: show an icon, "Complete your account to use {featureName}", one or two sentences on why, a primary button that goes to the **existing** account-upgrade flow (reuse that route; do not build new auth UI), and a secondary "Not now" that goes back.
- Full account: render `children`.
- Accessible labels and touch targets; matches the shared palette. If `AppPressable` (brief 02) exists, use it.

Wrap the entry screens for Resume Builder, Job Finder, Application Tracker, and Interview Coach. Make sure deep links or direct navigation also hit the gate. On the dashboard, show a small lock badge on those quick actions for guests, but keep them tappable so they reach the explanation. After a guest completes the upgrade, the gate must unlock without requiring an app restart (check that the account tier refreshes).

### 5. Server-side helper for Edge Functions

**Function layout rule (the team deploys with the Supabase CLI).** Each Edge Function lives in its own folder, `supabase/functions/<function-name>/index.ts`, and code shared between functions lives in `supabase/functions/_shared/`, imported with an explicit relative path and the `.ts` extension (for example `../_shared/requireFullAccount.ts`). The repository's existing function is currently a single flat file, `supabase/functions/index.ts` (`upgrade-guest-account`). **Do not move, rename, edit, or delete it** in this run; moving it into `supabase/functions/upgrade-guest-account/` is a separate, deliberate task. Mention the mismatch in the report. Also check whether `supabase/config.toml` exists; if it does not, do not run `supabase init` or `supabase link` yourself, and tell the human that the lead dev must do it. 

Create `supabase/functions/_shared/requireFullAccount.ts`. It must:

- Take a `Request`, read the `Authorization` header, create a Supabase client with `SUPABASE_URL` and `SUPABASE_ANON_KEY` and that header, and call `auth.getUser()` to verify the caller.
- Apply the **same guest definition** as the client.
- Return either `{ user }` or a ready `Response`: 401 for unauthenticated, 403 for guests, with a small JSON body (`{ error, code }`).
- Include a CORS helper (the app also runs on web) and handle `OPTIONS` preflight.
- Never use the service-role key in this helper.

Do not deploy anything. Functions 05 and 07 will import this helper.

### 6. Hard constraints

- Do not change guest creation, guest upgrade, or session logic. The user ID must stay the same after an upgrade.
- No new dependencies, no secrets in the client, no `.env` access.
- Do not run `npm run deploy`, and do not commit or push.
- Keep the diff focused.

### 7. Docs

Update `CLAUDE.md`: the feature table (which features are gated), the authentication row (the account-tier hook and `AccountGate`), and the Supabase section (the shared function helper).

### 8. Validation

1. `npm run lint`.
2. `npx expo export -p web`.
3. Human test checklist: as a guest, each of the four gated entries shows the lock screen and the Learning Hub still works; the upgrade button reaches the existing flow; after upgrading, the features unlock without a restart; a full account never sees the lock; direct navigation to a gated screen is blocked for guests.

There is no test script. Do not claim automated tests passed.

### 9. Final report

Summarize the changes, list files, report each validation result (passed, failed, or not run), and note exactly how guests are detected so later briefs match it.
