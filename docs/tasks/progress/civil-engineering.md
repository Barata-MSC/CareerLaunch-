# Civil Engineering Career Plan Checkpoint

**Mode:** Build in progress (`run_mode: build`).
**Career:** Civil Engineering (`civil-engineering`)
**Current implementation status:** `coming-soon`; both tracks and all 12 courses are registered as draft content, subject-expert review pending.
**Audience:** Senior high school (STEM) and college students considering civil engineering, and first-year engineering students.
**Build state:** All 12 courses are built, registered, and validated. Human reviewer approval remains pending; do not change the reviewer approval checklist or mark the career available.

## Build-wide content constraints

- Keep this as an introductory orientation to the civil engineering profession and its foundations, not engineering design guidance, construction guidance, or board exam review.
- The first lesson in every course must state: “Educational orientation, not engineering design guidance.”
- Keep Philippine professional references at name level only. In Path to Practice, state that civil engineers in the Philippines take a licensure examination administered by the Professional Regulation Commission (PRC), and that engineering education is overseen by CHED. Direct learners to official PRC and CHED sources for current requirements; do not add eligibility details, exam dates, fees, passing rates, or coverage.
- Mention at name level that building and construction work is governed by national codes and local permits. Explain that codes change and engineers must use current official versions. Do not name or interpret codes, provide code values, or describe permit steps.
- Make public safety a recurring theme as the reason civil engineering carries high standards. Discuss lessons from failures only in general terms, without named disasters or casualty figures and without diagnosing a real structure.
- Describe Philippine context generally: typhoons, earthquakes, and flooding influence infrastructure and resilience thinking. Avoid unsupported local requirements, hazard statistics, or site-specific conclusions.
- Keep the tracks distinct. Structures and Construction covers professional foundations, conceptual math and science, materials, structural behavior, plans, project coordination, and site-safety culture. Infrastructure and Environment covers society-wide systems, transport, water, soil, resilience, and career pathways. Do not copy or near-duplicate lessons between tracks.
- Use only `quickCheck`, `order`, and `matchPairs` activities in a future build; do not use code playgrounds. Supplied links are empty; do not invent video or reference URLs.
- Do not include design calculations or formulas usable to size or check a real structure, load values, safety factors, material strengths, mix ratios, or code values; construction, demolition, or structural repair instructions; or advice about whether a real structure is safe.
- Exclude statistics, salaries, hiring or overseas-demand claims, project cost figures, exam dates, fees, passing rates, exam coverage, department or agency order numbers, legal-liability or legal-scope-of-practice claims, and operational instructions. If a topic needs specific facts to be useful, keep it general and flag it for the reviewer instead.
- This is a review-required career. Keep its status `coming-soon` until a human reviews the built content and intentionally changes the status. Do not claim expert review has occurred.

## Track 1: Structures and Construction

**Track ID:** `civ-structures-construction`  
**Title:** Structures and Construction  
**Subtitle:** Explore how buildings and structures are planned and built safely.  
**Estimated duration:** 4 months

### Course 1: The Civil Engineering Profession and Ethics

**Course ID:** `civ-profession-ethics` · **Short code:** `CPE` · **Lessons:** 10  
**Subtitle:** What civil engineers do and the public trust they carry.  
**Outcome:** Describe the main fields of civil engineering and why public safety and ethics come first.

1. **An Orientation to Civil Engineering** — State “Educational orientation, not engineering design guidance” and distinguish career learning from advice about a real project or structure.
2. **Civil Engineering Fields at a Glance** — Identify broad areas such as structures, construction, transport, water, and geotechnical work without defining a legal scope of practice.
3. **Public Safety and Public Trust** — Explain why decisions affecting the built environment require care for the people who use and live near infrastructure.
4. **Ethics, Integrity, and Objectivity** — Choose a transparent response when a fictional project summary has uncertain or incomplete information.
5. **Working Across Disciplines** — Describe how engineers coordinate with other roles and communities while keeping assigned responsibilities clear.
6. **Communities and the Built Environment** — Explain how a project can affect access, daily activity, and community needs beyond its physical footprint.
7. **Codes, Permits, and Current Sources** — State at name level that building and construction work is governed by national codes and local permits, and that codes change and current official versions must be used.
8. **Learning from Failures Responsibly** — Describe how general lessons from failures can encourage review and improvement without naming disasters, casualties, or causes not established by evidence.
9. **Clear Communication and Documentation** — Explain how precise records help teams distinguish observations, assumptions, and open questions.
10. **Professional Judgment and Limits** — Explain why a learner should not judge a real structure’s safety and should direct real concerns to appropriately qualified people.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 2: Math and Science Foundations

