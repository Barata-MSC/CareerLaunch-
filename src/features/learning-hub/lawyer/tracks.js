import LegalProfessionEthicsScreen from './law-profession-ethics-course/LawProfessionEthicsCourse';
import lawProfessionEthics from './law-profession-ethics-course/course';
import LegalSystemScreen from './law-legal-system-course/LawLegalSystemCourse';
import lawLegalSystem from './law-legal-system-course/course';
import LegalResearchScreen from './law-legal-research-course/LawLegalResearchCourse';
import lawLegalResearch from './law-legal-research-course/course';
import LegalWritingScreen from './law-legal-writing-course/LawLegalWritingCourse';
import lawLegalWriting from './law-legal-writing-course/course';
import ConstitutionalLawScreen from './law-constitutional-basics-course/LawConstitutionalBasicsCourse';
import lawConstitutionalBasics from './law-constitutional-basics-course/course';
import CivilCriminalOverviewScreen from './law-civil-criminal-overview-course/LawCivilCriminalOverviewCourse';
import lawCivilCriminalOverview from './law-civil-criminal-overview-course/course';
import ProcedureAdvocacyScreen from './law-procedure-advocacy-course/LawProcedureAdvocacyCourse';
import lawProcedureAdvocacy from './law-procedure-advocacy-course/course';
import PathToPracticeScreen from './law-path-to-practice-course/LawPathToPracticeCourse';
import lawPathToPractice from './law-path-to-practice-course/course';
import LegalOfficeOperationsScreen from './law-legal-office-ops-course/LawLegalOfficeOpsCourse';
import lawLegalOfficeOperations from './law-legal-office-ops-course/course';
import DocumentDraftingScreen from './law-document-drafting-course/LawDocumentDraftingCourse';
import lawDocumentDrafting from './law-document-drafting-course/course';
import CourtFilingScreen from './law-court-filing-course/LawCourtFilingCourse';
import lawCourtFiling from './law-court-filing-course/course';
import ResearchSupportScreen from './law-research-support-course/LawResearchSupportCourse';
import lawResearchSupport from './law-research-support-course/course';
import ClientIntakeConfidentialityScreen from './law-client-intake-confidentiality-course/LawClientIntakeConfidentialityCourse';
import lawClientIntakeConfidentiality from './law-client-intake-confidentiality-course/course';
import LegalTechRecordsScreen from './law-legal-tech-records-course/LawLegalTechRecordsCourse';
import lawLegalTechRecords from './law-legal-tech-records-course/course';

export const COURSES = [
  { id: lawProfessionEthics.id, title: lawProfessionEthics.title, routeName: 'LegalProfessionEthicsCourse', screen: LegalProfessionEthicsScreen, course: lawProfessionEthics },
  { id: lawLegalSystem.id, title: lawLegalSystem.title, routeName: 'LegalSystemCourse', screen: LegalSystemScreen, course: lawLegalSystem },
  { id: lawLegalResearch.id, title: lawLegalResearch.title, routeName: 'LegalResearchCourse', screen: LegalResearchScreen, course: lawLegalResearch },
  { id: lawLegalWriting.id, title: lawLegalWriting.title, routeName: 'LegalWritingCourse', screen: LegalWritingScreen, course: lawLegalWriting },
  { id: lawConstitutionalBasics.id, title: lawConstitutionalBasics.title, routeName: 'ConstitutionalLawCourse', screen: ConstitutionalLawScreen, course: lawConstitutionalBasics },
  { id: lawCivilCriminalOverview.id, title: lawCivilCriminalOverview.title, routeName: 'CivilCriminalOverviewCourse', screen: CivilCriminalOverviewScreen, course: lawCivilCriminalOverview },
  { id: lawProcedureAdvocacy.id, title: lawProcedureAdvocacy.title, routeName: 'ProcedureAdvocacyCourse', screen: ProcedureAdvocacyScreen, course: lawProcedureAdvocacy },
  { id: lawPathToPractice.id, title: lawPathToPractice.title, routeName: 'PathToPracticeCourse', screen: PathToPracticeScreen, course: lawPathToPractice },
  { id: lawLegalOfficeOperations.id, title: lawLegalOfficeOperations.title, routeName: 'LegalOfficeOperationsCourse', screen: LegalOfficeOperationsScreen, course: lawLegalOfficeOperations },
  { id: lawDocumentDrafting.id, title: lawDocumentDrafting.title, routeName: 'DocumentDraftingCourse', screen: DocumentDraftingScreen, course: lawDocumentDrafting },
  { id: lawCourtFiling.id, title: lawCourtFiling.title, routeName: 'CourtFilingCourse', screen: CourtFilingScreen, course: lawCourtFiling },
  { id: lawResearchSupport.id, title: lawResearchSupport.title, routeName: 'ResearchSupportCourse', screen: ResearchSupportScreen, course: lawResearchSupport },
  { id: lawClientIntakeConfidentiality.id, title: lawClientIntakeConfidentiality.title, routeName: 'ClientIntakeConfidentialityCourse', screen: ClientIntakeConfidentialityScreen, course: lawClientIntakeConfidentiality },
  { id: lawLegalTechRecords.id, title: lawLegalTechRecords.title, routeName: 'LegalTechRecordsCourse', screen: LegalTechRecordsScreen, course: lawLegalTechRecords },
];

