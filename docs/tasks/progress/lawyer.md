# Lawyer career plan checkpoint

Career: Lawyer  
Status: `available`  
Review: owner approval for availability was received; expert review sign-off is still incomplete, and reviewer details remain placeholders in `lawyer/REVIEW_NOTES.md`.

## Summary

This plan is for the Lawyer career in `src/features/learning-hub/lawyer/` and follows the orientation-only scope in the spec: it introduces learners to the legal profession, core legal concepts, professional ethics, legal research and writing, and the support work that keeps legal services running without offering legal advice or real-case strategy.

This existing checkpoint supplied the curriculum and lesson titles for build mode. The outline is retained below; implementation checklists record the completed content, wiring, and validation state. The owner has approved making the career available.

## Tracks and course overview

### Track 1: Lawyer Path
- ID: `law-lawyer-path`
- Duration: 5 months
- Purpose: Build analysis, reasoning, communication, and professional judgment for students exploring law.

### Track 2: Paralegal and Legal Support
- ID: `law-paralegal`
- Duration: 4 months
- Purpose: Build the skills and workflow awareness needed to support legal teams, document preparation, intake, and office operations.

## Course checklist

### Track 1: Lawyer Path
- [x] `law-profession-ethics` — course.js, lessons, questions, wrapper, registered, validated
- [x] `law-legal-system` — course.js, lessons, questions, wrapper, registered, validated
- [x] `law-legal-research` — course.js, lessons, questions, wrapper, registered, validated
- [x] `law-legal-writing` — course.js, lessons, questions, wrapper, registered, validated
- [x] `law-constitutional-basics` — course.js, lessons, questions, wrapper, registered, validated
- [x] `law-civil-criminal-overview` — course.js, lessons, questions, wrapper, registered, validated
- [x] `law-procedure-advocacy` — course.js, lessons, questions, wrapper, registered, validated
- [x] `law-path-to-practice` — course.js, lessons, questions, wrapper, registered, validated

### Track 2: Paralegal and Legal Support
- [x] `law-legal-office-ops` — course.js, lessons, questions, wrapper, registered, validated
- [x] `law-document-drafting` — course.js, lessons, questions, wrapper, registered, validated
- [x] `law-court-filing` — course.js, lessons, questions, wrapper, registered, validated
- [x] `law-research-support` — course.js, lessons, questions, wrapper, registered, validated
- [x] `law-client-intake-confidentiality` — course.js, lessons, questions, wrapper, registered, validated
- [x] `law-legal-tech-records` — course.js, lessons, questions, wrapper, registered, validated

---

## Track 1: Lawyer Path

### 1) `law-profession-ethics`
Course title: The Legal Profession and Ethics  
Short code: `LEG`  
Subtitle: What lawyers do and the duties they carry.

Required outcome: Describe the roles lawyers play and why professional ethics matter.

Lesson plan:
1. What lawyers do — Objective: Explain the broad roles lawyers play in advising, drafting, advocacy, and dispute resolution.
2. The legal profession in context — Objective: Describe how legal work fits into public institutions, private practice, government, and advocacy.
3. Ethics as professional responsibility — Objective: Introduce why lawyers are expected to be trustworthy and accountable in every professional interaction.
4. Confidentiality and trust — Objective: Explain the importance of safeguarding sensitive information in client relationships.
5. Competence and diligence — Objective: Describe why careful preparation, competence, and timely work matter in legal service.
6. Independence and fairness — Objective: Show how lawyers are expected to act honestly and avoid unfair influence or conflict of interest.
7. Client communication basics — Objective: Explain why clear, respectful communication helps clients understand options and process.
8. Professional boundaries — Objective: Identify the difference between legal guidance and personal advice, and why boundaries matter.
9. Common ethical challenges — Objective: Recognize situations where pressure, time constraints, or personal bias can create ethical risk.
10. Ethical habits for future law students — Objective: Summarize the habits of professionalism, reflection, and integrity expected in legal work.

Review notes: Must include a short “educational, not legal advice” note in the first lesson of every course.

### 2) `law-legal-system`
Course title: The Philippine Legal System  
Short code: `SYS`  
Subtitle: How laws are made, applied, and interpreted.

Required outcome: Explain the branches of government and the hierarchy of legal authority in general terms.

