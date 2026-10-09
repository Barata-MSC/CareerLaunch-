// Progress for one course, saved in Supabase for whoever is logged in
// (guest or full account, same user id either way).
//
//   lesson_progress: one row per completed lesson
//   quiz_attempts:   one row per submitted quiz
//
// Row-level security means every query only ever sees the current user's rows.
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@config/supabase';

const getUserId = async () => {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user?.id ?? null;
};

export default function useCourseProgress(courseId) {
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [quizPassed, setQuizPassed] = useState(false);
  const [bestPercent, setBestPercent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Lessons whose save is still running, so a double tap can't fire twice.
  const inFlight = useRef(new Set());

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const [lessonsRes, attemptsRes] = await Promise.all([
        supabase.from('lesson_progress').select('lesson_id').eq('course_id', courseId),
        supabase.from('quiz_attempts').select('percent, passed').eq('course_id', courseId),
      ]);

      if (lessonsRes.error || attemptsRes.error) throw lessonsRes.error || attemptsRes.error;

      setCompletedLessonIds(lessonsRes.data.map((row) => row.lesson_id));
      setQuizPassed(attemptsRes.data.some((row) => row.passed));
      setBestPercent(
        attemptsRes.data.length ? Math.max(...attemptsRes.data.map((row) => row.percent)) : null,
      );
      setError('');
    } catch (e) {
      setError('Could not load your progress. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    load();
  }, [load]);

  // Tick or untick "Mark as completed". The screen updates right away and the
  // change is reverted if saving fails.
  const toggleLesson = useCallback(
    async (lessonId) => {
      if (inFlight.current.has(lessonId)) return;
      inFlight.current.add(lessonId);

      const wasDone = completedLessonIds.includes(lessonId);

      setCompletedLessonIds((prev) =>
        wasDone ? prev.filter((id) => id !== lessonId) : [...prev, lessonId],
      );
      setError('');

      try {
        const userId = await getUserId();
        if (!userId) throw new Error('Not logged in');

        const { error: dbError } = wasDone
          ? await supabase
              .from('lesson_progress')
              .delete()
              .eq('user_id', userId)
              .eq('course_id', courseId)
              .eq('lesson_id', lessonId)
          : await supabase
              .from('lesson_progress')
              .upsert(
                { user_id: userId, course_id: courseId, lesson_id: lessonId },
                { onConflict: 'user_id,course_id,lesson_id', ignoreDuplicates: true },
              );

        if (dbError) throw dbError;
      } catch (e) {
        setCompletedLessonIds((prev) =>
          wasDone
            ? prev.includes(lessonId)
              ? prev
              : [...prev, lessonId]
            : prev.filter((id) => id !== lessonId),
        );
        setError('Could not save your progress. Check your connection.');
      } finally {
        inFlight.current.delete(lessonId);
      }
    },
    [completedLessonIds, courseId],
  );

  // Save one quiz attempt. Resolves to { error } so the result screen can say
  // so when the save failed.
  const recordAttempt = useCallback(
    async ({ score, total, percent, passed }) => {
      try {
        const userId = await getUserId();
        if (!userId) throw new Error('Not logged in');

        const { error: dbError } = await supabase.from('quiz_attempts').insert({
          user_id: userId,
          course_id: courseId,
          score,
          total,
          percent,
          passed,
        });

        if (dbError) throw dbError;

        setQuizPassed((prev) => prev || passed);
        setBestPercent((prev) => Math.max(prev ?? 0, percent));
        return { error: null };
      } catch (e) {
        return { error: e };
      }
    },
    [courseId],
  );

  return {
    completedLessonIds,
    quizPassed,
    bestPercent,
    loading,
    error,
    toggleLesson,
    recordAttempt,
    refresh: load,
  };
}
