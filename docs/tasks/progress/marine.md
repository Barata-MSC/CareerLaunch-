# Marine Career Plan Checkpoint

**Mode:** Build run for `mar-deck` only, following the approved outline and Marine spec.
**Career:** Marine (`marine`)
**Current implementation status:** `coming-soon`; the seven-course Deck Officer preview is registered. The Marine Engineer track remains unbuilt and unregistered.
**Audience:** Senior high school and college students considering a maritime career, and maritime students.
**Review requirement:** This is draft content. A maritime student, seafarer, or maritime instructor should review the built content. Keep the career `coming-soon` until a human reviews it and changes its status.

## Marine-specific content constraints

- Present the material as an orientation to seafaring professions and their foundations, not training for a certificate, operational procedure, vessel operation, or safety-critical work.
- Include **“educational orientation, not professional or safety training”** in the first lesson of every course. The spec also asks for “educational orientation, not certified training”; include both ideas in the course disclaimer.
- Keep safety and environmental protection as recurring concepts: explain why they matter, not how to perform a safety task or operate equipment.
- Be honest about time away from home, shared living, and teamwork at sea without glamorizing or discouraging the career.
- Keep the Deck Officer track distinct: ships and terminology, navigation concepts, seamanship, cargo, weather/ocean concepts, and deck roles.
- Keep the Marine Engineer track distinct: engineering science, ship machinery and systems, propulsion and power, maintenance, and engine-department roles. Do not copy lessons between the two safety/environment courses.
- Do not include vessel, engine, or machinery operating instructions; navigation calculations for real voyages; emergency, abandon-ship, or firefighting steps; machinery operation or repair procedures; hazardous-cargo handling; troubleshooting; or high-voltage/electrical work steps.
- Do not include collision-regulation rule numbers, meanings of lights or sound signals, weather-routing or storm-avoidance decisions, numeric engineering specifications, or claims about the legal authority or liability of a rank.
- Do not include statistics, casualty figures, salaries, fees, contract lengths, manning-agency claims, deployment or demand claims, training durations, sea-service requirements, exam dates, passing rates, or certificate/endorsement details.
- Keep wellbeing general. Do not provide clinical or mental-health advice about life at sea; encourage reaching out to trusted people or professionals.
- Use no code playground activities. If activities are built, use only `quickCheck`, `order`, and `matchPairs`.
- Do not invent video or reference links; none are supplied.
- Name maritime regulators and the STCW convention only in the final course of each track, at name level. Direct learners to official sources for current requirements; do not explain the rules, requirements, or standards.

## Track 1: Deck Officer (Marine Transportation)

**Track ID:** `mar-deck`  
**Title:** Deck Officer (Marine Transportation)  
**Subtitle:** Explore navigation, seamanship, and life as a ship's deck officer.

> The spec's four-month track estimate is used only as an app study-time label. It is not a training or sea-time requirement.

### Course 1: The Seafaring Profession

**Course ID:** `mar-seafaring-profession` · **Short code:** `SEA` · **Lessons:** 10  
**Subtitle:** Life and work at sea.  
**Outcome:** Describe the roles on a ship and what working and living aboard involves.

1. **A Career at Sea** — Explain that this is an educational orientation, not professional or safety training or certified training; describe seafaring as work that takes place in a shared, organized shipboard environment.
2. **Shipboard Departments at a Glance** — Distinguish deck, engine, and support departments by their broad areas of responsibility without assigning rank authority.
3. **Deck Department Roles** — Describe broad deck-department contributions to a vessel's operation without giving operating tasks or rank-specific powers.
4. **Shared Spaces and Shipboard Life** — Explain how shared living spaces affect privacy, routines, and respectful conduct aboard.
5. **Time Away and Staying Connected** — Describe time away from home as a consideration of seafaring life without claiming a typical schedule or contract length.
6. **Teamwork Across a Crew** — Identify communication and cooperation habits that support a multicultural crew.
7. **Professional Conduct and Responsibility** — Explain why reliability, honesty, and respect matter in a shared professional environment.
8. **Wellbeing and Support at Sea** — Describe general ways people can seek social support and maintain connection without giving clinical or mental-health advice.
9. **Learning About Maritime Work** — Identify responsible ways to learn about maritime careers and distinguish introductory information from professional preparation.
10. **Reflecting on Seafaring Life** — Summarize the realities of shared living, teamwork, and time away from home and identify questions to discuss with a trusted maritime adviser.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 2: Ships, Parts, and Terminology