Lesson plan:
1. Law in everyday life — Objective: Explain how legal rules shape institutions, rights, obligations, and public life.
2. The three branches of government — Objective: Summarize the roles of the legislature, executive, and judiciary in general terms.
3. How laws are made — Objective: Describe the general process by which ideas become statutes and policies.
4. Rules and regulations — Objective: Explain how regulations help carry out broader legal directions in government practice.
5. The Constitution as the foundation — Objective: Define the Constitution’s role as the country’s broad legal foundation.
6. Hierarchy of authority — Objective: Explain the general rule that the Constitution sits above statutes, and that court decisions and regulations operate within that framework.
7. Courts and case resolution — Objective: Describe how courts decide disputes and interpret legal rules in a system of precedent and reasoning.
8. Legal interpretation basics — Objective: Introduce concepts of interpretation, ambiguity, and how general principles guide reading legal texts.
9. Rights and duties — Objective: Explain how legal systems protect rights while also setting duties and limits.
10. Legal systems and public trust — Objective: Summarize why rule of law and fair institutions matter to society.

Review notes: Must describe the hierarchy of authority generally (Constitution, statutes, regulations, court decisions) without citing specific laws or cases.

### 3) `law-legal-research`
Course title: Legal Research Skills  
Short code: `RES`  
Subtitle: Finding and evaluating legal sources.

Required outcome: Describe types of legal sources and a method for researching a legal question.

Lesson plan:
1. Research as a legal skill — Objective: Explain why legal research is a structured process rather than a quick web search.
2. Types of legal sources — Objective: Distinguish between constitutions, statutes, regulations, commentaries, and court decisions in general terms.
3. Starting with the issue — Objective: Explain how narrowing the legal question improves research quality.
4. Finding primary sources — Objective: Show how to locate governing authorities and official materials to answer a general legal question.
5. Finding secondary sources — Objective: Describe how explanations, summaries, and background materials help learners understand unfamiliar topics.
6. Evaluating source quality — Objective: Explain how authority, accuracy, recency, and context affect whether a source is useful.
7. Organizing findings — Objective: Describe a simple method for capturing key sources, notes, and relevant points.
8. Reading for relevance — Objective: Learn to separate core rule statements from background explanation or examples.
9. Creating a research trail — Objective: Show how to keep notes that explain what question was asked and why sources were chosen.
10. Research habits for law students — Objective: Summarize disciplined, careful research practices that help avoid unsupported conclusions.

Review notes: Keep it general; do not teach strategy for a specific legal problem or rely on invented case citations.

### 4) `law-legal-writing`
Course title: Legal Writing and Analysis  
Short code: `WRT`  
Subtitle: Reasoning and writing clearly.

Required outcome: Use a structured method (such as issue, rule, application, conclusion) to analyze a simple scenario.

Lesson plan:
1. Why legal writing matters — Objective: Explain how clear writing helps legal reasoning become understandable and reliable.
2. The issue-rule-application-conclusion method — Objective: Introduce the core structure for analyzing a legal problem in a clear sequence.
3. Framing the issue — Objective: Explain how to identify the question being asked without drifting into conclusions too early.
4. Stating the rule — Objective: Describe how to present the governing principle in plain, general language.
5. Applying the rule — Objective: Show how to connect the facts of a scenario to a general rule in a logical way.
6. Writing a conclusion — Objective: State how to present the result clearly and keep the conclusion connected to the analysis.
7. Clarity and precision — Objective: Explain why legal writing should avoid vague words, loaded language, and weak assumptions.
8. Organization and headings — Objective: Show how headings and sequence make a legal memo or summary easier to follow.
9. Separating facts from assumptions — Objective: Highlight the need to distinguish what is fact, what is assumption, and what is unanswered.
10. Improving legal writing habits — Objective: Summarize how revision, logic checks, and plain language make writing stronger.

Review notes: This is not a legal drafting course; it is a general training in analysis and reasoning.

### 5) `law-constitutional-basics`
Course title: Constitutional Law Concepts  
Short code: `CON`  
Subtitle: The ideas behind the Constitution.

Required outcome: Explain core constitutional ideas such as separation of powers and basic rights at a concept level.

