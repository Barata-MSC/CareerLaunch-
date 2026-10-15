// Quiz question bank. Each question points to its lesson with lessonId.

export const QUESTIONS = [
  // 1 What is UI/UX?
  {
    lessonId: 'design-fundamentals-ui-vs-ux',
    question: 'Which statement best describes the difference between UX and UI?',
    answers: [
      'UX is the visual layer and UI is the overall experience',
      'UX is the overall experience and UI is the visual interface',
      'UX and UI mean exactly the same thing',
      'UX is only for developers and UI is only for managers',
    ],
    correct: 1,
    explanation: 'UX is how the product works and feels overall. UI is what users see and touch, like colors, buttons, and text.',
  },
  // 2 The Design Process
  {
    lessonId: 'design-fundamentals-design-process',
    question: 'What is the correct order of the design thinking steps?',
    answers: [
      'Prototype, Test, Empathize, Define, Ideate',
      'Ideate, Define, Test, Empathize, Prototype',
      'Empathize, Define, Ideate, Prototype, Test',
      'Define, Test, Prototype, Ideate, Empathize',
    ],
    correct: 2,
    explanation: 'Design thinking runs Empathize, Define, Ideate, Prototype, Test, and often loops back as you learn.',
  },
  // 3 Layout & Spacing
  {
    lessonId: 'design-fundamentals-layout-spacing',
    question: 'You place a label right next to its input field and leave more space before the next group. Which principle is this?',
    answers: ['Proximity', 'Contrast', 'Repetition', 'Symmetry'],
    correct: 0,
    explanation: 'Proximity means items placed close together are seen as related, while space separates unrelated groups.',
  },
  // 4 Visual Hierarchy
  {
    lessonId: 'design-fundamentals-visual-hierarchy',
    question: 'A screen has three buttons that all look equally bold and bright. What is the main problem?',
    answers: [
      'The buttons are too small to tap',
      'The font is the wrong type',
      'The page has too much white space',
      'There is no clear primary action, so nothing stands out',
    ],
    correct: 3,
    explanation: 'If everything has the same emphasis, users cannot tell what to do first. Give each screen one clear primary action.',
  },
  // 5 Color Theory
  {
    lessonId: 'design-fundamentals-color',
    question: 'In the 60-30-10 rule, what is the 10 percent usually used for?',
    answers: [
      'The page background',
      'An accent color for key actions',
      'The body text color',
      'Borders and dividers',
    ],
    correct: 1,
    explanation: 'The 10 percent is the accent color, best saved for key actions so they stand out.',
  },
  // 6 Typography
  {
    lessonId: 'design-fundamentals-typography',
    question: 'Which is a good guideline for body text on mobile?',
    answers: [
      'Use at least five different typefaces',
      'Use a size of 8 pixels to save space',
      'Use around 16 pixels with comfortable line height',
      'Use all capital letters for long paragraphs',
    ],
    correct: 2,
    explanation: 'Around 16 pixels with a line height of about 1.4 to 1.6 times the size keeps text comfortable to read.',
  },
  // 7 Contrast & Accessibility
  {
    lessonId: 'design-fundamentals-contrast-accessibility',
    question: 'What minimum contrast ratio does WCAG level AA require for normal-sized text?',
    answers: ['4.5 : 1', '2 : 1', '3 : 1', '10 : 1'],
    correct: 0,
    explanation: 'WCAG AA requires 4.5:1 for normal text and 3:1 for large text.',
  },
  // 8 Usability Heuristics
  {
    lessonId: 'design-fundamentals-usability-heuristics',
    question: 'A loading spinner and a "Saved" message after you click Save follow which heuristic?',
    answers: [
      'Error prevention',
      'Flexibility and efficiency',
      'Minimalist design',
      'Visibility of system status',
    ],
    correct: 3,
    explanation: 'Showing what the system is doing keeps users informed, which is visibility of system status.',
  },
  // 9 Consistency & Components
  {
    lessonId: 'design-fundamentals-consistency-components',
    question: 'What are design tokens?',
    answers: [
      'Rewards given to users for completing tasks',
      'Named values for colors, type sizes, and spacing used across a product',
      'Login codes sent to users',
      'Screenshots saved for documentation',
    ],
    correct: 1,
    explanation: 'Tokens are named design values such as "primary" or "space-16" that keep a product consistent and easy to update.',
  },
  // 10 Responsive & Mobile Design
  {
    lessonId: 'design-fundamentals-responsive-mobile',
    question: 'What does a mobile first approach mean?',
    answers: [
      'Designing only for phones and ignoring other devices',
      'Building the desktop version and shrinking it later',
      'Starting with the smallest screen and expanding to larger ones',
      'Making every screen exactly the same size',
    ],
    correct: 2,
    explanation: 'Mobile first starts with the smallest screen to focus on what matters, then adds space and features for larger screens.',
  },
];