**Course ID:** `civ-math-science` · **Short code:** `MSF` · **Lessons:** 10  
**Subtitle:** The math and physics behind every structure.  
**Outcome:** Explain in plain language how ideas such as forces and measurement support engineering work.

1. **An Orientation to Engineering Foundations** — State “Educational orientation, not engineering design guidance” and explain that the course introduces concepts without calculations for real projects.
2. **Measurement as Shared Information** — Describe how careful measurement helps people communicate observations consistently without teaching field measurement procedures.
3. **Units and Clear Descriptions** — Explain why a measurement needs a clear unit and context to be understood by another person.
4. **Forces as Pushes and Pulls** — Describe force qualitatively as an interaction that can affect an object’s motion or shape, without formulas or values.
5. **Direction and Interaction** — Explain that the direction of an interaction matters when describing a simple classroom object, without calculating its response.
6. **Balance as a Concept** — Describe a balanced condition in everyday terms without equations, thresholds, or real-structure checks.
7. **Shape and Spatial Reasoning** — Identify how shape and spatial relationships can help learners interpret a simple conceptual diagram.
8. **Observation, Models, and Assumptions** — Explain why a simplified model helps organize thought but leaves out some real-world conditions.
9. **Reading a Conceptual Diagram** — Distinguish labels, relationships, and assumptions in a fictional diagram without using it to size or assess a structure.
10. **Using Foundations Responsibly** — Explain why introductory math and science ideas support later study but do not authorize design decisions about real structures.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 3: Construction Materials

**Course ID:** `civ-materials` · **Short code:** `MAT` · **Lessons:** 10  
**Subtitle:** Concrete, steel, timber, and more.  
**Outcome:** Describe common construction materials and in general terms why engineers choose one over another.

1. **An Orientation to Construction Materials** — State “Educational orientation, not engineering design guidance” and frame materials as a subject for conceptual comparison, not project selection advice.
2. **Materials in the Built Environment** — Identify broad material categories used in the built environment without stating strengths, specifications, or project requirements.
3. **Concrete as a Composite Material** — Describe at a high level that concrete combines material ingredients, without giving proportions, mixing directions, or performance values.
4. **Steel in Structures and Infrastructure** — Describe broad ways steel may appear in built-environment examples without discussing material strengths or sizing.
5. **Timber and Other Natural Materials** — Identify general considerations such as source, use context, and care without recommending a material for a real project.
6. **Masonry and Other Manufactured Materials** — Compare material categories by general characteristics and common contexts without specifying design or construction methods.
7. **Exposure and Durability as Concepts** — Explain that surrounding conditions can affect how materials perform over time without providing maintenance or repair instructions.
8. **Choosing Materials as a Contextual Decision** — Identify general considerations such as intended use, surroundings, availability, and environmental effects without prescribing a choice.
9. **Life-Cycle and Environmental Questions** — Describe how material use can raise questions about sourcing, service life, reuse, and disposal without making unsupported impact claims.
10. **Material Information and Public Safety** — Explain why material descriptions and project decisions need reliable evidence and qualified review.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 4: How Structures Work

**Course ID:** `civ-structures-concepts` · **Short code:** `HSW` · **Lessons:** 10  
**Subtitle:** Load, support, and balance explained simply.  
**Outcome:** Explain at a concept level how structures carry loads and why safety margins exist.

