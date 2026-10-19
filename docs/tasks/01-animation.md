# Brief 01: Animation and Motion

**Run `02-sfx.md` first** (it creates `AppPressable`, which this brief extends). If `AppPressable` does not exist when you start, create a minimal version with the API described in the SFX brief (`sound` prop, forwards `Pressable` props) and say so in the report.

## Prompt

### 1. Goal

Make CareerLaunch feel alive instead of static, without making it slow or distracting:

- Key elements **gently float** ("levitate") so screens do not feel flat.
- **Screen and stage changes animate** (navigator screens, tabs, and the in-screen state changes in the Learning Hub and course flow).
- Taps, progress, and results give **visual feedback**.

All motion must stay smooth on a mid-range Android phone and in the web phone-frame, and must respect the device's reduce-motion setting.

### 2. Read first

- `CLAUDE.md`, `AGENTS.md` (follow its Expo SDK 57 links), `package.json`, `babel.config.js`.
- Check whether `react-native-reanimated` is installed and configured. **If it is, you may use it. If it is not, use React Native's built-in `Animated` API and do not add a dependency.**
- `src/navigation/RootNavigator.js`, `AuthNavigator.js`, `AppNavigator.js`: which navigator types are used (native stack, JS stack, bottom tabs) and their current `screenOptions`.
- `src/features/learning-hub/LearningHubScreen/`, `shared/CourseRunner.js`, `shared/screens/`, `shared/components/`: these change views through **component state**, not navigator routes, so navigator animations will not cover them.
- `src/features/dashboard/`: the dashboard layout and quick actions.
- `src/components/AppPressable.js` (from brief 02).
- The React Navigation 7 docs for the exact transition options each navigator type supports (verify option names before using them).

### 3. Motion system (build once, reuse everywhere)

Create `src/components/motion/` with:

- `motionTokens.js`: durations, easings, spring settings, and distances in one place. Suggested starting values (tune as needed): screen transitions 250 to 350 ms, small UI changes 150 to 220 ms, press feedback about 100 ms, float cycle 2.5 to 3.5 s with a 4 to 6 px travel.
- `useReduceMotion.js`: a hook that reads the system reduce-motion setting (`AccessibilityInfo`) and updates if it changes.
- `Float.js`: wraps children in a gentle looping vertical bob. Props for amplitude, duration, and a phase offset so neighbors do not move in sync. Pauses when the screen is not focused and is a static view when reduce motion is on.
- `FadeSlideIn.js`: fade and small slide-up on mount, with an optional delay (for staggered lists).
- `AnimatedStage.js`: animates between children keyed by a `stageKey` (fade and slide when the key changes). Used for in-screen view switches.
- `Pop.js`: quick scale-in with a small overshoot (for checkmarks, badges, and pass states).

Rules for the primitives:

- Use native-driven transforms and opacity wherever possible. Set `useNativeDriver` only when supported (`Platform.OS !== 'web'` for the core `Animated` API) so web does not log warnings.
- Prefer `transform` (translate, scale) and `opacity`. Avoid animating layout properties on lists.
- Clean up animations on unmount. No leaked loops.
- When reduce motion is on: no floating, no sliding; use a very short fade or no animation.

### 4. Where to apply it

**Navigation transitions**

- Give stack screens a consistent forward and back transition using the options the installed navigator supports (for example a slide or fade-from-bottom style).
- Give the bottom tab switch a light transition if the installed React Navigation version supports a tab animation option (verify in the docs); otherwise leave tabs unanimated and report it.
- Do not change route names or navigation structure. Auth to app switching should feel smooth but must not alter the auth flow or the password-recovery flow.

**In-screen stage changes**

- Learning Hub level changes (careers to tracks to courses, if the careers brief is merged; otherwise tracks to courses): wrap with `AnimatedStage`, with a direction-aware feel (forward slides one way, back the other) if practical.
- `CourseRunner` stages (lesson overview, lesson, lesson list, quiz intro, quiz, results): animate transitions using `AnimatedStage`. Do not change the state machine, back handling (including Android hardware back), scoring, or saving.

**Floating ("levitating") elements**

Use `Float` sparingly, on at most three or four hero-level elements per screen, for example: dashboard quick-action icons or avatar, the course or career icon on overview screens, and the pass or completion badge on results. Use different phase offsets. Never float items inside long scrolling lists.

**Entrances**

- Staggered `FadeSlideIn` for the first screenful of list items (dashboard cards, careers, tracks, courses, lessons). Cap the stagger so the last visible item starts no later than about 400 ms. Animate on first mount only, not on every scroll or re-render.

**Feedback**

- `AppPressable`: add a quick scale-down (about 0.96 to 0.98) with a spring back on press. Allow opting out with a prop. Keep the sound behavior from brief 02 untouched.
- Progress bars: animate smoothly to their new value instead of jumping (prefer a scale or transform approach over animating width where practical).
- Lesson mark-done: a quick `Pop` on the completion check.
- Quiz: a short highlight on answer selection; on the result screen, count the score up and give a brief emphasis when passed (no confetti library; no new dependencies). A failing result should feel neutral and encouraging, not flashy.

### 5. Hard constraints

- No new dependencies. Preserve all route names, course and lesson IDs, `App.js` provider composition, and auth separation.
- No animation may block taps, delay navigation, or cause content to flash or lose state during transitions (for example, a quiz answer selection must not reset).
- Do not enable `LayoutAnimation` on Android or add global layout animations; they have been unreliable.
- No infinite animations on screens that are not focused.
- Do not run `npm run deploy`, do not commit or push, and do not touch `.env`.

### 6. Docs

Update `CLAUDE.md` with a short "Motion" subsection (the `motion/` folder, the primitives and tokens, the reduce-motion rule, the "use sparingly" rule for `Float`). Mention the motion primitives in the Learning Hub README where it describes shared components.

### 7. Validation

1. `npm run lint`.
2. `npx expo export -p web`.
3. Confirm no `useNativeDriver` warnings on web, and no unused animation code is left behind.
4. Give a **human test checklist**: every main screen on a physical Android phone (ideally a low-end one) and in the web frame; forward and back navigation; rapid tapping and rapid screen switching; Android hardware back in the course flow; reduce-motion turned on; quiz selection stays correct through transitions; no dropped frames while scrolling lists.

There is no test script. Do not claim automated tests passed, and do not claim smoothness you could not measure.

### 8. Final report

Summarize what changed, list files added and modified, report each validation result (passed, failed, or not run, and why), list where `Float` is used, list anything skipped because the installed libraries did not support it, and list decisions needed.
