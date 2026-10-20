# Cybersecurity Career Plan Checkpoint

**Mode:** Build completed from `docs/tasks/specs/cybersecurity.md`.
**Career:** Cybersecurity (`cybersecurity`)
**Current implementation status:** `available`; both tracks and all 14 courses are registered.
**Audience:** Complete beginners, including senior high school and college learners and career shifters. Keep examples accessible and suitable for the Philippines without asserting unverified local legal or regulatory facts.

## Build-wide content constraints

- Keep all instruction defensive, ethical, and focused on authorized work. Explain that unauthorized access is illegal and harmful throughout the material.
- Do not include exploit code, malware, attack procedures, bypass methods, or labs targeting systems the learner does not own or have explicit permission to use.
- Use only conceptual explanations, synthetic scenarios, and safe practice activities: `quickCheck`, `order`, and `matchPairs`. No code playground activities.
- Do not include statistics, salaries, breach figures, penalties, article or section numbers, certification fees, or pass rates.
- Do not invent video or reference links; the spec supplies none.
- Mention the Data Privacy Act of 2012 (RA 10173) and the National Privacy Commission by name only in the Data Privacy Fundamentals course, and direct learners to official sources for current requirements.
- The final course in each track ends with field roles and continuing learning; mention industry certifications only in general terms.

## Track 1: Security Analyst

**Track ID:** `cyber-security-analyst`  
**Title:** Security Analyst  
**Subtitle:** Monitor systems, spot threats, and respond to incidents.  
**Estimated duration:** 5 months

### Course 1: Networking Basics

**Course ID:** `cyber-networking-basics` · **Short code:** `NET` · **Lessons:** 10  
**Subtitle:** How computers and networks communicate.  
**Outcome:** Explain how data moves across a network and why that matters for security.

1. **Networks in Everyday Life** — Explain how connected devices exchange information and identify security responsibilities in a simple home, school, or workplace network.
2. **Devices and Network Roles** — Distinguish the roles of clients, servers, routers, switches, and wireless access points using a simple diagram.
3. **Local and Wide-Area Networks** — Compare a local network with a network spanning multiple locations and explain why boundaries matter for protection.
4. **Addresses and Names** — Describe the purpose of network addresses and name-resolution services without performing lookups against real systems.
5. **Ports and Services as Concepts** — Explain that services use logical communication endpoints and relate service exposure to asset ownership and authorization.
6. **How Web Connections Work** — Trace a high-level, ordinary browser-to-website exchange and identify where identity and encryption protections can apply.
7. **Wireless Network Basics** — Explain wireless network components and recognize why configuration and access should be managed by authorized owners.
8. **Network Boundaries and Segmentation** — Read a conceptual network diagram and explain how separating areas can limit accidental exposure.
9. **Secure Network Habits** — Identify responsible practices for maintaining network equipment, reporting concerns, and avoiding unauthorized probing.
10. **Networking Review and Ethical Practice** — Summarize how data moves through a network and explain why security learning must stay within explicitly authorized environments.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 2: Operating Systems for Security

**Course ID:** `cyber-os-fundamentals` · **Short code:** `OS` · **Lessons:** 10  
**Subtitle:** Windows and Linux essentials every analyst uses.  
**Outcome:** Navigate common operating systems and explain files, processes, and permissions.

1. **What an Operating System Does** — Describe how an operating system coordinates applications, users, files, and device resources.
2. **Files, Folders, and Paths** — Interpret familiar file and folder structures and explain why organized storage supports safer administration.
3. **Users and Accounts** — Distinguish individual user accounts from shared or service accounts and explain why accountability matters.
4. **Permissions and Ownership** — Explain read, change, and execution permissions conceptually and choose a least-privilege example from a scenario.
5. **Processes and Applications** — Describe a process as a running program and explain why software should be installed and managed through approved channels.
6. **System Settings and Updates** — Explain how updates address defects and why changes should follow an authorized maintenance process.
7. **Windows and Linux at a Glance** — Compare common operating-system concepts across Windows and Linux without requiring command-line procedures.
8. **Endpoint Protection Concepts** — Identify the purpose of approved endpoint protections and explain why users should not disable them to bypass controls.
9. **Backups and Recovery Basics** — Explain how managed backups can support recovery and why backup access should be restricted.
10. **Responsible Operating-System Use** — Apply safe account, permission, and reporting choices to a synthetic scenario and explain why unauthorized changes are harmful.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 3: Security Fundamentals