1. **An Orientation to Structural Concepts** — State “Educational orientation, not engineering design guidance” and limit study to conceptual explanations rather than real-structure checks.
2. **What a Structure Does** — Describe a structure as an arrangement that supports intended use and interacts with its surroundings.
3. **Loads as General Effects** — Identify broad categories of effects that a structure may need to account for without values, formulas, or design combinations.
4. **How Support Is Shared** — Explain qualitatively how connected parts can share an effect through an abstract classroom model.
5. **Load Paths as a Concept** — Trace a fictional diagram’s conceptual connection from an applied effect through supports, without calculating or sizing components.
6. **Structural Systems at a Glance** — Compare broad structural system types by how they organize support, without providing design selection rules.
7. **Connections and Continuity** — Explain generally why relationships between parts matter to how a system behaves, without construction or repair instructions.
8. **Safety Margins as a Principle** — Explain why engineers consider uncertainty and additional allowance in design concepts without stating values or formulas.
9. **Redundancy and Failure Awareness** — Describe how a system with alternate load-sharing paths may respond differently from one with a single path, without diagnosing a real structure.
10. **Public Safety and Structural Limits** — Explain why conceptual models cannot establish whether an actual building or structure is safe.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 5: Plans, Drawings, and Surveying

**Course ID:** `civ-drawings-surveying` · **Short code:** `PDS` · **Lessons:** 10  
**Subtitle:** Reading and making the language of construction.  
**Outcome:** Describe what plans, drawings, and land surveys communicate and why accuracy matters.

1. **An Orientation to Plans and Surveying** — State “Educational orientation, not engineering design guidance” and distinguish conceptual drawing literacy from instructions for a real project.
2. **What a Plan Communicates** — Describe how a plan organizes information about a proposed place or system for people who need to understand it.
3. **Views, Sections, and Context** — Explain that different drawing views can communicate different aspects of a fictional design concept.
4. **Legends, Labels, and Symbols** — Identify the purpose of a legend and labels in making a drawing understandable without interpreting real construction documents.
5. **Dimensions and Reference Information** — Explain why dimensions require clear context and source information, without performing scale or field calculations.
6. **Surveying as Information Gathering** — Describe the broad purpose of land surveying in locating and describing spatial relationships without teaching field methods.
7. **Reference Points and Accuracy** — Explain why consistent reference information helps people compare spatial observations.
8. **Uncertainty and Updates** — Describe why drawings and surveys should communicate known limitations and be updated when their source context changes.
9. **Coordination Across Project Information** — Explain how teams compare related drawings and notes to identify questions that need clarification.
10. **Accuracy, Communication, and Public Safety** — Connect clear, current project information with responsible coordination and safety awareness.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 6: Construction Management and Site Safety

**Course ID:** `civ-construction-mgmt` · **Short code:** `CMS` · **Lessons:** 10  
**Subtitle:** Turning plans into finished buildings.  
**Outcome:** Explain how projects are scheduled and coordinated and why site safety culture is central.

1. **An Orientation to Construction Management** — State “Educational orientation, not engineering design guidance” and explain the course covers coordination concepts, not construction instructions.
2. **Project Stages and Shared Goals** — Describe broad stages from planning through completion and the need for teams to understand shared project goals.
3. **Schedules and Dependencies** — Explain conceptually how one activity may depend on information or completion from another, without project durations or cost figures.
4. **Roles and Communication** — Identify why clear communication among project participants can reduce misunderstandings and support responsible coordination.
5. **Quality as a Project-Wide Concept** — Explain why teams value consistency with approved information without giving inspection procedures or acceptance criteria.
6. **Safety Culture and Public Protection** — Describe safety culture as shared attention to people affected by project work, including workers and the public, without operational safety steps.
7. **Recognizing and Reporting Concerns** — Choose a responsible reporting path in a fictional scenario rather than attempting a technical intervention.
8. **National Codes, Local Permits, and Current Sources** — State at name level that building and construction work is governed by national codes and local permits; explain that codes change and engineers must use current official versions without naming codes or describing permit steps.
9. **Community and Environmental Coordination** — Explain why a project team should consider communication with affected communities and environmental context.
10. **Learning from Project Challenges** — Describe how general, non-blaming lessons from project challenges can improve future coordination while avoiding claims about real incidents.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

## Track 2: Infrastructure and Environment

