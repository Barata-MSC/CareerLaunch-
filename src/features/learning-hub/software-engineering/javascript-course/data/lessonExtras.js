

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
const mdnWeb = (title, url) => ({ text: `MDN Web Docs. (n.d.). ${title}.`, url });
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

  'js-6': {
    video: video('Objects'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Update an object and add a method',
        task: "Change age to 21 and add a greet() method that returns 'Hi, I am ' + this.name.",
        starter:
          "const user = {\n  name: 'Ana',\n  age: 20,\n};\n\n// 1. change age to 21\n// 2. add a method greet() that returns 'Hi, I am ' + this.name\n\nconsole.log(user.age);\nconsole.log(user.greet());",
        expected: ['21', 'Hi, I am Ana'],
        checks: [/greet\s*(\(|:)/],
        hint: "Inside the object, write greet() { return 'Hi, I am ' + this.name; } and set age: 21.",
      },
      {
        type: 'quickCheck',
        question: 'How do you read the name property of an object called user?',
        options: ['user.name', 'user->name', 'name.user', 'user(name)'],
        correct: 0,
        hint: 'Use a dot between the object and the property.',
        explanation: 'Dot notation reads a property: user.name.',
      },
    ],
    references: [
      w3('JavaScript objects', 'js_objects.asp'),
      mdn('this', 'Reference/Operators/this'),
      videoRef,
    ],
  },

  'js-7': {
    video: video('Array methods / map / filter'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Filter, then map',
        task: 'Keep only the even numbers with filter, then double them with map. The console should print 4, 8, 12.',
        starter:
          "const nums = [1, 2, 3, 4, 5, 6];\n\n// keep only the even numbers with filter,\n// then double them with map\nconst result = nums;\n\nconsole.log(result.join(', '));",
        expected: ['4, 8, 12'],
        checks: [/\.filter\(/, /\.map\(/],
        hint: 'const result = nums.filter((n) => n % 2 === 0).map((n) => n * 2);',
      },
      {
        type: 'quickCheck',
        question: 'Does map() change the original array?',
        options: ['Yes, it edits it in place', 'No, it returns a new array', 'Only if the array is empty', 'Only with const'],
        correct: 1,
        hint: 'Compare nums and doubled in the lesson code.',
        explanation: 'map() leaves the original array alone and returns a new one.',
      },
    ],
    references: [
      w3('JavaScript array iteration', 'js_array_iteration.asp'),
      mdn('Array.prototype.map()', 'Reference/Global_Objects/Array/map'),
      videoRef,
    ],
  },

  'js-8': {
    video: video('Strings / Template literals'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Build a sentence',
        task: 'Use toUpperCase() and a template literal so the console prints ANA CRUZ is 21 years old.',
        starter:
          "const name = 'ana cruz';\nconst age = 21;\n\n// print: ANA CRUZ is 21 years old\n// use toUpperCase() and a template literal\nconsole.log(name);",
        expected: ['ANA CRUZ is 21 years old'],
        checks: [/toUpperCase\(\)/, /`[^`]*\$\{/],
        hint: 'console.log(`${name.toUpperCase()} is ${age} years old`);',
      },
      {
        type: 'quickCheck',
        question: "What does 'Ana'.length return?",
        options: ['3', '2', 'Ana', 'undefined'],
        correct: 0,
        hint: 'Count the characters.',
        explanation: 'length is the number of characters, so the answer is 3.',
      },
    ],
    references: [
      w3('JavaScript string methods', 'js_string_methods.asp'),
      mdn('Template literals', 'Reference/Template_literals'),
      videoRef,
    ],
  },

  'js-9': {
    video: video('DOM / Events'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Respond to a click',
        task: "Add a click listener so pressing the button sets the message to Saved!. The code presses the button for you at the end.",
        starter:
          "const button = document.createElement('button');\nconst message = document.createElement('p');\nmessage.textContent = 'Not saved';\n\n// add a click listener that sets message.textContent to 'Saved!'\n\nbutton.click();\nconsole.log(message.textContent);",
        expected: ['Saved!'],
        checks: [/addEventListener\(\s*['"]click['"]/],
        hint: "button.addEventListener('click', () => { message.textContent = 'Saved!'; });",
      },
      {
        type: 'quickCheck',
        question: 'Which method runs a function when a user clicks a button?',
        options: ['addEventListener', 'appendChild', 'querySelector', 'textContent'],
        correct: 0,
        hint: 'It listens for events such as click.',
        explanation: 'addEventListener attaches a function that runs when the event happens.',
      },
    ],
    references: [
      w3('JavaScript HTML DOM', 'js_htmldom.asp'),
      mdnWeb(
        'EventTarget: addEventListener() method',
        'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener',
      ),
      videoRef,
    ],
  },

  'js-10': {
    video: video('Promises / async / await'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Wait, then continue',
        task: 'Inside run, wait 200 ms with await, then print Done waiting.',
        starter:
          "const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\n\nasync function run() {\n  console.log('Start');\n  // wait 200 ms, then print 'Done waiting'\n}\n\nrun();",
        expected: ['Start', 'Done waiting'],
        wait: 600,
        checks: [/await/],
        hint: "await wait(200); console.log('Done waiting');",
      },
      {
        type: 'quickCheck',
        question: 'What does a promise stand for?',
        options: ['A result that will arrive later', 'A saved file', 'A CSS rule', 'A loop'],
        correct: 0,
        hint: 'Think of ordering food and getting it later.',
        explanation: 'A promise represents a value that is not ready yet but will be later, or will fail.',
      },
    ],
    references: [
      w3('JavaScript async', 'js_async.asp'),
      mdn('Promise', 'Reference/Global_Objects/Promise'),
      videoRef,
    ],
  },
};
