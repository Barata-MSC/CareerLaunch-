import { TRACKS as tracks } from './tracks';
import professionEthicsCourse from './acct-profession-ethics-course/course';
import AccountancyProfessionEthicsCourse from './acct-profession-ethics-course/AccountancyProfessionEthicsCourse';
import accountingBasicsCourse from './acct-basic-concepts-course/course';
import AccountancyBasicConceptsCourse from './acct-basic-concepts-course/AccountancyBasicConceptsCourse';
import recordingCourse from './acct-recording-course/course';
import AccountancyRecordingCourse from './acct-recording-course/AccountancyRecordingCourse';
import financialStatementsCourse from './acct-financial-statements-course/course';
import AccountancyFinancialStatementsCourse from './acct-financial-statements-course/AccountancyFinancialStatementsCourse';
import smallBusinessCourse from './acct-small-business-course/course';
import AccountancySmallBusinessCourse from './acct-small-business-course/AccountancySmallBusinessCourse';
import toolsTechnologyCourse from './acct-tools-technology-course/course';
import AccountancyToolsTechnologyCourse from './acct-tools-technology-course/AccountancyToolsTechnologyCourse';
import managementAccountingCourse from './acct-mgmt-accounting-course/course';
import AccountancyManagementAccountingCourse from './acct-mgmt-accounting-course/AccountancyManagementAccountingCourse';
import auditingCourse from './acct-auditing-intro-course/course';
import AccountancyAuditingIntroCourse from './acct-auditing-intro-course/AccountancyAuditingIntroCourse';
import taxationCourse from './acct-taxation-intro-course/course';
import AccountancyTaxationIntroCourse from './acct-taxation-intro-course/AccountancyTaxationIntroCourse';
import financeBasicsCourse from './acct-finance-basics-course/course';
import AccountancyFinanceBasicsCourse from './acct-finance-basics-course/AccountancyFinanceBasicsCourse';
import fraudControlsCourse from './acct-fraud-controls-course/course';
import AccountancyFraudControlsCourse from './acct-fraud-controls-course/AccountancyFraudControlsCourse';
import pathToPracticeCourse from './acct-path-to-practice-course/course';
import AccountancyPathToPracticeCourse from './acct-path-to-practice-course/AccountancyPathToPracticeCourse';

export { tracks };

export const courses = [
  {
    course: professionEthicsCourse,
    routeName: 'AccountancyProfessionEthicsCourse',
    component: AccountancyProfessionEthicsCourse,
  },
  {
    course: accountingBasicsCourse,
    routeName: 'AccountancyBasicConceptsCourse',
    component: AccountancyBasicConceptsCourse,
  },
  {
    course: recordingCourse,
    routeName: 'AccountancyRecordingCourse',
    component: AccountancyRecordingCourse,
  },
  {
    course: financialStatementsCourse,
    routeName: 'AccountancyFinancialStatementsCourse',
    component: AccountancyFinancialStatementsCourse,
  },
  {
    course: smallBusinessCourse,
    routeName: 'AccountancySmallBusinessCourse',
    component: AccountancySmallBusinessCourse,
  },
  {
    course: toolsTechnologyCourse,
    routeName: 'AccountancyToolsTechnologyCourse',
    component: AccountancyToolsTechnologyCourse,
  },
  {
    course: managementAccountingCourse,
    routeName: 'AccountancyManagementAccountingCourse',
    component: AccountancyManagementAccountingCourse,
  },
  {
    course: auditingCourse,
    routeName: 'AccountancyAuditingIntroCourse',
    component: AccountancyAuditingIntroCourse,
  },
  {
    course: taxationCourse,
    routeName: 'AccountancyTaxationIntroCourse',
    component: AccountancyTaxationIntroCourse,
  },
  {
    course: financeBasicsCourse,
    routeName: 'AccountancyFinanceBasicsCourse',
    component: AccountancyFinanceBasicsCourse,
  },
  {
    course: fraudControlsCourse,
    routeName: 'AccountancyFraudControlsCourse',
    component: AccountancyFraudControlsCourse,
  },
  {
    course: pathToPracticeCourse,
    routeName: 'AccountancyPathToPracticeCourse',
    component: AccountancyPathToPracticeCourse,
  },
];