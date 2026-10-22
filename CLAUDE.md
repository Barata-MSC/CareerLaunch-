@AGENTS.md

# CareerLaunch Project Context

## Product purpose and audience

CareerLaunch! is a mobile-first career guidance and employment-preparation app created as a Mobile Computing final-project prototype. Its intended users include senior high school and college students, OJT students, fresh graduates, unemployed people, and others exploring career options.

The approved project brief's main objective is to help users explore suitable career paths, develop the skills needed for a chosen path, and prepare for employment through learning resources, job opportunities, resume preparation, and interview practice. The product is intended to bring career exploration, learning, and employment preparation together in one app.

Use the approved brief for product intent and the repository for implementation truth. Do not describe planned or prototype behavior as a production-ready, live, AI-powered, or persistent service unless the code and backend configuration support that claim.

## Objectives and planned product direction

- Help users explore career paths aligned with their interests and goals.
- Present learning resources for skills and knowledge associated with those careers.
- Track course, lesson, quiz, and career-preparation progress.
- Help users prepare for employment with job discovery, resume-building, and application tracking.
- Provide interview practice with useful feedback and improvement suggestions.
- Keep the career-guidance journey in one mobile application.

The approved prototype scope connects the Learning Hub, course lessons, quizzes, and Career Roadmap. It also describes job discovery and tracking, a resume builder and score/suggestions, and an interview-practice flow. Treat these as product goals, not evidence that each capability is complete. Current gaps and implementation limits are listed below.

## Current features and implementation status

| Area | What is currently implemented | Important limits |
|---|---|---|
| Authentication | Welcome, registration, login, password recovery/reset, persisted Supabase sessions, guest accounts, and profile setup. Username/password guests use a reserved synthetic email. Client and Edge Function guest checks treat accounts as guests when anonymous, when `user_metadata.is_guest === true`, or when the email ends in `@guest.careerlaunch.invalid` (case-insensitive). Do not trust user metadata alone because the signed-in user can edit it. The domain constant in `src/features/auth/guestAccount.js` must stay in sync with `supabase/functions/_shared/requireFullAccount.ts`. Guest upgrades replace the synthetic email and clear the flag while keeping the user ID. `useAccountTier` exposes account status, and `AccountGate` gates Resume Builder, Job Finder, Application Tracker, and Interview Coach for guests. | Verify the Supabase Edge Function and remote auth settings when debugging account upgrades or email changes. |
| Dashboard | Profile completion indicator, quick links to core tools, a daily tip, a career-preparation checklist, and a short post-login walkthrough. The walkthrough preference is stored locally per user ID, and Profile offers replay. | Checklist state is derived from current app/context state; it is not a complete persisted career plan. Walkthrough preferences are device-local and are not synced across devices. |
| Job Finder | A local set of sample listings with categories, job details, and external career-site links. Guest access is gated; a full account is required. | Listings are static in the client; there is no live job-feed/API integration. |
| Application Tracker | Persists user-selected job snapshots and supports Applied, Interview, Hired, and Rejected statuses, notes, and removal. Guest access is gated; a full account is required. Data loads and writes through Supabase once the human-applied migration is installed. | Job Finder entries remain bundled sample listings; adding one tracks intent and does not submit an application to an employer. Two-user RLS and offline rollback still require manual validation after applying the migration. |
| Interview Coach | Common interview questions, typed responses, feedback, suggestions, and a session summary. Guest access is gated; a full account is required. | Text feedback uses local heuristic checks. Voice feedback is simulated; there is no speech transcription, speech analysis, or AI service integration. Practice history is in memory only. |
| Resume Builder | Personal information, education, skills, experience, certificates, projects, validation, a completeness score/suggestions, and a preview flow. Guest access to the builder, sections, and preview is gated; a full account is required. Resume data is loaded and saved as one row per account in Supabase once the human-applied migration is installed. | The completeness score and suggestions are rule-based and derived, not stored or AI-generated. Profile photos remain in memory only and are not persisted. Saves are last-write-wins across devices. |
| Career Assessment | Free 36-item RIASEC interest assessment with local deterministic scoring, career matching from `careers.js`, resumable on-device drafts, results, and a text-shareable career worksheet. Guest and signed-out assessment use is available. | This is an interest and self-awareness guide, not a clinical or diagnostic psychological test. Full accounts can save results remotely once the human-applied migration is installed; an existing local guest result is uploaded only after the user chooses to save it. |
| Onboarding walkthrough | A short, skippable post-login tutorial with a versioned local preference per user ID and a Replay tutorial action in Profile. | Preference is device-local and not synchronized; storage-read failure suppresses automatic display. |
| Learning Hub | Career-first browsing: Software Engineering, Cybersecurity, Teacher, Nursing, Lawyer, and Hospitality & Tourism have available tracks and courses, leading to the existing lessons and quizzes. Doctor has one registered, eight-course track, Marine has one registered, seven-course Deck Officer track, and Accountancy has two registered tracks with 12 courses; these are reachable as educational previews while their careers remain `coming-soon` pending the applicable expert review. Hospitality & Tourism has two tracks and 12 introductory courses. Cybersecurity has two tracks and 14 courses; Teacher has two tracks and 15 courses; Nursing has one team-reviewed track and eight courses; Lawyer has two tracks and 14 courses. Other careers are listed as coming soon and lead to detail-only views. Career progress is derived from course statuses, not stored separately. | Some Software Engineering roadmap steps have no course yet (notably most UI/UX steps); those remain detail-only items. Accountancy is introductory orientation, not accounting, tax, or financial advice and not board exam review; expert review is pending. Doctor preview content is educational orientation, not medical advice or clinical training. Marine preview content is educational orientation, not professional or safety training; its four-month estimate is an app study-time label only, not a training or sea-time requirement. Hospitality & Tourism is available; its content is educational orientation, not operating or certification training, and its track estimates are app study-time labels. Lawyer content is introductory and educational, not legal advice; Nursing content is educational orientation, not clinical training or medical advice. |
| Profile and avatar | Profile data is read and updated in the Supabase `profiles` table; avatar upload uses Supabase Storage and can stage a pending upload locally. | The actual remote schema, bucket configuration, and RLS policies must be verified in the Supabase project; do not infer them from the client alone. |

