-- Public avatar URLs can be read without a storage.objects SELECT policy.
-- Remove only unrestricted SELECT policies, or policies that expose every
-- object in the avatars bucket. Keep owner-folder policies intact.
do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and cmd = 'SELECT'
      and (
        coalesce(qual, '') ~* '^\s*\(*\s*true\s*\)*\s*$'
        or (
          qual ilike '%avatars%'
          and qual not ilike '%auth.uid%'
          and qual not ilike '%owner_id%'
          and qual not ilike '%foldername%'
        )
      )
  loop
    execute format('drop policy %I on storage.objects', policy_record.policyname);
  end loop;
end;
$$;
