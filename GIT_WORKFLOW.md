# Git and GitHub Workflow — CareerLaunch!

This guide describes the team's Git workflow for the CareerLaunch! React Native + Expo project developed in JavaScript using VS Code. Commands are written for PowerShell but also work in Git Bash with minor path differences.

## 1. First-time setup

### Clone the repository

Get the current repository URL from the repository owner, then run:

```powershell
git clone <GITHUB_REPOSITORY_URL>
cd <REPOSITORY_FOLDER>
git status
```

Open the cloned folder in VS Code. Do not run `git init` in a folder that was already cloned.

### Install project dependencies

From the folder containing `package.json`:

```powershell
npm install
```

Configure your local `.env` file if required by the project's Supabase configuration. Never commit `.env` or real credentials.

## 2. Everyday workflow

### A. Start from the latest `main`

Before beginning a new task, make sure your worktree is clean or safely saved:

```powershell
git status
git switch main
git pull --ff-only origin main
```

If you have uncommitted work, commit it on the correct task branch or stash it before switching branches. Do not discard it just to update `main`.

### B. Create a branch for one task

Use a new branch for each feature, fix, or documentation task:

```powershell
git switch -c feature/short-task-name
```

Examples:

```powershell
git switch -c feature/job-finder-filters
git switch -c feature/learning-hub-progress
git switch -c fix/auth-session-loading
git switch -c docs/update-readme
```

Use lowercase words separated by hyphens. Do not use spaces in branch names. Avoid developing directly on `main`.

### C. Develop and inspect changes

After coding, review the current state:

```powershell
git status
git diff
```

Check that you are on the correct branch and that no generated files, secrets, or unrelated edits are included.

### D. Stage and review

Prefer staging selected files when practical:

```powershell
git add src/features/job-finder/JobFinderScreen.js
git diff --cached
```

To stage all intended changes, including file deletions:

```powershell
git add -A
git diff --cached
```

Always inspect the staged diff before committing. Make sure `.env`, `node_modules/`, Expo caches, build output, and other local-only files are not included.

### E. Commit

Use a short, action-oriented message that describes the change:

```powershell
git commit -m "Add job finder filters"
```

Other examples:

```text
Add learning hub progress display
Fix authentication session loading
Update resume builder validation
Document Expo setup
```

### F. Push the branch

For the first push of a new branch:

```powershell
git push -u origin feature/job-finder-filters
```

Replace the branch name with your current branch. After the upstream is configured, subsequent pushes can normally use:

```powershell
git push
```

Pushing a branch does not merge it into `main`.

## 3. Create a pull request

After pushing the branch:

1. Open the repository on GitHub or use the GitHub Pull Requests and Issues extension in VS Code.
2. Create a pull request with your task branch as the source/compare branch and `main` as the base/target branch.
3. Describe what changed, why it changed, and how it was tested.
4. Review the diff and any automated checks.
5. Address feedback and push follow-up commits to the same branch.
6. Merge only after the team has reviewed and accepted the changes.

### Optional: Generate the PR description in VS Code

The team may use GitHub Copilot or another available assistant to draft the PR title and description from the branch diff. This is optional. Review the generated text carefully and remove any claim that is not supported by the actual changes or tests. Do not say that tests passed unless they were run.

If repository-level instructions are kept in `.vscode/settings.json`, merge them with existing settings rather than overwriting the whole file. Editor-specific settings can affect teammates who share the file, so keep them appropriate for the project.

## 4. After the pull request is merged

Update local `main` and delete the completed local branch:

```powershell
git switch main
git pull --ff-only origin main
git branch -d feature/job-finder-filters
git fetch origin --prune
```

Replace the example branch name with the branch that was merged. GitHub may automatically delete the remote branch after merging. If the team wants to delete it manually:

```powershell
git push origin --delete feature/job-finder-filters
```

`git branch -d` deletes a local branch only. It does not delete a branch on GitHub.

## 5. Collaborating on a teammate's branch

To list remote branches:

```powershell
git fetch origin
git branch -a
```

