// Interactive extras for each Node.js lesson, matched by lesson id (ids must stay the same).
// lessons.js merges these into the lessons, so the original text content is untouched.
//
// TODO: fill in each `start` (seconds) from the chapter list in the YouTube description
// (e.g. a chapter at 1:02:30 -> 3750). Until then every video starts at the beginning.
//
// 'jsRunner' activities with a `node` field run in Node.js practice mode (see JsPlayground.js).

const VIDEO_ID = 'RLtyhwFtXQA'; // freeCodeCamp.org: Learn Node.js - Full Tutorial for Beginners

const video = (chapter, start = 0) => ({
  id: VIDEO_ID,
  start,
  chapter,
  title: 'Learn Node.js - Full Tutorial for Beginners',
  channel: 'freeCodeCamp.org',
});

// References are in APA 7th style (LessonReferences shows text + link)
const w3 = (title, page) => ({
  text: `W3Schools. (n.d.). ${title}.`,
  url: `https://www.w3schools.com/nodejs/${page}`,
});
const nodeDoc = (title, url) => ({ text: `OpenJS Foundation. (n.d.). ${title}. Node.js.`, url });
const express = (title, url) => ({ text: `Express. (n.d.). ${title}.`, url });
const mdn = (title, url) => ({ text: `MDN Web Docs. (n.d.). ${title}.`, url });
const videoRef = {
  text: 'freeCodeCamp.org. (2018). Learn Node.js - Full tutorial for beginners [Video]. YouTube.',
  url: `https://youtu.be/${VIDEO_ID}`,
};

