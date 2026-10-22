import seafaringCourse from './mar-seafaring-profession-course/course';
import shipBasicsCourse from './mar-ship-basics-course/course';
import navigationConceptsCourse from './mar-navigation-concepts-course/course';
import seamanshipCargoCourse from './mar-seamanship-cargo-course/course';
import weatherOceanCourse from './mar-weather-ocean-course/course';
import safetyEnvironmentCourse from './mar-safety-environment-course/course';
import pathToPracticeCourse from './mar-path-to-practice-course/course';

export const tracks = {
  'mar-deck': {
    id: 'mar-deck',
    title: 'Deck Officer (Marine Transportation)',
    subtitle: "Explore navigation, seamanship, and life as a ship's deck officer.",
    estimatedDuration: '4 months',
    steps: [
      { id: 'mar-deck-1', title: seafaringCourse.title, course: seafaringCourse, route: 'MarineSeafaringProfessionCourse', description: 'Explore shipboard roles, shared living, teamwork, and informed career reflection.' },
      { id: 'mar-deck-2', title: shipBasicsCourse.title, course: shipBasicsCourse, route: 'MarineShipBasicsCourse', description: 'Learn broad vessel categories, spaces, and basic maritime vocabulary.' },
      { id: 'mar-deck-3', title: navigationConceptsCourse.title, course: navigationConceptsCourse, route: 'MarineNavigationConceptsCourse', description: 'Understand navigation concepts, shared context, and professional judgment.' },
      { id: 'mar-deck-4', title: seamanshipCargoCourse.title, course: seamanshipCargoCourse, route: 'MarineSeamanshipCargoCourse', description: 'Explore seamanship, vessel purpose, cargo context, and team coordination.' },
      { id: 'mar-deck-5', title: weatherOceanCourse.title, course: weatherOceanCourse, route: 'MarineWeatherOceanCourse', description: 'Study broad environmental concepts without voyage-planning advice.' },
      { id: 'mar-deck-6', title: safetyEnvironmentCourse.title, course: safetyEnvironmentCourse, route: 'MarineSafetyEnvironmentCourse', description: 'Learn why safety culture and environmental stewardship matter.' },
      { id: 'mar-deck-7', title: pathToPracticeCourse.title, course: pathToPracticeCourse, route: 'MarinePathToPracticeCourse', description: 'Explore education, teamwork, official information sources, and continued learning.' },
    ],
  },
};
