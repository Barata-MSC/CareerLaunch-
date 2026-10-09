// Progress for all configured courses at once, for screens that show many courses
// (the career roadmap). One query per table, whatever the number of courses.
// useCourseProgress.js (one course, with saving) stays as it is.
//
// This hook does not load by itself. Call `refresh` when the screen comes into
// focus so it also updates after the user returns from a course.
import { useState, useCallback } from 'react';
import { supabase } from '@config/supabase';

// The one rule for a course's status, used for every course:
//   completed   -> every lesson is completed AND the quiz was passed
//   in-progress -> at least one lesson is completed, or a quiz was attempted
//   not-started -> neither
export function getCourseStatus(course, progress) {
  if (!progress) return 'not-started';

  const { completedLessonIds, quizPassed, bestPercent } = progress;
  const allLessonsDone = course.lessons.every((lesson) => completedLessonIds.includes(lesson.id));

  if (allLessonsDone && quizPassed) return 'completed';
  if (completedLessonIds.length > 0 || bestPercent !== null) return 'in-progress';
  return 'not-started';
}

export default function useAllCoursesProgress(courses) {
  // { [courseId]: { completedLessonIds, quizPassed, bestPercent } }
  const [progressByCourseId, setProgressByCourseId] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // A string key keeps `refresh` stable even if a new array is passed each render.
  const courseKey = courses.map((course) => course.id).join(',');

  const refresh = useCallback(async () => {
    const ids = courseKey.split(',');
    setLoading(true);

    try {
      const [lessonsRes, attemptsRes] = await Promise.all([
        supabase.from('lesson_progress').select('course_id, lesson_id').in('course_id', ids),
        supabase.from('quiz_attempts').select('course_id, percent, passed').in('course_id', ids),
      ]);

      if (lessonsRes.error || attemptsRes.error) throw lessonsRes.error || attemptsRes.error;

      const next = {};
      ids.forEach((id) => {
        next[id] = { completedLessonIds: [], quizPassed: false, bestPercent: null };
      });

      lessonsRes.data.forEach((row) => {
        if (next[row.course_id]) next[row.course_id].completedLessonIds.push(row.lesson_id);
      });

      attemptsRes.data.forEach((row) => {
        const entry = next[row.course_id];
        if (!entry) return;
        entry.quizPassed = entry.quizPassed || row.passed;
        entry.bestPercent = Math.max(entry.bestPercent ?? 0, row.percent);
      });

      setProgressByCourseId(next);
      setError('');
    } catch (e) {
      // Keep whatever was loaded before; the screen just shows the last known statuses.
      setError('Could not load your progress. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, [courseKey]);

  return { progressByCourseId, loading, error, refresh };
}
