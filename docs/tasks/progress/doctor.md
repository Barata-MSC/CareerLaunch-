# Doctor Career Plan Checkpoint

**Mode:** Build completed from `docs/tasks/specs/doctor.md` and the approved plan.
**Career:** Doctor (`doctor`)
**Current implementation status:** `coming-soon`; the track and courses are registered and accessible as a clearly labeled draft preview, but the career is not marked available until a human reviews the built content and updates its status.
**Audience:** Senior high school and college students considering medicine, and pre-med students.
**Review requirement:** The project owner confirmed that an appropriate reviewer approved the outline before build. Review of the authored course content is still pending; keep the career `coming-soon` until that review and a human status change.

## Doctor-specific content constraints

- Treat the material as an educational orientation to the profession and science foundations, not medical education or medical advice.
- Include the exact note **“educational orientation, not medical advice”** in the first lesson of every course; the course-by-course placements are listed below.
- Biology, chemistry, and body-systems content describes normal structure and function only, as science education. Avoid applying it to a real person's health.
- Present consent, confidentiality, doing good, and avoiding harm as introductory ethical frameworks, not legal or clinical instructions.
- Keep clinical-thinking material conceptual. Use clearly fictional, non-diagnostic reasoning examples only; do not walk through a patient diagnosis or treatment.
- Keep public-health and health-system material general. Do not provide personal health advice, vaccination schedules, screening guidance, outbreak or disease figures, or instructions for a learner's own condition.
- Keep wellbeing material general. Do not give clinical or mental-health advice; encourage learners to reach out to trusted people or professionals when they need support.
- Do not include diagnoses, symptom checklists, treatments, medication or drug names or doses, procedures, or surgical instructions.
- Do not include statistics, salaries, tuition or cost figures, fees, number of years or slots, admission-test content or scores, exam dates, passing rates, school rankings, or claims about specialty pay, demand, or competitiveness.
- Do not name specialties or credentials except in general terms in the closing lesson of the final course.
- The spec's only permitted exam/licensure reference is name-level and belongs only in the final course: physicians take a licensure examination administered by the Professional Regulation Commission (PRC), and medical schools may require an admission test. Tell learners to consult official PRC, CHED, and school sources for current requirements. Add no requirements or other exam/licensure details.
- Do not invent video or reference links; none are supplied.
- Do not create code-playground activities. If activities are built, use only supported `quickCheck`, `order`, and `matchPairs` types, where appropriate.

## Track: Pre-Medicine and Medical Path

**Track ID:** `med-path`  
**Title:** Pre-Medicine and Medical Path  
**Subtitle:** Explore the profession, build science foundations, and understand the road to practice.  
**Estimated duration:** 5 months

### Course 1: The Medical Profession and Ethics

**Course ID:** `med-profession-ethics` · **Short code:** `MPE` · **Lessons:** 10  
**Subtitle:** What doctors do and the duties they carry.  
**Outcome:** Describe the roles of a physician and why ethics, consent, and confidentiality matter.

1. **What Physicians Do** — State that this lesson is an educational orientation, not medical advice; describe physicians' broad professional role without describing diagnosis or treatment.
2. **The Medical Team** — Identify broad ways physicians collaborate with other professionals while respecting different roles and responsibilities.
3. **Trust in Professional Relationships** — Explain why respectful conduct and honest communication help establish professional trust.
4. **Consent as an Ethical Framework** — Describe consent as an ethical idea involving communication and respect for a person's choices, without giving legal or clinical instructions.
5. **Confidentiality and Information Care** — Explain why private information should be treated carefully and shared only through appropriate professional channels.
6. **Doing Good and Avoiding Harm** — Distinguish these two ethical principles using a fictional, non-clinical example that does not recommend care.
7. **Fairness and Respect** — Describe how fairness and respect can guide professional interactions across different backgrounds.
8. **Boundaries and Accountability** — Explain why professional boundaries, honesty about limits, and accountability matter.
9. **Ethical Reflection** — Apply an ethical framework to a fictional workplace choice without making a patient-care decision.
10. **A Beginner's View of Medical Ethics** — Summarize the frameworks introduced and explain why real professional practice requires appropriate education, supervision, and current official guidance.

