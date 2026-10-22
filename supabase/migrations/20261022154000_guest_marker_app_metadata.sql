begin;

create or replace function public.mark_guest_app_metadata()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.email is not null
    and pg_catalog.right(
      pg_catalog.lower(new.email),
      pg_catalog.length('@guest.careerlaunch.invalid')
    ) = '@guest.careerlaunch.invalid'
  then
    new.raw_app_meta_data :=
      coalesce(new.raw_app_meta_data, '{}'::jsonb) || '{"is_guest": true}'::jsonb;
  end if;

  return new;
end;
$$;

drop trigger if exists mark_guest_app_metadata on auth.users;
create trigger mark_guest_app_metadata
before insert on auth.users
for each row
execute function public.mark_guest_app_metadata();

update auth.users
set raw_app_meta_data =
  coalesce(raw_app_meta_data, '{}'::jsonb) || '{"is_guest": true}'::jsonb
where email is not null
  and pg_catalog.right(
    pg_catalog.lower(email),
    pg_catalog.length('@guest.careerlaunch.invalid')
  ) = '@guest.careerlaunch.invalid'
  and raw_app_meta_data ->> 'is_guest' is distinct from 'true';

create or replace function public.is_full_account()
returns boolean
language sql
stable
set search_path = ''
as $$
  select auth.jwt() is not null
    and auth.jwt() -> 'app_metadata' ->> 'is_guest' is distinct from 'true'
    and auth.jwt() -> 'is_anonymous' is distinct from 'true'::jsonb
    and auth.jwt() -> 'user_metadata' ->> 'is_guest' is distinct from 'true'
    and (
      auth.jwt() ->> 'email' is null
      or pg_catalog.right(
        pg_catalog.lower(auth.jwt() ->> 'email'),
        pg_catalog.length('@guest.careerlaunch.invalid')
      ) <> '@guest.careerlaunch.invalid'
    );
$$;

grant execute on function public.is_full_account() to authenticated;

comment on function public.is_full_account() is
  'Returns true only for authenticated full accounts; app_metadata is server-controlled to prevent guest self-upgrades.';

drop policy if exists resumes_require_full_account on public.resumes;
create policy resumes_require_full_account
on public.resumes
as restrictive
for all
to authenticated
using ((select public.is_full_account()))
with check ((select public.is_full_account()));

drop policy if exists job_applications_require_full_account on public.job_applications;
create policy job_applications_require_full_account
on public.job_applications
as restrictive
for all
to authenticated
using ((select public.is_full_account()))
with check ((select public.is_full_account()));

commit;