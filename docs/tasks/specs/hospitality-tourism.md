# Career Spec: Hospitality & Tourism

Run with `docs/tasks/03-career-content-template.md`. This career has `review_required: false` because it is not a licensed profession, so it can run directly with `run_mode: build`. The team should still read the outline and content before the career is flipped from `coming-soon` to available. The content is an **orientation to the hospitality and tourism industry and its foundations**, not operating procedures or certification training. Content goes in `src/features/learning-hub/hospitality-tourism/`.

> **Draft.** The tracks and course lists below are proposals. Have a teammate or a hospitality and tourism student review them before running.

```yaml
career:
  id: hospitality-tourism
  title: Hospitality & Tourism
  learner_level: senior high school (TVL and humanities) and college students considering hospitality or tourism, and first-year HM/TM students
  philippines_context: true
  review_required: false
  run_mode: build

tracks:
  - id: ht-hospitality
    title: Hospitality Operations
    subtitle: Explore hotels, restaurants, events, and the art of caring for guests.
    estimated_duration: 4 months
    courses:
      - { id: ht-hospitality-industry,  title: The Hospitality Industry, short_code: HIN, lesson_count: 10, subtitle: Where welcome becomes a career., outcome: Describe the main sectors of hospitality and the kinds of roles found in each. }
      - { id: ht-guest-service,         title: Guest Service Excellence, short_code: GSE, lesson_count: 10, subtitle: Making every guest feel valued., outcome: Describe habits of good service such as active listening and handling complaints with respect. }
      - { id: ht-front-office,          title: Front Office and Housekeeping Basics, short_code: FOH, lesson_count: 10, subtitle: The first welcome and the quiet work behind it., outcome: Explain the purpose of the front office and housekeeping departments and how they work together. }
      - { id: ht-food-beverage,         title: Food and Beverage Service Basics, short_code: FBS, lesson_count: 10, subtitle: From the kitchen to the table., outcome: Describe the roles in a restaurant and why presentation, teamwork, and hygiene matter. }
      - { id: ht-events-mice,           title: Events and Banquet Basics, short_code: EVT, lesson_count: 10, subtitle: Planning gatherings that run smoothly., outcome: Explain the basic steps of planning an event and why coordination and communication matter. }
      - { id: ht-hospitality-business,  title: Hospitality Business and Teamwork, short_code: HBT, lesson_count: 10, subtitle: How hospitality businesses run and grow., outcome: Explain in general terms how hospitality businesses earn revenue and why teamwork keeps them running. }

  - id: ht-tourism
    title: Tourism and Travel
    subtitle: Explore destinations, tours, and sustainable travel experiences.
    estimated_duration: 4 months
    courses:
      - { id: ht-tourism-industry,      title: The Tourism Industry, short_code: TIN, lesson_count: 10, subtitle: Why people travel and who helps them., outcome: Describe the types of tourism and the main players such as tour operators and travel agencies. }
      - { id: ht-philippine-destinations, title: Philippine Destinations and Culture, short_code: PDC, lesson_count: 10, subtitle: Discovering the islands and their people., outcome: Describe in general terms the variety of Philippine destinations and cultures and why respectful storytelling matters. }
      - { id: ht-tour-planning,         title: Tour Planning and Guiding, short_code: TPG, lesson_count: 10, subtitle: Designing trips and leading groups., outcome: Explain how a simple tour is planned and what makes a good tour guide. }
      - { id: ht-travel-services,       title: Travel Services and Booking Basics, short_code: TSB, lesson_count: 10, subtitle: Transport, stays, and travel arrangements., outcome: Describe the main travel services and how they fit together in a trip. }
      - { id: ht-sustainable-tourism,   title: Sustainable and Community-Based Tourism, short_code: SCT, lesson_count: 10, subtitle: Travel that helps places and people thrive., outcome: Explain how tourism can benefit or harm communities and environments and what responsible tourism means. }
      - { id: ht-path-to-practice,      title: Path to Practice and Career Paths, short_code: PTP, lesson_count: 10, subtitle: Building a career in hospitality and tourism., outcome: Describe the general ways to start a career in the industry and the soft skills employers value. }

supplied_links:
  videos: []
  references: []

must_cover:
  - A short "educational orientation, not operating or certification training" note in the first lesson of every course.
  - Name-level only: the Department of Tourism (DOT) oversees tourism in the Philippines, and hospitality and tourism education is overseen by CHED and TESDA programs. Tell learners to read official sources for current requirements, programs, and accreditation.
  - Service attitude, cultural sensitivity, and respect for guests, coworkers, and local communities as recurring themes.
  - Honest framing of the industry (shift work, weekends and holidays, busy seasons) without glamorizing or discouraging it.
  - Respectful, accurate treatment of Philippine regions, Indigenous communities, and heritage sites, avoiding stereotypes.
  - The two tracks must feel different: Hospitality Operations covers hotels, food service, and events; Tourism and Travel covers destinations, tours, and travel services. Do not copy lessons between tracks.

must_avoid:
  - Food safety temperatures, times, or step-by-step procedures, and any claim that a lesson qualifies a learner for a food handling or safety certificate.
  - Statistics, tourist arrival numbers, salaries, hiring or overseas-demand claims, prices, rates, or revenue figures.
  - Visa, immigration, travel advisory, or entry requirement details, and safety or health advice about specific destinations.
  - Rankings or endorsements of specific hotels, restaurants, airlines, tour operators, or booking platforms, and brand-specific claims.
  - Department or agency order numbers, accreditation details, exam or assessment dates, fees, or passing rates.
  - Code playground activities. Use quickCheck, order, and matchPairs.
```
