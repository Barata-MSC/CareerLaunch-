# Learning Hub Reference and Course-Generation Brief

This document is the portable reference for understanding CareerLaunch's Learning Hub and for planning a complete career pathway with courses, lessons, quizzes, progress, and a consistent learning experience. It describes the current repository accurately, then gives implementation guidance that can be adapted to a website or another client. Product goals and future ideas are identified as such; do not mistake them for features that already exist.

## Product purpose

CareerLaunch is a mobile-first career guidance and employment-preparation prototype. The Learning Hub connects a career goal to an ordered roadmap of courses, then gives learners lessons, practice, quizzes, feedback, and visible progress. Its audience includes students, interns, fresh graduates, unemployed people, and others exploring a career.

The intended learner journey is:

1. Choose or arrive with a career goal.
2. Review the career roadmap and select a course.
3. Learn from ordered lessons, examples, and optional activities.
4. Mark lessons complete as they are studied.
5. Take a course quiz, review answers and explanations, and revisit weak topics.
6. See course and career-roadmap progress update from saved lesson and quiz records.
7. Continue to the next course in the pathway.

Course durations in the product are estimates, not promises. Learning content should be practical, accurate, accessible to beginners, and honest about prerequisites and what a learner will be able to do afterward.

## Current careers and roadmap

The current roadmap is defined in `software-engineering/SoftwareEngineerRoadmap.js` as `TRACKS`. A track is an ordered list of steps; a step can point to a course and navigation route, or can be a detail-only/coming-soon item.

| Career track | Current roadmap order | Current course coverage |
|---|---|---|
| Software Engineer | HTML, CSS, JavaScript, React, Node.js, Database, Git & GitHub | All seven steps have courses. |
| Data Analyst | Excel & Spreadsheets, SQL, Python (Pandas), Data Visualization, Statistics, Dashboards (Power BI / Tableau) | All six steps have courses. |
| UI/UX Designer | Design Fundamentals, User Research, Wireframing, Figma / Prototyping, Usability Testing, Design Systems | Design Fundamentals has a course. The other five steps have descriptions but no course route/data yet. |

The folder name `software-engineering/` is a legacy organizational name: it currently contains courses for all three tracks, including data analysis and design. Do not infer that every course in that folder belongs to the Software Engineer track.

When adding or changing a track, check that step IDs are unique within the track, course references and navigation route names match registered screens, and course ordering supports a sensible prerequisite progression. A step without a course is intentionally a roadmap/detail view, not a broken course.

## Source architecture

```text
src/features/learning-hub/
  README.md                         This reference and course-generation brief
  LearningHubScreen/
    LearningHubScreen.js            Career/track and course browsing entry point
  shared/
    CourseRunner.js                 Shared course flow and orchestration
    courseUtils.js                  Derived lesson status and quiz question selection
    styles.js                       Shared course colors and common screen styles
    components/                     Reusable lesson activities and learning widgets
    progress/                       Supabase-backed per-course and multi-course hooks
    screens/                        Reusable lesson, quiz, and result screens
  software-engineering/
    SoftwareEngineerRoadmap.js      Track definitions, course lists, and roadmap UI
    <course>-course/
      course.js                     Course metadata and data composition
      <Course>Course.js              Thin screen wrapper around CourseRunner
      data/
        lessons.js                  Ordered lesson content
        lessonExtras.js             Optional lesson enhancements, where used
        questions.js                Quiz question bank
```

The course modules are deliberately data-driven. A course wrapper normally imports its course configuration and returns `<CourseRunner course={course} navigation={navigation} />`. `CourseRunner` selects the shared screens and behavior. The course data, not a copied screen implementation, is what makes one course different from another.

### Shared flow and responsibilities

- `LearningHubScreen/LearningHubScreen.js` is the learner's Learning Hub entry. It lets learners browse career tracks and the courses in a selected track, and refreshes aggregate progress when returning to the screen.
- `software-engineering/SoftwareEngineerRoadmap.js` owns the current track/step definitions and roadmap presentation. It builds its course set from the imported course configurations and uses `useAllCoursesProgress` for roadmap status.
- `shared/CourseRunner.js` owns the course-level state machine and combines course data with `useCourseProgress`. The current stages are course lesson overview, an individual lesson, lesson list/review, quiz introduction, quiz, and results. It also handles in-course back behavior, Android hardware back behavior, answer navigation, scoring, sounds, and saving quiz attempts.
- `shared/courseUtils.js` derives lesson statuses from saved completion IDs and selects questions for a quiz attempt. It does not mutate the authored course data.
- `shared/progress/useCourseProgress.js` loads and saves progress for one course.
- `shared/progress/useAllCoursesProgress.js` loads progress for a set of courses for roadmap/list displays and provides the common course-status rule.
- `shared/screens/` contains the reusable course lesson overview, lesson content screen, lesson list/review screen, quiz introduction, question screen, and result/review screen.
- `shared/components/` contains the reusable course header and optional lesson content: `LessonActivities`, `LessonReferences`, `LessonVideo`, `MiniSheet`, `QuickCheck`, `CodePlayground`, `JsPlayground`, `ReactPlayground`, `PyPlayground`, `StepOrder`, `VisualBuilder`, and `MatchPairs`.
- `shared/styles.js` centralizes the current course palette and common spacing, typography, and button styles.