Lesson plan:
1. What a constitution does — Objective: Explain the Constitution’s role in organizing government and protecting fundamental rights.
2. Separation of powers — Objective: Describe the idea that distinct branches of government should have different roles and checks on each other.
3. National and local government — Objective: Describe how national and local governments can have distinct but connected responsibilities within a unitary state with local autonomy.
4. Rights and liberties — Objective: Explain the broad idea that constitutions protect personal freedoms and limit government power.
5. Equality and fairness — Objective: Describe the constitutional principle that people should be treated fairly under law.
6. Due process and procedural fairness — Objective: Explain the concept that government decisions should follow fair procedures.
7. Rule of law — Objective: Describe how constitutions help maintain a system where power is exercised within lawful limits.
8. The role of courts in constitutional interpretation — Objective: Explain that courts help decide how constitutional principles work in practice.
9. Rights in daily life — Objective: Illustrate how constitutional concepts affect public institutions, citizenship, and daily rights.
10. Constitutional thinking habits — Objective: Summarize how to approach constitutional questions with caution, balance, and respect for institutional roles.

Review notes: Must remain concept-level and avoid giving legal advice or citing specific constitutional sections.

### 6) `law-civil-criminal-overview`
Course title: Civil and Criminal Law Overview  
Short code: `CCL`  
Subtitle: The big picture of private and public law.

Required outcome: Distinguish civil and criminal matters and describe common areas of law.

Lesson plan:
1. Civil law and private disputes — Objective: Explain how civil law usually focuses on rights, duties, and obligations between people or entities.
2. Criminal law and public protection — Objective: Describe how criminal law concerns conduct that society treats as a public wrong requiring formal process.
3. Common civil matters — Objective: Identify examples such as contracts, obligations, property, and dispute resolution in general terms.
4. Common criminal matters — Objective: Explain that criminal law often addresses conduct affecting safety, order, and public trust.
5. The roles of parties and participants — Objective: Describe the general difference between the parties in civil and criminal matters and the role of public institutions.
6. Burden and standards of proof — Objective: Explain that legal systems use different evidentiary standards depending on the type of legal matter.
7. Wrongful acts and remedies — Objective: Contrast the idea of a remedy in civil law with the idea of public accountability in criminal law.
8. Lawyers in civil and criminal practice — Objective: Identify the different roles lawyers may play in advising, bargaining, litigation, or defense.
9. The difference between legal concepts and legal stories — Objective: Show why understanding the legal question matters before taking sides in a dispute.
10. Navigating broad legal categories — Objective: Summarize how different areas of law fit together under the legal system’s structure.

Review notes: Keep the course conceptual and do not include legal strategy or procedural instructions.

### 7) `law-procedure-advocacy`
Course title: Procedure, Evidence, and Advocacy Basics  
Short code: `PRC`  
Subtitle: How cases move and how lawyers argue them.

Required outcome: Describe the general stages of a case and the purpose of evidence and oral advocacy.

Lesson plan:
1. Case flow in general terms — Objective: Explain that legal disputes usually move through a sequence of filing, review, preparation, hearing, and resolution.
2. The purpose of procedure — Objective: Describe how procedures help legal matter proceed in an orderly and fair way.
3. Initial steps and pleadings — Objective: Introduce the idea that documents frame the questions and issues in a legal matter.
4. The role of evidence — Objective: Explain that evidence helps parties establish relevant facts and support claims.
5. Fact, relevance, and reliability — Objective: Show why legal systems look for information that makes sense in context and is trustworthy.
6. Oral advocacy basics — Objective: Explain how lawyers present arguments clearly, respectfully, and in a structured way.
7. Cross-examination and questioning — Objective: Introduce the purpose of testing information and clarifying facts without turning into a debate about tactics.
8. Persuasion without manipulation — Objective: Explain how effective advocacy relies on logic, fairness, and integrity rather than pressure.
9. Preparing a simple case summary — Objective: Show how lawyers organize facts, issues, and arguments for a case overview.
10. Good advocacy habits — Objective: Summarize how clear structure, respect, and preparation support fair legal argument.

Review notes: Must stay at a general educational level and avoid real-matter strategy or procedural instructions.

### 8) `law-path-to-practice`
Course title: Path to Practice and Client Communication  
Short code: `PTP`  
Subtitle: Becoming a lawyer and working with clients.

