// Interactive extras for each Usability Testing lesson, matched by lesson id (ids must stay the same).
// lessons.js merges these into the lessons, so the original lesson text is untouched.
// No videos yet: a lesson without a `video` field simply shows no video box.
// To add one later, set `video: { id, start: 0, title, channel }` on that lesson after testing
// that https://www.youtube.com/embed/<id> plays.

// References are APA 7th style. Article pages show no clear author or date here, so they use (n.d.).
const nng = (title, slug) => ({
  text: `Nielsen Norman Group. (n.d.). ${title}.`,
  url: `https://www.nngroup.com/articles/${slug}/`,
});
const UT101 = nng('Usability (user) testing 101', 'usability-testing-101');
const FIVE = nng('Why you only need to test with 5 users', 'why-you-only-need-to-test-with-5-users');
const HOW_MANY = nng('How many test users in a usability study?', 'how-many-test-users');
const HEURISTICS = nng('10 usability heuristics for user interface design', 'ten-usability-heuristics');
const VIDEO_TESTING = {
  text: 'Nielsen, J. (n.d.). User testing: Why & how [Video]. Nielsen Norman Group.',
  url: 'https://www.nngroup.com/videos/user-testing-jakob-nielsen/',
};
const VIDEO_HEURISTIC = {
  text: 'Nielsen, J. (n.d.). Heuristic evaluation of user interfaces [Video]. Nielsen Norman Group.',
  url: 'https://www.nngroup.com/videos/heuristic-evaluation/',
};

