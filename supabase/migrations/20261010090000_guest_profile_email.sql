-- Guests sign up with a private, made-up email built from their username.
-- The existing new-user trigger copies auth.users.email into profiles.email,
-- which would put that made-up address on the profile (and possibly onto a
-- resume). This adds a small separate trigger that blanks profiles.email for
-- accounts flagged as guests when the profile row is first created.
-- When the guest later creates a full account, the existing email-sync trigger
-- fills in the real email, so nothing else needs to change.
--
-- It does not touch handle_new_user, and it is safe to run more than once.

create or replace function public.blank_guest_profile_email()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if exists (
    select 1
    from auth.users u
    where u.id = new.id
      and u.raw_user_meta_data->>'is_guest' = 'true'
  ) then
    new.email := null;
  end if;
  return new;
end;
$$;

drop trigger if exists blank_guest_profile_email on public.profiles;
create trigger blank_guest_profile_email
  before insert on public.profiles
  for each row
  execute function public.blank_guest_profile_email();
