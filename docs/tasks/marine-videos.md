# Marine video pass (brief 12, videos only)

Add one video per course to the Marine lessons, using the details below. References already exist on every lesson and must be kept. A video is **not** required on every lesson: attach it only where it clearly fits. Most courses have no video yet; that is expected.

## Rules

1. Add the videos to `src/features/learning-hub/marine/links.js` using the shared `ytVideo` helper from `shared/lessonLinks.js`. One video id per course. Follow the Software Engineering pattern: `video` on the lesson, plus a matching APA entry added to that lesson's `references`.
2. Choose lessons yourself, but only where the video (or a chapter) clearly covers the lesson's title and objective. Read each course's lesson titles first. Skip lessons that do not match. A lesson gets at most one video. Aim for about 2 to 5 lessons per course, never more than 5. For a course whose video fits only one or two lessons, that is fine.
3. Videos **with chapters**: use the chapter's start time, converted to whole seconds, and the chapter label. Videos **without chapters**: use `start: 0` and the chapter label "Full video", only on lessons the whole video covers.
4. Skip any timestamp that is malformed or out of order. Do not guess any timestamp, id, title, channel, or year.
5. Do not change lesson text, quizzes, activities, references already present, or any other career. Do not add other videos. Do not change the Marine `coming-soon` status. The earlier note that no video links were supplied no longer applies to the video below; every other course stays without a video.
6. Do not add a video to any course marked "(none yet)".
7. This brief covers the registered Deck Officer courses only. The Marine Engineer track (`mar-engine`) is not built or registered, so do not create it and do not add any engineering video. The deferred engineering video is listed at the end for a later pass.
8. Educational orientation only. Do not attach a segment to a lesson if it presents operating, emergency, abandon-ship, or firefighting steps, navigation calculations for real voyages, machinery operation, repair, or troubleshooting, hazardous-cargo handling, high-voltage electrical work, collision-regulation rule numbers, meanings of lights or signals, weather-routing or storm-avoidance decisions, numeric specifications, statistics, salaries, fees, training durations, or certificate details.
9. Run `npm run validate:content`, `npm run lint`, `npx expo export -p web`, and `npm run check:links -- marine`. The link check should confirm each video exists and that its title matches. If a video is not embeddable, or its title does not match, report it. Do not remove it silently.
10. Do not commit or push.

## Videos

APA author is the channel name. Reference URL format: `https://youtu.be/<id>`.

| Course id | Video id | Title | Channel | Year |
|---|---|---|---|---|
| `mar-seafaring-profession` | (none yet) | | | |
| `mar-ship-basics` | (none yet) | | | |
| `mar-navigation-concepts` | (none yet) | | | |
| `mar-seamanship-cargo` | (none yet) | | | |
| `mar-weather-ocean` | (none yet) | | | |
| `mar-safety-environment` | (none yet) | | | |
| `mar-path-to-practice` | (none yet) | | | |

## Chapters (only for videos that have them)

No Deck Officer video has been verified yet, so there are no chapters to apply.

## Flags

- No Deck Officer video could be verified yet. YouTube blocked every read of the supplied links, so no title, channel, year, or chapters were read. Do not add any of these until they are checked and reviewed against the rules above:
  - `mar-ship-basics`: i3rrDqm6dPw (reads return the page for a different video, 3zRIndR9j40, so this id may be wrong)
  - `mar-navigation-concepts`: 8m_ivNgwExI
  - `mar-seamanship-cargo`: VRc2H4RDU7o
  - `mar-weather-ocean`: HysVEDCDuaM
  - `mar-safety-environment`: FFYHpUKHR1E
  - `mar-path-to-practice`: ZBjkD8PqS3A
- `mar-seafaring-profession` had no link supplied.
- Video length and embedding permission were not checked.

## Deferred: Marine Engineer track (do not apply yet)

Apply only after the courses exist and are registered, in a later pass.

| Course id | Video id | Title | Channel | Year |
|---|---|---|---|---|
| `mar-eng-propulsion-power` | 3zRIndR9j40 | How a Ship Engine Works - 2-Stroke Marine Diesel Engine | 3D Living Studio | 2025 |

Chapters: Combustion Cycle 0:00; Scavenge Air 2:20; Turbo Charger 3:30; Pipes & Lines, ECS vs Camshaft 5:10; Engine Reversal 7:25; Case Design 8:45; Explosion Relief Valves 10:12; Lube, Turning Gear, Fuel 10:37; Cooling Water 12:39. Use only Combustion Cycle (0:00) on the lesson about how energy becomes ship movement and Cooling Water (12:39) on the lesson about propulsion depending on supporting systems. It is a detailed animation of one real engine type, so a maritime reviewer should confirm the fit. Other supplied engineering links (not read): `mar-eng-profession` yOQTO2jEaAo; `mar-eng-science` mc979OhitAg; `mar-eng-ship-systems` was a playlist, not a video; `mar-eng-maintenance` NWBIUwvBavo; `mar-eng-safety-environment` pkzOQuOz79g; `mar-eng-path-to-practice` rsgIkYory8c.

## Final report must include

1. A mapping table for every video added: lesson id, lesson title, chapter label, start seconds. List lessons that did not get a video as a count per course.
2. Any timestamp skipped and why. Any video that failed the link check, was not embeddable, or had a title mismatch.
3. Every file added or modified, and any hotspots touched.
4. Each validation result as passed, failed, or not run, with the reason.
5. A manual checklist: open one lesson per course that has a video, confirm the video shows at the end, plays, starts at the chapter, and the references are still there.
6. The exact, unedited output of `git status --short` and `git diff --stat`, and the branch name.
