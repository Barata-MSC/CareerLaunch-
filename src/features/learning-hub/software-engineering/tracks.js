import htmlCourse from './html-course/course';
import cssCourse from './css-course/course';
import javascriptCourse from './javascript-course/course';
import gitCourse from './git-github-course/course';
import reactCourse from './react-course/course';
import designFundamentalsCourse from './design-fundamentals-course/course';
import userResearchCourse from './user-research-course/course';
import wireFramingCourse from './wireframing-course/course';
import usabilityTestingCourse from './usability-testing-course/course';
import nodeCourse from './nodejs-course/course';
import databaseCourse from './database-course/course';
import sqlCourse from './sql-course/course';
import dataVisualizationCourse from './data-visualization-course/course';
import dashboardCourse from './dashboard-course/course';
import statisticsCourse from './statistics-course/course';
import excelCourse from './excel-course/course';
import pandasCourse from './panda-course/course';

export const TRACKS = {
  'Software Engineer': {
    steps: [
      {
        id: '1',
        title: 'HTML',
        course: htmlCourse,
        route: 'HTMLCourse',
        description: 'The building blocks of every web page: structuring content with tags, forms, and semantic elements.',
      },
      {
        id: '2',
        title: 'CSS',
        course: cssCourse,
        route: 'CSSCourse',
        description: 'Style layouts, use Flexbox/Grid, and make responsive designs.',
      },
      {
        id: '3',
        title: 'JavaScript',
        course: javascriptCourse,
        route: 'JavaScriptCourse',
        description: 'Learn variables, functions, DOM manipulation, and async code — the language that powers interactivity.',
      },
      {
        id: '4',
        title: 'React',
        course: reactCourse,
        route: 'ReactCourse',
        description: 'Learn components, props, state, and hooks. This is the step that turns JS into real apps.',
      },
      {
        id: '5',
        title: 'Node js',
        course: nodeCourse,
        route: 'NodeCourse',
        description: 'Server-side JavaScript: build APIs and handle backend logic.',
      },
      {
        id: '6',
        title: 'Database',
        course: databaseCourse,
        route: 'DatabaseCourse',
        description: 'Storing and querying data with SQL or NoSQL databases like PostgreSQL or MongoDB.',
      },
      {
        id: '7',
        title: 'Git & Github',
        course: gitCourse,
        route: 'GitCourse',
        description: 'Version control and collaboration — tracking changes and working with a team.',
      },
    ],
  },
  'Data Analyst': {
    steps: [
      {
        id: '1',
        title: 'Excel & Spreadsheets',
        course: excelCourse,
        route: 'ExcelCourse',
        description: 'Clean data, use formulas, and build pivot tables to summarize information.',
      },
      {
        id: '2',
        title: 'SQL',
        course: sqlCourse,
        route: 'SQLCourse',
        description: 'Query, join, and filter data across relational database tables.',
      },
      {
        id: '3',
        title: 'Python (Pandas)',
        course: pandasCourse,
        route: 'PandasCourse',
        description: 'Clean and analyze datasets using Python and the Pandas library.',
      },
      {
        id: '4',
        title: 'Data Visualization',
        course: dataVisualizationCourse,
        route: 'DataCourse',
        description: 'Tell stories with data using charts and dashboards (e.g. Matplotlib, Power BI, Tableau).',
      },
      {
        id: '5',
        title: 'Statistics',
        course: statisticsCourse,
        route: 'StatisticsCourse',
        description: 'Hypothesis testing, distributions, and the math behind trustworthy insights.',
      },
      {
        id: '6',
        title: 'Dashboards (Power BI / Tableau)',
        course: dashboardCourse,
        route: 'DashboardCourse',
        description: 'Build interactive dashboards stakeholders can explore on their own.',
      },
    ],
  },
  'UI/UX Designer': {
    steps: [
      {
        id: '1',
        title: 'Design Fundamentals',
        course: designFundamentalsCourse,
        route: 'DesignFundamentalsCourse',
        description: 'Color theory, typography, spacing, and visual hierarchy.',
      },
      {
        id: '2',
        title: 'User Research',
        course: userResearchCourse,
        route: 'UserResearchCourse',
        description: 'Interview users, run surveys, and turn findings into actionable insights.',
      },
      {
        id: '3',
        title: 'Wireframing',
        course: wireFramingCourse,
        route: 'WireframingCourse',
        description: 'Practice low-fidelity wireframes to map out layouts before visual design.',
      },
      {
        id: '4',
        title: 'Figma / Prototyping',
        description: 'Build interactive, high-fidelity prototypes that feel like the real app.',
      },
      {
        id: '5',
        title: 'Usability Testing',
        course: usabilityTestingCourse,
        route: 'UsabilityTestingCourse',
        description: 'Test your designs with real users and iterate on the feedback.',
      },
      {
        id: '6',
        title: 'Design Systems',
        description: 'Build reusable components and a consistent design language.',
      },
    ],
  },
};