**Track ID:** `civ-infrastructure-environment`  
**Title:** Infrastructure and Environment  
**Subtitle:** Explore roads, water systems, and resilient communities.  
**Estimated duration:** 4 months

### Course 7: Infrastructure and Society

**Course ID:** `civ-infra-overview` · **Short code:** `INS` · **Lessons:** 10  
**Subtitle:** The systems communities depend on.  
**Outcome:** Describe how roads, bridges, water, and drainage systems support daily life.

1. **An Orientation to Infrastructure and Society** — State “Educational orientation, not engineering design guidance” and introduce infrastructure as a topic for civic and career learning.
2. **Infrastructure in Everyday Life** — Identify how community members may rely on roads, bridges, water systems, and drainage in ordinary activities.
3. **Networks and Interdependence** — Explain how different infrastructure systems can depend on one another without assuming a specific project arrangement.
4. **Roads and Bridges as Connections** — Describe generally how transport links connect places and support access to services and activities.
5. **Water Systems and Community Needs** — Explain at a high level why communities need systems to manage water resources and services.
6. **Drainage and the Built Environment** — Describe conceptually how drainage relates to land, settlements, and movement of water.
7. **Access, Equity, and Community Context** — Explain why infrastructure planning considers different users and access needs.
8. **Infrastructure Life Cycles** — Describe broad ideas of planning, operation, care, and renewal without maintenance instructions or cost figures.
9. **Public Safety and Shared Responsibility** — Explain how infrastructure decisions affect public spaces and why safety awareness is a recurring professional concern.
10. **Systems Thinking Review** — Connect roads, bridges, water, and drainage to community life while recognizing that each system has distinct needs.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 8: Transportation Engineering Basics

**Course ID:** `civ-transportation` · **Short code:** `TRN` · **Lessons:** 10  
**Subtitle:** Moving people and goods safely.  
**Outcome:** Explain at a concept level how engineers plan roads and transport systems and why safety and congestion matter.

1. **An Orientation to Transportation Systems** — State “Educational orientation, not engineering design guidance” and introduce transport planning concepts without instructions for a real road.
2. **People, Goods, and Different Travel Needs** — Identify broad user needs that transportation systems aim to serve, including walking, public transport, and goods movement.
3. **Networks and Route Connections** — Explain conceptually how routes connect homes, workplaces, and community services.
4. **Road Context and Street Functions** — Compare broad purposes of local streets and larger connecting routes without road design criteria.
5. **Safety as a System Goal** — Describe how transportation planning considers interactions among people, vehicles, and the surrounding environment at a high level.
6. **Congestion and Movement** — Explain congestion as a mismatch between travel demand and available movement opportunities without numerical traffic claims.
7. **Access and Inclusive Mobility** — Describe why transport planning considers users with different mobility and access needs.
8. **Environmental and Community Trade-Offs** — Identify general questions about noise, space, access, and environmental context without project-specific recommendations.
9. **Resilient Transport Connections** — Explain why transport connections need to be considered in light of disruptions such as typhoons, earthquakes, and flooding in the Philippines.
10. **Transportation Planning Review** — Summarize how connectivity, safety, access, and context inform conceptual transport planning.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 9: Water Resources and Drainage

**Course ID:** `civ-water-resources` · **Short code:** `WRD` · **Lessons:** 10  
**Subtitle:** Managing water supply and flooding.  
**Outcome:** Explain basic ideas about water supply and drainage and why flooding is a major planning concern.

1. **An Orientation to Water and Drainage** — State “Educational orientation, not engineering design guidance” and keep water-system learning conceptual rather than operational.
2. **Water as a Shared Resource** — Describe generally why communities need to understand where water comes from and how people depend on it.
3. **Watersheds and Connected Places** — Explain at a high level how water movement links land areas and communities.
4. **Water Supply Systems at a Glance** — Identify broad parts of a water supply system without specifying treatment procedures or operational instructions.
5. **Demand, Availability, and Planning** — Explain conceptually why planning considers both community needs and available water resources without numerical estimates.
6. **Drainage and Runoff Concepts** — Describe generally how rainfall and land surfaces relate to runoff and drainage without giving sizing or design methods.
7. **Flooding as a Planning Concern** — Explain why flooding can affect people, services, and infrastructure and should be considered in community planning.
8. **Green and Built Drainage Approaches** — Compare the general idea of natural landscape functions and built drainage systems without recommending a solution for a real site.
9. **Water, Environment, and Uncertainty** — Identify how land use, ecosystems, and uncertain conditions can shape water-planning questions.
10. **Responsible Water-System Learning** — Explain why site-specific water or drainage concerns require current information and appropriately qualified review.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 10: Soil and Foundations Basics