**Course ID:** `cyber-security-fundamentals` · **Short code:** `SEC` · **Lessons:** 10  
**Subtitle:** Threats, risks, and the core principles of protection.  
**Outcome:** Describe the CIA triad, common threat types, and basic defenses.

1. **Security and Trust** — Define information security in beginner-friendly terms and connect protection to people, systems, and responsible access.
2. **Confidentiality, Integrity, and Availability** — Explain the CIA triad and classify simple protective goals using everyday examples.
3. **Assets and Their Importance** — Identify information, devices, services, and people as assets that may need protection.
4. **Threats, Vulnerabilities, and Risk** — Distinguish a possible threat, a weakness, and the resulting risk without giving exploitation instructions.
5. **Security Controls** — Compare administrative, physical, and technical control categories using high-level examples.
6. **Defense in Depth** — Explain how multiple complementary safeguards can reduce reliance on a single control.
7. **Secure Configuration as a Principle** — Describe why systems should use approved, documented settings and why control changes require authorization.
8. **Recognizing and Reporting Concerns** — Choose an appropriate internal reporting path for a synthetic security concern without investigating beyond permission.
9. **Ethics, Authorization, and Harm** — Explain how unauthorized access can harm people and organizations and why cybersecurity work requires explicit permission.
10. **Fundamentals Review** — Connect the CIA triad, assets, risk, and controls in a defensive scenario and state the ethical boundaries for further learning.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 4: Cryptography Basics

**Course ID:** `cyber-cryptography-basics` · **Short code:** `CRY` · **Lessons:** 10  
**Subtitle:** Encryption, hashing, and digital trust explained simply.  
**Outcome:** Explain what encryption, hashing, and certificates do and when each is used.

1. **Why Cryptography Matters** — Explain how cryptographic tools support confidentiality, integrity, and trust in ordinary digital services.
2. **Encoding Is Not Encryption** — Distinguish data representation from protection and explain why concealed-looking text is not automatically secure.
3. **Symmetric Encryption** — Describe the shared-key idea and identify the importance of keeping authorized keys protected.
4. **Public-Key Cryptography** — Explain the high-level relationship between public and private keys without performing cryptographic operations.
5. **Hashing and Integrity Checks** — Describe a hash as a one-way summary used to help detect changes, and distinguish it from encryption.
6. **Digital Signatures** — Explain how signatures can help verify origin and integrity, while noting that trust depends on correct key handling.
7. **Certificates and Trust Chains** — Describe how certificates associate a public key with an identity at a conceptual level.
8. **Encrypted Web Connections** — Explain the protective purpose of encrypted web connections and why users should follow approved certificate warnings.
9. **Key Management Concepts** — Identify lifecycle ideas such as controlled creation, access, rotation, and retirement without providing operational key-handling procedures.
10. **Choosing and Using Cryptography Responsibly** — Match common protection goals to encryption, hashing, or signatures and explain why only approved systems and methods should be used.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 5: Web and Application Security

**Course ID:** `cyber-web-app-security` · **Short code:** `WEB` · **Lessons:** 10  
**Subtitle:** How web apps get attacked and how they are defended.  
**Outcome:** Recognize common web vulnerabilities at a concept level and the defenses against them.

1. **Parts of a Web Application** — Identify a browser, application service, and data store in a simplified architecture diagram.
2. **Data Flow and Trust Boundaries** — Follow a benign data-flow diagram and explain why each boundary needs deliberate protective checks.
3. **Input Handling as a Risk Area** — Explain conceptually why applications validate and safely handle user-provided data, without demonstrating attack strings or payloads.
4. **Authentication and Sessions** — Describe how applications recognize signed-in users and why session protections matter.
5. **Authorization and Object Access** — Distinguish signing in from permission to access a specific action or record.
6. **Protecting Sensitive Information** — Identify data minimization and safe handling as design goals for application features.
7. **Dependencies and Updates** — Explain why software components need trusted sources, review, and timely maintenance.
8. **Errors, Logs, and Information Exposure** — Recognize that overly detailed error messages can expose information and describe safer user-facing reporting at a high level.
9. **Secure Development and Review** — Describe how design review, code review, and approved testing contribute to safer applications.
10. **Responsible Disclosure and Authorization** — Choose an ethical reporting response to a hypothetical concern and explain why testing real applications requires explicit permission.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 6: Identity and Access Management

**Course ID:** `cyber-identity-access` · **Short code:** `IAM` · **Lessons:** 10  
**Subtitle:** Passwords, authentication, and controlling who can do what.  
**Outcome:** Explain authentication, authorization, MFA, and least privilege.

