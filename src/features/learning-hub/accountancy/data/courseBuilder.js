export function createAccountancyCourse(definition) {
  const lessons = definition.lessons.map((lesson, index) => {
    const correct = index % 4;
    const answers = [
      ...lesson.distractors.slice(0, correct),
      lesson.answer,
      ...lesson.distractors.slice(correct),
    ];
    return {
      id: `${definition.id.replace(/^acct-/, '')}-${index + 1}`,
      title: lesson.title,
      subtitle: definition.title,
      contentTitle: 'Key idea',
      description: `${index === 0 ? `Prerequisite: ${definition.prerequisite} ` : ''}${lesson.explanation} ${lesson.example}`,
      sections: [
        { heading: 'Learning objective', text: lesson.objective },
        { heading: 'Worked example', text: lesson.example },
      ],
      keyPoints: lesson.keyPoints,
      ...(index % 4 !== 1
        ? {
            activities: [{
              type: 'quickCheck',
              question: lesson.question,
              options: answers,
              correct,
              hint: 'Revisit the lesson’s example and compare the categories involved.',
              explanation: lesson.answer,
            }],
          }
        : {}),
    };
  });

  const questions = definition.lessons.map((lesson, index) => ({
    lessonId: `${definition.id.replace(/^acct-/, '')}-${index + 1}`,
    question: lesson.question,
    answers: [
      ...lesson.distractors.slice(0, index % 4),
      lesson.answer,
      ...lesson.distractors.slice(index % 4),
    ],
    correct: index % 4,
    explanation: lesson.explanation,
  }));

  return {
    id: definition.id,
    title: definition.title,
    shortCode: definition.shortCode,
    subtitle: definition.subtitle,
    outcome: definition.outcome,
    prerequisite: definition.prerequisite,
    passingPercent: 70,
    quizSize: 10,
    lessons,
    questions,
  };
}