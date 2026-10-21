import { SOFTWARE_ENGINEERING_TRACKS } from '../software-engineering/SoftwareEngineerRoadmap';
import { tracks as nursingTracks, courses as nursingCourses, courseRoutes as nursingCourseRoutes } from '../nursing';
import { tracks as cybersecurityTracks, courses as cybersecurityCourses, courseRoutes as cybersecurityCourseRoutes } from '../cybersecurity';

export const TRACKS = {
  ...SOFTWARE_ENGINEERING_TRACKS,
  ...nursingTracks,
  ...cybersecurityTracks,
};

export const COURSE_ROUTES = [
  ...nursingCourseRoutes,
  ...cybersecurityCourseRoutes,
];

export const ALL_COURSES = [...new Map(
  Object.values(TRACKS)
    .flatMap((track) => track.steps.map((step) => step.course))
    .filter(Boolean)
    .map((course) => [course.id, course]),
).values()];

export const COURSES_BY_CAREER = {
  nursing: nursingCourses,
  cybersecurity: cybersecurityCourses,
};