**Lesson 1 disclaimer:** Include “educational orientation, not medical advice.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 2: Biology Foundations

**Course ID:** `med-biology-foundations` · **Short code:** `BIO` · **Lessons:** 10  
**Subtitle:** Cells, genes, and how living things work.  
**Outcome:** Explain core biology ideas (cells, DNA, and basic body processes) in plain language.

1. **Living Things and Biology** — State that this lesson is an educational orientation, not medical advice; describe biology as the study of living things and their organization.
2. **Cells as Building Blocks** — Explain that cells are basic units of living organisms and identify broad parts of a simplified cell model.
3. **Cell Structures and Roles** — Relate a few cell structures to their general functions without linking them to disease or treatment.
4. **DNA and Inherited Information** — Describe DNA as a molecule that stores biological information and distinguish this introductory idea from predicting an individual's health.
5. **Genes and Traits** — Explain at a basic level how genes relate to inherited traits, noting that traits can involve many influences.
6. **From Cells to Tissues** — Show how cells with related roles can form tissues in a simplified organization model.
7. **Organs and Systems** — Explain how tissues and organs can work together as parts of a body system.
8. **Energy and Living Processes** — Describe how living cells use and transform energy in general terms without dietary or health recommendations.
9. **Balance in Living Systems** — Explain the concept of maintaining internal balance through a general, non-clinical example.
10. **Connecting Biology Concepts** — Summarize how cells, biological information, tissues, and systems fit together as normal-function science foundations.

**Lesson 1 disclaimer:** Include “educational orientation, not medical advice.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 3: Chemistry for Medicine

**Course ID:** `med-chemistry-foundations` · **Short code:** `CHM` · **Lessons:** 10  
**Subtitle:** The chemistry behind the body.  
**Outcome:** Explain basic chemistry ideas (atoms, molecules, reactions) and why they matter in the body.

1. **Chemistry in Living Systems** — State that this lesson is an educational orientation, not medical advice; explain chemistry as the study of matter and its changes.
2. **Atoms and Elements** — Describe atoms as basic units of elements and identify how elements differ in a simple model.
3. **Molecules and Bonds** — Explain how atoms can form molecules and describe bonds at an introductory level.
4. **Water as a Molecule** — Describe basic properties of water molecules and why water is present in living systems without giving health advice.
5. **Mixtures and Solutions** — Distinguish a mixture from a solution using safe, everyday non-medical examples.
6. **Acids, Bases, and the pH Idea** — Explain the pH scale conceptually without numerical health thresholds or advice.
7. **Chemical Reactions** — Describe how reactants can rearrange into products using a simple, non-body-specific example.
8. **Energy in Chemical Changes** — Explain that chemical changes can involve energy transfers, without offering procedures or treatment implications.
9. **Chemistry in Normal Body Processes** — Connect molecules and reactions to normal body processes at a broad conceptual level, without medical applications.
10. **Chemistry Foundations Review** — Relate atoms, molecules, solutions, and reactions as foundational science concepts and distinguish this overview from clinical training.

**Lesson 1 disclaimer:** Include “educational orientation, not medical advice.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 4: Human Body Systems Overview

**Course ID:** `med-body-systems` · **Short code:** `HBS` · **Lessons:** 10  
**Subtitle:** A tour of how the body is organized.  
**Outcome:** Name the major body systems and describe in general terms what each one does.

