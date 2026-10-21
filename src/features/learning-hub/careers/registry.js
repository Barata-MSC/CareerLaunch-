import { TRACKS as softwareTracks } from '../software-engineering/tracks';
import CSSCourse from '../software-engineering/css-course/CSSCourse';
import HTMLCourse from '../software-engineering/html-course/HTMLCourse';
import JavaScriptCourse from '../software-engineering/javascript-course/JavaScriptCourse';
import GitCourse from '../software-engineering/git-github-course/GitCourse';
import ReactCourse from '../software-engineering/react-course/ReactCourse';
import NodeCourse from '../software-engineering/nodejs-course/NodeCourse';
import DatabaseCourse from '../software-engineering/database-course/DatabaseCourse';
import ExcelCourse from '../software-engineering/excel-course/ExcelCourse';
import PandasCourse from '../software-engineering/panda-course/PandaCourse';
import SQLCourse from '../software-engineering/sql-course/SQLCourse';
import DataCourse from '../software-engineering/data-visualization-course/DataCourse';
import DashboardCourse from '../software-engineering/dashboard-course/DashboardCourse';
import StatisticsCourse from '../software-engineering/statistics-course/StatisticsCourse';
import DesignFundamentalsCourse from '../software-engineering/design-fundamentals-course/DesignFundamentalsCourse';
import UserResearchCourse from '../software-engineering/user-research-course/UserResearchCourse';
import WireframingCourse from '../software-engineering/wireframing-course/WireframingCourse';
import UsabilityTestingCourse from '../software-engineering/usability-testing-course/UsabilityTestingCourse';
import { tracks as teacherTracks, courses as teacherCourses } from '../teacher';

export const CAREER_CONTENT = {
  teacher: {
    tracks: teacherTracks,
    courses: teacherCourses,
  },
};

export const TRACKS = Object.values(CAREER_CONTENT).reduce(
  (tracks, careerContent) => ({ ...tracks, ...careerContent.tracks }),
  { ...softwareTracks },
);

export const CAREER_COURSES = Object.fromEntries(
  Object.entries(CAREER_CONTENT).map(([careerId, careerContent]) => [
    careerId,
    careerContent.courses.map(({ course }) => course),
  ]),
);

const softwareCourseComponents = {
  CSSCourse,
  HTMLCourse,
  JavaScriptCourse,
  GitCourse,
  ReactCourse,
  NodeCourse,
  DatabaseCourse,
  ExcelCourse,
  PandasCourse,
  SQLCourse,
  DataCourse,
  DashboardCourse,
  StatisticsCourse,
  DesignFundamentalsCourse,
  UserResearchCourse,
  WireframingCourse,
  UsabilityTestingCourse,
};

const softwareCourseRoutes = Object.entries(softwareTracks)
  .flatMap(([, track]) => track.steps)
  .filter((step) => step.course && step.route)
  .map((step) => ({
    course: step.course,
    route: step.route,
    component: softwareCourseComponents[step.route],
    ...(step.route === 'DataCourse' ||
      step.route === 'DashboardCourse' ||
      step.route === 'StatisticsCourse'
      ? { options: { headerShown: false } }
      : {}),
  }));

export const COURSE_ROUTES = [
  ...softwareCourseRoutes,
  ...Object.values(CAREER_CONTENT).flatMap(({ courses }) => courses),
];

export const ALL_COURSES = Object.values(TRACKS)
  .flatMap((track) => track.steps.map((step) => step.course))
  .filter(Boolean)
  .filter((course, index, allCourses) => allCourses.findIndex((item) => item.id === course.id) === index);

