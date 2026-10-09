// lessonId links each question to the lesson to review when it is missed.
// explanation is shown on the result screen. (The passing score now lives in course.js.)
export const QUESTIONS = [
  {
    lessonId: 'css-1',
    question: 'What does CSS stand for?',
    answers: [
      'Computer Style Sheets',
      'Cascading Style Sheets',
      'Creative Style System',
      'Colorful Style Sheets',
    ],
    correct: 1,
    explanation:
      'CSS stands for Cascading Style Sheets. It is the language used to style HTML elements.',
  },
  {
    lessonId: 'css-2',
    question: 'Which selector targets elements with the class "title"?',
    answers: ['#title', 'title', '.title', '*title'],
    correct: 2,
    explanation:
      'A class selector starts with a dot, so .title targets class="title". An ID selector starts with #.',
  },
  {
    lessonId: 'css-3',
    question: 'Which property is used to create space inside an element?',
    answers: ['margin', 'padding', 'border', 'spacing'],
    correct: 1,
    explanation:
      'padding creates space inside an element, between its content and its border. margin is the space outside the border.',
  },
  {
    lessonId: 'css-4',
    question:
      'Which CSS layout system is useful for arranging items in rows or columns?',
    answers: ['Flexbox', 'HTML', 'SQL', 'JSON'],
    correct: 0,
    explanation:
      'Flexbox arranges items in rows or columns and controls their alignment and spacing. HTML, SQL, and JSON are not CSS layout systems.',
  },
  {
    lessonId: 'css-5',
    question: 'Which rule is commonly used for responsive designs?',
    answers: ['@screen', '@responsive', '@media', '@mobile'],
    correct: 2,
    explanation:
      '@media applies styles only when conditions such as screen width are met, which is how a page adapts to different screen sizes.',
  },
  {
    lessonId: 'css-6',
    question: 'Which property changes the text color?',
    answers: ['font-style', 'background', 'color', 'text-size'],
    correct: 2,
    explanation:
      'The color property sets the text color. background sets the background and font-style changes the text style.',
  },
  {
    lessonId: 'css-7',
    question: 'Which property sets the typeface of text?',
    answers: ['font-family', 'font-type', 'text-style', 'font-name'],
    correct: 0,
    explanation:
      'font-family sets the typeface. It is good practice to list a fallback such as sans-serif.',
  },
  {
    lessonId: 'css-8',
    question: 'What does display: none do?',
    answers: [
      'Makes the element transparent but keeps its space',
      'Moves the element off the screen',
      'Hides the element and removes its space',
      'Makes the element inline',
    ],
    correct: 2,
    explanation:
      'display: none removes the element from the layout completely, so it takes up no space.',
  },
  {
    lessonId: 'css-9',
    question: 'Which selector styles a button while the mouse is over it?',
    answers: ['button:focus', 'button::hover', 'button:click', 'button:hover'],
    correct: 3,
    explanation:
      ':hover is the pseudo-class that applies while the mouse pointer is over an element.',
  },
  {
    lessonId: 'css-10',
    question: 'Which declaration creates a grid container?',
    answers: ['grid: container;', 'display: grid;', 'layout: grid;', 'position: grid;'],
    correct: 1,
    explanation:
      'Setting display: grid on a parent turns it into a grid container, and its children become grid items.',
  },
];
