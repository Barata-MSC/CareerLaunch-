# Brief 10 – Career Assessment (SCOPE-style Holland Code test)

> Place at `docs/tasks/10-career-assessment.md`. This is a self-contained brief for GitHub Copilot (Agent mode). Follow it completely in one execution. Inspect the existing code first, implement everything, update the docs, run the validation steps, and give the final report.

## Goal

Add a free, short (about 15 minutes) **career interest assessment** to CareerLaunch, similar in spirit to STI SCOPE (https://scope.sti.edu/), which is based on the **Holland Code (RIASEC)** model. Students answer a questionnaire, get a 3-letter Holland code, and see which of our careers fit them.

Audience: incoming senior high school students and college students in the Philippines. Language: English, simple and friendly.

The result screen shows:

1. Their RIASEC profile (6 scores) and 3-letter code, with plain-language descriptions.
2. **Matching careers from our existing careers registry**, linking into the existing career flow.
3. A **Career Planning Worksheet** screen (in-app, shareable as text). PDF export is out of scope unless a dependency is approved (see Open decisions).
4. Next steps: open a matched career, and (only if brief 07 is implemented) hand the result to the AI Coach.

## Non-goals

- Not a clinical or diagnostic psychological test. It is an interest and self-awareness guide. Show the disclaimer on the intro and result screens.
- Do not copy STI's questions, text, branding or design. All items in this brief are original.
- No learning-style quiz, admin dashboard, school/teacher mode, or paid features in v1.
- No AI call for scoring or matching. Scoring is deterministic and local.

## Before you run (human-only)

- [x] Brief 00 (careers layer), brief 04 (guest gating), and brief 09 (resume persistence) are merged. This brief copies brief 09's persistence pattern.
- [ ] Branch created per `GIT_WORKFLOW.md`, for example `feat/career-assessment`.
- [ ] Decide the Open decisions at the bottom, or accept the stated defaults.
- [ ] Nobody else is editing `src/navigation/AppNavigator.js`, `src/features/learning-hub/shared/styles.js`, or `supabase/migrations/` right now (merge-conflict hotspots).

## Inspect first (do not skip)

Read these before writing code and reuse what exists. Report any mismatch with the assumptions below.

- `src/features/learning-hub/careers/careers.js` and `registry.js`: the real list of career IDs and their status (`available` vs `coming-soon`). **Read the IDs from here; never hard-code a second career list.**
- The Careers screen from brief 00 and `src/navigation/AppNavigator.js`: route naming, how screens are registered, where an entry point should live.
- Brief 04's guest hook, lock screen, and server helper: how "guest" vs "upgraded account" is detected.
- Brief 09 (`09-resume-persistence.md`, merged), its migration in `supabase/migrations/`, and its client persistence code: copy this pattern for saving results (RLS, owner-only policies, local fallback).
- Brief 02's `AppPressable` wrapper (if merged) for all tappable elements. Brief 01's motion helpers (if merged).
- How existing screens handle styling, theming, loading, and error states (`src/features/learning-hub/shared/styles.js` and similar).
- `scripts/validate-learning-content.mjs` and `package.json`: how scripts load project code, since there is no test script.
- `CLAUDE.md` and the root README for project rules.

## Scope of work

### 1. Feature location and file structure

Create `src/features/career-assessment/` (adjust names to match repo conventions after inspecting):

```
src/features/career-assessment/
  data/questions.v1.js          // question bank (original), exports ASSESSMENT_VERSION
  data/riasecTypes.js           // type names + short descriptions
  data/careerFit.js             // career id -> Holland weights
  scoring.js                    // pure functions, no React Native imports
  matching.js                   // pure functions, no React Native imports
  useAssessment.js              // state, autosave, resume
  assessmentStorage.js          // local storage + Supabase adapters (pattern from brief 09)
  screens/AssessmentIntroScreen.js
  screens/AssessmentQuestionScreen.js   // or a single screen that steps through items
  screens/AssessmentResultScreen.js
  screens/CareerWorksheetScreen.js
  index.js
scripts/validate-assessment.mjs
```

Use plain JavaScript like the rest of the repo. Scoring, matching, and data files must not import React Native or Expo so the validation script can load them.

### 2. Question bank (original, version `v1`)

36 items, 6 per type. Stem shown on every screen: **"How much would you enjoy…"**. Answer scale of 5 options: Strongly dislike (1), Dislike (2), Neutral (3), Like (4), Strongly like (5).

Item shape: `{ id: 'R1', type: 'R', text: '...' }`. Never show the type letter while answering. Export a `version` string stored with every result.

**R – Realistic**
- R1: Fixing a broken appliance or gadget
- R2: Working outdoors with tools or equipment
- R3: Building something with your hands
- R4: Operating machines or vehicles
- R5: Setting up or repairing electronics or a network
- R6: Doing physically active work instead of desk work

**I – Investigative**
- I1: Figuring out why an experiment or system failed
- I2: Reading about how the human body or nature works
- I3: Analyzing data to find patterns
- I4: Solving difficult logic puzzles or math problems
- I5: Researching a question until you find a solid answer
- I6: Testing ideas to see if they actually work

**A – Artistic**
- A1: Designing posters, videos or social media content
- A2: Writing stories, scripts or songs
- A3: Coming up with creative ways to present an idea
- A4: Performing in front of an audience
- A5: Decorating or styling a space
- A6: Working without strict rules so you can express yourself

**S – Social**
- S1: Helping a classmate understand a hard lesson
- S2: Caring for someone who is sick or struggling
- S3: Listening to people's problems and offering support
- S4: Volunteering for a community project
- S5: Teaching or coaching a group
- S6: Working in a team where everyone helps each other

**E – Enterprising**
- E1: Leading a group to finish a project
- E2: Convincing others to try your idea
- E3: Starting a small business or selling online
- E4: Negotiating a deal or debating a point
- E5: Taking risks to reach a big goal
- E6: Organizing and promoting an event

**C – Conventional**
- C1: Keeping records or spreadsheets accurate
- C2: Following clear step-by-step procedures
- C3: Managing a budget or tracking expenses
- C4: Checking documents for mistakes
- C5: Planning schedules and keeping things on time
- C6: Working in a structured, predictable environment

Order: shuffle once per attempt with a seeded shuffle stored in the draft, so the order is stable across app restarts and same-type items are not adjacent.

### 3. Scoring (pure, deterministic)

- `rawScore[type]` = sum of answers for that type.
- `normalized[type]` = `round((raw - 6) / (30 - 6) * 100)` (6 items, min 6, max 30).
- Holland code = top 3 types by normalized score.
- Tie-break: hexagon order R, I, A, S, E, C; if still tied, prefer the type with more answers of 5.
- If the highest and lowest normalized scores differ by 10 or less, set `undifferentiated: true` and show a note suggesting the student explore broadly or retake later.
- Reject incomplete or invalid answer sets (throw an error; the UI must not allow finishing early).

Export from `scoring.js`:

```js
scoreAssessment(answers /* [{ itemId, value }] */, items) 
// -> { version, raw, normalized, code: ['S','I','A'], undifferentiated, takenAt }
```

### 4. Career matching

`data/careerFit.js` maps career IDs (taken from `careers.js`) to Holland weights `[primary, secondary, tertiary]`. Starting values (content owners may edit):

| Career id | Primary, secondary, tertiary |
|---|---|
| accountancy | C, E, I |
| civil-engineering | R, I, C |
| cybersecurity | I, R, C |
| doctor | I, S, R |
| hospitality-tourism | E, S, C |
| lawyer | E, I, S |
| marine | R, I, E |
| nursing | S, I, R |
| teacher | S, A, E |
| software-engineering | I, R, C |

Use the **actual IDs in `careers.js`**; if an ID differs, follow the registry and report it.

Match score (0–100): weights primary 3, secondary 2, tertiary 1. `match = sum(weight * normalized[type]) / sum(weights)` rounded. Return all careers sorted by match, tie-broken alphabetically by id.

Result screen rules:

- Show the **top 3 matches** and an "Also worth exploring" row for the next 2, each with a one-line "why it fits you" built from the student's top types.
- **Respect career status from `careers.js`.** Careers marked `coming-soon` may appear in the ranking but must be labelled "Coming soon" and must not link into content. **Doctor and Marine must never be shown as available before expert review.** Lawyer follows whatever status the registry gives it.
- If the best available match is under 50, show: "Your interests may fit careers we don't cover yet." Do not link to anything that doesn't exist.
- Tapping an available career navigates through the existing careers flow (do not create new career routes or duplicate registry wiring).

### 5. Screens and UX

- **Intro:** title, a short explanation, "about 15 minutes, free, no right or wrong answers", the disclaimer, **Start**. If a saved result exists: **View my last result** and **Retake**. If a draft exists: **Continue**.
- **Questions:** one item per screen, 5 answer options, progress indicator (`n / 36`), Back button, answers kept when going back, draft autosaved after each answer and resumed on reopen. Do not auto-advance so fast that a mis-tap can't be corrected; a short delay or a Next button is fine.
- **Result:** RIASEC bars (draw with `View` bars; do not add a chart library), Holland code with descriptions, career matches, buttons: Worksheet, Retake. No personal data shown beyond the account's own result.
- **Worksheet screen:** Holland code, top 3 types, top 3 careers, 3 reflection prompts, a 30/60/90-day action table with empty fields, and a **Share** button using React Native's built-in `Share` (plain text). No PDF in this brief.
- Use `AppPressable` for tappables if brief 02 is merged. Use brief 01's motion helpers only if they exist; otherwise keep transitions minimal. Respect reduced-motion if the repo already has a helper for it.
- Accessibility: `accessibilityRole="radio"` and `accessibilityState` on answer options, labels on progress and buttons, minimum 44pt touch targets, readable contrast. Works on small phones.
- Put all user-facing copy in the `data/` files, not scattered in components.
- Handle loading, empty, offline, and error states like existing screens.

### 6. Entry point and navigation

- Add an entry card or button for "Find your best-fit career" on the Careers screen from brief 00 (or the closest existing home for it after inspecting). Keep the edit small.
- Register the new screens in `AppNavigator.js` following existing naming. This file is a merge hotspot, so keep the change minimal and list the exact lines touched in the final report.

### 7. Guest access and persistence

- **Taking the test and seeing the result is free for everyone, including guests.** Do not lock it with brief 04's lock screen.
- **Guests and signed-out/unsaved state:** keep the in-progress draft and the latest result on the device (use the storage the repo already uses; do not add a new storage dependency).
- **Upgraded (non-guest) accounts:** also save the result to Supabase, copying brief 09's pattern: a new migration, RLS owner-only policies, client adapter with local fallback. Keep the last 5 attempts.
- When a guest upgrades their account, offer to save their existing local result (do not silently upload).
- Store only: `version`, `answers` (itemId and value), `scores`, `code`, `takenAt`, and the user id. No names, emails, or free text.
- Migration file: new file in `supabase/migrations/` using the same naming convention as briefs 06 and 09, creating `career_assessment_results` with RLS enabled and policies so a user can only select, insert, and delete their own rows (no update needed). Include an `auth.uid() = user_id` check on insert. Add the RLS test queries as comments or a companion note like the other migrations.
- **Do not apply the migration. Do not deploy anything.** The lead dev applies it by hand in the SQL editor and runs the RLS tests.
- If the migration is not applied, the app must still work using local storage only and fail quietly with a clear, non-crashing message when remote saving isn't available.

### 8. AI Coach hand-off (conditional)

Check whether brief 07 is implemented. If not, **skip this section entirely** and say so in the report. If it is, add an optional "Ask the Coach about my results" action that passes only the Holland code, the six normalized scores, and the top 3 career IDs. No names or other personal data. Respect the privacy decision recorded in brief 07.

### 9. Validation script (there is no test script)

Create `scripts/validate-assessment.mjs` and add `"validate:assessment": "node scripts/validate-assessment.mjs"` to `package.json` (following how `validate:content` is wired). It must run without Expo or a device and check:

- Exactly 6 items per type, 36 total, unique ids, non-empty text, `version` present.
- Scoring: all 5s, all 1s, mixed answers, tie-break order, an undifferentiated set, and rejection of incomplete answers.
- Every career id in `careerFit.js` exists in `careers.js`, and every registered career has a fit entry (or the script reports which don't).
- Matching: sorted descending, deterministic ties, weights applied in the documented order.
- For each registered career, a synthetic answer pattern built from its weights puts that career in the top 3.

If Node cannot import the `src` files directly, load them the same way `validate-learning-content.mjs` loads content, and tell me which approach you used. Do not install a test framework.

### 10. Docs

- Add `docs/tasks/progress/career-assessment.md` as a checkpoint file (phases done, decisions, open items).
- Add a row for this brief to the Status table in `docs/tasks/README.md` with an honest status (describe only implemented behavior; migration and device checks stay "needs human verification"). Add it to the dependency list (needs 00, 04, and 09's pattern; 07 optional).
- Add the migration to the README's list of hotspots/migrations and the human-only steps (apply migration, run RLS tests, test on real devices).
- Update `CLAUDE.md` only if it lists features or conventions that this affects.

## Rules (from the project README, repeated for this run)

- Never put a secret in code, logs, docs, or an `EXPO_PUBLIC_` variable.
- Preserve stable course IDs, lesson IDs, and route names. Do not add dependencies the stack already covers. **Ask before adding any new dependency.**
- Do not run `npm run deploy`. Do not commit or push. Write the migration but do not apply it.
- Do not log answers or results to the console or analytics.
- Do not claim a check passed unless it was actually run. Say which checks were not run (device testing, Supabase RLS, anything needing Docker or a development build).
- Describe only implemented behavior as implemented. Planned work stays labelled as planned.

## Validation steps

1. `npm run validate:assessment` and `npm run validate:content` (report the actual output).
2. Lint/typecheck commands if the repo has them; otherwise say there are none.
3. Start the app if possible and walk through: intro, all 36 questions, back navigation, close and reopen mid-test (draft resumes), result, a career link, worksheet share.
4. Try a guest account and an upgraded account (or state that this was not run).
5. Confirm Doctor and Marine are labelled Coming soon and don't link anywhere.

## Final report

Include: what was built, files changed, the exact lines changed in hotspot files, decisions made, checks run and not run, items for human verification, and the unedited output of `git status --short` and `git diff --stat`, plus the branch name.

## Open decisions (defaults apply if unanswered)

1. **PDF export:** default is no PDF; use text Share. If you want a PDF, approve a dependency first (for example `expo-print`); brief 09 notes resume export is also unwritten, so they can share one solution.
2. **Entry point:** decided: a card on the Careers screen.
3. **Learning-style quiz** (SCOPE has one): default is not in v1.
4. **Retake limit:** default is none; history keeps the last 5.
5. **Languages:** default is English only.
