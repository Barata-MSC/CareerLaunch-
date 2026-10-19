# Careers Layer: One-Pass Build Brief for GitHub Copilot

**How to use:** Keep this file at `docs/tasks/00-careers-layer.md`. In Copilot (Agent mode), attach it with `#file:docs/tasks/00-careers-layer.md` and paste the short trigger below. Everything Copilot needs is in the "Prompt" section.

**Trigger message to paste:**

> Follow docs/tasks/00-careers-layer.md completely, in one execution. Inspect the existing code first, then implement the Careers layer, update the docs, and run the validation steps. Do not stop after the first screen, and do not ask me to prompt for each part separately.

---

## Prompt

### 1. Goal

Add the missing **Careers** step to the Learning Hub in CareerLaunch. Today, tapping **Learning Hub** goes straight to a list of tracks (Software Engineer, Data Analyst, UI/UX Designer). The approved learner journey needs one more level above that: the learner first picks a **career**, then sees that career's **tracks**, then proceeds into courses, lessons, and quizzes exactly as the app already does.

Target flow:

1. Learner taps **Learning Hub** (bottom tab or dashboard quick action).
2. **Careers screen** (NEW): a browsable list of careers.
3. Learner taps **Software Engineering**.
4. **Career Tracks screen**: shows the tracks for that career. For Software Engineering these are the existing tracks: Software Engineer, UI/UX Designer, Data Analyst. (This is the screen that currently opens first; it becomes the second level.)
5. Learner taps a track, then sees the existing **Courses** list, then the existing **Lessons**, **Quiz**, and **Results** flow. These must keep working unchanged.

### 2. Read first (do not skip)

Before writing code, inspect and understand:

- `CLAUDE.md` and `README.md` (project rules, data contracts, stable-ID rules).
- `src/features/learning-hub/LearningHubScreen/LearningHubScreen.js` (current entry; how it switches between track list and course list, and how it handles back).
- `src/features/learning-hub/software-engineering/SoftwareEngineerRoadmap.js` (`TRACKS` definitions and the roadmap UI).
- `src/features/learning-hub/shared/progress/useAllCoursesProgress.js` (aggregate status rule).
- `src/navigation/AppNavigator.js` and the bottom tab setup (how `LearningHub` is registered and how the dashboard quick action navigates to it).
- `src/features/learning-hub/shared/styles.js` (palette and shared styles).
- The icon library already used by the app (reuse it; do not add a new one).

Follow the patterns you find. If the current screen manages levels with local state instead of navigator routes, decide which approach is the smallest safe change, and make sure header back, Android hardware back, and re-tapping the Learning Hub tab all behave sensibly (back from a track list returns to the careers list; back from the careers list leaves the Learning Hub).

### 3. Careers data (data-driven, separate from UI)

Create `src/features/learning-hub/careers/careers.js` exporting `CAREERS` and a `getCareerById(id)` helper. Keep authored data separate from the screens.

Each career:

```js
{
  id: 'software-engineering',      // stable, kebab-case, never derived from the display title
  title: 'Software Engineering',
  subtitle: 'Build websites, apps, and software systems.',
  icon: '...',                     // from the existing icon library
  color: '...',                    // accent from the shared palette
  status: 'available',             // 'available' | 'coming-soon'
  trackIds: ['software-engineer', 'ui-ux-designer', 'data-analyst'], // must match real TRACKS ids
  overview: 'Two or three sentences describing the field.',
  skillsPreview: ['Problem solving', 'Programming', 'Teamwork'],
}
```

Use the **actual track IDs from `TRACKS`**; verify them in the source rather than trusting the example above. Do not rename or modify any existing track, course, or lesson ID.

Seed these careers, in this order:

| id | Title | Status |
|---|---|---|
| `software-engineering` | Software Engineering | **available** (tracks: Software Engineer, UI/UX Designer, Data Analyst) |
| `cybersecurity` | Cybersecurity | coming-soon |
| `teacher` | Teacher | coming-soon |
| `nursing` | Nursing | coming-soon |
| `doctor` | Doctor | coming-soon |
| `lawyer` | Lawyer | coming-soon |
| `marine` | Marine (Seafarer / Marine Engineering) | coming-soon |
| `accountancy` | Accountancy | coming-soon |
| `civil-engineering` | Civil Engineering | coming-soon |
| `hospitality-tourism` | Hospitality & Tourism | coming-soon |

Rules for the seeded content:

- **Only Software Engineering has real tracks and courses.** All other careers have `trackIds: []` and `status: 'coming-soon'`. Do **not** invent courses, lessons, quizzes, or fake progress for them.
- Write short, general, accurate `subtitle`, `overview`, and `skillsPreview` text for each coming-soon career. Do not include salary figures, statistics, job-demand claims, or specific licensing/exam requirements. If mentioning that a field may require formal education or licensure, keep it general.
- Do not claim the app can predict or recommend the right career for the user. This screen is a browsable list, not an assessment.

### 4. Screens to build

**A. Careers screen (new, the Learning Hub entry)**

- Header title "Learning Hub" with a short prompt such as "Pick a career to explore."
- A search field that filters careers by title (case-insensitive), with an empty state ("No careers match your search") and a clear action.
- A vertical list of career cards: icon, title, subtitle, and either a track count plus overall progress bar (available careers) or a "Coming soon" badge (coming-soon careers).
- Cards must have clear touch targets, accessible labels (`accessibilityRole="button"`, label with title and status), and a visible disabled-looking but still tappable state for coming-soon items.
- Tapping an available career opens the Career Tracks screen for that career. Tapping a coming-soon career opens the Career Detail view (below).

