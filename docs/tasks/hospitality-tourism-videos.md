# Hospitality & Tourism video pass (brief 12, videos only)

Add videos to Hospitality & Tourism lessons, using the details below. References already exist on every lesson and must be kept. A video is **not** required on every lesson or course: attach each video only to the lessons listed for it.

## Rules

1. Add the videos to `src/features/learning-hub/hospitality-tourism/links.js` using the shared `ytVideo` helper from `shared/lessonLinks.js`. Follow the Software Engineering pattern: `video` on the lesson, plus a matching APA entry added to that lesson's `references`. A course may have more than one video, because each video goes only to its own listed lessons.
2. Use each video only on the lessons in its "Lessons to use" cell, and only if the lesson's title and objective clearly match what the video's title promises. A lesson gets at most one video. Never add a video to a lesson that is not listed for it.
3. None of these videos has a chapter list. Use `start: 0` and the chapter label "Full video".
4. The year is "n.d." (not available) for every video. Use `(n.d.)` in the APA line. APA author is the channel name. Reference URL format: `https://youtu.be/<id>`.
5. Do not guess any id, title, channel, or year. Do not add other videos. Courses marked "(none yet)" get no video.
6. Do not change lesson text, quizzes, activities, references already present, or any other career.
7. Never add a video to these lessons: Menu Information and Honest Answers; Hygiene and Guest Confidence; Responsible Information Checks; Current Program Information.
8. Run `npm run validate:content`, `npm run lint`, `npx expo export -p web`, and `npm run check:links -- hospitality-tourism`. The link check should confirm each video exists and that its title matches. If a video is not embeddable or its title does not match, report it. Do not remove it silently.
9. Do not commit or push.

## Videos

| Course id | Video id | Title | Channel | Year | Lessons to use | Review note |
|---|---|---|---|---|---|---|
| `ht-hospitality-industry` | 0POQpL8DjuY | Introduction of the Hospitality and Tourism Industry \| What is Hospitality? \| What is Tourism? | TN's Hospitality Insights | n.d. | Hospitality as a Career | Also covers tourism; use only for hospitality. |
| `ht-hospitality-industry` | qYyk2TjCPM0 | Hotel Departments and their functions I Core Areas I Supportive department I Hotel Management I | Hospitality Broadcast | n.d. | Hotel Departments at a Glance | |
| `ht-hospitality-industry` | zioy-RozBhU | Guest Service Agent Job Responsibilities \|\| How To Work In Luxurious Hotels \|\| Job Interview | Job Intelligence Global | n.d. | Roles Behind a Guest Experience | Job-interview coaching channel. Check for salary or hiring claims before merging. |
| `ht-guest-service` | btWlBHE0pe4 | How to communicate clearly | TED-Ed | n.d. | Clear and Courteous Communication | General communication, not hospitality-specific. |
| `ht-guest-service` | qFqhKahDuoU | How to Welcome GUESTS in English: Useful Words & Phrases | Teacher Mike English | n.d. | Personalizing a Welcome Respectfully | English-learning video. Check that it is not only about home visitors. |
| `ht-guest-service` | TgewHNBz3U8 | How to Answer Customer Questions & Concerns | Get Schooled | n.d. | Responding to a Concern | General customer service. |
| `ht-guest-service` | tWnaKsmQ6k8 | The Right Words at the Right Time - Customer ServiceRecovery for Hospitality Industry | Atana | n.d. | Service Recovery and Follow-Through | Looks like a hotel group's training video. Do not name the company in lessons. |
| `ht-front-office` | 8jNnj15i6gk | Introduction to Front Office Operations | TOURISM HUT | n.d. | Front Office as an Information Hub | |
| `ht-front-office` | cHu1AY82Log | HOW TO: Welcome a guest at your hotel 🛎️ HAPPYCULTURE | HappyCulture Académie | n.d. | A Welcoming Arrival | How-to style. Use only for the welcome lesson. |
| `ht-front-office` | nx_fcuIhXhY | Introduction to Housekeeping/Housekeeping sections/functions and responsibilities of housekeeping | Hospitality Broadcast | n.d. | Housekeeping's Contribution | |
| `ht-food-beverage` | (none yet) | | | | | |
| `ht-events-mice` | _aMeJYUJXW8 | Event Planning Training Course Lecture \| Learn Professional Event Management Skills | Peach Academy | n.d. | Events as Shared Experiences; Understanding an Event Brief; Venue and Space Considerations; Coordinating Event Roles | Channel may promote its own courses. |
| `ht-hospitality-business` | bwcyXcOpWVs | The Secret Ingredients of Great Hospitality \|Will Guidara \| TED | TED | n.d. | Guest Value and Service Design; Quality and Consistency | A talk about service culture. Do not use on the cost or revenue lessons. |
| `ht-tourism-industry` | X5uxoBv-myU | What is Tourism? | Tourism Roadmap | n.d. | Tourism as a Connected Experience; Tourism Forms and Settings | |
| `ht-philippine-destinations` | SpQpWCcNIlg | Love the Philippines | Tourism Philippines | n.d. | Many Places, Many Stories; Landscapes and Visitor Experiences | Promotional video. Check for prices, visa, or advisory details before merging. |
| `ht-tour-planning` | aPa_vrPqfxE | Tour Guiding (Introduction, Reminders, Sample Commentary, and Closing) | Kyle Cervantes | n.d. | The Guide as a Facilitator; Closing and Reflecting on a Tour | Likely a student presentation. Sample commentary may state facts about named places. |
| `ht-travel-services` | (none yet) | | | | | |
| `ht-sustainable-tourism` | ufnkk5UqXi4 | Community-Based Tourism / Meaning, Activities and Benefits of Community-Based Tourism / Ecotourism | Ecotourism Journey | n.d. | Community Voice and Participation; Respectful Community-Based Experiences; Local Benefits and Fair Collaboration | May mention named communities. Check before merging. |
| `ht-path-to-practice` | OflmzCaPjGg | Career Opportunities in Hospitality and Tourism Industry | TLE Philippines by Mylene Huliganga, PhD (Doc Mye) | n.d. | Hospitality Career Families; Tourism Career Families | Check for salary or demand claims before merging. |

## Videos not used

- `UZUQGPR_b2A` (table setup training): an operating how-to, not an orientation.
- `hhnjWTd7dQE` (English listening practice about guest visits at home): not about hospitality service.
- `w7KcIlJ-Ffk`: unavailable or embedding is disabled.
- `VgrymcKDI9M` (step-by-step fine-dining table service): an operating procedure, not an orientation. `ht-food-beverage` is waiting for a replacement.

## Final report must include

1. A mapping table for every video added: lesson id, lesson title, chapter label, start seconds.
2. Any video that failed the link check, was not embeddable, or had a title mismatch.
3. Every file added or modified, and any hotspots touched.
4. Each validation result as passed, failed, or not run, with the reason.
5. A manual checklist: open each lesson that has a video, confirm the video shows at the end and plays, and the references are still there.
6. The exact, unedited output of `git status --short` and `git diff --stat`, and the branch name.
