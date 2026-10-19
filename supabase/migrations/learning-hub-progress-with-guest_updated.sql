-- Learning Hub progress and profile fields for CareerLaunch.
-- Run after accounts_schema_updated.sql.
-- This version supports both legacy anonymous users and persistent email/password
-- accounts that are marked guest_mode = true. Anonymous sign-in can remain enabled
-- temporarily if your app still needs to support existing legacy guest sessions.

alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists guest_mode boolean not null default false;
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

-- Enforce case-insensitive username uniqueness. If you are migrating existing data,
-- check for duplicates before creating this index (the migration file does that check).
create unique index if not exists profiles_username_lower_uidx
  on public.profiles (lower(btrim(username)))
  where username is not null and btrim(username) <> '';

-- Keep the profile-creation trigger compatible with both guest and registered accounts.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, first_name, last_name, middle_name, email,
    contact_number, birthday, username, guest_mode
  )
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'middle_name',
    new.email,
    new.raw_user_meta_data ->> 'contact_number',
    new.raw_user_meta_data ->> 'birthday',
    nullif(btrim(new.raw_user_meta_data ->> 'username'), ''),
    coalesce(new.is_anonymous, false)
      or lower(coalesce(new.raw_user_meta_data ->> 'guest_mode', 'false')) = 'true'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Completed lessons: one row per user, course, and lesson.
create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, course_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

drop policy if exists "Users can view own lesson progress" on public.lesson_progress;
create policy "Users can view own lesson progress"
  on public.lesson_progress for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own lesson progress" on public.lesson_progress;
create policy "Users can insert own lesson progress"
  on public.lesson_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own lesson progress" on public.lesson_progress;
create policy "Users can delete own lesson progress"
  on public.lesson_progress for delete to authenticated
  using ((select auth.uid()) = user_id);

-- One immutable row for each quiz submission.
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  score integer not null check (score >= 0),
  total integer not null check (total > 0),
  percent integer not null check (percent between 0 and 100),
  passed boolean not null,
  created_at timestamptz not null default now()
);

create index if not exists quiz_attempts_user_course_idx
  on public.quiz_attempts (user_id, course_id, created_at desc);

alter table public.quiz_attempts enable row level security;

drop policy if exists "Users can view own quiz attempts" on public.quiz_attempts;
create policy "Users can view own quiz attempts"
  on public.quiz_attempts for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own quiz attempts" on public.quiz_attempts;
create policy "Users can insert own quiz attempts"
  on public.quiz_attempts for insert to authenticated
  with check ((select auth.uid()) = user_id);
