import { ref } from '../shared/lessonLinks';

const cisa = (title, url) =>
  ref('Cybersecurity and Infrastructure Security Agency', title, url, 'CISA');
const nist = (title, url) =>
  ref('National Institute of Standards and Technology', title, url, 'NIST');
const owasp = (title, url) =>
  ref('OWASP Foundation', title, url, 'OWASP');
const npc = (title, url) =>
  ref('National Privacy Commission', title, url, 'NPC Philippines');

const courseReferences = {
  'cyber-networking-basics': [
    nist('Guidelines on Firewalls and Firewall Policy', 'https://csrc.nist.gov/pubs/sp/800/41/r1/final'),
    nist('Guidelines for Securing Wireless Local Area Networks (WLANs)', 'https://csrc.nist.gov/pubs/sp/800/153/final'),
    nist('Secure Domain Name System (DNS) Deployment Guide', 'https://csrc.nist.gov/pubs/sp/800/81/r1/final'),
    nist('Guidelines for the Selection, Configuration, and Use of Transport Layer Security (TLS) Implementations', 'https://csrc.nist.gov/pubs/sp/800/52/r2/final'),
    nist('Guide to IPsec VPNs', 'https://csrc.nist.gov/pubs/sp/800/77/r1/final'),
    nist('Cybersecurity Framework', 'https://www.nist.gov/cyberframework'),
  ],
  'cyber-os-fundamentals': [
    nist('Guide to General Server Security', 'https://csrc.nist.gov/pubs/sp/800/123/final'),
    nist('Security and Privacy Controls for Information Systems and Organizations', 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final'),
    nist('Digital Identity Guidelines', 'https://csrc.nist.gov/pubs/sp/800/63/4/final'),
    nist('Guide to Enterprise Patch Management Planning', 'https://csrc.nist.gov/pubs/sp/800/40/r4/final'),
    nist('Guide for Security-Focused Configuration Management of Information Systems', 'https://csrc.nist.gov/pubs/sp/800/128/upd1/final'),
  ],
  'cyber-security-fundamentals': [
    nist('Cybersecurity Framework', 'https://www.nist.gov/cyberframework'),
    nist('Guide for Conducting Risk Assessments', 'https://csrc.nist.gov/pubs/sp/800/30/r1/final'),
    nist('Security and Privacy Controls for Information Systems and Organizations', 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final'),
    cisa('Cross-Sector Cybersecurity Performance Goals', 'https://www.cisa.gov/cross-sector-cybersecurity-performance-goals'),
    cisa('Cybersecurity Awareness Month', 'https://www.cisa.gov/cybersecurity-awareness-month'),
  ],
  'cyber-cryptography-basics': [
    nist('Cryptographic Standards and Guidelines', 'https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines'),
    nist('Recommendation for Key Management: Part 1 – General', 'https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final'),
    nist('Secure Hash Standard', 'https://csrc.nist.gov/pubs/fips/180-4/upd1/final'),
    nist('Digital Signature Standard', 'https://csrc.nist.gov/pubs/fips/186-5/final'),
    nist('Guidelines for the Selection, Configuration, and Use of Transport Layer Security (TLS) Implementations', 'https://csrc.nist.gov/pubs/sp/800/52/r2/final'),
  ],
  'cyber-web-app-security': [
    owasp('OWASP Top 10:2021', 'https://top10.owasp.org/'),
    owasp('Application Security Verification Standard', 'https://asvs.owasp.org/'),
    owasp('Input Validation Cheat Sheet', 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html'),
    owasp('Authentication Cheat Sheet', 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html'),
    owasp('Access Control Cheat Sheet', 'https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html'),
  ],
  'cyber-identity-access': [
    nist('Digital Identity Guidelines', 'https://csrc.nist.gov/pubs/sp/800/63/4/final'),
    cisa('Turn on Multifactor Authentication', 'https://www.cisa.gov/secure-our-world/turn-mfa'),
    nist('Security and Privacy Controls for Information Systems and Organizations', 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final'),
    owasp('Authentication Cheat Sheet', 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html'),
    nist('Zero Trust Architecture', 'https://csrc.nist.gov/pubs/sp/800/207/final'),
  ],
  'cyber-monitoring-detection': [
    nist('Guide to Computer Security Log Management', 'https://csrc.nist.gov/pubs/sp/800/92/final'),
    cisa('Best Practices for Event Logging and Threat Detection', 'https://www.cisa.gov/resources-tools/resources/best-practices-event-logging-and-threat-detection'),
    nist('Incident Response Recommendations and Considerations for Cybersecurity Risk Management', 'https://csrc.nist.gov/pubs/sp/800/61/r3/final'),
    nist('Security and Privacy Controls for Information Systems and Organizations', 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final'),
    nist('Privacy Framework', 'https://www.nist.gov/privacy-framework'),
  ],
  'cyber-incident-response': [
    nist('Incident Response Recommendations and Considerations for Cybersecurity Risk Management', 'https://csrc.nist.gov/pubs/sp/800/61/r3/final'),
    cisa('Cyber Threats and Response', 'https://www.cisa.gov/topics/cyber-threats-and-response'),
    nist('Guide to Integrating Forensic Techniques into Incident Response', 'https://csrc.nist.gov/pubs/sp/800/86/final'),
    cisa('Federal Government Cybersecurity Incident and Vulnerability Response Playbooks', 'https://www.cisa.gov/resources-tools/resources/federal-government-cybersecurity-incident-and-vulnerability-response-playbooks'),
    nist('Cybersecurity Framework', 'https://www.nist.gov/cyberframework'),
  ],
  'cyber-risk-management': [
    nist('Guide for Conducting Risk Assessments', 'https://csrc.nist.gov/pubs/sp/800/30/r1/final'),
    nist('Risk Management Framework for Information Systems and Organizations', 'https://csrc.nist.gov/pubs/sp/800/37/r2/final'),
    nist('Cybersecurity Framework', 'https://www.nist.gov/cyberframework'),
    nist('Security and Privacy Controls for Information Systems and Organizations', 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final'),
    cisa('Cross-Sector Cybersecurity Performance Goals', 'https://www.cisa.gov/cross-sector-cybersecurity-performance-goals'),
  ],
  'cyber-security-policies': [
    nist('Cybersecurity Framework', 'https://www.nist.gov/cyberframework'),
    nist('Security and Privacy Controls for Information Systems and Organizations', 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final'),
    nist('Guide for Security-Focused Configuration Management of Information Systems', 'https://csrc.nist.gov/pubs/sp/800/128/upd1/final'),
    cisa('Cross-Sector Cybersecurity Performance Goals', 'https://www.cisa.gov/cross-sector-cybersecurity-performance-goals'),
    nist('Assessing Security and Privacy Controls in Information Systems and Organizations', 'https://csrc.nist.gov/pubs/sp/800/53/a/r5/final'),
  ],
  'cyber-data-privacy': [
    nist('Privacy Framework', 'https://www.nist.gov/privacy-framework'),
    npc('National Privacy Commission', 'https://privacy.gov.ph/'),
    nist('Security and Privacy Controls for Information Systems and Organizations', 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final'),
    nist('Cybersecurity Framework', 'https://www.nist.gov/cyberframework'),
    npc('Data Privacy Act of 2012', 'https://privacy.gov.ph/data-privacy-act/'),
  ],
  'cyber-security-awareness': [
    cisa('Cybersecurity Awareness Month', 'https://www.cisa.gov/cybersecurity-awareness-month'),
    cisa('Recognize and Report Phishing', 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing'),
    cisa('Use Strong Passwords', 'https://www.cisa.gov/secure-our-world/use-strong-passwords'),
    cisa('Turn on Multifactor Authentication', 'https://www.cisa.gov/secure-our-world/turn-mfa'),
    cisa('Update Software', 'https://www.cisa.gov/secure-our-world/update-software'),
  ],
  'cyber-business-continuity': [
    nist('Contingency Planning Guide for Federal Information Systems', 'https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final'),
    nist('Security and Privacy Controls for Information Systems and Organizations', 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final'),
    nist('Cybersecurity Framework', 'https://www.nist.gov/cyberframework'),
    cisa('Cross-Sector Cybersecurity Performance Goals', 'https://www.cisa.gov/cross-sector-cybersecurity-performance-goals'),
    nist('Guide to Computer Security Log Management', 'https://csrc.nist.gov/pubs/sp/800/92/final'),
    nist('Guide to Test, Training, and Exercise Programs for IT Plans and Capabilities', 'https://csrc.nist.gov/pubs/sp/800/84/final'),
  ],
  'cyber-audit-compliance': [
    nist('Assessing Security and Privacy Controls in Information Systems and Organizations', 'https://csrc.nist.gov/pubs/sp/800/53/a/r5/final'),
    nist('Security and Privacy Controls for Information Systems and Organizations', 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final'),
    nist('Guide for Conducting Risk Assessments', 'https://csrc.nist.gov/pubs/sp/800/30/r1/final'),
    nist('Cybersecurity Framework', 'https://www.nist.gov/cyberframework'),
    cisa('Cross-Sector Cybersecurity Performance Goals', 'https://www.cisa.gov/cross-sector-cybersecurity-performance-goals'),
  ],
};

const SOURCE_ORDER = {
  'cyber-networking-basics': [0, 1, 0, 2, 0, 3, 1, 4, 5, 5],
  'cyber-os-fundamentals': [0, 1, 2, 1, 0, 3, 0, 4, 3, 1],
  'cyber-security-fundamentals': [0, 0, 1, 1, 2, 3, 2, 4, 0, 3],
  'cyber-cryptography-basics': [0, 0, 1, 1, 2, 3, 0, 4, 1, 4],
  'cyber-web-app-security': [0, 1, 2, 3, 4, 0, 1, 0, 1, 2],
  'cyber-identity-access': [1, 0, 0, 1, 2, 2, 2, 3, 4, 0],
  'cyber-monitoring-detection': [2, 0, 1, 0, 1, 0, 2, 2, 4, 3],
  'cyber-incident-response': [0, 0, 1, 1, 0, 2, 4, 3, 4, 4],
  'cyber-risk-management': [2, 0, 0, 1, 0, 1, 2, 3, 2, 4],
  'cyber-security-policies': [0, 0, 1, 0, 1, 2, 3, 2, 4, 3],
  'cyber-data-privacy': [0, 1, 0, 0, 1, 2, 2, 1, 4, 3],
  'cyber-security-awareness': [0, 1, 1, 3, 0, 1, 0, 4, 4, 2],
  'cyber-business-continuity': [0, 1, 0, 1, 0, 1, 5, 5, 2, 3],
  'cyber-audit-compliance': [0, 1, 1, 0, 1, 0, 4, 2, 3, 3],
};

export const LESSON_LINKS = Object.fromEntries(
  Object.entries(courseReferences).flatMap(([courseId, references]) => {
    const lessonPrefix = courseId.replace(/^cyber-/, '');
    return SOURCE_ORDER[courseId].map((referenceIndex, index) => [
      `${lessonPrefix}-${index + 1}`,
      { references: [references[referenceIndex]] },
    ]);
  }),
);
