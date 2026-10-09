export const QUESTIONS = [
  {
    lessonId: 'js-1',
    question: 'What is JavaScript mainly used for on a web page?',
    answers: [
      'Styling colors and layout',
      'Adding behavior and interactivity',
      'Defining the page structure',
      'Storing data in a database',
    ],
    correct: 1,
    explanation:
      'JavaScript adds behavior, such as responding to clicks. HTML handles structure and CSS handles styling.',
  },
  {
    lessonId: 'js-2',
    question: 'Which keyword declares a variable that cannot be reassigned?',
    answers: ['var', 'let', 'const', 'static'],
    correct: 2,
    explanation:
      'const creates a variable that cannot be reassigned. Use let when the value needs to change later.',
  },
  {
    lessonId: 'js-3',
    question: "What does 5 === '5' evaluate to?",
    answers: ['true', 'false', 'undefined', 'It throws an error'],
    correct: 1,
    explanation:
      "=== compares both value and type. 5 is a number and '5' is a string, so the result is false.",
  },
  {
    lessonId: 'js-4',
    question: 'Given function add(a, b) { return a + b; }, what does add(2, 3) return?',
    answers: ['5', '23', 'undefined', 'a + b'],
    correct: 0,
    explanation:
      'The function returns the sum of its two parameters, so add(2, 3) returns the number 5.',
  },
  {
    lessonId: 'js-5',
    question: 'Which array method adds an item to the end of an array?',
    answers: ['pop()', 'shift()', 'push()', 'slice()'],
    correct: 2,
    explanation:
      'push() adds to the end. pop() removes the last item and shift() removes the first.',
  },
];