export const EXTRAS = {
  'usability-testing-what-is': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the usability qualities',
        task: 'Tap a quality on the left, then what it means on the right.',
        pairs: [
          { left: 'Learnability', right: 'How easy first-time tasks are' },
          { left: 'Efficiency', right: 'How quickly tasks get done' },
          { left: 'Memorability', right: 'How easily users return after a break' },
          { left: 'Errors', right: 'How many mistakes users make' },
        ],
        hint: 'Think about when in the user journey each quality matters.',
        explanation: 'Usability is made of several qualities. A design can be strong in one and weak in another.',
      },
      {
        type: 'quickCheck',
        question: 'Which best describes usability testing?',
        options: [
          'Watching real users try tasks with a product or prototype',
          'Asking users which color they like',
          'Counting page views',
          'Reviewing the source code',
        ],
        correct: 0,
        hint: 'The key words are real users and tasks.',
        explanation: 'Usability testing observes real behavior while people try realistic tasks.',
      },
    ],
    references: [UT101, VIDEO_TESTING],
  },

  'usability-testing-types': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the test types',
        task: 'Tap a test type, then its description.',
        pairs: [
          { left: 'Moderated', right: 'A facilitator guides the session live' },
          { left: 'Unmoderated', right: 'Participants work on their own' },
          { left: 'Formative', right: 'Finds problems to fix during design' },
          { left: 'Summative', right: 'Measures performance against a benchmark' },
        ],
        hint: 'Two types are about who runs the session, two are about the goal.',
        explanation: 'Moderated and unmoderated describe the format. Formative and summative describe the purpose.',
      },
      {
        type: 'quickCheck',
        question: 'You want to find problems in an early prototype so you can fix them. Which type of test fits?',
        options: [
          'Formative testing',
          'Summative benchmarking',
          'Market sizing',
          'A code review',
        ],
        correct: 0,
        hint: 'You are still shaping the design.',
        explanation: 'Formative tests happen during design and focus on finding problems to fix.',
      },
    ],
    references: [UT101],
  },

  'usability-testing-planning': {
    activities: [
      {
        type: 'order',
        title: 'Order the test preparation',
        task: 'Tap the steps in the order you would do them.',
        items: [
          'Set the test goals',
          'Choose tasks and metrics',
          'Prepare the prototype and script',
          'Recruit participants',
          'Run a pilot test',
          'Run the sessions',
        ],
        hint: 'Goals come first, and a pilot comes right before the real sessions.',
        explanation: 'Plan the goals, prepare materials, recruit, pilot, then run the real sessions.',
      },
      {
        type: 'quickCheck',
        question: 'Why should you run a pilot test first?',
        options: [
          'To catch problems with the tasks, script, and prototype',
          'To replace the real test',
          'To recruit more people',
          'To skip writing the script',
        ],
        correct: 0,
        hint: 'A pilot tests the test.',
        explanation: 'A pilot reveals broken links, unclear tasks, and timing problems before real participants arrive.',
      },
    ],
    references: [UT101],
  },

  'usability-testing-tasks': {
    activities: [
      {
        type: 'quickCheck',
        question: 'Which task is best written for a usability test?',
        options: [
          'Click the Orders tab in the top menu.',
          'You bought shoes last week. Find out when they will arrive.',
          'Test the navigation.',
          'Do you like the Orders page?',
        ],
        correct: 1,
        hint: 'Look for a realistic goal that does not name a button.',
        explanation: 'It gives a real goal and context without revealing where to click.',
      },
      {
        type: 'matchPairs',
        title: 'Match the task terms',
        task: 'Tap a term, then its meaning.',
        pairs: [
          { left: 'Scenario', right: 'Short story that gives context' },
          { left: 'Leading task', right: 'Hints where to click' },
          { left: 'Success criteria', right: 'Defines what counts as done' },
          { left: 'Realistic task', right: 'A goal in the user\'s own words' },
        ],
        hint: 'Which term describes something to avoid?',
        explanation: 'Good tasks use scenarios and clear success criteria, and avoid leading the participant.',
      },
    ],
    references: [UT101],
  },

  'usability-testing-participants': {
    activities: [
      {
        type: 'quickCheck',
        question: 'Which recruiting choice gives the most useful results?',
        options: [
          'People who match your real users',
          'Only your teammates',
          'Only your friends',
          'Anyone who is nearby',
        ],
        correct: 0,
        hint: 'Think about who will really use the product.',
        explanation: 'Results are only useful when participants resemble the real users of the product.',
      },
      {
        type: 'quickCheck',
        question: 'You found problems in round one with 5 users and fixed them. What is the best next step?',
        options: [
          'Test again with new participants',
          'Launch without testing',
          'Re-test with the same 5 users only',
          'Wait one year',
        ],
        correct: 0,
        hint: 'Several small rounds beat one big round.',
        explanation: 'New participants confirm the fixes worked and can reveal problems the first group did not hit.',
      },
    ],
    references: [FIVE, HOW_MANY],
  },

  'usability-testing-facilitating': {
    activities: [
      {
        type: 'order',
        title: 'Order a test session',
        task: 'Tap the parts of a session in the order they usually happen.',
        items: [
          'Welcome and explain the session',
          'Ask for consent to record',
          'Explain thinking aloud',
          'Give tasks one at a time',
          'Ask follow-up questions',
          'Thank the participant',
        ],
        hint: 'Build comfort and get consent before the tasks.',
        explanation: 'Start with a welcome and consent, explain think-aloud, run the tasks, ask follow-ups, then close.',
      },
      {
        type: 'quickCheck',
        question: 'A participant is stuck on a task. What should the facilitator do?',
        options: [
          'Stay neutral, ask what they are thinking, and let them try',
          'Tell them where to click',
          'End the session',
          'Complete the task for them',
        ],
        correct: 0,
        hint: 'Struggling is useful information.',
        explanation: 'Neutral prompts keep the test honest. Step in only if they are truly stuck, and note it.',
      },
    ],
    references: [UT101, VIDEO_TESTING],
  },

  'usability-testing-observing': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the usability metrics',
        task: 'Tap a metric, then what it measures.',
        pairs: [
          { left: 'Task success rate', right: 'Share of people who finish a task' },
          { left: 'Time on task', right: 'How long a task takes' },
          { left: 'Error rate', right: 'How often people make mistakes' },
          { left: 'SUS', right: 'A 10-question satisfaction survey' },
        ],
        hint: 'Match each metric to the question it answers.',
        explanation: 'Success, time, and errors measure performance. SUS measures how satisfied users feel.',
      },
      {
        type: 'quickCheck',
        question: 'Eight of ten participants complete a task. What is the task success rate?',
        options: ['80 percent', '8 percent', '20 percent', '10 percent'],
        correct: 0,
        hint: 'Divide completed by attempts.',
        explanation: '8 divided by 10 is 0.8, or 80 percent.',
      },
    ],
    references: [UT101],
  },

  'usability-testing-heuristic-evaluation': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the heuristics',
        task: 'Tap a heuristic, then its meaning.',
        pairs: [
          { left: 'Visibility of system status', right: 'Keep users informed with feedback' },
          { left: 'User control and freedom', right: 'Provide undo and clear exits' },
          { left: 'Error prevention', right: 'Stop problems before they happen' },
          { left: 'Recognition over recall', right: 'Make options visible, not memorized' },
        ],
        hint: 'Think about the example for each, such as a spinner or an Undo button.',
        explanation: 'These are four of Nielsen\'s ten heuristics. Each describes a rule of thumb for usable interfaces.',
      },
      {
        type: 'quickCheck',
        question: 'What is a heuristic evaluation?',
        options: [
          'Experts judge an interface against usability principles',
          'Users score the design in a survey',
          'Developers review the code',
          'A marketing test',
        ],
        correct: 0,
        hint: 'The evaluators are experts, not typical users.',
        explanation: 'Evaluators inspect the design and note which heuristics it violates.',
      },
    ],
    references: [HEURISTICS, VIDEO_HEURISTIC],
  },

  'usability-testing-analysis': {
    activities: [
      {
        type: 'matchPairs',
        title: 'Match the severity factors',
        task: 'Tap a factor, then what it describes.',
        pairs: [
          { left: 'Frequency', right: 'How many users hit the problem' },
          { left: 'Impact', right: 'How hard it is to overcome' },
          { left: 'Persistence', right: 'Whether users keep struggling with it' },
          { left: 'Severity', right: 'Overall priority of the problem' },
        ],
        hint: 'Severity is the result of the other three.',
        explanation: 'Frequency, impact, and persistence combine to show how serious a problem is.',
      },
      {
        type: 'quickCheck',
        question: 'Four of five participants could not find the Checkout button and gave up. How should you rate it?',
        options: [
          'High priority, because it blocks a key task for many users',
          'Low priority, because one person finished',
          'Ignore it',
          'Fix the colors first',
        ],
        correct: 0,
        hint: 'Count how many users and how important the task is.',
        explanation: 'It blocks a key task and affects most participants, so it should be fixed first.',
      },
    ],
    references: [],
  },

  'usability-testing-reporting': {
    activities: [
      {
        type: 'order',
        title: 'Order a usability report',
        task: 'Tap the sections in a sensible order.',
        items: [
          'Summary of goals and method',
          'Key findings with evidence',
          'Problems ranked by severity',
          'Recommendations',
          'Next steps and retest plan',
        ],
        hint: 'Lead with the summary and end with what happens next.',
        explanation: 'A clear report moves from summary to findings, priorities, recommendations, and next steps.',
      },
      {
        type: 'quickCheck',
        question: 'Why include quotes or short clips in a report?',
        options: [
          'They make findings credible and memorable',
          'They replace recommendations',
          'They make the report longer',
          'They are required by law',
        ],
        correct: 0,
        hint: 'Think about how stakeholders respond to real voices.',
        explanation: 'Evidence from real participants makes problems feel real and helps the team act.',
      },
    ],
    references: [],
  },
};