Individual course folders keep the course configuration, wrapper, lesson data, optional lesson extras, and question bank together. For example, the JavaScript course has `javascript-course/course.js`, `JavaScriptCourse.js`, and `data/lessons.js`, `data/lessonExtras.js`, and `data/questions.js`.

## Course data contract

A course configuration currently has this shape (optional fields are noted):

```js
{
  id: 'stable-course-id',
  title: 'Course title',
  shortCode: 'TAG',
  subtitle: 'Short course description',
  passingPercent: 70,
  quizSize: 10, // optional; without it, use the full question bank
  lessons: LESSONS,
  questions: QUESTIONS,
}
```

`id` is persisted as `course_id`; changing it disconnects new queries from old learner records. Keep it stable after release. `shortCode` is shown as the compact course topic/icon label. `passingPercent` is the pass threshold. If using `quizSize`, ensure the bank is large enough and that the sampling behavior is appropriate; the current selector can choose questions across lesson topics and keeps them in lesson order. Without `quizSize`, all bank questions are used.

Lessons are ordered and have stable IDs. The common content fields are:

```js
{
  id: 'topic-1',
  title: 'Lesson title',
  subtitle: 'About 5 minutes',
  contentTitle: 'Key idea',
  description: 'A clear explanation written for the intended learner.',
  code: 'Optional example code',
}
```

The shared lesson view also supports optional `sections` (each can have `heading`, `text`, and `code`), `keyPoints` (an array of concise takeaways), `video`, `references`, and `activities`. These optional fields should be omitted when not needed; basic lessons still render. Lesson IDs are persistence keys and should not be casually renamed. Every question's `lessonId` should match a real lesson ID so missed quiz questions can link learners back to the relevant lesson.

Questions currently follow this shape:

```js
{
  lessonId: 'topic-1',
  question: 'Question text',
  answers: ['Choice A', 'Choice B', 'Choice C', 'Choice D'],
  correct: 1, // zero-based index into answers
  explanation: 'Why the correct answer is correct and/or distractors are not.',
}
```

Write unambiguous questions with one defensible correct answer. Distractors should be plausible, not trick wording. Every answer should be reviewed against the lesson content. Provide useful explanations, including for correct answers when practical. Include enough questions to cover every lesson objective, even when only a subset is served per attempt.

## Lesson and quiz experience

The current lesson overview shows course identity, description, completed lesson count, a progress bar, lesson status, and a quiz entry point. Opening a lesson shows its position in the course, title, topic label, explanation, optional code, optional sections/key points, optional video, practice activities, and references. The learner can mark/unmark completion and navigate to adjacent lessons.

Activities are optional and rendered by `shared/components/LessonActivities.js`. The current supported activity type keys are `miniSheet`, `quickCheck`, `playground`, `jsRunner`, `reactRunner`, `order`, `pyRunner`, `visualBuilder`, and `matchPairs`. Each type has its own component and data contract. Inspect that component before authoring its props; an unknown activity type is currently skipped rather than shown as an error. Interactive practice is separate from course completion unless completion is explicitly recorded through the lesson control.

The current quiz flow requires an answer before moving forward, allows moving backward and changing answers, then computes `round(correct / total * 100)`. Passing is `percent >= passingPercent`. Results show score, correct/incorrect totals, answer review, explanations, and lesson links for missed topics. Learners can review lessons or retake. On retake a new question set may be selected for courses with `quizSize`.

For a new website experience, preserve these useful learning behaviors but make the pathway continuous: show the career roadmap, give a clear next action, move naturally from lesson to lesson and course to course, and provide a final career-level completion view. Do not force the learner to generate or request every course individually. A continuous pathway does not require removing learner choice; keep navigation to course outlines and prior lessons available.

## Progress and database behavior

The current client uses the configured Supabase client from `src/config/supabase.js`. Progress is associated with the authenticated Supabase user ID; guest and full accounts are expected to use the same user identity mechanism. The client relies on database Row Level Security (RLS) to scope reads and writes to the current user. Do not treat client-side visibility as authorization.

Observed resources and operations:

| Resource | Current use |
|---|---|
| `lesson_progress` | One row per completed lesson. Reads select lesson IDs by course. Completion upserts `{ user_id, course_id, lesson_id }` with conflict key `user_id,course_id,lesson_id`; unchecking deletes that user's matching row. |
| `quiz_attempts` | One row per submitted attempt with `user_id`, `course_id`, `score`, `total`, `percent`, and `passed`. Attempts are inserted, not overwritten. |

The course hook loads both resources, displays a loading state, updates lesson completion optimistically, and reverts it with an error message if saving fails. Failed quiz saves are reported on the result screen. Best quiz percent and whether any attempt passed are derived from the attempt rows. Aggregate roadmap progress is refreshed when the roadmap regains focus.

Current status rules:

