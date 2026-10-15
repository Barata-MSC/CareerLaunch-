@AGENTS.md

# CareerLaunch Development Instructions

## Project overview

CareerLaunch is a JavaScript application built with React Native and Expo. It provides career-development features including authentication, a dashboard, job discovery and tracking, interview preparation, a learning hub, profile management, and resume building. The project is in development; verify the implementation before describing a feature as complete.

The installed stack and commands in the root `package.json` are authoritative. The project currently uses Expo SDK 57, React Native, React Navigation, Supabase, and npm.

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
