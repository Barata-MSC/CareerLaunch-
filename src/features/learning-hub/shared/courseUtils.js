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

// Quiz question bank -> the questions for one attempt.
// Without `size` (e.g. the CSS course) every question is used, exactly as before.
// With `size` it takes questions evenly across the lessons (one per lesson when
// size equals the lesson count), picked at random, and keeps them in lesson order.
export function pickQuizQuestions(questions, size) {
  if (!size || size >= questions.length) return questions;

  const groups = [];
  const byLesson = {};
  questions.forEach((q) => {
    if (!byLesson[q.lessonId]) {
      byLesson[q.lessonId] = [];
      groups.push(byLesson[q.lessonId]);
    }
    byLesson[q.lessonId].push(q);
  });

  // Fisher-Yates shuffle inside each lesson group
  groups.forEach((g) => {
    for (let i = g.length - 1; i > 0; i--) {
      const k = Math.floor(Math.random() * (i + 1));
      [g[i], g[k]] = [g[k], g[i]];
    }
  });

  const picked = [];
  for (let round = 0; picked.length < size; round++) {
    let added = false;
    for (const g of groups) {
      if (picked.length < size && g[round]) {
        picked.push(g[round]);
        added = true;
      }
    }
    if (!added) break;
  }
  return questions.filter((q) => picked.includes(q));
}
