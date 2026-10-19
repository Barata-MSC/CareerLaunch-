// Lesson content for the User Research course (UI/UX Designer track).
// lessonExtras.js adds activities, video, and references by lesson id (ids must stay the same).
import { EXTRAS } from './lessonExtras';

const BASE_LESSONS = [
  {
    id: 'user-research-what-is',
    title: 'What is User Research?',
    subtitle: 'Evidence over opinions',
    contentTitle: 'Learning from real users',
    description:
      'User research is the practice of studying real people to understand their needs, behaviors, and problems, so design decisions rest on evidence instead of opinions. It can happen before a design exists, while it is being built, and after it launches.',
    code: `Behavioral   -> what people DO
Attitudinal  -> what people SAY
Qualitative  -> WHY and HOW
Quantitative -> HOW MANY, HOW MUCH`,
    sections: [
      {
        heading: 'Generative and evaluative',
        text: 'Generative research explores problems and needs before you design, for example through interviews. Evaluative research checks whether a design works, for example through usability tests.',
      },
      {
        heading: 'Behavioral and attitudinal',
        text: 'Behavioral methods watch what people do. Attitudinal methods ask what people think or feel. People often say one thing and do another, so strong studies combine both.',
      },
      {
        heading: 'Qualitative and quantitative',
        text: 'Qualitative research collects stories and observations to explain why things happen. Quantitative research collects numbers to measure how many or how much.',
      },
      {
        heading: 'Why it matters',
        text: 'Without research, teams guess. Even a small study can reveal problems that nobody on the team imagined.',
      },
    ],
    keyPoints: [
      'Research replaces guessing with evidence',
      'Generative research explores; evaluative research checks',
      'Behavioral shows what people do; attitudinal shows what they say',
      'Qualitative explains why; quantitative measures how many',
    ],
  },
  {
    id: 'user-research-planning',
    title: 'Planning a Study',
    subtitle: 'Goals, questions, methods',
    contentTitle: 'Start with what you need to learn',
    description:
      'Good research starts with a clear goal. Before choosing a method, decide what you need to learn and which decision the results will inform. A short research plan keeps the whole team aligned and the study focused.',
    code: `Goal:       Why are we doing this study?
Questions:  What do we need to learn?
Method:     How will we find out?
Who:        Which users, and how many?
When:       Timeline and deliverables`,
    sections: [
      {
        heading: 'Goals and questions',
        text: 'A research goal is the big reason for the study. Research questions break it into specific things to learn, such as "Why do shoppers leave before paying?"',
      },
      {
        heading: 'Choosing a method',
        text: 'Match the method to the question. Questions about why need interviews or observation. Questions about how many need surveys or analytics. Questions about whether people can use a design need usability tests.',
      },
      {
        heading: 'The research plan',
        text: 'Write down the goal, questions, method, participants, schedule, and who will use the results. A one-page plan is enough for most studies.',
      },
      {
        heading: 'Common traps',
        text: 'Do not pick a method first and then look for a question. Do not try to answer ten questions in one session. Focus on the few that will change a decision.',
      },
    ],
    keyPoints: [
      'Start with the goal, not the method',
      'Research questions break the goal into things to learn',
      'Match the method to the type of question',
      'A short written plan keeps the team aligned',
    ],
  },
  {
    id: 'user-research-participants-ethics',
    title: 'Participants & Ethics',
    subtitle: 'Right people, treated fairly',
    contentTitle: 'Recruiting and respecting participants',
    description:
      'Your findings are only as good as the people you study. Recruit participants who match your real users, and treat them with respect. Ethical research protects participants and builds trust.',
    code: `Screener -> filters who qualifies
Consent   -> participant agrees, fully informed
Privacy   -> protect names, faces, and data
Thanks    -> fair incentive and clear next steps`,
    sections: [
      {
        heading: 'Recruiting the right people',
        text: 'Define who your users are, then recruit people who match. Interviewing only friends or coworkers is easy, but it can bias your results because they are not typical users.',
      },
      {
        heading: 'Screeners',
        text: 'A screener is a short set of questions that checks whether someone fits the study. Avoid showing which answers qualify, or people may answer to get chosen.',
      },
      {
        heading: 'Informed consent',
        text: 'Before the session, explain the purpose, what will be recorded, how the data will be used, and that the person can stop at any time. Then ask for their agreement.',
      },
      {
        heading: 'Privacy',
        text: 'Store recordings safely, remove names and identifying details from reports, and share only what the participant agreed to.',
      },
    ],
    keyPoints: [
      'Recruit people who match your real users',
      'Screeners should not reveal the right answers',
      'Informed consent means people know how data is used',
      'Protect participant privacy in recordings and reports',
    ],
  },
  {
    id: 'user-research-interviews',
    title: 'User Interviews',
    subtitle: 'Listen more than you talk',
    contentTitle: 'Learning through conversation',
    description:
      'A user interview is a one-on-one conversation to learn about someone\'s experiences, goals, and frustrations. Good interviews feel like a natural chat, but they are carefully planned and focus on real past behavior.',
    code: `Weak:    "Would you use a budgeting app?"
Better:  "Tell me about the last time you
          tracked your spending."`,
    sections: [
      {
        heading: 'The discussion guide',
        text: 'A discussion guide lists the topics and questions you want to cover. It keeps you on track, but you can follow interesting answers when they appear.',
      },
      {
        heading: 'Open-ended questions',
        text: 'Open-ended questions invite stories, such as "Tell me about..." Closed questions get yes or no answers. Ask about what people did in the past rather than what they might do in the future.',
      },
      {
        heading: 'Avoid leading questions',
        text: 'A leading question pushes toward an answer, such as "Don\'t you think this is easy to use?" Keep your wording neutral so the participant can say what they really think.',
      },
      {
        heading: 'Listen and probe',
        text: 'Stay quiet after a question so people can think. Follow up with "Can you tell me more?" or "Why was that?" to go deeper.',
      },
    ],
    keyPoints: [
      'Plan a discussion guide but stay flexible',
      'Ask open-ended questions about past behavior',
      'Avoid leading questions',
      'Use silence and follow-up questions to go deeper',
    ],
  },
  {
    id: 'user-research-surveys',
    title: 'Surveys',
    subtitle: 'Questions at scale',
    contentTitle: 'Measuring how common something is',
    description:
      'A survey collects answers from many people quickly, so it is good for measuring how common an opinion or behavior is. Surveys show what and how many, but not deeply why, so they work best alongside interviews or observation.',
    code: `Closed:  How often do you use the app?
         ( ) Daily  ( ) Weekly  ( ) Rarely
Open:    What is the hardest part of ordering?`,
    sections: [
      {
        heading: 'Closed and open questions',
        text: 'Closed questions give fixed choices and are easy to count. Open questions let people answer in their own words and reveal things you did not expect, but take more effort to analyze.',
      },
      {
        heading: 'Write clear questions',
        text: 'Ask one thing per question. A double-barreled question such as "How easy and fast was checkout?" mixes two ideas, so the answer is unclear. Avoid leading wording.',
      },
      {
        heading: 'Keep it short',
        text: 'Long surveys tire people and lower quality. Include only questions that connect to your research goals.',
      },
      {
        heading: 'Test it first',
        text: 'Pilot the survey with a few people to catch confusing wording before you send it to everyone.',
      },
    ],
    keyPoints: [
      'Surveys measure how common something is',
      'Closed questions are easy to count; open ones reveal detail',
      'Ask one thing per question and avoid leading wording',
      'Pilot the survey before sending it',
    ],
  },
  {
    id: 'user-research-observation',
    title: 'Observation & Field Studies',
    subtitle: 'Watch what people do',
    contentTitle: 'Behavior beats opinion',
    description:
      'People cannot always describe what they do, so watching them is powerful. Observation shows real behavior, workarounds, and context, such as interruptions, noise, and the tools nearby, that an interview can miss.',
    code: `Say:  "I always check the schedule first."
Do:   Opens chat, scrolls, then asks a friend.

Watch the DO, not only the SAY.`,
    sections: [
      {
        heading: 'Field studies',
        text: 'In a field study you observe people in their own environment, such as at home or at work. You see the real situation in which the product is used.',
      },
      {
        heading: 'Usability observation',
        text: 'In a usability session you watch someone try realistic tasks with a design. Resist the urge to help, because struggling is the information you came for.',
      },
      {
        heading: 'Think aloud',
        text: 'Ask participants to say their thoughts out loud while they work. It shows what they expect and where they get confused.',
      },
      {
        heading: 'Observe, then interpret',
        text: 'Write down what you see, such as "Tapped Back three times", separately from what you think it means. Mixing the two leads to bias.',
      },
    ],
    keyPoints: [
      'Observation reveals real behavior and context',
      'Field studies happen in the user\'s own environment',
      'Do not help during a usability task',
      'Record observations separately from interpretations',
    ],
  },
  {
    id: 'user-research-analysis',
    title: 'Analyzing Findings',
    subtitle: 'From notes to patterns',
    contentTitle: 'Finding the themes',
    description:
      'Raw notes and transcripts are not insights yet. Analysis means organizing what you collected and looking for patterns across participants. A common approach is thematic analysis, which groups observations into themes.',
    code: `Notes -> Sticky notes -> Groups
      -> Themes -> Insights`,
    sections: [
      {
        heading: 'Affinity diagramming',
        text: 'Write each observation on its own note, group notes that are similar, and name each group. The groups show the main themes in your data.',
      },
      {
        heading: 'Thematic analysis',
        text: 'Read through your data, tag recurring ideas, and combine tags into themes. Themes describe patterns, such as "People are unsure what Save does."',
      },
      {
        heading: 'Frequency is not importance',
        text: 'A problem seen once can still be serious. Judge each finding by how severe it is and how many users it could affect, not only how often it appeared.',
      },
      {
        heading: 'Keep facts separate',
        text: 'Mark what you saw or heard and what you concluded. Another team member should be able to trace each insight back to evidence.',
      },
    ],
    keyPoints: [
      'Analysis turns raw notes into patterns',
      'Affinity diagrams group similar observations into themes',
      'A rare problem can still be severe',
      'Every insight should trace back to evidence',
    ],
  },
  {
    id: 'user-research-personas',
    title: 'Personas',
    subtitle: 'Representing your users',
    contentTitle: 'Designing for real people',
    description:
      'A persona is a fictional but research-based profile that represents a group of users. It summarizes goals, needs, behaviors, and frustrations so the team designs for real people rather than for themselves.',
    code: `Persona:  Maya, 21, college student
Goal:     Find part-time jobs quickly
Pain:     Too many irrelevant listings
Context:  Searches on her phone between classes`,
    sections: [
      {
        heading: 'What goes in a persona',
        text: 'Include a name and short background, the main goal, key behaviors, pain points, and the context of use. Keep it to one page so people actually read it.',
      },
      {
        heading: 'Base it on research',
        text: 'A persona built from guesses becomes a stereotype. Build personas from patterns you found in interviews, observation, and surveys.',
      },
      {
        heading: 'Focus on goals and behavior',
        text: 'Goals and behaviors guide design decisions. Details like a favorite food or hobby usually do not, unless they affect how the product is used.',
      },
      {
        heading: 'Use them',
        text: 'Refer to personas when you prioritize features and review designs: "Would Maya understand this screen?"',
      },
    ],
    keyPoints: [
      'A persona represents a group of real users',
      'Build personas from research, not assumptions',
      'Goals, behaviors, and pain points matter most',
      'Use personas to guide design decisions',
    ],
  },
  {
    id: 'user-research-empathy-journey',
    title: 'Empathy & Journey Maps',
    subtitle: 'Making research visible',
    contentTitle: 'Seeing the experience from the user side',
    description:
      'Empathy maps and journey maps turn research into visuals the whole team can understand. An empathy map captures what a user says, thinks, does, and feels. A journey map follows the steps a user takes to reach a goal and shows where they struggle.',
    code: `Empathy map:  SAYS | THINKS | DOES | FEELS
Journey map:  Phases -> Actions -> Feelings
              -> Pain points -> Opportunities`,
    sections: [
      {
        heading: 'Empathy maps',
        text: 'An empathy map has four areas: what the user says, thinks, does, and feels. It helps the team understand a person\'s perspective, especially the gap between what they say and what they feel.',
      },
      {
        heading: 'Journey maps',
        text: 'A journey map lays out the stages of an experience, such as discover, choose, pay, and receive. Under each stage, note the user\'s actions, thoughts, and emotions.',
      },
      {
        heading: 'Find the low points',
        text: 'The moments where emotions dip or users get stuck are your biggest opportunities. They show where design work will help most.',
      },
      {
        heading: 'Use real data',
        text: 'Fill maps with evidence from interviews and observation, not with team assumptions. Quotes and observed actions make a map credible.',
      },
    ],
    keyPoints: [
      'Empathy maps cover says, thinks, does, and feels',
      'Journey maps follow a user through the stages of a goal',
      'Low points in a journey are design opportunities',
      'Base maps on real research data',
    ],
  },
  {
    id: 'user-research-sharing',
    title: 'Sharing Findings',
    subtitle: 'Turning insights into action',
    contentTitle: 'Make research change decisions',
    description:
      'Research only matters if it changes decisions. Share findings in a clear, short format, lead with the most important insights, and connect each one to a recommended next step. Evidence such as quotes and clips makes insights persuasive.',
    code: `Insight:        Users miss the Save button.
Evidence:       4 of 5 searched for it for 10+ seconds.
Recommendation: Move Save to the top and label it.`,
    sections: [
      {
        heading: 'Insights, not data dumps',
        text: 'An observation says what happened. An insight explains why it matters for the design. Lead with insights and keep the raw data for backup.',
      },
      {
        heading: 'How might we',
        text: 'A "How might we" question turns a problem into an opportunity, for example "How might we help users find Save quickly?" It helps the team move from findings to ideas.',
      },
      {
        heading: 'Show evidence',
        text: 'Short quotes, screenshots, and video clips make findings real and memorable. Always protect participant identities.',
      },
      {
        heading: 'Plan next steps',
        text: 'Prioritize recommendations by severity and effort, agree who will act on them, and plan follow-up research to check that changes worked.',
      },
    ],
    keyPoints: [
      'Lead with insights, not raw data',
      'Connect every insight to a recommendation',
      'Use quotes and clips as evidence',
      'Prioritize actions and follow up',
    ],
  },
];

// Merge the interactive extras (activities, video, references) into each lesson by id
export const LESSONS = BASE_LESSONS.map((lesson) => ({ ...lesson, ...(EXTRAS[lesson.id] || {}) }));