Required outcome: Describe the general path to becoming a lawyer and good client-communication habits.

Lesson plan:
1. The path to legal practice — Objective: Explain that becoming a lawyer usually involves study, professional training, and assessment before practice.
2. Law school and pre-law foundations — Objective: Describe the general value of strong writing, reading, research, and reasoning skills before entering legal study.
3. Professional preparation — Objective: Explain how law students build habits of ethical thinking, analysis, and time management.
4. The role of mentorship — Objective: Identify how mentoring, feedback, and practice shape a law student’s professional growth.
5. Client intake basics — Objective: Explain why clear intake questions and respectful communication matter when working with a client.
6. Listening and asking good questions — Objective: Show how careful listening helps lawyers understand a client’s situation without jumping to conclusions.
7. Explaining legal process — Objective: Describe how lawyers help clients understand legal steps, options, and what to expect in general terms.
8. Communication and empathy — Objective: Explain why respectful, clear communication reduces confusion and increases trust.
9. Boundaries in lawyer-client relationships — Objective: Show why clarity about role, advice, and confidentiality matters in professional practice.
10. Your next steps as a future legal professional — Objective: Summarize the habits and values that support a thoughtful, ethical path into the profession.

Review notes: This course should mention only the general path to practice and client communication; no legal eligibility or bar-exam specifics beyond the general note that official sources should be checked.

---

## Track 2: Paralegal and Legal Support

### 1) `law-legal-office-ops`
Course title: Legal Office Operations  
Short code: `LOP`  
Subtitle: How a legal office runs.

Required outcome: Describe the daily workflow and responsibilities in a legal office.

Lesson plan:
1. What a legal office does — Objective: Explain how legal offices coordinate people, records, documents, and client communication.
2. The flow of a legal matter — Objective: Describe the basic sequence from intake to research, drafting, review, and filing.
3. Case files and records — Objective: Explain why organized records support reliable work and communication.
4. Team roles in a legal office — Objective: Introduce the idea that paralegals, lawyers, clerks, and staff support a shared workflow.
5. Communication with clients — Objective: Show how clear updates and consistent responses support client trust and office efficiency.
6. Scheduling and coordination — Objective: Explain the need to coordinate meetings, shared work plans, and task handoffs carefully.
7. Document handling and intake — Objective: Describe how legal offices manage incoming information, correspondence, and document tracking.
8. Quality review and consistency — Objective: Explain why checking drafts, dates, and labels helps teams work accurately.
9. Ethics and professionalism in office work — Objective: Describe why confidentiality and careful record-keeping matter in daily operations.
10. Legal office habits — Objective: Summarize the daily habits that keep an office organized, reliable, and professional.

### 2) `law-document-drafting`
Course title: Legal Documents and Drafting Basics  
Short code: `DOC`  
Subtitle: Common legal documents and how they are prepared.

Required outcome: Identify common legal document types and the parts of a well-organized document.

Lesson plan:
1. What legal documents do — Objective: Explain how legal documents record obligations, rights, procedures, and official communication.
2. Common document types — Objective: Recognize categories such as letters, notices, summaries, drafts, and formal filings in general terms.
3. Structure of a good document — Objective: Describe the importance of headings, dates, parties, purpose, and clear language.
4. Audience and purpose — Objective: Explain how a document’s audience changes how it should be written and organized.
5. Plain language and precision — Objective: Show the value of clear wording and consistent terms in legal documents.
6. Reviewing for completeness — Objective: Explain how checks for facts, references, and signatures help make a document usable.
7. Drafting from a source — Objective: Describe how research notes and instructions become a structured first draft.
8. Internal consistency — Objective: Explain how consistent names, dates, and terms reduce confusion in legal documents.
9. Professional formatting habits — Objective: Describe how neat formatting supports readability and legal office standards.
10. Drafting ethics and accuracy — Objective: Summarize why document preparation requires attention to detail, honesty, and careful review.

### 3) `law-court-filing`
Course title: Court Processes and Filing Basics  
Short code: `FIL`  
Subtitle: How documents reach the court.

Required outcome: Describe in general terms how filings, records, and schedules are handled.

