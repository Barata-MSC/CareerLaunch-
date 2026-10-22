import professionEthicsCourse from './civ-profession-ethics-course/course';
import mathScienceCourse from './civ-math-science-course/course';
import materialsCourse from './civ-materials-course/course';
import structuresConceptsCourse from './civ-structures-concepts-course/course';
import drawingsSurveyingCourse from './civ-drawings-surveying-course/course';
import constructionManagementCourse from './civ-construction-mgmt-course/course';
import infrastructureOverviewCourse from './civ-infra-overview-course/course';
import transportationCourse from './civ-transportation-course/course';
import waterResourcesCourse from './civ-water-resources-course/course';
import geotechnicalCourse from './civ-geotechnical-course/course';
import resilienceEnvironmentCourse from './civ-resilience-environment-course/course';
import pathToPracticeCourse from './civ-path-to-practice-course/course';

export const TRACKS = {
  'civ-structures-construction': {
    title: 'Structures and Construction',
    estimatedDuration: '4 months',
    steps: [
      {
        id: 'civ-profession-ethics',
        title: 'The Civil Engineering Profession and Ethics',
        course: professionEthicsCourse,
        route: 'CivilEngineeringProfessionEthicsCourse',
        description: 'Explore broad civil engineering fields, public safety, ethics, and the public trust.',
      },
      {
        id: 'civ-math-science',
        title: 'Math and Science Foundations',
        course: mathScienceCourse,
        route: 'CivilEngineeringMathScienceCourse',
        description: 'Explore measurement, forces, balance, diagrams, and responsible use of simplified models.',
      },
      {
        id: 'civ-materials',
        title: 'Construction Materials',
        course: materialsCourse,
        route: 'CivilEngineeringMaterialsCourse',
        description: 'Explore material categories and lifecycle questions qualitatively, without project selection advice.',
      },
      {
        id: 'civ-structures-concepts',
        title: 'How Structures Work',
        course: structuresConceptsCourse,
        route: 'CivilEngineeringStructuresConceptsCourse',
        description: 'Explore support, load paths, system relationships, and uncertainty as qualitative concepts.',
      },
      {
        id: 'civ-drawings-surveying',
        title: 'Plans, Drawings, and Surveying',
        course: drawingsSurveyingCourse,
        route: 'CivilEngineeringDrawingsSurveyingCourse',
        description: 'Explore how plans and surveys communicate spatial information and why accuracy matters.',
      },
      {
        id: 'civ-construction-mgmt',
        title: 'Construction Management and Site Safety',
        course: constructionManagementCourse,
        route: 'CivilEngineeringConstructionManagementCourse',
        description: 'Explore project coordination and safety culture at a conceptual, non-operational level.',
      },
    ],
  },
  'civ-infrastructure-environment': {
    title: 'Infrastructure and Environment',
    estimatedDuration: '4 months',
    steps: [
      {
        id: 'civ-infra-overview',
        title: 'Infrastructure and Society',
        course: infrastructureOverviewCourse,
        route: 'CivilEngineeringInfrastructureOverviewCourse',
        description: 'Explore how shared transport, water, and drainage systems connect to community life.',
      },
      {
        id: 'civ-transportation',
        title: 'Transportation Engineering Basics',
        course: transportationCourse,
        route: 'CivilEngineeringTransportationCourse',
        description: 'Explore transport networks, safety, access, congestion, and resilience as planning concepts.',
      },
      {
        id: 'civ-water-resources',
        title: 'Water Resources and Drainage',
        course: waterResourcesCourse,
        route: 'CivilEngineeringWaterResourcesCourse',
        description: 'Explore water supply, watersheds, runoff, and flooding as community-planning concepts.',
      },
      {
        id: 'civ-geotechnical',
        title: 'Soil and Foundations Basics',
        course: geotechnicalCourse,
        route: 'CivilEngineeringGeotechnicalCourse',
        description: 'Explore soil variability and ground-structure relationships conceptually, without site assessments.',
      },
      {
        id: 'civ-resilience-environment',
        title: 'Disaster Resilience and Sustainable Engineering',
        course: resilienceEnvironmentCourse,
        route: 'CivilEngineeringResilienceEnvironmentCourse',
        description: 'Explore resilience, sustainability, and Philippine hazard context in general terms.',
      },
      {
        id: 'civ-path-to-practice',
        title: 'Path to Practice and Career Paths',
        course: pathToPracticeCourse,
        route: 'CivilEngineeringPathToPracticeCourse',
        description: 'Explore broad civil engineering pathways and official sources for current requirements.',
      },
    ],
  },
};