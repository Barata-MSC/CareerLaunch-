# Brief 03: Career Content (Reusable Template, One Career Per Run)

Use this file **once per career**. Attach it together with that career's spec file from `docs/tasks/specs/` (for example `specs/teacher.md`) and run it. One career per branch and per pull request. To start a new career, copy the YAML block in section A into `docs/tasks/specs/<career-id>.md` and fill it in.

**Terms:** a *career* is the broad field (Teacher). A *track* is a specific pathway inside it (Classroom Teacher). A *course* is one step in a track, with about 10 lessons and a 10-question quiz. A track has about 7 to 8 courses, depending on the subject.

**Run `00-careers-layer.md` first.** This brief assumes the shared Careers layer and Learning Hub exist. The shared `careers/registry.js` and `scripts/validate-learning-content.mjs` now also exist; reuse them for every career.

**Folder layout (decided):** `learning-hub/careers/` is the shared layer (career metadata, screens, and `registry.js`). Each career's *content* lives in its own folder directly under `src/features/learning-hub/`, named by the career ID, as a sibling of `software-engineering/` (for example `cybersecurity/`, `teacher/`, `lawyer/`). `software-engineering/` is the existing Software Engineering content folder. Cybersecurity is the completed reference implementation: it uses per-course config/wrapper folders plus authored per-track data modules under `cybersecurity/data/` and builds lesson/question arrays from stable course IDs. Either per-course data files or shared career data modules are acceptable; keep authored content separate from UI and ensure each course config resolves to complete lessons and questions.

---

## A. Career Spec (the human fills this in)

Copilot must follow this spec. Blank fields are decisions Copilot makes and reports; filled fields are binding. Cybersecurity (`specs/cybersecurity.md`) is the completed reference build. Draft specs for Teacher and Lawyer are in `specs/`; have a teammate review each proposed course list before building it.

```yaml
career:
  id: cybersecurity                 # must match the entry already seeded in careers.js
  title: Cybersecurity
  learner_level: complete beginner  # who the lessons are written for
  philippines_context: true         # true = examples may use local settings, but no unverified legal or regulatory facts
  review_required: false            # true for regulated fields (Nursing, Doctor, Lawyer, Marine, Teacher, Accountancy)
                                    # when true, status STAYS 'coming-soon' until a human flips it after expert review
  run_mode: build                   # plan = write the outline and checkpoint only, then stop; build = full build

tracks:                             # ordered; at least one
  - id: cyber-security-analyst      # globally unique; prefixed with the career (matches specs/cybersecurity.md)
    title: Cybersecurity Analyst
    subtitle: Learn to protect systems and respond to threats.
    estimated_duration: 4 months    # a displayed estimate, not a promise
    courses:                        # ordered by prerequisite; about 7 to 8 per track, depending on the track
      - id: cyber-networking-basics
        title: Networking Basics
        short_code: NET
        subtitle: How computers talk to each other.
        lesson_count: 10            # default 10
        outcomes:                   # 3 to 5 things the learner can do afterward
          - Explain how data travels across a network
        prerequisites: none
      # ...more courses

supplied_links:                     # OPTIONAL. Only verified URLs go here. Copilot must not invent any.
  videos: []
  references: []

must_cover: []                      # topics that must appear
must_avoid: []                      # topics, claims, or framings to leave out
```

If `tracks` or `courses` are blank, Copilot proposes the curriculum, writes it to the checkpoint file (section C), and then builds it. For a better result, review the proposed outline with a teammate (or with Claude) **before** running the build.

---

## B. Prompt

### 1. Goal

Build the complete learning content for the career in the Career Spec, in one execution: tracks, courses, lessons, quizzes, and registration, so the career can be opened from the Careers screen and completed in the existing Learning Hub flow (course overview, lessons, quiz, results, progress).

Defaults unless the spec says otherwise: 7 to 8 courses per track (the spec decides), 10 lessons per course, `quizSize: 10` (10 questions per quiz attempt), `passingPercent: 70`. For the question bank, match the pattern of the existing courses; if there is no clear pattern, write 10 to 20 questions per course (at least one per lesson) so retakes can vary. A career with two tracks is therefore roughly 140 lessons and 140 or more questions. This is a very large output.

### 2. Read first

