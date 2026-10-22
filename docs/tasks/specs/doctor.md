# Career Spec: Doctor

Run with `docs/tasks/03-career-content-template.md`. This career has `review_required: true`: run once with `run_mode: build`, have a medical student, physician, or pre-med adviser review the outline, then run `build`. The career stays `coming-soon` until a human flips it after review. The content is an **orientation to the profession and the science foundations**, not medical education. Content goes in `src/features/learning-hub/doctor/`.

> **Draft.** The track and course list below is a proposal. Have a teammate or a medical student review it before running.

```yaml
career:
  id: doctor
  title: Doctor
  learner_level: senior high school and college students considering medicine, and pre-med students
  philippines_context: true
  review_required: true
  run_mode: plan

tracks:
  - id: med-path
    title: Pre-Medicine and Medical Path
    subtitle: Explore the profession, build science foundations, and understand the road to practice.
    estimated_duration: 5 months
    courses:
      - { id: med-profession-ethics,     title: "The Medical Profession and Ethics",      short_code: MPE, lesson_count: 10, subtitle: "What doctors do and the duties they carry.", outcome: "Describe the roles of a physician and why ethics, consent, and confidentiality matter." }
      - { id: med-biology-foundations,   title: "Biology Foundations",                    short_code: BIO, lesson_count: 10, subtitle: "Cells, genes, and how living things work.", outcome: "Explain core biology ideas (cells, DNA, and basic body processes) in plain language." }
      - { id: med-chemistry-foundations, title: "Chemistry for Medicine",                 short_code: CHM, lesson_count: 10, subtitle: "The chemistry behind the body.", outcome: "Explain basic chemistry ideas (atoms, molecules, reactions) and why they matter in the body." }
      - { id: med-body-systems,          title: "Human Body Systems Overview",            short_code: HBS, lesson_count: 10, subtitle: "A tour of how the body is organized.", outcome: "Name the major body systems and describe in general terms what each one does." }
      - { id: med-health-communication,  title: "Communication and Empathy in Medicine",  short_code: CEM, lesson_count: 10, subtitle: "Listening, explaining, and building trust.", outcome: "Describe good communication habits with patients, families, and colleagues." }
      - { id: med-clinical-thinking,     title: "Introduction to Clinical Thinking",      short_code: ICT, lesson_count: 10, subtitle: "How doctors reason about problems.", outcome: "Describe at a concept level how evidence, questions, and reasoning guide medical decisions." }
      - { id: med-public-health,         title: "Public Health and Health Systems",       short_code: PHS, lesson_count: 10, subtitle: "Health beyond one patient.", outcome: "Explain prevention, community health, and how health systems are organized in general terms." }
      - { id: med-path-to-practice,      title: "Path to Practice and Resilience",        short_code: PTP, lesson_count: 10, subtitle: "Becoming a doctor and staying well along the way.", outcome: "Describe the general stages of medical education and healthy habits for a demanding career." }

supplied_links:
  videos: []
  references: []

must_cover:
  - A short "educational orientation, not medical advice" note in the first lesson of every course.
  - The general stages of the path to becoming a physician (pre-medical studies, medical school, licensure, and further training), described in general terms with no durations, costs, or requirements.
  - "Name-level only: physicians take a licensure examination administered by the Professional Regulation Commission (PRC), and medical schools may require an admission test. Tell learners to read official PRC, CHED, and school sources for current requirements. Include this mention only in the last course, Path to Practice and Resilience."
  - Medical ethics ideas (consent, confidentiality, doing good and avoiding harm) presented as frameworks.
  - Honesty about how demanding the path is, without discouraging or glamorizing it.
  - A closing lesson in the last course about roles in the field and how to keep learning, naming specialties and credentials only in general terms.
  - Biology, chemistry, and body-systems lessons describe normal structure and function only, as science education.

must_avoid:
  - Diagnoses, symptom checklists, treatments, medication names or doses, or guidance a reader might apply to a real health problem.
  - Statistics, salaries, tuition or cost figures, number of years or slots, admission test content or scores, exam dates, fees, passing rates, or ranking of schools.
  - Claims about specialties' pay, demand, or competitiveness.
  - Surgical or procedural instructions of any kind.
  - Worked patient cases that walk through a diagnosis or treatment. Use clearly fictional, non-diagnostic reasoning examples only.
  - Vaccination schedules, screening guidelines, outbreak or disease figures, and health advice for the learner's own condition.
  - Clinical or mental-health advice in the resilience lessons. Keep wellbeing content general and encourage reaching out to trusted people or professionals.
  - Code playground activities. Use quickCheck, order, and matchPairs.
```
