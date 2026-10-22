# Task Briefs for Copilot (Team Workflow)

Each file here is a self-contained brief that a teammate can hand to GitHub Copilot (Agent mode) to run one workstream in one execution. They live in `docs/tasks/` instead of inside `src/` because most of them cut across several features.

This file is only an index for the briefs. It does not replace the project's root `README.md` or the Learning Hub README, and it does not need to match them.

## How to run a brief

1. Pull the latest `main` and create a branch per `GIT_WORKFLOW.md` (one branch per brief, for example `feat/sfx`).
2. Finish the brief's **Before you run** checklist. These are human-only steps Copilot cannot do (adding audio files, getting API keys, running a coverage test, and so on).
3. In Copilot Agent mode, attach the brief with `#file:docs/tasks/<file>.md` and paste:

   > Follow `<file>` completely in one execution. Inspect the existing code first, implement everything, update the docs, run the validation steps, and give the final report. Do not stop after the first part. End the final report with the exact, unedited output of `git status --short` and `git diff --stat`, and say which branch you are on.

   For career content, also attach the career's spec: `#file:docs/tasks/specs/<career-id>.md`.
4. Review the diff yourself, run the app, then open a pull request into `main`.

## Status

| Brief | Workstream | Status |
|---|---|---|
| `00-careers-layer.md` | Careers screen above the tracks | Implemented; career picker and shared registry are in use. |
| `01-animation.md` | Motion and screen transitions | Ready (run after 02) |
| `02-sfx.md` | Tap, lesson-complete, and quiz-pass sounds | Implemented; source/license verification and human audio checks remain. |
| `03-career-content-template.md` + `specs/` | One career per run, content in `learning-hub/<career-id>/` | Career content folders exist for Accountancy, Civil Engineering, Cybersecurity, Doctor, Hospitality & Tourism, Lawyer, Marine, Nursing, and Teacher. Hospitality & Tourism is available; Accountancy, Civil Engineering, Doctor, and Marine remain `coming-soon`. Lawyer is available in the app, though expert review sign-off remains incomplete. Teacher and Nursing review notes record completed team review. |
| `04-guest-gating.md` | Lock Resume Builder, Job Finder, Application Tracker, and Interview Coach for guests | Implemented; guest/upgraded-account flow and server enforcement still need human verification. |
| `05-job-finder-api.md` | Philippine job listings through an Edge Function | Coverage test passed on 2026-10-22 (6 of 6); function and client code written; migration, secrets, and deployment pending (lead dev); not verified live. |
| `06-job-tracker-persistence.md` | Save the Application Tracker to Supabase (new migration) | Implemented in the client with a migration; human application and RLS/device validation remain. |
| `07-ai-coach.md` | AI evaluation of typed interview answers | Ready (needs an AI key and a privacy decision) |
| `08-voice-interview-coach.md` | Speech-to-text input for the Interview Coach (needs a development build) | Run after 07 (needs one new dependency approved) |
| `09-resume-persistence.md` | Save the Resume Builder to Supabase (new migration) | Implemented in the client with a migration; human application and RLS/device validation remain (run after 04). |
| `10-career-assessment.md` | Free local-first Holland Code career-interest assessment | Implemented with 36 original items, deterministic local scoring/matching, device drafts/results, worksheet sharing, and an owner-only migration; migration application, RLS, account-upgrade, and device verification remain. |
| `11-onboarding-walkthrough.md` | Short post-login tutorial modal | Implemented as a skippable, versioned, per-user local walkthrough with Profile replay; storage-error, guest, login, and device interaction checks need human verification. |

Briefs 06, 09, and 10 are implemented in the repository, but their migrations still need a human to apply and verify in Supabase. Do not infer that persistence is live from the presence of client code or migration files.

Not written yet: Learning Hub content beyond the current seeded career catalog. Resume export to a file is also not written yet.

## Recommended order and dependencies

1. **00 Careers layer** first. It is small, and 03 depends on it.
2. **04 Guest gating** early. Briefs 05, 06, and 07 reuse its hook, lock screen, and server helper.
3. **02 SFX, then 01 Animation.** SFX creates the shared `AppPressable` wrapper; Animation adds press feedback inside it. Merge 02 before starting 01.
4. **06, then 05, then 07, then 08.** 06 can run any time after 04 and works with the sample listings. 05 needs the coverage test. 07 needs a key. 08 needs 07 and a development build. **09** (Resume Builder saving) only needs 04 and can run any time after it. **10** uses the 00 career registry, 04 guest-account detection, and the 09 local/Supabase persistence pattern; the 07 Coach hand-off is optional and was skipped because brief 07 is not implemented. **11** uses the authenticated dashboard, guest-account model from 04, and available feature inventory from 10; it needs no database migration.
5. **03 Career content**: one career per branch, and each career's content goes in its own folder under `src/features/learning-hub/` (for example `learning-hub/cybersecurity/`), next to `software-engineering/`. `careers/` holds only the shared layer (career metadata, screens, and the registry). The shared registry and validator were introduced with Cybersecurity; future career runs should extend them instead of creating replacements. Merge `00` before career work, and merge a career before starting another to avoid registry conflicts.

