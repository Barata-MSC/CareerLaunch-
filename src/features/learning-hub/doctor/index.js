import { tracks } from './tracks';

import medicalProfessionCourse from './med-profession-ethics-course/course';
import DoctorMedicalProfessionEthicsCourse from './med-profession-ethics-course/DoctorMedicalProfessionEthicsCourse';
import biologyFoundationsCourse from './med-biology-foundations-course/course';
import DoctorBiologyFoundationsCourse from './med-biology-foundations-course/DoctorBiologyFoundationsCourse';
import chemistryFoundationsCourse from './med-chemistry-foundations-course/course';
import DoctorChemistryFoundationsCourse from './med-chemistry-foundations-course/DoctorChemistryFoundationsCourse';
import bodySystemsCourse from './med-body-systems-course/course';
import DoctorBodySystemsCourse from './med-body-systems-course/DoctorBodySystemsCourse';
import healthCommunicationCourse from './med-health-communication-course/course';
import DoctorHealthCommunicationCourse from './med-health-communication-course/DoctorHealthCommunicationCourse';
import clinicalThinkingCourse from './med-clinical-thinking-course/course';
import DoctorClinicalThinkingCourse from './med-clinical-thinking-course/DoctorClinicalThinkingCourse';
import publicHealthCourse from './med-public-health-course/course';
import DoctorPublicHealthCourse from './med-public-health-course/DoctorPublicHealthCourse';
import pathToPracticeCourse from './med-path-to-practice-course/course';
import DoctorPathToPracticeCourse from './med-path-to-practice-course/DoctorPathToPracticeCourse';

export { tracks };

export const courses = [
  { course: medicalProfessionCourse, routeName: 'DoctorMedicalProfessionEthicsCourse', component: DoctorMedicalProfessionEthicsCourse },
  { course: biologyFoundationsCourse, routeName: 'DoctorBiologyFoundationsCourse', component: DoctorBiologyFoundationsCourse },
  { course: chemistryFoundationsCourse, routeName: 'DoctorChemistryFoundationsCourse', component: DoctorChemistryFoundationsCourse },
  { course: bodySystemsCourse, routeName: 'DoctorBodySystemsCourse', component: DoctorBodySystemsCourse },
  { course: healthCommunicationCourse, routeName: 'DoctorHealthCommunicationCourse', component: DoctorHealthCommunicationCourse },
  { course: clinicalThinkingCourse, routeName: 'DoctorClinicalThinkingCourse', component: DoctorClinicalThinkingCourse },
  { course: publicHealthCourse, routeName: 'DoctorPublicHealthCourse', component: DoctorPublicHealthCourse },
  { course: pathToPracticeCourse, routeName: 'DoctorPathToPracticeCourse', component: DoctorPathToPracticeCourse },
];
