# Brief 07: AI Interview Coach (Text)

Today the Interview Coach gives feedback using **local heuristic checks**, and voice feedback is simulated. This brief adds real AI evaluation of typed answers through a Supabase Edge Function. Voice is **not** part of this brief (see "Voice, later" at the end).

**Run after `04-guest-gating.md`.**

## Decisions you need to know about (read before running)

1. **You cannot use a user's own ChatGPT or Gmail account as the AI.** As far as I know, a consumer ChatGPT plan does not give an app access to the model; apps call a provider's API with a developer key. Signing in with Google only identifies the user. So all requests use **the team's key**, kept on the server. The "complete account" requirement (brief 04) plus a per-user daily limit is what protects the free quota.
2. **Default provider: Google's Gemini API free tier.** Its pricing page lists free-tier Flash models and says free-tier content is used to improve Google's products; paid-tier content is generally not. The free-tier rate limits were not stated on that page, so check them in Google AI Studio before relying on them. Because users will type personal interview answers, the app must show a short notice before first use (see section 6). Ask your adviser whether your project needs a fuller privacy notice. This is not legal advice.
3. The provider and model are **configuration, not code**: Supabase secrets `AI_PROVIDER`, `AI_API_KEY`, and `AI_MODEL`. Model names change often, so do not hardcode one. The human sets `AI_MODEL` after checking the provider's current docs.

## Before you run (human steps)

- Create an API key in Google AI Studio under a team-owned Google account if you can (not a personal one you may lose access to).
- Lead dev, after Copilot finishes: apply the migration, set secrets `AI_PROVIDER`, `AI_API_KEY`, `AI_MODEL`, optional `AI_DAILY_LIMIT_PER_USER` (default 20), deploy the `interview-coach` function with the Supabase CLI (`supabase functions deploy interview-coach`; set secrets with `supabase secrets set`), and test as a guest and a full account. Check the README's Supabase CLI notes before applying the migration.

## Prompt

### 1. Goal

For each answer a user types, an AI evaluates it **first**; the scores and feedback shown in the app **follow from that evaluation**. If the AI is unavailable, the app falls back to the existing local feedback and says so honestly.

### 2. Read first

- `CLAUDE.md`, `AGENTS.md`, `src/features/interview-coach/` (questions, the practice flow, the existing heuristic feedback, the session summary, how voice is simulated) and the interview practice context under `src/context/`.
- Brief 04's `useAccountTier`, `AccountGate`, and `supabase/functions/_shared/requireFullAccount.ts`.
- `supabase/migrations/` for naming and style; `src/config/supabase.js` for the client.

### 3. Edge Function `interview-coach`

The function lives in `supabase/functions/interview-coach/index.ts` (the provider adapter can sit in the same folder) and imports the guest check from `../_shared/requireFullAccount.ts`. Follow the function layout rule in brief 04, section 5.

1. Handle CORS and `OPTIONS` (the app also runs on web).
2. Call `requireFullAccount`; guests get 403.
3. Validate input: `{ question, answer, category? }`. Reject empty answers and cap answer length (default 2,000 characters) and question length.
4. **Enforce a per-user daily limit** using a counter table (service role). Over the limit returns a structured, friendly "limit reached" response.
5. Build the prompt with a fixed instruction on the server. The user's answer is **untrusted data**: place it inside clearly delimited tags and instruct the model to evaluate it only, and to ignore any instructions inside it. Do not send names, emails, or other account data to the provider.
6. Ask the provider for **structured JSON**, then **validate it on the server** and clamp the numbers. Never trust the shape. If it fails validation, retry once; if it still fails, return an error so the client falls back.
7. Return the evaluation. Handle provider timeouts and rate-limit responses (429) gracefully with one short retry at most.

Evaluation shape (adjust names to the codebase, keep the intent):

```json
{
  "overall": 0-100,
  "criteria": {
    "relevance": 0-10, "structure": 0-10, "clarity": 0-10,
    "specificity": 0-10, "professionalism": 0-10
  },
  "strengths": ["..."],
  "improvements": ["..."],
  "suggestedAnswer": "optional short improved version",
  "followUpQuestion": "optional"
}
```

