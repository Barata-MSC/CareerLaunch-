# CareerLaunch!

## README Guide

| Sections | Contents |
|---|---|
| **1–10** | Setup + Dependencies |
| **11–18** | Project Configuration + Architecture |
| **19–23** | CareerLaunch Application Structure |
| **24–28** | Git / GitHub Commands |
| **29–31** | Development History + Team Rules |
| **32–35** | Current Status + Reference Information |

CareerLaunch! is a React Native mobile application developed for the Mobile Computing final project. The project is built with JavaScript and Expo, organized into reusable screens, components, contexts, configuration files, and assets.

The application currently includes career-related features such as:

- Jobs Finder
- AI Interview Coach
- Resume Builder
- Career Roadmap
- Job Application Tracker
- Profile

The project uses Supabase for authentication/session handling and stores application-related state through React context providers.

---

## 1. Technology Stack

- **Language:** JavaScript
- **Framework:** React Native
- **Development Platform:** Expo
- **Editor:** Visual Studio Code
- **Version Control:** Git + GitHub
- **Database / Backend Services:** Supabase
- **Navigation:** React Navigation
- **Project Structure:** Modular `src` folders with path aliases
- **Web Support:** Expo Web / React Native Web

---

## 2. Development Environment Setup

Before starting development, install the following:

### Required Software

1. **Git for Windows**
2. **Node.js**
3. **Visual Studio Code**
4. **Expo / React Native project dependencies**

After installing Git and Node.js, VS Code is used as the main development environment.

---

## 3. Recommended VS Code Extensions

The following extensions were used during development:

| Extension | Purpose |
|---|---|
| **Path Intellisense** | Provides filename and path autocomplete when importing files. |
| **ESLint** | Helps detect JavaScript and React Native code issues. |
| **ES7+ React/Redux/React-Native Snippets** | Provides shortcuts for common React and React Native code patterns. |
| **React Native Tools** | Adds React Native debugging and development support to VS Code. |
| **vscode-styled-components** | Adds syntax highlighting and editor support for styled-components. |
| **Mobile Preview - Phone & Tablet Simulator** | Used to preview web-based layouts inside mobile/tablet frames. |
| **Test Runner for Java** | Installed in the VS Code environment, although it is not a core dependency of this React Native project. |

---

## 4. Creating the Expo Project

The initial Expo project was created with:

```powershell
npx create-expo-app finalProject --template blank
```

Expo and the related React Native packages were then installed as development progressed.

---

## 5. React Navigation Setup

The project uses React Navigation for screen navigation.

### Native Stack Navigation

```powershell
npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
```

### Bottom Tab Navigation

```powershell
npx expo install @react-navigation/bottom-tabs
```

Other navigation-related installation commands used during development included:

```powershell
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

---

## 6. Other Packages and Development Dependencies

Packages installed during development included:

```powershell
npx expo install expo
npx expo install react-dom react-native-web
npx expo install expo-image-picker
npx expo install expo-linking
```

For path aliasing and Babel configuration:

```powershell
npm install --save-dev babel-plugin-module-resolver
npm install babel-preset-expo --save-dev
```

For ESLint support:

```powershell
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-native
```

---

## 7. Running the Project

### Start Expo

```powershell
npx expo start
```

### Start Expo with cache cleared

```powershell
npx expo start -c
```

### Start Expo for Web

```powershell
npx expo start --web -c
```

or:

```powershell
npm run web
```

### Run Android

```powershell
npm run android
```

---

## 8. Fixing / Synchronizing Dependencies

During development, dependency problems were handled using:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
npx expo install --fix
```

Another cache reset procedure used during development was:

```powershell
npm cache clean --force
npm install
```

These commands can be useful when installed packages and the project configuration become out of sync.

---

## 9. Expo Tunnel Setup

When a local connection was difficult, Expo tunnel mode was used.

The project notes record the following setup:

```powershell
npm uninstall -g @expo/ngrok
npm install -g @expo/ngrok@4.1.0
npm install @expo/ngrok@4.1.0
npx expo login
npx expo start --tunnel
```

---

## 10. Project Structure

The project follows a modular `src` structure.