**Course ID:** `civ-geotechnical` · **Short code:** `SFB` · **Lessons:** 10  
**Subtitle:** Why the ground matters.  
**Outcome:** Explain in general terms why soil conditions affect what and how engineers build.

1. **An Orientation to Soil and Foundations** — State “Educational orientation, not engineering design guidance” and clarify that the course cannot assess a real site or foundation.
2. **Soil as a Variable Natural Material** — Describe soil generally as a natural material whose characteristics can vary from place to place.
3. **Ground Conditions and Site Context** — Explain why understanding a site’s ground context is part of considering a proposed built environment.
4. **Subsurface Information as Evidence** — Describe at a high level why engineers seek relevant subsurface information without teaching field investigation procedures.
5. **How Ground and Structures Interact** — Explain conceptually that structures and ground affect one another without formulas, load values, or design rules.
6. **Foundations as Load-Transfer Concepts** — Describe the general role of foundations in connecting a structure to the ground without sizing or construction guidance.
7. **Settlement and Change Over Time** — Explain settlement as a possible change in ground-structure position in general terms without thresholds or safety conclusions.
8. **Groundwater and Soil Conditions** — Identify groundwater as one contextual factor that may influence geotechnical questions without offering site-specific advice.
9. **Uncertainty and Qualified Assessment** — Explain why variable ground conditions require evidence and qualified assessment rather than assumptions from a nearby site.
10. **Public Safety and Geotechnical Limits** — Explain why introductory concepts cannot determine whether a real slope, foundation, or structure is safe.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 11: Disaster Resilience and Sustainable Engineering

**Course ID:** `civ-resilience-environment` · **Short code:** `DRS` · **Lessons:** 10  
**Subtitle:** Building for typhoons and earthquakes and protecting the environment.  
**Outcome:** Describe why the Philippines' hazards shape engineering thinking and the idea of sustainable design.

1. **An Orientation to Resilience and Sustainability** — State “Educational orientation, not engineering design guidance” and introduce resilience and sustainability as broad professional concepts.
2. **Hazards and Community Context** — Describe in general terms how typhoons, earthquakes, and flooding can affect Philippine communities and infrastructure.
3. **Exposure, Vulnerability, and Resilience** — Explain these concepts at a high level without calculating risk or recommending real-site measures.
4. **Resilience as Continuity and Adaptation** — Describe resilience as the ability of communities and systems to prepare for, respond to, and adapt to disruption, without operational instructions.
5. **Learning from Failures in General Terms** — Explain how broad lessons from infrastructure failures can inform future thinking without naming disasters, casualties, or unverified causes.
6. **Infrastructure Interdependence During Disruption** — Describe how an interruption in one system may affect other services without forecasting specific outcomes.
7. **Sustainability Across a Project Life Cycle** — Identify environmental and community questions that may arise from planning through long-term use without project cost figures.
8. **Environmental Stewardship and Natural Systems** — Explain why infrastructure discussions consider land, water, ecosystems, and resource use in general terms.
9. **Fairness and Community Participation** — Describe why resilient and sustainable planning considers who benefits, who may be affected, and whose knowledge is included.
10. **Resilient and Sustainable Thinking Review** — Connect Philippine hazard context, public safety, environmental care, and uncertainty in a conceptual scenario.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 12: Path to Practice and Career Paths

**Course ID:** `civ-path-to-practice` · **Short code:** `PTP` · **Lessons:** 10  
**Subtitle:** Becoming an engineer and choosing a direction.  
**Outcome:** Describe the general path to becoming a licensed civil engineer and the areas where civil engineers work.

