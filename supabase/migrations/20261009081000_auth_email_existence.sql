create or replace function public.does_auth_email_exist(candidate_email text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from auth.users
    where lower(email) = lower(btrim(candidate_email))
  );
$$;

revoke all on function public.does_auth_email_exist(text) from public;
grant execute on function public.does_auth_email_exist(text) to anon, authenticated;