Lesson plan:
1. The court filing workflow — Objective: Explain the basic set of steps by which documents move through a legal office to the court.
2. Intake and classification — Objective: Describe how incoming documents are reviewed and categorized for action.
3. Filing checklists — Objective: Explain why complete signatures, dates, and attachments matter for efficient handling.
4. Case records and dockets — Objective: Introduce how legal teams track matters and important dates in a record system.
5. Calendars and follow-ups — Objective: Explain the importance of coordinating meetings, follow-up tasks, and office actions.
6. Recordkeeping for filings — Objective: Explain how copies, logs, and case numbers support traceability.
7. Internal review before submission — Objective: Describe the importance of checking names, formatting, and document completeness.
8. Communication with court staff — Objective: Explain how clear, professional communication helps offices manage routine administrative tasks.
9. Filing errors and corrections — Objective: Introduce how legal offices identify and remedy common document issues while maintaining professionalism.
10. Administrative professionalism — Objective: Summarize why careful filing habits support reliable court processes and client trust.

### 4) `law-research-support`
Course title: Legal Research Support  
Short code: `RSP`  
Subtitle: Helping lawyers find what they need.

Required outcome: Organize research tasks and summarize sources accurately.

Lesson plan:
1. The role of research support — Objective: Explain how legal support work helps lawyers gather trustworthy background information efficiently.
2. Defining the research question — Objective: Show how clarity about the issue leads to better source selection.
3. Organizing source lists — Objective: Describe how to keep track of authorities, summaries, and key notes in a clean format.
4. Reading with a purpose — Objective: Explain how to find relevant points without losing the broader context of a source.
5. Making short summaries — Objective: Demonstrate how to convert a long source into a concise, accurate brief summary.
6. Comparing sources — Objective: Show how to identify similarities, differences, and gaps across legal materials.
7. Highlighting facts and issues — Objective: Explain how to separate background facts from the legal question being researched.
8. Creating a research memo — Objective: Show how to summarize findings in a way lawyers can use to decide next steps.
9. Keeping a trustworthy trail — Objective: Explain why source notes should show where information came from and how it was interpreted.
10. Research support as a service skill — Objective: Summarize how careful work, consistency, and accuracy support legal teamwork.

### 5) `law-client-intake-confidentiality`
Course title: Client Intake and Confidentiality  
Short code: `CIC`  
Subtitle: First contact and protecting information.

Required outcome: Explain good intake practice and why confidentiality is central.

Lesson plan:
1. First contact matters — Objective: Explain how a respectful first interaction sets the tone for trust and professionalism.
2. Intake questions and purpose — Objective: Describe how intake information helps the office understand the concern and next steps.
3. Listening carefully — Objective: Explain why accurate notes and nonjudgmental listening help gather useful information.
4. Maintaining boundaries — Objective: Explain the need to clarify roles and keep communication professional from the start.
5. Confidentiality basics — Objective: Describe why protecting client information is central to trust and professional responsibility.
6. Handling sensitive information — Objective: Explain how limited access, careful notes, and secure storage help protect privacy.
7. Information intake checklist — Objective: Summarize the basics of collecting relevant facts without making assumptions.
8. Avoiding assumptions — Objective: Explain why intake should focus on facts, context, and clear questions rather than labels or guesses.
9. Professional communication standards — Objective: Describe how respectful, plain communication helps clients feel heard and informed.
10. Intake and privacy habits — Objective: Summarize how professionalism and confidentiality support trustworthy legal service.

### 6) `law-legal-tech-records`
Course title: Legal Technology and Records Management  
Short code: `LTR`  
Subtitle: Tools and file systems that keep cases organized.

Required outcome: Describe common legal-office tools and basic records-management practice.

Lesson plan:
1. Why legal technology matters — Objective: Explain how digital tools help teams organize, search, and share information efficiently.
2. Common legal office tools — Objective: Identify general categories such as document management, calendars, email, shared drives, and case tracking systems.
3. Naming and file structures — Objective: Explain why consistent names and folders reduce confusion and improve retrieval.
4. Secure access and permissions — Objective: Describe how limiting access protects confidential information and keeps records accountable.
5. Document versioning — Objective: Explain why tracking revisions helps teams avoid confusion and maintain accuracy.
6. Search and retrieval — Objective: Describe how good records systems make it easier to find documents and task history quickly.
7. Calendar and task coordination — Objective: Explain how reminders and schedules support dependable legal office workflows.
8. Communication tools and professionalism — Objective: Describe how email, chat, and shared systems should be used clearly and respectfully.
9. Backups and continuity — Objective: Explain why reliable storage and recovery habits help legal teams continue working under normal conditions.
10. Records habits that support trust — Objective: Summarize how organized records and secure systems build confidence and support consistent legal work.