**Course ID:** `mar-ship-basics` · **Short code:** `SHP` · **Lessons:** 10  
**Subtitle:** Learning to speak the language of the sea.  
**Outcome:** Name common ship types and parts and use basic nautical terms correctly.

1. **Getting to Know Ships** — Explain that this is an educational orientation, not professional or safety training or certified training; identify ships as designed for different broad purposes.
2. **Common Ship Types** — Compare broad ship-purpose categories without discussing cargo-handling methods or operational details.
3. **A Ship's Main Areas** — Identify broad vessel areas using a labeled, non-operational illustration.
4. **Bow, Stern, Port, and Starboard** — Define basic directional terms as vocabulary without using them to direct a real vessel.
5. **Decks and Compartments** — Explain that decks and compartments organize vessel spaces without giving access or emergency instructions.
6. **The Bridge as a Work Area** — Describe the bridge in general terms as a deck-department work area without explaining equipment operation.
7. **The Engine Department's Spaces** — Recognize that vessels include machinery spaces associated with engineering work without describing entry, operation, or repair.
8. **Ship Plans and Labels** — Interpret a simplified, fictional plan by locating named areas without using it for real-world navigation or work.
9. **Using Nautical Vocabulary Carefully** — Match common directional and ship-area terms to a diagram and explain why shared vocabulary supports communication.
10. **Ship Terminology Review** — Summarize ship types, spaces, and directional vocabulary and state why a vocabulary overview is not operational instruction.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 3: Navigation Concepts

**Course ID:** `mar-navigation-concepts` · **Short code:** `NAV` · **Lessons:** 10  
**Subtitle:** How ships find their way.  
**Outcome:** Explain at a concept level how charts, position, and the rules of the road support safe navigation.

1. **Navigation as a Shipboard Discipline** — Explain that this is an educational orientation, not professional or safety training or certified training; describe navigation as a professional discipline without providing voyage instructions.
2. **Position and Reference Frames** — Explain that position describes where something is relative to a reference, using a fictional map rather than real voyage calculations.
3. **Charts as Representations** — Describe a chart as a representation of geographic information and explain that using one professionally requires training.
4. **Routes as Planning Concepts** — Explain a route as a planned connection between places without calculating or recommending a real voyage.
5. **Navigation Information Sources** — Identify broad categories of information that professional navigators consider without teaching instrument use or interpretation.
6. **Shared Waterways and Awareness** — Explain why awareness of other traffic and shared waterways matters without interpreting collision rules or signals.
7. **Rules of the Road as a Framework** — Describe maritime rules at a high level as a shared framework for predictable interactions; include no rule numbers or signal meanings.
8. **Human Judgment and Uncertainty** — Explain why changing conditions and uncertainty require qualified judgment, without offering decisions for a real voyage.
9. **Navigation Team Communication** — Describe how clear communication supports shared awareness without providing command phrases or operational procedures.
10. **Navigation Concepts Review** — Summarize charts, position, shared-waterway awareness, and professional judgment while distinguishing concepts from navigation training.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 4: Seamanship and Cargo Basics

**Course ID:** `mar-seamanship-cargo` · **Short code:** `SCB` · **Lessons:** 10  
**Subtitle:** Handling the ship and what it carries.  
**Outcome:** Describe general seamanship ideas and why cargo must be handled and secured carefully.

