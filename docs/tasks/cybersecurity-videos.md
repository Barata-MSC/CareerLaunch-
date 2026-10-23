# Cybersecurity video pass (brief 12, videos only)

Add one video per course to the Cybersecurity lessons, using the details below. References already exist on every lesson and must be kept. A video is **not** required on every lesson: attach it only where it clearly fits.

## Rules

1. Add the videos to `src/features/learning-hub/cybersecurity/links.js` using the shared `ytVideo` helper from `shared/lessonLinks.js`. One video id per course. Follow the Software Engineering pattern: `video` on the lesson, plus a matching APA entry added to that lesson's `references`.
2. Choose lessons yourself, but only where the video (or a chapter) clearly covers the lesson's title and objective. Read each course's lesson titles first. Skip lessons that do not match. A lesson gets at most one video. Aim for about 2 to 5 lessons per course, never more than 5.
3. Videos **with chapters**: use the chapter's start time, converted to whole seconds, and the chapter label. Videos **without chapters**: use `start: 0` and the chapter label "Full video", only on lessons the whole video covers.
4. Skip any timestamp that is malformed or out of order (these are flagged below). Do not guess any timestamp, id, title, channel, or year.
5. Do not change lesson text, quizzes, activities, references already present, or any other career. Do not add other videos.
6. Do not add a video to `cyber-security-awareness`. That course is still waiting for a replacement video.
7. Defensive, conceptual segments only. Do not attach a segment to a lesson if it would present attack steps.
8. Run `npm run validate:content`, `npm run lint`, `npx expo export -p web`, and `npm run check:links -- cybersecurity`. The link check should confirm each video exists and that its title matches. If a video is not embeddable, or its title does not match, report it. Do not remove it silently.
9. Do not commit or push.

## Videos

APA author is the channel name. Reference URL format: `https://youtu.be/<id>`.

| Course id | Video id | Title | Channel | Year |
|---|---|---|---|---|
| `cyber-networking-basics` | JPYzd2gaoyk | Learn Computer Networking for Beginners - Full Course | Code Geek | 2022 |
| `cyber-os-fundamentals` | ROjZy1WbCIA | Linux Operating System - Crash Course for Beginners | freeCodeCamp.org | 2022 |
| `cyber-security-fundamentals` | iAGw4JiyZzA | Cybersecurity Fundamentals: CIA Triad explained \| Confidentiality, Integrity & Availability. | Cybersecurity with Linda | 2026 |
| `cyber-cryptography-basics` | LpqW9b_-Jx0 | Cryptography Explained for Beginners \| Encryption, Hashing & Digital Signatures Made Simple | Industry Ready Coder | 2026 |
| `cyber-web-app-security` | rRu_bsGpJsk | OWASP Top 10 Explained for Beginners (2026) | Cyber Scope | 2026 |
| `cyber-identity-access` | ddwKQh1_8rQ | Identity and Access Management, Explained | Group-IB | 2026 |
| `cyber-monitoring-detection` | 6i6l-ByBXZA | Crash Course: Linux Log Analysis \| Beginner Guide for SOC Analyst \| Security Investigation | Rajneesh Gupta | 2024 |
| `cyber-incident-response` | 4MGVTpXAAmo | Incident Response Lifecycle Explained | Cyber connect | 2025 |
| `cyber-risk-management` | AGV6fNXH3pQ | Cybersecurity Risk Management Explained \| How it Works for MSPs and IT Teams | ConnectWise | 2026 |
| `cyber-security-policies` | nbYaMKf90JA | Security Policies & Procedures Explained | Learn with Cisco | 2025 |
| `cyber-data-privacy` | rZe5tuddQH4 | Introduction to Data Privacy \| Workshop | Velma K. Waters Library | 2025 |
| `cyber-security-awareness` | (none yet) | | | |
| `cyber-business-continuity` | USCaj46GDPc | What is the Difference Between Business Continuity and Disaster Recovery? | Simplex-IT | 2022 |
| `cyber-audit-compliance` | WXZY_2MWGOM | What Is an IT Audit? IT Audit Explained \| Types, Controls & Career Path! | Audit Decoded by Mayuri | 2025 |

