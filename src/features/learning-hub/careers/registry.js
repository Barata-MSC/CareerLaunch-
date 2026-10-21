import { TRACKS as softwareEngineeringTracks } from '../software-engineering/tracks';
import {
  tracks as cybersecurityTracks,
  courses as cybersecurityCourses,
} from '../cybersecurity';
import { tracks as lawyerTracks, courses as lawyerCourses } from '../lawyer';
import {
  tracks as nursingTracks,
  courses as nursingCourses,
  courseRoutes as nursingCourseRoutes,
} from '../nursing';
import { tracks as teacherTracks, courses as teacherCourses } from '../teacher';

import cssCourse from '../software-engineering/css-course/course';
import CSSCourseScreen from '../software-engineering/css-course/CSSCourse';
import databaseCourse from '../software-engineering/database-course/course';
import DatabaseCourseScreen from '../software-engineering/database-course/DatabaseCourse';
import dataCourse from '../software-engineering/data-visualization-course/course';
import DataCourseScreen from '../software-engineering/data-visualization-course/DataCourse';
import designFundamentalsCourse from '../software-engineering/design-fundamentals-course/course';
import DesignFundamentalsCourseScreen from '../software-engineering/design-fundamentals-course/DesignFundamentalsCourse';
import dashboardCourse from '../software-engineering/dashboard-course/course';
import DashboardCourseScreen from '../software-engineering/dashboard-course/DashboardCourse';
import excelCourse from '../software-engineering/excel-course/course';
import ExcelCourseScreen from '../software-engineering/excel-course/ExcelCourse';
import gitCourse from '../software-engineering/git-github-course/course';
import GitCourseScreen from '../software-engineering/git-github-course/GitCourse';
import htmlCourse from '../software-engineering/html-course/course';
import HTMLCourseScreen from '../software-engineering/html-course/HTMLCourse';
import javascriptCourse from '../software-engineering/javascript-course/course';
import JavaScriptCourseScreen from '../software-engineering/javascript-course/JavaScriptCourse';
import nodeCourse from '../software-engineering/nodejs-course/course';
import NodeCourseScreen from '../software-engineering/nodejs-course/NodeCourse';
import pandasCourse from '../software-engineering/panda-course/course';
import PandasCourseScreen from '../software-engineering/panda-course/PandaCourse';
import reactCourse from '../software-engineering/react-course/course';
import ReactCourseScreen from '../software-engineering/react-course/ReactCourse';
import sqlCourse from '../software-engineering/sql-course/course';
import SQLCourseScreen from '../software-engineering/sql-course/SQLCourse';
import statisticsCourse from '../software-engineering/statistics-course/course';
import StatisticsCourseScreen from '../software-engineering/statistics-course/StatisticsCourse';
import usabilityTestingCourse from '../software-engineering/usability-testing-course/course';
import UsabilityTestingCourseScreen from '../software-engineering/usability-testing-course/UsabilityTestingCourse';
import userResearchCourse from '../software-engineering/user-research-course/course';
import UserResearchCourseScreen from '../software-engineering/user-research-course/UserResearchCourse';
import wireframingCourse from '../software-engineering/wireframing-course/course';
import WireframingCourseScreen from '../software-engineering/wireframing-course/WireframingCourse';

const softwareEngineeringCourses = [
  { course: htmlCourse, routeName: 'HTMLCourse', component: HTMLCourseScreen },
  { course: cssCourse, routeName: 'CSSCourse', component: CSSCourseScreen },
  { course: javascriptCourse, routeName: 'JavaScriptCourse', component: JavaScriptCourseScreen },
  { course: reactCourse, routeName: 'ReactCourse', component: ReactCourseScreen },
  { course: nodeCourse, routeName: 'NodeCourse', component: NodeCourseScreen },
  { course: databaseCourse, routeName: 'DatabaseCourse', component: DatabaseCourseScreen },
  { course: gitCourse, routeName: 'GitCourse', component: GitCourseScreen },
  { course: excelCourse, routeName: 'ExcelCourse', component: ExcelCourseScreen },
  { course: sqlCourse, routeName: 'SQLCourse', component: SQLCourseScreen },
  { course: pandasCourse, routeName: 'PandasCourse', component: PandasCourseScreen },
  { course: dataCourse, routeName: 'DataCourse', component: DataCourseScreen },
  { course: statisticsCourse, routeName: 'StatisticsCourse', component: StatisticsCourseScreen },
  { course: dashboardCourse, routeName: 'DashboardCourse', component: DashboardCourseScreen },
  {
    course: designFundamentalsCourse,
    routeName: 'DesignFundamentalsCourse',
    component: DesignFundamentalsCourseScreen,
  },
  { course: userResearchCourse, routeName: 'UserResearchCourse', component: UserResearchCourseScreen },
  { course: wireframingCourse, routeName: 'WireframingCourse', component: WireframingCourseScreen },
  {
    course: usabilityTestingCourse,
    routeName: 'UsabilityTestingCourse',
    component: UsabilityTestingCourseScreen,
  },
];

const nursingCourseEntries = nursingCourses.map((course) => {
  const step = Object.values(nursingTracks)
    .flatMap((track) => track.steps)
    .find((trackStep) => trackStep.course.id === course.id);
  const route = nursingCourseRoutes.find(({ name }) => name === step?.route);

  return {
    course,
    routeName: step?.route,
    component: route?.component,
  };
});

export const CAREER_CONTENT = [
  {
    careerId: 'software-engineering',
    tracks: softwareEngineeringTracks,
    courses: softwareEngineeringCourses,
  },
  {
    careerId: 'cybersecurity',
    tracks: cybersecurityTracks,
    courses: cybersecurityCourses,
  },
  {
    careerId: 'lawyer',
    tracks: lawyerTracks,
    courses: lawyerCourses,
  },
  {
    careerId: 'nursing',
    tracks: nursingTracks,
    courses: nursingCourseEntries,
  },
  {
    careerId: 'teacher',
    tracks: teacherTracks,
    courses: teacherCourses,
  },
];

export const TRACKS = Object.assign({}, ...CAREER_CONTENT.map((career) => career.tracks));

export const COURSE_ENTRIES = CAREER_CONTENT.flatMap((career) =>
  career.courses.map((entry) => ({
    ...entry,
    routeName: entry.routeName || entry.route,
    careerId: career.careerId,
  })),
);

export const COURSES = COURSE_ENTRIES.map(({ course }) => course);
export const ALL_COURSES = COURSES;

export const COURSE_ROUTES = COURSE_ENTRIES.map(({ routeName, component }) => ({
  name: routeName,
  component,
  ...(routeName === 'DataCourse' ||
  routeName === 'DashboardCourse' ||
  routeName === 'StatisticsCourse'
    ? { options: { headerShown: false } }
    : {}),
}));
