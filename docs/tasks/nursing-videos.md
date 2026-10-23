# Nursing video pass (brief 12, videos only)

Add one video per course to the Nursing lessons, using the details below. References already exist on every lesson and must be kept. A video is **not** required on every lesson: attach it only where it clearly fits.

## Rules

1. Add the videos to `src/features/learning-hub/nursing/links.js` using the shared `ytVideo` helper from `shared/lessonLinks.js`. One video id per course. Follow the Software Engineering pattern: `video` on the lesson, plus a matching APA entry added to that lesson's `references`.
2. Choose lessons yourself, but only where the video (or a chapter) clearly covers the lesson's title and objective. Read each course's lesson titles first. Skip lessons that do not match. A lesson gets at most one video. Aim for about 2 to 5 lessons per course, never more than 5.
3. Videos **with chapters**: use the chapter's start time, converted to whole seconds, and the chapter label. Videos **without chapters**: use `start: 0` and the chapter label "Full video", only on lessons the whole video covers.
4. Skip any timestamp that is malformed or out of order. Do not guess any timestamp, id, title, channel, or year.
5. Do not change lesson text, quizzes, activities, references already present, or any other career. Do not add other videos.
6. Do not add a video to `nurs-path-to-practice`. That course is still waiting for a replacement video.
7. Educational orientation only. Do not attach a segment to a lesson if it presents clinical procedures, medication or dosing, vital-sign ranges or thresholds, symptom lists, health advice for viewers, vaccine names or schedules, step-by-step handwashing, PPE or disinfection, or statements about scope of practice, licensure requirements, fees, or exam details. Most of these videos are US-based and aimed at exam prep, so do not use segments that present US law, boards, or practice acts as facts. The Philippine PRC and CHED details stay with the existing official references.
8. Run `npm run validate:content`, `npm run lint`, `npx expo export -p web`, and `npm run check:links -- nursing`. The link check should confirm each video exists and that its title matches. If a video is not embeddable, or its title does not match, report it. Do not remove it silently.
9. Do not commit or push.

## Videos

APA author is the channel name. Reference URL format: `https://youtu.be/<id>`.

| Course id | Video id | Title | Channel | Year |
|---|---|---|---|---|
| `nurs-profession-ethics` | CGvjk7hgASQ | Nursing Profession and Ethics - Fundamentals of Nursing \| @LevelUpRN | Level Up RN | 2021 |
| `nurs-body-basics` | 0JDCViWGn-0 | Human Body Systems Overview (Updated 2024) | Amoeba Sisters | 2024 |
| `nurs-patient-communication` | ZomOEH97xIk | Therapeutic Communication Techniques \| Mental Health Nursing | NursingSOS | 2021 |
| `nurs-fundamentals-of-care` | bRp2L0N7ppI | ADPIE Nursing Process Fundamentals \| 5 Steps Made Simple | SimpleNursing | 2025 |
| `nurs-infection-prevention` | r7LbCwyxzug | The Chain and Stages of Infection - Fundamentals of Nursing - Principles \| @LevelUpRN | Level Up RN | 2021 |
| `nurs-health-promotion` | xZCEjrj4yWg | Nursing Fundamentals: Prevention, Education, and Promotion | CASS RN | 2022 |
| `nurs-safety-documentation` | Uos5uDihnXE | Quality Improvement, Patient Safety Events, Incident Reporting: Fundamentals of Nursing \| @LevelUpRN | Level Up RN | 2023 |
| `nurs-path-to-practice` | (none yet) | | | |

## Chapters (only for videos that have them)

**nurs-profession-ethics (CGvjk7hgASQ).** Well-formed chapters: Cathy's Intro 0:00; Meet Meris 2:31; Profession of Nursing 3:05; State Board of Nursing 3:22; Nurse Practice Act 3:38; Scope of Practice 4:00; Evidence Based Practice 4:32; Ethics of Care 5:14; American Nurses Association 5:34; Ethical Dilemma 5:59; Ethics Committee 6:44; Key Point 7:29; Ethical Principles 7:54; Principle of Autonomy 8:22; Advocacy 8:36; Benficence 8:57 (label as shown on YouTube, with its typo; do not use); Non-Maleficence 9:08; Justice 10:01; Fidelity 10:39; Veracity 11:01; Conclusion 11:32; Meris' First Patient 11:44. Use only the ethics chapters (Ethics of Care 5:14, Ethical Principles 7:54, Principle of Autonomy 8:22, Advocacy 8:36, Justice 10:01, Veracity 11:01) on lessons about ethics in everyday practice and consent or patient choice. Do not use State Board of Nursing, Nurse Practice Act, Scope of Practice, or American Nurses Association: they present US legal and professional structure, and lesson 9 must make no scope-of-practice claims. Do not use the personal-anecdote chapters. Do not use it for privacy, dignity, or boundaries lessons: the chapters do not name them.