const step = (course, route, description, id) => ({
  id: String(id),
  title: course.title,
  course,
  route,
  description,
});

export const TRACKS = {
  'Lawyer Path': {
    id: 'law-lawyer-path',
    title: 'Lawyer Path',
    subtitle: 'From pre-law skills to understanding how the legal profession works.',
    estimatedDuration: '5 months',
    steps: [
      step(lawProfessionEthics, 'LegalProfessionEthicsCourse', 'Understand the roles lawyers play and why professional ethics matter.', 1),
      step(lawLegalSystem, 'LegalSystemCourse', 'Learn how institutions and legal authority connect in general terms.', 2),
      step(lawLegalResearch, 'LegalResearchCourse', 'Build a careful method for finding and evaluating legal sources.', 3),
      step(lawLegalWriting, 'LegalWritingCourse', 'Use a structured method to reason and write clearly.', 4),
      step(lawConstitutionalBasics, 'ConstitutionalLawCourse', 'Explore core constitutional ideas at a concept level.', 5),
      step(lawCivilCriminalOverview, 'CivilCriminalOverviewCourse', 'Distinguish broad civil and criminal categories.', 6),
      step(lawProcedureAdvocacy, 'ProcedureAdvocacyCourse', 'Explore process, evidence, and responsible advocacy in general terms.', 7),
      step(lawPathToPractice, 'PathToPracticeCourse', 'Connect foundational skills to professional preparation and communication.', 8),
    ],
  },
  'Paralegal and Legal Support': {
    id: 'law-paralegal',
    title: 'Paralegal and Legal Support',
    subtitle: 'Support lawyers and legal teams behind the scenes.',
    estimatedDuration: '4 months',
    steps: [
      step(lawLegalOfficeOperations, 'LegalOfficeOperationsCourse', 'Understand how legal offices coordinate information, people, and work.', 1),
      step(lawDocumentDrafting, 'DocumentDraftingCourse', 'Learn about document structure, clarity, and careful review.', 2),
      step(lawCourtFiling, 'CourtFilingCourse', 'Explore general document handling, records, and administrative coordination.', 3),
      step(lawResearchSupport, 'ResearchSupportCourse', 'Organize research tasks and prepare accurate source summaries.', 4),
      step(lawClientIntakeConfidentiality, 'ClientIntakeConfidentialityCourse', 'Practice respectful information gathering and privacy-aware habits.', 5),
      step(lawLegalTechRecords, 'LegalTechRecordsCourse', 'Explore office tools and responsible records management.', 6),
    ],
  },
};

export const tracks = Object.values(TRACKS);
