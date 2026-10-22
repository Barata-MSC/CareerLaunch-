# Brief 01: Animation and Motion Report

**Status:** The requested dashboard-only motion scope is implemented; app-wide motion from the original brief is intentionally excluded. Lint and web export passed; manual device checks remain unrun.
**Date:** 2026-10-21
**Implementation:** React Native's built-in `Animated` API; no animation dependency was added.

## Implemented Scope

- Shared dashboard motion primitives and timing values live in `src/components/motion/`: `Float`, `FadeSlideIn`, `AnimatedProgressFill`, `useReduceMotion`, and `motionTokens.js`.
- Dashboard quick-action entrances are staggered; the first three icons float within static-size buttons. `Float` pauses when the Dashboard is unfocused.
- The Dashboard profile progress fill animates to its value. Profile-card, quick-action, and checklist press scaling is explicitly enabled on the Dashboard only.
- `useReduceMotion` tracks the system setting and disables the dashboard effects when enabled. Existing sound behavior is unchanged.
- `AppPressable` press scaling defaults off elsewhere. Stack and tab transitions are explicitly static.

## Explicitly Excluded

- Learning Hub career, track, course, and lesson-list entrances, progress fills, and stage transitions are static.
- `CourseRunner` lesson, quiz, and result stages are static; answer selection, lesson completion, score counting, and result emphasis have no motion effects.
- `AnimatedStage` and `Pop` were removed because they were only used by the excluded Learning Hub/course effects. No route names, registry entries, learning state, scoring, or persistence behavior were changed.

## Validation

| Check | Result |
|---|---|
| `npm run lint` | Passed after restricting motion to the Dashboard. |
| `npx expo export -p web` | Passed after restricting motion to the Dashboard; no `useNativeDriver` warnings appeared in export output. |
| Automated test suite | Not available; `package.json` has no test script. |

## Manual Checklist

Not run in this session. Verify the retained dashboard effects on the web phone frame and a physical Android device, ideally a lower-end device:

- Confirm the Dashboard quick-action entrance, first three floating icons, profile progress fill, and press scaling.
- Toggle system reduce motion on and off and confirm all dashboard motion becomes static when enabled.
- Navigate to Learning Hub and course screens and confirm their transitions, lists, progress bars, quiz selection, and results remain static while normal behavior still works.
- Switch tabs and navigate through the app to confirm global transitions remain static and taps are not delayed.

## Scope Notes

The post-pull conflicts were resolved while retaining main's career registry and dynamic course-route registration. No deployment, commit, or push was performed.