The interview screen's “AI” name reflects the approved product concept, not its current implementation: do not claim that it calls an LLM or provides model-generated feedback. Similarly, do not claim that a job was submitted to an employer; the app opens external links and tracks the user's intent to apply.

## Learning tracks and progress

The current roadmap defines three tracks under the Software Engineering career:

- **Software Engineer** (estimated five months): HTML, CSS, JavaScript, React, Node.js, Database, and Git/GitHub.
- **Data Analyst** (estimated four months): Excel, SQL, Python/Pandas, Data Visualization, Statistics, and Dashboards (Power BI/Tableau).
- **UI/UX Designer** (estimated three months): Design Fundamentals has course content; User Research, Wireframing, Figma/Prototyping, Usability Testing, and Design Systems are roadmap steps without course data yet.

The available Teacher career has an **Elementary Teacher** track (estimated five months) with eight courses and a **Secondary Teacher** track (estimated four months) with seven courses. Each course has 10 lessons and a 10-question bank. Lawyer is also available with **Lawyer Path** (eight courses, estimated five months) and **Paralegal and Legal Support** (six courses, estimated four months); its 14 courses are introductory career orientation, not legal advice or guidance for a real legal matter.

Doctor has a registered **Pre-Medicine and Medical Path** track (estimated five months) with eight courses, ten lessons, and a ten-question quiz bank per course. A draft preview is reachable from the Doctor career detail page; its career status remains `coming-soon` until a human expert reviews the completed content and a human updates the status. Its science lessons describe normal structure and function only; the pathway is educational orientation, not medical advice or clinical training.

