import NursProfessionEthicsData from './nurs-profession-ethics-course/course';
import NursBodyBasicsData from './nurs-body-basics-course/course';
import NursPatientCommunicationData from './nurs-patient-communication-course/course';
import NursFundamentalsOfCareData from './nurs-fundamentals-of-care-course/course';
import NursInfectionPreventionData from './nurs-infection-prevention-course/course';
import NursHealthPromotionData from './nurs-health-promotion-course/course';
import NursSafetyDocumentationData from './nurs-safety-documentation-course/course';
import NursPathToPracticeData from './nurs-path-to-practice-course/course';

export const tracks = {
  'nurs-student-path': {
    title: 'Nursing Student Path',
    subtitle: 'Understand the profession, the foundations, and how nurses care for people.',
    estimatedDuration: '5 months',
    steps: [
      { id: '1', title: 'The Nursing Profession and Ethics', course: NursProfessionEthicsData, route: 'NursProfessionEthicsCourse', description: 'Describe the roles of a nurse and why ethics, dignity, and confidentiality matter.' },
      { id: '2', title: 'Human Body Basics', course: NursBodyBasicsData, route: 'NursBodyBasicsCourse', description: 'Name the major body systems and describe in general terms what each one does.' },
      { id: '3', title: 'Communication with Patients and Families', course: NursPatientCommunicationData, route: 'NursPatientCommunicationCourse', description: 'Describe good communication habits with patients, families, and the care team.' },
      { id: '4', title: 'Fundamentals of Nursing Care', course: NursFundamentalsOfCareData, route: 'NursFundamentalsOfCareCourse', description: 'Explain the nursing process as a framework and the principles of comfort, safety, and dignity.' },
      { id: '5', title: 'Infection Prevention Basics', course: NursInfectionPreventionData, route: 'NursInfectionPreventionCourse', description: 'Explain in general terms how infections spread and why prevention practices exist.' },
      { id: '6', title: 'Health Promotion and Community Health', course: NursHealthPromotionData, route: 'NursHealthPromotionCourse', description: 'Describe prevention, health education, and the role of nurses in communities.' },
      { id: '7', title: 'Patient Safety, Documentation, and Teamwork', course: NursSafetyDocumentationData, route: 'NursSafetyDocumentationCourse', description: 'Explain why accurate records, handoffs, and teamwork protect patients.' },
      { id: '8', title: 'Path to Practice and Caring for Yourself', course: NursPathToPracticeData, route: 'NursPathToPracticeCourse', description: 'Describe the general path to becoming a licensed nurse and healthy habits for a demanding career.' },
    ],
  },
};