1. **Organization of the Human Body** — State that this lesson is an educational orientation, not medical advice; describe the broad organization from cells through organ systems.
2. **The Skeletal and Muscular Systems** — Describe the general roles of bones and muscles in support and movement, without exercise or treatment instructions.
3. **The Nervous and Sensory Systems** — Explain in broad terms how the nervous system coordinates information and how sensory organs provide input.
4. **The Circulatory System** — Describe the heart, blood, and vessels as parts of a system that moves materials through the body, without clinical thresholds.
5. **The Respiratory System** — Explain the general role of breathing structures in gas exchange, without symptom or treatment guidance.
6. **The Digestive System** — Outline how digestive organs contribute to processing food as normal-function science, with no dietary advice.
7. **The Urinary System** — Describe the general role of the urinary system in processing and removing certain wastes, without personal health guidance.
8. **The Endocrine and Reproductive Systems** — Identify broad functions of these systems using respectful, age-appropriate, non-clinical language.
9. **The Immune and Lymphatic Systems** — Describe their broad roles in normal body function without vaccine, infection-prevention, or disease guidance.
10. **Systems Working Together** — Use a neutral model to explain how body systems interact while emphasizing that this overview is not a tool for interpreting an individual's health.

**Lesson 1 disclaimer:** Include “educational orientation, not medical advice.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 5: Communication and Empathy in Medicine

**Course ID:** `med-health-communication` · **Short code:** `CEM` · **Lessons:** 10  
**Subtitle:** Listening, explaining, and building trust.  
**Outcome:** Describe good communication habits with patients, families, and colleagues.

1. **Communication in Medical Settings** — State that this lesson is an educational orientation, not medical advice; explain how clear communication supports respectful professional relationships.
2. **Listening with Attention** — Identify listening habits that show attention without assuming or interpreting a person's health.
3. **Asking Clear, Open Questions** — Describe how clear, neutral questions can support understanding in a fictional conversation without gathering clinical information.
4. **Explaining Ideas in Plain Language** — Explain why professionals adapt wording to the listener and check whether a message is understood.
5. **Empathy and Respect** — Distinguish empathy from making assumptions and describe respectful responses to different perspectives.
6. **Working with Families and Support People** — Describe general communication considerations when a person involves others, while recognizing privacy and individual choice.
7. **Team Communication** — Explain how concise, accurate communication supports coordination among professional colleagues.
8. **Communication Across Differences** — Identify ways to communicate respectfully across language, culture, age, and accessibility differences without stereotyping.
9. **Difficult Conversations and Professional Limits** — Describe general habits for calm, compassionate communication and seeking appropriate support when a conversation exceeds one's role.
10. **Reflecting on Communication** — Choose a communication habit to develop and explain how reflection can improve respectful teamwork.

**Lesson 1 disclaimer:** Include “educational orientation, not medical advice.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 6: Introduction to Clinical Thinking

**Course ID:** `med-clinical-thinking` · **Short code:** `ICT` · **Lessons:** 10  
**Subtitle:** How doctors reason about problems.  
**Outcome:** Describe at a concept level how evidence, questions, and reasoning guide medical decisions.

1. **What Clinical Thinking Means** — State that this lesson is an educational orientation, not medical advice; introduce clinical thinking as a professional reasoning concept, not a tool for self-assessment.
2. **Questions and Information** — Explain how professionals use questions to clarify a fictional, non-health planning problem without describing patient assessment.
3. **Observation and Evidence** — Distinguish an observation from an assumption using a fictional classroom or everyday scenario.
4. **Patterns and Uncertainty** — Describe how patterns can guide further questions while uncertainty remains and premature conclusions should be avoided.
5. **Reasoning and Alternative Explanations** — Explain why considering more than one explanation can reduce overconfidence in a non-diagnostic scenario.
6. **Evidence Quality** — Identify general qualities of useful evidence, such as relevance, clarity, and context, without introducing clinical guidelines.
7. **Bias and Reflection** — Describe how assumptions and bias can affect reasoning and name a general strategy for pausing and reviewing them.
8. **Team-Based Perspectives** — Explain how respectful collaboration can bring different expertise and perspectives to complex questions.
9. **Communicating Uncertainty** — Describe how a professional can communicate what is known, unknown, and still being considered without presenting a conclusion as certain.
10. **Reasoning as a Learning Skill** — Summarize evidence-aware reasoning and distinguish this conceptual introduction from training to make real medical decisions.

