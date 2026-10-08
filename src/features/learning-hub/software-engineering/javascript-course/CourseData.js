// All course content lives here. No database, no network.
// To add a lesson or question later, just add an object to these arrays.

export const COURSE_TITLE = 'JavaScript fundamentals';
export const PASS_PERCENT = 70;

export const LESSONS = [
  {
    id: 'js-1',
    title: 'What is JavaScript?',
    minutes: 4,
    body:
      'JavaScript is the programming language of the web. HTML gives a page its structure and CSS styles it, while JavaScript makes it interactive: reacting to clicks, checking form input, and updating content without reloading the page.',
    definition:
      'JavaScript is a programming language that adds behavior and interactivity to web pages and apps.',
    code: "console.log('Hello, world!');\n// Prints a message to the console",
    caption: 'Example: your first JavaScript statement',
  },
  {
    id: 'js-2',
    title: 'Variables and data types',
    minutes: 5,
    body:
      'Variables store values so you can reuse them. Use const for values that never change and let for values that will be reassigned. Common data types are strings, numbers, booleans, null, and undefined.',
    definition: 'A variable is a named container that holds a value.',
    code: "const name = 'Ana';\nlet age = 20;\nconst isStudent = true;\n\nage = 21; // allowed: age uses let",
    caption: 'Example: declaring variables with const and let',
  },
  {
    id: 'js-3',
    title: 'Operators and conditionals',
    minutes: 6,
    body:
      'Conditionals let your code make decisions. An if statement runs a block only when its condition is true. Prefer === over == because it compares both the value and the type.',
    definition: 'A condition is an expression that evaluates to true or false.',
    code: "const score = 85;\n\nif (score >= 70) {\n  console.log('Passed');\n} else {\n  console.log('Try again');\n}",
    caption: 'Example: choosing between two outcomes',
  },
  {
    id: 'js-4',
    title: 'Functions',
    minutes: 6,
    body:
      'Functions package reusable logic. They take parameters as input and can send a value back with return. Arrow functions offer a shorter syntax for the same idea.',
    definition: 'A function is a reusable block of code that performs a task.',
    code: 'function add(a, b) {\n  return a + b;\n}\n\nconst double = (n) => n * 2;\n\nconsole.log(add(2, 3)); // 5',
    caption: 'Example: a regular function and an arrow function',
  },
  {
    id: 'js-5',
    title: 'Arrays and loops',
    minutes: 6,
    body:
      'An array holds an ordered list of values, starting at index 0. Methods like push add items, and loops such as for...of let you work through every item.',
    definition: 'An array is an ordered list of values accessed by index.',
    code: "const skills = ['HTML', 'CSS'];\nskills.push('JavaScript');\n\nfor (const skill of skills) {\n  console.log(skill);\n}",
    caption: 'Example: adding to an array and looping over it',
  },
];

// lessonId links each question to the lesson to review if it is missed.
export const QUESTIONS = [
  {
    id: 'q1',
    lessonId: 'js-1',
    prompt: 'What is JavaScript mainly used for on a web page?',
    options: [
      'Styling colors and layout',
      'Adding behavior and interactivity',
      'Defining the page structure',
      'Storing data in a database',
    ],
    correctIndex: 1,
    explanation:
      'JavaScript adds behavior, such as responding to clicks. HTML handles structure and CSS handles styling.',
  },
  {
    id: 'q2',
    lessonId: 'js-2',
    prompt: 'Which keyword declares a variable that cannot be reassigned?',
    options: ['var', 'let', 'const', 'static'],
    correctIndex: 2,
    explanation:
      'const creates a variable that cannot be reassigned. Use let when the value needs to change later.',
  },
  {
    id: 'q3',
    lessonId: 'js-3',
    prompt: "What does 5 === '5' evaluate to?",
    options: ['true', 'false', 'undefined', 'It throws an error'],
    correctIndex: 1,
    explanation:
      "=== compares both value and type. 5 is a number and '5' is a string, so the result is false.",
  },
  {
    id: 'q4',
    lessonId: 'js-4',
    prompt: 'Given function add(a, b) { return a + b; }, what does add(2, 3) return?',
    options: ['5', '23', 'undefined', 'a + b'],
    correctIndex: 0,
    explanation:
      'The function returns the sum of its two parameters, so add(2, 3) returns the number 5.',
  },
  {
    id: 'q5',
    lessonId: 'js-5',
    prompt: 'Which array method adds an item to the end of an array?',
    options: ['pop()', 'shift()', 'push()', 'slice()'],
    correctIndex: 2,
    explanation:
      'push() adds to the end. pop() removes the last item and shift() removes the first.',
  },
];

// answers = array with the chosen option index for each question (or null).
export function gradeQuiz(answers) {
  const results = QUESTIONS.map((q, i) => ({
    question: q,
    number: i + 1,
    picked: answers[i],
    isCorrect: answers[i] === q.correctIndex,
  }));
  const score = results.filter((r) => r.isCorrect).length;
  const total = QUESTIONS.length;
  const percent = Math.round((score / total) * 100);
  return { results, score, total, percent, passed: percent >= PASS_PERCENT };
}