1. **Identity and Access** — Explain how identity and access decisions help organizations ensure that the right people use the right resources.
2. **Authentication and Authorization** — Contrast proving an identity with deciding what that identity may do.
3. **Passwords and Passphrases** — Describe qualities of stronger authentication secrets and explain why credentials should never be shared.
4. **Multi-Factor Authentication** — Explain the idea of combining different proof types and recognize that authentication prompts should be handled carefully.
5. **Least Privilege** — Apply least privilege to a fictional role by selecting only the access needed for assigned responsibilities.
6. **Roles and Groups** — Explain how role-based access can make permissions easier to review and manage.
7. **Account Lifecycle** — Describe why account access should be updated when a person's responsibilities change or end.
8. **Privileged Accounts** — Explain why administrative access needs stronger oversight and should not be used for routine tasks unnecessarily.
9. **Access Reviews and Accountability** — Identify the purpose of periodic access review and responsible documentation.
10. **Ethical Identity Practice** — Respond safely to a synthetic access-control concern and explain why borrowing, guessing, or bypassing another person's access is harmful and unauthorized.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 7: Monitoring and Threat Detection

**Course ID:** `cyber-monitoring-detection` · **Short code:** `MON` · **Lessons:** 10  
**Subtitle:** Logs, alerts, and spotting suspicious activity.  
**Outcome:** Read simple logs and explain how alerts and monitoring tools work.

1. **Why Organizations Monitor Systems** — Explain how authorized monitoring supports service health, security, and incident awareness.
2. **Events and Logs** — Distinguish an event from a log record and identify common descriptive fields in a fictional, non-sensitive example.
3. **Sources of Security Signals** — Compare high-level categories of identity, endpoint, application, and network signals.
4. **Normal Activity and Baselines** — Explain why context and established normal patterns help analysts interpret alerts.
5. **Alerts and Their Limits** — Describe what an alert indicates and why it is a prompt for authorized review rather than proof of wrongdoing.
6. **Triage with Context** — Organize a fictional alert summary by time, affected service, and reported impact without exploring systems.
7. **False Positives and Uncertainty** — Explain why benign activity can trigger alerts and how analysts communicate uncertainty.
8. **Escalation and Collaboration** — Choose when to notify an authorized teammate or incident lead using a documented process.
9. **Privacy and Monitoring Boundaries** — Explain why monitoring should be purpose-limited, authorized, and respectful of personal information.
10. **Ethical Monitoring Practice** — Summarize how analysts should handle logs responsibly and why searching data outside their approved role can cause harm.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 8: Incident Response

**Course ID:** `cyber-incident-response` · **Short code:** `IR` · **Lessons:** 10  
**Subtitle:** What to do when something goes wrong.  
**Outcome:** Describe the phases of incident response and the analyst's role in each.

1. **What Counts as a Security Incident** — Distinguish an unusual event from a confirmed incident and explain why prompt, authorized reporting matters.
2. **Preparation and Readiness** — Describe the purpose of assigned roles, communication paths, and approved response plans.
3. **Identification and Assessment** — Explain how authorized teams assess reports and available evidence without broadening access or investigation scope.
4. **Prioritization and Escalation** — Use a fictional impact summary to explain why incidents are routed according to documented severity and responsibility.
5. **Containment as an Authorized Decision** — Explain containment as limiting further harm and emphasize that actions must follow approved authority and plans.
6. **Evidence and Documentation Principles** — Describe the need for accurate, restricted, and policy-aligned records without giving forensic procedures.
7. **Recovery and Service Restoration** — Explain that authorized teams restore services after appropriate validation and communication.
8. **Communication During an Incident** — Identify the purpose of clear, factual updates and role-appropriate communication.
9. **Learning from an Incident** — Explain how a retrospective can identify process improvements without blame or unsupported claims.
10. **Security Response Roles and Continued Learning** — Compare broad incident-response and security-operations roles, make a personal learning plan, and describe industry certifications only as optional general learning pathways.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

## Track 2: Security Governance and Compliance

**Track ID:** `cyber-grc`  
**Title:** Security Governance and Compliance  
**Subtitle:** Policies, risk, and privacy: the people side of security.  
**Estimated duration:** 4 months

### Course 9: Risk Management

**Course ID:** `cyber-risk-management` · **Short code:** `RSK` · **Lessons:** 10  
**Subtitle:** Finding, rating, and handling risk.  
**Outcome:** Identify assets, threats, and risks and explain common ways to treat risk.

