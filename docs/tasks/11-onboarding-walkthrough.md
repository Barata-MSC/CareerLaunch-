# Brief 11 – Post-login Walkthrough (Onboarding Tutorial Pop-up)

> Place at `docs/tasks/11-onboarding-walkthrough.md`. This is a self-contained brief for GitHub Copilot (Agent mode). Follow it completely in one execution. Inspect the existing code first, implement everything, update the docs, run the validation steps, and give the final report.

## Goal

After a user logs in and lands on the main dashboard, show a **pop-up walkthrough (tutorial)** that explains the app in a few short steps. The pop-up must let the user choose **"Don't show this again"**, and the app must respect that choice on every later login.

The walkthrough is for first-time orientation, so it must be short, skippable, accurate, and never annoying.

## Non-goals

- No spotlight/coach-mark overlay that highlights real UI elements (that needs measuring layouts or a new library). This brief is a **modal step carousel** only.
- No new dependencies, no new audio/image assets. Reuse icons and components already in the repo.
- No backend work or migration in this brief (see Persistence).
- Do not change career routes, course IDs, lesson IDs, or existing screen behavior.

## Before you run (human-only)

- [ ] Brief 10 (career assessment) is merged, or this branch is created from it. Both briefs touch `LearningHubScreen.js` and `AppNavigator.js`.
- [ ] Branch created per `GIT_WORKFLOW.md`, for example `feat/onboarding-walkthrough`.
- [ ] Nobody else is editing `src/navigation/AppNavigator.js`, `LearningHubScreen.js`, or `src/features/learning-hub/shared/styles.js` right now (merge-conflict hotspots).
- [ ] Decide the Open decisions at the bottom, or accept the stated defaults.

## Inspect first (do not skip)

Report any mismatch with the assumptions below before building.

