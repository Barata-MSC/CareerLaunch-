# Brief 02: Sound Effects (SFX)

**Run this before `01-animation.md`.** It creates the shared `AppPressable` button wrapper that the animation brief extends.

## Before you run (human steps)

1. Get the audio files and put them in `src/assets/sounds/`:
   - `lesson-complete.mp3` (a short, positive "done" sound, about 0.5 to 1 second)
   - `quiz-pass.mp3` (a short success jingle, about 1 to 2 seconds)
   - The existing tap sound is already in the project; Copilot will find it. Do not rename it unless the brief's checks require it.
2. Use sounds you made or that are licensed for free use in a school project. Keep each file small (ideally under 100 KB) and normalize volumes so none is much louder than the tap.
3. Add a line per new file to `src/assets/sounds/CREDITS.md` (source, author, license). Copilot will create the file if it is missing, but you must fill in the real details.

## Prompt

### 1. Goal

Make sound feedback consistent across CareerLaunch:

- A **tap** sound whenever the user taps a button or tappable control.
- A **lesson-complete** sound when the user marks a lesson as done.
- A **quiz-pass** sound when the user passes a course quiz.

### 2. Read first

- `CLAUDE.md`, `AGENTS.md` (follow its link to the Expo SDK 57 docs; check the audio library docs for the version actually installed).
- `package.json` and `app.config.js`: which audio library is installed (for example `expo-audio` or a legacy one) and any audio plugin config.
- `src/utils/`: find the existing tap-sound code and any other sound helper. Reuse and extend it instead of creating a second system.
- `src/features/learning-hub/shared/CourseRunner.js` and `shared/screens/`: the README says `CourseRunner` already handles sounds. Find every place sounds are currently played so you do not double-play.
- Every interactive control across `src/features/` and `src/components/` (`Pressable`, `TouchableOpacity`, `Button`, and similar).

Do not add a new audio dependency if one is already installed and supported on SDK 57. If the installed library is not supported on SDK 57, tell the user in the report and propose the smallest fix before migrating.

### 3. Build the sound module

Create or extend a single sound module in `src/utils/` (match the existing file name and style if one exists). It must:

- Define a `SOUNDS` map: `tap`, `lessonComplete`, `quizPass`, each pointing to its asset.
- Export `playSound(name)` that returns quickly and **never throws**. Wrap loading and playback in try/catch; a missing or failed sound must not crash or block the UI.
- Load or preload each sound once and reuse the player. To replay, restart from the beginning (for example seek to 0, then play) rather than creating a new player per tap.
- Allow rapid taps: a new tap restarts the tap sound; do not queue a backlog of overlapping sounds. Different sounds (for example tap and lesson-complete) may overlap briefly.
- Respect a global **sound enabled** flag (see section 6).
- Configure audio mode once at startup so sounds play as intended (decide silent-mode behavior deliberately and document it in a code comment).
- Work on web without errors (browsers only allow audio after a user gesture, which taps satisfy). If playback is blocked, fail silently.

Reference points from the Expo SDK 57 audio docs (verify against the installed version before relying on them): `useAudioPlayer` with a `require()`d asset for in-component players, `createAudioPlayer` for players outside components (the docs say you must clean these up), seeking to 0 before `play()` to replay, and `setAudioModeAsync` with `playsInSilentMode` for silent-mode behavior.

### 4. Shared button: `AppPressable`

Create `src/components/AppPressable.js` (check `babel.config.js` for the `@components` alias):

- Wraps React Native `Pressable`, forwards all `Pressable` props, and accepts `sound` (default `'tap'`; pass `'none'` to silence, or another `SOUNDS` key).
- Plays the sound on press (use `onPressIn` or `onPress`; pick one and apply it consistently so there is no perceptible lag and no double firing).
- Does not play when `disabled`.
- Preserves accessibility props (`accessibilityRole`, `accessibilityLabel`, `accessibilityState`) and keyboard behavior on web.
- Leave a clearly marked place where press animation will be added by `01-animation.md`. Do not implement animation here.

Migrate existing interactive controls to `AppPressable` across the app so every button taps consistently. Keep each control's current handler, styling, and layout exactly as they are. Where a screen already plays a tap sound by its own code, remove the duplicate so each tap makes one sound. Controls that should stay silent (for example, a text input, or a control that already plays a more specific sound) use `sound="none"`.

### 5. Lesson-complete and quiz-pass sounds

- **Lesson complete:** play `lessonComplete` only when the user marks a lesson complete. Do not play on unmark, on screen load, when progress loads from the database, or when a failed save reverts the change. Inspect `useCourseProgress` to choose the correct moment (the hook updates optimistically and rolls back on error). The tap sound on that control should not also play on top of it; use `sound="none"` there.
- **Quiz pass:** play `quizPass` once when the result screen shows a score at or above `passingPercent`. Do not play on a failing result, on re-render, or when returning to the result screen without a new attempt. Guard against repeat plays (for example with a ref keyed to the attempt).
- Do not change scoring, saving, or progress logic.

### 6. Sound on/off setting

- Add a global enabled flag stored in AsyncStorage (already a dependency) under a clearly named key, defaulting to on. Load it at startup.
- Add a simple toggle in the Profile area if there is an obvious settings section. If there is not, expose the flag in the module and say so in the report rather than redesigning the profile screen.

### 7. Hard constraints

- No new dependencies unless unavoidable (report why if you add one).
- Keep diffs focused; do not restyle controls or change navigation.
- Do not run `npm run deploy`, do not commit or push, and do not touch `.env`.
- Do not claim the sounds were heard working. You cannot hear them; report what you verified (code paths, lint, build) and what a human must verify.

### 8. Docs

Update `CLAUDE.md` (add a short "Sound" subsection under conventions: the sound module, `AppPressable`, the enabled flag, where assets live, the credits file) and the Learning Hub README where it mentions sounds in `CourseRunner`.

### 9. Validation

1. `npm run lint`.
2. `npx expo export -p web`.
3. Search the code to confirm no remaining raw `Pressable`/`TouchableOpacity` button needs migration (list any intentionally left).
4. Provide a short **human test checklist** for the team: tap sounds on every main screen; rapid tapping; lesson mark done and undo; passing and failing a quiz; sound toggle on and off; phone in silent mode; web in a browser; app returning from background.

There is no test script. Do not claim automated tests passed.

### 10. Final report

Summarize the changes, list files added and modified, report each validation result (passed, failed, or not run, and why), list assumptions and decisions needed, and list what a human must verify by ear.