**nurs-body-basics (0JDCViWGn-0).** Well-formed chapters: Intro 0:00; Levels of Organization 0:34; All Eleven Body Systems 0:52; Circulatory 1:21; Digestive 2:33; Endocrine 3:09; Excretory 3:33; Integumentary 4:38; Lymphatic and Immune 5:20; Muscular 6:11; Nervous 6:29; Reproductive 7:15; Respiratory 7:43; Skeletal 8:17; Why Learn This Topic 8:39; Importance of Systems Working Together 8:51. This is a high-school biology video of general system functions, not nursing. Use it on the body-system and cell/tissue/organ lessons only. Do not use it on the lesson about why body systems matter to nursing. Maximum 5 lessons.

**nurs-infection-prevention (r7LbCwyxzug).** Well-formed chapters: What to Expect? 0:00; Chain of Infection 0:20; Infectious Agent 0:30; Reservoir 0:48; Portal of Exit 1:04; Mode of Transmission 1:35; Portal of Entry 2:06; Susceptible Host 2:28; Stages of Infection 3:13; Incubation Stage 3:24; Prodromal Stage 3:57; Illness Stage 4:23; Convalescence Stage 4:57; What's Next? 5:36. Use only the chain-of-infection chapters, on the lessons about how infections spread and breaking the chain. Do not use the Stages of Infection chapters: no lesson covers them, and they list clinical stages. Do not use it on hygiene, protective equipment, cleaning, or waste lessons.

**nurs-safety-documentation (Uos5uDihnXE).** Well-formed chapters: What to expect 0:00; Quality Improvement (QI) 0:19; Patient Safety Events 4:22; Quiz time! 8:48. Use Patient Safety Events on the lesson about patient safety culture and learning from errors. Use Quality Improvement only on a lesson about improving safety through review. This video covers only part of the course topic: do not use it on documentation, handoff, team-role, or privacy lessons. Do not use the quiz chapter.

Videos with no chapters read: `nurs-patient-communication`, `nurs-fundamentals-of-care`, `nurs-health-promotion`. Use `start: 0` and "Full video" only on lessons the whole video covers. The communication video should go only on lessons about general communication techniques such as listening, questioning, and empathy, not on mental-health clinical content. The ADPIE video should go only on the lesson that introduces the nursing process, not on lessons about a single step. The health promotion video should go only on lessons about why prevention matters and health education.

## Flags

- `nurs-profession-ethics`, `nurs-infection-prevention`, `nurs-safety-documentation`: Level Up RN videos are exam-prep material (NCLEX, ATI, HESI) and their descriptions promote paid study products. Use only the segments named above.
- `nurs-fundamentals-of-care`: SimpleNursing's description mentions NCLEX, so it is also exam-prep. It is conceptual (ADPIE) and fits the nursing process lesson only.
- `nurs-patient-communication`: the video shows a disclaimer that it is for entertainment only and not medical advice, and it is framed as mental health nursing. Use general communication techniques only.
- `nurs-health-promotion`: the YouTube description is very short and no chapters were read, so the content is not fully verified. Check that it names no vaccines, schedules, or health advice before use.
- `nurs-path-to-practice`: the supplied link was "So You Want to Be a NURSE PRACTITIONER [Ep. 25]" (Med School Insiders, 2021). It was left out: it is about the advanced practice route, is US-based, and presents requirements and scope as facts. Still waiting for a replacement video on becoming a licensed nurse or on nurse self-care.
- `nurs-patient-communication` and `nurs-fundamentals-of-care` video ids were matched to the supplied screenshots (title, channel, date) and the earlier supplied links. They could not be opened directly. The link check must confirm the title matches.
- All videos are US-based. Video length and embedding permission were not checked.

## Final report must include

1. A mapping table for every video added: lesson id, lesson title, chapter label, start seconds. List lessons that did not get a video as a count per course.
2. Any timestamp skipped and why. Any video that failed the link check, was not embeddable, or had a title mismatch.
3. Every file added or modified, and any hotspots touched.
4. Each validation result as passed, failed, or not run, with the reason.
5. A manual checklist: open one lesson per course that has a video, confirm the video shows at the end, plays, starts at the chapter, and the references are still there.
6. The exact, unedited output of `git status --short` and `git diff --stat`, and the branch name.