1. **An Orientation to Civil Engineering Careers** — State “Educational orientation, not engineering design guidance” and clarify that this is not board exam review or a guide to current licensing requirements.
2. **Professional Pathways and Official Sources** — At name level, state that civil engineers in the Philippines take a licensure examination administered by the Professional Regulation Commission (PRC), and engineering education is overseen by CHED; direct learners to official PRC and CHED sources for current requirements.
3. **Civil Engineering Areas of Work** — Compare broad fields such as structures, construction, transport, water, geotechnical engineering, and environmental work without rankings or hiring claims.
4. **Education and Continued Learning** — Describe coursework, supervised learning, and continued study as broad parts of professional development without exam preparation details.
5. **Public and Private Project Contexts** — Identify broad ways civil engineers may contribute to public infrastructure and private projects without legal-scope claims.
6. **Public Safety Across Career Directions** — Explain why attention to public safety remains important across different civil engineering contexts.
7. **Teamwork and Clear Communication** — Describe how collaboration and plain-language explanations help teams and communities understand project information.
8. **Ethics, Evidence, and Professional Limits** — Choose a responsible response when a fictional project question exceeds a learner’s knowledge or assigned role.
9. **Civil Engineering in Philippine Communities** — Connect roads, water systems, buildings, and resilience to community needs in general terms.
10. **A Thoughtful Next-Step Plan** — Identify an area to explore and questions for an instructor or qualified professional while using official sources for current requirements.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

## Plan totals and build order

- **Tracks:** 2: Structures and Construction; Infrastructure and Environment.
- **Courses:** 12 total; 6 in each track, in the exact order specified.
- **Lessons:** 120 built; 10 per course.
- **Quiz banks:** 240 questions built, two linked questions per lesson; each quiz attempt serves 10 questions.
- **Build order:** Build Structures and Construction first, one course at a time, and run the shared content validator after each completed course; then build Infrastructure and Environment in its listed order. Follow-up build runs must resume from this checkpoint.
- **Availability:** Civil Engineering remains `coming-soon`; both tracks and all 12 courses are registered as an educational preview pending subject-expert review. The four-month durations are app study-time labels only, not professional qualification or training timelines.

## Review notes

Questions for a civil engineering student, licensed civil engineer, or engineering instructor:

- Is the course order appropriate for senior high school STEM learners, prospective college students, and first-year engineering students?
- Are the proposed outcomes and lesson objectives accurate at an introductory level without implying design competence?
- Does the distinction between Structures and Construction and Infrastructure and Environment remain clear, especially between structural load concepts and transportation/water/soil/resilience topics?
- Are public safety, ethics, and general lessons from failures represented responsibly without implying a legal scope of practice or assigning liability?
- Are the name-level PRC and CHED statements accurate, and do they direct learners to official sources without adding current requirements?
- Is the national-codes/local-permits statement accurate at the intended name-level scope, and does it clearly direct engineers to current official versions without interpreting code provisions?
- Are references to typhoons, earthquakes, and flooding appropriately general for Philippine context and free of unsupported statistics or site-specific conclusions?
- Do the materials, structural, surveying, site-management, transport, water, soil, resilience, and sustainability topics avoid actionable design or construction details?
- Are the four-month durations suitable as displayed app estimates rather than promises, training periods, or professional qualification timelines?
- Are the general failure-learning objectives suitably framed without naming disasters, casualty figures, or unverified causes?

## Approval checklist

- [ ] A civil engineering student, licensed civil engineer, or engineering instructor reviewed and approved the outline.
- [ ] Reviewer approved both track structures and the exact course order.
- [ ] Reviewer approved the lesson titles and objectives, including the boundary between tracks.
- [ ] Reviewer confirmed the scope is educational orientation, not engineering design guidance, construction guidance, or board exam review.
- [ ] Reviewer confirmed safety, hazard, codes, permits, and professional-pathway references remain within the spec.
- [ ] Civil Engineering remains `coming-soon` until a human reviews the built content and intentionally changes its status.
- [ ] Build runs only after the outline is approved; update the spec `run_mode` to `build` only after approval.