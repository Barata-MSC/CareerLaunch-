export function ref(organization, title, url, site) {
  return {
    text: `${organization}. (n.d.). ${title}. ${site}.`,
    url,
  };
}

export function ytVideo(id, start, chapter, title, channel) {
  return { id, start, chapter, title, channel };
}

export function applyLessonLinks(lessons, links) {
  return lessons.map((lesson) => {
    const link = links[lesson.id];
    if (!link) return { ...lesson };
    const references = Array.isArray(lesson.references) ? [...lesson.references] : [];
    const referenceUrls = new Set(references.map((reference) => reference.url));
    (link.references || []).forEach((reference) => {
      if (!referenceUrls.has(reference.url)) {
        references.push(reference);
        referenceUrls.add(reference.url);
      }
    });

    return {
      ...link,
      ...lesson,
      references,
      video: lesson.video ?? link.video,
    };
  });
}
