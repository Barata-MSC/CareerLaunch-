create or replace function public.is_guest_username_taken(candidate_username text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where lower(btrim(username)) = lower(btrim(candidate_username))
  );
$$;

revoke all on function public.is_guest_username_taken(text) from public;
grant execute on function public.is_guest_username_taken(text) to anon, authenticated;

notify pgrst, 'reload schema';
