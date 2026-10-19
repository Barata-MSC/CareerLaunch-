# Career Spec: Teacher

Run with `docs/tasks/03-career-content-template.md`. This career has `review_required: true`, so run once with `run_mode: plan`, have a teacher or education student review the outline, then run `build`. The career stays `coming-soon` until a human flips it after review.

```yaml
career:
  id: teacher
  title: Teacher
  learner_level: senior high school and college students considering teaching, plus education students
  philippines_context: true
  review_required: true
  run_mode: plan

tracks:
  - id: teacher-elementary
    title: Elementary Teacher
    subtitle: Teach young learners in Kindergarten and Grades 1 to 6.
    estimated_duration: 5 months
    courses:
      - { id: teach-foundations,          title: Foundations of Teaching,                      short_code: FND, lesson_count: 10, subtitle: What teachers do and why it matters., outcome: Describe the roles, responsibilities, and ethics of a teacher. }
      - { id: teach-child-development,    title: Child Development and Learning,               short_code: CDL, lesson_count: 10, subtitle: How young children grow and learn., outcome: Explain major stages of child development and how they shape teaching. }
      - { id: teach-curriculum-planning,  title: Curriculum and Lesson Planning,               short_code: CLP, lesson_count: 10, subtitle: Turning goals into lessons., outcome: Write a clear lesson objective and plan a simple lesson. }
      - { id: teach-classroom-management, title: Classroom Management,                         short_code: CLM, lesson_count: 10, subtitle: Building a calm, respectful classroom., outcome: Describe routines and positive strategies for managing a young class. }
      - { id: teach-literacy-numeracy,    title: Teaching Literacy and Numeracy,               short_code: LIT, lesson_count: 10, subtitle: Reading, writing, and math in the early grades., outcome: Explain how early reading and number skills develop and common ways to teach them. }
      - { id: teach-assessment,           title: Assessment of Learning,                       short_code: ASM, lesson_count: 10, subtitle: Knowing what learners have learned., outcome: Distinguish formative and summative assessment and design a simple one. }
      - { id: teach-inclusive-education,  title: Inclusive and Differentiated Instruction,      short_code: INC, lesson_count: 10, subtitle: Teaching every learner., outcome: Describe ways to adjust teaching for learners with different needs and backgrounds. }
      - { id: teach-professional-growth,  title: Professional Growth and Licensure Preparation, short_code: PRO, lesson_count: 10, subtitle: Building a teaching career., outcome: Explain the path to becoming a licensed teacher and how teachers keep growing. }

  - id: teacher-secondary
    title: Secondary Teacher
    subtitle: Teach adolescents in Junior and Senior High School (Grades 7 to 12).
    estimated_duration: 4 months
    courses:
      - { id: teach-sec-adolescent-development, title: Adolescent Development and Learning,   short_code: ADL, lesson_count: 10, subtitle: How teenagers grow and learn., outcome: Explain key features of adolescent development and their effect on learning. }
      - { id: teach-sec-content-pedagogy,       title: Subject Content and Pedagogy,           short_code: PED, lesson_count: 10, subtitle: Teaching your subject well., outcome: Describe how teachers turn subject knowledge into clear, engaging instruction. }
      - { id: teach-sec-curriculum-design,      title: Curriculum Design and Unit Planning,    short_code: CUR, lesson_count: 10, subtitle: Planning units that build on each other., outcome: Plan a short unit with aligned objectives, activities, and assessment. }
      - { id: teach-sec-classroom-culture,      title: Classroom Culture and Behavior,         short_code: CCB, lesson_count: 10, subtitle: Respect, routines, and responsibility., outcome: Describe strategies for a positive classroom culture with teenagers. }
      - { id: teach-sec-assessment,             title: Assessment and Feedback,               short_code: AFB, lesson_count: 10, subtitle: Measuring learning and helping it grow., outcome: Design assessments and give feedback that helps learners improve. }
      - { id: teach-sec-guidance-wellbeing,     title: Learner Guidance and Wellbeing,         short_code: GWB, lesson_count: 10, subtitle: The teacher's supporting role., outcome: Describe a teacher's role in supporting learners and when and how to refer concerns. }
      - { id: teach-sec-career-licensure,       title: Teaching Career and Licensure Preparation, short_code: TCL, lesson_count: 10, subtitle: From student to licensed teacher., outcome: Explain the path to becoming a licensed teacher and how to keep developing. }

supplied_links:
  videos: []
  references: []

must_cover:
  - The structure of basic education (Kindergarten, Grades 1 to 6 elementary, Grades 7 to 10 junior high school, Grades 11 to 12 senior high school), described in general terms.
  - In the licensure lessons, a name-level mention that teachers take the Licensure Examination for Teachers administered by the Professional Regulation Commission, with a note that learners must read official PRC, DepEd, and CHED sources for current requirements.
  - Well-established theories (for example Piaget, Vygotsky, Bloom's taxonomy) presented as frameworks, not as unquestioned fact.
  - Tracks must feel different: use age-appropriate examples for each, and do not copy lessons between the two tracks.

must_avoid:
  - Department orders, memorandum numbers, curriculum competency codes, salary grades, hiring claims, exam dates, fees, passing rates, or exam coverage details.
  - Presenting "learning styles" (such as VARK) as proven. If mentioned, say the research evidence is weak.
  - Psychological, medical, or counseling advice. The wellbeing course stays at the level of a teacher noticing, supporting, and referring.
  - Code playground activities. Use quickCheck, order, and matchPairs.
```
