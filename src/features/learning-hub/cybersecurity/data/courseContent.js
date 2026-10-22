import { GOVERNANCE_COURSES } from './governance';
import { SECURITY_ANALYST_COURSES } from './securityAnalyst';
import { applyLessonLinks } from '../../shared/lessonLinks';
import { LESSON_LINKS } from '../links';

const COURSE_DEFINITIONS = [...SECURITY_ANALYST_COURSES, ...GOVERNANCE_COURSES];

const WRONG_ANSWERS = [
  'Assume that any unusual event proves that a person acted improperly.',
  'Make changes outside the assigned role before asking the system owner.',
  'Collect unrelated information because more data always improves a review.',
  'Treat a written rule as a substitute for clear ownership and communication.',
];

const COURSE_PREREQUISITES = {
  'cyber-networking-basics': 'No prior cybersecurity knowledge is required; everyday computer use is enough.',
  'cyber-os-fundamentals': 'Review the network and device concepts from Networking Basics.',
  'cyber-security-fundamentals': 'Review the device, account, and network concepts from the first two courses.',
  'cyber-cryptography-basics': 'Security Fundamentals is recommended before studying cryptography concepts.',
  'cyber-web-app-security': 'Review Networking Basics, Security Fundamentals, and Cryptography Basics.',
  'cyber-identity-access': 'Review the security principles and application concepts from earlier courses.',
  'cyber-monitoring-detection': 'Review operating-system, network, and identity concepts from earlier courses.',
  'cyber-incident-response': 'Review the earlier Security Analyst courses before studying response roles.',
  'cyber-risk-management': 'Security Fundamentals is recommended; no prior governance experience is required.',
  'cyber-security-policies': 'Review the basic asset and risk concepts from Risk Management.',
  'cyber-data-privacy': 'Review Risk Management and Security Policies and Frameworks.',
  'cyber-security-awareness': 'Review Security Policies and Frameworks and Data Privacy Fundamentals.',
  'cyber-business-continuity': 'Review Risk Management and Security Policies and Frameworks.',
  'cyber-audit-compliance': 'Review the earlier governance, risk, privacy, and continuity concepts.',
};

export function getCyberCourseDefinition(courseId) {
  return COURSE_DEFINITIONS.find((course) => course.id === courseId) || null;
}

export function buildCyberLessons(courseId) {
  const definition = getCyberCourseDefinition(courseId);
  if (!definition) throw new Error(`Unknown cybersecurity course: ${courseId}`);

  const lessons = definition.lessons.map(([title, objective, example], index) => ({
    id: `${courseId.replace(/^cyber-/, '')}-${index + 1}`,
    title,
    subtitle: 'Beginner concept and safe practice',
    contentTitle: 'Key idea',
    description: `${index === 0 ? `Prerequisite: ${COURSE_PREREQUISITES[courseId]} ` : ''}${objective} For example, ${example} This course is defensive and educational. Work only within explicit authorization; unauthorized access is illegal and can harm people and organizations. Do not investigate live systems or other people’s accounts as part of this lesson.`,
    sections: [
      { heading: 'Learning objective', text: objective },
      { heading: 'Worked example', text: example },
      {
        heading: 'Ethical boundary',
        text: 'Cybersecurity learning must remain within explicit authorization and an approved scope. Unauthorized access is illegal and can harm people, systems, and organizations. Use fictional examples and the owner-approved reporting path.',
      },
    ],
    keyPoints: [
      objective,
      `Example: ${example}`,
      'Use only approved information, tools, and work areas.',
      'Unauthorized access is illegal and can cause real harm.',
    ],
    activities: index % 4 !== 1
      ? [
          {
            type: 'quickCheck',
            question: `In “${title},” what is the safest beginner approach?`,
            options: buildAnswerChoices(objective, index),
            correct: index % 4,
            hint: 'Choose the option that follows the lesson objective and stays within authorization.',
            explanation: `${objective} Practice only with the provided fictional example or an explicitly authorized environment.`,
          },
        ]
      : undefined,
  }));

  return applyLessonLinks(lessons, LESSON_LINKS).map((lesson) => ({
    ...lesson,
    referencesHeading: lesson.referencesHeading || 'Further reading',
  }));
}

export function buildCyberQuestions(courseId) {
  const definition = getCyberCourseDefinition(courseId);
  if (!definition) throw new Error(`Unknown cybersecurity course: ${courseId}`);

  return definition.lessons.map(([title, objective], index) => ({
    lessonId: `${courseId.replace(/^cyber-/, '')}-${index + 1}`,
    question: `In ${definition.title}, what should a beginner learn from “${title}”?`,
    answers: buildAnswerChoices(objective, index),
    correct: index % 4,
    explanation: `${objective} This is a conceptual learning objective, not authorization to inspect or change a real system.`,
  }));
}

export function createCyberCourse(courseId) {
  const definition = getCyberCourseDefinition(courseId);
  if (!definition) throw new Error(`Unknown cybersecurity course: ${courseId}`);

  return {
    id: definition.id,
    title: definition.title,
    shortCode: definition.shortCode,
    subtitle: definition.subtitle,
    passingPercent: 70,
    quizSize: 10,
    lessons: buildCyberLessons(courseId),
    questions: buildCyberQuestions(courseId),
  };
}

function buildAnswerChoices(correctAnswer, correctIndex) {
  const distractors = WRONG_ANSWERS.filter((answer) => answer !== correctAnswer);
  const choices = [];
  let distractorIndex = 0;

  for (let index = 0; index < 4; index += 1) {
    choices.push(index === correctIndex ? correctAnswer : distractors[distractorIndex++]);
  }

  return choices;
}
