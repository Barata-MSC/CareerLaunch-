-- Listings can expire or change after a user selects them, so tracked applications
-- keep the plain-text fields the user saw rather than depending on a live feed.
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  source text not null,
  external_job_id text not null,
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

comment on table public.job_applications is
  'Per-user application tracker with a snapshot of the selected listing fields; listings may expire or change.';

create index if not exists job_applications_user_status_idx
  on public.job_applications (user_id, status);

alter table public.job_applications enable row level security;

drop policy if exists "Users can view own job applications" on public.job_applications;
create policy "Users can view own job applications"
  on public.job_applications for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own job applications" on public.job_applications;
create policy "Users can insert own job applications"
  on public.job_applications for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own job applications" on public.job_applications;
create policy "Users can update own job applications"
  on public.job_applications for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own job applications" on public.job_applications;
create policy "Users can delete own job applications"
  on public.job_applications for delete to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.set_job_applications_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_job_applications_updated_at on public.job_applications;
create trigger set_job_applications_updated_at
  before update on public.job_applications
  for each row execute function public.set_job_applications_updated_at();