**B. Career Tracks screen (the existing track list, now second level)**

- Reuse the current tracks UI; make it accept a career (by `careerId`) and render only that career's tracks (`trackIds` resolved against `TRACKS`).
- Show the career title in the header with a back action to the Careers screen.
- Keep each track's course count, estimated duration, and progress as they appear today.
- Tapping a track continues into the existing course list, then lessons, quizzes, and results, unchanged.
- If a career somehow has no resolvable tracks, show an empty state instead of crashing.

**C. Career Detail view for coming-soon careers (new, detail-only)**

- Shows the career icon, title, `overview`, and `skillsPreview`.
- Clearly states "Courses for this career are coming soon." No start buttons, no fake lessons.
- Back action returns to the Careers screen.
- Reuse the existing "detail-only" visual pattern used by roadmap steps without course data, if one exists.

### 5. Progress

- Career progress is **derived**, never stored. Compute it from the statuses of the courses in the career's tracks using the existing `useAllCoursesProgress` hook and its course-status rule (a course is completed only when all lessons are complete and a quiz attempt passed).
- Define clearly in code comments how the percentage is computed (for example, completed courses divided by total courses in the career) and use the same rule everywhere it appears.
- Refresh progress when the Careers screen regains focus (match how the track list refreshes today).
- Show loading and error states for progress; never show a success or 100% state when the data failed to load.
- **No new database tables, columns, migrations, or Supabase calls.** This change is client-side only.

### 6. UI conventions

- Mobile-first, vertically scrollable, consistent with the current visual language: purple primary action color, green for completion, red-orange for errors, neutral gray for secondary text. Use the shared styles and palette; do not introduce a new design system.
- Works at small phone widths and in the web phone-sized frame. No horizontal overflow.
- Include loading, empty, error/retry, not-started, in-progress, and completed states where relevant.
- Keep the guest-mode behavior unchanged. Guests can browse careers the same way registered users do.

### 7. Hard constraints

- Preserve all existing course IDs, lesson IDs, route names that existing screens rely on, `App.js` provider composition, and auth/navigation separation.
- Register any new screen in the navigator, and make sure every `navigation.navigate(...)` name exactly matches a registered route.
- Use the existing Babel aliases (`@components`, `@features`, `@assets`, `@config`); check `babel.config.js` before adding alias-based imports.
- Do not add dependencies. Do not touch Supabase config, migrations, or Edge Functions. Do not read or print `.env` values.
- Do not run `npm run deploy`. Do not commit or push. Do not create or modify files in `dist/`.
- Keep the diff focused. Do not refactor unrelated code.
- Do not claim the app has an AI career recommender, live job data, or content for the coming-soon careers.

### 8. Update the documentation (part of the same execution)

Update the docs so they match the code you wrote. Distinguish implemented behavior from planned work.

**`CLAUDE.md`**

- In the feature table, update the **Learning Hub** row: careers list (Software Engineering available; other careers listed as coming soon) leading into tracks, courses, lessons, and quizzes. State that career progress is derived, not stored.
- In "Learning tracks and progress," add a short note that tracks now sit under careers and that only Software Engineering is wired to tracks.
- In "Architecture and entry points," mention the new `careers/` module and the new screens/routes.

**`src/features/learning-hub/README.md`** (Learning Hub reference)

- Update the learner journey so it starts with "choose a career," then "choose a track."
- Add a "Careers" subsection near "Current careers and roadmap" with a table of careers, their status, and which tracks they map to. Explain that "careers" now means the top level and "tracks" the second level.
- Add the `careers/` folder and the new screens to the Source architecture tree.
- Add a "Careers data contract" subsection documenting the shape in section 3 above, including the rule that `trackIds` must reference real track IDs and that career IDs are stable.
- Add items to the Change checklist: every `trackIds` entry resolves to a real track; coming-soon careers have no courses; career IDs are unique.

Also add a short "How to add a new career" note: add an entry to `careers.js`; for an available career, add its tracks and courses following the existing course data contract first, then list the track IDs.

### 9. Validation

Run and report the real results:

1. `npm run lint` (fix issues in files you changed).
2. `npx expo export -p web` to verify the bundle builds.
3. A dev-time integrity check for careers (a small pure function called under `__DEV__` that warns on duplicate career IDs, unresolved `trackIds`, or an `available` career with no tracks). If you can run it, report the outcome.
4. Manually walk the flow where possible: Dashboard → Learning Hub → Careers → Software Engineering → Tracks → a track → Courses → a course → a lesson → quiz. Also check: back at each level, search with no matches, a coming-soon career, and a small-screen layout.

There is no test script. Do not claim automated tests passed. If a check cannot be run, say so plainly.

### 10. Final report format

When finished, reply with:

- A short summary of what changed.
- A list of files added or modified.
- The exact results of each validation step (passed, failed, or not run, and why).
- Any assumptions you made and anything that needs a human decision.
- What is intentionally not done (for example, courses for coming-soon careers).

---

## Notes for the project owner

- This brief builds the **Careers layer** only. It does not generate courses for Cybersecurity, Teacher, Nursing, and the rest. Each of those needs its own tracks, lessons, and question banks, written and reviewed for accuracy (especially Nursing, Doctor, and Lawyer, where wrong content has real consequences). Once this layer is in place, use the course-generation guidance in `README.md` to add one career at a time, then flip its `status` to `available` and fill in `trackIds`.
- If you want Copilot to pick this file up automatically on every task, you can also copy the stable rules (sections 2, 7, and 9) into `.github/copilot-instructions.md`.
