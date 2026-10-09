// Lesson status is no longer written into the course data. It is derived from
// the lessons the user has completed (saved in Supabase):
//   completed   -> the lesson has a saved row
//   in-progress -> the first lesson that is not completed yet
//   not-started -> everything after that
export function withStatus(lessons, completedLessonIds) {
  const firstOpenIndex = lessons.findIndex((lesson) => !completedLessonIds.includes(lesson.id));

  return lessons.map((lesson, index) => ({
    ...lesson,
    status: completedLessonIds.includes(lesson.id)
      ? 'completed'
      : index === firstOpenIndex
      ? 'in-progress'
      : 'not-started',
  }));
}

export const getStatusLabel = (status) =>
  status === 'completed'
    ? 'Completed'
    : status === 'in-progress'
    ? 'In progress'
    : 'Not started';
