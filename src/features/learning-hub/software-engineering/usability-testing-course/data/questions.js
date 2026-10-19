// Quiz question bank. Each question points to its lesson with lessonId.

export const QUESTIONS = [
  // 1 What is Usability Testing?
  {
    lessonId: 'usability-testing-what-is',
    question: 'What is the main idea of usability testing?',
    answers: [
      'Asking users to design the product',
      'Counting how many people visit the site',
      'Observing real users try realistic tasks to find problems',
      'Checking the code for bugs',
    ],
    correct: 2,
    explanation: 'Usability testing observes real users doing realistic tasks so you can see where they struggle.',
  },
  // 2 Types of Usability Tests
  {
    lessonId: 'usability-testing-types',
    question: 'What is the main difference between moderated and unmoderated testing?',
    answers: [
      'A facilitator guides moderated sessions live, while unmoderated participants work on their own',
      'Moderated tests use no users',
      'Unmoderated tests always need a lab',
      'There is no difference',
    ],
    correct: 0,
    explanation: 'Moderated sessions have a live facilitator. In unmoderated tests participants complete tasks by themselves.',
  },
  // 3 Planning a Test
  {
    lessonId: 'usability-testing-planning',
    question: 'Why should you write a test plan?',
    answers: [
      'To replace the real test',
      'To make the study longer',
      'To choose the visual style',
      'To align the team on goals, tasks, metrics, and schedule',
    ],
    correct: 3,
    explanation: 'A plan keeps the test focused and makes sure everyone agrees on what it will answer.',
  },
  // 4 Writing Tasks & Scenarios
  {
    lessonId: 'usability-testing-tasks',
    question: 'What makes a good usability test task?',
    answers: [
      'It names the exact button to click',
      'It gives a realistic goal without revealing where to click',
      'It asks users whether they like the design',
      'It lists every step to follow',
    ],
    correct: 1,
    explanation: 'Good tasks describe a realistic goal and leave users to find the way, which exposes real problems.',
  },
  // 5 Participants & Sample Size
  {
    lessonId: 'usability-testing-participants',
    question: 'About how many participants are typically enough for one small qualitative usability round?',
    answers: ['1', '2', 'About 5', 'About 100'],
    correct: 2,
    explanation: 'About five users reveal most major problems in a qualitative round. Run more small rounds after fixing.',
  },
  // 6 Facilitating a Session
  {
    lessonId: 'usability-testing-facilitating',
    question: 'A participant asks, "Should I click here?" What should the facilitator do?',
    answers: [
      'Stay neutral and ask what they would do or expect',
      'Say yes, click there',
      'Say no, try another place',
      'End the task',
    ],
    correct: 0,
    explanation: 'Staying neutral keeps the test honest. Asking what they would do shows their real thinking.',
  },
  // 7 Observing & Measuring
  {
    lessonId: 'usability-testing-observing',
    question: 'Seven out of ten participants complete a task. What is the task success rate?',
    answers: ['7 percent', '70 percent', '30 percent', '17 percent'],
    correct: 1,
    explanation: 'Success rate is completed divided by attempts: 7 divided by 10 is 70 percent.',
  },
  // 8 Heuristic Evaluation
  {
    lessonId: 'usability-testing-heuristic-evaluation',
    question: 'What is a heuristic evaluation?',
    answers: [
      'A survey sent to many customers',
      'A code review by developers',
      'A timed test with real users',
      'Experts reviewing an interface against usability principles',
    ],
    correct: 3,
    explanation: 'Evaluators inspect the interface and judge it against established heuristics, without real users.',
  },
  // 9 Analyzing & Prioritizing
  {
    lessonId: 'usability-testing-analysis',
    question: 'Which three factors help rate how serious a usability problem is?',
    answers: [
      'Frequency, impact, and persistence',
      'Color, size, and font',
      'Cost, speed, and risk',
      'Age, location, and device',
    ],
    correct: 0,
    explanation: 'Problems that happen often, block users, and keep bothering them are the most serious.',
  },
  // 10 Reporting & Iterating
  {
    lessonId: 'usability-testing-reporting',
    question: 'What should a good usability report include besides findings?',
    answers: [
      'Only participant names',
      'Only screenshots',
      'Prioritized recommendations and next steps',
      'Only the test script',
    ],
    correct: 2,
    explanation: 'Recommendations and next steps turn findings into action, which is the point of testing.',
  },
];