1. **Risk in Everyday Decisions** — Explain risk as uncertainty that may affect an objective and identify a simple organizational example.
2. **Assets and Business Context** — Identify what an organization values and describe why context affects protection priorities.
3. **Threats and Weaknesses** — Distinguish a potential source of harm from a condition that could make harm more likely.
4. **Likelihood and Impact Concepts** — Compare possible likelihood and impact qualitatively without inventing numeric ratings or statistics.
5. **Risk Statements** — Write a concise, neutral risk statement connecting a situation, possible event, and consequence.
6. **Risk Assessment and Uncertainty** — Explain why assessments use evidence, assumptions, and documented uncertainty rather than false precision.
7. **Risk Treatment Choices** — Compare broad treatment choices such as reducing, avoiding, sharing, or accepting risk at a conceptual level.
8. **Controls and Residual Risk** — Explain how safeguards may reduce risk while leaving some remaining uncertainty.
9. **Risk Ownership and Communication** — Identify who should review, accept, and communicate organizational risk according to assigned roles.
10. **Ethical Risk Practice** — Explain why risk reporting must be accurate, authorized, and transparent about uncertainty and possible harm.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 10: Security Policies and Frameworks

**Course ID:** `cyber-security-policies` · **Short code:** `POL` · **Lessons:** 10  
**Subtitle:** The rules and structures organizations follow.  
**Outcome:** Explain what security policies and frameworks are for and how they are used.

1. **Governance and Accountability** — Describe how governance assigns direction, responsibility, and oversight for security decisions.
2. **Purpose of a Security Policy** — Explain how a policy sets organizational expectations without replacing technical safeguards.
3. **Standards, Procedures, and Guidelines** — Distinguish broad policy from more specific standards, procedures, and optional guidance.
4. **Frameworks as Organizing Tools** — Explain how a framework can organize security work without treating it as a one-size-fits-all guarantee.
5. **Roles and Responsibilities** — Map policy responsibilities to leadership, staff, technical teams, and relevant stakeholders in a fictional organization.
6. **Exceptions and Risk Decisions** — Explain why exceptions should be authorized, documented, time-bounded where appropriate, and reviewed.
7. **Policy Communication and Training** — Describe ways organizations help people understand expectations and ask questions.
8. **Review and Change Management** — Explain why policies should be reviewed when organizational context or systems change.
9. **Evidence of Implementation** — Identify examples of non-sensitive evidence that may show a control is documented or followed.
10. **Ethical Policy Application** — Explain why policies should be applied consistently and why staff should raise unclear or harmful requirements through appropriate channels.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 11: Data Privacy Fundamentals

**Course ID:** `cyber-data-privacy` · **Short code:** `PRV` · **Lessons:** 10  
**Subtitle:** Protecting personal information.  
**Outcome:** Explain personal data, consent, and basic privacy principles.

1. **Privacy and Personal Information** — Identify information that can relate to a person and explain why privacy matters in ordinary digital services.
2. **Data Lifecycle Overview** — Describe how information may be collected, used, stored, shared, retained, and disposed of at a high level.
3. **Purpose and Transparency** — Explain why people should be given clear information about intended data use, without stating jurisdiction-specific legal rules.
4. **Data Minimization** — Choose the minimum information needed for a fictional service purpose and explain how this can reduce exposure.
5. **Consent and Choice Concepts** — Describe consent as a meaningful choice in appropriate contexts and recognize that exact requirements depend on current official guidance.
6. **Access, Accuracy, and Respectful Use** — Explain why personal information should be accurate, appropriately accessed, and used only for an authorized purpose.
7. **Storage, Sharing, and Retention** — Identify privacy risks in keeping or sharing more information than a defined purpose requires.
8. **Privacy Incidents and Reporting** — Choose an appropriate organizational reporting path for a suspected privacy concern without investigating or disclosing personal data.
9. **Philippine Privacy Context and Official Sources** — Name the Data Privacy Act of 2012 (RA 10173) and the National Privacy Commission, and direct learners to official sources for current requirements; do not interpret provisions or cite article or section numbers.
10. **Ethical Privacy Practice** — Apply privacy-minded choices to a fictional scenario and explain why unauthorized access or disclosure can harm people and violate applicable rules.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 12: Security Awareness and Social Engineering Defense

**Course ID:** `cyber-security-awareness` · **Short code:** `AWR` · **Lessons:** 10  
**Subtitle:** Helping people avoid common tricks.  
**Outcome:** Recognize phishing and other social-engineering tactics and teach basic defenses.

