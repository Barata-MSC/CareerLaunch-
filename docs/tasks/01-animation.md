# Brief 01: Animation and Motion

**Status:** Dashboard motion is implemented and approved. Learning Hub motion was implemented but caused a layout regression (see section 0). Navigator transitions are not done yet. Update this status line after each run.

**Run `02-sfx.md` first** (it creates `AppPressable`, which this brief extends). If `AppPressable` does not exist when you start, create a minimal version with the API described in the SFX brief (`sound` prop, forwards `Pressable` props) and say so in the report.

## Prompt

### 0. Known regression and the layout rule (read first)

A previous Learning Hub motion run broke the layout. After it:

- The course list screen (for example "Secondary Teacher" and "Software Engineer") could no longer be scrolled.
- The lessons screen could no longer be scrolled.
- The pinned **"View Roadmap"** button at the bottom of the course list disappeared.

The correct, original layout is: header with back arrow and career title, search box, status filter chips, a scrollable list of course cards, a **pinned "View Roadmap" button** above the bottom tab bar, and a visible scrollbar on web when the list overflows.

**The layout rule.** Animation is a visual layer only. It must never change layout, scrolling, or which elements render. Concretely:

- Motion wrappers (`AnimatedStage`, `FadeSlideIn`, `Float`, `Pop`) must be **layout-neutral**: where they wrap a screen or a region that fills the available space, they take `flex: 1` (and `minHeight: 0` where needed) so the child keeps the same size it had without the wrapper. A wrapper must never collapse height to its content around a `ScrollView` or `FlatList`.
- The `ScrollView` or `FlatList` stays a direct, height-bounded scroll container. Do not nest it inside a view that has auto height, and do not put it inside another vertical `ScrollView`.
- Pinned footers and headers (the "View Roadmap" button, search box, filter chips, back header) stay **outside** the animated, scrolling region, in the same position in the tree as before. Do not move them inside a stage wrapper, and do not translate them off screen.
- Do not add `overflow: 'hidden'`, absolute positioning, fixed heights, or `pointerEvents` locks to wrappers.
- Do not remove, hide, or conditionally skip any existing UI element (buttons, footers, lists, filters) to make an animation work.
- Compare against the pre-animation version with `git diff` on each touched file before finishing, and confirm only motion-related lines changed.

### 1. Goal

Make CareerLaunch feel alive instead of static, without making it slow or distracting:

- Key elements **gently float** ("levitate") so screens do not feel flat.
- **Screen and stage changes animate** (navigator screens, tabs, and the in-screen state changes in the Learning Hub and course flow).
- Taps, progress, and results give **visual feedback**.

All motion must stay smooth on a mid-range Android phone and in the web phone-frame, and must respect the device's reduce-motion setting. **Layout, scrolling, and existing UI must be identical to the no-animation version** (section 0).

### 2. Read first

- `CLAUDE.md`, `AGENTS.md` (follow its Expo SDK 57 links), `package.json`, `babel.config.js`.
- Check whether `react-native-reanimated` is installed and configured. **If it is, you may use it. If it is not, use React Native's built-in `Animated` API and do not add a dependency.** Stay consistent with what the Dashboard work already uses.
- `src/components/motion/`: read every existing primitive and token first. Reuse them; do not duplicate.
- `src/navigation/RootNavigator.js`, `AuthNavigator.js`, `AppNavigator.js`: which navigator types are used and their current `screenOptions`.
- `src/features/learning-hub/LearningHubScreen/`, `shared/CourseRunner.js`, `shared/screens/`, `shared/components/`, and the careers layer: these change views through **component state**, not navigator routes, so navigator animations will not cover them. Read how the course list screen composes its header, search, filters, list, and pinned "View Roadmap" footer **before** wrapping anything.
- `src/features/dashboard/`: the finished Dashboard motion, as the reference for the approved pattern.
- `src/components/AppPressable.js` (from brief 02).
- The React Navigation 7 docs for the exact transition options each navigator type supports (verify option names before using them).

### 3. Motion system (build once, reuse everywhere)

`src/components/motion/` holds:

- `motionTokens.js`: durations, easings, spring settings, and distances in one place. Starting values: screen transitions 250 to 350 ms, small UI changes 150 to 220 ms, press feedback about 100 ms, float cycle 2.5 to 3.5 s with a 4 to 6 px travel.
- `useReduceMotion.js`: reads the system reduce-motion setting (`AccessibilityInfo`) and updates if it changes.
- `Float.js`: gentle looping vertical bob. Props for amplitude, duration, and phase offset. Pauses when the screen is not focused; static view when reduce motion is on.
- `FadeSlideIn.js`: fade and small slide-up on mount, with optional delay.
- `Pop.js`: quick scale-in with a small overshoot.
- `AnimatedStage.js`: animates between children keyed by a `stageKey`. Props include `direction` (`'forward' | 'back' | 'none'`) and a `style` that defaults to `flex: 1` so it is layout-neutral. It animates only the **incoming content's** opacity and transform. It does not hold two stages mounted, does not set a fixed height, and does not lock touches.

