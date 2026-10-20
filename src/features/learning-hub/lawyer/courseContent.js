import { COURSE_CATALOG, COURSE_DETAILS } from './courseCatalog';

const COURSE_IDS = Object.keys(COURSE_CATALOG);
const ACTIVITY_TYPES = ['quickCheck', 'matchPairs', 'order'];

function getCourseTopics(courseId) {
  const topics = COURSE_CATALOG[courseId];
  if (!topics) {
    throw new Error(`Missing lawyer course content: ${courseId}`);
  }
  return topics;
}

export function createCourseQuestions(courseId) {
  const topics = getCourseTopics(courseId);
  const courseIndex = COURSE_IDS.indexOf(courseId);

  return topics.map(([title, , concept, example], lessonIndex) => {
    const distractors = [1, 2, 3].map((offset) => {
      const otherTopic = topics[(lessonIndex + offset) % topics.length];
      return { title: otherTopic[0], concept: otherTopic[2] };
    });
    const answers = distractors.map((distractor) => distractor.concept);
    const correct = (courseIndex + lessonIndex) % (answers.length + 1);
    answers.splice(correct, 0, concept);
    const likelyWrongTopic = distractors[0];

    return {
      lessonId: `${courseId}-${lessonIndex + 1}`,
      question: `Which statement best explains ${title.toLowerCase()}?`,
      answers,
      correct,
      explanation: `The correct idea is that ${concept} The lesson example illustrates this: ${example} A choice about ${likelyWrongTopic.title.toLowerCase()} instead describes ${likelyWrongTopic.concept.toLowerCase()} and does not answer this question.`,
    };
  });
}

export function createCourseLessons(courseId) {
  const topics = getCourseTopics(courseId);
  const questions = createCourseQuestions(courseId);
  const details = COURSE_DETAILS[courseId];

  return topics.map(([title, objective, concept, example], lessonIndex) => {
    const question = questions[lessonIndex];
    const lesson = {
      id: question.lessonId,
      title,
      subtitle: `Objective: ${objective}`,
      contentTitle: title,
      description: lessonIndex === 0
        ? `This course is educational and is not legal advice. ${concept}`
        : concept,
      sections: [
        {
          heading: 'Learning objective',
          text: `${objective} ${concept}`,
        },
        {
          heading: 'Worked example',
          text: example,
        },
      ],
      keyPoints: [
        objective,
        `Example: ${example}`,
        `Takeaway: ${concept}`,
      ],
    };

    if (lessonIndex % 3 === 0) {
      lesson.activities = [
        {
          type: ACTIVITY_TYPES[0],
          question: question.question,
          options: question.answers,
          correct: question.correct,
          hint: 'Compare the choices with the lesson objective and the worked example.',
          explanation: question.explanation,
        },
      ];
    } else if (lessonIndex % 3 === 1) {
      const pairIndexes = [lessonIndex, (lessonIndex + 2) % topics.length, (lessonIndex + 5) % topics.length];
      lesson.activities = [
        {
          type: ACTIVITY_TYPES[1],
          title: 'Match the topic to its focus',
          task: 'Match each course topic with the idea it introduces.',
          pairs: pairIndexes.map((index) => ({
            left: topics[index][0],
            right: topics[index][2],
          })),
          hint: 'Look for the description that names the purpose of each topic.',
          explanation: 'Matching topics to their focus helps keep related ideas distinct.',
        },
      ];
    } else {
      lesson.activities = [
        {
          type: ACTIVITY_TYPES[2],
          title: 'Put the learning steps in order',
          task: 'Use a careful learning sequence to explain the idea.',
          items: [
            'State the learning question',
            'Identify the relevant concept',
            'Compare it with the worked example',
            'Summarize what the information supports',
          ],
          hint: 'Start with the question, then connect the idea to the example before summarizing.',
          explanation: 'A clear sequence helps keep reasoning connected to the question and the available information.',
        },
      ];
    }

    if (lessonIndex === 0) {
      lesson.sections.unshift({
        heading: 'Course outcome and prerequisites',
        text: `${details.outcome} Prerequisites: ${details.prerequisites}`,
      });
    }

    return lesson;
  });
}
