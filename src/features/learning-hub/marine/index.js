import { tracks } from './tracks';

import seafaringCourse from './mar-seafaring-profession-course/course';
import MarineSeafaringProfessionCourse from './mar-seafaring-profession-course/MarineSeafaringProfessionCourse';
import shipBasicsCourse from './mar-ship-basics-course/course';
import MarineShipBasicsCourse from './mar-ship-basics-course/MarineShipBasicsCourse';
import navigationConceptsCourse from './mar-navigation-concepts-course/course';
import MarineNavigationConceptsCourse from './mar-navigation-concepts-course/MarineNavigationConceptsCourse';
import seamanshipCargoCourse from './mar-seamanship-cargo-course/course';
import MarineSeamanshipCargoCourse from './mar-seamanship-cargo-course/MarineSeamanshipCargoCourse';
import weatherOceanCourse from './mar-weather-ocean-course/course';
import MarineWeatherOceanCourse from './mar-weather-ocean-course/MarineWeatherOceanCourse';
import safetyEnvironmentCourse from './mar-safety-environment-course/course';
import MarineSafetyEnvironmentCourse from './mar-safety-environment-course/MarineSafetyEnvironmentCourse';
import pathToPracticeCourse from './mar-path-to-practice-course/course';
import MarinePathToPracticeCourse from './mar-path-to-practice-course/MarinePathToPracticeCourse';

export { tracks };

export const courses = [
  { course: seafaringCourse, routeName: 'MarineSeafaringProfessionCourse', component: MarineSeafaringProfessionCourse },
  { course: shipBasicsCourse, routeName: 'MarineShipBasicsCourse', component: MarineShipBasicsCourse },
  { course: navigationConceptsCourse, routeName: 'MarineNavigationConceptsCourse', component: MarineNavigationConceptsCourse },
  { course: seamanshipCargoCourse, routeName: 'MarineSeamanshipCargoCourse', component: MarineSeamanshipCargoCourse },
  { course: weatherOceanCourse, routeName: 'MarineWeatherOceanCourse', component: MarineWeatherOceanCourse },
  { course: safetyEnvironmentCourse, routeName: 'MarineSafetyEnvironmentCourse', component: MarineSafetyEnvironmentCourse },
  { course: pathToPracticeCourse, routeName: 'MarinePathToPracticeCourse', component: MarinePathToPracticeCourse },
];
