# Lawyer video pass (brief 12, videos only)

Add one video per course to the Lawyer lessons, using the details below. References already exist on every lesson and must be kept. A video is **not** required on every lesson: attach it only where it clearly fits. Most courses have no video yet because suitable videos were hard to find; that is expected.

## Rules

1. Add the videos to `src/features/learning-hub/lawyer/links.js` using the shared `ytVideo` helper from `shared/lessonLinks.js`. One video id per course. Follow the Software Engineering pattern: `video` on the lesson, plus a matching APA entry added to that lesson's `references`.
2. Choose lessons yourself, but only where the video (or a chapter) clearly covers the lesson's title and objective. Read each course's lesson titles first. Skip lessons that do not match. A lesson gets at most one video. Aim for about 2 to 5 lessons per course, never more than 5. For a course whose video fits only one lesson, one lesson is fine.
3. Videos **with chapters**: use the chapter's start time, converted to whole seconds, and the chapter label. Videos **without chapters**: use `start: 0` and the chapter label "Full video", only on lessons the whole video covers.
4. Skip any timestamp that is malformed or out of order. Do not guess any timestamp, id, title, channel, or year.
5. Do not change lesson text, quizzes, activities, references already present, or any other career. Do not add other videos.
6. Do not add a video to any course marked "(none yet)". Those courses are still waiting for a video.
7. Educational orientation only. Do not attach a segment to a lesson if it gives legal advice, case strategy, specific laws or case citations, penalties, deadlines, fees, bar-exam or eligibility details, claims about what paralegals may legally do, or procedural instructions. Most of these videos come from other countries, so do not use segments that present a foreign law, court, or legal rule as fact. The Supreme Court and the Integrated Bar of the Philippines stay name-only, with the existing note to check official sources.
8. Run `npm run validate:content`, `npm run lint`, `npx expo export -p web`, and `npm run check:links -- lawyer`. The link check should confirm each video exists and that its title matches. If a video is not embeddable, or its title does not match, report it. Do not remove it silently.
9. Do not commit or push.

## Videos

APA author is the channel name. Reference URL format: `https://youtu.be/<id>`.

| Course id | Video id | Title | Channel | Year |
|---|---|---|---|---|
| `law-profession-ethics` | (none yet) | | | |
| `law-legal-system` | (none yet) | | | |
| `law-legal-research` | yqteIDakNHY | Legal Research for Beginners: A Step-by-Step Framework (Primary + Secondary Sources) | Rowena Maxwell | 2025 |
| `law-legal-writing` | O7G-y6vepos | IRAC Method | Learn Law Better | 2017 |
| `law-constitutional-basics` | _882Xztbh5Q | What is the Separation of Powers? | Civics Academy SA | 2020 |
| `law-civil-criminal-overview` | Zg5ex8WZUao | What is the difference between civil cases and criminal cases? | LegalYou | 2015 |
| `law-procedure-advocacy` | (none yet) | | | |
| `law-path-to-practice` | (none yet) | | | |
| `law-legal-office-ops` | (none yet) | | | |
| `law-document-drafting` | (none yet) | | | |
| `law-court-filing` | (none yet) | | | |
| `law-research-support` | levdy6-Mfa4 | Paralegal Legal Writing: Using the IRAC Method | AIPSParalegal | 2011 |
| `law-client-intake-confidentiality` | (none yet) | | | |
| `law-legal-tech-records` | 1biHm0Xb5-M | Introduction to Records Management | Odyssey Learning Project | 2023 |

## Chapters (only for videos that have them)

**law-legal-research (yqteIDakNHY).** Well-formed chapters: Intro 0:00; Primary vs secondary sources 0:42; The legal research framework (overview) 2:00; Wrap up 9:45. Use Primary vs secondary sources on the lesson about types of legal sources, and use the framework chapter only on lessons about the general research method. Do not use it to teach database or tool steps (the description mentions Westlaw Australia), and do not use it on lessons about evaluating sources, organizing findings, or keeping a research trail unless a chapter clearly covers them.

