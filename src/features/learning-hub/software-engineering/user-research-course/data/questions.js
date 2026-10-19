// Quiz question bank. Each question points to its lesson with lessonId.

export const QUESTIONS = [
  // 1 What is User Research?
  {
    lessonId: 'user-research-what-is',
    question: 'Which type of research measures how many people do or think something?',
    answers: ['Qualitative research', 'Quantitative research', 'Generative research', 'Attitudinal research'],
    correct: 1,
    explanation: 'Quantitative research collects numbers to measure how many or how much. Qualitative research explains why.',
  },
  // 2 Planning a Study
  {
    lessonId: 'user-research-planning',
    question: 'What should you decide first when planning a research study?',
    answers: [
      'Which software tool to buy',
      'How long the final report will be',
      'What you need to learn and which decision it will inform',
      'Which participants are easiest to reach',
    ],
    correct: 2,
    explanation: 'A clear goal comes before the method. The goal and the decision it informs shape every other choice.',
  },
  // 3 Participants & Ethics
  {
    lessonId: 'user-research-participants-ethics',
    question: 'What does informed consent mean in user research?',
    answers: [
      'Participants agree after learning the purpose and how their data will be used',
      'Participants must complete every task',
      'The team chooses which answers to keep',
      'Recordings are stored forever',
    ],
    correct: 0,
    explanation: 'Informed consent means people know what the study is, what is recorded, and how data is used, and they agree freely.',
  },
  // 4 User Interviews
  {
    lessonId: 'user-research-interviews',
    question: 'Which of these is the best open-ended interview question?',
    answers: [
      'Do you like the app?',
      'Is the checkout easy to use?',
      'Would you recommend this to a friend?',
      'Tell me about the last time you booked a trip online.',
    ],
    correct: 3,
    explanation: 'Open-ended questions about past behavior invite stories. Yes or no questions give little detail.',
  },
  // 5 Surveys
  {
    lessonId: 'user-research-surveys',
    question: 'What are surveys best at?',
    answers: [
      'Explaining deeply why one person behaves a certain way',
      'Measuring how common an opinion or behavior is',
      'Watching people use a prototype',
      'Replacing all other research methods',
    ],
    correct: 1,
    explanation: 'Surveys reach many people quickly and measure how common something is. They do not explain why in depth.',
  },
  // 6 Observation & Field Studies
  {
    lessonId: 'user-research-observation',
    question: 'Why is observing users valuable?',
    answers: [
      'It removes the need for consent',
      'It only measures how fast people finish',
      'It needs no planning',
      'It shows real behavior and context that people may not describe',
    ],
    correct: 3,
    explanation: 'People cannot always describe what they do. Watching reveals real behavior, workarounds, and context.',
  },
  // 7 Analyzing Findings
  {
    lessonId: 'user-research-analysis',
    question: 'In affinity diagramming, what do you do after writing each observation on its own note?',
    answers: [
      'Group similar notes and name each group',
      'Delete notes that look alike',
      'Sort the notes by length',
      'Send the notes to the team unchanged',
    ],
    correct: 0,
    explanation: 'Grouping similar notes and naming the groups reveals the main themes in your data.',
  },
  // 8 Personas
  {
    lessonId: 'user-research-personas',
    question: 'What should a good persona be based on?',
    answers: [
      'The team\'s assumptions about users',
      'A famous customer',
      'Random demographic details',
      'Patterns found in real user research',
    ],
    correct: 3,
    explanation: 'Personas built from research represent real users. Personas built from guesses turn into stereotypes.',
  },
  // 9 Empathy & Journey Maps
  {
    lessonId: 'user-research-empathy-journey',
    question: 'What are the four areas of an empathy map?',
    answers: [
      'Plan, build, test, ship',
      'Says, thinks, does, feels',
      'Goals, tasks, tools, costs',
      'Who, what, where, when',
    ],
    correct: 1,
    explanation: 'An empathy map captures what a user says, thinks, does, and feels.',
  },
  // 10 Sharing Findings
  {
    lessonId: 'user-research-sharing',
    question: 'Which statement best describes a research insight?',
    answers: [
      'A list of every note taken during sessions',
      'The number of participants in the study',
      'It explains why something happens and what it means for the design',
      'A screenshot of the prototype',
    ],
    correct: 2,
    explanation: 'An insight goes beyond what happened. It explains why it matters and points to a design decision.',
  },
];
