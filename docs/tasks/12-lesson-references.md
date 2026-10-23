# Brief 12: Lesson References and Optional Videos (all careers)

Software Engineering lessons already end with a video and a list of references, for example `software-engineering/css-course/data/lessonExtras.js`: each lesson id maps to `video` (a real YouTube id, start time, chapter, title, channel), `activities`, and `references` (APA 7th text plus a link, shown by `LessonReferences`). This brief (12) brings the same ending to the lessons of the other careers.

- **References are required** on every lesson of every career covered by this brief.
- **Videos are optional.** A video is added only for a course where the team supplies a real YouTube id. Never guess one.

## Honesty rule (read first)

The lessons of the other careers were written from general knowledge, not copied from specific web pages. So:

- Each reference must be a page that **genuinely covers that lesson's topic**. A human spot-checks this.
- Do **not** state or imply that the lesson text was taken from the link. In the other careers, label the section **"Further reading"**, not "References". Keep Software Engineering's heading as it is.
- Never invent a URL, a title, an author, a date, or a YouTube id. If a specific page cannot be confirmed, use the publisher's topic or landing page, or add a `// VERIFY:` comment. Report the count of `// VERIFY:` items.

## Before you run (human steps)

- Confirm the **list of careers** for this run (default: Cybersecurity, Teacher, Doctor, Marine deck track, Hospitality & Tourism; later any new careers). Run **one career per branch**.
- Edit the **allowed-domains list** below if the team prefers other sources.
- Optional: supply videos per course in `supplied_links.videos` of the career spec, or in a short note to Copilot: course id, YouTube id, title, channel, and the chapter start time in seconds for each lesson. Without a supplied id, that course has no video.
- Link checking needs internet. Copilot may not be able to run it. If it did not run, the team runs it and reviews the report.

## Rules that apply (from the task README)

- Never put a secret in code, logs, docs, or an `EXPO_PUBLIC_` variable. Preserve stable course IDs, lesson IDs, and route names. Add no dependencies.
- Do not run `npm run deploy`. Do not commit or push.
- Do not claim a check passed unless it was actually run. Describe only implemented behavior as implemented.
- Merge-conflict hotspots: `scripts/validate-learning-content.mjs`, `CLAUDE.md`, the READMEs, and the shared lesson screen files. Touch them as little as possible.
- Do not change lesson text, quizzes, activities, or any Software Engineering data or heading.

## Inspect first

Read how Software Engineering lessons get `video` and `references` (`lessonExtras.js` and the `lessons.js` that merges it), the `LessonReferences` component and the video component, the shared `CourseRunner` and lesson screen, and how each other career stores its lessons (for example, shared curriculum modules or per-course `data/lessons.js`). Confirm the shared lesson screen shows `references` and `video` for lessons of **every** career, not only Software Engineering. If it does not, make the smallest change so it does, with an optional heading text for the references section.

## Data shape (match Software Engineering exactly)

- `references`: array of `{ text, url }`. `text` is APA 7th style, for example `Organization. (n.d.). Page title. Site name.` Use `(n.d.)` when no date is shown. `url` must start with `https://`.
- `video` (optional): `{ id, start, chapter, title, channel }` with an 11-character YouTube id, `start` in whole seconds (0 or more), plus chapter, title, and channel text copied from the supplied details. Also add the matching video entry to `references`, as the Software Engineering files do.

## Implementation

1. Add a small shared helper module in `learning-hub/shared/` with: a `ref(organization, title, url, site)` builder that produces the APA `text`, a `ytVideo(...)` builder, and an `applyLessonLinks(lessons, links)` function that returns lessons with `references` and `video` merged in without overwriting existing values and without mutating the input.
2. For each career, add one data file `src/features/learning-hub/<career-id>/links.js` exporting `LESSON_LINKS`, keyed by lesson id, each entry `{ references: [...], video? }`. Wire it in with the smallest change to that career's existing lesson loading. If a career stores one file per course, per-course files are fine.
3. Give **every lesson 1 to 2 references** (a third only when clearly useful). Pick references that match the lesson's own topic. Do not reuse one generic link across a whole course; at most three lessons in a course may share the same URL.
4. Allowed domains (starting list, edit freely). Prefer stable section or landing pages over deep guessed paths:
   - Cybersecurity: `nist.gov`, `cisa.gov`, `owasp.org`, `ncsc.gov.uk`, `cloudflare.com` (learning center), `privacy.gov.ph`
   - Teacher: `deped.gov.ph`, `ched.gov.ph`, `prc.gov.ph`, `unesco.org`, `edutopia.org`
   - Doctor: `who.int`, `doh.gov.ph`, `medlineplus.gov`, `ncbi.nlm.nih.gov`, `khanacademy.org`
   - Marine: `marina.gov.ph`, `imo.org`, `ched.gov.ph`, `prc.gov.ph`, `noaa.gov`, `pagasa.dost.gov.ph`
   - Hospitality & Tourism: `tourism.gov.ph`, `ched.gov.ph`, `tesda.gov.ph`, `untourism.int`
   - Any other career: propose a list and report it for review.
5. Regulated careers (Doctor, Marine, Teacher, and any Lawyer or Nursing content): official bodies and educational sources only. References are for learning more, never for medical, legal, or safety instructions. No source may be used that gives dosing, treatment, or operating procedures.
6. Extend `scripts/validate-learning-content.mjs` (keep it passing for all careers): for careers covered by this brief, every lesson must have at least one reference with a non-empty `text` and an `https://` `url`; the domain must be in that career's allowed list; no duplicate URL within one lesson; any `video` must have an 11-character id, a whole-number `start`, and non-empty chapter, title, and channel. A URL repeated on more than three lessons in a course is a warning. Keep Software Engineering unchanged and only advisory.
7. Add `scripts/check-lesson-links.mjs` with an npm script `check:links` (use built-in `fetch`; no new dependency). Usage: `node scripts/check-lesson-links.mjs <career-id>`. It tries each reference URL (HEAD, then GET if needed, with redirects and a timeout), checks each video id through YouTube's oEmbed endpoint and compares the returned title with the supplied title, and writes a report to `docs/tasks/progress/link-check-<career-id>.md` listing OK, redirected, and failed links. Be polite: limit concurrency and add a short delay between requests. It is a dev-only script that needs internet; the report says clearly when it was not run.
8. Update `CLAUDE.md` and the Learning Hub README (what the files are, the honesty rule, and the commands) and the `docs/tasks/README.md` status table.

## Validation

Report each result as passed, failed, or not run, with the reason: `npm run validate:content`, `npm run lint`, `npx expo export -p web`, and `npm run check:links -- <career-id>`. There is no test script. Do not claim a manual app test was done unless it was.

## Final report must include

1. The career(s) covered, with the number of lessons and references added per course, and any courses with a video.
2. Every file added or modified, and which hotspots were touched.
3. The allowed domains used, and any domain you propose to add.
4. The count and list of `// VERIFY:` items and of lessons that only have a landing-page reference.
5. The link-check result, or "not run" with the reason.
6. A manual checklist: open a lesson in each course and confirm the Further reading section appears at the end, each link opens a page that matches the topic, the video (if any) plays and starts at the right chapter, and Software Engineering lessons look unchanged.
7. Assumptions and open decisions.
8. The exact, unedited output of `git status --short` and `git diff --stat`, and the branch name.

## Out of scope

Rewriting lesson text from the sources, filling the `start` TODOs in Software Engineering, embedding new video players, and paywalled or login-only sources.
