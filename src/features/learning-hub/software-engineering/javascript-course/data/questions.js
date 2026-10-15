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
  {
    lessonId: 'js-6',
    question: 'What do we call a function stored inside an object?',
    answers: ['A method', 'A property name', 'A module', 'A loop'],
    correct: 0,
    explanation:
      'A function stored as a property of an object is called a method, and it can use this to reach the object.',
  },
  {
    lessonId: 'js-7',
    question: 'Which array method keeps only the items that pass a test?',
    answers: ['map()', 'filter()', 'push()', 'join()'],
    correct: 1,
    explanation:
      'filter() returns a new array with only the items for which the test function returns true. map() changes every item.',
  },
  {
    lessonId: 'js-8',
    question: 'Which syntax lets you put a variable inside a string with ${}?',
    answers: ['Single quotes', 'Double quotes', 'Backticks (template literals)', 'Parentheses'],
    correct: 2,
    explanation:
      'Template literals use backticks, and ${} inserts the value of an expression into the string.',
  },
  {
    lessonId: 'js-9',
    question: 'Which method finds the first element that matches a CSS selector?',
    answers: ['document.getAll()', 'document.querySelector()', 'document.find()', 'document.select()'],
    correct: 1,
    explanation:
      'document.querySelector() takes a CSS selector, such as #save or .title, and returns the first matching element.',
  },
  {
    lessonId: 'js-10',
    question: 'What does the await keyword do inside an async function?',
    answers: [
      'Waits for a promise to finish before continuing',
      'Stops the whole page',
      'Creates a loop',
      'Declares a variable',
    ],
    correct: 0,
    explanation:
      'await pauses the async function until the promise settles, then gives you its result.',
  },
];