1. **Seamanship as Professional Knowledge** — Explain that this is an educational orientation, not professional or safety training or certified training; describe seamanship as broad knowledge developed through formal learning and supervised practice.
2. **Deck Work as a Team Effort** — Explain why deck work depends on coordination and assigned responsibilities without describing a real task sequence.
3. **Cargo and Ship Design** — Describe how vessels are designed for broad cargo purposes without specifying handling methods or limits.
4. **Cargo as a Planning Consideration** — Explain why cargo information matters to vessel planning in general terms without loading, securing, or hazardous-cargo instructions.
5. **Stability as a Concept** — Describe stability as a general property of a vessel and why professionals consider it, with no calculations or numeric thresholds.
6. **Securing Cargo as a Safety Principle** — Explain why cargo must be managed so it does not shift, without describing equipment, methods, or procedures.
7. **Deck Equipment as Vocabulary** — Recognize that vessels use specialized deck equipment while avoiding names or descriptions that imply operational use.
8. **Documentation and Shared Information** — Explain why accurate cargo and voyage information supports coordination without giving forms or reporting requirements.
9. **Care for People and Property** — Connect careful planning, communication, and respect for assigned roles to the broad goal of reducing harm.
10. **Seamanship and Cargo Review** — Summarize seamanship and cargo concepts and distinguish this overview from vessel-handling or cargo-safety training.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 5: Weather and the Ocean

**Course ID:** `mar-weather-ocean` · **Short code:** `WOC` · **Lessons:** 10  
**Subtitle:** Understanding the sea around the ship.  
**Outcome:** Explain basic weather and ocean ideas and why they matter to voyage planning.

1. **Weather and Ocean Awareness** — Explain that this is an educational orientation, not professional or safety training or certified training; describe weather and ocean conditions as context that professionals study.
2. **Weather in Broad Terms** — Identify broad atmospheric concepts without forecasting or making a voyage decision.
3. **Wind and Surface Conditions** — Explain at a high level how wind relates to surface conditions without giving operational thresholds.
4. **Waves as a Natural Pattern** — Describe waves as movement at the water's surface without predicting vessel response.
5. **Currents and Water Movement** — Explain that currents are large-scale water movement using a conceptual diagram without route calculations.
6. **Tides as Changing Water Levels** — Describe tides as recurring changes in water level without local predictions or navigational use.
7. **Visibility and Changing Conditions** — Explain that visibility can change and that professionals account for uncertainty without giving decisions or procedures.
8. **Ocean and Weather Information** — Identify broad categories of environmental information without interpreting real forecasts or routing advice.
9. **Environmental Context in Voyage Planning** — Explain why environmental context matters to qualified voyage planning without making storm-avoidance or route decisions.
10. **Weather and Ocean Concepts Review** — Summarize the concepts and explain why this overview cannot be used to plan or alter a real voyage.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 6: Maritime Safety and Environmental Care

**Course ID:** `mar-safety-environment` · **Short code:** `MSE` · **Lessons:** 10  
**Subtitle:** Keeping people, ships, and oceans safe.  
**Outcome:** Explain why safety culture, drills, and environmental protection are central to shipping.

1. **Safety Culture at Sea** — Explain that this is an educational orientation, not professional or safety training or certified training; describe safety culture as shared attention to preventing harm, not a set of procedures.
2. **Why Safety Roles Exist** — Explain why clear responsibilities and qualified supervision matter without assigning legal authority or giving task instructions.
3. **Drills as Preparedness Concepts** — Describe the purpose of organized practice in general terms without explaining any emergency, evacuation, firefighting, or abandon-ship steps.
4. **Speaking Up About Concerns** — Explain why timely communication and approved reporting channels matter without describing an emergency response.
5. **Fatigue and Shared Responsibility** — Discuss fatigue as a general human-factors topic and the importance of organizational awareness without medical advice or numeric work limits.
6. **Equipment Care as a Safety Principle** — Explain why equipment condition matters without inspecting, operating, repairing, or troubleshooting it.
7. **Environmental Stewardship at Sea** — Describe broad reasons to protect marine environments without operational pollution-response instructions.
8. **Waste and Pollution Prevention Concepts** — Explain pollution prevention as an organizational responsibility without discharge procedures, limits, or regulation details.
9. **Safety and Environmental Learning** — Identify why formal instruction and current approved materials are necessary for real safety-critical work.
10. **Safety and Environmental Principles Review** — Summarize safety culture and stewardship while emphasizing that the lesson is not professional or safety training.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 7: Path to Practice and Teamwork at Sea

**Course ID:** `mar-path-to-practice` · **Short code:** `PTP` · **Lessons:** 10  
**Subtitle:** Becoming an officer and working in a multicultural crew.  
**Outcome:** Describe the general path to becoming a deck officer and good teamwork and communication habits aboard.

