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
| Authentication | Welcome, registration, login, password recovery/reset, persisted Supabase sessions, guest accounts, and profile setup. Username/password guests use a reserved synthetic email. Guest upgrades are designed to keep the same user ID. `useAccountTier` exposes account status, and `AccountGate` gates Resume Builder, Job Finder, Application Tracker, and Interview Coach for guests. | Verify the Supabase Edge Function and remote auth settings when debugging account upgrades or email changes. |
| Dashboard | Profile completion indicator, quick links to core tools, a daily tip, and a career-preparation checklist. | Checklist state is derived from current app/context state; it is not a complete persisted career plan. |
| Job Finder | A local set of sample listings with categories, job details, and external career-site links. Guest access is gated; a full account is required. | Listings are static in the client; there is no live job-feed/API integration. |
| Application Tracker | Tracks jobs selected from Job Finder and supports Applied, Interview, Hired, and Rejected statuses. Guest access is gated; a full account is required. | State is held in React context, not stored in Supabase or durable local storage; it is lost when the app state resets. |
| Interview Coach | Common interview questions, typed responses, feedback, suggestions, and a session summary. Guest access is gated; a full account is required. | Text feedback uses local heuristic checks. Voice feedback is simulated; there is no speech transcription, speech analysis, or AI service integration. Practice history is in memory only. |
| Resume Builder | Personal information, education, skills, experience, certificates, projects, validation, a completeness score/suggestions, and a preview flow. Guest access to the builder, sections, and preview is gated; a full account is required. | Resume state is in React context, not persisted to Supabase or durable local storage. The score is rule-based, not an AI evaluation. |
| Learning Hub | Software Engineer, Data Analyst, and UI/UX Designer tracks. Available lessons and quizzes are organized by course; lesson completion and quiz attempts are saved through Supabase. | Some roadmap steps have no course yet (notably most UI/UX steps); those are intentionally displayed as coming soon/detail-only items. |
| Profile and avatar | Profile data is read and updated in the Supabase `profiles` table; avatar upload uses Supabase Storage and can stage a pending upload locally. | The actual remote schema, bucket configuration, and RLS policies must be verified in the Supabase project; do not infer them from the client alone. |

The interview screen's “AI” name reflects the approved product concept, not its current implementation: do not claim that it calls an LLM or provides model-generated feedback. Similarly, do not claim that a job was submitted to an employer; the app opens external links and tracks the user's intent to apply.

## Learning tracks and progress

The current roadmap defines three tracks:

- **Software Engineer** (estimated five months): HTML, CSS, JavaScript, React, Node.js, Database, and Git/GitHub.
- **Data Analyst** (estimated four months): Excel, SQL, Python/Pandas, Data Visualization, Statistics, and Dashboards (Power BI/Tableau).
- **UI/UX Designer** (estimated three months): Design Fundamentals has course content; User Research, Wireframing, Figma/Prototyping, Usability Testing, and Design Systems are roadmap steps without course data yet.

Track durations are displayed estimates, not guarantees. Course IDs and lesson IDs are persistence keys: keep them stable and ensure quiz lesson references match real lesson IDs. A course is considered completed when all its lessons are marked complete and a quiz attempt is passed; an attempted quiz or completed lesson makes it in progress.

## Supabase data and persistence

The client is initialized in `src/config/supabase.js` with `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`. Supabase Auth sessions persist through AsyncStorage. These public client variables must never contain a service-role key or other privileged secret.

| Resource | Observed use |
|---|---|
| `auth.users` | Supabase identity and authentication; guest metadata and synthetic guest emails are used by the guest flow. |
| `profiles` | Per-user profile data, including fields used by the UI such as `first_name`, `last_name`, `username`, `email`, `contact_number`, `birthday`, and `avatar_url`. |
| `lesson_progress` | Per-user completed lesson rows, keyed in client upserts by `user_id`, `course_id`, and `lesson_id`. |
| `quiz_attempts` | Per-user course quiz attempts with score, total, percent, and passed state. |
| `avatars` Storage bucket | Profile image upload and public URL generation; object access must remain appropriately restricted. |

The checked-in migrations currently provide two RPC helpers (`is_guest_username_taken` and `does_auth_email_exist`), blank the profile email for synthetic-email guests on initial profile creation, and remove overly broad avatar-object read policies. They do **not** define the full base table schema or all RLS policies. Confirm the live Supabase schema, triggers, storage bucket, and policies before making database assumptions or migrations.

The client also calls the `upgrade-guest-account` Edge Function to replace a guest's synthetic email and clear guest status without changing the user's ID. Its server-side implementation expects `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` as server secrets; never move the service-role key into the app or an `EXPO_PUBLIC_` variable.

Do not assume there are database tables for job applications, resumes, or interview results: the current app contexts hold those feature states in memory. A future persistence change should be planned as a coordinated database schema/RLS, client-query, migration, and UX change.

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
- Learning Hub shared lesson/progress code is under `src/features/learning-hub/shared/`; course data and wrappers are under `src/features/learning-hub/software-engineering/`.
- Keep navigation route names consistent with `navigation.navigate(...)`, and preserve stable course/lesson IDs.

## Technology and working commands

The checked-in package manifest is authoritative. The current stack is Expo SDK 57, React Native 0.86, React 19, React Navigation 7, Supabase JS 2, and npm. The app is portrait-oriented; web intentionally renders a phone-sized frame and uses single-page output with the `/CareerLaunch-/` GitHub Pages base path.

- `npm start` — start Expo.
- `npm run android`, `npm run ios`, `npm run web` — start the corresponding Expo target.
- `npm run lint` — run ESLint.
- `npx expo export -p web` — build the web bundle.
- `npm run deploy` publishes to GitHub Pages; never run it unless deployment is explicitly requested.

There is no test script in `package.json` at present. Do not claim automated tests passed unless a real test command is added and run.

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
