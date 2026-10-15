import { EXTRAS } from './lessonExtras';


const BASE_LESSONS = [
  {
    id: 'js-1',
    title: 'What is JavaScript?',
    subtitle: 'About 4 minutes',
    contentTitle: 'JavaScript adds interactivity',
    description:
      'JavaScript is the programming language of the web. HTML gives a page its structure and CSS styles it, while JavaScript makes it interactive: reacting to clicks, checking form input, and updating content without reloading the page.',
    code: "console.log('Hello, world!');\n// Prints a message to the console",
  },
  {
    id: 'js-2',
    title: 'Variables and data types',
    subtitle: 'About 5 minutes',
    contentTitle: 'Store and reuse values',
    description:
      'Variables store values so you can reuse them. Use const for values that never change and let for values that will be reassigned. Common data types are strings, numbers, booleans, null, and undefined.',
    code: "const name = 'Ana';\nlet age = 20;\nconst isStudent = true;\n\nage = 21; // allowed: age uses let",
  },
  {
    id: 'js-3',
    title: 'Operators and conditionals',
    subtitle: 'About 6 minutes',
    contentTitle: 'Make decisions in code',
    description:
      'Conditionals let your code make decisions. An if statement runs a block only when its condition is true. Prefer === over == because it compares both the value and the type.',
    code: "const score = 85;\n\nif (score >= 70) {\n  console.log('Passed');\n} else {\n  console.log('Try again');\n}",
  },
  {
    id: 'js-4',
    title: 'Functions',
    subtitle: 'About 6 minutes',
    contentTitle: 'Reusable blocks of code',
    description:
      'Functions package reusable logic. They take parameters as input and can send a value back with return. Arrow functions offer a shorter syntax for the same idea.',
    code: 'function add(a, b) {\n  return a + b;\n}\n\nconst double = (n) => n * 2;\n\nconsole.log(add(2, 3)); // 5',
  },
  {
    id: 'js-5',
    title: 'Arrays and loops',
    subtitle: 'About 6 minutes',
    contentTitle: 'Work with ordered lists',
    description:
      'An array holds an ordered list of values, starting at index 0. Methods like push add items, and loops such as for...of let you work through every item.',
    code: "const skills = ['HTML', 'CSS'];\nskills.push('JavaScript');\n\nfor (const skill of skills) {\n  console.log(skill);\n}",
  },
  {
    id: 'js-6',
    title: 'Objects',
    subtitle: 'About 6 minutes',
    contentTitle: 'Group related data',
    description:
      'An object stores related values as key: value pairs called properties. Read a property with dot notation, such as user.name, and change it by assigning a new value. A function stored in an object is called a method, and this refers to the object the method belongs to.',
    code: "const user = {\n  name: 'Ana',\n  age: 20,\n  greet() {\n    return 'Hi, I am ' + this.name;\n  },\n};\n\nuser.age = 21;\nconsole.log(user.name);\nconsole.log(user.greet());",
  },
  {
    id: 'js-7',
    title: 'Array methods',
    subtitle: 'About 6 minutes',
    contentTitle: 'Transform lists without loops',
    description:
      'Array methods work through a list without a manual loop. map() makes a new array by changing each item, filter() keeps only the items that pass a test, and find() returns the first match. They do not change the original array, and each one takes a function as input.',
    code: "const nums = [1, 2, 3, 4, 5];\n\nconst doubled = nums.map((n) => n * 2);\nconst evens = nums.filter((n) => n % 2 === 0);\n\nconsole.log(doubled); // [2, 4, 6, 8, 10]\nconsole.log(evens); // [2, 4]",
  },
  {
    id: 'js-8',
    title: 'Strings and template literals',
    subtitle: 'About 6 minutes',
    contentTitle: 'Work with text',
    description:
      'Strings have helpful properties and methods, such as length, toUpperCase(), includes(), slice() and trim(). Template literals use backticks and let you place values inside a string with ${}, which is easier to read than joining pieces with +. Strings cannot be changed in place, so each method returns a new string.',
    code: "const name = 'ana cruz';\n\nconsole.log(name.toUpperCase()); // ANA CRUZ\nconsole.log(name.includes('cruz')); // true\nconsole.log(name.length); // 8\n\nconst age = 21;\nconsole.log(`${name} is ${age} years old`);",
  },
  {
    id: 'js-9',
    title: 'The DOM and events',
    subtitle: 'About 7 minutes',
    contentTitle: 'Change the page with JavaScript',
    description:
      'The DOM is the browser\'s tree of the page. JavaScript can find elements with document.querySelector, change them with textContent, and react to events with addEventListener. An event listener is a function that runs when something happens, such as a click. DOM code only runs in a browser, not in Node.js.',
    code: "const button = document.querySelector('#save');\nconst message = document.querySelector('#message');\n\nbutton.addEventListener('click', () => {\n  message.textContent = 'Saved!';\n});",
  },
  {
    id: 'js-10',
    title: 'Promises and async',
    subtitle: 'About 7 minutes',
    contentTitle: 'Handle code that takes time',
    description:
      'Some code takes time, such as a timer or a network request. A promise stands for a result that will arrive later. setTimeout runs code after a delay, and async/await lets you wait for a promise in code that reads from top to bottom. Use try and catch to handle a failure.',
    code: "const wait = (ms) =>\n  new Promise((resolve) => setTimeout(resolve, ms));\n\nasync function run() {\n  console.log('Start');\n  await wait(1000);\n  console.log('One second later');\n}\n\nrun();",
  },
];

export const LESSONS = BASE_LESSONS.map((lesson) => ({ ...lesson, ...EXTRAS[lesson.id] }));
