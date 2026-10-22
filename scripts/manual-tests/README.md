# Manual interview-coach tests

This folder contains local-only scripts for checking the Supabase Edge Function and the migration without claiming live verification.

Important:
- Do not run these scripts against a production Supabase project unless the team has explicitly approved it.
- These files are meant for a local or sandbox environment only.
- Keep `AI_TEST_CASE` unset after manual testing. The temporary test hook is only for debugging malformed-model responses.
- Remove the temporary test hook before redeploying the function for production use.

## Files

- `rls-checks.sql` — SQL snippets to confirm the expected migration tables and RLS policies.
- `rls-api-test.ps1` — PowerShell script to call the Edge Function with a real bearer token.
- `malformed-output-test.ps1` — PowerShell script to iterate through the temporary malformed-output fixtures.

## Local usage

1. Apply the migration: `supabase/migrations/20261023150000_interview_coach.sql`.
2. Deploy the Edge Function: `supabase/functions/interview-coach/index.ts`.
3. Provide a valid access token for a full account when the function requires auth.
4. Set the required environment variables in your local shell before running the scripts.
5. Unset `AI_TEST_CASE` when the local checks are done.

The scripts intentionally use PowerShell and `Invoke-RestMethod` because this repo documents Windows PowerShell as the local testing path.
