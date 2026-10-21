# Career Spec: Cybersecurity

Run with `docs/tasks/03-career-content-template.md`. Suggested order: run once with `run_mode: plan`, review the outline, then switch to `build`. Build track 1 first; track 2 can follow in a later run through the checkpoint file.

```yaml
career:
  id: cybersecurity
  title: Cybersecurity
  learner_level: complete beginner (senior high school, college, and career shifters)
  philippines_context: true
  review_required: false
  run_mode: plan

tracks:
  - id: cyber-security-analyst
    title: Security Analyst
    subtitle: Monitor systems, spot threats, and respond to incidents.
    estimated_duration: 5 months
    courses:
      - { id: cyber-networking-basics,     title: Networking Basics,                 short_code: NET, lesson_count: 10, subtitle: How computers and networks communicate., outcome: Explain how data moves across a network and why that matters for security. }
      - { id: cyber-os-fundamentals,       title: Operating Systems for Security,    short_code: OS,  lesson_count: 10, subtitle: Windows and Linux essentials every analyst uses., outcome: Navigate common operating systems and explain files, processes, and permissions. }
      - { id: cyber-security-fundamentals, title: Security Fundamentals,             short_code: SEC, lesson_count: 10, subtitle: Threats, risks, and the core principles of protection., outcome: Describe the CIA triad, common threat types, and basic defenses. }
      - { id: cyber-cryptography-basics,   title: Cryptography Basics,               short_code: CRY, lesson_count: 10, subtitle: Encryption, hashing, and digital trust explained simply., outcome: Explain what encryption, hashing, and certificates do and when each is used. }
      - { id: cyber-web-app-security,      title: Web and Application Security,      short_code: WEB, lesson_count: 10, subtitle: How web apps get attacked and how they are defended., outcome: Recognize common web vulnerabilities at a concept level and the defenses against them. }
      - { id: cyber-identity-access,       title: Identity and Access Management,     short_code: IAM, lesson_count: 10, subtitle: Passwords, authentication, and controlling who can do what., outcome: Explain authentication, authorization, MFA, and least privilege. }
      - { id: cyber-monitoring-detection,  title: Monitoring and Threat Detection,   short_code: MON, lesson_count: 10, subtitle: Logs, alerts, and spotting suspicious activity., outcome: Read simple logs and explain how alerts and monitoring tools work. }
      - { id: cyber-incident-response,     title: Incident Response,                 short_code: IR,  lesson_count: 10, subtitle: What to do when something goes wrong., outcome: Describe the phases of incident response and the analyst's role in each. }

  - id: cyber-grc
    title: Security Governance and Compliance
    subtitle: Policies, risk, and privacy: the people side of security.
    estimated_duration: 4 months
    courses:
      - { id: cyber-risk-management,       title: Risk Management,                  short_code: RSK, lesson_count: 10, subtitle: Finding, rating, and handling risk., outcome: Identify assets, threats, and risks and explain common ways to treat risk. }
      - { id: cyber-security-policies,     title: Security Policies and Frameworks,  short_code: POL, lesson_count: 10, subtitle: The rules and structures organizations follow., outcome: Explain what security policies and frameworks are for and how they are used. }
      - { id: cyber-data-privacy,          title: Data Privacy Fundamentals,         short_code: PRV, lesson_count: 10, subtitle: Protecting personal information., outcome: Explain personal data, consent, and basic privacy principles. }
      - { id: cyber-security-awareness,    title: Security Awareness and Social Engineering Defense, short_code: AWR, lesson_count: 10, subtitle: Helping people avoid common tricks., outcome: Recognize phishing and other social-engineering tactics and teach basic defenses. }
      - { id: cyber-business-continuity,   title: Business Continuity and Disaster Recovery, short_code: BCP, lesson_count: 10, subtitle: Keeping organizations running after disruption., outcome: Explain backups, recovery objectives, and continuity planning. }
      - { id: cyber-audit-compliance,      title: Audits and Compliance Basics,      short_code: AUD, lesson_count: 10, subtitle: Showing that controls actually work., outcome: Explain what audits check and how evidence and controls are documented. }

supplied_links:
  videos: []
  references: []

must_cover:
  - Defensive and ethical framing throughout, including why unauthorized access is illegal and harmful.
  - A closing lesson in the last course of each track about roles in the field and how to keep learning, naming industry certifications only in general terms.
  - In the privacy course only, a name-level mention of the Data Privacy Act of 2012 (RA 10173) and the National Privacy Commission, with a note that learners should read official sources for current requirements.

must_avoid:
  - Working exploit code, malware, step-by-step instructions for attacking real systems, or ways to bypass protections.
  - Hands-on lab instructions that target systems the learner does not own.
  - Statistics, salaries, breach figures, penalties, article or section numbers, certification fees, or pass rates.
  - Code playground activities. Use quickCheck, order, and matchPairs.
```