## Files outside the briefs

- `specs/<career-id>.md`: the Career Spec for each career (binding input for brief 03).
- `scripts/validate-learning-content.mjs`: shared integrity validator for all registered careers; run it with `npm run validate:content` after content or registry changes.
- `scripts/validate-assessment.mjs`: no-device validation for assessment items, scoring, matching, career coverage, and route registration; run it with `npm run validate:assessment`.
- `scripts/validate-walkthrough.mjs`: no-device validation for walkthrough copy, versioning, preference decisions, session guard behavior, and stored-value shape; run it with `npm run validate:walkthrough`.
- `scripts/job-api-coverage-test.mjs`: dev-only script that checks whether the job API returns usable Philippine listings. Keep your key in your shell, never in a file.
- `progress/`: created by runs. Checkpoints for career builds and the coverage report. Commit them; they are the resume point if a run stops early.
- `src/features/learning-hub/careers/registry.js`: shared career track/course registry. Add future career modules here through their `index.js`; do not duplicate Software Engineering or Cybersecurity track/course wiring.
- Career content folders: `learning-hub/<career-id>/` (created by brief 03 runs). Each regulated career (Teacher, Lawyer, Nursing, Doctor, Marine) also gets a `REVIEW_NOTES.md` there for the expert reviewer.

## Merge-conflict hotspots

`src/navigation/AppNavigator.js`, `src/features/learning-hub/LearningHubScreen/LearningHubScreen.js`, `src/features/learning-hub/shared/styles.js`, the careers registry and roadmap files, `supabase/migrations/` (briefs 05, 06, 07, 09, and 10 each add one), `app.config.js` (brief 08), `CLAUDE.md`, and the READMEs. Avoid having two briefs edit the same hotspot at the same time, and merge the small briefs first.

## Human-only steps

- Before any real launch, turn email confirmation back on or configure custom SMTP.
- Adding and licensing audio files. Before any real launch, fill in verified attribution for `tap.mp3`, `error.mp3`, `success.mp3`, `lesson-complete.mp3`, and `quiz-pass.mp3` in `src/assets/sounds/CREDITS.md` (author/source unknown and license unverified until a human confirms them).
- Creating API keys and storing them as Supabase secrets; applying migrations; deploying Supabase Edge Functions (the lead dev).
- Applying `supabase/migrations/20261023003000_career_assessment_results.sql`, running its two-user RLS checks, and testing assessment completion, restart/resume, account upgrade consent, offline fallback, career links, and worksheet sharing on real devices.
- Testing the onboarding walkthrough after full-account, guest, and returning-user login; verify Skip/backdrop/Android back, the persistent opt-out, Profile replay, preference-read failure, and small-screen layout. No migration or account data setup is needed for its local preference.
- Running the job API coverage test.
- Lawyer is available in the app; expert review sign-off is still incomplete. Obtain and record its expert review. Doctor and Marine must not be shown as available before expert review. Teacher and Nursing are available; their review notes record completed team review.
- Approving the new voice dependency and building a development build for voice testing (brief 08).
- Testing on real devices.

## Supabase CLI notes (lead dev)

The team deploys functions with the Supabase CLI. These notes come from how the repository looks today; check the current Supabase CLI docs before relying on them.

- **Function layout.** One folder per function (`supabase/functions/<name>/index.ts`) and shared code in `supabase/functions/_shared/`. The existing `upgrade-guest-account` function is a single flat file, `supabase/functions/index.ts`. The briefs leave it untouched; moving it into its own folder is a separate task.
- **Project setup.** There is no `supabase/config.toml` in the repository yet. The lead dev runs `supabase init` and `supabase link` once, and commits the result if the team agrees.
- **Migration history.** The team reports that the existing SQL files were applied by hand in the SQL editor; this is not verified against the live Supabase project. The CLI has no record of those reported applications, and some file names have no timestamp prefix (for example `accounts_schema_updated.sql`). As far as I know, running `supabase db push` now could try to re-apply old files or skip the ones without a timestamp. Until the history is reconciled (for example with `supabase migration repair`), apply each new migration by pasting it into the SQL editor, one at a time, and run the RLS tests right away. The project is a single production project.
- **Secrets and deploy.** `supabase secrets set NAME=value` for the secrets named in each brief, and `supabase functions deploy <name>`. Never commit a secret.
- **Local testing.** `supabase functions serve` generally needs Docker. If nobody has it, the "serve locally" validation steps are reported as not run.

## Rules that apply to every brief

- Never put a secret in code, logs, docs, or an `EXPO_PUBLIC_` variable.
- Preserve stable course IDs, lesson IDs, and route names. Do not add dependencies the stack already covers.
- Do not run `npm run deploy`, and do not commit or push unless asked.
- Copilot writes migrations and function code; it must not apply or deploy them.
- Do not claim a check passed unless it was actually run. There is no test script.
- Describe only implemented behavior as implemented. Planned work stays labelled as planned.
