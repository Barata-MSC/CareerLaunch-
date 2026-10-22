-- AI evaluation usage counter for per-user daily limits.
create table if not exists public.ai_usage (
  user_id uuid not null,
  day date not null,
  request_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, day)
)
with (fillfactor = 90);

comment on table public.ai_usage is
  'Daily AI request counts per user. Only the Edge Function uses this table via service-role access.';

alter table public.ai_usage enable row level security;

-- interview sessions and answers are owner-only and saved for full accounts.
create table if not exists public.interview_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  category text not null default 'General',
  overall integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.interview_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.interview_sessions (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  question text not null,
  answer_text text not null,
  evaluation jsonb not null default '{}'::jsonb,
  source text not null check (source in ('ai', 'local')),
  created_at timestamptz not null default now()
);

comment on table public.interview_sessions is
  'One interview practice session per user.';

comment on table public.interview_answers is
  'Answer-level details for each interview practice entry.';

create index if not exists interview_sessions_user_created_idx
  on public.interview_sessions (user_id, created_at desc);

create index if not exists interview_answers_session_idx
  on public.interview_answers (session_id, created_at desc);

create index if not exists interview_answers_user_idx
  on public.interview_answers (user_id, created_at desc);

alter table public.interview_sessions enable row level security;
alter table public.interview_answers enable row level security;

drop policy if exists "Users can view own interview sessions" on public.interview_sessions;
create policy "Users can view own interview sessions"
  on public.interview_sessions for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own interview sessions" on public.interview_sessions;
create policy "Users can insert own interview sessions"
  on public.interview_sessions for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own interview sessions" on public.interview_sessions;
create policy "Users can delete own interview sessions"
  on public.interview_sessions for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can view own interview answers" on public.interview_answers;
create policy "Users can view own interview answers"
  on public.interview_answers for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own interview answers" on public.interview_answers;
create policy "Users can insert own interview answers"
  on public.interview_answers for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own interview answers" on public.interview_answers;
create policy "Users can delete own interview answers"
  on public.interview_answers for delete to authenticated
  using ((select auth.uid()) = user_id);

-- No update policy is required for the briefed behavior.