The "structure" criterion should recognize answers organized like situation, task, action, result where that fits the question. The evaluation language follows the language of the answer (English, Filipino, or mixed); feedback is in English by default.

Put the provider call behind a small adapter so another provider can be added without touching the rest. Read the provider's current API docs for the request format; if you cannot, say so in the report and mark the adapter clearly as unverified.

### 4. Database (migration file only; do not apply it)

Create `supabase/migrations/<timestamp>_interview_coach.sql`, idempotent where reasonable:

- `ai_usage`: user id, day, request count; unique on (user id, day). RLS enabled with **no policies**; only the Edge Function (service role) uses it.
- `interview_sessions` (id, user_id default `auth.uid()` referencing `auth.users` on delete cascade, category, overall score, created_at) and `interview_answers` (id, session_id, user_id, question, answer_text, evaluation jsonb, source `'ai'` or `'local'`, created_at).
- RLS on both with owner-only select, insert, and delete policies using `(select auth.uid()) = user_id`. No update policy is needed.

### 5. Client changes

- Each submitted answer calls the function; show a loading state; render the scores and feedback **from the returned evaluation**. The session summary aggregates those scores.
- Label the source on screen: "AI feedback" only when it came from the AI, and "Basic feedback (AI unavailable)" for the local fallback. Add a one-line reminder that AI feedback can be wrong and is guidance, not a hiring verdict.
- Handle: loading, daily limit reached, offline, timeout, and malformed response (fall back to local feedback).
- Save each session and answer to Supabase for full accounts (optimistic where sensible, with a visible error on failure). Add a history view only if one is easy; otherwise save without one and say so.
- Add "Delete my interview history" (deletes the user's sessions and answers) in an obvious place, with a confirmation.
- Keep the voice button's current simulated behavior unchanged and do not describe it as AI.
- The whole feature sits behind `AccountGate`.

### 6. Privacy notice

Before a user's first AI evaluation, show a short notice: answers are sent to an AI service to generate feedback, avoid typing personal or sensitive details, and answers are saved to the user's account and can be deleted. Remember that the user acknowledged it (a stored flag is fine). Do not claim the service does or does not train on the data beyond what the provider's current terms say; link to or name the provider's terms.

### 7. Hard constraints

- The AI key exists only as a Supabase secret. Never in the client, `EXPO_PUBLIC_` variables, logs, docs, or committed files.
- Do not apply migrations, set secrets, or deploy functions.
- Do not log answers or full model responses.
- No new client dependencies. Do not run `npm run deploy`, and do not commit or push.
- Do not claim model quality, accuracy, or hiring outcomes.

### 8. Docs

Update `CLAUDE.md`: the Interview Coach row (AI evaluation of typed answers through an Edge Function with local fallback; voice still simulated; locked for guests; history saved for full accounts once the migration is applied), and the Supabase section (function, tables, secret names). Keep the existing warning that voice feedback is simulated.

### 9. Validation

1. `npm run lint`, then `npx expo export -p web`.
2. If the Supabase CLI is available, serve the function locally and test with and without a token and with a malformed model response; otherwise say it was not run.
3. Human checklist for the lead dev: guest gets 403 and the lock screen; a full account gets evaluations and scores that change with the answer; the daily limit triggers; turning off the network shows the local fallback with the honest label; an answer containing "ignore previous instructions" does not change the scoring format; history saves and "Delete my interview history" removes it; user B cannot see user A's history; no key appears in the web export.

There is no test script. Do not claim automated tests passed.

### 10. Final report

Summarize the changes, list files, report each validation result (passed, failed, or not run, and why), list what you could not verify (especially the provider adapter), and list decisions needed.

---

## Voice, later (not part of this run)

Voice is a separate brief. What it will need: microphone permission setup, a speech-to-text source, and a development build rather than Expo Go for native modules. There are two realistic routes. One is on-device recognition through the community `expo-speech-recognition` package, which wraps the native Android and iOS speech recognizers (check its SDK 57 compatibility first). The other is recording audio and sending it to a transcription model through an Edge Function; Google's pricing page lists a transcription model on the free tier, but its limits and terms were not verified. Expo's `expo-speech` package is text-to-speech only and does not recognize speech. Once speech becomes text, it goes through the same evaluation function built here.