1. **Exploring the Deck Officer Path** — Explain that this is an educational orientation, not professional or safety training or certified training; describe career exploration without promising a specific outcome.
2. **Deck Officer Education Foundations** — Describe formal maritime study as a broad foundation for navigation concepts, seamanship, and deck teamwork without durations, entry requirements, or school comparisons.
3. **Developing Deck Professional Judgment** — Explain how structured learning and qualified guidance build conceptual awareness of deck work without sea-service requirements or operational tasks.
4. **Deck Officer Certification in General Terms** — Describe certification as a broad professional concept for deck pathways without certificate, endorsement, eligibility, or examination details.
5. **Official Sources for Current Information** — Name CHED, the Maritime Industry Authority (MARINA), and the Professional Regulation Commission (PRC), and international standards such as the STCW convention, at name level only; direct learners to official sources for current requirements without describing regulations.
6. **Communication Across Cultures at Sea** — Identify respectful communication habits for a multicultural deck crew and ways to check shared understanding without stereotyping.
7. **Coordinating Deck-Department Responsibilities** — Describe how deck-team members coordinate work and communicate responsibilities without assigning legal powers or rank authority.
8. **Adapting to Life Aboard a Ship** — Reflect on routines, privacy, and maintaining relationships while living aboard without claims about contract schedules or clinical wellbeing advice.
9. **Finding Deck-Career Mentors and Resources** — Describe how learners can identify trusted maritime mentors and learning resources relevant to deck careers.
10. **Roles at Sea and How to Keep Learning** — Close with broad deck and maritime roles, naming credentials only in general terms, and identify a personal plan for continued learning from appropriate sources and mentors.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Closing lesson:** Lesson 10 covers broad field roles and how to keep learning.

**Regulation note:** The permitted CHED, MARINA, PRC, and STCW name-level mentions appear only in this final course; Lesson 5 directs learners to official sources and gives no regulation details.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

## Track 2: Marine Engineer

**Track ID:** `mar-engine`  
**Title:** Marine Engineer  
**Subtitle:** Explore the machinery and systems that keep a ship running.

> This track is not part of the current build run. Its spec estimate, if later shown, is an app study-time label only, not a training or sea-time requirement.

### Course 1: The Marine Engineering Profession

**Course ID:** `mar-eng-profession` · **Short code:** `MEP` · **Lessons:** 10  
**Subtitle:** Life and work in the engine department.  
**Outcome:** Describe the roles in the engine department and how they support the whole ship.

1. **A Career in Marine Engineering** — Explain that this is an educational orientation, not professional or safety training or certified training; describe marine engineering as a profession focused on ship systems and teamwork.
2. **The Engine Department at a Glance** — Describe the engine department's broad purpose without equipment-operation or rank-authority details.
3. **Engineering Roles and Collaboration** — Explain how engineering personnel collaborate with deck and other departments without assigning legal duties to ranks.
4. **Engine-Room Work as a Team** — Describe why coordination and clear communication matter in a shared technical workplace without giving procedures.
5. **Engineering Spaces and Technical Team Culture** — Describe how engine-department work areas shape professional coordination and shared technical team culture without discussing access or operation.
6. **Time Away and Working at Sea** — Describe time away from home as a career consideration without claims about contract or deployment duration.
7. **Professional Conduct and Reliability** — Explain why accurate communication, reliability, and respect support work in a technical team.
8. **Learning to Manage a Technical Career at Sea** — Identify general, non-clinical ways to maintain supportive connections and seek trusted guidance while pursuing a marine engineering career.
9. **Learning About Marine Engineering** — Identify appropriate ways to explore the profession and distinguish orientation from professional preparation.
10. **Reflecting on Engine-Department Work** — Summarize teamwork, shared living, and the engineering department's broad role and identify questions to discuss with a maritime adviser.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Course checklist:** `[ ] course.js` · `[ ] lessons` · `[ ] questions` · `[ ] wrapper` · `[ ] registered` · `[ ] validated`

### Course 2: Engineering Science Foundations

