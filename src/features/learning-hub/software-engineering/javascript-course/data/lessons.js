export const LESSONS = [
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
];
