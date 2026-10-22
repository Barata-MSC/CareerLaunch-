import { applyLessonLinks } from '../shared/lessonLinks';
import { LESSON_LINKS } from './links';

export function getLawyerLessons(lessons) {
  return applyLessonLinks(lessons, LESSON_LINKS);
}