- A lesson is `completed` when its lesson ID is in saved completion rows.
- The first incomplete lesson is labeled `in-progress`; later incomplete lessons are `not-started`.
- A course is `completed` only when every lesson is complete and at least one quiz attempt passed.
- A course is `in-progress` if any lesson is complete or there has been a quiz attempt; otherwise it is `not-started`.
- Career/track progress is derived from its course statuses, not saved as an independent career-completion record.

Important backend caveat: checked-in migrations do not define the complete base schema or all policies for these tables. The client code documents observed column names and operations, but it does not prove the live schema, constraints, triggers, or RLS configuration. Before changing persistence or implementing a separate website backend, inspect the actual database schema and policies. Never put a Supabase service-role key or other privileged secret in browser/client code. If progress is to be shared across web and mobile, keep the course and lesson IDs consistent and ensure both clients use the same authenticated user and compatible schema/RLS.

The quiz records currently do not store the exact question IDs, chosen answers, or per-question correctness. The result review is available in the active client state, while durable history supports aggregate score/pass information. Persist detailed attempt review only if it is a deliberate product/schema change with corresponding privacy, retention, and RLS decisions.

## UI and interaction conventions

The current screens use React Native primitives and shared course styles, with a simple mobile-first, vertically scrollable layout. Common elements include a course header/back action, compact course/topic label, section headings, progress bars, answer choices, previous/next controls, visible loading and save-error states, and result review. The shared palette currently uses purple as the primary action color, green for completion/pass, red-orange for failure/error, and neutral gray for secondary information. Preserve the existing visual language when changing this app; a separate website may adapt the visual system but should keep consistent hierarchy, status meaning, and interaction feedback.

For any client, keep content readable on small screens, make controls keyboard/touch accessible, give choices and completion state clear selected/disabled states, retain visible progress, and do not communicate a successful save when the server rejected it. Provide loading, empty, retry/error, not-started, in-progress, completed, passed, and failed states. Avoid suggesting that course state is saved if the persistence call failed.

## Guidance for generating a complete career pathway in one pass

Use this brief as the baseline when asking Claude (or another coding assistant) to build a full career pathway for a website:

1. Create the entire career roadmap and all of its courses in one coherent implementation. Do not stop after the first course and do not ask the user to prompt for each course separately.
2. For every course, supply metadata, a sensible prerequisite-aware order, complete lesson content, practical examples or activities where useful, a question bank linked to lesson IDs, explanations, a passing threshold, and a result/review path.
3. Design the full learner journey end-to-end: career selection or entry, roadmap, course overview, lesson navigation, course quiz, results and remediation, resume/continue state, and career-level progress. Keep prior-course and direct lesson access possible.
4. Reuse shared course and lesson templates/components rather than implementing a different interaction pattern per course. Keep authored content separate from UI and progress logic.
5. Treat course and lesson IDs as durable database keys. Define one canonical ID list and reuse it for roadmap links, lesson records, quiz mappings, routes, and progress reads/writes. Do not derive IDs from mutable display titles.
6. Define the data model and persistence contract before coding. Scope every progress record to a user, document uniqueness and deletion behavior, support loading/error/retry, and enforce ownership in server-side authorization/RLS. Do not assume this prototype's table schema exists in a new website project.
7. Validate referential integrity: every roadmap course points to a real course; every quiz `lessonId` points to a real lesson in that course; all question answer indexes are valid; every quiz has at least one question; quiz selection cannot produce an empty set; and all course IDs are unique.
8. Include a practical curriculum, not just many screens or short placeholder descriptions. Each course should state outcomes, prerequisites, estimated effort, lesson objectives, worked examples, practice, and a meaningful assessment. Estimates are guidance, not guarantees.
9. Finish the whole pathway before presenting it as complete. Include setup/run instructions, a concise architecture map, implementation assumptions, and any real external service/configuration requirements. Do not claim a live database, AI feedback, external job feed, or persistence unless it is implemented and configured.

Suggested output order for a single comprehensive build prompt: (a) define the career and learner audience, (b) present the complete ordered curriculum, (c) define reusable data contracts and stable IDs, (d) implement the end-to-end UI and navigation, (e) implement authenticated persistence and error states, and (f) run checks and report gaps. Keep all of these in the same deliverable; use internal sections or files as needed, but do not make the user initiate a separate prompt per course.

## Change checklist

Before considering a new or expanded career pathway complete, verify:

- The career track, ordered steps, course references, and routes agree.
- Every course has stable unique IDs, a usable outline, substantial lesson content, and a valid question bank.
- All question-to-lesson mappings and answer indexes are valid.
- Shared screens render optional lesson content safely and work with every course.
- Quiz selection, scoring, pass threshold, review, retake, and save-failure behavior are coherent.
- Progress reloads after navigation and correctly distinguishes course completion from a passed quiz alone.
- Database schema, ownership policies, and client operations match; no privileged key is shipped to the client.
- Empty, loading, error, retry, completion, and small-screen states are handled.
- Documentation distinguishes implemented behavior from roadmap plans and external integrations that are not present.