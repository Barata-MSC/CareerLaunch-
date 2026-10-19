# Career Spec: Marine (Seafarer and Marine Engineering)

Run with `docs/tasks/03-career-content-template.md`. This career has `review_required: true`: run once with `run_mode: plan`, have a maritime student, seafarer, or maritime instructor review the outline, then run `build`. The career stays `coming-soon` until a human flips it after review. The content is an **orientation to the seafaring profession and its foundations**, not training for any certificate or operational procedure. Content goes in `src/features/learning-hub/marine/`.

> **Draft.** The tracks and course lists below are proposals. Have a teammate or a maritime student review them before running.

```yaml
career:
  id: marine
  title: Marine (Seafarer / Marine Engineering)
  learner_level: senior high school and college students considering a maritime career, and maritime students
  philippines_context: true
  review_required: true
  run_mode: plan

tracks:
  - id: mar-deck
    title: Deck Officer (Marine Transportation)
    subtitle: Explore navigation, seamanship, and life as a ship's deck officer.
    estimated_duration: 4 months
    courses:
      - { id: mar-seafaring-profession,  title: The Seafaring Profession,               short_code: SEA, lesson_count: 10, subtitle: Life and work at sea., outcome: Describe the roles on a ship and what working and living aboard involves. }
      - { id: mar-ship-basics,           title: Ships, Parts, and Terminology,           short_code: SHP, lesson_count: 10, subtitle: Learning to speak the language of the sea., outcome: Name common ship types and parts and use basic nautical terms correctly. }
      - { id: mar-navigation-concepts,   title: Navigation Concepts,                     short_code: NAV, lesson_count: 10, subtitle: How ships find their way., outcome: Explain at a concept level how charts, position, and the rules of the road support safe navigation. }
      - { id: mar-seamanship-cargo,      title: Seamanship and Cargo Basics,             short_code: SCB, lesson_count: 10, subtitle: Handling the ship and what it carries., outcome: Describe general seamanship ideas and why cargo must be handled and secured carefully. }
      - { id: mar-weather-ocean,         title: Weather and the Ocean,                   short_code: WOC, lesson_count: 10, subtitle: Understanding the sea around the ship., outcome: Explain basic weather and ocean ideas and why they matter to voyage planning. }
      - { id: mar-safety-environment,    title: Maritime Safety and Environmental Care,   short_code: MSE, lesson_count: 10, subtitle: Keeping people, ships, and oceans safe., outcome: Explain why safety culture, drills, and environmental protection are central to shipping. }
      - { id: mar-path-to-practice,      title: Path to Practice and Teamwork at Sea,    short_code: PTP, lesson_count: 10, subtitle: Becoming an officer and working in a multicultural crew., outcome: Describe the general path to becoming a deck officer and good teamwork and communication habits aboard. }

  - id: mar-engine
    title: Marine Engineer
    subtitle: Explore the machinery and systems that keep a ship running.
    estimated_duration: 4 months
    courses:
      - { id: mar-eng-profession,        title: The Marine Engineering Profession,      short_code: MEP, lesson_count: 10, subtitle: Life and work in the engine department., outcome: Describe the roles in the engine department and how they support the whole ship. }
      - { id: mar-eng-science,           title: Engineering Science Foundations,         short_code: ESF, lesson_count: 10, subtitle: Mechanics, heat, and electricity in plain language., outcome: Explain basic mechanics, heat, and electricity ideas that engines and ship systems rely on. }
      - { id: mar-eng-ship-systems,      title: Ship Machinery and Systems Overview,     short_code: SMS, lesson_count: 10, subtitle: What is inside the engine room., outcome: Name the main systems on a ship (power, fuel, cooling, electrical, and auxiliary) and describe in general terms what each is for. }
      - { id: mar-eng-propulsion-power,  title: Propulsion and Power Generation,         short_code: PPG, lesson_count: 10, subtitle: How a ship moves and gets its power., outcome: Explain at a concept level how propulsion and onboard power generation work. }
      - { id: mar-eng-maintenance,       title: Maintenance and Reliability,             short_code: MNT, lesson_count: 10, subtitle: Keeping machinery dependable., outcome: Explain why planned maintenance, inspection, and record keeping matter. }
      - { id: mar-eng-safety-environment, title: Engine-Room Safety and Environmental Care, short_code: ESE, lesson_count: 10, subtitle: Working safely and protecting the sea., outcome: Explain why safe work habits and pollution prevention are central to engineering work at sea. }
      - { id: mar-eng-path-to-practice,  title: Path to Practice and Lifelong Learning, short_code: PLL, lesson_count: 10, subtitle: Becoming an engineer officer and growing in the career., outcome: Describe the general path to becoming a marine engineer officer and how seafarers keep learning. }

supplied_links:
  videos: []
  references: []

must_cover:
  - A short "educational orientation, not certified training" note in the first lesson of every course.
  - Name-level only: maritime education and seafarer certification in the Philippines involve CHED, the Maritime Industry Authority (MARINA), and the Professional Regulation Commission (PRC), and international standards such as the STCW convention. Tell learners to read official sources for current requirements.
  - Honest framing of life at sea (time away from home, shared living, teamwork) without glamorizing or discouraging it.
  - Safety and environmental protection as recurring themes, explained as why they exist, not as operating procedures.
  - The two tracks must feel different: the deck track covers navigation, seamanship, and cargo; the engine track covers machinery, power, and maintenance. Do not copy lessons between tracks.

must_avoid:
  - Operational procedures that could be used on a real vessel: navigation calculations for real voyages, emergency or abandon-ship steps, firefighting, machinery operating or repair steps.
  - Statistics, salaries, contract lengths, manning agency claims, deployment or demand claims, sea-time requirements, fees, exam dates, passing rates, or certificate and endorsement details.
  - Claims about the legal authority or liability of any rank.
  - Code playground activities. Use quickCheck, order, and matchPairs.
```