- Which screen is the **post-login dashboard / landing screen** (most likely the Learning Hub). Use the real one; do not guess. Find how the app routes after login, sign-up, and guest sign-in in `src/navigation/AppNavigator.js` and the auth context.
- How the app knows the current user and whether they are a **guest** or an **upgraded account** (brief 04's hook), and the user id available to client code.
- What local storage the repo already uses for persisted client state (reuse it; do not add a storage dependency). See how brief 10 (`assessmentStorage.js`) and brief 09 store local data.
- The shared modal, button, and `AppPressable` components (brief 02), theming, and styles in `src/features/learning-hub/shared/styles.js`. Brief 01 motion helpers only if they exist.
- Which features are **actually implemented and available today**, by reading `docs/tasks/README.md` status and the code. The walkthrough copy must only describe real behavior.
- `CLAUDE.md` and the root README for project rules.

## Behavior (the rules)

### When it shows
- Show the walkthrough on the dashboard **after login/sign-up/guest sign-in**, once the dashboard has finished loading and the stored preference has been read.
- Show only if the user has **not** chosen "Don't show this again" (and has not finished it, per the default decision below) for the current walkthrough version.
- Show **at most once per app session**, even if the user navigates away from and back to the dashboard.
- Never show it on top of another modal, a loading state, or an error state. Never block the app if reading the preference fails: on error, do not show it.
- Logging out does **not** clear the preference.

### The pop-up
- A modal card centered on screen with a dimmed backdrop. Content per step: an icon, a short title, and 1–2 short sentences.
- A progress indicator (dots or "2 / 5").
- Buttons: **Back** (hidden on step 1), **Next** (becomes **Get started** on the last step), and a visible **Skip** (or close "X").
- A clearly visible **"Don't show this again"** option available on **every step** (a checkbox row or a text button; not hidden behind other taps).
- Use `AppPressable` for tappables if brief 02 is merged.

### What each close action does (exact semantics)
| Action | Result |
|---|---|
| **Don't show this again** | Saves the preference and closes. It never appears again for this user (until the walkthrough version changes). If implemented as a checkbox, it applies when the user closes or finishes. |
| **Skip / X / Android back / tap on backdrop** | Closes for this session only. It may appear again on the next login. |
| **Get started** (last step) | Counts as completed: saves the same preference as "Don't show this again". |

### Replay
- Add a small **"Replay tutorial"** entry in an existing, sensible place (for example Profile/Settings, or the Learning Hub header menu; inspect and choose the least intrusive spot). It reopens the walkthrough regardless of the saved preference and does not change the saved preference.

## Steps content (draft; verify against the real app)

Write the copy in a `data/` file (not scattered in components). Keep each step under 2 short sentences, friendly tone, Philippine students as the audience. Draft steps:

1. **Welcome to CareerLaunch** – A quick tour of how to get the most out of the app.
2. **Explore careers and lessons** – Pick a career in the Learning Hub and follow its tracks and courses at your own pace.
3. **Find your best-fit career** – Take the career assessment to see which careers match your interests. (Brief 10; include only if its entry card exists.)
4. **Build your career toolkit** – Resume Builder, Application Tracker, and Interview Coach help you prepare for the job hunt. (Guests: say some tools need a full account; match brief 04's actual locked features.)
5. **You're all set** – You can replay this tour any time from {the replay location}.

**Accuracy rules for the copy:**
- Describe **only implemented behavior.** Read `docs/tasks/README.md` first. At the time of writing, the Job Finder is blocked (the job API coverage run failed), Coach AI feedback (brief 07) and voice (brief 08) are not implemented, and Doctor, Marine, Accountancy, Civil Engineering and Hospitality & Tourism are `coming-soon`. Do not mention or promise these as working.
- Do not claim data is "saved to your account" or "synced" unless the code and migrations for that feature are applied and verified; the README says persistence for the tracker and resume still needs human verification. Use neutral wording instead.
- If a step's feature does not exist in the app, drop that step rather than inventing one. Steps are data-driven, so the number of steps may change.

## Persistence (default: local, no migration)

- Store the preference **per user id** in the storage the repo already uses locally, under a versioned key such as `walkthrough:v1:<userId>` with a small JSON value, for example `{ "dismissed": true, "version": 1, "at": "<ISO date>" }`.
- A constant `WALKTHROUGH_VERSION` lives with the steps data. If the stored version is lower than the current version, show it again (so a major future change can re-introduce the tour).
- A guest who later upgrades the account must not see it again if they already chose "Don't show this again", if the user id stays the same after upgrading. Inspect how `upgrade-guest-account` handles the id; if the id changes, document the behavior in the final report instead of adding a migration.
- Never store names, emails, or any other personal data in the value.
- **Do not add a Supabase column or migration in this brief.** Cross-device sync is a possible follow-up (see Open decisions).

## Suggested structure (adjust after inspecting the repo)

```
src/features/onboarding/
  data/walkthroughSteps.js      // WALKTHROUGH_VERSION + steps (copy lives here)
  walkthroughLogic.js           // pure: shouldShowWalkthrough, buildStoredValue (no React Native imports)
  walkthroughStorage.js         // read/write using the repo's existing local storage
  useWalkthrough.js             // loads preference, session guard, open/close/replay
  WalkthroughModal.js           // the modal UI
  index.js
scripts/validate-walkthrough.mjs
```

Mount the modal on the dashboard screen with the smallest possible edit, and list the exact lines you touched in hotspot files in the final report.

## Quality requirements

- **Accessibility:** modal marked as such (`accessibilityViewIsModal`), buttons and checkbox have labels and roles/states, minimum 44pt touch targets, readable contrast, the card scrolls on small screens or large font sizes, and Android hardware back closes it as "Skip".
- **Motion:** keep it subtle; respect reduced motion if the repo has a helper. No required animation.
- **Resilience:** no crash if storage fails, no flicker (don't render the modal until the preference has been read), no double-open.
- **Privacy:** do not log the user id or preference to the console or analytics.
- Handle small phones and tablets/landscape without clipped buttons.

## Validation script (there is no test script)

Create `scripts/validate-walkthrough.mjs` and add `"validate:walkthrough": "node scripts/validate-walkthrough.mjs"` to `package.json`, wired the same way as `validate:content` and `validate:assessment`. It must run without Expo or a device and check:

- Steps data: unique ids, non-empty title and body, a version constant, at least 1 step.
- `shouldShowWalkthrough` logic: shows when no stored value; hides when dismissed at the current version; shows again when the stored version is lower; hides when reading fails (error state); hides when already shown this session.
- `buildStoredValue` returns only the allowed fields (no personal data).

Keep the logic and data files free of React Native imports so the script can load them. Use the same loading approach as the existing validators and say which approach you used. Do not install a test framework.

## Docs

- Add `docs/tasks/progress/onboarding-walkthrough.md` as a checkpoint file.
- Add a row for this brief to the Status table in `docs/tasks/README.md` with an honest status. Add it to the dependency list (needs 00, 04, and 10 merged for the content steps; no migration).
- Update `CLAUDE.md` only if it lists features or conventions this affects.

## Rules (from the project README, repeated for this run)

- Never put a secret in code, logs, docs, or an `EXPO_PUBLIC_` variable.
- Preserve stable course IDs, lesson IDs, and route names. Do not add dependencies the stack already covers. **Ask before adding any dependency.**
- Do not run `npm run deploy`. Do not commit or push.
- Do not claim a check passed unless it was actually run. Say which checks were not run.
- Describe only implemented behavior as implemented. Planned work stays labelled as planned.

## Validation steps

1. `npm run validate:walkthrough`, `npm run validate:assessment`, and `npm run validate:content` (report the actual output).
2. `npm run lint`, and `npx expo export -p web` if the repo uses it.
3. If you can run the app: log in as a new user, confirm it appears once; tap Skip and relaunch (appears again next login); choose "Don't show this again" and relaunch (does not appear); confirm Replay works and does not change the saved choice; confirm it never appears over another modal. If this cannot be run, say so.
4. Confirm the copy does not mention the Job Finder, Coach AI, voice, or any `coming-soon` career as available.

## Final report

Include: what was built, files changed, the exact lines changed in hotspot files, decisions made, checks run and not run, items for human verification, and the unedited output of `git status --short` and `git diff --stat`, plus the branch name.

## Open decisions (defaults apply if unanswered)

1. **Does finishing the last step count as "don't show again"?** Default: yes. Alternative: only the explicit option stops it.
2. **Where does "Replay tutorial" live?** Default: Profile/Settings if it exists, otherwise the Learning Hub header.
3. **Cross-device sync of the preference** (Supabase column plus migration)? Default: no, local per user id only. Can be a follow-up brief.
4. **Show to guests?** Default: yes, with copy that matches what is locked for guests.
5. **Spotlight-style coach marks** on real UI elements? Default: no (needs a library or layout measuring); a modal carousel only.
