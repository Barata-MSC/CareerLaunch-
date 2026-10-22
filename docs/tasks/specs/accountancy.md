# Career Spec: Accountancy

Run with `docs/tasks/03-career-content-template.md`. This career has `review_required: true`: run once with `run_mode: plan`, have an accountancy student, CPA, or accountancy instructor review the outline, then run `build`. The career stays `coming-soon` until a human flips it after review. The content is an **orientation to the accountancy profession and its foundations**, not tax, audit, or financial advice and not board exam review. Content goes in `src/features/learning-hub/accountancy/`.

> **Draft.** The tracks and course lists below are proposals. Have a teammate or an accountancy student review them before running.

```yaml
career:
  id: accountancy
  title: Accountancy
  learner_level: senior high school (ABM) and college students considering accountancy, and first-year accountancy students
  philippines_context: true
  review_required: true
  run_mode: plan

tracks:
  - id: acct-foundations
    title: Accounting Foundations
    subtitle: Learn how businesses record, summarize, and report their money.
    estimated_duration: 4 months
    courses:
      - { id: acct-profession-ethics,   title: The Accountancy Profession and Ethics, short_code: APE, lesson_count: 10, subtitle: What accountants do and the trust they carry., outcome: Describe the roles of accountants and why integrity, objectivity, and confidentiality matter. }
      - { id: acct-basic-concepts,      title: Accounting Basics and the Accounting Equation, short_code: ABE, lesson_count: 10, subtitle: The ideas every ledger is built on., outcome: Explain assets, liabilities, and equity and how the accounting equation stays balanced. }
      - { id: acct-recording,           title: Recording Transactions, short_code: RCT, lesson_count: 10, subtitle: From receipts to journals and ledgers., outcome: Explain at a concept level how transactions are recorded using debits and credits. }
      - { id: acct-financial-statements, title: Understanding Financial Statements, short_code: FST, lesson_count: 10, subtitle: Reading the story a business tells in numbers., outcome: Describe the purpose of the main financial statements and how they relate to each other. }
      - { id: acct-small-business,      title: Bookkeeping for Small Businesses, short_code: BSB, lesson_count: 10, subtitle: Keeping simple records that stay reliable., outcome: Explain why small businesses keep organized records and what basic records they commonly keep. }
      - { id: acct-tools-technology,    title: Accounting Tools and Technology, short_code: ATT, lesson_count: 10, subtitle: Spreadsheets and software in modern accounting., outcome: Describe how spreadsheets and accounting software support accuracy and why human judgment still matters. }

  - id: acct-practice
    title: Accounting in Practice
    subtitle: Explore auditing, taxation, management accounting, and careers in the field.
    estimated_duration: 4 months
    courses:
      - { id: acct-mgmt-accounting,     title: Management Accounting and Budgeting, short_code: MAB, lesson_count: 10, subtitle: Numbers that help managers decide., outcome: Explain how budgets and cost information help managers plan and make decisions. }
      - { id: acct-auditing-intro,      title: Introduction to Auditing and Assurance, short_code: AUD, lesson_count: 10, subtitle: Why independent checks build trust., outcome: Explain in general terms what an audit is for and why independence and skepticism matter. }
      - { id: acct-taxation-intro,      title: Introduction to Taxation, short_code: TAX, lesson_count: 10, subtitle: Why taxes exist and how accountants help with them., outcome: Describe in general terms why governments collect taxes and the role accountants play in compliance. }
      - { id: acct-finance-basics,      title: Business and Finance Basics, short_code: BFB, lesson_count: 10, subtitle: How money moves through a business., outcome: Describe basic ideas such as cash flow and the time value of money in plain language. }
      - { id: acct-fraud-controls,      title: Internal Controls and Fraud Awareness, short_code: ICF, lesson_count: 10, subtitle: Protecting an organization's resources., outcome: Explain why internal controls exist and how accountants help prevent and detect errors and fraud. }
      - { id: acct-path-to-practice,    title: Path to Practice and Career Paths, short_code: PTP, lesson_count: 10, subtitle: Becoming an accountant and choosing a direction., outcome: Describe the general path to becoming a licensed accountant and the main areas where accountants work. }

supplied_links:
  videos: []
  references: []

must_cover:
  - A short "educational orientation, not accounting, tax, or financial advice" note in the first lesson of every course.
  - Name-level only: accountants in the Philippines take the Certified Public Accountant licensure examination administered by the Professional Regulation Commission (PRC), and the profession is overseen by the Board of Accountancy. Tell learners to read official PRC, Board of Accountancy, and CHED sources for current requirements.
  - Name-level only: financial reporting follows recognized standards, and tax rules are set by law and administered by the Bureau of Internal Revenue (BIR). Describe these as things learners will study in depth later, and tell them to read official sources for current rules.
  - Ethics, integrity, and confidentiality as recurring themes.
  - Journal entries, ledgers, and statements explained with small invented examples (made-up businesses and round numbers), clearly labelled as examples.
  - The two tracks must feel different: Accounting Foundations covers recording and reporting; Accounting in Practice covers decisions, assurance, tax, and careers. Do not copy lessons between tracks.

must_avoid:
  - Tax rates, thresholds, deadlines, forms, filing steps, or advice a reader might apply to their own taxes or business.
  - Specific standard numbers, rule citations, or claims about what a standard currently requires.
  - Statistics, salaries, hiring or overseas-demand claims, firm rankings, exam dates, fees, passing rates, exam coverage, or department or agency order numbers.
  - Claims about the legal liability or legal scope of practice of accountants or auditors.
  - Investment advice or recommendations about financial products.
  - Code playground activities. Use quickCheck, order, and matchPairs.
```
