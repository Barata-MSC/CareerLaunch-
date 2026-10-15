// lessonId links each question to the lesson to review when it is missed.
// explanation is shown on the result screen. (The passing score lives in course.js.)
export const QUESTIONS = [
  {
    lessonId: 'dv-1',
    question: 'What is the main purpose of data visualization?',
    answers: [
      'To make a dataset larger',
      'To reveal patterns and communicate insight clearly',
      'To replace statistics altogether',
      'To avoid writing explanations',
    ],
    correct: 1,
    explanation:
      'Visualization turns raw numbers into a form people can understand quickly and act on.',
  },
  {
    lessonId: 'dv-2',
    question: 'Why is cleaning the data before plotting important?',
    answers: [
      'It reduces the number of charts needed',
      'It makes the chart look more colorful',
      'It prevents wrong labels, missing values, and inconsistent categories from distorting the story',
      'It removes the need for context',
    ],
    correct: 2,
    explanation:
      'Dirty data leads to bad assumptions and misleading visuals. Cleaning makes the chart trustworthy.',
  },
  {
    lessonId: 'dv-3',
    question: 'Which chart is most appropriate for comparing category totals?',
    answers: ['Scatter plot', 'Bar chart', 'Histogram', 'Map'],
    correct: 1,
    explanation: 'Bar charts are best for comparing discrete categories such as regions or products.',
  },
  {
    lessonId: 'dv-4',
    question: 'What does a histogram help you see?',
    answers: [
      'Whether two variables are related',
      'How values are distributed across a range',
      'Only the average value',
      'The date of a report',
    ],
    correct: 1,
    explanation: 'A histogram shows the shape of a distribution and reveals spread, clusters, and skew.',
  },
  {
    lessonId: 'dv-5',
    question: 'Which graph is usually best for showing change over time?',
    answers: ['Line chart', 'Pie chart', 'Box plot', 'Heatmap'],
    correct: 0,
    explanation: 'Line charts make trends and changes over time easy to read.',
  },
  {
    lessonId: 'dv-6',
    question: 'Why should color be used carefully in charts?',
    answers: [
      'Because all charts must use a rainbow palette',
      'Because color should guide attention without creating visual noise',
      'Because the dataset should always be in bright colors',
      'Because it removes the need for labels',
    ],
    correct: 1,
    explanation: 'Color helps guide emphasis, but poor color choices can make a chart harder to read.',
  },
  {
    lessonId: 'dv-7',
    question: 'What is the goal of a good dashboard layout?',
    answers: [
      'To make every chart equally large',
      'To help the viewer focus on the most important insights first',
      'To hide detail from decision-makers',
      'To use every color in the design system',
    ],
    correct: 1,
    explanation: 'Good dashboard layout leads the eye to the most important metrics and patterns.',
  },
  {
    lessonId: 'dv-8',
    question: 'Why is narrative important in data visualization?',
    answers: [
      'It turns a chart into insight by explaining what it means',
      'It removes the need for any labels',
      'It replaces the need for a dataset',
      'It guarantees the result is causal',
    ],
    correct: 0,
    explanation: 'A chart without explanation can be confusing. Narrative makes the takeaway clear.',
  },
  {
    lessonId: 'dv-9',
    question: 'Which workflow is common for a data visualization project?',
    answers: [
      'Collect data, clean it, summarize it, design the chart, and communicate the result',
      'Skip the analysis and build only a dashboard',
      'Use one chart for every dataset regardless of the question',
      'Only use a BI tool without checking the data',
    ],
    correct: 0,
    explanation: 'Strong visual work usually starts with data quality, shaping, and careful chart design.',
  },
  {
    lessonId: 'dv-10',
    question: 'What makes a portfolio visualization project strong?',
    answers: [
      'A long description with no chart',
      'A clear question, honest method, polished visual, and concise conclusion',
      'Several unrelated charts with no context',
      'Only a screenshot with no explanation',
    ],
    correct: 1,
    explanation: 'A strong portfolio project explains the problem, method, and insight in a way a viewer can trust.',
  },
];