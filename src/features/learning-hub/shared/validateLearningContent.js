const SUPPORTED_ACTIVITIES = new Set([
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

const LAWYER_ACTIVITIES = new Set(['quickCheck', 'order', 'matchPairs']);

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

export default function validateLearningContent({
  careers,
  tracks,
  courses,
  courseRoutes = [],
  registeredRoutes = new Set(),
}) {
  const errors = [];
  const warnings = [];
  const trackIds = new Set();
  const courseIds = new Set();
  const routeNames = new Set();
  const coursesById = new Map();
  const tracksByKeyOrId = new Set();
  const lawyerRoutesByCourseId = new Map(courseRoutes.map((course) => [course.id, course.routeName]));
  const careerIds = new Set();

  Object.entries(tracks).forEach(([trackName, track]) => {
    const trackId = track.id || trackName;
    if (trackIds.has(trackId)) {
      errors.push(`Duplicate track id: ${trackId}`);
    }
    trackIds.add(trackId);
    tracksByKeyOrId.add(trackName);
    tracksByKeyOrId.add(trackId);

    const stepIds = new Set();
    (track.steps || []).forEach((step) => {
      if (stepIds.has(step.id)) {
        errors.push(`Duplicate step id "${step.id}" in track "${trackName}"`);
      }
      stepIds.add(step.id);

      if (!step.course) return;
      const course = step.course;
      if (!course.id) {
        errors.push(`Track step has a course without an id: ${step.title}`);
      } else if (!coursesById.has(course.id)) {
        courseIds.add(course.id);
        coursesById.set(course.id, course);
      } else if (coursesById.get(course.id) !== course) {
        errors.push(`Duplicate course id: ${course.id}`);
      }
      if (!isNonEmptyString(step.route)) {
        errors.push(`Course step "${step.title}" in "${trackName}" has no route.`);
      } else if (routeNames.has(step.route)) {
        errors.push(`Duplicate route name: ${step.route}`);
      } else {
        routeNames.add(step.route);
      }
      if (isNonEmptyString(step.route) && !registeredRoutes.has(step.route)) {
        errors.push(`Course step route is not registered: ${step.route}`);
      }
      if (course.id.startsWith('law-') && lawyerRoutesByCourseId.get(course.id) !== step.route) {
        errors.push(`Lawyer course route does not match its registered screen: ${course.id}`);
      }
    });
  });

  careers.forEach((career) => {
    if (careerIds.has(career.id)) {
      errors.push(`Duplicate career id: ${career.id}`);
    }
    careerIds.add(career.id);
    (career.trackIds || []).forEach((trackId) => {
      if (!tracksByKeyOrId.has(trackId)) {
        errors.push(`Unresolved track id for ${career.id}: ${trackId}`);
      }
    });
    if (career.status === 'available' && !(career.trackIds || []).length) {
      errors.push(`Available career has no tracks: ${career.id}`);
    }
  });

  const uniqueCourses = Array.from(coursesById.values());
  if (courses.length !== uniqueCourses.length) {
    const courseIdsInInput = new Set(courses.map((course) => course.id));
    if (courseIdsInInput.size !== courses.length) {
      errors.push('The combined course registry contains duplicate course IDs.');
    }
  }

  uniqueCourses.forEach((course) => {
    if (!courseIds.has(course.id)) {
      errors.push(`Course registry does not match track course: ${course.id}`);
    }
    if (!Number.isInteger(course.passingPercent) || course.passingPercent < 1 || course.passingPercent > 100) {
      errors.push(`Invalid passingPercent for ${course.id}`);
    }

    const lessons = Array.isArray(course.lessons) ? course.lessons : [];
    const questions = Array.isArray(course.questions) ? course.questions : [];
    if (questions.length < (course.quizSize || questions.length)) {
      errors.push(`Question bank is smaller than quizSize for ${course.id}`);
    }

    const lessonsById = new Map();
    lessons.forEach((lesson) => {
      if (!isNonEmptyString(lesson.id) || !isNonEmptyString(lesson.title)
        || !isNonEmptyString(lesson.subtitle) || !isNonEmptyString(lesson.contentTitle)
        || !isNonEmptyString(lesson.description)) {
        errors.push(`Lesson is missing required text fields in ${course.id}`);
      }
      if (lessonsById.has(lesson.id)) {
        errors.push(`Duplicate lesson id in ${course.id}: ${lesson.id}`);
      }
      lessonsById.set(lesson.id, lesson);
      if (course.id.startsWith('law-')) {
        if (!Array.isArray(lesson.keyPoints) || lesson.keyPoints.length < 3 || lesson.keyPoints.length > 5
          || lesson.keyPoints.some((point) => !isNonEmptyString(point))) {
          errors.push(`Lesson keyPoints must contain 3 to 5 non-empty items: ${course.id}/${lesson.id}`);
        }
        if (!Array.isArray(lesson.sections) || lesson.sections.length < 2
          || lesson.sections.some((section) => !isNonEmptyString(section.heading) || !isNonEmptyString(section.text))) {
          errors.push(`Lesson must include explanatory and worked-example sections: ${course.id}/${lesson.id}`);
        }
      }
      (lesson.activities || []).forEach((activity) => {
        if (!SUPPORTED_ACTIVITIES.has(activity.type)) {
          errors.push(`Unsupported activity "${activity.type}" in ${course.id}/${lesson.id}`);
        }
        if (course.id.startsWith('law-') && !LAWYER_ACTIVITIES.has(activity.type)) {
          errors.push(`Unsupported lawyer activity "${activity.type}" in ${course.id}/${lesson.id}`);
        }
      });
    });

    const questionTexts = new Set();
    const questionsPerLesson = new Map();
    const correctDistribution = [0, 0, 0, 0];
    questions.forEach((question) => {
      if (!lessonsById.has(question.lessonId)) {
        errors.push(`Question references an unknown lesson in ${course.id}: ${question.lessonId}`);
      }
      questionsPerLesson.set(question.lessonId, (questionsPerLesson.get(question.lessonId) || 0) + 1);
      if (!isNonEmptyString(question.question) || questionTexts.has(question.question.trim().toLowerCase())) {
        errors.push(`Missing or duplicate question text in ${course.id}`);
      }
      questionTexts.add((question.question || '').trim().toLowerCase());
      if (!Array.isArray(question.answers) || question.answers.length !== 4
        || question.answers.some((answer) => !isNonEmptyString(answer))
        || new Set(question.answers.map((answer) => answer.trim().toLowerCase())).size !== 4) {
        errors.push(`Question must have four distinct non-empty answers in ${course.id}`);
      }
      if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct > 3) {
        errors.push(`Invalid correct-answer index in ${course.id}`);
      } else {
        correctDistribution[question.correct] += 1;
      }
      if (!isNonEmptyString(question.explanation)) {
        errors.push(`Question has no explanation in ${course.id}`);
      }
    });
    lessonsById.forEach((lesson, lessonId) => {
      if (!questionsPerLesson.has(lessonId)) {
        errors.push(`Lesson has no quiz question: ${course.id}/${lessonId}`);
      }
    });
    const largestAnswerShare = Math.max(...correctDistribution) / Math.max(questions.length, 1);
    if (largestAnswerShare > 0.5) {
      warnings.push(`More than half of correct answers use one index in ${course.id}`);
    }

    if (course.id.startsWith('law-')) {
      if (!lessons[0]?.description.includes('educational and is not legal advice')) {
        errors.push(`First lesson must include the educational-not-legal-advice note: ${course.id}`);
      }
      if (!Array.isArray(course.outcomes) || !course.outcomes.length || !isNonEmptyString(course.prerequisites)) {
        errors.push(`Course outcome and prerequisites are required: ${course.id}`);
      }
    }
  });

  courseRoutes.forEach((route) => {
    if (!isNonEmptyString(route.routeName) || typeof route.screen !== 'function') {
      errors.push(`Invalid course route registration: ${route.id || route.routeName || '(unknown)'}`);
    }
    if (!courseIds.has(route.id)) {
      errors.push(`Registered route has no course in a track: ${route.id}`);
    }
    if (!registeredRoutes.has(route.routeName)) {
      errors.push(`Course route name is missing from the route registry: ${route.routeName}`);
    }
    const duplicates = courseRoutes.filter((candidate) => candidate.routeName === route.routeName);
    if (duplicates.length > 1) {
      errors.push(`Duplicate registered route name: ${route.routeName}`);
    }
  });

  return { errors, warnings };
}
