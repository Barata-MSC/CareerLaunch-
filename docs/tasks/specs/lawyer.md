# Career Spec: Lawyer

Run with `docs/tasks/03-career-content-template.md`. This career has `review_required: true`; the content has been reviewed and the owner approved making it available. Sign-off details remain to be recorded in `src/features/learning-hub/lawyer/REVIEW_NOTES.md`. The content is an **orientation to the profession and its skills**, not a course in substantive law.

```yaml
career:
  id: lawyer
  title: Lawyer
  learner_level: senior high school and college students considering law, and pre-law students
  philippines_context: true
  review_required: true
  run_mode: build

tracks:
  - id: law-lawyer-path
    title: Lawyer Path
    subtitle: From pre-law skills to understanding how the legal profession works.
    estimated_duration: 5 months
    courses:
      - { id: law-profession-ethics,   title: The Legal Profession and Ethics,          short_code: LEG, lesson_count: 10, subtitle: What lawyers do and the duties they carry., outcome: Describe the roles lawyers play and why professional ethics matter. }
      - { id: law-legal-system,        title: The Philippine Legal System,              short_code: SYS, lesson_count: 10, subtitle: How laws are made, applied, and interpreted., outcome: Explain the branches of government and the hierarchy of legal authority in general terms. }
      - { id: law-legal-research,      title: Legal Research Skills,                    short_code: RES, lesson_count: 10, subtitle: Finding and evaluating legal sources., outcome: Describe types of legal sources and a method for researching a legal question. }
      - { id: law-legal-writing,       title: Legal Writing and Analysis,               short_code: WRT, lesson_count: 10, subtitle: Reasoning and writing clearly., outcome: Use a structured method (such as issue, rule, application, conclusion) to analyze a simple scenario. }
      - { id: law-constitutional-basics, title: Constitutional Law Concepts,           short_code: CON, lesson_count: 10, subtitle: The ideas behind the Constitution., outcome: Explain core constitutional ideas such as separation of powers and basic rights at a concept level. }
      - { id: law-civil-criminal-overview, title: Civil and Criminal Law Overview,     short_code: CCL, lesson_count: 10, subtitle: The big picture of private and public law., outcome: Distinguish civil and criminal matters and describe common areas of law. }
      - { id: law-procedure-advocacy,  title: Procedure, Evidence, and Advocacy Basics, short_code: PRC, lesson_count: 10, subtitle: How cases move and how lawyers argue them., outcome: Describe the general stages of a case and the purpose of evidence and oral advocacy. }
      - { id: law-path-to-practice,    title: Path to Practice and Client Communication, short_code: PTP, lesson_count: 10, subtitle: Becoming a lawyer and working with clients., outcome: Describe the general path to becoming a lawyer and good client-communication habits. }

  - id: law-paralegal
    title: Paralegal and Legal Support
    subtitle: Support lawyers and legal teams behind the scenes.
    estimated_duration: 4 months
    courses:
      - { id: law-legal-office-ops,    title: Legal Office Operations,                 short_code: LOP, lesson_count: 10, subtitle: How a legal office runs., outcome: Describe the daily workflow and responsibilities in a legal office. }
      - { id: law-document-drafting,   title: Legal Documents and Drafting Basics,     short_code: DOC, lesson_count: 10, subtitle: Common legal documents and how they are prepared., outcome: Identify common legal document types and the parts of a well-organized document. }
      - { id: law-court-filing,        title: Court Processes and Filing Basics,       short_code: FIL, lesson_count: 10, subtitle: How documents reach the court., outcome: Describe in general terms how filings, records, and schedules are handled. }
      - { id: law-research-support,    title: Legal Research Support,                   short_code: RSP, lesson_count: 10, subtitle: Helping lawyers find what they need., outcome: Organize research tasks and summarize sources accurately. }
      - { id: law-client-intake-confidentiality, title: Client Intake and Confidentiality, short_code: CIC, lesson_count: 10, subtitle: First contact and protecting information., outcome: Explain good intake practice and why confidentiality is central. }
      - { id: law-legal-tech-records,  title: Legal Technology and Records Management, short_code: LTR, lesson_count: 10, subtitle: Tools and file systems that keep cases organized., outcome: Describe common legal-office tools and basic records-management practice. }

supplied_links:
  videos: []
  references: []

must_cover:
  - A short "educational, not legal advice" note in the first lesson of every course.
  - Hierarchy of authority described generally (Constitution, statutes, regulations, court decisions).
  - Name-level only: the Supreme Court administers the bar examination, and lawyers belong to the Integrated Bar of the Philippines. Tell learners to read official sources for current eligibility and requirements.
  - The two tracks must feel different: the Lawyer Path builds analysis and advocacy skills; the Paralegal track focuses on office, document, and support work.

must_avoid:
  - Legal advice, "how to win" strategies, or guidance a reader might apply to a real legal problem.
  - Citing or inventing court cases, case titles, or quotations. Do not cite statutes by section or article number.
  - Penalties, filing deadlines, prescriptive periods, procedural timelines, fees, bar passing rates, or eligibility rules.
  - Claims about what paralegals are legally allowed to do.
  - Code playground activities. Use quickCheck, order, and matchPairs.
```
