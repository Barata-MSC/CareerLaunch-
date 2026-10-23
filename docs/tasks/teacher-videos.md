# Teacher video pass (brief 12, videos only)

Add one video per course to the Teacher lessons, using the details below. References already exist on every lesson and must be kept. A video is **not** required on every lesson or course: attach it only where it clearly fits. More videos will be added to this file later, so keep the work limited to the rows that have a video id.

## Rules

1. Add the videos to `src/features/learning-hub/teacher/links.js` using the shared `ytVideo` helper from `shared/lessonLinks.js`. One video id per course. Follow the Software Engineering pattern: `video` on the lesson, plus a matching APA entry added to that lesson's `references`.
2. Choose lessons only from the "Lessons to use" column, and only if the lesson's title and objective clearly match. A lesson gets at most one video. Do not add the video to other lessons.
3. These videos have no chapter list. Use `start: 0` and the chapter label "Full video".
4. Do not guess any timestamp, id, title, channel, or year. Do not add other videos. Courses marked "(none yet)" get no video.
5. Do not change lesson text, quizzes, activities, references already present, or any other career.
6. Never add a video to these lessons: Licensure basics, Signs of stress, withdrawal, or distress, Boundaries and referral pathways, Supporting the learner, not diagnosing, The licensure process, PRC licensure reminder.
7. Run `npm run validate:content`, `npm run lint`, `npx expo export -p web`, and `npm run check:links -- teacher`. The link check should confirm each video exists and that its title matches. If a video is not embeddable or its title does not match, report it. Do not remove it silently.
8. Do not commit or push.

## Videos

APA author is the channel name. Reference URL format: `https://youtu.be/<id>`. The ids below were read from the video thumbnail address in Edutopia's own video pages, so the link check is the final confirmation.

| Course id | Video id | Title | Channel | Year | Lessons to use |
|---|---|---|---|---|---|
| `teach-classroom-management` | mTBky3sQDH0 | Edutopia Sessions: Classroom Management for New Teachers | Edutopia | 2024 | What classroom management means; Setting expectations early; Building a proactive classroom climate |
| `teach-sec-assessment` | 37CTCDTesWA | Inviting Participation With Thumbs-Up Responses | Edutopia | 2019 | Using formative checks |
| `teach-foundations` | (none yet) | | | | |
| `teach-child-development` | (none yet) | | | | |
| `teach-curriculum-planning` | (none yet) | | | | |
| `teach-literacy-numeracy` | (none yet) | | | | |
| `teach-assessment` | (none yet) | | | | |
| `teach-inclusive-education` | (none yet) | | | | |
| `teach-professional-growth` | (none yet) | | | | |
| `teach-sec-adolescent-development` | (none yet) | | | | |
| `teach-sec-content-pedagogy` | (none yet) | | | | |
| `teach-sec-curriculum-design` | (none yet) | | | | |
| `teach-sec-classroom-culture` | (none yet) | | | | |
| `teach-sec-guidance-wellbeing` | (none yet) | | | | |
| `teach-sec-career-licensure` | (none yet) | | | | |

Notes: the classroom management video is a panel discussion for new teachers (not specific to one grade level). The thumbs-up video is a very short classroom clip for grades 6 to 8, so use it only on the one lesson listed.

## Final report must include

1. A mapping table for every video added: lesson id, lesson title, chapter label, start seconds.
2. Any video that failed the link check, was not embeddable, or had a title mismatch.
3. Every file added or modified, and any hotspots touched.
4. Each validation result as passed, failed, or not run, with the reason.
5. A manual checklist: open each lesson that has a video, confirm the video shows at the end and plays, and the references are still there.
6. The exact, unedited output of `git status --short` and `git diff --stat`, and the branch name.
