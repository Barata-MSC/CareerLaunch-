// Interactive extras for each JavaScript lesson, matched by lesson id (ids must stay the same).
// lessons.js merges these into the lessons, so the original text content is untouched.
//
// TODO: fill in each `start` (seconds) from the chapter list in the YouTube description
// (e.g. a chapter at 1:02:30 -> 3750). Until then every video starts at the beginning.

const VIDEO_ID = 'lfmg-EJ8gm4'; // Bro Code: JavaScript Full Course for free

const video = (chapter, start = 0) => ({
  id: VIDEO_ID,
  start,
  chapter,
  title: 'JavaScript Full Course for free',
  channel: 'Bro Code',
});

// References are in APA 7th style (LessonReferences shows text + link)
const w3 = (title, page) => ({
  text: `W3Schools. (n.d.). ${title}.`,
  url: `https://www.w3schools.com/js/${page}`,
});
const mdn = (title, path) => ({
  text: `MDN Web Docs. (n.d.). ${title}.`,
  url: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/${path}`,
});
const videoRef = {
  text: 'Bro Code. (2024). JavaScript full course for free [Video]. YouTube.',
  url: `https://youtu.be/${VIDEO_ID}`,
};

export const EXTRAS = {
  'js-1': {
    video: video('Introduction / console.log'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Your first program',
        task: "Change the message so the console prints Hello, JavaScript!",
        starter: "console.log('Hello, world!');",
        expected: ['Hello, JavaScript!'],
        hint: 'Change only the text between the quotes.',
      },
      {
        type: 'quickCheck',
        question: 'Where does console.log print its message?',
        options: ['On the web page', 'In the console', 'In a popup window', 'In the CSS file'],
        correct: 1,
        hint: 'You just saw it in the black box under the editor.',
        explanation: 'console.log writes to the console, a developer tool for testing code.',
      },
    ],
    references: [w3('JavaScript introduction', 'js_intro.asp'), mdn('JavaScript', ''), videoRef],
  },

  'js-2': {
    video: video('Variables / Data types'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Declare two variables',
        task: "Set city to 'Manila' (const) and age to 21 (let), so the console prints Manila 21.",
        starter: "// Fill in the values\nconst city = '';\nlet age = 0;\n\nconsole.log(city, age);",
        expected: ['Manila 21'],
        checks: [/const\s+city/, /let\s+age/],
        hint: "Keep const for city and let for age, and give them the values 'Manila' and 21.",
      },
      {
        type: 'quickCheck',
        question: 'Which one is a boolean value?',
        options: ["'true'", 'true', '1', 'null'],
        correct: 1,
        hint: 'A boolean has no quotes around it.',
        explanation: "true without quotes is a boolean. 'true' with quotes is a string.",
      },
    ],
    references: [
      w3('JavaScript variables', 'js_variables.asp'),
      mdn('const', 'Reference/Statements/const'),
      videoRef,
    ],
  },

  'js-3': {
    video: video('Conditionals / Comparison operators'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Fix the bug',
        task: 'The messages are in the wrong places. Fix the code so a score of 85 prints Passed.',
        starter:
          "const score = 85;\n\nif (score >= 70) {\n  console.log('Try again');\n} else {\n  console.log('Passed');\n}",
        expected: ['Passed'],
        checks: [/score\s*=\s*85/],
        hint: 'Keep the score at 85 and swap the two messages.',
      },
      {
        type: 'quickCheck',
        question: 'What does 10 > 3 && 2 > 5 evaluate to?',
        options: ['true', 'false', 'undefined', '10'],
        correct: 1,
        hint: '&& is true only when both sides are true.',
        explanation: '10 > 3 is true but 2 > 5 is false, so true && false is false.',
      },
    ],
    references: [
      w3('JavaScript if, else, and else if', 'js_if_else.asp'),
      mdn('if...else', 'Reference/Statements/if...else'),
      videoRef,
    ],
  },

  'js-4': {
    video: video('Functions'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Write a function',
        task: 'Make multiply return a * b, so the console prints 20.',
        starter: 'function multiply(a, b) {\n  // return the product here\n}\n\nconsole.log(multiply(4, 5));',
        expected: ['20'],
        checks: [/return/],
        hint: 'Add return a * b; inside the function.',
      },
      {
        type: 'quickCheck',
        question: 'What does a function give back if it has no return statement?',
        options: ['0', 'null', 'undefined', 'An error'],
        correct: 2,
        hint: 'Try running multiply without return and read the console.',
        explanation: 'Without return, a function gives back undefined.',
      },
    ],
    references: [
      w3('JavaScript functions', 'js_functions.asp'),
      mdn('Functions', 'Reference/Functions'),
      videoRef,
    ],
  },

  'js-5': {
    video: video('Arrays / Loops'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Push and loop',
        task: "Add 'JavaScript' to skills with push, then print every skill with a for...of loop.",
        starter: "const skills = ['HTML', 'CSS'];\n\n// 1. push 'JavaScript'\n// 2. loop with for...of and console.log each skill\n",
        expected: ['HTML', 'CSS', 'JavaScript'],
        checks: [/\.push\(/, /for\s*\(\s*(const|let)\s+\w+\s+of/],
        hint: "Use skills.push('JavaScript'); then for (const skill of skills) { console.log(skill); }",
      },
      {
        type: 'quickCheck',
        question: 'What is the index of the first item in an array?',
        options: ['1', '0', '-1', 'first'],
        correct: 1,
        hint: 'Counting starts at zero.',
        explanation: 'Arrays are zero-indexed, so the first item is at index 0.',
      },
    ],
    references: [
      w3('JavaScript arrays', 'js_arrays.asp'),
      mdn('Array.prototype.push()', 'Reference/Global_Objects/Array/push'),
      videoRef,
    ],
  },
};
