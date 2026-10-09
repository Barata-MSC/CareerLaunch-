// Node.js lessons. Each lesson's status (completed / in-progress / not-started)
// is derived from saved progress, so it is NOT written here.
// `id` must match the `lessonId` used in questions.js.
export const LESSONS = [
  {
    id: 'node-1',
    title: 'What is Node.js?',
    subtitle: 'JavaScript outside the browser',
    contentTitle: 'Run JavaScript on the server',
    description:
      'Node.js is a free, open source tool that lets you run JavaScript outside the web browser. With it you can build web servers, APIs, command-line tools, and apps that work with files and databases. Node.js uses an event-driven, non-blocking model, so it can handle many connections at once without waiting for one to finish before starting another.',
    code: `// hello.js
console.log('Hello from Node.js!');`,
  },
  {
    id: 'node-2',
    title: 'Get started',
    subtitle: 'Install and run your first file',
    contentTitle: 'Run a JavaScript file with Node',
    description:
      'Download and install Node.js from nodejs.org, which also installs npm. Check that it works by asking for the version. To run a program, save your code in a file such as app.js and run it from the terminal with the node command.',
    code: `node --version
npm --version

node app.js`,
  },
  {
    id: 'node-3',
    title: 'Node.js vs the browser',
    subtitle: 'Same language, different tools',
    contentTitle: 'Know where your code runs',
    description:
      'The language is the same, but the environment is different. Browsers give you the DOM and the window object to change web pages. Node.js has no page to change, but it can read and write files, start servers, and use the operating system. Code that relies on document or window will not work in Node.js.',
    code: `// Works in Node.js
console.log(process.version);

// Does NOT work in Node.js
// document.getElementById('title');`,
  },
  {
    id: 'node-4',
    title: 'Modules',
    subtitle: 'Split code into files',
    contentTitle: 'Share code between files',
    description:
      'A module is a file whose code you can reuse in other files. In CommonJS, the default style in Node.js, you share values with module.exports and load them with require(). Modern ES modules use export and import instead, and you turn them on by adding "type": "module" to package.json.',
    code: `// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// app.js
const { add } = require('./math');
console.log(add(2, 3)); // 5`,
  },
  {
    id: 'node-5',
    title: 'npm and package.json',
    subtitle: 'Install packages',
    contentTitle: 'Use packages from npm',
    description:
      'npm is the package manager for Node.js. It installs third-party packages and lists them in a file called package.json, so anyone can recreate your project with npm install. Installed packages go into the node_modules folder, which you do not commit to Git. You can also add scripts to package.json and run them with npm run.',
    code: `npm init -y
npm install express

# package.json
# "scripts": { "start": "node app.js" }
npm run start`,
  },
  {
    id: 'node-6',
    title: 'File system',
    subtitle: 'Read and write files',
    contentTitle: 'Work with files using fs',
    description:
      'The built-in fs module reads, writes, and deletes files. Built-in modules need no installation, only require(). Most fs functions have a callback version and a promise version. Always handle the error case, because a file may not exist.',
    code: `const fs = require('fs');

fs.writeFile('note.txt', 'Hello file!', (err) => {
  if (err) throw err;

  fs.readFile('note.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
});`,
  },
  {
    id: 'node-7',
    title: 'Async and await',
    subtitle: 'Handle waiting code',
    contentTitle: 'Write async code that reads like normal code',
    description:
      'Many Node.js tasks take time, such as reading files or calling an API. A promise represents a result that will arrive later. async and await let you wait for a promise in a way that reads like normal code. Wrap the awaited code in try and catch to handle errors.',
    code: `const fs = require('fs/promises');

async function readNote() {
  try {
    const data = await fs.readFile('note.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.log('Could not read file:', err.message);
  }
}

readNote();`,
  },
  {
    id: 'node-8',
    title: 'HTTP module',
    subtitle: 'Build a web server',
    contentTitle: 'Create a server with http',
    description:
      'The built-in http module can create a web server. The server function receives a request and a response. You set the status and headers with writeHead, send the body with end, and start listening on a port with listen. Open the page in your browser at localhost and the port number.',
    code: `const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
  })
  .listen(8080);`,
  },
  {
    id: 'node-9',
    title: 'Express.js',
    subtitle: 'A web framework',
    contentTitle: 'Build servers faster with Express',
    description:
      'Express is the most popular Node.js web framework. Install it with npm, then define routes with app.get, app.post and similar methods. Each route runs a function for a certain path and method. Express makes servers shorter and easier to read than the plain http module.',
    code: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8080);`,
  },
  {
    id: 'node-10',
    title: 'REST API basics',
    subtitle: 'Build an API',
    contentTitle: 'Design routes for an API',
    description:
      'A REST API uses HTTP methods on URLs to work with data: GET reads, POST creates, PUT updates, and DELETE removes. Responses use status codes, such as 200 for success, 201 for created, and 404 for not found. Add express.json() so Express can read JSON sent in a request body.',
    code: `app.use(express.json());

const users = [{ id: 1, name: 'Sam' }];

app.get('/users', (req, res) => res.json(users));

app.post('/users', (req, res) => {
  const user = { id: users.length + 1, name: req.body.name };
  users.push(user);
  res.status(201).json(user);
});`,
  },
];
