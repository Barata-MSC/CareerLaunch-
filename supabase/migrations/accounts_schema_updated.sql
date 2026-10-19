-- CareerLaunch base account/profile schema (fresh setup).
-- For an EXISTING project, prefer persistent_guest_accounts_migration.sql.
-- Run in Supabase Dashboard -> SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  middle_name text,
  email text,
  contact_number text,
  birthday text,
  avatar_url text,
  username text,
  -- true means the account is currently being used in guest mode.
  -- This is an app-state marker, not an authentication/security boundary.
  guest_mode boolean not null default false,
  updated_at timestamptz not null default now()
);

-- Also add these columns if profiles was created by an earlier version.
alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists guest_mode boolean not null default false;
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = id);

-- Usernames are case-insensitively unique. Empty strings are treated as no username.
-- On an EXISTING database, resolve duplicate usernames before creating this index.
create unique index if not exists profiles_username_lower_uidx
  on public.profiles (lower(btrim(username)))
  where username is not null and btrim(username) <> '';

-- Create/update a profile for each Auth user. New persistent guest accounts should
-- pass username and guest_mode: true in signUp() user metadata. Legacy anonymous
-- Auth users are also marked as guests via auth.users.is_anonymous.
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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Avatar storage bucket and policies.
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "Avatar images are publicly readable" on storage.objects;
create policy "Avatar images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "Users can upload their own avatar" on storage.objects;
create policy "Users can upload their own avatar"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

drop policy if exists "Users can update their own avatar" on storage.objects;
create policy "Users can update their own avatar"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'avatars'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  )
  with check (
    bucket_id = 'avatars'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );
