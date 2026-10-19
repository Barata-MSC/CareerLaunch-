# Career Spec: Nursing

Run with `docs/tasks/03-career-content-template.md`. This career has `review_required: true`: run once with `run_mode: plan`, have a nursing student, nurse, or nursing instructor review the outline, then run `build`. The career stays `coming-soon` until a human flips it after review. The content is an **orientation to the profession and its foundations**, not clinical training. Content goes in `src/features/learning-hub/nursing/`.

> **Draft.** The track and course list below is a proposal. Have a teammate or a nursing student review it before running.

```yaml
career:
  id: nursing
  title: Nursing
  learner_level: senior high school and college students considering nursing, and pre-nursing students
  philippines_context: true
  review_required: true
  run_mode: plan

tracks:
  - id: nurs-student-path
    title: Nursing Student Path
    subtitle: Understand the profession, the foundations, and how nurses care for people.
    estimated_duration: 5 months
    courses:
      - { id: nurs-profession-ethics,    title: The Nursing Profession and Ethics,        short_code: NPE, lesson_count: 10, subtitle: What nurses do and the duties they carry., outcome: Describe the roles of a nurse and why ethics, dignity, and confidentiality matter. }
      - { id: nurs-body-basics,          title: Human Body Basics,                        short_code: HBB, lesson_count: 10, subtitle: A friendly tour of how the body is organized., outcome: Name the major body systems and describe in general terms what each one does. }
      - { id: nurs-patient-communication, title: Communication with Patients and Families, short_code: PCM, lesson_count: 10, subtitle: Listening, explaining, and showing empathy., outcome: Describe good communication habits with patients, families, and the care team. }
      - { id: nurs-fundamentals-of-care, title: Fundamentals of Nursing Care,            short_code: FNC, lesson_count: 10, subtitle: The ideas behind everyday patient care., outcome: Explain the nursing process as a framework and the principles of comfort, safety, and dignity. }
      - { id: nurs-infection-prevention, title: Infection Prevention Basics,             short_code: INF, lesson_count: 10, subtitle: Why hygiene and safe habits protect everyone., outcome: Explain in general terms how infections spread and why prevention practices exist. }
      - { id: nurs-health-promotion,     title: Health Promotion and Community Health,     short_code: HPC, lesson_count: 10, subtitle: Helping people stay well., outcome: Describe prevention, health education, and the role of nurses in communities. }
      - { id: nurs-safety-documentation, title: Patient Safety, Documentation, and Teamwork, short_code: PSD, lesson_count: 10, subtitle: Working safely with a care team., outcome: Explain why accurate records, handoffs, and teamwork protect patients. }
      - { id: nurs-path-to-practice,     title: Path to Practice and Caring for Yourself, short_code: PTP, lesson_count: 10, subtitle: Becoming a nurse and staying well while caring for others., outcome: Describe the general path to becoming a licensed nurse and healthy habits for a demanding career. }

supplied_links:
  videos: []
  references: []

must_cover:
  - A short "educational orientation, not medical advice or clinical training" note in the first lesson of every course.
  - Name-level only: nurses in the Philippines take a licensure examination administered by the Professional Regulation Commission (PRC). Tell learners to read official PRC and CHED sources for current requirements.
  - The nursing process presented as a general framework (assess, diagnose, plan, implement, evaluate), explained conceptually, with a note that nursing schools teach it in more depth.
  - Patient dignity, consent, and confidentiality as recurring themes.
  - A closing lesson in the last course on roles in the field and how to keep learning, described in general terms.

must_avoid:
  - Clinical procedures or step-by-step instructions (injections, wound care, catheters, CPR steps, and similar), medication names, doses, or administration.
  - Normal ranges or thresholds for vital signs or lab values, symptom checklists, diagnoses, or advice a reader might apply to a real health problem.
  - Statistics, salaries, nurse-to-patient ratios, hiring or overseas-demand claims, exam dates, fees, passing rates, exam coverage, or department or agency order numbers.
  - Claims about the legal scope of practice.
  - Code playground activities. Use quickCheck, order, and matchPairs.
```