1. **Human-Centered Security** — Explain why security awareness supports people rather than blaming them for deceptive situations.
2. **Recognizing Suspicious Messages** — Identify high-level warning signs in fictional messages without composing or optimizing deceptive content.
3. **Verifying Unexpected Requests** — Choose a trusted, separate verification path before responding to an unusual request.
4. **Protecting Credentials and Prompts** — Explain why passwords, authentication codes, and unexpected approval requests should not be shared or approved blindly.
5. **Links, Attachments, and Safe Caution** — Describe how to pause and use approved reporting tools instead of opening unexpected material.
6. **Impersonation and Urgency** — Recognize how pressure or impersonation can influence decisions and practice a calm, policy-aligned response.
7. **Reporting Without Blame** — Identify useful information to report through an approved channel while avoiding unnecessary forwarding or disclosure.
8. **Awareness for Different Contexts** — Adapt clear, accessible guidance for school, home, office, and remote-learning situations.
9. **Building a Supportive Awareness Program** — Describe how organizations can reinforce safe habits through practical reminders and feedback.
10. **Ethical Social-Engineering Defense** — Explain why awareness exercises must be authorized, respectful, and designed to protect rather than embarrass or exploit people.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 13: Business Continuity and Disaster Recovery

**Course ID:** `cyber-business-continuity` · **Short code:** `BCP` · **Lessons:** 10  
**Subtitle:** Keeping organizations running after disruption.  
**Outcome:** Explain backups, recovery objectives, and continuity planning.

1. **Continuity and Recovery Concepts** — Distinguish keeping important work operating from restoring technology after disruption.
2. **Critical Services and Dependencies** — Map a fictional service to people, systems, information, and suppliers it depends on.
3. **Disruption Scenarios** — Compare broad, non-operational disruption scenarios and explain why planning should include uncertainty.
4. **Priorities and Recovery Objectives** — Explain recovery-time and recovery-point objectives conceptually without assigning unsupported targets.
5. **Backup Principles** — Describe why independent, protected, and tested backups support recovery at a high level.
6. **Roles and Coordination** — Identify how assigned teams coordinate decisions and communicate during a disruption.
7. **Continuity Plans** — Explain the role of documented alternatives and decision points in maintaining essential work.
8. **Tabletop Exercises** — Describe how a discussion-based exercise can reveal unclear responsibilities without interacting with real production systems.
9. **Reviewing Plans and Lessons** — Explain why plans and assumptions should be revisited after exercises or organizational changes.
10. **Ethical Resilience Practice** — Apply continuity concepts to a fictional scenario while emphasizing authorized actions, clear communication, and care for affected people.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

### Course 14: Audits and Compliance Basics

**Course ID:** `cyber-audit-compliance` · **Short code:** `AUD` · **Lessons:** 10  
**Subtitle:** Showing that controls actually work.  
**Outcome:** Explain what audits check and how evidence and controls are documented.

1. **What an Audit Is** — Explain an audit as a structured review against defined criteria and distinguish it from an informal opinion.
2. **Scope and Criteria** — Describe why a review defines its purpose, boundaries, and evaluation criteria before examining evidence.
3. **Controls and Evidence** — Distinguish a documented control from evidence that can help show how it is operating.
4. **Evidence Quality and Handling** — Identify qualities of useful, relevant, protected evidence and explain why records should not be altered or accessed without authorization.
5. **Interviews and Observation** — Describe how respectful questions and authorized observation can help clarify documented processes.
6. **Findings and Recommendations** — Explain how a finding should state a supported condition and potential concern without overstating evidence.
7. **Corrective Actions and Ownership** — Describe how responsible owners can track agreed improvements and communicate progress.
8. **Confidentiality and Independence** — Explain why reviewers should protect sensitive information and disclose conflicts or limitations.
9. **Ethical Compliance Practice** — Respond to a fictional request to hide or misrepresent evidence by choosing accurate documentation and an appropriate escalation path.
10. **Governance Roles and Continued Learning** — Compare broad audit, governance, risk, and compliance roles, create a continued-learning plan, and describe industry certifications only in general terms.

**Course checklist:** `[x] course.js` · `[x] lessons` · `[x] questions` · `[x] wrapper` · `[x] registered` · `[x] validated`

## Plan totals and build order

- **Tracks:** 2.
- **Courses:** 14 total; 8 in Security Analyst and 6 in Security Governance and Compliance.
- **Lessons:** 140 total; 10 per course.
- **Quiz banks:** 140 questions total; one question per lesson and a 10-question attempt for each course.
- **Validation:** `npm run validate:content` checks all 10 careers, five tracks, and 31 registered courses.
- **Availability:** Cybersecurity is `available` as `review_required: false`; no subject-expert review requirement was specified. Content remains conceptual and is not operational security guidance.