## Chapters (only for videos that have them)

**cyber-networking-basics (JPYzd2gaoyk).** Use only these well-formed chapters: Intro to Network Devices 0:00; Intro to Network Devices part 2 7:14; Networking Services and Applications 15:10; DHCP in the Network 26:00; Introduction to the DNS Service 35:59; Introducing Network Address Translation 44:13; WAN Technologies 51:16; Network Cabling 1:21:00; Network Topologies 1:42:00; Network Infrastructure Implementations 1:49:00; Introduction to IPv4 1:55:00; Introduction to IPv6 2:15:00; Special IP Networking Concepts 2:25:36; Introduction to Routing Concepts 2:33:39; Network Monitoring part 1 3:33:10; The Importance of Network Segmentation 4:01:12. Skip all other chapters (malformed or missing times).

**cyber-os-fundamentals (ROjZy1WbCIA).** Intro 0:00:00; Install Linux 0:08:09; Desktop Environment 0:29:43; Terminal 0:41:18; Working with Directories 0:49:25; Working with Files 1:15:49; Working with File Content 1:34:49; Linux File Structure 1:51:14; Networking 2:15:42; Linux Package Manager 2:20:10; Text Editor 2:34:10. Skip "System Information" (malformed time). The video covers Linux only, so use it only on lessons about Linux, files, and directories, not Windows.

**cyber-monitoring-detection (6i6l-ByBXZA).** What is Forensics Investigation? 2:03; Linux Forensics 5:43; Types of Evidence 8:49; Linux Log Analysis 14:14. Use only these conceptual chapters. Skip the exercise chapters.

**cyber-risk-management (AGV6fNXH3pQ).** What is cybersecurity risk management? 0:23; How does it work? 1:01; Why do risk assessments matter? 1:42. This is a short vendor video, so use only on lessons about these exact ideas.

**cyber-security-policies (nbYaMKf90JA).** Why Policies and Procedures Matter 0:46; Key Management Concepts 1:14; NIST Incident Response Phases 2:03; Stakeholders in Incident Response 2:57; Identifying Protected Data Types 4:35; Connecting the Dots: Policies in Action 6:16. This is exam-prep material. Use only the policy and governance chapters on matching lessons.

**cyber-data-privacy (rZe5tuddQH4).** Why Should You Care About Data Privacy? 1:30; Basic Data Hygiene 2:18; Privacy vs. Security 3:39; Password Management 4:51; Cookies and Ad Blocking 12:28; Phone Settings 13:33. This covers personal data habits, not consent or legal principles, so use only on lessons about personal information, privacy versus security, and everyday habits.

**cyber-audit-compliance (WXZY_2MWGOM).** What Exactly is an IT Audit? 0:00:59; What IT Auditors Aim to Achieve 0:02:50; The Key Tasks of an IT Auditor 0:03:49; Types of IT Audits 0:04:37; Skills You Need to Succeed 0:05:25; The Real Impact of IT Audit 0:07:06; A Rewarding Path 0:07:58. Use the last chapters for the roles lesson.

Videos with no chapters: `cyber-security-fundamentals`, `cyber-cryptography-basics`, `cyber-web-app-security`, `cyber-identity-access`, `cyber-incident-response`, `cyber-business-continuity`. Use `start: 0` and "Full video" only on lessons the whole video covers. The OWASP video should go only on lessons about the web risks themselves.

## Final report must include

1. A mapping table for every video added: lesson id, lesson title, chapter label, start seconds. List lessons that did not get a video as a count per course.
2. Any timestamp skipped and why. Any video that failed the link check, was not embeddable, or had a title mismatch.
3. Every file added or modified, and any hotspots touched.
4. Each validation result as passed, failed, or not run, with the reason.
5. A manual checklist: open one lesson per course that has a video, confirm the video shows at the end, plays, starts at the chapter, and the references are still there.
6. The exact, unedited output of `git status --short` and `git diff --stat`, and the branch name.