**Course ID:** `mar-eng-science` · **Short code:** `ESF` · **Lessons:** 10  
**Subtitle:** Mechanics, heat, and electricity in plain language.  
**Outcome:** Explain basic mechanics, heat, and electricity ideas that engines and ship systems rely on.

1. **Engineering Science at a Glance** — Explain that this is an educational orientation, not professional or safety training or certified training; identify mechanics, heat, and electricity as broad science foundations.
2. **Forces and Motion** — Explain force and motion with a stationary classroom model, without applying calculations to machinery.
3. **Work and Energy** — Describe work and energy as science concepts using a non-operational everyday example.
4. **Pressure as a Concept** — Explain pressure qualitatively without values, machinery applications, or measurement instructions.
5. **Heat and Temperature** — Distinguish heat transfer from temperature at a conceptual level without operating limits or numeric examples.
6. **Energy Transformations** — Describe how energy can change form in a simplified system without mapping an operating machine.
7. **Electricity as a System Concept** — Introduce electrical charge and circuits conceptually without wiring, testing, or high-voltage details.
8. **Materials and Their Properties** — Compare broad material properties using familiar objects without material specifications or repair advice.
9. **Models and Engineering Limits** — Explain why simplified models aid understanding but cannot replace professional calculations or training.
10. **Engineering Science Review** — Connect mechanics, heat, and electricity concepts and distinguish science orientation from machinery operation or engineering practice.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Course checklist:** `[ ] course.js` · `[ ] lessons` · `[ ] questions` · `[ ] wrapper` · `[ ] registered` · `[ ] validated`

### Course 3: Ship Machinery and Systems Overview

**Course ID:** `mar-eng-ship-systems` · **Short code:** `SMS` · **Lessons:** 10  
**Subtitle:** What is inside the engine room.  
**Outcome:** Name the main systems on a ship and describe in general terms what each one is for.

1. **Ship Systems as Connected Systems** — Explain that this is an educational orientation, not professional or safety training or certified training; describe ship systems as connected parts without operational detail.
2. **Power Systems at a Glance** — Explain the broad purpose of onboard power systems without operation, specifications, or troubleshooting.
3. **Fuel Systems as a Concept** — Describe why ships have systems that supply energy resources without tracing flow, operating equipment, or handling fuel.
4. **Cooling and Heat-Management Concepts** — Explain why machinery systems manage heat without explaining equipment operation or maintenance.
5. **Electrical Systems at a Glance** — Describe the broad role of electrical systems without wiring, isolation, testing, or high-voltage work.
6. **Auxiliary Systems** — Explain that auxiliary systems support other ship functions without describing use or repair.
7. **Piping and System Diagrams** — Read a fictional high-level diagram by identifying labels and connections without using it as a work instruction.
8. **Monitoring as a General Concept** — Explain why professionals monitor system condition without naming readings, thresholds, alarms, or response steps.
9. **Interdependence and Reliability** — Describe how a change in one system may affect others at a broad conceptual level.
10. **Ship-Systems Review** — Summarize power, fuel, cooling, electrical, and auxiliary systems by purpose and state that the overview is not machinery training.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Course checklist:** `[ ] course.js` · `[ ] lessons` · `[ ] questions` · `[ ] wrapper` · `[ ] registered` · `[ ] validated`

### Course 4: Propulsion and Power Generation

**Course ID:** `mar-eng-propulsion-power` · **Short code:** `PPG` · **Lessons:** 10  
**Subtitle:** How a ship moves and gets its power.  
**Outcome:** Explain at a concept level how propulsion and onboard power generation work.

