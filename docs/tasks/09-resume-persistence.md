# Brief 09: Resume Builder Saved to the Database

The Resume Builder currently keeps its data in React context, so a learner loses their resume when app state resets. This brief saves it to Supabase for completed accounts. A resume holds personal information (name, contact details, history), so privacy and access control matter more here than in most features.

**Run after `04-guest-gating.md`.** It can run in any order relative to 05 to 08. Guests are locked out of the Resume Builder (brief 04), so only full accounts read and write.

## Before you run (human steps)

- Nothing to prepare. **After Copilot finishes**, the lead dev applies the generated migration to the Supabase project and runs the two-user RLS test below. Copilot must not apply it.
- Decide one product question with the team: **one resume per account** (this brief's default) or several. Several resumes is a bigger change; do not build it in this run.

## Prompt

### 1. Goal

The learner's resume (personal information, education, skills, experience, certificates, and projects) is saved to their account, loads when the Resume Builder opens, and survives restarts. The completeness score and suggestions stay **rule-based and derived**; they are recalculated from the saved data, never stored.

### 2. Read first

- `CLAUDE.md`, `AGENTS.md`, `src/features/resume-builder/`, and the resume context under `src/context/`. Find the exact shape of the resume state, the functions screens use to read and update it, validation rules, and the preview flow. **Keep that API the same** so screens change as little as possible.
- Whether the resume state includes anything that is not plain data (for example an image or file reference). Photos and file uploads are **out of scope**; if they exist, report how you handled them.
- `src/features/learning-hub/shared/progress/useCourseProgress.js` for the project's pattern (Supabase client use, optimistic updates, rollback with a visible error message, explicit error handling).
- Brief 06's migration (`job_applications`) and `supabase/migrations/` for naming, style, and any existing `updated_at` helper function (reuse it; do not create a second one).
- Brief 04's `AccountGate` and `useAccountTier`.

### 3. Migration (write the file; do not apply it)

Create `supabase/migrations/<timestamp>_resumes.sql`, idempotent where reasonable. Reference shape (adjust names to the codebase's conventions, but keep the intent):

```sql
create table if not exists public.resumes (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  schema_version integer not null default 1,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint resumes_data_size check (octet_length(data::text) <= 200000)
);
```

Design rules:

- **One row per user** (`user_id` is the primary key). The resume sections live in `data` as JSON, exactly the plain-data shape the app already uses, with `schema_version` so later changes can migrate old rows. Do not split the resume across many tables in this run.
- Enable Row Level Security, then four owner-only policies for the `authenticated` role (select, insert, update, delete) using `(select auth.uid()) = user_id`, with a matching `with check` on insert and update. Drop-then-create each policy so the file can be re-run. No policy for `anon`.
- An `updated_at` trigger (reuse an existing function if one exists).
- Do not store the completeness score, suggestions, or any derived value.
- Add comments explaining the one-row-per-user decision and the size cap.

### 4. Client changes

- On Resume Builder open, fetch the signed-in user's row. If none exists, start from the same empty resume as today. Show loading, error-with-retry, and empty states. Never show an empty resume that is actually a failed load; a load error must not be treated as "no resume", and it must not be saved over the real data.
- **Save automatically** after edits with a debounce (for example, a short delay after the learner stops typing), and also save when the learner leaves the screen or the app goes to the background. Use an upsert on `user_id`. Show a small, honest status: "Saving…", "Saved", or "Couldn't save. Retry". Never show "Saved" when the server rejected the write.
- On a failed save, keep the learner's local edits, show the visible error, and retry on the next change or on tapping Retry. Do not silently drop edits.
- Handle the two-device case simply: **last write wins**. Before overwriting on first save after load, no extra conflict logic is required; say so in the report.
- Handle sign-out and account switching: clear the resume state when the user changes, so one user's resume never appears for another. This must work with the guest-upgrade flow, where the user ID stays the same.
- Validate the loaded `data` defensively (unknown shape, missing sections, older `schema_version`): fill missing sections with defaults instead of crashing.
- Add **"Delete my resume"** in an obvious place in the Resume Builder, with a confirmation. It deletes the user's row and resets the in-app resume.
- Preserve the existing screens, validation, preview flow, and navigation. Do not add export, PDF generation, or sharing in this run.

### 5. Privacy

- Do not log resume contents, names, emails, phone numbers, or any field of `data`. Log only generic error categories.
- Add a one-line note on the resume screen that the resume is saved to the learner's account and can be deleted at any time.
- Never send resume data anywhere other than the user's own Supabase row.

### 6. Hard constraints

- Do not apply migrations, deploy functions, or touch the Supabase dashboard. No service-role key anywhere in the client.
- Do not change the Learning Hub tables, `profiles`, or any other existing table. No new dependencies.
- Do not run `npm run deploy`, and do not commit or push. Do not touch `.env`.

### 7. Docs

Update `CLAUDE.md`: the Resume Builder row (saved to Supabase for full accounts once the migration is applied; guests locked; score is rule-based and derived), and the Supabase section (new table, RLS, the migration file, and that it must be applied by a human). Remove the statement that resume state is context-only, but only to the extent the code now matches. Update the "do not assume" note that says there are no tables for resumes, to match reality.

### 8. Validation

1. `npm run lint`, then `npx expo export -p web`.
2. Human checklist for the lead dev, after applying the migration: sign in as user A, fill in a resume, restart the app, and confirm it persists; sign in as user B and confirm user A's resume is **not** visible and cannot be read or edited (RLS test); turn off the network, edit, and confirm a visible save error with edits kept and a successful retry once back online; sign out and in as a different user; upgrade a guest to a full account and confirm the resume is still the same user's; use "Delete my resume" and confirm the row is gone; load a resume row with a missing section and confirm the app does not crash.

There is no test script. Do not claim automated tests passed or that the migration was applied.

### 9. Final report

Summarize the changes, list files, report each validation result (passed, failed, or not run, and why), state clearly that the migration still needs to be applied by a human, and describe how photos or non-plain data (if any) were handled.
