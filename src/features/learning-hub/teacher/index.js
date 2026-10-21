import teachFoundations from './teach-foundations-course/course';
import TeachFoundationsCourse from './teach-foundations-course/TeachFoundationsCourse';
import teachChildDevelopment from './teach-child-development-course/course';
import TeachChildDevelopmentCourse from './teach-child-development-course/TeachChildDevelopmentCourse';
import teachCurriculumPlanning from './teach-curriculum-planning-course/course';
import TeachCurriculumPlanningCourse from './teach-curriculum-planning-course/TeachCurriculumPlanningCourse';
import teachClassroomManagement from './teach-classroom-management-course/course';
import TeachClassroomManagementCourse from './teach-classroom-management-course/TeachClassroomManagementCourse';
import teachLiteracyNumeracy from './teach-literacy-numeracy-course/course';
import TeachLiteracyNumeracyCourse from './teach-literacy-numeracy-course/TeachLiteracyNumeracyCourse';
import teachAssessment from './teach-assessment-course/course';
import TeachAssessmentCourse from './teach-assessment-course/TeachAssessmentCourse';
import teachInclusiveEducation from './teach-inclusive-education-course/course';
import TeachInclusiveEducationCourse from './teach-inclusive-education-course/TeachInclusiveEducationCourse';
import teachProfessionalGrowth from './teach-professional-growth-course/course';
import TeachProfessionalGrowthCourse from './teach-professional-growth-course/TeachProfessionalGrowthCourse';
import teachSecondaryAdolescentDevelopment from './teach-sec-adolescent-development-course/course';
import TeachSecondaryAdolescentDevelopmentCourse from './teach-sec-adolescent-development-course/TeachSecondaryAdolescentDevelopmentCourse';
import teachSecondaryContentPedagogy from './teach-sec-content-pedagogy-course/course';
import TeachSecondaryContentPedagogyCourse from './teach-sec-content-pedagogy-course/TeachSecondaryContentPedagogyCourse';
import teachSecondaryCurriculumDesign from './teach-sec-curriculum-design-course/course';
import TeachSecondaryCurriculumDesignCourse from './teach-sec-curriculum-design-course/TeachSecondaryCurriculumDesignCourse';
import teachSecondaryClassroomCulture from './teach-sec-classroom-culture-course/course';
import TeachSecondaryClassroomCultureCourse from './teach-sec-classroom-culture-course/TeachSecondaryClassroomCultureCourse';
import teachSecondaryAssessment from './teach-sec-assessment-course/course';
import TeachSecondaryAssessmentCourse from './teach-sec-assessment-course/TeachSecondaryAssessmentCourse';
import teachSecondaryGuidanceWellbeing from './teach-sec-guidance-wellbeing-course/course';
import TeachSecondaryGuidanceWellbeingCourse from './teach-sec-guidance-wellbeing-course/TeachSecondaryGuidanceWellbeingCourse';
import teachSecondaryCareerLicensure from './teach-sec-career-licensure-course/course';
import TeachSecondaryCareerLicensureCourse from './teach-sec-career-licensure-course/TeachSecondaryCareerLicensureCourse';

const foundationsStep = {
  id: '1',
  title: teachFoundations.title,
  course: teachFoundations,
  route: 'TeachFoundationsCourse',
  description: 'Explore a teacher’s role, ethical responsibilities, and everyday practice.',
};
const childDevelopmentStep = {
  id: '2',
  title: teachChildDevelopment.title,
  course: teachChildDevelopment,
  route: 'TeachChildDevelopmentCourse',
  description: 'Understand how young children develop and how that informs teaching.',
};
const curriculumPlanningStep = {
  id: '3',
  title: teachCurriculumPlanning.title,
  course: teachCurriculumPlanning,
  route: 'TeachCurriculumPlanningCourse',
  description: 'Turn learning goals into clear, age-appropriate lesson plans.',
};
const classroomManagementStep = {
  id: '4',
  title: teachClassroomManagement.title,
  course: teachClassroomManagement,
  route: 'TeachClassroomManagementCourse',
  description: 'Build predictable routines and a respectful elementary classroom.',
};
const literacyNumeracyStep = {
  id: '5',
  title: teachLiteracyNumeracy.title,
  course: teachLiteracyNumeracy,
  route: 'TeachLiteracyNumeracyCourse',
  description: 'Introduce foundational reading, writing, and number learning.',
};
const assessmentStep = {
  id: '6',
  title: teachAssessment.title,
  course: teachAssessment,
  route: 'TeachAssessmentCourse',
  description: 'Use assessment evidence and feedback to guide learning.',
};
const inclusiveEducationStep = {
  id: '7',
  title: teachInclusiveEducation.title,
  course: teachInclusiveEducation,
  route: 'TeachInclusiveEducationCourse',
  description: 'Plan flexible instruction that supports learner access and participation.',
};
const professionalGrowthStep = {
  id: '8',
  title: teachProfessionalGrowth.title,
  course: teachProfessionalGrowth,
  route: 'TeachProfessionalGrowthCourse',
  description: 'Explore professional learning and licensure at a general level.',
};
const secondaryAdolescentDevelopmentStep = {
  id: '1',
  title: teachSecondaryAdolescentDevelopment.title,
  course: teachSecondaryAdolescentDevelopment,
  route: 'TeachSecondaryAdolescentDevelopmentCourse',
  description: 'Understand adolescent development and how it can inform secondary teaching.',
};
const secondaryContentPedagogyStep = {
  id: '2',
  title: teachSecondaryContentPedagogy.title,
  course: teachSecondaryContentPedagogy,
  route: 'TeachSecondaryContentPedagogyCourse',
  description: 'Connect subject knowledge with clear, engaging instruction.',
};
const secondaryCurriculumDesignStep = {
  id: '3',
  title: teachSecondaryCurriculumDesign.title,
  course: teachSecondaryCurriculumDesign,
  route: 'TeachSecondaryCurriculumDesignCourse',
  description: 'Plan a short unit with connected objectives and assessment.',
};
const secondaryClassroomCultureStep = {
  id: '4',
  title: teachSecondaryClassroomCulture.title,
  course: teachSecondaryClassroomCulture,
  route: 'TeachSecondaryClassroomCultureCourse',
  description: 'Build respectful routines and shared responsibility with adolescents.',
};
const secondaryAssessmentStep = {
  id: '5',
  title: teachSecondaryAssessment.title,
  course: teachSecondaryAssessment,
  route: 'TeachSecondaryAssessmentCourse',
  description: 'Use assessment and feedback to support learning and improvement.',
};
const secondaryGuidanceWellbeingStep = {
  id: '6',
  title: teachSecondaryGuidanceWellbeing.title,
  course: teachSecondaryGuidanceWellbeing,
  route: 'TeachSecondaryGuidanceWellbeingCourse',
  description: 'Explore the teacher’s supportive role and school referral pathways.',
};
const secondaryCareerLicensureStep = {
  id: '7',
  title: teachSecondaryCareerLicensure.title,
  course: teachSecondaryCareerLicensure,
  route: 'TeachSecondaryCareerLicensureCourse',
  description: 'Explore teacher preparation, licensure, and continued professional learning.',
};