**law-legal-tech-records (1biHm0Xb5-M).** Well-formed chapters: Introduction 0:00; Records Management in Virginia 0:51; The Records Coordinator Role 1:34; Identifying Your Records and Responsibilities 2:30; Ongoing Support for Records Coordinators 3:07; Licensing and Credits 3:38. Do not use "Records Management in Virginia" (it covers one US state's rules) or "Licensing and Credits". Use "Identifying Your Records and Responsibilities" only on a lesson about general records habits or accountability. It is about a university, not a legal office, so do not use it on lessons about legal-office tools, secure access, versioning, or backups.

Videos with no chapters: `law-legal-writing`, `law-constitutional-basics`, `law-civil-criminal-overview`, `law-research-support`. Use `start: 0` and "Full video" only on lessons the whole video covers.
- `law-legal-writing`: only the lesson that introduces the issue-rule-application-conclusion method. The video names the third step "Analysis", so do not copy its wording into lesson text.
- `law-constitutional-basics`: only the lesson on separation of powers.
- `law-civil-criminal-overview`: only lessons about the difference between civil and criminal matters and the parties involved. Do not use it for lessons on burdens of proof or remedies unless you can confirm the whole video covers them.
- `law-research-support`: only a lesson about structured analysis or a research memo, and only if one clearly matches. If none does, add no video to this course and say so in the report.

## Flags

- `law-legal-research`: law-student video with Australian examples; the description promotes the creator's own products.
- `law-legal-writing`: aimed at US law-school essay exams and bar-exam prep; the description promotes a newsletter.
- `law-research-support`: from a US paralegal school (AIPS), published in 2011; the description promotes the school. Its fit for this course (the video teaches IRAC analysis, not research support) was assumed from the supplied list and should be confirmed.
- `law-constitutional-basics`: South African channel; concept-level, but the description promotes the channel's website.
- `law-civil-criminal-overview`: the YouTube description is one line and no chapters were read, so the content is not fully verified. It replaces an earlier candidate, "Civil Law vs Criminal Law Explained" (BsTJnmhXNxQ), which is not used.
- `law-legal-tech-records`: general university records management, not specific to law offices. It covers only part of the course topic.
- `law-legal-system`: the supplied video ("3 Branches of Government", Kids Academy, 2019) was left out. It is a children's video about the US government (US President, nine Justices) and promotes an app. Still waiting for a video on branches of government that is not US-specific.
- `law-procedure-advocacy`: the supplied video ("CRIMINAL CASE: ITS STAGES AND PROCEDURE", Your_Lawyer, 2021) was left out. It covers Philippine criminal procedure only and names specific rules (Rules 110 to 127), arrest, bail, and the rights of the accused, which conflicts with the no-specific-laws and no-procedural-instructions rules. Still waiting for a general stages-of-a-case video.
- `law-profession-ethics` and `law-client-intake-confidentiality`: the supplied links were not YouTube videos (an ABA web page and a Lorman webpage video), so no video was assigned.
- Six courses have a video and eight have none (`law-profession-ethics`, `law-legal-system`, `law-procedure-advocacy`, `law-path-to-practice`, `law-legal-office-ops`, `law-document-drafting`, `law-court-filing`, `law-client-intake-confidentiality`). All videos were assigned to courses by the order of the supplied list, which was not labelled with course ids.
- Video length and embedding permission were not checked.

## Final report must include

1. A mapping table for every video added: lesson id, lesson title, chapter label, start seconds. List lessons that did not get a video as a count per course.
2. Any timestamp skipped and why. Any video that failed the link check, was not embeddable, or had a title mismatch.
3. Every file added or modified, and any hotspots touched.
4. Each validation result as passed, failed, or not run, with the reason.
5. A manual checklist: open one lesson per course that has a video, confirm the video shows at the end, plays, starts at the chapter, and the references are still there.
6. The exact, unedited output of `git status --short` and `git diff --stat`, and the branch name.