Accountancy has two registered tracks, **Accounting Foundations** (six courses, estimated four months) and **Accounting in Practice** (six courses, estimated four months), with ten lessons and a ten-question quiz bank per course. The tracks and course routes are reachable as an educational preview from the Accountancy career detail page; its status remains `coming-soon` pending review by an accountancy student, CPA, or accountancy instructor. The content is introductory orientation, not accounting, tax, or financial advice and not board exam review. No subject-expert review is claimed.

Marine has one registered **Deck Officer (Marine Transportation)** track with seven courses. Its four-month estimate is an app study-time label only, not a training or sea-time requirement; its educational preview remains `coming-soon` pending maritime expert review.

Hospitality & Tourism has **Hospitality Operations** and **Tourism and Travel**, with six courses each. Its four-month estimates are app study-time labels, and its introductory content is educational orientation, not operating or certification training.

Tracks now sit under a career picker and resolve through the shared Learning Hub registry. Software Engineering, Cybersecurity, Teacher, Nursing, Lawyer, and Hospitality & Tourism have available tracks; Doctor, Marine, and Accountancy have registered content accessible as draft previews while they remain `coming-soon` pending expert review; other seeded careers remain coming soon without registered courses. Track durations are displayed estimates, not guarantees. Course IDs and lesson IDs are persistence keys: keep them stable and ensure quiz lesson references match real lesson IDs. A course is considered completed when all its lessons are marked complete and a quiz attempt is passed; an attempted quiz or completed lesson makes it in progress.

Nursing's eight introductory courses are educational orientation, not clinical training or medical advice. Lawyer's 14 courses are introductory career orientation, not legal advice or guidance for a real legal matter.

Doctor's eight courses are introductory career and science orientation, not medical advice or clinical training. The final course alone contains the spec's name-level reference to the PRC-administered licensure examination and the possibility that medical schools may require an admission test; it provides no requirements or exam details.

Cybersecurity is also available with two tracks: **Security Analyst** (eight courses, estimated five months) and **Security Governance and Compliance** (six courses, estimated four months). Its lessons and quizzes use defensive, authorized, conceptual examples; they are introductory content, not operational attack guidance. Other seeded careers remain coming soon.

## Supabase data and persistence

The client is initialized in `src/config/supabase.js` with `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`. Supabase Auth sessions persist through AsyncStorage. These public client variables must never contain a service-role key or other privileged secret.

| Resource | Observed use |
|---|---|
| `auth.users` | Supabase identity and authentication; the guest flow uses `app_metadata.is_guest` as its server-controlled marker, with anonymous status, editable user metadata, and synthetic email as additional guest signals. |
| `profiles` | Per-user profile data, including fields used by the UI such as `first_name`, `last_name`, `username`, `email`, `contact_number`, `birthday`, and `avatar_url`. |
| `lesson_progress` | Per-user completed lesson rows, keyed in client upserts by `user_id`, `course_id`, and `lesson_id`. |
| `quiz_attempts` | Per-user course quiz attempts with score, total, percent, and passed state. |
| `job_applications` | Per-user selected job snapshots with status and notes, protected by owner-only RLS. Defined in `supabase/migrations/20261021232700_job_applications.sql`; length and HTTP(S) URL hardening is proposed in `supabase/migrations/20261022151508_job_applications_hardening.sql`. A human must apply the migrations and validate existing rows/constraints before treating persistence and hardening as live. |
| `resumes` | One row per user containing the plain resume sections in `data` JSONB and a `schema_version`; owner-only RLS policies cover select, insert, update, and delete. The implementation is in `supabase/migrations/20261021230700_resumes.sql`, which a human must apply before resume persistence works. |
| `avatars` Storage bucket | Profile image upload and public URL generation; object access must remain appropriately restricted. |

