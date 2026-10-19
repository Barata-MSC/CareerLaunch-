# Brief 06: Application Tracker Saved to the Database

The Application Tracker currently lives in React context, so everything is lost when app state resets. This brief saves it to Supabase for completed accounts. The project has **no SQL file for this yet** (only users and Learning Hub progress are connected), so this brief creates a migration. It works with the existing sample listings and with the API-backed listings from brief 05 (it can run before or after 05).

**Run after `04-guest-gating.md`.**

## Before you run (human steps)

- Nothing to prepare. **After Copilot finishes**, the lead dev applies the generated migration to the Supabase project (SQL editor or CLI) and runs the two-user RLS test below. Copilot must not apply it.

## Prompt

### 1. Goal

Applications the user tracks (Applied, Interview, Hired, Rejected) persist per user in Supabase, load when the tracker opens, and survive restarts. Guests are locked out of this feature (brief 04), so only full accounts read and write.

### 2. Read first

- `CLAUDE.md`, `AGENTS.md`, `src/features/job-tracker/` and the applications context under `src/context/` (the current in-memory API: what functions and state screens use). Keep that API surface the same so screens change as little as possible.
- How Job Finder hands a job to the tracker and what fields a tracked job has today.
- `src/features/learning-hub/shared/progress/useCourseProgress.js` for the project's pattern: Supabase client use, optimistic updates, rollback with an error message, explicit error handling.
- `supabase/migrations/` for naming, style, and any existing helper functions (do not create a second `updated_at` trigger function if one exists).

### 3. Migration (write the file; do not apply it)

Create `supabase/migrations/<timestamp>_job_applications.sql`, idempotent where reasonable. Reference table shape (adjust names to the codebase's conventions, but keep the intent):

```sql
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  source text not null,                 -- provider name, or 'sample' for bundled listings
  external_job_id text not null,        -- provider's job id, or the sample job's id
  title text not null,
  company text,
  location text,
  apply_url text,
  status text not null default 'applied'
    check (status in ('applied', 'interview', 'hired', 'rejected')),
  notes text,
  applied_at timestamptz not null default now(),
  status_updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, source, external_job_id)
);
create index if not exists job_applications_user_status_idx
  on public.job_applications (user_id, status);
```

Also write:

- `alter table ... enable row level security`, then four owner-only policies for the `authenticated` role (select, insert, update, delete) using `(select auth.uid()) = user_id`, with a matching `with check` on insert and update. Drop-then-create each policy so the file can be re-run.
- An `updated_at` trigger (reuse an existing function if one exists).
- Comments explaining that listings expire, so the row stores a snapshot of the fields the user saw. Report whether the provider's terms allow storing a user-selected listing snapshot; if unsure, say so.

### 4. Client changes

- On tracker load, fetch the signed-in user's rows. Show loading, empty, and error-with-retry states.
- Add, change status, edit notes, and remove all write to Supabase with an **optimistic update that rolls back with a visible error** if the call fails. Never show success when the server rejected the change.
- Adding a job that is already tracked (same source and external id) must not create a duplicate; show the existing entry instead.
- Map the statuses between the app's labels and the stored codes in one place.
- Handle the sign-out and account-switch case: clear tracker state when the user changes so one user's rows never appear for another.
- Preserve the existing screens and navigation. Do not store job-finder search results here, only jobs the user chose to track.

### 5. Hard constraints

- Do not apply migrations, deploy functions, or touch the Supabase dashboard. No service-role key anywhere in the client.
- Do not change the Learning Hub tables or the profile table. No new dependencies.
- Do not run `npm run deploy`, and do not commit or push.

### 6. Docs

Update `CLAUDE.md`: the Application Tracker row (persisted for full accounts once the migration is applied; guests locked), and the Supabase section (new table, RLS, the migration file, and that it must be applied by a human). Remove the statement that the tracker is context-only, but only to the extent the code now matches.

### 7. Validation

1. `npm run lint`, then `npx expo export -p web`.
2. Human checklist for the lead dev, after applying the migration: sign in as user A, track two jobs, change one status, restart the app and confirm they persist; sign in as user B and confirm user A's rows are **not** visible and cannot be read or edited (RLS test); try adding the same job twice; turn off the network and confirm a visible error with rollback; sign out and back in as a different user.

There is no test script. Do not claim automated tests passed or that the migration was applied.

### 8. Final report

Summarize the changes, list files, report each validation result (passed, failed, or not run, and why), and state clearly that the migration still needs to be applied by a human.