```text
CareerLaunch-
│
├── .expo/
├── .vscode/
├── dist/
├── node_modules/
│
├── src/
│   ├── assets/
│   │   ├── ai_coach.png
│   │   ├── dashboard.png
│   │   ├── google-icon.png
│   │   ├── icon-profile.png
│   │   ├── job_applicationTracker.png
│   │   ├── job_search.png
│   │   ├── mic-icon.png
│   │   ├── profile.png
│   │   ├── resume_builder.png
│   │   ├── roadmap.png
│   │   ├── rocket-icon.png
│   │   └── student-illustration.png
│   │
│   ├── components/
│   ├── config/
│   ├── context/
│   └── screens/
│
├── .env
├── .eslintrc.json
├── app.config.js
├── App.js
├── babel.config.js
├── index.js
├── jsconfig.json
├── package.json
└── package-lock.json
```

### Main folders

#### `src/assets`
Stores images and visual assets used by the application.

#### `src/components`
Stores reusable UI components that can be shared by multiple screens.

#### `src/config`
Stores configuration files such as the Supabase configuration.

#### `src/context`
Stores React Context providers used for shared application state.

#### `src/screens`
Stores the application's main screens and screen-specific features.

---

## 11. Path Aliasing

To make imports cleaner and avoid long relative paths, the project uses path aliases.

### `jsconfig.json`

The development notes configure aliases for:

```text
@components/*
@screens/*
@assets/*
```

These point to:

```text
src/components/*
src/screens/*
src/assets/*
```

### Example

Instead of:

```javascript
import DashboardScreen from '../screens/DashboardScreen';
```

the project can use:

```javascript
import DashboardScreen from '@screens/DashboardScreen';
```

This makes imports easier to read and reduces problems caused by deeply nested relative paths.

---

## 12. Babel Configuration

The project uses `babel-plugin-module-resolver` together with `babel-preset-expo`.

The aliases are mapped approximately as:

```javascript
alias: {
  '@components': './src/components',
  '@screens': './src/screens',
  '@assets': './src/assets',
}
```

After changing Babel configuration, restart Expo with a cleared cache:

```powershell
npx expo start -c
```

---

## 13. ESLint Configuration

ESLint was added for JavaScript and React Native code checking.

The project notes include the `react-native` ESLint plugin and the following configuration rule:

```json
{
  "rules": {
    "react-native/no-inline-styles": 0
  }
}
```

This allows inline styles in the project while still keeping ESLint active for other checks.

---

## 14. Application Architecture

The application is organized around screens, reusable components, shared contexts, configuration, and navigation.

The main `App.js` currently:

1. Initializes the Supabase authentication session.
2. Listens for authentication state changes.
3. Shows a loading indicator while authentication is being checked.
4. Provides shared state through:
   - `ProfileProvider`
   - `ApplicationsProvider`
   - `ResumeProvider`
5. Displays protected application screens when a user is logged in.
6. Displays the authentication screens when a user is logged out.
7. Wraps the application in a React Navigation container.
8. Displays the CareerLaunch splash screen.

---

## 15. Main Navigation / Screens

The current application contains the following major screens and flows:

### Authentication

- Welcome
- Login
- Register

### Main Application

- Main Tabs
- Dashboard
- Profile
- Job Finder
- Career Roadmap
- AI Interview Coach
- Job Application Tracker

### Resume Builder

The Resume Builder is divided into several screens:

- Resume Builder
- Personal Information
- Education
- Skills
- Experience
- Certificates
- Projects
- Resume Preview

---

## 16. Authentication and Supabase

The application imports the Supabase client from:

```text
src/config/supabase
```

The main application checks the current Supabase session when it starts:

```javascript
supabase.auth.getSession()
```

It also listens for authentication changes:

```javascript
supabase.auth.onAuthStateChange(...)
```

This allows the application to switch between the public authentication screens and the logged-in application screens.

### Environment Variables

The project contains a `.env` file.

The Git workflow notes specifically include removing `.env` from Git tracking:

```powershell
git rm --cached .env
git commit -m "Remove .env from tracking"
```

Do not commit private keys, secrets, or environment credentials to the repository.

---

## 17. Shared Application State

The current application wraps its navigation inside several React Context providers.

```text
ProfileProvider
    └── ApplicationsProvider
        └── ResumeProvider
            └── Navigation
```

### Profile Context

Handles shared user profile/session information.

### Applications Context

Handles shared job application tracker state.

### Resume Context

Handles shared resume-builder information across the resume creation screens.

---

## 18. Current Application Flow

A simplified flow of the application is:

```text
Start Application
       │
       ▼
Authentication Check
       │
       ├── Not Logged In
       │      ├── Welcome
       │      ├── Login
       │      └── Register
       │
       └── Logged In
              │
              ▼
          Main Application
              │
              ├── Dashboard
              ├── Profile
              ├── Job Finder
              ├── Career Roadmap
              ├── AI Interview Coach
              ├── Job Application Tracker
              └── Resume Builder
                     ├── Personal Information
                     ├── Education
                     ├── Skills
                     ├── Experience
                     ├── Certificates
                     ├── Projects
                     └── Resume Preview
```

---

## 19. Git and GitHub Workflow

Git is used to track project changes and GitHub is used as the project's remote repository.

### Clone an Existing Repository

```powershell
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Then:

```powershell
cd "folderName"
```

### Check Repository Status

```powershell
git status
```

### Pull the Latest Changes

```powershell
git pull
```

---

## 20. Branch Workflow

Create a new branch before working on a separate feature:

```powershell
git checkout -b "exampleBranchName"
```

After coding:

```powershell
git status
git add .
git commit -m "DescriptionOfCommit"
git push origin "exampleBranchName"
```

After pushing, the branch can be used to create a Pull Request on GitHub.

### Basic Workflow

```text
Pull latest changes
       ↓
Create / switch to branch
       ↓
Develop feature
       ↓
Check git status
       ↓
git add .
       ↓
git commit
       ↓
git push
       ↓
Create Pull Request
       ↓
Merge changes
```

---

## 21. Initial GitHub Upload

The original project notes used the following process for uploading a project to GitHub for the first time:

```powershell
git init
git remote add origin https://github.com/Barata-MSC/Main-Career-Launch-.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

For a different repository, replace the remote URL with the team's repository URL.

---

## 22. Changing a Git Remote

If the project needs to point to another GitHub repository:

```powershell
git remote set-url origin <NEW_URL>
```

To completely remove the Git repository metadata from the local project:

```powershell
Remove-Item -Recurse -Force .git
```

Use this carefully because it removes the local Git history/configuration.

---

## 23. Canceling Local Changes

The project Git notes include the following method for resetting the local branch to the remote `main` branch:

```powershell
git fetch origin
git reset --hard origin/main
```

This discards local changes that are not present in the remote branch. Use it only when those local changes are no longer needed.

---

## 24. Development Notes

During development, the project went through several stages of configuration and troubleshooting, including:

- Initial Expo project creation
- React Navigation setup
- Expo Web setup
- React Native Web installation
- Path alias configuration
- Babel configuration
- ESLint configuration
- Image picker installation
- Expo Linking installation
- Supabase authentication/session integration
- Git/GitHub branch workflow
- Dependency repair and cache clearing
- Expo tunnel setup for testing

The project structure was also reorganized into `components`, `config`, `context`, `screens`, and `assets` folders to make the codebase easier to manage.

---

## 25. Working on the Project as a Team

Before starting work:

```powershell
git checkout main
git pull
git checkout -b "your-feature-name"
```

After finishing work:

```powershell
git status
git add .
git commit -m "Describe what you changed"
git push origin "your-feature-name"
```

Then create a Pull Request on GitHub so the team can review and merge the changes.

### Important Team Rule

Avoid editing the same files at the same time when possible, especially large navigation or configuration files such as:

- `App.js`
- `babel.config.js`
- `jsconfig.json`
- shared context files

Pull the latest `main` branch before beginning new work.

---

## 26. Project Status

This README documents the current development setup and workflow of CareerLaunch!.

The project currently uses a database/backend service through Supabase, so GitHub Pages is not part of the current deployment workflow.

The old GitHub Pages deployment notes are intentionally not included in the active development instructions.

---

## 27. Useful Command Reference

### Project

```powershell
npx expo start
npx expo start -c
npx expo start --web -c
npm run android
npm run web
```

### Dependencies

```powershell
npm install
npx expo install --fix
Remove-Item -Recurse -Force node_modules
npm cache clean --force
```

### Git

```powershell
git status
git pull
git checkout -b "branch-name"
git add .
git commit -m "message"
git push origin "branch-name"
```

### Expo Tunnel

```powershell
npx expo login
npx expo start --tunnel
```

---

## 28. Project Repository

GitHub repository:

```text
https://github.com/Barata-MSC/Main-Career-Launch-
```

If the team moves the project to another repository, update this section with the new repository URL.

---

## 29. Credits / Development

**Project:** CareerLaunch!  
**Course:** Mobile Computing  
**Technology:** React Native + Expo + JavaScript  
**Repository:** GitHub  
**Backend / Database Service:** Supabase
