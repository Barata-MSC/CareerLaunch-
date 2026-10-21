-- One resume per account keeps this prototype's builder and preview flow simple.
-- The JSON size cap prevents unusually large resume payloads from being stored.
create table if not exists public.resumes (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  schema_version integer not null default 1,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint resumes_data_size check (octet_length(data::text) <= 200000)
);

comment on table public.resumes is
  'One resume per authenticated user; resume sections are stored together as JSON for the current builder.';
comment on constraint resumes_data_size on public.resumes is
  'Limits each resume JSON payload to 200,000 bytes.';

alter table public.resumes enable row level security;

drop policy if exists "Users can view own resume" on public.resumes;
create policy "Users can view own resume"
  on public.resumes for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own resume" on public.resumes;
create policy "Users can insert own resume"
  on public.resumes for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own resume" on public.resumes;
create policy "Users can update own resume"
  on public.resumes for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own resume" on public.resumes;
create policy "Users can delete own resume"
  on public.resumes for delete to authenticated
  using ((select auth.uid()) = user_id);

-- No reusable updated_at trigger function exists in the checked-in migrations.
create or replace function public.set_resumes_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_resumes_updated_at on public.resumes;
create trigger set_resumes_updated_at
  before update on public.resumes
  for each row execute function public.set_resumes_updated_at();