export const EXTRAS = {
  'node-1': {
    video: video('Introduction'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Your first Node.js program',
        task: 'Change the message so the console prints Hello, Node!',
        starter: "console.log('Hello from Node.js!');",
        expected: ['Hello, Node!'],
        hint: 'Change only the text between the quotes.',
      },
      {
        type: 'quickCheck',
        question: 'Why can Node.js handle many connections at once?',
        options: [
          'It uses an event-driven, non-blocking model',
          'It runs on many computers',
          'It never uses memory',
          'It handles one connection at a time',
        ],
        correct: 0,
        hint: 'Look at the last sentence of the lesson.',
        explanation: 'Node.js does not wait for one task to finish before it starts another.',
      },
    ],
    references: [w3('Node.js introduction', 'nodejs_intro.asp'), nodeDoc('About Node.js', 'https://nodejs.org/en/about'), videoRef],
  },

  'node-2': {
    video: video('Installing Nodejs'),
    activities: [
      {
        type: 'order',
        title: 'Run your first file',
        task: 'Tap the steps in the order you would do them.',
        items: [
          'Install Node.js from nodejs.org',
          'node --version',
          'Save your code in app.js',
          'node app.js',
        ],
        hint: 'Install first, check it works, write the file, then run it.',
        explanation: 'Install, check the version, save your code, then run the file with node.',
      },
      {
        type: 'quickCheck',
        question: 'Which command checks that Node.js is installed?',
        options: ['node --version', 'npm start', 'run node', 'install node'],
        correct: 0,
        hint: 'It asks Node.js for its version number.',
        explanation: 'node --version prints the installed version. If it fails, Node.js is not installed.',
      },
    ],
    references: [w3('Node.js get started', 'nodejs_get_started.asp'), nodeDoc('Download Node.js', 'https://nodejs.org/en/download'), videoRef],
  },

  'node-3': {
    video: video('Node.js vs the browser'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Detect where your code runs',
        task: "Node.js has no document object. Make the program print Running in Node.js when document is not available.",
        starter:
          "if (typeof document === 'undefined') {\n  console.log('???');\n} else {\n  console.log('Running in a browser');\n}",
        expected: ['Running in Node.js'],
        node: {},
        hint: "Replace '???' with 'Running in Node.js'.",
      },
      {
        type: 'quickCheck',
        question: 'Which one is available in Node.js?',
        options: ['document.getElementById', 'window.alert', 'The fs module', 'document.body'],
        correct: 2,
        hint: 'Node.js has no web page, but it can work with files.',
        explanation: 'fs reads and writes files. document and window only exist in a browser.',
      },
    ],
    references: [
      w3('Node.js introduction', 'nodejs_intro.asp'),
      nodeDoc('Node.js differences from the browser', 'https://nodejs.org/en/learn/getting-started/differences-between-nodejs-and-the-browser'),
      videoRef,
    ],
  },

  'node-4': {
    video: video('Modules'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Load a module',
        task: 'A file named math.js is provided. It exports add and multiply. Load it with require and print add(2, 3) and multiply(4, 5).',
        starter: "// math.js (provided) exports { add, multiply }\nconst math = require('./math');\n\n// print add(2, 3) and multiply(4, 5)\n",
        expected: ['5', '20'],
        node: {
          files: {
            './math':
              'function add(a, b) { return a + b; }\nfunction multiply(a, b) { return a * b; }\nmodule.exports = { add, multiply };',
          },
        },
        checks: [/require\(\s*['"]\.\/math['"]\s*\)/],
        hint: 'Try console.log(math.add(2, 3)); and console.log(math.multiply(4, 5));',
      },
      {
        type: 'quickCheck',
        question: 'What does module.exports do?',
        options: [
          'Shares values so other files can require them',
          'Deletes a module',
          'Installs a package',
          'Starts a server',
        ],
        correct: 0,
        hint: 'It is how a file shares its code.',
        explanation: 'Whatever you put in module.exports is what require() gives to other files.',
      },
    ],
    references: [w3('Node.js modules', 'nodejs_modules.asp'), nodeDoc('Modules: CommonJS modules', 'https://nodejs.org/api/modules.html'), videoRef],
  },

  'node-5': {
    video: video('npm / package.json'),
    activities: [
      {
        type: 'order',
        title: 'Set up a project with a start script',
        task: 'Tap the steps in the order you would do them.',
        items: [
          'npm init -y',
          'npm install express',
          'Add "start": "node app.js" to scripts in package.json',
          'npm run start',
        ],
        hint: 'Create package.json, install the package, add the script, then run it.',
        explanation: 'init creates package.json, install adds the package, the script is added, then npm run start runs it.',
      },
      {
        type: 'quickCheck',
        question: 'Which folder holds installed packages and is not committed to Git?',
        options: ['node_modules', 'src', 'public', 'dist'],
        correct: 0,
        hint: 'It is created when you run npm install.',
        explanation: 'node_modules can be recreated with npm install, so it stays out of Git.',
      },
    ],
    references: [
      w3('Node.js npm', 'nodejs_npm.asp'),
      { text: 'npm. (n.d.). About npm. npm Docs.', url: 'https://docs.npmjs.com/about-npm' },
      videoRef,
    ],
  },

  'node-6': {
    video: video('File system'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Write a file, then read it',
        task: "Use fs to write 'Hello file!' to note.txt, then read note.txt and print its text.",
        starter: "const fs = require('fs');\n\n// 1. write 'Hello file!' to note.txt\n// 2. then read note.txt and print the text\n",
        expected: ['Hello file!'],
        node: {},
        checks: [/writeFile/, /readFile/],
        hint: "Call fs.readFile inside the writeFile callback, like the lesson's example.",
      },
      {
        type: 'quickCheck',
        question: 'Why should you handle the error in fs.readFile?',
        options: ['The file may not exist', 'It is slow', 'npm requires it', 'Files are always empty'],
        correct: 0,
        hint: 'Think about reading a file that was never created.',
        explanation: 'If the file is missing, readFile gives you an error instead of the text.',
      },
    ],
    references: [w3('Node.js file system module', 'nodejs_filesystem.asp'), nodeDoc('File system', 'https://nodejs.org/api/fs.html'), videoRef],
  },

  'node-7': {
    video: video('Async / await'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Read a file with await',
        task: 'note.txt already exists. Inside readNote, await fs.readFile in a try block, print the text, and print Could not read file in the catch block.',
        starter:
          "const fs = require('fs/promises');\n\nasync function readNote() {\n  // try { await fs.readFile('note.txt', 'utf8') ... } catch { ... }\n}\n\nreadNote();",
        expected: ['Hello file!'],
        node: { disk: { 'note.txt': 'Hello file!' } },
        checks: [/await/, /try/, /catch/],
        hint: "const data = await fs.readFile('note.txt', 'utf8'); console.log(data);",
      },
      {
        type: 'quickCheck',
        question: 'What does the catch block do in async code?',
        options: [
          'Handles errors thrown while waiting',
          'Makes the code faster',
          'Creates a promise',
          'Closes the file',
        ],
        correct: 0,
        hint: 'It runs when the awaited promise fails.',
        explanation: 'If the awaited promise fails, the code jumps to catch so the program does not crash.',
      },
    ],
    references: [
      w3('Node.js file system module', 'nodejs_filesystem.asp'),
      mdn('async function', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function'),
      videoRef,
    ],
  },

  'node-8': {
    video: video('HTTP / server'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Answer a request',
        task: 'Finish the server so it replies with status 200 and the text Hello World!. The practice server then sends it a sample GET request to /.',
        starter:
          "const http = require('http');\n\nhttp\n  .createServer((req, res) => {\n    // send status 200 and the text Hello World!\n  })\n  .listen(8080);",
        expected: ['Server listening on port 8080', 'GET / -> 200 Hello World!'],
        node: { requests: [{ method: 'GET', path: '/' }] },
        checks: [/res\.end\(/],
        hint: "res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('Hello World!');",
      },
      {
        type: 'quickCheck',
        question: "What does res.end('Hello') do?",
        options: [
          'Sends the body and finishes the response',
          'Starts the server',
          'Reads a file',
          'Closes the terminal',
        ],
        correct: 0,
        hint: 'It is the last step of answering a request.',
        explanation: 'res.end sends the response body and ends the response.',
      },
    ],
    references: [w3('Node.js HTTP module', 'nodejs_http.asp'), nodeDoc('HTTP', 'https://nodejs.org/api/http.html'), videoRef],
  },

  'node-9': {
    video: video('Express'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Add a route',
        task: 'Add a GET route for "/" that sends Hello World!. The practice server then sends two sample requests: / and /about.',
        starter: "const express = require('express');\nconst app = express();\n\n// add a GET route for \"/\" that sends Hello World!\n\napp.listen(8080);",
        expected: ['Server listening on port 8080', 'GET / -> 200 Hello World!', 'GET /about -> 404 Cannot GET /about'],
        node: { requests: [{ method: 'GET', path: '/' }, { method: 'GET', path: '/about' }] },
        checks: [/app\.get\(/],
        hint: "app.get('/', (req, res) => { res.send('Hello World!'); });",
      },
      {
        type: 'quickCheck',
        question: 'Which status code does Express send for a route that does not exist?',
        options: ['200', '404', '201', '500'],
        correct: 1,
        hint: 'You saw it in the console for /about.',
        explanation: '404 means not found.',
      },
    ],
    references: [
      express('Express "Hello world" example', 'https://expressjs.com/en/starter/hello-world.html'),
      express('Routing', 'https://expressjs.com/en/guide/routing.html'),
      videoRef,
    ],
  },

  'node-10': {
    video: video('REST API'),
    activities: [
      {
        type: 'jsRunner',
        title: 'Create data with POST',
        task: 'Add a POST /users route that creates a user from req.body.name and replies with status 201 and the new user. The practice server sends a GET and a POST request.',
        starter:
          "const express = require('express');\nconst app = express();\napp.use(express.json());\n\nconst users = [{ id: 1, name: 'Sam' }];\n\napp.get('/users', (req, res) => res.json(users));\n\n// add a POST /users route here\n\napp.listen(8080);",
        expected: [
          'Server listening on port 8080',
          'GET /users -> 200 [{"id":1,"name":"Sam"}]',
          'POST /users -> 201 {"id":2,"name":"Ana"}',
        ],
        node: {
          requests: [
            { method: 'GET', path: '/users' },
            { method: 'POST', path: '/users', body: { name: 'Ana' } },
          ],
        },
        checks: [/app\.post\(/, /201/],
        hint: "Create { id: users.length + 1, name: req.body.name }, push it, then res.status(201).json(user).",
      },
      {
        type: 'quickCheck',
        question: 'What does express.json() let Express do?',
        options: [
          'Read JSON sent in a request body',
          'Send JSON files',
          'Parse HTML pages',
          'Start the server',
        ],
        correct: 0,
        hint: 'Without it, req.body is empty.',
        explanation: 'express.json() reads JSON from the request body and puts it in req.body.',
      },
    ],
    references: [
      express('Express API reference', 'https://expressjs.com/en/4x/api.html'),
      mdn('HTTP request methods', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods'),
      mdn('HTTP response status codes', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status'),
    ],
  },
};
