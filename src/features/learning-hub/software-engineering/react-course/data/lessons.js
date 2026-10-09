// React lessons. Each lesson's status (completed / in-progress / not-started)
// is derived from saved progress, so it is NOT written here.
// `id` must match the `lessonId` used in questions.js.
export const LESSONS = [
  {
    id: 'react-1',
    title: 'What is React?',
    subtitle: 'Reusable UI components',
    contentTitle: 'A library for building user interfaces',
    description:
      'React is a JavaScript library for building user interfaces. It lets you split a screen into small, reusable pieces called components, so you write each piece once and use it anywhere. React is commonly used to build single-page applications. Before learning React, you should be comfortable with HTML, CSS and JavaScript.',
    code: `function Hello() {
  return <h1>Hello World!</h1>;
}`,
  },
  {
    id: 'react-2',
    title: 'Get started',
    subtitle: 'Create your first app',
    contentTitle: 'Set up a React project',
    description:
      'To start a React project you need Node.js installed. A build tool such as Vite creates the project folder for you, installs the packages, and gives you a development server that refreshes the page as you save. The entry point renders your main component into the root element of the page.',
    code: `npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev`,
  },
  {
    id: 'react-3',
    title: 'JSX',
    subtitle: 'HTML-like syntax in JavaScript',
    contentTitle: 'Write markup inside JavaScript',
    description:
      'JSX lets you write HTML-like code directly in JavaScript. A few rules differ from HTML: use className instead of class, return a single parent element, and close every tag. Put JavaScript expressions inside curly braces to display values.',
    code: `function Greeting() {
  const name = 'Sam';
  return (
    <div className="box">
      <h1>Hello, {name}!</h1>
      <p>2 + 2 = {2 + 2}</p>
    </div>
  );
}`,
  },
  {
    id: 'react-4',
    title: 'Components',
    subtitle: 'Building blocks of a React app',
    contentTitle: 'Break the UI into pieces',
    description:
      'A component is a function that returns JSX. Component names must start with a capital letter, so React can tell them apart from normal HTML tags. You use a component by writing it like a tag, and you can nest components inside each other to build a full page.',
    code: `function Car() {
  return <h2>I am a car!</h2>;
}
 
function Garage() {
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <Car />
    </>
  );
}`,
  },
  {
    id: 'react-5',
    title: 'Props',
    subtitle: 'Pass data to components',
    contentTitle: 'Customize a component with props',
    description:
      'Props are like function arguments for components. A parent passes values as attributes, and the child reads them from the props object. Props make one component reusable with different data. They are read-only, so a component must never change its own props.',
    code: `function Car({ brand }) {
  return <h2>I am a {brand}!</h2>;
}
 
function Garage() {
  return <Car brand="Ford" />;
}`,
  },
  {
    id: 'react-6',
    title: 'Events',
    subtitle: 'Respond to user actions',
    contentTitle: 'Handle clicks and more',
    description:
      'React handles events such as clicks and typing. Event names are written in camelCase, like onClick, and you pass a function to them. Pass the function itself, not the result of calling it, unless you wrap it in an arrow function.',
    code: `function Button() {
  const handleClick = () => {
    alert('Clicked!');
  };
 
  return <button onClick={handleClick}>Click me</button>;
}`,
  },
  {
    id: 'react-7',
    title: 'Conditional rendering',
    subtitle: 'Show different UI',
    contentTitle: 'Render based on a condition',
    description:
      'You can decide what to show based on a condition. The logical && operator shows something only when a condition is true. The ternary operator, condition ? A : B, picks between two options. Both work inside curly braces in JSX.',
    code: `function Status({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn && <p>Welcome back!</p>}
      {isLoggedIn ? <button>Log out</button> : <button>Log in</button>}
    </div>
  );
}`,
  },
  {
    id: 'react-8',
    title: 'Lists and keys',
    subtitle: 'Render arrays with map()',
    contentTitle: 'Show a list of items',
    description:
      'To display a list, use the array map() method to turn each item into JSX. Each item needs a unique key prop so React can track which items changed, were added or were removed. Use a stable id for the key whenever you have one.',
    code: `function CarList() {
  const cars = [
    { id: 1, brand: 'Ford' },
    { id: 2, brand: 'BMW' },
    { id: 3, brand: 'Audi' },
  ];
 
  return (
    <ul>
      {cars.map((car) => (
        <li key={car.id}>{car.brand}</li>
      ))}
    </ul>
  );
}`,
  },
  {
    id: 'react-9',
    title: 'useState',
    subtitle: 'Remember values',
    contentTitle: 'Add state to a component',
    description:
      'State is data that can change over time. The useState hook gives you the current value and a function to update it. When you call the update function, React re-renders the component with the new value. Never change state directly. Always use the setter.',
    code: `import { useState } from 'react';
 
function Counter() {
  const [count, setCount] = useState(0);
 
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
  },
  {
    id: 'react-10',
    title: 'useEffect',
    subtitle: 'Run code after render',
    contentTitle: 'Handle side effects',
    description:
      'The useEffect hook runs code after the component renders. It is used for side effects such as fetching data, timers, or updating the page title. The second argument is a dependency array. An empty array runs the effect once, and listing values runs it again when they change.',
    code: `import { useState, useEffect } from 'react';
 
function Timer() {
  const [seconds, setSeconds] = useState(0);
 
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id); // cleanup
  }, []);
 
  return <p>Seconds: {seconds}</p>;
}`,
  },
];
 