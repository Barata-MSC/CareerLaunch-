import { TRACKS as tracks, COURSES, ROUTE_NAMES } from './data/courseContent';

import hospitalityIndustryCourse from './ht-hospitality-industry-course/course';
import HospitalityIndustryCourse from './ht-hospitality-industry-course/HospitalityIndustryCourse';
import guestServiceCourse from './ht-guest-service-course/course';
import GuestServiceCourse from './ht-guest-service-course/GuestServiceCourse';
import frontOfficeCourse from './ht-front-office-course/course';
import FrontOfficeCourse from './ht-front-office-course/FrontOfficeCourse';
import foodBeverageCourse from './ht-food-beverage-course/course';
import FoodBeverageCourse from './ht-food-beverage-course/FoodBeverageCourse';
import eventsCourse from './ht-events-mice-course/course';
import EventsCourse from './ht-events-mice-course/EventsCourse';
import hospitalityBusinessCourse from './ht-hospitality-business-course/course';
import HospitalityBusinessCourse from './ht-hospitality-business-course/HospitalityBusinessCourse';
import tourismIndustryCourse from './ht-tourism-industry-course/course';
import TourismIndustryCourse from './ht-tourism-industry-course/TourismIndustryCourse';
import destinationsCourse from './ht-philippine-destinations-course/course';
import PhilippineDestinationsCourse from './ht-philippine-destinations-course/PhilippineDestinationsCourse';
import tourPlanningCourse from './ht-tour-planning-course/course';
import TourPlanningCourse from './ht-tour-planning-course/TourPlanningCourse';
import travelServicesCourse from './ht-travel-services-course/course';
import TravelServicesCourse from './ht-travel-services-course/TravelServicesCourse';
import sustainableTourismCourse from './ht-sustainable-tourism-course/course';
import SustainableTourismCourse from './ht-sustainable-tourism-course/SustainableTourismCourse';
import pathToPracticeCourse from './ht-path-to-practice-course/course';
import HospitalityTourismPathToPracticeCourse from './ht-path-to-practice-course/HospitalityTourismPathToPracticeCourse';

export { tracks };

const screensById = {
  'ht-hospitality-industry': HospitalityIndustryCourse,
  'ht-guest-service': GuestServiceCourse,
  'ht-front-office': FrontOfficeCourse,
  'ht-food-beverage': FoodBeverageCourse,
  'ht-events-mice': EventsCourse,
  'ht-hospitality-business': HospitalityBusinessCourse,
  'ht-tourism-industry': TourismIndustryCourse,
  'ht-philippine-destinations': PhilippineDestinationsCourse,
  'ht-tour-planning': TourPlanningCourse,
  'ht-travel-services': TravelServicesCourse,
  'ht-sustainable-tourism': SustainableTourismCourse,
  'ht-path-to-practice': HospitalityTourismPathToPracticeCourse,
};

const registeredCourses = [
  hospitalityIndustryCourse,
  guestServiceCourse,
  frontOfficeCourse,
  foodBeverageCourse,
  eventsCourse,
  hospitalityBusinessCourse,
  tourismIndustryCourse,
  destinationsCourse,
  tourPlanningCourse,
  travelServicesCourse,
  sustainableTourismCourse,
  pathToPracticeCourse,
];

export const courses = registeredCourses.map((course) => {
  const routeName = ROUTE_NAMES[course.id];
  const component = screensById[course.id];
  if (!routeName || !component) {
    throw new Error(`Missing Hospitality & Tourism route or screen for ${course.id}.`);
  }
  return { course, routeName, component };
});

if (COURSES.length !== courses.length) {
  throw new Error('Hospitality & Tourism course definitions and route registrations are out of sync.');
}
