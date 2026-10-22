-- Local-only SQL checks for the interview-coach migration.
-- This file is intentionally safe to review; do not run it against a live production database unless the team has explicitly approved it.

select n.nspname as table_schema, c.relname as table_name, c.relrowsecurity as rowsecurity
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in ('ai_usage', 'interview_sessions', 'interview_answers')
  and c.relkind = 'r'
order by c.relname;

select table_schema, table_name, column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name in ('ai_usage', 'interview_sessions', 'interview_answers')
order by table_name, ordinal_position;

select schemaname, tablename, policyname, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename in ('ai_usage', 'interview_sessions', 'interview_answers')
order by tablename, policyname;

-- Expected behavior for the migration:
-- - ai_usage is server-only and not intended for app-role clients.
-- - interview_sessions allows authenticated users to select/insert/delete only their own rows.
-- - interview_answers allows authenticated users to select/insert/delete only their own rows.
-- - any user-specific delete flow should ensure the session_id also matches that user's session.

-- Optional sanity test: a human can confirm that no anonymous access is granted.
select *
from pg_policies
where schemaname = 'public'
  and tablename in ('interview_sessions', 'interview_answers')
  and roles::text like '%anon%';
