import networkingCourse from './cyber-networking-basics-course/course';
import osCourse from './cyber-os-fundamentals-course/course';
import securityFundamentalsCourse from './cyber-security-fundamentals-course/course';
import cryptographyCourse from './cyber-cryptography-basics-course/course';
import webAppSecurityCourse from './cyber-web-app-security-course/course';
import identityAccessCourse from './cyber-identity-access-course/course';
import monitoringCourse from './cyber-monitoring-detection-course/course';
import incidentResponseCourse from './cyber-incident-response-course/course';
import riskManagementCourse from './cyber-risk-management-course/course';
import policiesCourse from './cyber-security-policies-course/course';
import privacyCourse from './cyber-data-privacy-course/course';
import awarenessCourse from './cyber-security-awareness-course/course';
import continuityCourse from './cyber-business-continuity-course/course';
import auditCourse from './cyber-audit-compliance-course/course';

export const TRACKS = {
  'cyber-security-analyst': {
    title: 'Security Analyst',
    estimatedDuration: '5 months',
    steps: [
      { id: 'cyber-networking-basics', title: 'Networking Basics', course: networkingCourse, route: 'CyberNetworkingBasicsCourse', description: 'Learn how devices and services communicate, and why network boundaries should be managed by authorized owners.' },
      { id: 'cyber-os-fundamentals', title: 'Operating Systems for Security', course: osCourse, route: 'CyberOsFundamentalsCourse', description: 'Understand accounts, files, permissions, processes, updates, and endpoint safeguards at a beginner level.' },
      { id: 'cyber-security-fundamentals', title: 'Security Fundamentals', course: securityFundamentalsCourse, route: 'CyberSecurityFundamentalsCourse', description: 'Connect the CIA triad, assets, threats, risk, and layered defensive controls.' },
      { id: 'cyber-cryptography-basics', title: 'Cryptography Basics', course: cryptographyCourse, route: 'CyberCryptographyBasicsCourse', description: 'Learn the conceptual roles of encryption, hashing, signatures, certificates, and key stewardship.' },
      { id: 'cyber-web-app-security', title: 'Web and Application Security', course: webAppSecurityCourse, route: 'CyberWebAppSecurityCourse', description: 'Recognize common application risk areas conceptually and understand their defensive design goals.' },
      { id: 'cyber-identity-access', title: 'Identity and Access Management', course: identityAccessCourse, route: 'CyberIdentityAccessCourse', description: 'Understand authentication, authorization, least privilege, and accountable access review.' },
      { id: 'cyber-monitoring-detection', title: 'Monitoring and Threat Detection', course: monitoringCourse, route: 'CyberMonitoringDetectionCourse', description: 'Read fictional log examples and understand alerts, context, privacy, and escalation.' },
      { id: 'cyber-incident-response', title: 'Incident Response', course: incidentResponseCourse, route: 'CyberIncidentResponseCourse', description: 'Learn response roles, communication, recovery concepts, and approved reporting boundaries.' },
    ],
  },
  'cyber-grc': {
    title: 'Security Governance and Compliance',
    estimatedDuration: '4 months',
    steps: [
      { id: 'cyber-risk-management', title: 'Risk Management', course: riskManagementCourse, route: 'CyberRiskManagementCourse', description: 'Identify assets and risks, communicate uncertainty, and compare broad treatment choices.' },
      { id: 'cyber-security-policies', title: 'Security Policies and Frameworks', course: policiesCourse, route: 'CyberSecurityPoliciesCourse', description: 'Understand organizational rules, responsibilities, frameworks, exceptions, and review.' },
      { id: 'cyber-data-privacy', title: 'Data Privacy Fundamentals', course: privacyCourse, route: 'CyberDataPrivacyCourse', description: 'Explore privacy-minded handling of personal information and current-source awareness.' },
      { id: 'cyber-security-awareness', title: 'Security Awareness and Social Engineering Defense', course: awarenessCourse, route: 'CyberSecurityAwarenessCourse', description: 'Practice supportive, authorized ways to recognize and report suspicious requests.' },
      { id: 'cyber-business-continuity', title: 'Business Continuity and Disaster Recovery', course: continuityCourse, route: 'CyberBusinessContinuityCourse', description: 'Understand continuity planning, dependencies, recovery concepts, and tabletop exercises.' },
      { id: 'cyber-audit-compliance', title: 'Audits and Compliance Basics', course: auditCourse, route: 'CyberAuditComplianceCourse', description: 'Learn about audit scope, evidence, findings, corrective actions, and governance roles.' },
    ],
  },
};
