# Brief 08: Voice Input for the Interview Coach

Today the Interview Coach's voice feedback is **simulated**: nothing is recorded, transcribed, or analyzed. This brief replaces the simulation with real speech-to-text. The spoken answer becomes text, and that text goes through the **same AI evaluation built in brief 07**. The AI never hears audio in this brief; it only evaluates the transcript.

**Run after `04-guest-gating.md` and `07-ai-coach.md`.**

## Decisions you need to know about (read before running)

1. **Voice needs a development build, not Expo Go.** Speech recognition uses native code. Anyone testing voice must run a development build (see human steps). Expo Go and the web preview will not have it, so the app must still work fully without voice.
2. **Default route: on-device recognition through the community `expo-speech-recognition` package.** It wraps the phone's own speech recognizers, needs no extra server, and needs no key. This is the only intended new dependency in this brief. Depending on the device and settings, the operating system's speech service may itself send audio to its vendor; the app must not claim that audio "never leaves the device".
3. **Not chosen for now: recording audio and sending it to a transcription model** through an Edge Function. It costs quota, adds privacy concerns, and needs audio upload handling. Do not build it in this run.
4. **Spoken answers are less polished than typed ones.** Filler words and pauses are normal. The evaluation should judge content, structure, and clarity, not punish transcription artifacts. Speech recognition can be wrong; the learner must be able to review and edit the transcript before it is evaluated.
5. **Accuracy limits.** Recognition quality varies by device, language, accent, and background noise. Do not claim the app measures pronunciation, tone, confidence, pace, or fluency. This brief evaluates what was said, as text.

## Before you run (human steps)

- Make sure at least one teammate can build and run a **development build** of the app on an Android phone (and iOS only if someone has the setup). Follow the Expo SDK 57 documentation linked from `AGENTS.md`. Without a development build, Copilot can write the code but nobody can test it.
- Decide whether to approve one new dependency (`expo-speech-recognition`). If the team says no, stop; this brief needs it.
- Lead dev: nothing new for Supabase. Brief 07's function and tables are reused.

## Prompt

### 1. Goal

A learner can tap a microphone button, speak an answer to an interview question, see the transcript appear, edit it if needed, and submit it. The submitted transcript is evaluated exactly like a typed answer (brief 07), with the same labels, fallback, limits, and history. If voice is not available (Expo Go, web, a denied permission, or an unsupported device), the learner can still type, and the app says why voice is unavailable.

### 2. Read first

- `CLAUDE.md`, `AGENTS.md` (follow its link to the Expo SDK 57 docs), `package.json`, and `app.config.js`.
- The package's current documentation and compatibility notes for **Expo SDK 57 and React Native 0.86**. **Verify compatibility before installing.** If it is not compatible with SDK 57, stop, report exactly what you found, and do not install a different or older package without asking.
- `src/features/interview-coach/` (the screens, how the voice button works today, and how a typed answer is submitted to the brief-07 evaluation) and the interview practice context under `src/context/`.
- Brief 04's `AccountGate` and `useAccountTier`. Voice sits inside the already-gated Interview Coach.
- Brief 07's evaluation call, its source labels, its limit-reached and offline handling, and its privacy notice.

### 3. Build

**A. Capability check.** Create one small helper (for example `useVoiceInput` in the interview-coach feature) that reports `{ available, listening, transcript, error, start, stop }`. `available` is true only if the native module is present and recognition is supported on this device and platform. Detect absence safely (Expo Go, web) without crashing. Wrap all native calls in try/catch; voice failures must never crash or freeze the screen.

**B. Permissions and config.** Add the package's config plugin and the required microphone and speech-recognition permission strings to `app.config.js`, following the package docs. Write the permission rationale in plain, honest language (for example, that the microphone is used so the learner can speak interview answers). Request permission only when the learner first taps the microphone, never at app launch. Handle: granted, denied, and "denied permanently" (explain how to enable it in system settings; do not nag).

**C. Interview screen behavior.**

- A microphone button next to the answer box. States: idle, requesting permission, listening (visible indicator and a clear stop control), processing, error, and unavailable.
- Show the transcript in the existing answer text field as it arrives (interim results may update it live). Stopping recognition leaves the text editable.
- The learner reviews and edits, then submits with the **same Submit action** as a typed answer. Do not auto-submit.
- Respect the answer length cap from brief 07 (2,000 characters by default); trim or stop with a clear message if it is exceeded.
- Language: default to English. If the package supports choosing a recognition language, expose English and Filipino as an option only if it is easy and verified; otherwise leave English only and say so in the report.
- Stop recognition when the learner leaves the screen, the app goes to the background, or the question changes. No microphone should stay open.
- Remove the simulated voice behavior. Do not leave fake voice feedback in the app. Where the old simulation was referenced in screens, summaries, or docs, replace it.

**D. Honest copy.**

- When voice is unavailable, show a short reason (for example, "Voice input needs the full app build and isn't available here. You can type your answer.").
- Near the microphone or in the brief-07 privacy notice, add one line: speech is converted to text by your device's speech service, and the text is sent to the AI service for feedback. Do not state that audio is or is not processed off-device; say it depends on the device and its settings.
- Keep brief 07's labels: "AI feedback" or "Basic feedback (AI unavailable)". Voice answers use the same labels.
- Do not describe the feature as measuring pronunciation, confidence, tone, or delivery.

**E. Saving.** Voice answers are saved through the same brief-07 session and answer records as typed answers. Do **not** store audio or recordings anywhere. If it is easy, note `input: 'voice' | 'text'` in the saved evaluation JSON; otherwise skip it and do not change the schema. If a schema change would be needed, say so in the report rather than adding a migration.

### 4. Hard constraints

- The only new dependency allowed is `expo-speech-recognition`, and only after the compatibility check passes. Report the exact version installed.
- Do not record or store audio. Do not send audio to any server in this brief. Do not log transcripts.
- Do not change the Supabase schema, migrations, or Edge Functions. Do not touch `.env`.
- Never claim voice works on a device you did not test. Never claim speech recognition is accurate.
- Do not run `npm run deploy`, and do not commit or push.
- Keep the app working without voice (Expo Go, web, no permission).

### 5. Docs

Update `CLAUDE.md`: the Interview Coach row (voice input converts speech to text on supported development builds; the transcript is evaluated like a typed answer; no audio is stored; unavailable in Expo Go and on unsupported platforms), the technology section (the new package, the need for a development build), and **remove the warning that voice feedback is simulated** only to the extent the code now matches. Update the root `README.md` run instructions with a short "Testing voice" section explaining that a development build is required.

### 6. Validation

1. `npm run lint`, then `npx expo export -p web` (voice must degrade gracefully on web; the bundle must build).
2. If a development build is available, run it on a device; otherwise say it was not run.
3. Human checklist for a teammate with a development build: first tap shows the permission request; granting it starts listening; the transcript appears and can be edited; stopping works; submitting gets the same AI evaluation and label as a typed answer; denying the permission shows a clear message and typing still works; leaving the screen or backgrounding the app stops listening; in Expo Go and on web, voice shows the unavailable message and nothing crashes; a long answer is capped with a message; no audio file or transcript appears in logs; the simulated voice feedback is gone.

There is no test script. Do not claim automated tests passed.

### 7. Final report

Summarize the changes, list files, report each validation result (passed, failed, or not run, and why), state the installed package version and the result of the compatibility check, list what you could not verify (especially real-device behavior), and list decisions needed.