1. **Propulsion and Power as Concepts** — Explain that this is an educational orientation, not professional or safety training or certified training; distinguish propulsion from onboard power generation conceptually.
2. **Energy and Ship Movement** — Describe broadly how energy can be transformed into movement without describing an operating process.
3. **Propulsion Systems at a Glance** — Identify propulsion as a system that contributes to vessel movement without naming operating controls or steps.
4. **Power Generation at a Glance** — Explain that onboard generation supplies electrical power in general terms without equipment operation or specifications.
5. **Transmission of Motion** — Describe the conceptual transfer of motion through connected components using an abstract diagram.
6. **Energy Conversion and Efficiency** — Explain energy conversion and efficiency qualitatively without ratings, measurements, or optimization instructions.
7. **Propulsion and Other Ship Systems** — Describe how propulsion depends on supporting systems without tracing a real machine or troubleshooting it.
8. **Environmental Considerations** — Explain why propulsion and power choices relate to environmental stewardship without emissions figures or operational guidance.
9. **Human Expertise and Oversight** — Explain why qualified professionals and approved procedures are necessary for actual propulsion and power systems.
10. **Propulsion and Power Review** — Summarize the conceptual difference between moving a vessel and supplying onboard power without operational detail.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Course checklist:** `[ ] course.js` · `[ ] lessons` · `[ ] questions` · `[ ] wrapper` · `[ ] registered` · `[ ] validated`

### Course 5: Maintenance and Reliability

**Course ID:** `mar-eng-maintenance` · **Short code:** `MNT` · **Lessons:** 10  
**Subtitle:** Keeping machinery dependable.  
**Outcome:** Explain why planned maintenance, inspection, and record keeping matter.

1. **Reliability as an Engineering Goal** — Explain that this is an educational orientation, not professional or safety training or certified training; define reliability as a broad goal of dependable systems.
2. **Why Planned Maintenance Exists** — Explain why organizations plan maintenance without describing a schedule, task, or procedure.
3. **Inspection as a General Concept** — Describe inspection as a way professionals gather information about condition without teaching how to inspect machinery.
4. **Records and Shared Knowledge** — Explain how accurate records support continuity and accountability without providing forms or required fields.
5. **Changes in Equipment Condition** — Explain why noticing and communicating a change matters without diagnosing or troubleshooting it.
6. **Reliability and System Dependencies** — Describe how one system's availability may affect other functions at a broad level.
7. **Parts, Materials, and Planning** — Explain why organizations plan resources for maintenance without procurement claims or technical specifications.
8. **Maintenance Team Coordination** — Describe how role clarity and communication support planned work without assigning rank authority.
9. **Learning from Maintenance Trends** — Explain that professionals can review records for patterns without analyzing real equipment or numeric performance data.
10. **Maintenance and Reliability Review** — Summarize planning, inspection, records, and coordination while distinguishing concepts from repair or troubleshooting training.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Course checklist:** `[ ] course.js` · `[ ] lessons` · `[ ] questions` · `[ ] wrapper` · `[ ] registered` · `[ ] validated`

### Course 6: Engine-Room Safety and Environmental Care

**Course ID:** `mar-eng-safety-environment` · **Short code:** `ESE` · **Lessons:** 10  
**Subtitle:** Working safely and protecting the sea.  
**Outcome:** Explain why safe work habits and pollution prevention are central to engineering work at sea.

1. **Safety Culture in Engineering Spaces** — Explain that this is an educational orientation, not professional or safety training or certified training; describe safety culture as shared prevention and communication, not instructions.
2. **Why Machinery Spaces Need Safety Systems** — Explain that machinery spaces present hazards that require formal training and controls without naming operating procedures or specific hazardous tasks.
3. **Roles, Supervision, and Limits** — Explain why work authorization and qualified supervision matter without assigning legal authority to a rank.
4. **Energy Hazards as a General Concept** — Explain that stored or moving energy can create risk without giving isolation, electrical, or machinery steps.
5. **Maintenance Safety as a Principle** — Describe why organizations plan safe maintenance and communication without giving checklists, repair methods, or procedures.
6. **Pollution Prevention Concepts** — Explain why pollution prevention matters to marine environments without handling, discharge, or response instructions.
7. **Waste and Resource Stewardship** — Describe general reasons to manage waste and resources responsibly without shipboard disposal procedures.
8. **Speaking Up and Reporting Concerns** — Explain why professionals use approved channels to raise concerns without describing emergency response actions.
9. **Learning Safety Through Formal Training** — Explain why actual safety-critical work requires current formal instruction, supervision, and approved procedures.
10. **Engineering Safety and Environment Review** — Summarize safety culture and environmental stewardship without copying the Deck track's shipboard drill topics or giving operational guidance.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Course checklist:** `[ ] course.js` · `[ ] lessons` · `[ ] questions` · `[ ] wrapper` · `[ ] registered` · `[ ] validated`

