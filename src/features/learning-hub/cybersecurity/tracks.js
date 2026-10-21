import { coursesById as byId } from './courses';

export const tracks = {
  'cyber-security-analyst': {
    title: 'Security Analyst',
    subtitle: 'Monitor systems, spot threats, and respond to incidents.',
    estimatedDuration: '5 months',
    steps: [
      { id: '1', title: byId['cyber-networking-basics'].title, description: byId['cyber-networking-basics'].outcome, course: byId['cyber-networking-basics'], route: 'CyberNetworkingBasicsCourse' },
      { id: '2', title: byId['cyber-os-fundamentals'].title, description: byId['cyber-os-fundamentals'].outcome, course: byId['cyber-os-fundamentals'], route: 'CyberOsFundamentalsCourse' },
      { id: '3', title: byId['cyber-security-fundamentals'].title, description: byId['cyber-security-fundamentals'].outcome, course: byId['cyber-security-fundamentals'], route: 'CyberSecurityFundamentalsCourse' },
      { id: '4', title: byId['cyber-cryptography-basics'].title, description: byId['cyber-cryptography-basics'].outcome, course: byId['cyber-cryptography-basics'], route: 'CyberCryptographyBasicsCourse' },
      { id: '5', title: byId['cyber-web-app-security'].title, description: byId['cyber-web-app-security'].outcome, course: byId['cyber-web-app-security'], route: 'CyberWebAppSecurityCourse' },
      { id: '6', title: byId['cyber-identity-access'].title, description: byId['cyber-identity-access'].outcome, course: byId['cyber-identity-access'], route: 'CyberIdentityAccessCourse' },
      { id: '7', title: byId['cyber-monitoring-detection'].title, description: byId['cyber-monitoring-detection'].outcome, course: byId['cyber-monitoring-detection'], route: 'CyberMonitoringDetectionCourse' },
      { id: '8', title: byId['cyber-incident-response'].title, description: byId['cyber-incident-response'].outcome, course: byId['cyber-incident-response'], route: 'CyberIncidentResponseCourse' },
    ],
  },
  'cyber-grc': {
    title: 'Security Governance and Compliance',
    subtitle: 'Policies, risk, and privacy: the people side of security.',
    estimatedDuration: '4 months',
    steps: [
      { id: '1', title: byId['cyber-risk-management'].title, description: byId['cyber-risk-management'].outcome, course: byId['cyber-risk-management'], route: 'CyberRiskManagementCourse' },
      { id: '2', title: byId['cyber-security-policies'].title, description: byId['cyber-security-policies'].outcome, course: byId['cyber-security-policies'], route: 'CyberSecurityPoliciesCourse' },
      { id: '3', title: byId['cyber-data-privacy'].title, description: byId['cyber-data-privacy'].outcome, course: byId['cyber-data-privacy'], route: 'CyberDataPrivacyCourse' },
      { id: '4', title: byId['cyber-security-awareness'].title, description: byId['cyber-security-awareness'].outcome, course: byId['cyber-security-awareness'], route: 'CyberSecurityAwarenessCourse' },
      { id: '5', title: byId['cyber-business-continuity'].title, description: byId['cyber-business-continuity'].outcome, course: byId['cyber-business-continuity'], route: 'CyberBusinessContinuityCourse' },
      { id: '6', title: byId['cyber-audit-compliance'].title, description: byId['cyber-audit-compliance'].outcome, course: byId['cyber-audit-compliance'], route: 'CyberAuditComplianceCourse' },
    ],
  },
};