The checked-in migrations currently provide two RPC helpers (`is_guest_username_taken` and `does_auth_email_exist`), blank the profile email for synthetic-email guests on initial profile creation, remove overly broad avatar-object read policies, and define the proposed per-user resume and job-application tables and policies. Both persistence migrations must be applied by a human in the Supabase SQL editor before their clients can load or save data. The migrations do **not** define the full base table schema or all RLS policies for other resources. Confirm the live Supabase schema, triggers, storage bucket, and policies before making database assumptions or migrations.

The client also calls the `upgrade-guest-account` Edge Function to replace a guest's synthetic email and clear guest status without changing the user's ID. A user is a guest if any of these are true: `app_metadata.is_guest === true`, `is_anonymous === true`, `user_metadata.is_guest === true`, or the email ends with `@guest.careerlaunch.invalid` (case-insensitive). Email confirmation is currently off for this prototype, and users can edit their own email and `user_metadata`; those are defense-in-depth signals, not trusted markers. `app_metadata.is_guest` is set server-side and cannot be edited through the signed-in client. Keep the synthetic domain constants in `src/features/auth/guestAccount.js` and `supabase/functions/_shared/requireFullAccount.ts` synchronized. The upgrade function clears both metadata flags and replaces the synthetic email with the user's submitted email. It must be redeployed by the lead developer for its app-metadata change to take effect. Its server-side implementation expects `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` as server secrets; never move the service-role key into the app or an `EXPO_PUBLIC_` variable.

The new `supabase/migrations/20261022151508_job_applications_hardening.sql` adds non-validating length and HTTP(S) URL constraints to `job_applications` and updates its timestamp trigger. A human must review existing rows, apply the migration, and validate the constraints; it has not been applied or deployed by this repository change.

The `supabase/migrations/20261022154000_guest_marker_app_metadata.sql` migration sets the guest marker in `auth.users.raw_app_meta_data`, backfills existing synthetic-email guests, and adds restrictive full-account policies to `public.resumes` and `public.job_applications` without changing owner policies or Learning Hub access. Its trigger calls `public.mark_guest_app_metadata()`, which is not `SECURITY DEFINER`. The team reports that the lead developer applied this migration in the Supabase SQL editor; this is not verified against the live Supabase project. The corresponding upgrade-function change still requires a human redeployment and has not been deployed.

Do not assume there are database tables for interview results: the current app context holds that feature state in memory. Application Tracker persistence is implemented against `public.job_applications`, pending human application of its migration. Resume persistence is implemented against `public.resumes`, also pending human application of its migration. Any future persistence change should be planned as a coordinated database schema/RLS, client-query, migration, and UX change.

## Recent repository additions

Recent commits visible in the repository history (October 16–17, 2026) include:

- A dashboard visual refresh and additional guest-mode notices.
- Interactive extras for Design Fundamentals lessons, including embedded video references, quick-check activities, and learning references.
- A subsequent refresh of lesson video links.

These are recent code changes, not a claim that the overall product or every roadmap course is complete.

## Architecture and entry points

- `App.js` owns splash/session bootstrap and root providers: profile, applications, interview practice, and resume.
- `src/navigation/RootNavigator.js` separates authenticated app navigation from auth and password-recovery navigation.
- `src/navigation/AppNavigator.js` registers app screens and course routes.
- `src/features/` contains feature screens and logic; shared UI, context, configuration, navigation, and assets live in their corresponding `src/` directories.
- Learning Hub shared lesson/progress code is under `src/features/learning-hub/shared/`; career data, screens, and the combined track/course registry live under `src/features/learning-hub/careers/`. Career content lives in sibling folders such as `software-engineering/`, `cybersecurity/`, `teacher/`, `nursing/`, `lawyer/`, `doctor/`, and `marine/`.
- Career assessment data and pure RIASEC scoring/matching live under `src/features/career-assessment/`; the assessment fit table must cover the actual IDs in `learning-hub/careers/careers.js`.
- Keep navigation route names consistent with `navigation.navigate(...)`, and preserve stable course/lesson IDs.

## Technology and working commands