### Course 7: Path to Practice and Lifelong Learning

**Course ID:** `mar-eng-path-to-practice` · **Short code:** `PLL` · **Lessons:** 10  
**Subtitle:** Becoming an engineer officer and growing in the career.  
**Outcome:** Describe the general path to becoming a marine engineer officer and how seafarers keep learning.

1. **Exploring Marine Engineering** — Explain that this is an educational orientation, not professional or safety training or certified training; describe career exploration without promising outcomes.
2. **Marine Engineering Studies** — Describe formal study as a broad foundation for understanding ship systems and engineering science without durations, entry requirements, or school comparisons.
3. **Guided Development of Engineering Judgment** — Explain how structured learning and qualified guidance can develop a learner's conceptual understanding without sea-service requirements or machinery tasks.
4. **Professional Recognition in Engineering** — Describe professional recognition as a broad career concept without certificate, endorsement, eligibility, or examination details.
5. **Official Sources for Current Information** — Name CHED, the Maritime Industry Authority (MARINA), and the Professional Regulation Commission (PRC), and international standards such as the STCW convention, at name level only; direct learners to official sources for current requirements without describing regulations.
6. **Coordination Across Ship Systems Teams** — Describe how engine and deck colleagues exchange clear, respectful information about shared vessel systems without assigning legal duties or rank authority.
7. **Making a Technical Career Fit at Sea** — Reflect on shared routines, technical teamwork, and time away as considerations when exploring marine engineering without contract-duration claims or clinical wellbeing advice.
8. **Reflection and Support for Engineering Learners** — Identify general ways to reflect on technical learning and seek trusted support without clinical or mental-health advice.
9. **Building a Marine Engineering Learning Network** — Describe how engineering learners can identify appropriate mentors and trustworthy technical-learning sources.
10. **Marine Engineering Roles and How to Keep Learning** — Close with broad engineering and maritime roles, naming credentials only in general terms, and identify a continued-learning plan using appropriate sources and mentors.

**Lesson 1 disclaimer:** Include “educational orientation, not professional or safety training” and “not certified training.”

**Closing lesson:** Lesson 10 covers broad field roles and how to keep learning.

**Regulation note:** The permitted CHED, MARINA, PRC, and STCW name-level mentions appear only in this final course; Lesson 5 directs learners to official sources and gives no regulation details.

**Course checklist:** `[ ] course.js` · `[ ] lessons` · `[ ] questions` · `[ ] wrapper` · `[ ] registered` · `[ ] validated`

## Build notes

- Treat every “without ...” phrase in lesson objectives and constraints as a writing constraint; never include it as learner-facing text.
- Do not add images or diagrams. Use text descriptions, `matchPairs`, `order`, or `quickCheck` instead.
- Treat `estimated_duration` as an app study-time label only, never a training or sea-time requirement.

## Expert review priorities

The following outline areas should receive the closest review from a maritime student, seafarer, or maritime instructor before build approval:

