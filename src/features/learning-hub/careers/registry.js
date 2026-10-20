import { TRACKS as softwareEngineeringTracks } from '../software-engineering/SoftwareEngineerRoadmap';
import { TRACKS as lawyerTracks, COURSES as lawyerCourses } from '../lawyer';

export const TRACKS = {
  ...softwareEngineeringTracks,
  ...lawyerTracks,
};

export const COURSE_ROUTES = lawyerCourses;

const LEGACY_COURSE_ROUTE_NAMES = [
  'HTMLCourse',
  'CSSCourse',
  'JavaScriptCourse',
  'ReactCourse',
  'NodeCourse',
  'DatabaseCourse',
  'GitCourse',
  'ExcelCourse',
  'SQLCourse',
  'PandasCourse',
  'DataCourse',
  'StatisticsCourse',
  'DashboardCourse',
  'DesignFundamentalsCourse',
  'UserResearchCourse',
  'WireframingCourse',
  'UsabilityTestingCourse',
];

export const REGISTERED_COURSE_ROUTE_NAMES = new Set([
  ...LEGACY_COURSE_ROUTE_NAMES,
  ...COURSE_ROUTES.map((course) => course.routeName),
]);

export const COURSES = Array.from(
  new Map(
    Object.values(TRACKS)
      .flatMap((track) => track.steps || [])
      .filter((step) => step.course)
      .map((step) => [step.course.id, step.course]),
  ).values(),
);

export function getTrackById(trackId) {
  return TRACKS[trackId]
    || Object.values(TRACKS).find((track) => track.id === trackId)
    || null;
}
