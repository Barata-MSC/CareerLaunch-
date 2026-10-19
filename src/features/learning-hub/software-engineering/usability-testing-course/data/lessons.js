// Lesson content for the Usability Testing course (UI/UX Designer track).
// lessonExtras.js adds activities and references by lesson id (ids must stay the same).
import { EXTRAS } from './lessonExtras';

const BASE_LESSONS = [
  {
    id: 'usability-testing-what-is',
    title: 'What is Usability Testing?',
    subtitle: 'Watch real people use your design',
    contentTitle: 'Finding problems before users do',
    description:
      'Usability testing is a method where real users try to complete realistic tasks with a product or prototype while you observe. It shows where people get confused, make mistakes, or give up, so you can fix problems before launch.',
    code: `Usability =
  learnability + efficiency + memorability
  + fewer errors + satisfaction`,
    sections: [
      {
        heading: 'What usability means',
        text: 'A usable product is easy to learn, efficient to use, easy to remember after a break, forgiving of errors, and pleasant to use.',
      },
      {
        heading: 'Observe, do not ask',
        text: 'People are poor at predicting their own behavior. Instead of asking whether they like a design, give them a task and watch what they actually do.',
      },
      {
        heading: 'When to test',
        text: 'Test early with sketches or wireframes, and keep testing as the design improves. Problems are cheapest to fix before anything is built.',
      },
      {
        heading: 'What you get',
        text: 'You get evidence of real problems, such as where users hesitate, which words confuse them, and which steps they skip.',
      },
    ],
    keyPoints: [
      'Usability testing observes real users doing realistic tasks',
      'Usability covers learnability, efficiency, memorability, errors, and satisfaction',
      'Watch behavior instead of asking for opinions',
      'Test early and often',
    ],
  },
  {
    id: 'usability-testing-types',
    title: 'Types of Usability Tests',
    subtitle: 'Choose the right format',
    contentTitle: 'Moderated, unmoderated, formative, summative',
    description:
      'Usability tests come in several formats. The right one depends on your goals, timeline, and budget. Knowing the main types helps you choose a method that answers your questions without wasting effort.',
    code: `Moderated    -> facilitator present
Unmoderated  -> participant alone
Formative    -> find problems to fix
Summative    -> measure performance`,
    sections: [
      {
        heading: 'Moderated and unmoderated',
        text: 'In a moderated test a facilitator guides the session and can ask follow-up questions. In an unmoderated test participants complete tasks on their own, usually remotely, while a tool records the session.',
      },
      {
        heading: 'In-person and remote',
        text: 'In-person tests give rich observation of body language. Remote tests reach more people and are easier to schedule. Both can be moderated.',
      },
      {
        heading: 'Formative testing',
        text: 'Formative tests happen during design and focus on finding problems to fix. They are usually small, qualitative, and repeated.',
      },
      {
        heading: 'Summative testing',
        text: 'Summative tests measure how well a finished or near-final design performs, for example against a benchmark or an earlier version. They need more participants.',
      },
    ],
    keyPoints: [
      'Moderated tests have a live facilitator; unmoderated do not',
      'Remote testing reaches more people easily',
      'Formative tests find problems during design',
      'Summative tests measure performance',
    ],
  },
  {
    id: 'usability-testing-planning',
    title: 'Planning a Test',
    subtitle: 'Prepare before you recruit',
    contentTitle: 'A clear plan saves the study',
    description:
      'A good usability test starts with a plan. The plan defines what you want to learn, which tasks to use, what to measure, and who will take part, so the whole team agrees before the first session.',
    code: `Goals     -> what do we need to learn?
Tasks     -> what will users do?
Metrics   -> how will we measure?
Users     -> who and how many?
Schedule  -> when and where?`,
    sections: [
      {
        heading: 'Set clear goals',
        text: 'Write one to three goals, such as "Find out whether people can complete checkout without help." Goals keep the test focused.',
      },
      {
        heading: 'Prepare materials',
        text: 'Get the prototype or product ready, write the tasks and a facilitator script, and prepare consent forms and any questionnaires.',
      },
      {
        heading: 'Run a pilot',
        text: 'Try the whole test with a colleague first. A pilot catches broken links, unclear tasks, and timing problems before real participants arrive.',
      },
      {
        heading: 'Share the plan',
        text: 'Share the plan with the team and stakeholders so everyone knows what the test will and will not answer.',
      },
    ],
    keyPoints: [
      'Start with one to three clear goals',
      'Prepare the prototype, tasks, and script',
      'Always run a pilot test first',
      'Share the plan so the team is aligned',
    ],
  },
  {
    id: 'usability-testing-tasks',
    title: 'Writing Tasks & Scenarios',
    subtitle: 'Realistic goals, no hints',
    contentTitle: 'Tasks that reveal real problems',
    description:
      'Tasks are what you ask participants to do. Good tasks feel like real goals, use the participant\'s own words, and never reveal where to click. Poor tasks give away the answer and hide the problems you want to find.',
    code: `Weak:   "Click the Orders tab."
Better: "You bought shoes last week.
         Find out when they will arrive."`,
    sections: [
      {
        heading: 'Use scenarios',
        text: 'A scenario is a short story that gives context and motivation, such as "You are planning a trip for Friday and need a place to stay."',
      },
      {
        heading: 'Do not give hints',
        text: 'Avoid using the exact labels from the interface. If the task says "Click Orders", you are not testing whether people can find it.',
      },
      {
        heading: 'Define success',
        text: 'Decide in advance what counts as completing each task, so results are consistent between sessions.',
      },
      {
        heading: 'Keep it manageable',
        text: 'Five to seven tasks fit in a typical session. Start with easier tasks and order them in a natural sequence.',
      },
    ],
    keyPoints: [
      'Write tasks as realistic goals',
      'Avoid interface labels and hints in tasks',
      'Define success criteria in advance',
      'Limit the number of tasks per session',
    ],
  },
  {
    id: 'usability-testing-participants',
    title: 'Participants & Sample Size',
    subtitle: 'The right people, enough of them',
    contentTitle: 'Who to test with',
    description:
      'Results are only useful if participants resemble your real users. For qualitative usability testing, small groups are enough to uncover most major problems, and several small rounds work better than one large test.',
    code: `Qualitative round:  about 5 users
Many small rounds beat one big round
Quantitative study: many more users`,
    sections: [
      {
        heading: 'Recruit representative users',
        text: 'Choose people who match your target users in goals, experience, and context. Avoid testing only with teammates or friends.',
      },
      {
        heading: 'About five per round',
        text: 'In a qualitative test, the first few users reveal most major problems, and later users mostly repeat them. About five participants per round is a common guideline.',
      },
      {
        heading: 'Test again after fixing',
        text: 'Fix the problems you found and test again with new participants. Several small rounds find more problems than one big study.',
      },
      {
        heading: 'Quantitative needs more',
        text: 'If you want reliable numbers, such as average task time, you need many more participants than a qualitative test.',
      },
    ],
    keyPoints: [
      'Recruit people who match your real users',
      'About five participants per qualitative round',
      'Run several small rounds instead of one large one',
      'Quantitative studies need more participants',
    ],
  },
  {
    id: 'usability-testing-facilitating',
    title: 'Facilitating a Session',
    subtitle: 'Guide without leading',
    contentTitle: 'Staying neutral',
    description:
      'The facilitator makes participants feel comfortable and keeps the session on track without influencing what they do. Your job is to watch and learn, not to teach, defend, or help.',
    code: `Welcome -> consent -> think aloud
-> tasks (one at a time)
-> follow-up questions -> thank you`,
    sections: [
      {
        heading: 'Set the tone',
        text: 'Explain that you are testing the design, not the person. There are no wrong answers, and the participant can stop at any time.',
      },
      {
        heading: 'Think aloud',
        text: 'Ask participants to say their thoughts out loud while they work. Remind them gently with "What are you thinking?" if they go quiet.',
      },
      {
        heading: 'Stay neutral',
        text: 'Do not hint, defend the design, or react to mistakes. If asked "Should I click here?" reply with "What would you do?"',
      },
      {
        heading: 'Let them struggle a little',
        text: 'Struggling is useful information. Step in only if the participant is truly stuck or upset, and note where you had to help.',
      },
    ],
    keyPoints: [
      'Tell participants you are testing the design, not them',
      'Ask them to think aloud',
      'Stay neutral and do not hint',
      'Note where you had to help',
    ],
  },
  {
    id: 'usability-testing-observing',
    title: 'Observing & Measuring',
    subtitle: 'What to record',
    contentTitle: 'Behavior and numbers',
    description:
      'During sessions, record what happens: what participants do, say, and struggle with. You can also collect simple metrics to compare designs or track improvements over time.',
    code: `Task success rate = completed / attempts
Time on task      = how long it takes
Error count       = mistakes made
SUS               = satisfaction score 0-100`,
    sections: [
      {
        heading: 'Take good notes',
        text: 'Write down observed behavior, quotes, and problems. A second person as note-taker lets the facilitator focus on the participant.',
      },
      {
        heading: 'Success, time, and errors',
        text: 'Task success rate is the share of participants who complete a task. Time on task and error count show efficiency and confusion.',
      },
      {
        heading: 'Satisfaction',
        text: 'The System Usability Scale (SUS) is a short ten-question survey that gives a satisfaction score from 0 to 100. Single-question ratings after tasks are also common.',
      },
      {
        heading: 'Record with permission',
        text: 'Screen and audio recordings help you review sessions later, but always get consent first and store them securely.',
      },
    ],
    keyPoints: [
      'Record behavior, quotes, and problems',
      'Task success rate shows who completed a task',
      'Time and errors show efficiency and confusion',
      'Always get consent before recording',
    ],
  },
  {
    id: 'usability-testing-heuristic-evaluation',
    title: 'Heuristic Evaluation',
    subtitle: 'An expert review',
    contentTitle: 'Checking a design against principles',
    description:
      'A heuristic evaluation is a quick expert review. Evaluators inspect an interface and judge it against established usability principles, called heuristics. It does not replace testing with users, but it can find many problems cheaply.',
    code: `Visibility of system status
User control and freedom
Consistency and standards
Error prevention
Recognition rather than recall
... and 5 more`,
    sections: [
      {
        heading: 'Nielsen\'s 10 heuristics',
        text: 'Jakob Nielsen\'s ten heuristics are broad rules of thumb for interface design, such as keeping users informed, preventing errors, and being consistent.',
      },
      {
        heading: 'How it works',
        text: 'Each evaluator goes through the interface alone, notes which heuristics each problem violates, and then the group combines the findings.',
      },
      {
        heading: 'Use several evaluators',
        text: 'Different people find different problems, so several evaluators find more than one. Combine their results into one list.',
      },
      {
        heading: 'Complement, do not replace',
        text: 'Experts can miss problems real users have. Use heuristic evaluation alongside usability testing, not instead of it.',
      },
    ],
    keyPoints: [
      'Heuristic evaluation is an expert review against principles',
      'Nielsen defined ten usability heuristics',
      'Several evaluators find more problems',
      'It complements user testing',
    ],
  },
  {
    id: 'usability-testing-analysis',
    title: 'Analyzing & Prioritizing',
    subtitle: 'Decide what to fix first',
    contentTitle: 'Not every problem is equal',
    description:
      'After the sessions, collect all the problems you observed and group duplicates. Then rate how serious each one is, so the team fixes the most harmful problems first instead of the easiest or most noticeable ones.',
    code: `Severity depends on:
  Frequency   -> how many users hit it
  Impact      -> how hard it is to overcome
  Persistence -> does it keep happening?`,
    sections: [
      {
        heading: 'Collect and group',
        text: 'List every problem on its own note, merge duplicates, and group related ones. Note how many participants had each problem.',
      },
      {
        heading: 'Rate severity',
        text: 'Judge each problem by how often it occurs, how much it blocks users, and whether users keep struggling even after they know about it.',
      },
      {
        heading: 'Prioritize',
        text: 'Problems that block key tasks for many users come first. Cosmetic issues that rarely matter can wait.',
      },
      {
        heading: 'Look for causes',
        text: 'Ask why the problem happened, not only what happened. Understanding the cause leads to better fixes than patching symptoms.',
      },
    ],
    keyPoints: [
      'Group duplicate problems and count participants',
      'Rate severity with frequency, impact, and persistence',
      'Fix problems that block key tasks first',
      'Find the cause, not just the symptom',
    ],
  },
  {
    id: 'usability-testing-reporting',
    title: 'Reporting & Iterating',
    subtitle: 'Turn findings into change',
    contentTitle: 'Make results drive decisions',
    description:
      'A test only helps if the team acts on it. Share a short, clear report with the key findings, evidence, and recommendations, then update the design and test again to check that the fixes worked.',
    code: `Summary -> Key findings -> Severity
-> Recommendations -> Next steps
Then: redesign -> retest`,
    sections: [
      {
        heading: 'A short, clear report',
        text: 'Lead with a summary of goals and method, then the most important findings. Keep details in an appendix for those who want them.',
      },
      {
        heading: 'Show evidence',
        text: 'Quotes, screenshots, and short video clips make problems real and convincing. Protect participant identities.',
      },
      {
        heading: 'Recommend fixes',
        text: 'Pair each problem with a suggested change and its priority. Suggestions turn findings into action.',
      },
      {
        heading: 'Test again',
        text: 'After changes, run another small round to confirm the problems are gone and no new ones appeared. Usability work is a repeating cycle.',
      },
    ],
    keyPoints: [
      'Keep reports short and lead with key findings',
      'Back findings with quotes and clips',
      'Pair every problem with a recommendation',
      'Retest after fixing to confirm improvement',
    ],
  },
];

// Merge the interactive extras (activities, references) into each lesson by id
export const LESSONS = BASE_LESSONS.map((lesson) => ({ ...lesson, ...(EXTRAS[lesson.id] || {}) }));
