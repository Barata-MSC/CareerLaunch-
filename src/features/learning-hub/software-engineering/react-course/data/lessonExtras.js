

const VIDEO_ID = 'CgkZ7MvWUAA'; // Bro Code: React Full Course for free

const video = (chapter, start = 0) => ({
  id: VIDEO_ID,
  start,
  chapter,
  title: 'React Full Course for free',
  channel: 'Bro Code',
});

// References are in APA 7th style (LessonReferences shows text + link)
const w3 = (title, page) => ({
  text: `W3Schools. (n.d.). ${title}.`,
  url: `https://www.w3schools.com/react/${page}`,
});
const doc = (title, path) => ({
  text: `Meta Open Source. (n.d.). ${title}. React.`,
  url: `https://react.dev/${path}`,
});
const videoRef = {
  text: 'Bro Code. (2024). React full course for free [Video]. YouTube.',
  url: `https://youtu.be/${VIDEO_ID}`,
};

export const EXTRAS = {
  'react-1': {
    video: video('Introduction'),
    activities: [
      {
        type: 'reactRunner',
        title: 'Your first component',
        task: 'Change the heading so the component shows Hello React! (useState and useEffect are already available.)',
        goal: 'The preview shows: Hello React!',
        starter: 'function App() {\n  return <h1>Hello World!</h1>;\n}',
        expectText: 'Hello React!',
        hint: 'Change only the text inside the <h1> tag.',
      },
      {
        type: 'quickCheck',
        question: 'What is a component?',
        options: ['A reusable piece of the UI', 'A CSS file', 'A database table', 'A web server'],
        correct: 0,
        hint: 'Think of it as a building block you can use many times.',
        explanation: 'A component is a small, reusable piece of the screen.',
      },
    ],
    references: [w3('React introduction', 'react_intro.asp'), doc('Quick start', 'learn'), videoRef],
  },

  'react-2': {
    video: video('Setup / Vite'),
    activities: [
      {
        type: 'order',
        title: 'Create and run a project',
        task: 'Tap the commands in the order you would run them.',
        items: [
          'npm create vite@latest my-app -- --template react',
          'cd my-app',
          'npm install',
          'npm run dev',
        ],
        hint: 'Create the project, go into its folder, install packages, then start the server.',
        explanation: 'Create, enter the folder, install, then start the development server.',
      },
      {
        type: 'quickCheck',
        question: 'What does npm run dev start?',
        options: [
          'A development server that refreshes as you save',
          'A production build',
          'A database',
          'A test suite',
        ],
        correct: 0,
        hint: 'It is the command you use while you are still building the app.',
        explanation: 'The Vite dev server shows your app and refreshes the page when you save.',
      },
    ],
    references: [w3('Get started with React', 'react_getstarted.asp'), doc('Installation', 'learn/installation'), videoRef],
  },

  'react-3': {
    video: video('JSX'),
    activities: [
      {
        type: 'reactRunner',
        title: 'Fix the JSX',
        task: 'Two JSX mistakes are hiding here. Fix them so the preview shows Hello, Sam!',
        goal: 'The preview shows: Hello, Sam!',
        starter:
          "function App() {\n  const name = 'Sam';\n\n  return (\n    <div class=\"box\">\n      <h1>Hello, name!</h1>\n    </div>\n  );\n}",
        expectText: 'Hello, Sam!',
        checks: [/className\s*=/],
        hint: 'Use className instead of class, and show the variable with curly braces: {name}.',
      },
      {
        type: 'quickCheck',
        question: 'What does {2 + 2} show inside JSX?',
        options: ['2 + 2', '4', '{4}', 'An error'],
        correct: 1,
        hint: 'Curly braces run JavaScript.',
        explanation: 'Curly braces evaluate the expression, so JSX shows 4.',
      },
    ],
    references: [w3('React JSX', 'react_jsx.asp'), doc('Writing markup with JSX', 'learn/writing-markup-with-jsx'), videoRef],
  },

  'react-4': {
    video: video('Components'),
    activities: [
      {
        type: 'reactRunner',
        title: 'Reuse a component',
        task: 'Show the Car component twice inside App.',
        goal: 'The preview shows "I am a car!" two times.',
        starter:
          'function Car() {\n  return <h2>I am a car!</h2>;\n}\n\nfunction App() {\n  return (\n    <>\n      <h1>My garage</h1>\n      <Car />\n    </>\n  );\n}',
        expectText: /car!.*car!/i,
        checks: [/<Car\s*\/>[\s\S]*<Car\s*\/>/],
        hint: 'Write <Car /> a second time under the first one.',
      },
      {
        type: 'quickCheck',
        question: 'How do you use a component named Car inside another component?',
        options: ['Car()', '<Car />', '{Car}', 'new Car'],
        correct: 1,
        hint: 'You write it like an HTML tag.',
        explanation: 'Components are used like tags: <Car />.',
      },
    ],
    references: [w3('React components', 'react_components.asp'), doc('Your first component', 'learn/your-first-component'), videoRef],
  },

  'react-5': {
    video: video('Props'),
    activities: [
      {
        type: 'reactRunner',
        title: 'Pass a prop',
        task: 'Car shows its brand, but App forgot to give it one. Pass the brand Toyota.',
        goal: 'The preview shows: I am a Toyota!',
        starter: 'function Car({ brand }) {\n  return <h2>I am a {brand}!</h2>;\n}\n\nfunction App() {\n  return <Car />;\n}',
        expectText: 'I am a Toyota!',
        checks: [/brand\s*=\s*["']Toyota["']/],
        hint: 'Write <Car brand="Toyota" />.',
      },
      {
        type: 'quickCheck',
        question: 'Can a child component change its own props?',
        options: ['Yes, any time', 'No, props are read-only', 'Only with CSS', 'Only inside lists'],
        correct: 1,
        hint: 'Props come from the parent.',
        explanation: 'Props are read-only. A component must never change its own props.',
      },
    ],
    references: [w3('React props', 'react_props.asp'), doc('Passing props to a component', 'learn/passing-props-to-a-component'), videoRef],
  },

  'react-6': {
    video: video('Events'),
    activities: [
      {
        type: 'reactRunner',
        title: 'Handle a click',
        task: "Make the button change the message to Clicked! when it is pressed. Tap the button in the preview to try it.",
        goal: 'Starts as "Not clicked". After pressing the button it shows "Clicked!"',
        starter:
          "function App() {\n  const [message, setMessage] = useState('Not clicked');\n\n  return (\n    <div>\n      <p>{message}</p>\n      <button>Click me</button>\n    </div>\n  );\n}",
        expectText: 'Not clicked',
        click: { selector: 'button', expectText: 'Clicked!' },
        checks: [/onClick/],
        hint: "Add onClick={() => setMessage('Clicked!')} to the button.",
      },
      {
        type: 'quickCheck',
        question: 'What is wrong with <button onClick={handleClick()}>?',
        options: [
          'It calls the function while rendering instead of on click',
          'Nothing is wrong',
          'onClick must be lowercase',
          'It needs quotes',
        ],
        correct: 0,
        hint: 'Look at the parentheses after handleClick.',
        explanation: 'Pass the function itself (handleClick), not the result of calling it.',
      },
    ],
    references: [w3('React events', 'react_events.asp'), doc('Responding to events', 'learn/responding-to-events'), videoRef],
  },

  'react-7': {
    video: video('Conditional rendering'),
    activities: [
      {
        type: 'reactRunner',
        title: 'Show different UI',
        task: 'Use a ternary (condition ? A : B) so the page shows Welcome back! when isLoggedIn is true, and Please log in when it is false.',
        goal: 'With isLoggedIn = true, the preview shows: Welcome back!',
        starter:
          'function App() {\n  const isLoggedIn = true;\n\n  return (\n    <div>\n      <p>Please log in</p>\n    </div>\n  );\n}',
        expectText: 'Welcome back!',
        checks: [/\?[\s\S]*:/],
        hint: "Try {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in</p>}",
      },
      {
        type: 'quickCheck',
        question: 'What does {isLoggedIn && <p>Hi</p>} show when isLoggedIn is false?',
        options: ['Hi', 'Nothing', 'The word false', 'An error'],
        correct: 1,
        hint: 'The && stops when the left side is false.',
        explanation: 'When the condition is false, React renders nothing.',
      },
    ],
    references: [
      w3('React conditional rendering', 'react_conditional_rendering.asp'),
      doc('Conditional rendering', 'learn/conditional-rendering'),
      videoRef,
    ],
  },

  'react-8': {
    video: video('Lists and keys'),
    activities: [
      {
        type: 'reactRunner',
        title: 'Render a list',
        task: 'Use map() to show each car as an <li> with a key.',
        goal: 'The preview shows a list: Ford, BMW, Audi',
        starter:
          "function App() {\n  const cars = ['Ford', 'BMW', 'Audi'];\n\n  return (\n    <ul>\n      {/* render each car as an <li> here */}\n    </ul>\n  );\n}",
        expectText: /Ford.*BMW.*Audi/,
        checks: [/\.map\(/, /key\s*=/],
        hint: 'Try {cars.map((car) => <li key={car}>{car}</li>)}',
      },
      {
        type: 'quickCheck',
        question: 'What is the best key when every item has a unique id?',
        options: ['The array index, always', 'The item id', 'Math.random()', 'No key at all'],
        correct: 1,
        hint: 'The key should stay the same for the same item.',
        explanation: 'A stable, unique id lets React track each item correctly.',
      },
    ],
    references: [w3('React lists', 'react_lists.asp'), doc('Rendering lists', 'learn/rendering-lists'), videoRef],
  },

  'react-9': {
    video: video('useState'),
    activities: [
      {
        type: 'reactRunner',
        title: 'Fix the counter',
        task: 'This counter never goes up. Fix it so every click adds 1, then tap the button in the preview.',
        goal: 'Starts as "Clicked 0 times". After one press it shows "Clicked 1 times".',
        starter:
          'function App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <button onClick={() => setCount(count)}>\n      Clicked {count} times\n    </button>\n  );\n}',
        expectText: /Clicked 0 times/,
        click: { selector: 'button', expectText: /Clicked 1 times/ },
        hint: 'Call setCount(count + 1) so the new value is different.',
      },
      {
        type: 'quickCheck',
        question: 'What happens when you call setCount(count + 1)?',
        options: [
          'count changes immediately on the same line',
          'React re-renders with the new value',
          'The page reloads',
          'Nothing',
        ],
        correct: 1,
        hint: 'Setting state tells React to draw the component again.',
        explanation: 'The setter schedules a re-render, and the component runs again with the new value.',
      },
    ],
    references: [w3('React useState hook', 'react_usestate.asp'), doc('useState', 'reference/react/useState'), videoRef],
  },

  'react-10': {
    video: video('useEffect'),
    activities: [
      {
        type: 'reactRunner',
        title: 'Run code after render',
        task: "Use useEffect with an empty dependency array [] to change the message from Loading... to Loaded! after the first render.",
        goal: 'The preview ends up showing: Loaded!',
        starter:
          "function App() {\n  const [message, setMessage] = useState('Loading...');\n\n  // TODO: add a useEffect here\n\n  return <p>{message}</p>;\n}",
        expectText: 'Loaded!',
        checks: [/useEffect\(/, /\[\s*\]/],
        hint: "useEffect(() => { setMessage('Loaded!'); }, []);",
      },
      {
        type: 'quickCheck',
        question: 'When does an effect with [count] as its dependency array run?',
        options: [
          'Only once',
          'After the first render and again whenever count changes',
          'Never',
          'Before every render',
        ],
        correct: 1,
        hint: 'The array lists the values the effect watches.',
        explanation: 'The effect runs after the first render, then again each time count changes.',
      },
    ],
    references: [w3('React useEffect hook', 'react_useeffect.asp'), doc('useEffect', 'reference/react/useEffect'), videoRef],
  },
};
