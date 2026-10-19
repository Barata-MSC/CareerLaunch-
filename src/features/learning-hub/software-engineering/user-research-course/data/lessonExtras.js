// Interactive extras for each User Research lesson, matched by lesson id (ids must stay the same).
// lessons.js merges these into the lessons, so the original lesson text is untouched.
//
// HOW VIDEOS WORK
// 1) VIDEOS lists each video. `id` is the YouTube id (the part after v= or youtu.be/).
//    Leave `id` empty until you have checked the video plays inside the app:
//    a lesson with an empty id shows NO video box (no "Video unavailable" error).
// 2) VIDEO_FOR says which video each lesson uses.
//    Each video's APA reference (linking to its Nielsen Norman Group page) is always added.

const VIDEOS = {
  whatIs: {
    id: '',
    title: 'What Is User Research?',
    text: 'Sponheim, C. (2024, July 22). What is user research? [Video]. Nielsen Norman Group.',
    url: 'https://www.nngroup.com/videos/what-is-user-research/',
  },
  methods: {
    id: '',
    title: 'When to Use Which UX Research Method',
    text: 'Pernice, K. (2018, July 27). When to use which UX research method [Video]. Nielsen Norman Group.',
    url: 'https://www.nngroup.com/videos/when-use-which-ux-research-method/',
  },
  qualQuant: {
    id: '',
    title: 'Qualitative vs. Quantitative UX Research',
    text: 'Moran, K. (2020, February 7). Qualitative vs. quantitative UX research [Video]. Nielsen Norman Group.',
    url: 'https://www.nngroup.com/videos/qualitative-vs-quantitative-research/',
  },
  cheatSheet: {
    id: '',
    title: 'UX Research Cheat Sheet',
    text: 'Nielsen Norman Group. (2020, January 10). UX research cheat sheet [Video].',
    url: 'https://www.nngroup.com/videos/ux-research-cheat-sheet/',
  },
  thematic: {
    id: '',
    title: 'Thematic Analysis of Qualitative User Research Data',
    text: 'Nielsen Norman Group. (n.d.). Thematic analysis of qualitative user research data [Video].',
    url: 'https://www.nngroup.com/videos/thematic-analysis-qualitative-user-research-data/',
  },
  empathy: {
    id: '',
    title: 'How to Empathy Map',
    text: 'Nielsen Norman Group. (n.d.). How to empathy map [Video].',
    url: 'https://www.nngroup.com/videos/empathy-map/',
  },
};

// Which video each lesson shows (lessons without a key have no video)
const VIDEO_FOR = {
  'user-research-what-is': 'whatIs',
  'user-research-planning': 'methods',
  'user-research-surveys': 'qualQuant',
  'user-research-observation': 'cheatSheet',
  'user-research-analysis': 'thematic',
  'user-research-empathy-journey': 'empathy',
};

// References are APA 7th style. Article pages show no clear date here, so they use (n.d.).
const nng = (title, slug) => ({
  text: `Nielsen Norman Group. (n.d.). ${title}.`,
  url: `https://www.nngroup.com/articles/${slug}/`,
});
const WHICH = nng('When to use which user-experience research methods', 'which-ux-research-methods');
const FIVE = nng('Why you only need to test with 5 users', 'why-you-only-need-to-test-with-5-users');
const DONT_LISTEN = {
  text: "Nielsen Norman Group. (n.d.). First rule of usability? Don't listen to users.",
  url: 'https://www.nngroup.com/articles/first-rule-of-usability-dont-listen-to-users/',
};
const GUIDE = nng('UX basics: Study guide', 'ux-basics-study-guide');
const IXDF_INTERVIEWS = {
  text: 'Interaction Design Foundation. (n.d.). How to conduct user interviews.',
  url: 'https://www.interaction-design.org/literature/article/how-to-conduct-user-interviews',
};
const JOURNEY_VIDEO = {
  text: 'Nielsen Norman Group. (n.d.). Customer journey mapping 101 [Video].',
  url: 'https://www.nngroup.com/videos/journey-mapping-101/',
};

