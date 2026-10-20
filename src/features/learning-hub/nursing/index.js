import NursProfessionEthicsCourse from './nurs-profession-ethics-course/NursProfessionEthicsCourse';
import NursBodyBasicsCourse from './nurs-body-basics-course/NursBodyBasicsCourse';
import NursPatientCommunicationCourse from './nurs-patient-communication-course/NursPatientCommunicationCourse';
import NursFundamentalsOfCareCourse from './nurs-fundamentals-of-care-course/NursFundamentalsOfCareCourse';
import NursInfectionPreventionCourse from './nurs-infection-prevention-course/NursInfectionPreventionCourse';
import NursHealthPromotionCourse from './nurs-health-promotion-course/NursHealthPromotionCourse';
import NursSafetyDocumentationCourse from './nurs-safety-documentation-course/NursSafetyDocumentationCourse';
import NursPathToPracticeCourse from './nurs-path-to-practice-course/NursPathToPracticeCourse';
import NursProfessionEthicsData from './nurs-profession-ethics-course/course';
import NursBodyBasicsData from './nurs-body-basics-course/course';
import NursPatientCommunicationData from './nurs-patient-communication-course/course';
import NursFundamentalsOfCareData from './nurs-fundamentals-of-care-course/course';
import NursInfectionPreventionData from './nurs-infection-prevention-course/course';
import NursHealthPromotionData from './nurs-health-promotion-course/course';
import NursSafetyDocumentationData from './nurs-safety-documentation-course/course';
import NursPathToPracticeData from './nurs-path-to-practice-course/course';

export { tracks } from './tracks';
export const courses = [NursProfessionEthicsData, NursBodyBasicsData, NursPatientCommunicationData, NursFundamentalsOfCareData, NursInfectionPreventionData, NursHealthPromotionData, NursSafetyDocumentationData, NursPathToPracticeData];
export const courseRoutes = [
  { name: 'NursProfessionEthicsCourse', component: NursProfessionEthicsCourse },
  { name: 'NursBodyBasicsCourse', component: NursBodyBasicsCourse },
  { name: 'NursPatientCommunicationCourse', component: NursPatientCommunicationCourse },
  { name: 'NursFundamentalsOfCareCourse', component: NursFundamentalsOfCareCourse },
  { name: 'NursInfectionPreventionCourse', component: NursInfectionPreventionCourse },
  { name: 'NursHealthPromotionCourse', component: NursHealthPromotionCourse },
  { name: 'NursSafetyDocumentationCourse', component: NursSafetyDocumentationCourse },
  { name: 'NursPathToPracticeCourse', component: NursPathToPracticeCourse },
];