export function validateLearningContent(careers = []) {
  const issues = [];
  const trackIds = new Set();
  const courseById = new Map();
  const routeByName = new Map();
  const supportedActivities = new Set([
    'miniSheet',
    'quickCheck',
    'playground',
    'jsRunner',
    'reactRunner',
    'order',
    'pyRunner',
    'visualBuilder',
    'matchPairs',
  ]);

  COURSE_ROUTES.forEach(({ course, route, component }) => {
    if (routeByName.has(route)) issues.push(`Duplicate course route: ${route}`);
    routeByName.set(route, { course, component });
    if (!component) issues.push(`Course route has no screen component: ${route}`);
  });

  Object.entries(TRACKS).forEach(([key, track]) => {
    const trackId = track.id || key;
    if (trackIds.has(trackId)) issues.push(`Duplicate track id: ${trackId}`);
    trackIds.add(trackId);

    (track.steps || []).forEach((step) => {
      if (!step.course) return;
      if (!step.route || !routeByName.has(step.route)) {
        issues.push(`Unregistered course route in track ${trackId}: ${step.route || step.title}`);
      } else if (routeByName.get(step.route).course?.id !== step.course.id) {
        issues.push(`Course route ${step.route} does not match course ${step.course.id}`);
      }
      if (courseById.has(step.course.id)) {
        if (courseById.get(step.course.id) !== step.course) {
          issues.push(`Duplicate course id: ${step.course.id}`);
        }
      } else {
        courseById.set(step.course.id, step.course);
      }
    });
  });

  careers.forEach((career) => {
    (career.trackIds || []).forEach((trackId) => {
      if (!Object.prototype.hasOwnProperty.call(TRACKS, trackId)) {
        issues.push(`Unresolved track id for ${career.id}: ${trackId}`);
      }
    });
  });

  courseById.forEach((course) => {
    const courseLabel = course.id || course.title || 'unknown course';
    const lessons = Array.isArray(course.lessons) ? course.lessons : [];
    const questions = Array.isArray(course.questions) ? course.questions : [];
    const lessonIds = new Set();
    const questionTexts = new Set();
    const questionCountByLesson = new Map();

    if (!course.id || !course.title || !course.shortCode || !course.subtitle) {
      issues.push(`Course is missing required metadata: ${courseLabel}`);
    }
    if (!Number.isInteger(course.passingPercent) || course.passingPercent < 1 || course.passingPercent > 100) {
      issues.push(`Invalid passingPercent in ${courseLabel}`);
    }
    if (course.quizSize !== undefined && (!Number.isInteger(course.quizSize) || course.quizSize < 1)) {
      issues.push(`Invalid quizSize in ${courseLabel}`);
    }
    if (course.quizSize && questions.length < course.quizSize) {
      issues.push(`Question bank is smaller than quizSize in ${courseLabel}`);
    }

    lessons.forEach((lesson) => {
      if (!lesson || !['id', 'title', 'subtitle', 'contentTitle', 'description'].every((field) =>
        typeof lesson[field] === 'string' && lesson[field].trim(),
      )) {
        issues.push(`Lesson is missing required fields in ${courseLabel}`);
        return;
      }
      if (lessonIds.has(lesson.id)) issues.push(`Duplicate lesson id ${lesson.id} in ${courseLabel}`);
      lessonIds.add(lesson.id);

      (lesson.activities || []).forEach((activity) => {
        if (!supportedActivities.has(activity.type)) {
          issues.push(`Unsupported activity type ${activity.type} in ${courseLabel}/${lesson.id}`);
        }
      });
    });

    questions.forEach((question) => {
      const normalizedText = question.question?.trim().toLowerCase();
      if (!normalizedText) issues.push(`Question is missing text in ${courseLabel}`);
      if (!lessonIds.has(question.lessonId)) {
        issues.push(`Question references missing lesson ${question.lessonId} in ${courseLabel}`);
      }
      if (normalizedText && questionTexts.has(normalizedText)) {
        issues.push(`Duplicate question text in ${courseLabel}: ${question.question}`);
      }
      if (normalizedText) questionTexts.add(normalizedText);
      questionCountByLesson.set(
        question.lessonId,
        (questionCountByLesson.get(question.lessonId) || 0) + 1,
      );
      if (
        !Array.isArray(question.answers) ||
        question.answers.length !== 4 ||
        question.answers.some((answer) => typeof answer !== 'string' || !answer.trim()) ||
        new Set(question.answers.map((answer) => answer.trim().toLowerCase())).size !== 4
      ) {
        issues.push(`Question must have four distinct non-empty answers in ${courseLabel}`);
      }
      if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct > 3) {
        issues.push(`Invalid correct-answer index in ${courseLabel}`);
      }
      if (typeof question.explanation !== 'string' || !question.explanation.trim()) {
        issues.push(`Question is missing an explanation in ${courseLabel}`);
      }
    });

    lessonIds.forEach((lessonId) => {
      if (!questionCountByLesson.has(lessonId)) {
        issues.push(`Lesson has no quiz question: ${courseLabel}/${lessonId}`);
      }
    });
  });

  return issues;
}
