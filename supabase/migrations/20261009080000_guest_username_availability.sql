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