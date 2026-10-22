# Career Spec: Civil Engineering

Run with `docs/tasks/03-career-content-template.md`. This career has `review_required: true`: run once with `run_mode: build`, have a civil engineering student, licensed civil engineer, or engineering instructor review the outline, then run `build`. The career stays `coming-soon` until a human flips it after review. The content is an **orientation to the profession and its foundations**, not engineering design, construction guidance, or board exam review. Content goes in `src/features/learning-hub/civil-engineering/`.

> **Draft.** The tracks and course lists below are proposals. Have a teammate or a civil engineering student review them before running.

```yaml
career:
  id: civil-engineering
  title: Civil Engineering
  learner_level: senior high school (STEM) and college students considering civil engineering, and first-year engineering students
  philippines_context: true
  review_required: true
  run_mode: build

tracks:
  - id: civ-structures-construction
    title: Structures and Construction
    subtitle: Explore how buildings and structures are planned and built safely.
    estimated_duration: 4 months
    courses:
      - { id: civ-profession-ethics,    title: The Civil Engineering Profession and Ethics, short_code: CPE, lesson_count: 10, subtitle: What civil engineers do and the public trust they carry., outcome: Describe the main fields of civil engineering and why public safety and ethics come first. }
      - { id: civ-math-science,         title: Math and Science Foundations, short_code: MSF, lesson_count: 10, subtitle: The math and physics behind every structure., outcome: Explain in plain language how ideas such as forces and measurement support engineering work. }
      - { id: civ-materials,            title: Construction Materials, short_code: MAT, lesson_count: 10, subtitle: Concrete, steel, timber, and more., outcome: Describe common construction materials and in general terms why engineers choose one over another. }
      - { id: civ-structures-concepts,  title: How Structures Work, short_code: HSW, lesson_count: 10, subtitle: Load, support, and balance explained simply., outcome: Explain at a concept level how structures carry loads and why safety margins exist. }
      - { id: civ-drawings-surveying,   title: Plans, Drawings, and Surveying, short_code: PDS, lesson_count: 10, subtitle: Reading and making the language of construction., outcome: Describe what plans, drawings, and land surveys communicate and why accuracy matters. }
      - { id: civ-construction-mgmt,    title: Construction Management and Site Safety, short_code: CMS, lesson_count: 10, subtitle: Turning plans into finished buildings., outcome: Explain how projects are scheduled and coordinated and why site safety culture is central. }

  - id: civ-infrastructure-environment
    title: Infrastructure and Environment
    subtitle: Explore roads, water systems, and resilient communities.
    estimated_duration: 4 months
    courses:
      - { id: civ-infra-overview,       title: Infrastructure and Society, short_code: INS, lesson_count: 10, subtitle: The systems communities depend on., outcome: Describe how roads, bridges, water, and drainage systems support daily life. }
      - { id: civ-transportation,       title: Transportation Engineering Basics, short_code: TRN, lesson_count: 10, subtitle: Moving people and goods safely., outcome: Explain at a concept level how engineers plan roads and transport systems and why safety and congestion matter. }
      - { id: civ-water-resources,      title: Water Resources and Drainage, short_code: WRD, lesson_count: 10, subtitle: Managing water supply and flooding., outcome: Explain basic ideas about water supply and drainage and why flooding is a major planning concern. }
      - { id: civ-geotechnical,         title: Soil and Foundations Basics, short_code: SFB, lesson_count: 10, subtitle: Why the ground matters., outcome: Explain in general terms why soil conditions affect what and how engineers build. }
      - { id: civ-resilience-environment, title: Disaster Resilience and Sustainable Engineering, short_code: DRS, lesson_count: 10, subtitle: Building for typhoons and earthquakes and protecting the environment., outcome: Describe why the Philippines' hazards shape engineering thinking and the idea of sustainable design. }
      - { id: civ-path-to-practice,     title: Path to Practice and Career Paths, short_code: PTP, lesson_count: 10, subtitle: Becoming an engineer and choosing a direction., outcome: Describe the general path to becoming a licensed civil engineer and the areas where civil engineers work. }

supplied_links:
  videos: []
  references: []

must_cover:
  - A short "educational orientation, not engineering design guidance" note in the first lesson of every course.
  - Name-level only: civil engineers in the Philippines take a licensure examination administered by the Professional Regulation Commission (PRC), and engineering education is overseen by CHED. Tell learners to read official PRC and CHED sources for current requirements.
  - Name-level only: building and construction work is governed by national codes and local permits. Tell learners that codes change and that engineers must always use the current official versions.
  - Public safety as a recurring theme, explained as why engineers are held to high standards, including lessons learned from failures described in general terms (no named disasters with casualty figures).
  - Philippine context explained in general terms: typhoons, earthquakes, flooding, and the importance of resilient design.
  - The two tracks must feel different: Structures and Construction covers materials, structures, and building sites; Infrastructure and Environment covers transport, water, soil, and resilience. Do not copy lessons between tracks.

must_avoid:
  - Design calculations, formulas a reader could use to size or check a real structure, load values, safety factors, material strengths, mix ratios, or code values.
  - Construction, demolition, or structural repair instructions, and advice about whether a real building or structure is safe.
  - Statistics, salaries, hiring or overseas-demand claims, project cost figures, exam dates, fees, passing rates, exam coverage, or department or agency order numbers.
  - Claims about the legal liability or legal scope of practice of engineers.
  - Code playground activities. Use quickCheck, order, and matchPairs.
```