Rules for the primitives:

- Use native-driven transforms and opacity wherever possible. Set `useNativeDriver` only when supported (`Platform.OS !== 'web'` for the core `Animated` API) so web does not log warnings.
- Prefer `transform` (translate, scale) and `opacity`. Avoid animating layout properties on lists.
- Clean up animations on unmount. No leaked loops.
- A re-render with the same `stageKey` must not replay the animation or reset child state.
- When reduce motion is on: no floating, no sliding; use a very short fade or no animation.

### 4. Where to apply it

**Navigation transitions (not done yet)**

- Give stack screens a consistent forward and back transition using the options the installed navigator supports.
- Give the bottom tab switch a light transition if the installed React Navigation version supports a tab animation option (verify in the docs); otherwise leave tabs unanimated and report it.
- Do not change route names or navigation structure. Auth to app switching must not alter the auth flow or the password-recovery flow.

**In-screen stage changes**

- Learning Hub levels (careers to tracks to courses): wrap the **content region only** with `AnimatedStage`, direction-aware (forward when drilling in, back when returning). The pinned footer ("View Roadmap"), search, filters, and header stay outside the stage region.
- `CourseRunner` stages (lesson overview, lesson, lesson list, quiz intro, quiz, results): animate transitions with `AnimatedStage`. Each stage's scroll container must keep scrolling exactly as before. Do not change the state machine, back handling (including Android hardware back), scoring, or saving.

**Floating ("levitating") elements**

Use `Float` sparingly, on at most three or four hero-level elements per screen: dashboard quick-action icons or avatar, the course or career icon on overview screens, and the pass or completion badge on results. Use different phase offsets. Never float items inside long scrolling lists.

**Entrances**

- Staggered `FadeSlideIn` for the first screenful of list items (dashboard cards, careers, tracks, courses, lessons). The last visible item starts no later than about 400 ms. Animate on first mount only. `FadeSlideIn` wrappers around list items must not change item size, spacing, or list scrolling.

**Feedback**

- Press feedback: a quick scale-down (about 0.96 to 0.98) with a spring back on press, opt-out possible. Keep the sound behavior from brief 02 untouched.
- Progress bars: animate smoothly to their new value (prefer scale or transform over width).
- Lesson mark-done: a quick `Pop` on the completion check.
- Quiz: a short highlight on answer selection; on the result screen, count the score up and give a brief emphasis when passed (no confetti library; no new dependencies). A failing result feels neutral and encouraging, not flashy.

### 5. Hard constraints

- No new dependencies. Preserve all route names, course and lesson IDs, `App.js` provider composition, and auth separation.
- No animation may block taps, delay navigation, change layout or scrolling, hide existing UI, or cause content to flash or lose state during transitions (for example, a quiz answer selection must not reset).
- Do not enable `LayoutAnimation` on Android or add global layout animations; they have been unreliable.
- No infinite animations on screens that are not focused.
- Do not run `npm run deploy`, do not commit or push, and do not touch `.env`.

### 6. Docs

Update `CLAUDE.md` with a short "Motion" subsection (the `motion/` folder, the primitives and tokens, the reduce-motion rule, the "use sparingly" rule for `Float`, and the **layout-neutral wrapper rule** from section 0). Mention the motion primitives in the Learning Hub README where it describes shared components.

### 7. Validation

1. `npm run lint`.
2. `npm run validate:content` if Learning Hub files were touched.
3. `npx expo export -p web`.
4. Confirm no `useNativeDriver` warnings on web, and no unused animation code is left behind.
5. Review `git diff` for every touched screen and confirm no layout, scroll, or element-presence changes beyond motion wrappers.
6. Give a **human test checklist**:
   - Every main screen on a physical Android phone (ideally a low-end one) and in the web frame.
   - **Course list screens (Software Engineer and at least one other career such as Teacher): the list scrolls, the scrollbar appears on web when content overflows, and the pinned "View Roadmap" button is visible above the tab bar and opens the roadmap.**
   - **Lessons screen and every CourseRunner stage scroll to the end of their content.**
   - Forward and back navigation; rapid tapping and rapid screen switching.
   - Android hardware back in the course flow.
   - Reduce-motion turned on.
   - Quiz selection stays correct through transitions.
   - No dropped frames while scrolling lists.

There is no test script. Do not claim automated tests passed, and do not claim smoothness you could not measure.

### 8. Final report

Summarize what changed. List files added and modified. Report each validation result (passed, failed, or not run, and why). List where `Float` is used. List anything skipped because the installed libraries did not support it. State explicitly whether scrolling and the "View Roadmap" button were verified (and how). List decisions needed.