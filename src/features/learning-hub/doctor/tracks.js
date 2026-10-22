import medicalProfessionCourse from './med-profession-ethics-course/course';
import biologyFoundationsCourse from './med-biology-foundations-course/course';
import chemistryFoundationsCourse from './med-chemistry-foundations-course/course';
import bodySystemsCourse from './med-body-systems-course/course';
import healthCommunicationCourse from './med-health-communication-course/course';
import clinicalThinkingCourse from './med-clinical-thinking-course/course';
import publicHealthCourse from './med-public-health-course/course';
import pathToPracticeCourse from './med-path-to-practice-course/course';

export const tracks = {
  'med-path': {
    id: 'med-path',
    title: 'Pre-Medicine and Medical Path',
    subtitle: 'Explore the profession, build science foundations, and understand the road to practice.',
    estimatedDuration: '5 months',
    steps: [
      { id: '1', title: medicalProfessionCourse.title, course: medicalProfessionCourse, route: 'DoctorMedicalProfessionEthicsCourse', description: 'Explore physician roles and ethical frameworks such as consent, confidentiality, doing good, and avoiding harm.' },
      { id: '2', title: biologyFoundationsCourse.title, course: biologyFoundationsCourse, route: 'DoctorBiologyFoundationsCourse', description: 'Build a plain-language foundation in cells, biological information, and normal living processes.' },
      { id: '3', title: chemistryFoundationsCourse.title, course: chemistryFoundationsCourse, route: 'DoctorChemistryFoundationsCourse', description: 'Explore atoms, molecules, solutions, and reactions as introductory science concepts.' },
      { id: '4', title: bodySystemsCourse.title, course: bodySystemsCourse, route: 'DoctorBodySystemsCourse', description: 'Survey the major body systems and their normal functions at a broad educational level.' },
      { id: '5', title: healthCommunicationCourse.title, course: healthCommunicationCourse, route: 'DoctorHealthCommunicationCourse', description: 'Practice respectful listening, clear explanations, empathy, and professional communication.' },
      { id: '6', title: clinicalThinkingCourse.title, course: clinicalThinkingCourse, route: 'DoctorClinicalThinkingCourse', description: 'Explore evidence-aware reasoning and uncertainty through fictional, non-health examples.' },
      { id: '7', title: publicHealthCourse.title, course: publicHealthCourse, route: 'DoctorPublicHealthCourse', description: 'Understand community health and health systems in general, non-personal terms.' },
      { id: '8', title: pathToPracticeCourse.title, course: pathToPracticeCourse, route: 'DoctorPathToPracticeCourse', description: 'Review the broad pathway, general learning habits, professional roles, and continued learning.' },
    ],
  },
};
