import { TRACKS as tracks } from './tracks';
import professionEthicsCourse from './civ-profession-ethics-course/course';
import CivilEngineeringProfessionEthicsCourse from './civ-profession-ethics-course/CivilEngineeringProfessionEthicsCourse';
import mathScienceCourse from './civ-math-science-course/course';
import CivilEngineeringMathScienceCourse from './civ-math-science-course/CivilEngineeringMathScienceCourse';
import materialsCourse from './civ-materials-course/course';
import CivilEngineeringMaterialsCourse from './civ-materials-course/CivilEngineeringMaterialsCourse';
import structuresConceptsCourse from './civ-structures-concepts-course/course';
import CivilEngineeringStructuresConceptsCourse from './civ-structures-concepts-course/CivilEngineeringStructuresConceptsCourse';
import drawingsSurveyingCourse from './civ-drawings-surveying-course/course';
import CivilEngineeringDrawingsSurveyingCourse from './civ-drawings-surveying-course/CivilEngineeringDrawingsSurveyingCourse';
import constructionManagementCourse from './civ-construction-mgmt-course/course';
import CivilEngineeringConstructionManagementCourse from './civ-construction-mgmt-course/CivilEngineeringConstructionManagementCourse';
import infrastructureOverviewCourse from './civ-infra-overview-course/course';
import CivilEngineeringInfrastructureOverviewCourse from './civ-infra-overview-course/CivilEngineeringInfrastructureOverviewCourse';
import transportationCourse from './civ-transportation-course/course';
import CivilEngineeringTransportationCourse from './civ-transportation-course/CivilEngineeringTransportationCourse';
import waterResourcesCourse from './civ-water-resources-course/course';
import CivilEngineeringWaterResourcesCourse from './civ-water-resources-course/CivilEngineeringWaterResourcesCourse';
import geotechnicalCourse from './civ-geotechnical-course/course';
import CivilEngineeringGeotechnicalCourse from './civ-geotechnical-course/CivilEngineeringGeotechnicalCourse';
import resilienceEnvironmentCourse from './civ-resilience-environment-course/course';
import CivilEngineeringResilienceEnvironmentCourse from './civ-resilience-environment-course/CivilEngineeringResilienceEnvironmentCourse';
import pathToPracticeCourse from './civ-path-to-practice-course/course';
import CivilEngineeringPathToPracticeCourse from './civ-path-to-practice-course/CivilEngineeringPathToPracticeCourse';

export { tracks };

export const courses = [
  {
    course: professionEthicsCourse,
    routeName: 'CivilEngineeringProfessionEthicsCourse',
    component: CivilEngineeringProfessionEthicsCourse,
  },
  {
    course: mathScienceCourse,
    routeName: 'CivilEngineeringMathScienceCourse',
    component: CivilEngineeringMathScienceCourse,
  },
  {
    course: materialsCourse,
    routeName: 'CivilEngineeringMaterialsCourse',
    component: CivilEngineeringMaterialsCourse,
  },
  {
    course: structuresConceptsCourse,
    routeName: 'CivilEngineeringStructuresConceptsCourse',
    component: CivilEngineeringStructuresConceptsCourse,
  },
  {
    course: drawingsSurveyingCourse,
    routeName: 'CivilEngineeringDrawingsSurveyingCourse',
    component: CivilEngineeringDrawingsSurveyingCourse,
  },
  {
    course: constructionManagementCourse,
    routeName: 'CivilEngineeringConstructionManagementCourse',
    component: CivilEngineeringConstructionManagementCourse,
  },
  {
    course: infrastructureOverviewCourse,
    routeName: 'CivilEngineeringInfrastructureOverviewCourse',
    component: CivilEngineeringInfrastructureOverviewCourse,
  },
  {
    course: transportationCourse,
    routeName: 'CivilEngineeringTransportationCourse',
    component: CivilEngineeringTransportationCourse,
  },
  {
    course: waterResourcesCourse,
    routeName: 'CivilEngineeringWaterResourcesCourse',
    component: CivilEngineeringWaterResourcesCourse,
  },
  {
    course: geotechnicalCourse,
    routeName: 'CivilEngineeringGeotechnicalCourse',
    component: CivilEngineeringGeotechnicalCourse,
  },
  {
    course: resilienceEnvironmentCourse,
    routeName: 'CivilEngineeringResilienceEnvironmentCourse',
    component: CivilEngineeringResilienceEnvironmentCourse,
  },
  {
    course: pathToPracticeCourse,
    routeName: 'CivilEngineeringPathToPracticeCourse',
    component: CivilEngineeringPathToPracticeCourse,
  },
];