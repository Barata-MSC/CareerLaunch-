// Tiny in-memory store for course progress. No database involved:
// everything here resets when the app reloads, and it survives
// navigating away from the course and coming back.
import { useSyncExternalStore } from 'react';

let state = {
  completedLessonIds: [],
  quizPassed: false,
  bestPercent: null,
};

const listeners = new Set();

function update(partial) {
  state = { ...state, ...partial };
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getCourseProgress() {
  return state;
}

// Components call this hook and re-render whenever progress changes.
export function useCourseProgress() {
  return useSyncExternalStore(subscribe, getCourseProgress);
}

export function toggleLessonComplete(lessonId) {
  const done = state.completedLessonIds.includes(lessonId);
  update({
    completedLessonIds: done
      ? state.completedLessonIds.filter((id) => id !== lessonId)
      : [...state.completedLessonIds, lessonId],
  });
}

export function recordQuizResult({ percent, passed }) {
  update({
    quizPassed: state.quizPassed || passed,
    bestPercent: Math.max(state.bestPercent ?? 0, percent),
  });
}