---

## Review checklist for subject experts

A human reviewer should confirm the following before this career is changed to available:

- The course content remains educational and introductory, not legal advice or case-specific strategy.
- The “educational, not legal advice” note appears at the start of each course’s first lesson.
- The hierarchy of authority is described generally without invented citations or specific legal claims.
- The Supreme Court and Integrated Bar of the Philippines are mentioned by name only, with a note to check official sources for current requirements.
- The two tracks feel distinct: Lawyer Path emphasizes study, reasoning, and advocacy skills; Paralegal track emphasizes office operations, drafting, and support work.
- No code playground activities or technical coding exercises appear in any lesson.
- No penalties, deadlines, prescriptive periods, bar passing rates, or eligibility rules are included.
- No claims are made about what paralegals are legally allowed to do.

## Build completion and availability

- All 14 course configurations, 140 lessons, 140 quiz questions, wrappers, track definitions, and dynamic course routes are present.
- The combined careers registry and content validator are wired; `npm run validate:content` is the repeatable integrity check.
- Documentation and `lawyer/REVIEW_NOTES.md` are updated for subject-expert review.
- The Lawyer career is available with `trackIds: ['law-lawyer-path', 'law-paralegal']`; both tracks and all 14 courses resolve through the shared registry.

## Validation

Date: 2026-10-20  
Branch: `lawyer`

- `npm run validate:content` — passed; checked 5 tracks, 31 courses, and 14 dynamic course routes. The only warning was the existing answer-index skew in `data-visualization`; no Lawyer warnings were reported.
- Inline generated-content check — passed; 14 courses, 140 lessons, 140 quiz questions, 140 distinct examples, and balanced answer positions in every Lawyer course.
- `npm run lint -- --no-cache` — passed.
- `npx expo export -p web` — passed; web bundle exported to `dist` with the `/CareerLaunch-/` base path.
- `git diff --check` — passed with no output.
- `git grep --untracked -n -i $term -- src/features/learning-hub/lawyer docs/tasks/progress` (with `$term` set to the searched unitary-system keyword) — no matches (exit code 1).
- `git grep --untracked -n -i -E "(article|section|sec\\.|art\\.) [0-9]+|G\\.R\\.| v\\. | vs\\. |penalt|prescri|deadline|passing rate|within [0-9]+ days" -- src/features/learning-hub/lawyer` — no matches (exit code 1).
- `git grep --untracked -n -i -E "playground|codeBlock|runCode" -- src/features/learning-hub/lawyer` — no matches (exit code 1).

## Availability validation

Date: 2026-10-20  
Branch: `lawyer`

- `npm run validate:content` — passed; checked 5 tracks, 31 courses, and 14 dynamic course routes. The only warning was the existing answer-index skew in `data-visualization`.
- `npm run lint -- --no-cache` — passed.
- `npx expo export -p web` — passed; web bundle exported to `dist` with the `/CareerLaunch-/` base path.
- `git diff --check` — passed.
- `git grep --untracked -n -i -E "awaiting expert review|coming-soon" -- src/features/learning-hub/careers` — matches only the eight careers that remain `coming-soon`; Lawyer has no match.

## Validation after main integration

Date: 2026-10-21; branch: `lawyer`

- `npm run validate:content` — passed; checked 10 careers, 7 tracks, and 45 courses. The only warning was an answer-index skew in `data-visualization` (60%); no Lawyer warnings were reported.
- `npm run lint -- --no-cache` — passed.
- `npx expo export -p web` — passed; the web bundle exported to `dist` using the `/CareerLaunch-/` base path.
- `git diff --check` — passed with no output.
- Manual app/device checklist — not run. Team checklist: open Lawyer from Careers; open both tracks; open at least one course in each track; mark a lesson complete; take passing and failing quizzes; confirm progress updates; spot-check lessons for accuracy. Subject-expert review notes remain in `lawyer/REVIEW_NOTES.md`.