- `CLAUDE.md`, `AGENTS.md`, `src/features/learning-hub/README.md` (the course data contract, the status rules, and the stable-ID rules are binding).
- `src/features/learning-hub/careers/` (from brief 00: `careers.js`, the Careers screens) and how it resolves `trackIds`. Remember that `careers/` is the shared layer; career content goes in sibling folders (section 3).
- `src/features/index.js` (the features barrel): check whether new career folders need an export there, and follow the existing pattern.
- `src/features/learning-hub/software-engineering/SoftwareEngineerRoadmap.js` (the `TRACKS` shape and roadmap UI) and `src/navigation/AppNavigator.js` (how course routes are registered).
- **Two or three existing courses** (for example JavaScript and Excel) end to end: `course.js`, the course wrapper, `data/lessons.js`, `data/lessonExtras.js`, `data/questions.js`. Match their depth, tone, lesson length, and how many lessons use `sections`, `keyPoints`, and `activities`.
- `shared/components/LessonActivities.js` and each activity component you plan to use, to get the exact prop contracts.

### 3. Structure and registration

Put each new career's content in its own folder directly under `src/features/learning-hub/`, named exactly by the career ID in the spec and in `careers.js` (for example `src/features/learning-hub/cybersecurity/`). Do **not** put content inside `careers/`.

```text
<career-id>/                 # a sibling of software-engineering/, careers/, shared/, LearningHubScreen/
  index.js                 exports { tracks, courses } for this career (the registration entry point)
  tracks.js                track definitions (ordered steps, each pointing to a course and a route)
  data/                    optional authored content shared by courses in this career
    <track-content>.js     definitions keyed by stable course id
  <course-id>-course/
    course.js              course config (data contract in the README)
    <CourseName>Course.js  thin wrapper: <CourseRunner course={course} navigation={navigation} />
```

The Cybersecurity implementation uses shared per-track data modules under its career-level `data/` folder, then builds each course's resolved `lessons` and `questions` from stable course IDs. Per-course `data/lessons.js` and `data/questions.js` files are also valid. Choose the smallest clear arrangement; keep authored content separate from UI, and ensure every course config resolves to complete content before registering it.

Do **not** move or rename the existing `software-engineering/` folder or any existing ID or route. It already is the Software Engineering career's folder, so it needs no restructuring: the registry reads its existing `TRACKS` and course configs directly, and you do not add an `index.js` to it unless the smallest refactor clearly needs one.

**Registration uses the shared registry.** `src/features/learning-hub/careers/registry.js` already combines Software Engineering with each career module's `{ tracks, courses }` exports. Add the new career's `index.js` to `CAREER_CONTENT`; do not create a second registry or another hand-written route list. `AppNavigator.js` maps the registry's course routes. Preserve existing route names and track keys. The Learning Hub and roadmap must resolve career `trackIds` against the combined registry, display titles separately from stable IDs, and keep roadmap track switching scoped to the selected career.

### 4. ID and naming rules (binding)

- Career ID: as in the spec and `careers.js`. Track IDs and course IDs: kebab-case, **globally unique**, and **prefixed with the career** (for example `cyber-networking-basics`). Check every existing course, track, and route name before choosing; never reuse one.
- Lesson IDs: follow the existing pattern in current courses; they only need to be unique within their course. Never derive IDs from display titles that might change.
- Route names: PascalCase, unique, and consistent with how existing routes are named. Every `navigation.navigate(...)` target must match a registered route.
- Do not edit any existing course's IDs or content.

### 5. Content rules

**Curriculum.** Order courses by prerequisite. Each course states outcomes and prerequisites (in its subtitle or first lesson). Each lesson has one clear objective, a short explanation written for the stated learner level, at least one concrete worked example, and 3 to 5 `keyPoints`. Use `sections` for longer lessons. Match the depth of the existing courses; do not produce one-paragraph placeholders.

**Activities.** Use only the supported activity types listed in the README and implemented in `LessonActivities.js`, and only where they fit: `quickCheck`, `order`, and `matchPairs` suit most non-coding subjects. Do not use code playgrounds (`playground`, `jsRunner`, `reactRunner`, `pyRunner`) for non-coding careers. Read each component's props before authoring data for it. Include an activity in most lessons, but never pad with low-value ones.

**Quizzes.** Each quiz attempt serves 10 questions. Every lesson has at least one question linked by `lessonId` (more when the bank is larger than 10). Each question has exactly 4 answers, one defensible correct answer, plausible distractors (no trick wording, no "all of the above"), and an explanation. Make `correct` indexes spread roughly evenly across 0 to 3; generated quizzes tend to favor one position. No duplicate question text, and no duplicate answers within a question.

**Accuracy and honesty.**

