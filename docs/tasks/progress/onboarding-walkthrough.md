# Onboarding Walkthrough Build Checkpoint

**Brief:** `docs/tasks/11-onboarding-walkthrough.md`  
**Status:** Implementation complete; account/device behavior remains for human verification.

## Inspection findings

- The authenticated navigator opens the Dashboard tab first. The brief suggested Learning Hub as a likely landing screen; repository routing showed that `DashboardScreen` is the actual post-login landing screen.
- Email login, sign-up, and guest sign-in transition through the session change observed by the root navigator.
- The profile context provides the session user ID, guest status, profile data, and loading state. Guest upgrade preserves the user ID.
- AsyncStorage is already used in the app. The walkthrough uses it without a new dependency or backend migration.
- The Profile screen was selected for Replay tutorial for both guest and full-account profiles.
- The copy describes existing Learning Hub, Career Assessment, Resume Builder, Application Tracker, and Interview Coach functionality. It does not present Job Finder, Coach AI, voice features, or coming-soon careers as available.

## Implementation

- [x] Added five data-driven steps and walkthrough version `1`.
- [x] Added pure preference logic and a versioned stored value containing only `dismissed`, `version`, and `at`.
- [x] Added per-user AsyncStorage read/write, an automatic display gate, in-session guard, replay, session-only skip, and explicit preference save handling.
- [x] Added a centered, dimmed modal with progress, Back/Next/Get started, Skip, backdrop dismissal, Android-back dismissal, and “Don't show this again” on each step.
- [x] Made the card scrollable, limited its maximum height to the viewport available inside the modal padding, and used the existing reduced-motion helper to disable the fade when requested.
- [x] Kept the web walkthrough overlay inside the app's 390px phone frame instead of using the web `Modal` portal. The overlay now inherits the Dashboard frame's content width; its 20px side padding keeps the card within the simulated mobile screen. Native platforms continue using `Modal`.
- [x] Mounted the modal on Dashboard after the signed-in user's profile and preference are loaded; added Profile replay actions for guest and full-account views.
- [x] Added `scripts/validate-walkthrough.mjs` and the `validate:walkthrough` npm script. The validator uses Babel's CommonJS transform and a local module loader, matching the existing assessment validator approach; it requires no Expo runtime or device.
- [x] Updated `docs/tasks/README.md`, the root README, and `CLAUDE.md`.

## Behavior decisions

- “Don't show this again” and final “Get started” save the current version and close.
- Skip, Android back, and backdrop dismissal close only for the current JavaScript app session.
- Automatic display is limited to once per user per app session. Explicit Profile replay bypasses this guard and the saved preference without changing the preference.
- A preference-read error suppresses automatic display. A save error is shown in the modal and leaves it open for retry.
- Guests receive the walkthrough; copy identifies gated tools as requiring a full account.
- Preference is local to this device and keyed by stable user ID. Logging out does not clear it; it is not synced across devices.
- No spotlight overlay, image/audio assets, dependencies, or migration were added.

## Validation and human checks

- `npm run validate:walkthrough`: passed (5 steps, version 1).
- `npm run validate:assessment`: passed (36 items, deterministic scoring and matching, registered career coverage).
- `npm run validate:content`: passed (10 careers, 18 tracks, 119 courses).
- `npm run lint`: passed.
- `npx expo export -p web`: passed; exported to `dist/`.
- `git diff --check`: passed.
- Manual login, guest, restart, Android-back, backdrop, replay, and small-screen/device checks: not run. These require interactive account/device testing.

Human verification checklist:

1. Sign in using a full account and a guest account; verify the walkthrough opens after the profile loads.
2. Skip, navigate away and return, and verify it stays closed in the current app session; restart and verify it appears again unless opted out.
3. Select “Don't show this again”; verify it stays closed after logout/login and restart.
4. Use Profile > Replay tutorial after opting out; verify the tour opens without changing the stored preference.
5. Verify Back/Next, Get started, Skip, backdrop dismissal, and Android hardware back.
6. Verify preference read/write failure handling and small-phone, landscape, and larger-font layouts.