The checked-in package manifest is authoritative. The current stack is Expo SDK 57, React Native 0.86, React 19, React Navigation 7, Supabase JS 2, and npm. The app is portrait-oriented; web intentionally renders a phone-sized frame and uses single-page output with the `/CareerLaunch-/` GitHub Pages base path.

- `npm start` — start Expo.
- `npm run android`, `npm run ios`, `npm run web` — start the corresponding Expo target.
- `npm run lint` — run ESLint.
- `npm run validate:assessment` — validate assessment item counts, scoring, matching, career coverage, and route registration without a device.
- `npm run validate:walkthrough` — validate walkthrough steps, preference decisions, and stored-value shape without a device.
- `npx expo export -p web` — build the web bundle.
- `npm run deploy` publishes to GitHub Pages; never run it unless deployment is explicitly requested.

There is no general test script in `package.json`; `validate:content`, `validate:assessment`, and `validate:walkthrough` are focused integrity validators. Do not claim checks passed unless they were run.

# CareerLaunch Development Instructions

## Project overview

CareerLaunch is a JavaScript application built with React Native and Expo. It provides career-development features including authentication, a dashboard, job discovery and tracking, interview preparation, a learning hub, profile management, and resume building. The project is in development; verify the implementation before describing a feature as complete.

The installed stack and commands in the root `package.json` are authoritative. The project currently uses Expo SDK 57, React Native, React Navigation, Supabase, and npm.

Use `README.md` for project overview, setup, and team onboarding. This file adds repository-specific guidance for coding tasks; if the README and actual source/configuration disagree, verify the repository and update the relevant documentation rather than assuming either is current.

## Repository conventions

- Keep feature screens and feature-specific logic in the relevant `src/features/` module.
- Put genuinely reusable UI in `src/components/` or an appropriately scoped shared feature directory.
- Keep cross-feature state in `src/context/`, service configuration in `src/config/`, navigation in `src/navigation/`, and static assets in `src/assets/`.
- Preserve existing module patterns, naming, formatting, and navigation conventions. Avoid unrelated refactors.
- Babel aliases currently include `@components`, `@features`, `@assets`, and `@config`. Check `babel.config.js` before introducing or changing imports that use aliases.
- Register new navigable screens in the appropriate navigator and ensure route names exactly match the names passed to `navigation.navigate`.
- Reuse existing shared components and hooks before adding new ones.
- `App.js` owns the root providers and session bootstrap. Preserve the current provider composition and the separation between authenticated app navigation, auth navigation, and password-recovery navigation when changing startup or auth behavior.
- The app supports web, but the current web presentation intentionally uses a phone-sized frame. Check both the target platform and `app.config.js` before changing responsive behavior or platform configuration.

### Sound

- `src/utils/sounds.js` owns the sound registry and playback; `src/components/AppPressable.js` provides default tap feedback for interactive controls. Use `sound="none"` when a control plays a more specific cue.
- The global preference is stored in AsyncStorage under `careerlaunch:sound-enabled` and is controlled from Profile settings.
- Sound assets live in `src/assets/sounds/`; source and license notes belong in `src/assets/sounds/CREDITS.md`.

### Motion

- Reusable motion tokens and primitives live in `src/components/motion/`: `motionTokens.js`, `useReduceMotion`, `FadeSlideIn`, `Float`, `Pop`, and `AnimatedStage`.
- Stage-level transitions in the Learning Hub use `AnimatedStage` for in-screen state changes; do not rely on `LayoutAnimation` or global layout animations.
- Keep motion wrappers layout-neutral: use `flex: 1` (and `minHeight: 0` where they fill space), keep scroll containers height-bounded, and keep pinned headers and footers outside animated regions. Never hide or remove UI to make an animation work.
- Respect the system reduce-motion setting: disable floating and sliding, and use only a short fade or no animation.
- Use `Float` sparingly on a few hero elements; never float items in scrolling lists. Motion currently covers the Dashboard and the Learning Hub only.

## Expo, web, and project commands

