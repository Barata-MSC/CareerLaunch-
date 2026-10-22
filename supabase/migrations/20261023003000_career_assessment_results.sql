-- Results contain only versioned item responses and derived Holland scores.
-- Personal names, contact details, and worksheet text are never stored here.
create table if not exists public.career_assessment_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  version text not null,
  answers jsonb not null,
  scores jsonb not null,
  code text[] not null,
  taken_at timestamptz not null,
  constraint career_assessment_result_version check (length(version) between 1 and 20),
  constraint career_assessment_result_answers check (jsonb_typeof(answers) = 'array'),
  constraint career_assessment_result_scores check (jsonb_typeof(scores) = 'object'),
  constraint career_assessment_result_code check (cardinality(code) = 3),
  constraint career_assessment_result_unique_taken_at unique (user_id, taken_at)
);

comment on table public.career_assessment_results is
  'Career interest assessment attempts; stores item responses and derived scores only, never personal profile data or worksheet text.';

create index if not exists career_assessment_results_owner_taken_at_idx
  on public.career_assessment_results (user_id, taken_at desc);

alter table public.career_assessment_results enable row level security;

drop policy if exists "Users can view own career assessment results" on public.career_assessment_results;
create policy "Users can view own career assessment results"
  on public.career_assessment_results for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own career assessment results" on public.career_assessment_results;
create policy "Users can insert own career assessment results"
  on public.career_assessment_results for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own career assessment results" on public.career_assessment_results;
create policy "Users can delete own career assessment results"
  on public.career_assessment_results for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Human RLS check after applying this migration:
-- 1. Sign in as user A and insert/read one row; confirm it is visible.
-- 2. Sign in as user B and query A's row by id; confirm no row is visible.
-- 3. As user B, attempt to insert with A's user_id; confirm the insert is rejected.
-- 4. As user B, attempt to delete A's row; confirm no row is deleted.
-- Example queries to run under the authenticated role with each user's JWT subject:
-- set local role authenticated;
-- set local request.jwt.claim.sub = '<user-a-uuid>';
-- insert into public.career_assessment_results
--   (user_id, version, answers, scores, code, taken_at)
-- values (auth.uid(), 'v1', '[]'::jsonb, '{}'::jsonb, array['R','I','A'], now())
-- returning id;
-- select id, user_id from public.career_assessment_results;
-- set local request.jwt.claim.sub = '<user-b-uuid>';
-- select id, user_id from public.career_assessment_results; -- user A row must not appear
-- insert into public.career_assessment_results
--   (user_id, version, answers, scores, code, taken_at)
-- values ('<user-a-uuid>', 'v1', '[]'::jsonb, '{}'::jsonb, array['R','I','A'], now()); -- must fail
-- delete from public.career_assessment_results where id = '<user-a-result-uuid>'; -- deletes no row