To check out a remote branch locally when you do not already have a local copy:

```powershell
git switch --track -c feature/teammate-task origin/feature/teammate-task
```

Replace the branch names with the actual remote branch. Inspect and test the work without pushing to a teammate's branch unless you have coordinated with them.

## 6. Working with shared files

Coordinate before making overlapping changes to files used by many features, including:

- `App.js`
- `src/navigation/`
- `src/context/`
- `src/config/`
- `babel.config.js`
- `jsconfig.json`
- `package.json` and `package-lock.json`

When dependencies change, commit both `package.json` and `package-lock.json`. Avoid unrelated dependency upgrades in a feature branch. For Expo-managed native dependencies, confirm package compatibility with the project's Expo SDK and use `npx expo install` when appropriate.

If you change a shared context, navigation route, path alias, Supabase configuration, or dependency, note it in the pull request so teammates can update their own work.

## 7. Files that should not be committed

The repository's `.gitignore` should exclude local/generated files such as:

```text
node_modules/
dist/
.expo/
.env
.env.*
!.env.example
```

Review the current `.gitignore` before changing it; add exceptions only when there is a specific reason. Do not commit local secrets, generated build output, local logs, or editor-specific private data.

If `.env` is already tracked and should remain local, remove it from Git tracking while keeping your local copy:

```powershell
git rm --cached .env
git add .gitignore
git commit -m "Stop tracking local environment file"
```

This does **not** erase secrets from earlier commits. If a privileged credential was committed, rotate/revoke it immediately and notify the team.

## 8. Common commands

| Goal | Command |
|---|---|
| Show current branch and changed files | `git status` |
| Preview unstaged changes | `git diff` |
| Stage one file | `git add <file>` |
| Stage all intended changes | `git add -A` |
| Preview staged changes | `git diff --cached` |
| Commit changes | `git commit -m "Describe change"` |
| Push a branch for the first time | `git push -u origin <branch>` |
| Push later commits | `git push` |
| Update local `main` | `git switch main` then `git pull --ff-only origin main` |
| List local branches | `git branch` |
| List local and remote-tracking branches | `git branch -a` |
| Refresh remote branch references | `git fetch origin --prune` |
| Create and switch to a branch | `git switch -c feature/<name>` |
| Delete a merged local branch | `git branch -d <branch>` |

## 9. Troubleshooting and safety

### If there are uncommitted changes

Check them before switching branches or pulling:

```powershell
git status
git diff
```

Commit the work on the appropriate branch or temporarily stash it if necessary:

```powershell
git stash push -m "Work in progress"
```

After switching to the appropriate branch, restore the changes with:

```powershell
git stash pop
```

Resolve conflicts if Git reports any. Do not discard work you still need.

### If a merge has started and you want to cancel it

```powershell
git merge --abort
```

Use this only while a merge is in progress. If Git cannot abort, inspect `git status` and resolve the reported state rather than running unrelated reset commands.

### Dangerous commands — not for routine use

Avoid using these as general-purpose ways to "fix Git":

```powershell
git reset --hard origin/main
git clean -fdx
Remove-Item -Recurse -Force .git
```

- `git reset --hard origin/main` can discard uncommitted tracked-file changes and local commits on the current branch.
- `git clean -fdx` deletes untracked files and ignored files, potentially including local configuration and downloaded content. Preview candidates first with `git clean -ndx`.
- Removing `.git` deletes local repository metadata and history references from that folder. It is not required for ordinary branch or remote problems.

If unsure, stop and ask a teammate before running destructive commands.

## 10. Team workflow summary

```text
Update local main
      |
      v
Create a task branch
      |
      v
Code and test
      |
      v
Review git status and diff
      |
      v
Stage and commit
      |
      v
Push the branch to GitHub
      |
      v
Open a pull request into main
      |
      v
Review, revise, and merge
      |
      v
Update main and delete the finished branch
```

**Team rule:** one focused task per branch, pull requests into `main`, review before merging, and never commit secrets or generated folders.