- Before changing Expo APIs, configuration, or native modules, read the exact Expo SDK 57 documentation linked by `AGENTS.md`. Do not apply instructions from a different SDK version without checking compatibility.
- Use the scripts in `package.json` as the source of truth. There is currently no test script; do not report tests as passing unless a real test command is added and run.
- `npx expo export -p web` creates the web production bundle in `dist/`. The web configuration uses a single-page output and a `/CareerLaunch-/` base URL for GitHub Pages; preserve these settings unless the deployment target is intentionally changing.
- `npm run deploy` publishes the generated `dist/` to GitHub Pages. Do not run it unless the user explicitly asks to deploy.

## Learning hub conventions

- Shared course flow and UI live in `src/features/learning-hub/shared/`; individual course screens, configuration, lessons, and quiz questions live under `src/features/learning-hub/software-engineering/`.
- Follow nearby course patterns when adding or editing a course: keep its course configuration, lesson data, question data, and screen wrapper together. Connect it to the roadmap, course exports, and navigator as needed.
- Keep course IDs stable because progress is stored against course IDs. Ensure lesson IDs referenced by quiz questions match actual lesson IDs.
- For roadmap changes, check step IDs for uniqueness, verify each course route is registered, and confirm that steps without course data intentionally use the detail-only behavior.
- Preserve existing progress persistence and refresh behavior when changing course screens or roadmap state.

## Supabase and environment safety

- Read the existing Supabase setup before changing authentication or data access; the client is configured in `src/config/supabase.js`.
- Use the existing `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` names. Values with the `EXPO_PUBLIC_` prefix are included in client code and must never contain service-role keys, passwords, or other privileged secrets.
- Never expose credentials in source, logs, screenshots, commits, or documentation. Do not read or print local `.env` values unless the task explicitly requires diagnosing environment setup.
- Preserve backend authorization and Supabase Row Level Security. UI visibility is not a substitute for server-side permission checks.
- For Edge Function handlers that require a full account, use the shared `requireFullAccount` helper in `supabase/functions/_shared/requireFullAccount.ts`; it validates the caller with the anon key and rejects guest accounts without using a service-role key.
- Handle Supabase errors explicitly and preserve useful error reporting; do not silently turn failures into success or empty data.
- Supabase migrations are in `supabase/migrations/`, and the Edge Function entry point is in `supabase/functions/index.ts`. When changing database behavior, inspect relevant migrations and policies and keep client queries, migrations, and server-side logic consistent. Do not apply remote migrations or deploy functions without explicit authorization.
- Career assessment results use `public.career_assessment_results` with owner-only select, insert, and delete RLS policies in `supabase/migrations/20261023003000_career_assessment_results.sql`. A human must apply the migration and run its two-user RLS checks; the presence of this file does not confirm live setup.

## Implementation and validation

- First inspect the affected files and nearby examples. Make the smallest complete change that addresses the reported behavior.
- Check existing scripts in `package.json` before installing packages or choosing validation commands. Do not add dependencies for functionality already supported by the current stack.
- Run focused validation for the changed area, then broader checks only when useful. Available commands include:
  - `npm run lint`
  - `npm run web` to start the web development server
  - `npx expo export -p web` to verify a production web bundle
- Do not claim a check passed unless it was run. If a check cannot be run, report that clearly.
- For UI changes, validate the affected flow on the target platform when possible, including navigation, empty/loading/error states, and small-screen layout. Web export alone does not verify native behavior.
- Update relevant documentation when setup, scripts, or user-facing behavior changes.

## Collaboration and change hygiene

- Preserve unrelated work already present in the working tree. Do not overwrite or revert changes outside the task.
- Keep diffs focused and review them before finishing. Avoid generated outputs such as `dist/`, caches, or local environment files in source changes.
- Never commit `.env`, credentials, user data, or generated build artifacts.
- The team workflow targets pull requests into `main`; follow `GIT_WORKFLOW.md` when asked to create or prepare a branch or pull request.