- **Deck — The Seafaring Profession:** realism and balance of shared living, crew roles, multicultural teamwork, time away, and general wellbeing.
- **Deck — Ships, Parts, and Terminology:** accuracy of basic ship types, directional terms, vessel areas, and the boundary between vocabulary and operational instruction.
- **Deck — Navigation Concepts:** accuracy of the broad concepts of charts, position, route planning, shared waterways, and uncertainty; verify no real-voyage calculations, signal meanings, rule numbers, or operational decisions appear.
- **Deck — Seamanship and Cargo Basics:** accuracy of high-level seamanship, cargo purpose, stability, and securing principles while avoiding handling steps, specifications, and rank authority claims.
- **Deck — Weather and the Ocean:** accuracy of general wind, waves, currents, tides, and visibility concepts; ensure no weather routing, forecast interpretation, or storm-avoidance advice.
- **Deck — Maritime Safety and Environmental Care:** accuracy of safety-culture and environmental-protection concepts and strict exclusion of emergency, drill, firefighting, evacuation, or pollution-response instructions.
- **Deck — Path to Practice and Teamwork at Sea:** accuracy of broad education and supervised-learning descriptions and of the exact name-level CHED, MARINA, PRC, and STCW mention; check multicultural teamwork and career-role language.
- **Engine — The Marine Engineering Profession:** realism of engine-department roles, shared living, cross-department teamwork, and time away without rank powers or contract claims.
- **Engine — Engineering Science Foundations:** scientific accuracy and clarity of force, motion, energy, pressure, heat, electricity, and material concepts; ensure no numerical specifications or high-voltage guidance.
- **Engine — Ship Machinery and Systems Overview:** accuracy of broad system purposes and diagrams; verify no controls, thresholds, troubleshooting, operation, or repair steps.
- **Engine — Propulsion and Power Generation:** accuracy of the conceptual distinction between propulsion and onboard generation; check for no machinery sequence, operating parameters, or performance claims.
- **Engine — Maintenance and Reliability:** accuracy of planned maintenance, inspection, documentation, and reliability concepts; ensure no maintenance schedule, task procedure, or troubleshooting content.
- **Engine — Engine-Room Safety and Environmental Care:** accuracy of general energy-hazard and pollution-prevention concepts; verify no isolation, repair, waste-discharge, emergency, or other operational steps.
- **Engine — Path to Practice and Lifelong Learning:** accuracy of broad education/supervision descriptions and the exact name-level CHED, MARINA, PRC, and STCW mention; check that roles and credentials remain general.

Expert review of the built Deck content is pending. This checkpoint does not claim the content has been reviewed or approved.

## Spec/template conflicts, decisions, and open questions

- **Spec run mode versus explicit build request:** The YAML in `docs/tasks/specs/marine.md` still says `run_mode: plan`, while this request explicitly directs a build from the reviewed checkpoint. This run follows the explicit request and builds only `mar-deck`; the spec file is unchanged.
- **Track estimates:** The Deck track's spec estimate is used only as an app study-time label, not as a training or sea-time requirement. No duration is presented in lesson content.
- **Regulator and standards names versus the no-regulation-details request:** The spec requires CHED, MARINA, PRC, and STCW to be mentioned by name only in the final course of each track. This plan includes those names only in Lesson 5 of each track's final course, with a direction to official sources and no explanation of regulations or requirements.
- **“Not certified training” versus “not professional or safety training”:** The spec asks for a “not certified training” disclaimer. This plan includes both that phrase and the requested “not professional or safety training” note in each course's first lesson.
- **Two-track build sequencing:** The spec says to build `mar-deck` first and lets `mar-engine` follow in a later run. This run completed and validated all seven Deck courses; `mar-engine` remains planned for a later run.
- **No supplied media or references:** The spec supplies no links, so none are proposed.
- **Review notes:** `src/features/learning-hub/marine/REVIEW_NOTES.md` was created during build and lists the expert-review topics for all seven Deck courses. The Marine Engineer course review notes remain pending a later track build.
- **Availability:** Marine remains `coming-soon` until a human expert reviews the completed content and a human changes its status.

## Plan totals and build order

- **Tracks:** 2 planned; only `mar-deck` is registered in this run.
- **Courses:** 14 outlined; all 7 Deck Officer (Marine Transportation) courses are built, and all 7 Marine Engineer courses remain planned.
- **Lessons:** 70 built for Deck; 70 Marine Engineer lessons remain planned.
- **Quiz banks:** Each built Deck course has 10 questions (one per lesson) and a 10-question quiz attempt. The shared validator passed; correct-answer positions cycle across all four indexes. The Marine Engineer quiz banks remain planned.
- **Build order:** All seven `mar-deck` courses were completed and validated. The seven `mar-engine` courses may follow in a later build run.
- **Career availability:** Remains `coming-soon` pending maritime expert review. The built `mar-deck` preview is registered; the Marine Engineer track is not registered.
- **Build scope:** Complete the seven `mar-deck` courses in this run. The seven `mar-engine` courses remain planned and unbuilt.

## Build validation

- `npm run validate:content`: passed; shared validator reports 10 careers, 12 tracks, and 83 courses.
- `npm run lint`: passed.
- `npx expo export -p web`: passed.
- Manual in-app flow: not run; the available browser session is on the login screen, and using guest access may create a Supabase account. See the manual checklist in the build report.
