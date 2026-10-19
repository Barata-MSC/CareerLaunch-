// Interactive extras for each Wireframing lesson, matched by lesson id (ids must stay the same).
// lessons.js merges these into the lessons, so the original lesson text is untouched.
// No videos yet: a lesson without a `video` field simply shows no video box.
// To add one later, set `video: { id, start: 0, title, channel }` on that lesson after testing
// that https://www.youtube.com/embed/<id> plays.

// References are APA 7th style. These pages show no clear author or date here, so they use (n.d.).
const JUSTINMIND = {
  text: "Justinmind. (n.d.). Low fidelity vs high fidelity wireframes: What's the difference?",
  url: 'https://www.justinmind.com/blog/low-fidelity-vs-high-fidelity-wireframing-is-paper-dead/',
};
const UXPIN = {
  text: 'UXPin. (n.d.). High-fidelity vs. low-fidelity prototyping: When to use each.',
  url: 'https://www.uxpin.com/studio/blog/high-fidelity-prototyping-low-fidelity-difference/',
};
const HUBSPOT = {
  text: 'HubSpot. (n.d.). The differences in wireframe fidelity: From low to high fidelity wireframes.',
  url: 'https://blog.hubspot.com/website/high-fidelity-wireframe',
};

export const EXTRAS = {
  'wireframing-what-is': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the design stages',
        task: 'Tap a stage on the left, then what it is on the right.',
        pairs: [
          { left: 'Sketch', right: 'Quick hand-drawn idea' },
          { left: 'Wireframe', right: 'Layout and structure' },
          { left: 'Mockup', right: 'Static visual design' },
          { left: 'Prototype', right: 'Clickable simulation' },
        ],
        hint: 'Think about how much detail and interaction each stage has.',
        explanation: 'Each stage adds more: sketches are rough, wireframes show structure, mockups add visuals, prototypes add interaction.',
      },
      {
        type: 'quickCheck',
        question: 'Why are early wireframes usually low-fidelity?',
        options: [
          'They are fast to make and easy to change',
          'They look more impressive',
          'They must use final colors',
          'Developers require them',
        ],
        correct: 0,
        hint: 'Think about the cost of changing an idea.',
        explanation: 'Low-fidelity work is quick and cheap, so you can explore and change ideas without losing effort.',
      },
    ],
    references: [JUSTINMIND, HUBSPOT],
  },

  'wireframing-sketching': {
    activities: [
      {
        type: 'order',
        title: 'Order a sketching session',
        task: 'Tap the steps in the order you would do them.',
        items: [
          'List the screens you need',
          'Sketch several quick ideas',
          'Pick the strongest idea',
          'Refine it into a cleaner layout',
          'Get feedback',
        ],
        hint: 'Explore many ideas before polishing one.',
        explanation: 'Explore several options first, choose one, refine it, then check it with others.',
      },
      {
        type: 'quickCheck',
        question: 'You finish one sketch of a screen and have a new idea. What is the best next step?',
        options: [
          'Sketch another version quickly',
          'Polish the first sketch for hours',
          'Skip sketching and start coding',
          'Pick the final colors',
        ],
        correct: 0,
        hint: 'Sketching is for exploring, not perfecting.',
        explanation: 'Quick extra versions help you compare options cheaply before you commit to one.',
      },
    ],
    references: [HUBSPOT],
  },

  'wireframing-information-architecture': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the IA terms',
        task: 'Tap a term, then its meaning.',
        pairs: [
          { left: 'Information architecture', right: 'How content is organized and labeled' },
          { left: 'Sitemap', right: 'Diagram of screens and hierarchy' },
          { left: 'Card sorting', right: 'Users group content in their own way' },
          { left: 'Navigation label', right: 'The word users read to choose where to go' },
        ],
        hint: 'Think about what each tool shows you.',
        explanation: 'IA is the overall structure; sitemaps, card sorting, and labels are the tools and parts that shape it.',
      },
      {
        type: 'quickCheck',
        question: 'In a card sorting study, what do participants do?',
        options: [
          'Group content cards in ways that make sense to them',
          'Rate the colors of a design',
          'Write the code for the app',
          'Approve the final design',
        ],
        correct: 0,
        hint: 'The goal is to learn how users think about your content.',
        explanation: 'Participants group cards in their own way, which shows the mental model your IA should match.',
      },
    ],
    references: [],
  },

  'wireframing-user-flows': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the flowchart shapes',
        task: 'Tap a shape, then what it means in a user flow.',
        pairs: [
          { left: 'Oval', right: 'Start or end of the flow' },
          { left: 'Rectangle', right: 'A screen or step' },
          { left: 'Diamond', right: 'A decision with different paths' },
          { left: 'Arrow', right: 'Direction to the next step' },
        ],
        hint: 'Decisions are the shapes that branch.',
        explanation: 'These four shapes are enough to describe most simple user flows.',
      },
      {
        type: 'quickCheck',
        question: 'Which flow shape would you use for the question "Is the password correct?"',
        options: ['Diamond', 'Oval', 'Rectangle', 'Arrow'],
        correct: 0,
        hint: 'It has a yes path and a no path.',
        explanation: 'A decision with yes or no outcomes is drawn as a diamond.',
      },
    ],
    references: [],
  },

  'wireframing-layout': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the layout terms',
        task: 'Tap a term, then its meaning.',
        pairs: [
          { left: 'Grid', right: 'Columns that keep elements aligned' },
          { left: 'White space', right: 'Empty room that groups and separates' },
          { left: 'Hierarchy', right: 'What users notice first' },
          { left: 'Proximity', right: 'Related items placed close together' },
        ],
        hint: 'Match each term to the problem it solves.',
        explanation: 'Grids, white space, hierarchy, and proximity work together to make a screen clear.',
      },
      {
        type: 'quickCheck',
        question: 'Where should the most important content and action usually go on a wireframe?',
        options: [
          'Where eyes land first, with the most prominence',
          'Hidden at the bottom',
          'Wherever there is space left',
          'In the footer',
        ],
        correct: 0,
        hint: 'Think about what you want users to see first.',
        explanation: 'Give the most important items the best position and the most size so they are noticed first.',
      },
    ],
    references: [],
  },

  'wireframing-components': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the components',
        task: 'Tap a component, then what it does.',
        pairs: [
          { left: 'Tab bar', right: 'Switches between main sections' },
          { left: 'Card', right: 'Groups related info in one block' },
          { left: 'Form field', right: 'Where users type input' },
          { left: 'Button', right: 'Triggers an action' },
        ],
        hint: 'Think about where you have seen each one in an app.',
        explanation: 'These building blocks appear in most mobile apps, and users already know how they work.',
      },
      {
        type: 'quickCheck',
        question: 'How many primary buttons should a screen usually have?',
        options: ['One', 'As many as possible', 'None', 'At least five'],
        correct: 0,
        hint: 'If every button is the main one, none stands out.',
        explanation: 'One clear primary action keeps the screen focused and easy to understand.',
      },
    ],
    references: [],
  },

  'wireframing-mobile': {
    activities: [
      {
        type: 'order',
        title: 'Order a mobile screen design',
        task: 'Tap the steps in a sensible order.',
        items: [
          'Decide the main goal of the screen',
          'Place the primary action within thumb reach',
          'Add supporting content',
          'Check tap target sizes',
          'Test on a real phone',
        ],
        hint: 'Start with the goal, finish with a real test.',
        explanation: 'Goal first, then placement and details, then verification on a real device.',
      },
      {
        type: 'quickCheck',
        question: 'What is a good minimum size for a tap target on a phone?',
        options: [
          'About 44 by 44 points',
          'About 10 by 10 points',
          'About 20 by 20 points',
          'Size does not matter',
        ],
        correct: 0,
        hint: 'Think about the size of a fingertip.',
        explanation: 'Targets of about 44 by 44 points or larger are easier to tap accurately.',
      },
    ],
    references: [],
  },

  'wireframing-annotations-states': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the screen states',
        task: 'Tap a state, then when it appears.',
        pairs: [
          { left: 'Empty state', right: 'No data yet' },
          { left: 'Loading state', right: 'Content is on the way' },
          { left: 'Error state', right: 'Something went wrong' },
          { left: 'Annotation', right: 'A note that explains behavior' },
        ],
        hint: 'Think about what users see in each situation.',
        explanation: 'Designing every state, not only the happy path, prevents confusing moments for users.',
      },
      {
        type: 'quickCheck',
        question: 'Why use realistic content instead of placeholder text in a wireframe?',
        options: [
          'It reveals layout problems, like long names, early',
          'It is required by law',
          'It makes the wireframe colorful',
          'It is always faster',
        ],
        correct: 0,
        hint: 'Real text has real lengths.',
        explanation: 'Real content shows how a layout holds up, such as when a long title breaks a card.',
      },
    ],
    references: [],
  },

  'wireframing-testing': {
    activities: [
      {
        type: 'order',
        title: 'Order a wireframe test',
        task: 'Tap the steps in the order you would run a test.',
        items: [
          'Define what you want to test',
          'Prepare a paper or clickable wireframe',
          'Ask participants to try realistic tasks',
          'Observe where they hesitate',
          'Revise the wireframe',
        ],
        hint: 'Decide what to learn before you show anything.',
        explanation: 'Plan the test, prepare materials, run tasks, observe, and then improve the design.',
      },
      {
        type: 'quickCheck',
        question: 'In a five-second test, what do you ask after showing the screen?',
        options: [
          'What do you remember, and what was the screen for?',
          'Which color do you like best?',
          'Can you fix the layout?',
          'How many seconds was it?',
        ],
        correct: 0,
        hint: 'The goal is to see if the main message came through.',
        explanation: 'Asking what people remember shows whether the screen communicates its purpose quickly.',
      },
    ],
    references: [UXPIN],
  },

  'wireframing-handoff': {
    activities: [
      {
        type: 'quickCheck',
        question: 'When is a wireframe ready to become a high-fidelity design?',
        options: [
          'When the structure and flow have been checked with feedback',
          'As soon as the first sketch is done',
          'Before any user sees it',
          'Only when colors are chosen',
        ],
        correct: 0,
        hint: 'Polish is wasted if the structure is wrong.',
        explanation: 'Validate structure and flow first. Visual polish comes after the foundation works.',
      },
      {
        type: 'matchPairs',
        title: 'Match the handoff habits',
        task: 'Tap a habit, then why it helps.',
        pairs: [
          { left: 'Clear naming', right: 'Screens and layers are easy to find' },
          { left: 'Versioning', right: 'You can see and undo changes' },
          { left: 'Critique', right: 'Structured feedback on a design' },
          { left: 'Handoff notes', right: 'Intent and rules passed to the next person' },
        ],
        hint: 'Each habit saves someone time later.',
        explanation: 'Good habits keep work organized and make it easy for others to continue.',
      },
    ],
    references: [UXPIN, JUSTINMIND],
  },
};
