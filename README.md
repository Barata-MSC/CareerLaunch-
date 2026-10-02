# CareerLaunch!

CareerLaunch! is a React Native mobile application developed for the Mobile Computing final project. The project is built with JavaScript and Expo, organized into reusable screens, components, contexts, configuration files, and assets.

The application currently includes career-related features such as:

- Jobs Finder
- AI Interview Coach
- Resume Builder
- Career Roadmap
- Job Application Tracker
- Profile

The project uses Supabase for authentication/session handling and stores application-related state through React context providers.

### Prerequisites

1. Install the **GitHub Pull Requests** extension in VS Code (if it is not already installed).
2. Sign in to GitHub from VS Code so the extension can access the repository.
3. Have an active GitHub Copilot subscription (the free tier does not support this generation feature).

### Configure Copilot PR Description Instructions

Create or open the following file in the project:

```text
.vscode/settings.json
```

Add (or merge) the following configuration:

```json
{
  "github.copilot.chat.pullRequestDescriptionGeneration.instructions": [
    {
      "text": "Generate a highly detailed pull request description based only on the actual changes in the current branch compared with the base branch. Do not invent information. Explain WHAT changed, WHY it changed, and HOW it was implemented. Identify the relevant files, components, functions, screens, or modules affected. Explain important implementation details and how the changes interact with the existing system. Describe user-facing behavior when applicable. Include testing performed or evidence available from the changes, but do not claim tests were performed if there is no evidence. Mention important limitations, known issues, or follow-up work when applicable. Use clear Markdown headings and bullet points. Begin with a concise summary, followed by detailed sections. Make the description thorough enough that another team member can understand the purpose, implementation, and impact of the changes without inspecting every file manually."
    }
  ]
}
```

These instructions are used only when generating the title/description from inside VS Code.

### Pull Request Workflow (VS Code)

1. Switch to the latest `main` branch:

```powershell
git checkout main
git pull
```

2. Create a new feature branch:

```powershell
git checkout -b JobFinderUpdate
```

3. Develop and test the feature.

4. Check the current Git status:

```powershell
git status
```

5. Stage the changes:

```powershell
git add .
```

6. Commit the changes:

```powershell
git commit -m "Update Job Finder"
```

7. Push the feature branch to GitHub:

```powershell
git push -u origin JobFinderUpdate
```

8. In VS Code, open the **GitHub Pull Requests** view (usually the GitHub icon in the Activity Bar).

9. Click **Create Pull Request**.

10. Select the base branch (`main`) and the compare branch (`JobFinderUpdate`).

11. Click the **Copilot / Generate** (sparkle) icon next to the title or description fields. Copilot uses the project’s configured instructions and the actual branch changes to generate the title and description.

12. Review the generated description carefully. Edit anything that is inaccurate, incomplete, or missing important context.

13. Submit the Pull Request.

### Workflow Summary

```text
main
  │
  ├── git pull
  │
  └── JobFinderUpdate
          │
          ├── Develop feature
          ├── git status
          ├── git add .
          ├── git commit
          └── git push origin JobFinderUpdate
                    │
                    ▼
              VS Code
              (GitHub Pull Requests extension)
                    │
                    ▼
             Create Pull Request
                    │
                    ▼
          Generate title + description
             with GitHub Copilot
             (uses .vscode/settings.json instructions)
                    │
                    ▼
             Review & edit description
                    │
                    ▼
                PR → main
```

### Important

- The feature branch must be pushed to GitHub before (or while) creating the Pull Request from VS Code.
- Do not push the feature directly to `main` when the team workflow requires a Pull Request.
- Always review the Copilot-generated description before submitting. It should accurately reflect only the changes that were actually made and tested.
- The custom instructions in `.vscode/settings.json` apply to generation performed inside VS Code. They do not control the separate “Summary” button that appears on the GitHub website.
```

The same content is already saved in the project’s `README.md` at:

`/home/workdir/attachments/README.md`


---

## README Guide

| Sections | Contents |
|---|---|
| **1–10** | Setup + Dependencies |
| **11–18** | Project Configuration + Architecture |
| **19–27** | Git / GitHub + Development Workflow |
| **28–31** | Current Status + Reference Information |

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
npm install react-native-url-polyfill
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

# 19–25. Git / GitHub Development Workflow

## 19. Git and GitHub Basics

Git is used to track project changes, while GitHub is used as the team's remote repository.

### Clone an Existing Repository

```powershell
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Then enter the project folder:

```powershell
cd "folderName"
```