- Write evergreen, general content. Do not include salaries, statistics, job-demand claims, prices, laws, regulations, exam requirements, or licensing details unless the spec supplies them. If a lesson would be much weaker without such a fact, write the general version and add a `// VERIFY:` comment.
- **Never invent URLs.** Omit `video` and `references` unless the URL is in `supplied_links`.
- Frame the material as introductory career-preparation learning. For health, legal, financial, and safety topics, do not give personal advice, diagnoses, dosing, legal strategy, or operational safety procedures; keep it conceptual and educational.
- If `review_required` is true, create `<career-id>/REVIEW_NOTES.md` inside the career's own folder (for example `learning-hub/teacher/REVIEW_NOTES.md`) listing every claim, term, or procedure a subject expert should check, grouped by course. Keep `status: 'coming-soon'` in `careers.js` and say so in the report. The content is still fully built and wired so it can go live the moment a reviewer signs off.
- If `review_required` is false, set `status: 'available'` and fill in `trackIds` in `careers.js`.

### 6. Integrity validator (create once, reuse after)

Reuse `scripts/validate-learning-content.mjs` and `npm run validate:content`; Cybersecurity introduced the shared validator. Do not create a second script or add dependencies. It uses Babel tooling already installed in the project to load the ESM/JSX-backed course modules from Node. Extend it only when a new content contract or supported activity type requires it. It must check, across **all** careers:

- Course IDs and track IDs are unique; route names are unique.
- Lesson IDs are unique within each course; required lesson fields are present and non-empty.
- Every question's `lessonId` exists in its course; `answers` has 4 distinct non-empty strings; `correct` is an integer from 0 to 3; `explanation` is non-empty; no duplicate question text within a course.
- Every lesson has at least one question (error if a lesson has none); the bank size is at least `quizSize`; `passingPercent` is between 1 and 100.
- Every career `trackIds` entry resolves; every track step that names a course resolves to a real course and route; steps without a course are intentionally detail-only.
- Warn if more than 50 percent of a course's correct answers share one index.
- Every activity `type` is in the supported list.

Run the validator and fix every error before finishing. Report any answer-index skew warnings even when validation passes; do not silently weaken or skip a check to get a green result.

### 7. Hard constraints

- No new dependencies. Do not modify the Supabase schema, migrations, or Edge Functions. Progress uses the existing `lesson_progress` and `quiz_attempts` tables keyed by the new course and lesson IDs; do not add tables or columns.
- Preserve every existing course ID, lesson ID, route name, and the `App.js` provider composition.
- Do not run `npm run deploy`, do not commit or push, and do not touch `.env`.
- Never claim the content has been reviewed by an expert, and never claim tests passed that were not run.

### C. Resumable execution (checkpoint file)

**Plan mode.** If `run_mode` is `plan`, write only the checkpoint file with the full outline (every track, every course, and the 10 lesson titles with a one-line objective each), then stop without writing any code. A human reviews and edits the outline, then re-runs with `run_mode: build`. Use plan mode first for any career with `review_required: true`.

This is a large job and may not finish in one run. Create and keep updated `docs/tasks/progress/<career-id>.md` containing the approved curriculum and a checklist per course (`course.js`, lessons, questions, wrapper, registered, validated). Build **one course at a time**: finish it, run the validator on it, tick it off, then continue. If you run out of capacity, stop cleanly, leave the repository in a working state (no half-registered routes or empty question banks), update the checkpoint, and report exactly which courses remain. A follow-up run must read the checkpoint and continue from there instead of starting over.

### 8. Docs

Update `CLAUDE.md` (Learning Hub row and the learning-tracks section: this career's tracks and course counts, and its status) and `src/features/learning-hub/README.md` (the careers table, the roadmap table, and the architecture tree, which must show the new `<career-id>/` folder beside `software-engineering/` and explain that `careers/` is the shared layer and registry, while content lives in the sibling career folders). Describe the career as available only if its `status` is `available`.

### 9. Validation

1. The content validator (`npm run validate:content`), with the results reported.
2. `npm run lint`.
3. `npx expo export -p web`.
4. A **human test checklist**: open the career from the Careers screen, open every track, open at least one course per track, mark a lesson complete, take a quiz (pass and fail), confirm progress updates, and spot-check lesson content for accuracy. List which parts need subject-expert review.

Do not claim the manual checklist was completed unless it was actually exercised on the app. If device testing is unavailable, list it as not run and provide the exact checklist for the team.

### 10. Final report

Summarize the curriculum built (tracks, courses, lesson and question counts), list files added and modified, report each validation result (passed, failed, or not run, and why), report validator warnings, list `// VERIFY:` items and any review notes, list assumptions and decisions needed, and state whether the career is `available` or `coming-soon` and why. End with the exact, unedited output of `git status --short` and `git diff --stat`, and state the branch name. Do not stage, commit, or push unless explicitly asked.
