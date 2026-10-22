# Career Assessment Build Checkpoint

**Brief:** `docs/tasks/10-career-assessment.md`
**Branch:** `assessment`
**Status:** Implementation complete; Supabase migration and device/account tests need human verification.

## Completed phases

- [x] Inspected career metadata and shared registry; assessment fit uses all ten current career IDs directly from `careers.js`.
- [x] Inspected the Careers navigation, guest marker, AppPressable, Resume persistence pattern, Expo SDK 57 docs, validation tooling, and documentation.
- [x] Added original v1 RIASEC question bank, deterministic scoring and seeded non-adjacent question ordering, career matching, and descriptions for all six types.
- [x] Added intro, one-question-at-a-time, results, and career worksheet screens. The Careers screen entry card opens the intro.
- [x] Added local draft/result persistence for guests and signed-out use; full accounts also save results remotely. Local guest results are offered for explicit user-approved account saving after upgrade.
- [x] Added owner-only migration with select, insert, and delete policies; it has not been applied.
- [x] Added `validate:assessment` package command and validator script.
- [x] Updated CareerLaunch documentation and this checkpoint.
- [x] Reviewed Doctor and Marine statuses: both remain `coming-soon`; their result cards do not link to course content.
- [x] Checked brief 07: it is listed as Ready and no AI Coach functionality is implemented, so the optional Coach hand-off is omitted.

## Decisions and implementation notes

- English only; no learning-style quiz; no retake cap. Local and remote attempt storage retain the latest five results.
- No PDF export or dependency added. The worksheet uses React Native `Share` with plain text.
- Assessment runs locally and is not clinical or diagnostic. There is no AI scoring or matching.
- Equal normalized scores use the required RIASEC hexagon order first; if a tie remains, a type with more 5-point answers takes precedence.
- Question order is generated once from a persisted seed and item order in the draft; same-type questions are never adjacent.
- The migration is `supabase/migrations/20261023003000_career_assessment_results.sql`. It stores version, item/value answers, derived score object, Holland code, timestamp, user ID, and a row ID for retention cleanup.
- The same assessment paths are available to guests; no guest gate is applied.
- Full-account remote failures do not discard the local result and display a clear sync status. A local result is not automatically transferred on guest upgrade.

## Validation

- `npm run validate:assessment`: passed (36 items; deterministic scoring/matching; all registered careers covered).
- `npm run validate:content`: passed (10 careers, 18 tracks, 119 courses).
- `npm run lint`: passed.
- `npx expo export -p web`: passed. The local Expo web preview loaded the Welcome screen and navigated to Login; the assessment flow was not exercised because it requires signing in or creating a guest account.
- Guest/upgraded-account testing, real-device Share behavior, offline/restart checks, and Supabase RLS tests: needs human verification.

## Human follow-up

1. Apply the migration manually in Supabase SQL Editor; do not use `supabase db push` before the repository's migration-history reconciliation.
2. Run the migration's two-user owner-only RLS checks.
3. Test the complete question flow, backtracking, restart/resume, results, available-career links, Coming soon labels, worksheet share, offline local fallback, and explicit guest-upgrade save consent on supported real devices.