### Check Repository Status

```powershell
git status
```

---

## 20. Starting Any New Task: Always Create a New Branch

For this project, **one task = one branch**.

This applies to both small changes and large features.

Before starting:

```powershell
git checkout main
git pull
git status
```

Make sure you are on the latest `main` and there are no unwanted local changes.

Then create a new branch:

```powershell
git checkout -b "your-feature-name"
```

You can also use the newer `git switch` command:

```powershell
git switch -c "your-feature-name"
```

Both commands create a new local branch and switch you to it.

Example:

```powershell
git checkout -b CareerRoadmapUpdate
```

or:

```powershell
git switch -c CareerRoadmapUpdate
```

### Important

- Do not continue developing directly on `main`.
- Start every new task from the latest `main`.
- Create a new branch for both small fixes and large features.
- Do not create a new update branch under an old completed feature branch.

---

## 21. Develop, Commit, and Push

After completing the task:

```powershell
git status
git add .
git commit -m "Describe what you changed"
git push origin "your-feature-name"
```

Example:

```powershell
git add .
git commit -m "Update Career Roadmap screen"
git push origin CareerRoadmapUpdate
```

Then open GitHub and create a Pull Request:

```text
your-feature-name → main
```

---


## 22. Uploading a Local Branch to a Remote Branch for Review

A branch does **not** need to be merged into `main` immediately. A team member can upload their local branch to GitHub so another teammate can inspect and test the source code first.

### From the member's local branch

Make sure the member is currently on the correct branch:

```powershell
git branch
git status
```

Then push that local branch to the remote repository:

```powershell
git push -u origin "your-feature-name"
```

Example:

```powershell
git push -u origin CareerRoadmap
```

This creates or updates the remote branch:

```text
Local:  CareerRoadmap
          ↓
Remote: origin/CareerRoadmap
```

The branch is now available on GitHub without changing `main`.

### Checking a teammate's remote branch locally

First update your list of remote branches:

```powershell
git fetch origin
```

If you do not already have a local copy of the branch, create one that tracks the remote branch:

```powershell
git checkout -b "your-feature-name" origin/"your-feature-name"
```

Example:

```powershell
git checkout -b CareerRoadmap origin/CareerRoadmap
```

You can then inspect, run, and test the code locally before deciding whether it is ready to merge into `main`.

### Important

Pushing a branch to GitHub **does not merge it into `main`**.

The branch can stay on GitHub while the team reviews it. After review, create a Pull Request:

```text
CareerRoadmap → main
```

Then merge it into `main` only when the team is ready.

## 23. Pull Requests and Merge Conflicts

After a branch is pushed, create a Pull Request so the changes can be reviewed and merged into `main`.

Another teammate may have already merged changes into `main` while your branch is still being developed. This does **not** automatically mean there will be a merge conflict.

A conflict is more likely when two branches modify the same files or the same lines of code.

A branch can still be pushed and submitted as a Pull Request:

```powershell
git add .
git commit -m "Describe changes"
git push origin "your-feature-name"
```

If GitHub reports a merge conflict, resolve the conflict before completing the merge.

### Optional: Update a Long-Running Branch

If a branch has been under development for a while and needs the latest `main`, it can be updated with:

```powershell
git checkout main
git pull
git checkout "your-feature-name"
git merge main
```

This is optional and is not required every time `main` changes.

---

## 24. Canceling, Undoing, or Recovering Git Changes

These commands are for different situations. **Do not run all of them as one sequence.** Choose the command based on what you are trying to cancel or undo.

### Temporarily set aside local changes

Use `git stash` when you have unfinished local changes but need a clean working tree temporarily.

```powershell
git stash
git pull
git stash pop
```

What this does:

```text
git stash     → temporarily stores your uncommitted changes
git pull      → gets the latest changes from the tracked remote branch
git stash pop → reapplies your saved local changes
```

If `git stash pop` causes conflicts, resolve the conflicts manually before continuing.

### Cancel an unfinished merge

If a merge has started and Git reports conflicts, you can cancel the merge and return to the state before the merge began:

```powershell
git merge --abort
```

Use this when you want to stop the current merge without keeping the merge result.

### Undo the most recent commit but keep the changes

```powershell
git reset --soft HEAD~1
```

This removes the latest commit from the current branch history, but keeps the changes from that commit staged so they can be edited or recommitted.

### Recover the latest remote `main` state

```powershell
git fetch origin
git reset --hard origin/main
```

