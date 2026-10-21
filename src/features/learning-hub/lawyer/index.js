import { COURSES as lawyerCourseEntries, TRACKS as lawyerTrackMap } from './tracks';

export const tracks = Object.fromEntries(
  Object.values(lawyerTrackMap).map((track) => [track.id, track]),
);

export const courses = lawyerCourseEntries.map(({ course, routeName, screen }) => ({
  course,
  routeName,
  component: screen,
}));

export { TRACKS, COURSES } from './tracks';