const BASE = {
  'user-research-what-is': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the research terms',
        task: 'Tap a term on the left, then its meaning on the right.',
        pairs: [
          { left: 'Generative', right: 'Explores needs before designing' },
          { left: 'Evaluative', right: 'Checks whether a design works' },
          { left: 'Qualitative', right: 'Explains why' },
          { left: 'Quantitative', right: 'Measures how many' },
        ],
        hint: 'Think about when each type is used and what it produces.',
        explanation: 'Generative and evaluative describe when you research; qualitative and quantitative describe what data you collect.',
      },
      {
        type: 'quickCheck',
        question: 'A team watches ten people try to check out with a prototype. What kind of research is this?',
        options: [
          'Evaluative and behavioral',
          'Generative and attitudinal',
          'A quantitative survey',
          'Market forecasting',
        ],
        correct: 0,
        hint: 'They are checking an existing design and watching what people do.',
        explanation: 'Testing a design checks whether it works (evaluative), and watching people is behavioral.',
      },
    ],
    references: [WHICH, GUIDE],
  },

  'user-research-planning': {
    activities: [
      {
        type: 'order',
        title: 'Order a research study',
        task: 'Tap the steps in the order a study usually follows.',
        items: [
          'Define the goal',
          'Write research questions',
          'Choose a method',
          'Recruit participants',
          'Run the study',
          'Analyze and share findings',
        ],
        hint: 'You cannot choose a method before you know what you want to learn.',
        explanation: 'Goal first, then questions, then method. Recruiting and running come after the plan is clear.',
      },
      {
        type: 'quickCheck',
        question: 'You want to know WHY shoppers abandon their carts. Which approach fits best?',
        options: [
          'Interviews or usability observation',
          'Page view counts alone',
          'A survey with only yes or no answers',
          'Asking the design team',
        ],
        correct: 0,
        hint: 'Which methods explain reasons rather than only counting?',
        explanation: 'Qualitative methods explain why. Counts show what happened, not the reason behind it.',
      },
    ],
    references: [WHICH],
  },

  'user-research-participants-ethics': {
    activities: [
      {
        type: 'quickCheck',
        question: 'Why should a screener avoid showing which answers qualify?',
        options: [
          'People may answer what they think you want to hear',
          'It makes the form shorter',
          'It stops recordings',
          'It is required by law',
        ],
        correct: 0,
        hint: 'Think about what someone might do to get chosen for a paid study.',
        explanation: 'If the right answers are obvious, people can game the screener and you recruit the wrong participants.',
      },
      {
        type: 'matchPairs',
        title: 'Match the ethics terms',
        task: 'Tap a term, then the best description.',
        pairs: [
          { left: 'Screener', right: 'Checks who fits the study' },
          { left: 'Consent', right: 'Agreement given with full information' },
          { left: 'Incentive', right: 'Thanks for the participant\'s time' },
          { left: 'Anonymize', right: 'Remove names and identifying details' },
        ],
        hint: 'Match each term to what it does in a study.',
        explanation: 'Screeners choose participants, consent protects them, incentives thank them, and anonymizing protects their identity.',
      },
    ],
    references: [FIVE],
  },

  'user-research-interviews': {
    activities: [
      {
        type: 'quickCheck',
        question: 'Which interview question is the best choice?',
        options: [
          'You agree the app is easy to use, right?',
          'Tell me about the last time you booked a trip online.',
          'Would you pay 10 dollars a month for this?',
          'Is the checkout button big enough?',
        ],
        correct: 1,
        hint: 'Look for an open question about something that really happened.',
        explanation: 'It is open-ended and about real past behavior. The others are leading, hypothetical, or closed.',
      },
      {
        type: 'order',
        title: 'Order an interview',
        task: 'Tap the parts of an interview in the order they usually happen.',
        items: [
          'Welcome and explain the purpose',
          'Ask for consent to record',
          'Warm-up questions',
          'Main questions about experiences',
          'Wrap up and thank the participant',
        ],
        hint: 'Build trust and get consent before the main questions.',
        explanation: 'Start with a welcome and consent, ease in with warm-ups, ask the main questions, then close politely.',
      },
    ],
    references: [DONT_LISTEN, IXDF_INTERVIEWS],
  },

  'user-research-surveys': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the question types',
        task: 'Tap a question type, then its description.',
        pairs: [
          { left: 'Closed question', right: 'Fixed answer choices' },
          { left: 'Open question', right: 'Answer in own words' },
          { left: 'Leading question', right: 'Pushes toward one answer' },
          { left: 'Double-barreled', right: 'Asks two things at once' },
        ],
        hint: 'Think about what each type does to the answer you get.',
        explanation: 'Closed and open describe the answer format. Leading and double-barreled are wording problems to avoid.',
      },
      {
        type: 'quickCheck',
        question: 'Which survey question is double-barreled?',
        options: [
          'How easy was checkout?',
          'How often do you shop online?',
          'How easy and fast was checkout?',
          'What would you improve?',
        ],
        correct: 2,
        hint: 'Look for a question that mixes two ideas.',
        explanation: 'It asks about ease and speed together, so one answer cannot describe both.',
      },
    ],
    references: [WHICH],
  },

  'user-research-observation': {
    activities: [
      {
        type: 'quickCheck',
        question: 'A participant says the task was easy, but you watched them struggle for two minutes. What do you do?',
        options: [
          'Report only what they said',
          'Report the behavior and note it differs from what they said',
          'Ignore the session',
          'Ask them to do it again faster',
        ],
        correct: 1,
        hint: 'Behavior and words can disagree, and both are data.',
        explanation: 'Observed behavior is strong evidence. Report it and note the mismatch with their words.',
      },
      {
        type: 'matchPairs',
        title: 'Match observation terms',
        task: 'Tap a term, then what it means.',
        pairs: [
          { left: 'Observation', right: 'What you saw someone do' },
          { left: 'Interpretation', right: 'Your guess about why' },
          { left: 'Think aloud', right: 'Participant speaks thoughts while working' },
          { left: 'Field study', right: 'Research in the user\'s own environment' },
        ],
        hint: 'Keep facts and guesses separate.',
        explanation: 'Record observations as facts first, then interpret them separately.',
      },
    ],
    references: [DONT_LISTEN],
  },

  'user-research-analysis': {
    activities: [
      {
        type: 'order',
        title: 'Order an affinity diagram',
        task: 'Tap the steps in the order you would do them.',
        items: [
          'Collect notes and observations',
          'Write one observation per sticky note',
          'Group similar notes together',
          'Name each group as a theme',
          'Write insights from the themes',
        ],
        hint: 'Themes come from groups, and insights come from themes.',
        explanation: 'You move from raw notes to groups, then themes, then insights.',
      },
      {
        type: 'quickCheck',
        question: 'Only one participant lost their saved work, but it cost them a full day. How should you treat it?',
        options: [
          'It may be important even though it is rare',
          'Ignore it because it is rare',
          'Delete it from the notes',
          'Report only problems everyone had',
        ],
        correct: 0,
        hint: 'Think about severity, not only frequency.',
        explanation: 'Frequency is not importance. A rare problem with serious consequences still deserves attention.',
      },
    ],
    references: [],
  },

  'user-research-personas': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the persona parts',
        task: 'Tap a persona part, then its meaning.',
        pairs: [
          { left: 'Goal', right: 'What the user wants to achieve' },
          { left: 'Pain point', right: 'A frustration in the current experience' },
          { left: 'Context', right: 'Where and when the product is used' },
          { left: 'Behavior', right: 'What the user typically does' },
        ],
        hint: 'Match each part to the question it answers.',
        explanation: 'Goals, pain points, context, and behavior are the parts that guide design decisions.',
      },
      {
        type: 'quickCheck',
        question: 'A persona was written from the team\'s guesses, with no research. What is the main risk?',
        options: [
          'It may become a stereotype that misleads the team',
          'It will be too accurate',
          'It will take too little time',
          'There is no risk',
        ],
        correct: 0,
        hint: 'What happens when design decisions rest on assumptions?',
        explanation: 'Without research, a persona reflects the team\'s assumptions, not real users.',
      },
    ],
    references: [],
  },

  'user-research-empathy-journey': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the empathy map areas',
        task: 'Tap an area, then what belongs in it.',
        pairs: [
          { left: 'Says', right: 'A quote from an interview' },
          { left: 'Thinks', right: 'Thoughts the user may not say aloud' },
          { left: 'Does', right: 'Actions you observed' },
          { left: 'Feels', right: 'Emotions like worry or delight' },
        ],
        hint: 'Quotes go under Says; observed actions go under Does.',
        explanation: 'The four areas separate spoken words, private thoughts, behavior, and emotion.',
      },
      {
        type: 'order',
        title: 'Order a food delivery journey',
        task: 'Tap the stages in the order a customer experiences them.',
        items: [
          'Discover the app',
          'Choose items',
          'Check out',
          'Wait for delivery',
          'Receive the order',
        ],
        hint: 'Follow the customer from first contact to the end.',
        explanation: 'A journey map lays out stages in time order so you can see where emotions rise and fall.',
      },
    ],
    references: [JOURNEY_VIDEO],
  },

  'user-research-sharing': {
    activities: [
      {
        type: 'quickCheck',
        question: 'Which statement is an insight, not just an observation?',
        options: [
          'Five people took part',
          'The session lasted 30 minutes',
          'Users miss the Save button because it blends into the page',
          'The study ran in March',
        ],
        correct: 2,
        hint: 'An insight explains why something matters for the design.',
        explanation: 'It explains a cause and points to a design change. The others are only facts about the study.',
      },
      {
        type: 'matchPairs',
        title: 'Match the reporting terms',
        task: 'Tap a term, then its role in a report.',
        pairs: [
          { left: 'Observation', right: 'What happened' },
          { left: 'Insight', right: 'Why it matters' },
          { left: 'Recommendation', right: 'What to change' },
          { left: 'How might we', right: 'Turns a problem into an opportunity' },
        ],
        hint: 'Move from what happened to what to do about it.',
        explanation: 'Good reports connect observations to insights, then to recommendations the team can act on.',
      },
    ],
    references: [],
  },
};

const videoRef = (v) => ({ text: v.text, url: v.url });

export const EXTRAS = Object.fromEntries(
  Object.entries(BASE).map(([lessonId, extra]) => {
    const v = VIDEOS[VIDEO_FOR[lessonId]];
    const result = {
      ...extra,
      references: [...(extra.references ?? []), ...(v ? [videoRef(v)] : [])],
    };
    // Only show the player when a checked YouTube id has been filled in
    if (v?.id) {
      result.video = { id: v.id, start: 0, title: v.title, channel: 'Nielsen Norman Group' };
    }
    return [lessonId, result];
  }),
);