This updates the local knowledge of the remote repository and then makes the current branch match `origin/main`. **Uncommitted changes and local commits on the current branch can be discarded by `--hard`.** Only use this when you are certain those local changes are no longer needed.

### Quick guide

| Situation | Command | Result |
|---|---|---|
| Temporarily save unfinished changes | `git stash` | Stores changes temporarily |
| Reapply stashed changes | `git stash pop` | Restores the latest stash |
| Cancel an active merge | `git merge --abort` | Stops the merge and returns to the previous state |
| Undo the latest commit but keep its changes | `git reset --soft HEAD~1` | Removes the commit, keeps changes staged |
| Discard local work and match remote `main` | `git fetch origin` + `git reset --hard origin/main` | Resets the current branch to remote `main` |

---

## 25. Merging and Deleting Completed Branches

Once a Pull Request has been successfully merged into `main`, the feature branch can be deleted.

Deleting a branch **after it has been merged does not remove the merged commits from `main`**. The commits remain part of `main`'s history.

This keeps the repository clean and prevents old completed branches from piling up.

### Example

```text
main
  │
  └── CareerRoadmapUpdate
             ↓
        Pull Request
             ↓
        Merge into main
             ↓
      Delete the branch
```

### Delete a completed local branch

First switch back to `main`:

```powershell
git checkout main
git pull
```

Then delete the merged local branch:

```powershell
git branch -d CareerRoadmapUpdate
```

If Git says the branch has not been fully merged, **do not use `-D` unless you are certain the branch is no longer needed**:

```powershell
git branch -D CareerRoadmapUpdate
```

### Delete the remote GitHub branch

After deleting the local branch, remove the remote branch from GitHub:

```powershell
git push origin --delete CareerRoadmapUpdate
```

This removes the branch name from the remote repository but does not remove commits that were already merged into `main`.

### Important: Do not use `git checkout -d` to delete a branch

For example, this is **not** a branch-deletion command:

```powershell
git checkout -d readmeUpdate
```

It can place Git into a **detached HEAD** state instead of deleting the branch.

If this happens, return to `main` first:

```powershell
git checkout main
```

Then delete the branch normally:

```powershell
git branch -d readmeUpdate
```

And, if the branch was pushed to GitHub:

```powershell
git push origin --delete readmeUpdate
```

### Updating a completed feature later

If the same feature needs another update later, create a **new branch from the latest `main`**:

```powershell
git checkout main
git pull
git checkout -b CareerRoadmapFix
```

Do not create:

```text
CareerRoadmap
   └── CareerRoadmapFix
```

unless there is a specific reason to make the work dependent on the old branch.

---

## 26. Initial GitHub Upload / Repository Setup

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

### Changing a Git Remote

```powershell
git remote set-url origin <NEW_URL>
```

To completely remove the Git repository metadata from the local project:

```powershell
Remove-Item -Recurse -Force .git
```

Use this carefully because it removes the local Git history/configuration.

---

## 27. Team Workflow Rules

### Before starting any task

```powershell
git checkout main
git pull
git status
git checkout -b "your-feature-name"
```

### While developing

```powershell
git status
```

Commit regularly when a meaningful part of the task is complete.

### After finishing

```powershell
git add .
git commit -m "Describe what you changed"
git push origin "your-feature-name"
```

Create a Pull Request and merge into `main`.

### After merging

Delete the completed branch.

```text
One task
   ↓
One branch
   ↓
Develop
   ↓
Commit
   ↓
Push
   ↓
Pull Request
   ↓
Merge into main
   ↓
Delete branch
```

### Team reminders

- Do not develop directly on `main`.
- Start every new task from the latest `main`.
- Create a new branch for both small fixes and large features.
- Do not keep old merged branches unless there is a specific reason.
- Do not commit `.env` or private credentials.
- Avoid editing the same large files at the same time when possible, especially:
  - `App.js`
  - `babel.config.js`
  - `jsconfig.json`
  - shared context files

---

## 28. Project Status

This README documents the current development setup and workflow of CareerLaunch!.

The project currently uses a database/backend service through Supabase, so GitHub Pages is not part of the current deployment workflow.

The old GitHub Pages deployment notes are intentionally not included in the active development instructions.

---

## 29. Useful Command Reference

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
git checkout main
git pull
git checkout -b "branch-name"
git switch -c "branch-name"
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

## 30. Project Repository

GitHub repository:

```text
https://github.com/Barata-MSC/Main-Career-Launch-
```

If the team moves the project to another repository, update this section with the new repository URL.

