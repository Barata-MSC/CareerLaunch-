// Quiz question bank. Each question points to its lesson with lessonId.

export const QUESTIONS = [
  // 1 What is a Wireframe?
  {
    lessonId: 'wireframing-what-is',
    question: 'Which best describes a wireframe?',
    answers: [
      'A final design with colors and images',
      'A simple layout showing structure and content placement',
      'A fully coded working product',
      'A marketing banner',
    ],
    correct: 1,
    explanation: 'A wireframe shows layout and structure without final visual style.',
  },
  // 2 Sketching Ideas
  {
    lessonId: 'wireframing-sketching',
    question: 'What is the main benefit of sketching ideas first?',
    answers: [
      'It creates the final visual design',
      'It replaces user research',
      'It lets you explore many ideas quickly and cheaply',
      'It requires special software',
    ],
    correct: 2,
    explanation: 'Sketches are fast and disposable, so you can compare several layouts before committing.',
  },
  // 3 Information Architecture
  {
    lessonId: 'wireframing-information-architecture',
    question: 'What is information architecture?',
    answers: [
      'How content is organized and labeled so people can find it',
      'The color palette of an app',
      'The programming structure of an app',
      'The marketing plan for a product',
    ],
    correct: 0,
    explanation: 'IA is about organizing and labeling content so it is easy to find.',
  },
  // 4 User Flows
  {
    lessonId: 'wireframing-user-flows',
    question: 'In a flowchart-style user flow, which shape usually shows a decision?',
    answers: ['Oval', 'Rectangle', 'Arrow', 'Diamond'],
    correct: 3,
    explanation: 'A diamond marks a decision with different paths, such as yes or no.',
  },
  // 5 Layout & Hierarchy
  {
    lessonId: 'wireframing-layout',
    question: 'What does white space help with in a layout?',
    answers: [
      'It makes the screen feel heavier',
      'It groups related content and keeps the screen clear',
      'It adds decoration',
      'It makes the screen load faster',
    ],
    correct: 1,
    explanation: 'White space separates groups and gives the eye room, which improves clarity.',
  },
  // 6 UI Components & Patterns
  {
    lessonId: 'wireframing-components',
    question: 'Which component works best for switching between three to five main sections on mobile?',
    answers: ['A long list of links', 'A footer', 'A bottom tab bar', 'A pop-up window'],
    correct: 2,
    explanation: 'A bottom tab bar keeps main sections visible and within thumb reach.',
  },
  // 7 Wireframing for Mobile
  {
    lessonId: 'wireframing-mobile',
    question: 'Why place frequent actions in the lower part of a phone screen?',
    answers: [
      'They are easier to reach with a thumb',
      'They look more colorful there',
      'Screens load faster',
      'It saves developer time',
    ],
    correct: 0,
    explanation: 'The lower part of the screen is easiest to reach with a thumb, especially one-handed.',
  },
  // 8 Annotations & States
  {
    lessonId: 'wireframing-annotations-states',
    question: 'What is an empty state?',
    answers: [
      'An error message',
      'A loading spinner',
      'A crashed blank screen',
      'A screen shown when there is no content yet, often with guidance',
    ],
    correct: 3,
    explanation: 'An empty state appears when there is no data yet and should tell users what to do next.',
  },
  // 9 Testing Wireframes
  {
    lessonId: 'wireframing-testing',
    question: 'Which is a good way to test a wireframe early?',
    answers: [
      'Wait until the product is fully coded',
      'Let people try tasks on a paper or clickable version',
      'Ask only the design team to review it',
      'Skip testing until launch',
    ],
    correct: 1,
    explanation: 'Paper and click-through tests show real problems while changes are still cheap.',
  },
  // 10 From Wireframe to Design
  {
    lessonId: 'wireframing-handoff',
    question: 'When is it a good time to move to high-fidelity design?',
    answers: [
      'Before showing anyone the wireframes',
      'As soon as colors are chosen',
      'After structure and flow are checked and feedback is addressed',
      'Never, wireframes are the final design',
    ],
    correct: 2,
    explanation: 'Add visual polish after the structure has been validated, so effort is not wasted.',
  },
];
