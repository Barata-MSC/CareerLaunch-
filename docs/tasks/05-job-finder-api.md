# Brief 05: Job Finder with Philippine Job Listings

**Run after `04-guest-gating.md`.** The Job Finder currently shows a static list of sample jobs. This brief replaces it with real Philippine listings fetched through a Supabase Edge Function, with caching and a hard request budget, because the free plan allows very few requests.

## Before you run (human steps)

1. **Get a free API key.** The default provider is JSearch on RapidAPI (the free plan was described as 200 requests per month with no card; confirm the current limits on the listing).
2. **Run the coverage test** locally. Never commit the key; set it in your shell only:

   ```
   JSEARCH_API_KEY=your_key node scripts/job-api-coverage-test.mjs --save
   ```

   It uses 6 requests and writes `docs/tasks/progress/job-api-coverage.md` plus `job-api-sample.json` (the real response shape).
3. **Decision gate.** Continue only if the report says PASS (at least 4 of 6 queries returned 5 or more Philippine listings with apply links). If it fails, stop and pick another provider before running this brief. A candidate is Techmap's free tier, which has **not** been verified for Philippine coverage or terms.
4. **Lead dev, after Copilot finishes:** apply the generated migration; set secrets `JOB_API_KEY`, and optionally `JOB_API_MONTHLY_CAP` (default 180, below the 200 free limit), `JOB_CACHE_TTL_HOURS` (default 72); deploy the `job-search` function with the Supabase CLI (`supabase functions deploy job-search`; set secrets with `supabase secrets set`); test as a guest and as a full account. Check the README's Supabase CLI notes before applying the migration.

## Prompt

### 1. Goal

Job Finder lists Philippine job postings from a provider API, through a server-side proxy. The app must never contain the provider key. Free-tier limits must never be exceeded by normal use.

### 2. Read first

- `CLAUDE.md`, `AGENTS.md`, and `docs/tasks/progress/job-api-coverage.md` and `job-api-sample.json`. **Build the normalizer against the real sample; do not guess field names.** If the sample is missing, stop and tell the human to run the coverage test.
- `src/features/job-finder/` (screens, categories, the static listing data, how job details and external links work) and `src/features/job-tracker/` plus its context (how a job is handed to the tracker).
- `src/features/auth/` account-tier hook, `AccountGate`, and `supabase/functions/_shared/requireFullAccount.ts` from brief 04.
- `src/config/supabase.js` and `supabase/migrations/` (naming and style of existing migrations).
- The provider's current terms: attribution, caching, and storage rules. Summarize what you found in the report; if you cannot access the terms, say so.

### 3. Architecture

App, then Edge Function `job-search`, then cache or provider. The function lives in `supabase/functions/job-search/index.ts` (the provider adapter can sit in the same folder) and imports the guest check from `../_shared/requireFullAccount.ts`. Follow the function layout rule in brief 04, section 5. The function:

1. Handles CORS and `OPTIONS` (the app also runs on web).
2. Calls `requireFullAccount` (guests get 403).
3. Accepts a small request: `{ category, page }`. Categories come from a fixed server-side map to query strings (for example "software developer in Philippines"); **no free-text queries to the provider in this version.** Keyword filtering happens on the client over already-fetched results.
4. Looks up the cache by a hash of the normalized query and page. If a fresh entry exists (default TTL 72 hours), return it with no provider call.
5. If stale or missing, check the **monthly request budget**. If the budget is exhausted, return stale cache if any, otherwise a structured "quota exhausted" response. Never call the provider past the cap.
6. Otherwise call the provider with the country fixed to the Philippines, **filter out any result whose country is not the Philippines**, normalize, store in the cache, increment the usage counter, and return.
7. Also limit how many uncached refreshes a single user can trigger per day (default 5) so one account cannot burn the budget.

Response shape: `{ jobs, source: 'cache' | 'live' | 'stale', fetchedAt, quotaExhausted }`.

Normalized job (provider-agnostic, defined in one adapter file so the provider can be swapped): `externalId, source, title, company, location, employmentType, postedAt, applyUrl, description` (trimmed to a sensible length). Keep only fields the UI needs.

Budget math to document in code comments: about 6 requests a day on the free plan. With a 72-hour TTL and about 8 categories, normal use should refresh roughly 80 times a month at most, leaving headroom.

### 4. Database (migration file only; do not apply it)

Create `supabase/migrations/<timestamp>_job_search_cache.sql` (follow the existing naming). Make it idempotent where reasonable.

- `job_search_cache`: query key (unique), category, page, results (jsonb), fetched_at, expires_at.
- `api_usage`: provider, month (for example `2026-10`), request_count; unique on (provider, month).
- Enable Row Level Security on both with **no policies**, so the app (anon and authenticated roles) cannot read or write them. Only the Edge Function, using the service role on the server, touches these tables.
- Do not store user-identifying data or raw search text beyond the category.

### 5. Client changes

- Job Finder loads jobs through the Edge Function (via the existing Supabase client's function invocation). Keep the existing category UI, job detail screen, and external-link behavior.
- Handle loading, empty, error with retry, and offline states. Show "Updated {time ago}" using `fetchedAt`.
- When `quotaExhausted` is true and there is nothing cached, or when the call fails, fall back to the bundled sample listings and show a clear banner: "Showing sample listings. Live listings are unavailable right now." Never present sample data as live.
- Show the provider attribution or link-back the provider's terms require. Use the wording "Listings from {provider}", never "live market data".
- Keep the "Apply" behavior as opening the external link. Do not claim anything was submitted to an employer.
- Hand jobs to the Application Tracker using the normalized shape (`source`, `externalId`, `title`, `company`, `location`, `applyUrl`) so brief 06 can persist them. Static sample jobs use `source: 'sample'`.
- The whole screen sits behind `AccountGate`.

### 6. Hard constraints

- The provider key exists only as a Supabase secret read by the Edge Function. Never in the client, `EXPO_PUBLIC_` variables, logs, docs, or committed files.
- Do not apply migrations, set secrets, or deploy functions. Write the code and migration; the lead dev deploys.
- No scraping of any job site. Use only the configured provider's API.
- No new client dependencies.
- Do not run `npm run deploy`, and do not commit or push.
- Do not log full responses or user identifiers.

### 7. Docs

Update `CLAUDE.md`: the Job Finder row (API-backed through an Edge Function with caching, sample fallback, locked for guests; no claim of "live" data), the Supabase section (new function, tables, secret names, no key in the client), and the "do not assume" notes. Add a short setup section to the root `README.md` listing the secrets the lead dev must set.

### 8. Validation

1. `npm run lint`, then `npx expo export -p web`.
2. If the Supabase CLI is available, serve the function locally and test with and without a token; if not, say it was not run.
3. Human checklist for the lead dev: guest gets 403 and the lock screen; a full account sees listings; a second identical request is served from cache and does **not** increase `api_usage`; hitting the budget cap returns cached or sample data with the banner; a provider error shows the fallback; no non-Philippine listings appear; no key appears in the app bundle (search the web export).

There is no test script. Do not claim automated tests passed.

### 9. Final report

Summarize the changes, list files, report each validation result (passed, failed, or not run, and why), state what the provider's terms require and what you could not verify, and list decisions needed.