---

## 31. Credits / Development

**Project:** CareerLaunch!  
**Course:** Mobile Computing  
**Technology:** React Native + Expo + JavaScript  
**Repository:** GitHub  
**Backend / Database Service:** Supabase

# 32. Deploying AI Coding Agents / Assistants in VS Code

AI coding assistants can be integrated into Visual Studio Code to help with code generation, debugging, refactoring, code explanation, and project-level development tasks.

For this project, the following AI coding tools are used:

* **GitHub Copilot** — everyday coding assistance, code completion, and AI chat.
* **OpenAI Codex** — project-level AI coding agent for understanding and modifying the codebase.

---

## 32.1 GitHub Copilot

GitHub Copilot provides AI-powered coding assistance directly inside Visual Studio Code.

### Installation and Setup

1. Open **VS Code Extensions** and search for **GitHub Copilot** / **GitHub Copilot Chat**.

   * Newer versions of Visual Studio Code may include Copilot functionality directly.

2. Click the **Accounts** icon in the bottom-left corner of VS Code.

3. Select **Sign in with GitHub** to authenticate GitHub Copilot.

4. Follow the browser prompt to authenticate your GitHub account.

5. Once connected, the Copilot status icon should appear in the VS Code status bar.

6. Open the **GitHub Copilot Chat** interface from the VS Code sidebar.

7. At the bottom of the Copilot Chat interface, open the **model selector**.

8. Select the desired available model, such as **Claude**, when available.

### Recommended Uses

GitHub Copilot can be used for:

* Code completion
* Generating small code snippets
* Explaining code
* Fixing simple errors
* Refactoring code
* Asking questions about the current file
* Generating common React Native patterns

---

## 32.2 OpenAI Codex

OpenAI Codex is an AI coding agent that can be used directly within VS Code.

Unlike a basic autocomplete tool, Codex can work with the project's codebase to understand the relationships between files and perform larger development tasks.

### Installation and Setup

1. Open **VS Code Extensions**.

2. Search for the official **Codex** extension from OpenAI.

3. Install the extension.

4. Open the **Codex** panel in VS Code.

5. Sign in using your **ChatGPT account** when prompted.

6. Open the **CareerLaunch** project folder in VS Code.

7. Give Codex a coding task through the Codex interface.

### Example Tasks

Codex can be used for larger development tasks such as:

```text
Analyze the Job Finder feature and explain how the components,
screens, and data flow are connected.
```

```text
Find the cause of this navigation error and fix it.
```

```text
Add a loading state to the Job Finder screen.
Keep the existing project structure and styling.
```

```text
Review the Resume Builder and identify possible bugs
without changing the code.
```

Codex can inspect relevant project files and, depending on the task and permissions, make code changes within the project.

---

## 32.3 GitHub Copilot vs. OpenAI Codex

Both tools can assist with programming, but they are useful for different types of work.

| Tool                    | Primary Use                                               |
| ----------------------- | --------------------------------------------------------- |
| **GitHub Copilot**      | Everyday coding assistance and code completion            |
| **GitHub Copilot Chat** | Questions, explanations, and smaller coding tasks         |
| **OpenAI Codex**        | Larger project-level coding and agentic development tasks |

### Recommended Workflow

For this project, GitHub Copilot can be used as the primary everyday coding assistant while Codex can be used when a task requires deeper understanding of multiple files.

```text
VS Code
│
├── GitHub Copilot
│   ├── Code completion
│   ├── Quick fixes
│   ├── Code explanations
│   └── Everyday coding
│
└── OpenAI Codex
    ├── Understand project structure
    ├── Analyze multiple files
    ├── Debug larger problems
    ├── Implement features
    └── Review/refactor code
```

### Important

AI coding agents should be treated as development assistants rather than replacements for understanding the source code.

Before accepting major changes:

1. Review the generated code.
2. Check which files were modified.
3. Run the application.
4. Test the affected functionality.
5. Review the Git diff before committing.

This is especially important when working on shared project files such as:

```text
App.js
babel.config.js
jsconfig.json
src/context/
src/screens/
```

AI-generated changes should be reviewed before they are committed and pushed to the team's GitHub repository.


Here’s the full updated **section 32.4** ready to copy:

```markdown
## 32.4 GitHub Copilot Pull Request Description Generation (VS Code)

The team generates detailed Pull Request descriptions **inside Visual Studio Code** using the **GitHub Pull Requests** extension together with GitHub Copilot. Custom instructions in the project control the style and depth of the generated description.

