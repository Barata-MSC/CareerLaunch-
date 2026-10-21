import { TRACKS as tracks } from './tracks';

import networkingCourse from './cyber-networking-basics-course/course';
import CyberNetworkingBasicsCourse from './cyber-networking-basics-course/CyberNetworkingBasicsCourse';
import osCourse from './cyber-os-fundamentals-course/course';
import CyberOsFundamentalsCourse from './cyber-os-fundamentals-course/CyberOsFundamentalsCourse';
import securityFundamentalsCourse from './cyber-security-fundamentals-course/course';
import CyberSecurityFundamentalsCourse from './cyber-security-fundamentals-course/CyberSecurityFundamentalsCourse';
import cryptographyCourse from './cyber-cryptography-basics-course/course';
import CyberCryptographyBasicsCourse from './cyber-cryptography-basics-course/CyberCryptographyBasicsCourse';
import webAppSecurityCourse from './cyber-web-app-security-course/course';
import CyberWebAppSecurityCourse from './cyber-web-app-security-course/CyberWebAppSecurityCourse';
import identityAccessCourse from './cyber-identity-access-course/course';
import CyberIdentityAccessCourse from './cyber-identity-access-course/CyberIdentityAccessCourse';
import monitoringCourse from './cyber-monitoring-detection-course/course';
import CyberMonitoringDetectionCourse from './cyber-monitoring-detection-course/CyberMonitoringDetectionCourse';
import incidentResponseCourse from './cyber-incident-response-course/course';
import CyberIncidentResponseCourse from './cyber-incident-response-course/CyberIncidentResponseCourse';
import riskManagementCourse from './cyber-risk-management-course/course';
import CyberRiskManagementCourse from './cyber-risk-management-course/CyberRiskManagementCourse';
import policiesCourse from './cyber-security-policies-course/course';
import CyberSecurityPoliciesCourse from './cyber-security-policies-course/CyberSecurityPoliciesCourse';
import privacyCourse from './cyber-data-privacy-course/course';
import CyberDataPrivacyCourse from './cyber-data-privacy-course/CyberDataPrivacyCourse';
import awarenessCourse from './cyber-security-awareness-course/course';
import CyberSecurityAwarenessCourse from './cyber-security-awareness-course/CyberSecurityAwarenessCourse';
import continuityCourse from './cyber-business-continuity-course/course';
import CyberBusinessContinuityCourse from './cyber-business-continuity-course/CyberBusinessContinuityCourse';
import auditCourse from './cyber-audit-compliance-course/course';
import CyberAuditComplianceCourse from './cyber-audit-compliance-course/CyberAuditComplianceCourse';

export { tracks };

export const courses = [
  { course: networkingCourse, routeName: 'CyberNetworkingBasicsCourse', component: CyberNetworkingBasicsCourse },
  { course: osCourse, routeName: 'CyberOsFundamentalsCourse', component: CyberOsFundamentalsCourse },
  { course: securityFundamentalsCourse, routeName: 'CyberSecurityFundamentalsCourse', component: CyberSecurityFundamentalsCourse },
  { course: cryptographyCourse, routeName: 'CyberCryptographyBasicsCourse', component: CyberCryptographyBasicsCourse },
  { course: webAppSecurityCourse, routeName: 'CyberWebAppSecurityCourse', component: CyberWebAppSecurityCourse },
  { course: identityAccessCourse, routeName: 'CyberIdentityAccessCourse', component: CyberIdentityAccessCourse },
  { course: monitoringCourse, routeName: 'CyberMonitoringDetectionCourse', component: CyberMonitoringDetectionCourse },
  { course: incidentResponseCourse, routeName: 'CyberIncidentResponseCourse', component: CyberIncidentResponseCourse },
  { course: riskManagementCourse, routeName: 'CyberRiskManagementCourse', component: CyberRiskManagementCourse },
  { course: policiesCourse, routeName: 'CyberSecurityPoliciesCourse', component: CyberSecurityPoliciesCourse },
  { course: privacyCourse, routeName: 'CyberDataPrivacyCourse', component: CyberDataPrivacyCourse },
  { course: awarenessCourse, routeName: 'CyberSecurityAwarenessCourse', component: CyberSecurityAwarenessCourse },
  { course: continuityCourse, routeName: 'CyberBusinessContinuityCourse', component: CyberBusinessContinuityCourse },
  { course: auditCourse, routeName: 'CyberAuditComplianceCourse', component: CyberAuditComplianceCourse },
];
