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
| `00-careers-layer.md` | Careers screen above the tracks | Ready |
| `01-animation.md` | Dashboard-only motion | Implemented within narrowed scope; Learning Hub and global navigation remain static. See [`progress/01-animation.md`](progress/01-animation.md) for checks and exclusions. |
| `02-sfx.md` | Tap, lesson-complete, and quiz-pass sounds | Ready (needs audio files first) |
| `03-career-content-template.md` + `specs/` | One career per run, content in `learning-hub/<career-id>/` | Cybersecurity is built, validated, and available. Teacher, Lawyer, Nursing, Doctor, and Marine specs remain; run regulated careers in plan mode first. |
| `04-guest-gating.md` | Lock Resume Builder, Job Finder, Application Tracker, and Interview Coach for guests | Ready |
| `05-job-finder-api.md` | Philippine job listings through an Edge Function | Blocked until the coverage test passes |
| `06-job-tracker-persistence.md` | Save the Application Tracker to Supabase (new migration) | Ready |
| `07-ai-coach.md` | AI evaluation of typed interview answers | Ready (needs an AI key and a privacy decision) |
| `08-voice-interview-coach.md` | Speech-to-text input for the Interview Coach (needs a development build) | Run after 07 (needs one new dependency approved) |
| `09-resume-persistence.md` | Save the Resume Builder to Supabase (new migration) | Ready (run after 04) |

Not written yet: briefs for Accountancy, Civil Engineering, and Hospitality & Tourism content (their specs do not exist yet), and exporting the resume to a file.

## Recommended order and dependencies

1. **00 Careers layer** first. It is small, and 03 depends on it.
2. **04 Guest gating** early. Briefs 05, 06, and 07 reuse its hook, lock screen, and server helper.
3. **02 SFX, then 01 Animation.** SFX creates the shared `AppPressable` wrapper; Animation adds press feedback inside it. Merge 02 before starting 01.
4. **06, then 05, then 07, then 08.** 06 can run any time after 04 and works with the sample listings. 05 needs the coverage test. 07 needs a key. 08 needs 07 and a development build. **09** (Resume Builder saving) only needs 04 and can run any time after it.
5. **03 Career content**: one career per branch, and each career's content goes in its own folder under `src/features/learning-hub/` (for example `learning-hub/cybersecurity/`), next to `software-engineering/`. `careers/` holds only the shared layer (career metadata, screens, and the registry). The shared registry and validator were introduced with Cybersecurity; future career runs should extend them instead of creating replacements. Merge `00` before career work, and merge a career before starting another to avoid registry conflicts.

## Files outside the briefs

- `specs/<career-id>.md`: the Career Spec for each career (binding input for brief 03).
- `scripts/validate-learning-content.mjs`: shared integrity validator for all registered careers; run it with `npm run validate:content` after content or registry changes.
- `scripts/job-api-coverage-test.mjs`: dev-only script that checks whether the job API returns usable Philippine listings. Keep your key in your shell, never in a file.
- `progress/`: implementation reports and resumable checkpoints, including the Brief 01 motion report and career-build progress. Career checkpoints are the resume point if a run stops early.
- `src/features/learning-hub/careers/registry.js`: shared career track/course registry. Add future career modules here through their `index.js`; do not duplicate Software Engineering or Cybersecurity track/course wiring.
- Career content folders: `learning-hub/<career-id>/` (created by brief 03 runs). Each regulated career (Teacher, Lawyer, Nursing, Doctor, Marine) also gets a `REVIEW_NOTES.md` there for the expert reviewer.

## Merge-conflict hotspots

`src/navigation/AppNavigator.js`, `src/features/learning-hub/shared/styles.js`, the careers registry and roadmap files, `supabase/migrations/` (briefs 05, 06, 07, and 09 each add one), `app.config.js` (brief 08), `CLAUDE.md`, and the READMEs. Avoid having two briefs edit the same hotspot at the same time, and merge the small briefs first.

## Human-only steps

- Adding and licensing audio files.
- Creating API keys and storing them as Supabase secrets; applying migrations; deploying Supabase Edge Functions (the lead dev).
- Running the job API coverage test.
- Expert review of Teacher, Lawyer, Nursing, Doctor, Marine, and similar content before it is shown as available.
- Approving the new voice dependency and building a development build for voice testing (brief 08).
- Testing on real devices.

## Supabase CLI notes (lead dev)

The team deploys functions with the Supabase CLI. These notes come from how the repository looks today; check the current Supabase CLI docs before relying on them.

- **Function layout.** One folder per function (`supabase/functions/<name>/index.ts`) and shared code in `supabase/functions/_shared/`. The existing `upgrade-guest-account` function is a single flat file, `supabase/functions/index.ts`. The briefs leave it untouched; moving it into its own folder is a separate task.
- **Project setup.** There is no `supabase/config.toml` in the repository yet. The lead dev runs `supabase init` and `supabase link` once, and commits the result if the team agrees.
- **Migration history.** The existing SQL files were applied by hand in the SQL editor, so the CLI has no record of them, and some file names have no timestamp prefix (for example `accounts_schema_updated.sql`). As far as I know, running `supabase db push` now could try to re-apply old files or skip the ones without a timestamp. Until the history is reconciled (for example with `supabase migration repair`), apply each new migration by pasting it into the SQL editor, one at a time, and run the RLS tests right away. The project is a single production project.
- **Secrets and deploy.** `supabase secrets set NAME=value` for the secrets named in each brief, and `supabase functions deploy <name>`. Never commit a secret.
- **Local testing.** `supabase functions serve` generally needs Docker. If nobody has it, the "serve locally" validation steps are reported as not run.

## Rules that apply to every brief

- Never put a secret in code, logs, docs, or an `EXPO_PUBLIC_` variable.
- Preserve stable course IDs, lesson IDs, and route names. Do not add dependencies the stack already covers.
- Do not run `npm run deploy`, and do not commit or push unless asked.
- Copilot writes migrations and function code; it must not apply or deploy them.
- Do not claim a check passed unless it was actually run. There is no test script.
- Describe only implemented behavior as implemented. Planned work stays labelled as planned.
