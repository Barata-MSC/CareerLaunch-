import professionEthicsCourse from './acct-profession-ethics-course/course';
import accountingBasicsCourse from './acct-basic-concepts-course/course';
import recordingCourse from './acct-recording-course/course';
import financialStatementsCourse from './acct-financial-statements-course/course';
import smallBusinessCourse from './acct-small-business-course/course';
import toolsTechnologyCourse from './acct-tools-technology-course/course';
import managementAccountingCourse from './acct-mgmt-accounting-course/course';
import auditingCourse from './acct-auditing-intro-course/course';
import taxationCourse from './acct-taxation-intro-course/course';
import financeBasicsCourse from './acct-finance-basics-course/course';
import fraudControlsCourse from './acct-fraud-controls-course/course';
import pathToPracticeCourse from './acct-path-to-practice-course/course';

export const TRACKS = {
  'acct-foundations': {
    title: 'Accounting Foundations',
    estimatedDuration: '4 months',
    steps: [
      {
        id: 'acct-profession-ethics',
        title: 'The Accountancy Profession and Ethics',
        course: professionEthicsCourse,
        route: 'AccountancyProfessionEthicsCourse',
        description: 'Explore broad accountancy roles and the ethical habits that support trustworthy financial information.',
      },
      {
        id: 'acct-basic-concepts',
        title: 'Accounting Basics and the Accounting Equation',
        course: accountingBasicsCourse,
        route: 'AccountancyBasicConceptsCourse',
        description: 'Build a conceptual foundation in assets, liabilities, equity, and the accounting equation.',
      },
      {
        id: 'acct-recording',
        title: 'Recording Transactions',
        course: recordingCourse,
        route: 'AccountancyRecordingCourse',
        description: 'Explore concept-level journal entries and ledgers with invented learning examples.',
      },
      {
        id: 'acct-financial-statements',
        title: 'Understanding Financial Statements',
        course: financialStatementsCourse,
        route: 'AccountancyFinancialStatementsCourse',
        description: 'Interpret connected financial summaries and their limits using invented examples.',
      },
      {
        id: 'acct-small-business',
        title: 'Bookkeeping for Small Businesses',
        course: smallBusinessCourse,
        route: 'AccountancySmallBusinessCourse',
        description: 'Explore organized source records, supporting information, and responsible record review.',
      },
      {
        id: 'acct-tools-technology',
        title: 'Accounting Tools and Technology',
        course: toolsTechnologyCourse,
        route: 'AccountancyToolsTechnologyCourse',
        description: 'Understand spreadsheets and accounting software as tools that still need human judgment.',
      },
    ],
  },
  'acct-practice': {
    title: 'Accounting in Practice',
    estimatedDuration: '4 months',
    steps: [
      {
        id: 'acct-mgmt-accounting',
        title: 'Management Accounting and Budgeting',
        course: managementAccountingCourse,
        route: 'AccountancyManagementAccountingCourse',
        description: 'Explore internal decision support, budgets, cost context, and communicating uncertainty.',
      },
      {
        id: 'acct-auditing-intro',
        title: 'Introduction to Auditing and Assurance',
        course: auditingCourse,
        route: 'AccountancyAuditingIntroCourse',
        description: 'Learn the conceptual purpose of assurance, independence, evidence, and careful communication.',
      },
      {
        id: 'acct-taxation-intro',
        title: 'Introduction to Taxation',
        course: taxationCourse,
        route: 'AccountancyTaxationIntroCourse',
        description: 'Explore why taxation exists and the broad role of organized information and official sources.',
      },
      {
        id: 'acct-finance-basics',
        title: 'Business and Finance Basics',
        course: financeBasicsCourse,
        route: 'AccountancyFinanceBasicsCourse',
        description: 'Explore cash timing and broad business-finance concepts without personal advice.',
      },
      {
        id: 'acct-fraud-controls',
        title: 'Internal Controls and Fraud Awareness',
        course: fraudControlsCourse,
        route: 'AccountancyFraudControlsCourse',
        description: 'Explore control concepts, review roles, and responsible escalation without accusation or investigation guidance.',
      },
      {
        id: 'acct-path-to-practice',
        title: 'Path to Practice and Career Paths',
        course: pathToPracticeCourse,
        route: 'AccountancyPathToPracticeCourse',
        description: 'Explore broad career directions and where to verify current pathway information.',
      },
    ],
  },
};