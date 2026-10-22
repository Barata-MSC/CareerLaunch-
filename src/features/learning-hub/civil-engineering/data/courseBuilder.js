function buildChoices(answer, distractors, correctIndex) {
  return [
    ...distractors.slice(0, correctIndex),
    answer,
    ...distractors.slice(correctIndex),
  ];
}

export function createCivilEngineeringCourse(definition) {
  const lessons = definition.lessons.map((lesson, index) => {
    const options = buildChoices(lesson.answer, lesson.distractors, index % 4);
    const firstLessonContext = index === 0
      ? `Prerequisites: ${definition.prerequisite} Learning outcomes: ${definition.outcomes.join('; ')}. `
      : '';

    return {
      id: `${definition.id.replace(/^civ-/, '')}-${index + 1}`,
      title: lesson.title,
      subtitle: definition.title,
      contentTitle: 'Key idea',
      description: `${firstLessonContext}${lesson.explanation} ${lesson.example}`,
      sections: [
        { heading: 'Learning objective', text: lesson.objective },
        { heading: 'Worked example', text: lesson.example },
      ],
      keyPoints: lesson.keyPoints,
      ...(index % 5 !== 2
        ? {
            activities: [{
              type: 'quickCheck',
              question: lesson.question,
              options,
              correct: index % 4,
              hint: 'Revisit the lesson’s conceptual example and compare the ideas.',
              explanation: lesson.answer,
            }],
          }
        : {}),
    };
  });

  const questions = definition.lessons.flatMap((lesson, lessonIndex) => [
    {
      lessonId: `${definition.id.replace(/^civ-/, '')}-${lessonIndex + 1}`,
      question: lesson.question,
      answers: buildChoices(lesson.answer, lesson.distractors, (lessonIndex * 2) % 4),
      correct: (lessonIndex * 2) % 4,
      explanation: `${lesson.answer} ${lesson.objective}`,
    },
    {
      lessonId: `${definition.id.replace(/^civ-/, '')}-${lessonIndex + 1}`,
      question: lesson.reviewQuestion,
      answers: buildChoices(lesson.reviewAnswer, lesson.reviewDistractors, (lessonIndex * 2 + 1) % 4),
      correct: (lessonIndex * 2 + 1) % 4,
      explanation: `${lesson.reviewAnswer} ${lesson.objective}`,
    },
  ]);

  return {
    id: definition.id,
    title: definition.title,
    shortCode: definition.shortCode,
    subtitle: definition.subtitle,
    outcome: definition.outcome,
    outcomes: definition.outcomes,
    prerequisite: definition.prerequisite,
    passingPercent: 70,
    quizSize: 10,
    lessons,
    questions,
  };
}