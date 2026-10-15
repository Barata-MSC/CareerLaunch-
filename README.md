# CareerLaunch!

CareerLaunch! is a JavaScript mobile application for the **Mobile Computing final project**. It is built with **React Native and Expo** and organized into feature modules, reusable components, shared context, configuration, navigation, and assets.

The project brings several career-development tools together in one application: job discovery, interview preparation, resume building, career learning, job application tracking, and profile management. Expo Web support is also configured in the project setup, where supported by the installed dependencies.

> **Project status:** In development. This README describes the current repository organization and development setup. A folder or screen existing in the source tree does not necessarily mean its feature is complete; update this document as functionality is implemented and tested.

## Contents

- [Project Goals](#project-goals)
- [Feature Modules](#feature-modules)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Environment Configuration](#environment-configuration)
- [Run the Application](#run-the-application)
- [Code Quality and Troubleshooting](#code-quality-and-troubleshooting)
- [GitHub Team Workflow](#github-team-workflow)
- [Security Notes](#security-notes)
- [Project Status and Documentation](#project-status-and-documentation)

## Project Goals

- Organize the application by feature so each major part can be developed and maintained separately.
- Reuse shared UI components, configuration, navigation, and application state where appropriate.
- Use Supabase for authentication/session handling and backend services as configured by the project.
- Support development and testing through Expo on supported targets, including Android and web.
- Collaborate through Git and GitHub using feature branches and pull requests.

## Feature Modules

The current `src/features/` tree contains the following feature areas. Their exact functionality and completion status should be verified in the code before being described as finished.

| Feature module | Purpose |
|---|---|
| `auth/` | Authentication-related screens and flows. |
| `dashboard/` | Main dashboard experience. |
| `interview-coach/` | AI interview preparation experience. |
| `job-finder/` | Job discovery and listing experience. |
| `job-tracker/` | Job application tracking. |
| `learning-hub/` | Learning screens, course navigation, lessons, quizzes, and progress-related code. The visible source structure includes shared learning components and a `software-engineering/` area. |
| `profile/` | User profile experience. |
| `resume-builder/` | Resume creation and related screens. |

These modules are organized under `src/features/`, rather than being collected in a single root-level `screens/` folder. Shared components, contexts, configuration, and navigation remain outside the feature folders where appropriate.

## Technology Stack

| Area | Technology | Purpose |
|---|---|---|
| Language | JavaScript | Application and UI logic. |
| UI framework | React Native | Build mobile interfaces using React components. |
| App platform and tooling | Expo | Run and develop the application. |
| Navigation | React Navigation | Navigation between application screens, including stack and bottom-tab navigation where configured. |
| Backend / authentication | Supabase | Authentication/session handling and configured backend services. |
| Shared state | React Context | Share profile, job-application, resume, or other app state where implemented. |
| Web support | Expo Web / React Native Web | Run a web version when supported by the project's dependencies and configuration. |
| Dependency management | npm | Install dependencies from `package.json` and `package-lock.json`. |
| Development environment | Visual Studio Code | Editing, debugging, and project workflow. |
| Version control | Git and GitHub | Collaboration, code history, branches, and pull requests. |

The root `package.json` and `package-lock.json` are the source of truth for installed packages and scripts. Older command notes may list packages that were installed during setup but are not necessarily still required. Check the current package files before installing or removing dependencies.

## Architecture

The project uses a feature-oriented structure with shared infrastructure:

1. **Feature modules (`src/features/`)** — group screens and feature-specific logic by domain, such as `job-finder` and `resume-builder`.
2. **Reusable components (`src/components/`)** — UI building blocks intended to be shared across features.
3. **Context (`src/context/`)** — shared React Context providers for application state.
4. **Configuration (`src/config/`)** — configuration such as the Supabase client.
5. **Navigation (`src/navigation/`)** — application navigation configuration.
6. **Assets (`src/assets/`)** — images and other static resources used by the application.
7. **Supabase resources (`supabase/`)** — project-related Supabase files, if maintained in this repository.

Keep feature-specific code close to its feature. Move logic to shared components or utilities only when it is genuinely reused or needs a clear shared responsibility. Avoid putting all screen logic into `App.js`.

## Project Structure

The following tree reflects the repository organization visible in the current project explorer. Some feature folders may contain additional files or nested folders not shown here.

```text
CareerLaunch-/
├── .claude/                       # Local/project AI assistant configuration, if used
├── .vscode/                       # VS Code workspace settings, if shared
├── src/
│   ├── assets/                    # Images and other UI assets
│   ├── components/                # Reusable UI components
│   ├── config/                    # App configuration, including service clients
│   ├── context/                   # React Context providers
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── interview-coach/
│   │   ├── job-finder/
│   │   ├── job-tracker/
│   │   ├── learning-hub/
│   │   │   ├── shared/             # Shared learning screens, components, and progress utilities
│   │   │   └── software-engineering/
│   │   ├── profile/
│   │   └── resume-builder/
│   ├── navigation/                # Navigation configuration
│   └── index.js                   # Source-level exports or entry helpers, as configured
├── supabase/                      # Supabase-related project files, if maintained here
├── .env                           # Local environment values; do not commit
├── .gitignore
├── App.js                         # Root application component
├── app.config.js
├── app.json
├── babel.config.js
├── eslint.config.js
├── index.js                       # Expo/React Native entry point
├── jsconfig.json                  # JavaScript editor settings and path aliases
├── package.json
├── package-lock.json
└── README.md
```

Generated or local-only folders such as `node_modules/`, `dist/`, and Expo cache folders should not be treated as source code. The repository's `.gitignore` should exclude generated outputs and local secrets.

### Where to add code

- Add new feature screens and feature-specific helpers under the relevant directory in `src/features/`.
- Add components reused by multiple features under `src/components/` or a clearly scoped shared feature directory.
- Add cross-feature React Context providers under `src/context/`.
- Keep Supabase client/configuration in `src/config/` and read local settings through the project's environment configuration.
- Update navigation in `src/navigation/` when a screen needs to be reachable.
- Add images and other app assets under `src/assets/`, keeping asset references consistent with the project's configured path aliases.

### Path aliases

The project has `jsconfig.json` and `babel.config.js` for editor path resolution and Babel module resolution. The current documentation identifies the `@features` / `@features/*` alias and earlier setup notes include aliases such as `@components` and `@assets`. Check the actual mappings in both configuration files before adding or changing an alias; editor resolution and runtime resolution should agree.

### Barrel Exporting

The project also uses **barrel exporting** to organize module exports and simplify imports. A barrel file is usually named `index.js` and re-exports components, screens, functions, or other modules from a directory.

Instead of importing directly from a deeply nested file, other parts of the application can import from the directory's barrel file.

#### Example folder structure

```text
src/features/job-finder/
├── JobFinderScreen.js
├── components/
│   └── JobCard.js
└── index.js
```

#### `src/features/job-finder/index.js`

```javascript
export { default as JobFinderScreen } from './JobFinderScreen';
export { default as JobCard } from './components/JobCard';
```

#### Importing through the barrel file

Instead of importing directly from individual files:

```javascript
import JobFinderScreen from '@features/job-finder/JobFinderScreen';
import JobCard from '@features/job-finder/components/JobCard';
```

The application can import the exported modules from the feature directory:

```javascript
import {
  JobFinderScreen,
  JobCard,
} from '@features/job-finder';
```

The `@features` path alias resolves the feature directory, while the directory's `index.js` provides the exports.

**Path aliases and barrel exporting serve different purposes:**

- **Path aliases** simplify file paths by mapping aliases such as `@features/*` to directories under `src/`.
- **Barrel exporting** provides a central entry point for importing multiple exports from a directory.

Use barrel files where they improve organization and readability. Keep exports intentional, and avoid unnecessary re-exports that could introduce circular dependencies or make module relationships harder to understand.


## Prerequisites

Install the following before running the project:

- **Node.js** — use a version compatible with the Expo SDK in `package.json`.
- **npm** — normally installed with Node.js.
- **Git** — for cloning and collaborating on the repository.
- **Visual Studio Code** or another JavaScript-compatible editor.
- A supported device/emulator for native testing, or a compatible browser for Expo Web.
- A Supabase project and the required client configuration if the feature being run depends on Supabase.

Recommended VS Code extensions from the team's setup notes include ESLint, Path Intellisense, React Native Tools, React/React Native snippets, and GitHub Pull Requests and Issues. These extensions are optional editor tools, not runtime dependencies.

## Local Setup

### 1. Clone the repository

Use the repository URL provided by the team:

```powershell
git clone <GITHUB_REPOSITORY_URL>
cd <REPOSITORY_FOLDER>
```

Open the cloned repository folder in VS Code. Do not run `git init` inside a repository that has already been cloned.

### 2. Install dependencies

Run from the project root, where `package.json` is located:

```powershell
npm install
```

Keep `package-lock.json` committed so teammates install a consistent dependency tree. When adding a package, follow the Expo-compatible installation approach described in the package's documentation; for native modules that Expo manages, use `npx expo install <package>` when appropriate.

### 3. Configure Supabase

Create a local `.env` file at the project root if the current Supabase configuration expects environment variables. The current project documentation uses these variable names:

```dotenv
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-publishable-or-anon-key
```

Confirm the actual names expected by the Supabase configuration in `src/config/` before running the app. Do not copy real credentials into this README or commit your `.env` file.

`EXPO_PUBLIC_` variables are bundled into client code and must not contain service-role keys or other privileged secrets. Configure appropriate Supabase Row Level Security policies and permissions for exposed data.

### 4. Start the development server

```powershell
npx expo start
```

Use the terminal instructions shown by Expo to open the app on a connected device, emulator, or supported web target.

## Environment Configuration

- Keep personal environment values in a local `.env` file that is ignored by Git.
- If an environment variable is added or renamed, update the relevant local setup instructions without publishing its real value.
- If `.env` was previously committed, adding it to `.gitignore` does not remove it from Git history. Remove it from tracking and rotate any exposed privileged credentials.
- Do not put Supabase service-role keys in a React Native client. Client-side configuration is visible to users of the application.

## Run the Application

Run commands from the project root.

### Start Expo

```powershell
npx expo start
```

### Start with cache cleared

Use this when Metro is holding stale cached state or after certain configuration changes:

```powershell
npx expo start -c
```

### Run the web version

If Expo Web dependencies and project configuration are installed:

```powershell
npx expo start --web
```

The project's npm script may also provide:

```powershell
npm run web
```

### Run Android

If the `android` script exists in `package.json`:

```powershell
npm run android
```

Otherwise, start Expo with `npx expo start` and use the Expo CLI's available Android option. The exact command and device workflow depend on the current Expo SDK and local Android tooling.

### Test on a physical phone

Start Expo and follow the CLI instructions. Your phone and development computer typically need to be able to reach one another over the network. If the normal local connection does not work, you can try:

```powershell
npx expo start --tunnel
```

Tunnel mode can be slower and may require additional setup depending on your network and Expo tooling. Prefer the standard local connection when it works.

## Code Quality and Troubleshooting

### Check current scripts and packages

Before running a script or installing a package, check `package.json`. Do not reinstall dependencies manually from old command notes unless there is a specific need.

### Fix dependency mismatches

If Expo reports incompatible package versions, review the diagnostic message first. The following commands may help after confirming the project's package configuration:

```powershell
npm install
npx expo install --fix
```

Deleting `node_modules/` and reinstalling everything should be a later troubleshooting step, not the routine first response to every error. Do not delete `package-lock.json` casually, because that can change the installed dependency tree.

### Clear the Metro cache

```powershell
npx expo start -c
```

### ESLint

The repository contains `eslint.config.js`. Use the lint script defined in `package.json` if one exists. If no lint script is configured, check the project's ESLint setup before inventing a command or adding configuration.

### Testing

Test the affected behavior on the target platform before opening a pull request. At minimum, review:

- Authentication and logged-in/logged-out navigation, when relevant.
- Navigation into and out of the changed feature.
- Loading, empty, success, and error states for data-dependent screens.
- Layout and interactions on the target mobile size; check web behavior too if the change affects web support.
- Supabase permission and error behavior for features that read or write remote data.
- Resume, learning progress, or job-tracker state persistence where the change touches those flows.

Do not claim a test passed unless you actually ran it.

## GitHub Team Workflow

Use `main` as the stable branch. Work on a task branch, push it to GitHub, and submit a pull request targeting `main`. Detailed commands are in [`GIT_WORKFLOW.md`](GIT_WORKFLOW.md).

Recommended branch names:

- `feature/job-finder-filters`
- `feature/interview-coach`
- `feature/learning-hub-progress`
- `feature/resume-builder`
- `fix/auth-session-loading`
- `docs/update-readme`

The team also uses VS Code's GitHub Pull Requests workflow. If Copilot or another assistant generates a PR title or description, review it and ensure it reflects the actual diff and tests. Never accept invented testing claims or changes that were not made.

## Security Notes

- Never commit `.env` or private credentials.
- Treat any `EXPO_PUBLIC_` environment variable as public client configuration; do not place privileged keys in it.
- Keep Supabase access policies and Row Level Security appropriately configured for tables exposed to the client.
- Validate access on the backend/database, not only by hiding buttons or screens in the app.
- Avoid logging authentication tokens, secrets, or private user data.
- Review dependencies and AI-generated code before committing changes.

## Project Status and Documentation

The visible source tree is organized into the following feature areas: `auth`, `dashboard`, `interview-coach`, `job-finder`, `job-tracker`, `learning-hub`, `profile`, and `resume-builder`. The application also has shared `components`, `config`, `context`, `navigation`, and `assets` directories, plus a `supabase/` folder.

This README intentionally does not claim that every feature is complete. Update feature descriptions, setup instructions, and the project structure when the implementation changes. Keep `GIT_WORKFLOW.md` focused on Git commands, branching, pull requests, review, and recovery procedures.