**Lesson 1 disclaimer:** Include “educational orientation, not medical advice.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 7: Public Health and Health Systems

**Course ID:** `med-public-health` · **Short code:** `PHS` · **Lessons:** 10  
**Subtitle:** Health beyond one patient.  
**Outcome:** Explain prevention, community health, and how health systems are organized in general terms.

1. **Health Beyond the Individual** — State that this lesson is an educational orientation, not medical advice; define public health broadly as attention to health at community and population levels.
2. **Community Context and Wellbeing** — Describe how social and environmental conditions can shape community wellbeing without giving personal advice or statistics.
3. **Prevention as a General Concept** — Explain prevention as a broad public-health concept without schedules, screening guidance, or recommendations for an individual.
4. **Health Services and Settings** — Identify broad types of settings where health services may be organized without claiming current local availability or eligibility.
5. **People and Roles in a Health System** — Describe how different professional and community roles can contribute to a health system.
6. **Access, Communication, and Respect** — Explain why clear communication and respectful service matter when people interact with health services.
7. **Community Partnerships** — Describe how community organizations and professionals may coordinate around general wellbeing goals.
8. **Health Information and Responsibility** — Explain why public-facing health information should be accurate, understandable, and checked against appropriate official sources.
9. **Systems Thinking** — Map broad relationships among people, services, community settings, and information in a fictional, non-quantitative example.
10. **Public Health in Perspective** — Summarize the difference between population-level concepts and personal medical advice.

**Lesson 1 disclaimer:** Include “educational orientation, not medical advice.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 8: Path to Practice and Resilience

**Course ID:** `med-path-to-practice` · **Short code:** `PTP` · **Lessons:** 10  
**Subtitle:** Becoming a doctor and staying well along the way.  
**Outcome:** Describe the general stages of medical education and healthy habits for a demanding career.

1. **Exploring a Demanding Path** — State that this lesson is an educational orientation, not medical advice; describe the path as challenging and meaningful without glamorizing or discouraging it.
2. **Preparing Before Medical School** — Describe pre-medical studies as a general stage for exploring interests and building foundational learning habits, without naming requirements or durations.
3. **Medical School as a Learning Stage** — Explain at a broad level that medical school is a stage of structured professional education, without describing clinical procedures or requirements.
4. **Licensure and Further Training in General Terms** — Describe licensure and further training as broad stages after medical education; make no claims about requirements, duration, fees, or exam details.
5. **Finding Current Official Information** — Direct learners to official PRC, CHED, and school sources for current information; do not interpret requirements or reproduce time-sensitive details.
6. **Habits for a Demanding Learning Journey** — Identify general habits such as reflection, planning, asking for help, and maintaining supportive relationships without mental-health or clinical advice.
7. **Support, Boundaries, and Rest** — Explain the value of trusted support and healthy boundaries in general terms; encourage reaching out to trusted people or professionals when support is needed.
8. **Learning from Feedback and Setbacks** — Describe how feedback and setbacks can inform learning without promises of success or claims about career outcomes.
9. **Pathway Overview and Official-Source Reminder** — Summarize the general stages—pre-medical studies, medical school, licensure, and further training—and include only the spec's name-level note: physicians take a licensure examination administered by the Professional Regulation Commission (PRC), and medical schools may require an admission test; direct learners to official PRC, CHED, and school sources for current requirements. Give no requirements, durations, costs, test content, scores, dates, or fees.
10. **Roles in Medicine and How to Keep Learning** — Close the course by describing broad physician roles and specialty areas in general terms, then suggest an ongoing learning plan using current, trustworthy educational sources and appropriate mentors; name credentials only in general terms.

**Lesson 1 disclaimer:** Include “educational orientation, not medical advice.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

## Expert review priorities

The following outline areas are most likely to need review by a medical student, physician, or pre-med adviser before build approval:

- **The Medical Profession and Ethics:** accuracy and nuance of physician roles, consent, confidentiality, doing good, avoiding harm, professional boundaries, and the distinction between ethical frameworks and legal/clinical instructions.
- **Biology Foundations:** accuracy of cell, DNA, gene, tissue, energy, and internal-balance explanations; confirm they describe normal biology only and do not imply individual health predictions.
- **Chemistry for Medicine:** scientific accuracy of atoms, bonds, solutions, pH, reactions, and energy explanations; ensure examples cannot be read as medication or treatment guidance.
- **Human Body Systems Overview:** accuracy and age-appropriateness of descriptions of normal structure and function, especially reproductive, immune, and lymphatic systems; verify no symptom, disease, or care guidance slips in.
- **Communication and Empathy in Medicine:** professional boundaries, consent-aware communication, privacy, family involvement, and culturally respectful examples.
- **Introduction to Clinical Thinking:** ensure examples remain non-health, fictional, and non-diagnostic; check language about evidence, uncertainty, and reasoning does not imply instructions for real care.
- **Public Health and Health Systems:** accuracy of general system concepts and careful avoidance of unsupported claims about Philippine services, access, policy, or current guidance.
- **Path to Practice and Resilience:** accuracy of the broad pathway and exact name-level PRC/admission-test statement; confirm source referrals remain general and contain no current requirements, fees, exam specifics, or guarantees. Review wellbeing language to keep it general and non-clinical.

Expert review is pending; this plan is not reviewed medical content.

## Spec/template conflicts, decisions, and open questions

- **Licensure/exam exclusion versus the spec:** The requested confirmation that the plan contains no licensing or exam details conflicts narrowly with `must_cover`, which explicitly requires a name-level mention of the PRC-administered licensure examination and the possibility of a medical-school admission test in the last course only. The authored content includes that required statement only in Lesson 9 of `med-path-to-practice` and excludes requirements, durations, fees, dates, exam content, scores, passing rates, and other details.
- **Science foundations versus “not medical education”:** The spec requires biology, chemistry, and body-systems foundations while defining the career content as orientation, not medical education. This outline resolves that by limiting those courses to general science and normal structure/function, with no clinical application.
- **Existing career-card wording:** Doctor's career-card subtitle and overview were revised to describe an educational preview and avoid presenting clinical care as learner guidance.
- **`REVIEW_NOTES.md`:** Created at `src/features/learning-hub/doctor/REVIEW_NOTES.md` during build, as required for a regulated career. It groups the science, ethics, communication, public-health, pathway, and wellbeing claims by course for subject-expert review. The authored content review is pending.
- **Track duration:** The spec supplies a displayed estimate of five months. It is retained as a track estimate only, not as a promise or a statement about actual medical education duration.
- **No supplied media or references:** The spec supplies no links, so none are proposed.
- **Review status:** The project owner confirmed the outline was reviewed and approved by an appropriate reviewer before build. A separate review of the completed lesson and quiz content remains required before availability.

## Build totals and status

- **Tracks:** 1.
- **Courses:** 8 in Pre-Medicine and Medical Path.
- **Lessons:** 80; 10 per course.
- **Quiz banks:** 80 questions; 10 per course and one per lesson. Each course is configured for a 10-question attempt.
- **Activities:** Each lesson has a `quickCheck` using its lesson-linked question and explanation.
- **Validation:** `npm run validate:content` passed with 10 careers, 11 tracks, and 76 registered courses; no answer-index skew warnings were reported.
- **Doctor content checks:** Passed an additional focused check for eight courses, 80 lessons, first-lesson disclaimers, worked examples, 3–5 key points per lesson, lesson activities, and balanced answer positions.
- **Lint:** `npm run lint` passed.
- **Web export:** `npx expo export -p web` passed.
- **Manual app checklist:** Not run; open each track/course, complete a lesson, take passing and failing quizzes, confirm progress updates, and spot-check content on a device.
- **Career availability:** Remains `coming-soon` until expert review of the completed content and a human status change. The career card and detail page now clearly expose the registered lessons as a draft preview with a review-pending and educational-orientation notice.