export const tracks = {
  'teacher-elementary': {
    id: 'teacher-elementary',
    title: 'Elementary Teacher',
    subtitle: 'Teach young learners in Kindergarten and Grades 1 to 6.',
    estimatedDuration: '5 months',
    steps: [
      foundationsStep,
      childDevelopmentStep,
      curriculumPlanningStep,
      classroomManagementStep,
      literacyNumeracyStep,
      assessmentStep,
      inclusiveEducationStep,
      professionalGrowthStep,
    ],
  },
  'teacher-secondary': {
    id: 'teacher-secondary',
    title: 'Secondary Teacher',
    subtitle: 'Teach adolescents in Junior and Senior High School (Grades 7 to 12).',
    estimatedDuration: '4 months',
    steps: [
      secondaryAdolescentDevelopmentStep,
      secondaryContentPedagogyStep,
      secondaryCurriculumDesignStep,
      secondaryClassroomCultureStep,
      secondaryAssessmentStep,
      secondaryGuidanceWellbeingStep,
      secondaryCareerLicensureStep,
    ],
  },
};

export const courses = [
  { course: teachFoundations, route: 'TeachFoundationsCourse', component: TeachFoundationsCourse },
  { course: teachChildDevelopment, route: 'TeachChildDevelopmentCourse', component: TeachChildDevelopmentCourse },
  { course: teachCurriculumPlanning, route: 'TeachCurriculumPlanningCourse', component: TeachCurriculumPlanningCourse },
  { course: teachClassroomManagement, route: 'TeachClassroomManagementCourse', component: TeachClassroomManagementCourse },
  { course: teachLiteracyNumeracy, route: 'TeachLiteracyNumeracyCourse', component: TeachLiteracyNumeracyCourse },
  { course: teachAssessment, route: 'TeachAssessmentCourse', component: TeachAssessmentCourse },
  { course: teachInclusiveEducation, route: 'TeachInclusiveEducationCourse', component: TeachInclusiveEducationCourse },
  { course: teachProfessionalGrowth, route: 'TeachProfessionalGrowthCourse', component: TeachProfessionalGrowthCourse },
  { course: teachSecondaryAdolescentDevelopment, route: 'TeachSecondaryAdolescentDevelopmentCourse', component: TeachSecondaryAdolescentDevelopmentCourse },
  { course: teachSecondaryContentPedagogy, route: 'TeachSecondaryContentPedagogyCourse', component: TeachSecondaryContentPedagogyCourse },
  { course: teachSecondaryCurriculumDesign, route: 'TeachSecondaryCurriculumDesignCourse', component: TeachSecondaryCurriculumDesignCourse },
  { course: teachSecondaryClassroomCulture, route: 'TeachSecondaryClassroomCultureCourse', component: TeachSecondaryClassroomCultureCourse },
  { course: teachSecondaryAssessment, route: 'TeachSecondaryAssessmentCourse', component: TeachSecondaryAssessmentCourse },
  { course: teachSecondaryGuidanceWellbeing, route: 'TeachSecondaryGuidanceWellbeingCourse', component: TeachSecondaryGuidanceWellbeingCourse },
  { course: teachSecondaryCareerLicensure, route: 'TeachSecondaryCareerLicensureCourse', component: TeachSecondaryCareerLicensureCourse },
];
