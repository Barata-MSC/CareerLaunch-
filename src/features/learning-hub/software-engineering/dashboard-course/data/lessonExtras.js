// Interactive extras for each Dashboard lesson, matched by lesson id (ids must stay the same).
// lessons.js merges these into the lessons, so the original text content is untouched.
// Lessons 1-5 are Power BI (one video), lessons 6-10 are Tableau (another video).
//
// TODO: fill in each `start` (seconds) from the chapter list in the YouTube description
// (e.g. a chapter at 1:02:30 -> 3750). Only dashboard-2 has one so far (Power Query at 11:59).
// The `chapter` text is a topic hint, not the video's exact chapter title.

const PBI_ID = 'I0vQ_VLZTWg'; // Alex The Analyst: Learn Power BI in Under 3 Hours
const TAB_ID = 'j8FSP8XuFyk'; // Alex The Analyst: Learn Tableau in Under 2 hours

const pbi = (chapter, start = 0) => ({
  id: PBI_ID,
  start,
  chapter,
  title: 'Learn Power BI in Under 3 Hours | Formatting, Visualizations, Dashboards + Full Project',
  channel: 'Alex The Analyst',
});
const tab = (chapter, start = 0) => ({
  id: TAB_ID,
  start,
  chapter,
  title: 'Learn Tableau in Under 2 hours | Dashboards, Relationships, Visualizations + Mini Project',
  channel: 'Alex The Analyst',
});

// References are in APA 7th style (LessonReferences shows text + link)
const ms = (title, path) => ({
  text: `Microsoft. (n.d.). ${title}. Microsoft Learn.`,
  url: `https://learn.microsoft.com/en-us/${path}`,
});
const help = (title, path) => ({
  text: `Tableau Software. (n.d.). ${title}. Tableau Help.`,
  url: `https://help.tableau.com/current/pro/desktop/en-us/${path}`,
});
const tutorialspoint = (title, url) => ({ text: `Tutorialspoint. (n.d.). ${title}.`, url });
const pbiTutorial = tutorialspoint('Power BI tutorial', 'https://www.tutorialspoint.com/power_bi/index.htm');
const tabTutorial = tutorialspoint('Tableau tutorial', 'https://www.tutorialspoint.com/tableau/index.htm');
const pbiRef = {
  text: 'Alex The Analyst. (2024, November 19). Learn Power BI in under 3 hours | Formatting, visualizations, dashboards + full project [Video]. YouTube.',
  url: `https://youtu.be/${PBI_ID}`,
};
const tabRef = {
  text: 'Alex The Analyst. (2024, November 5). Learn Tableau in under 2 hours | Dashboards, relationships, visualizations + mini project [Video]. YouTube.',
  url: `https://youtu.be/${TAB_ID}`,
};

export const EXTRAS = {
  'dashboard-1': {
    video: pbi('Introduction'),
    activities: [
      {
        type: 'order',
        title: 'The Power BI workflow',
        task: 'Tap the steps in the order you would do them.',
        items: [
          'Get data',
          'Transform the data in Power Query',
          'Model the data (relationships and DAX)',
          'Visualize it in Report view',
          'Publish and share in the Power BI Service',
        ],
        hint: 'Data comes first, then cleaning, then modeling, then visuals, then sharing.',
        explanation: 'Get, transform, model, visualize, then publish and share.',
      },
      {
        type: 'quickCheck',
        question: 'Which part of Power BI is used to build reports?',
        options: ['The Power BI Service', 'The mobile apps', 'Power BI Desktop', 'Power Map'],
        correct: 2,
        hint: 'It is the free Windows app.',
        explanation: 'Power BI Desktop builds reports. The Service is used to share and view them online.',
      },
    ],
    references: [ms('What is Power BI?', 'power-bi/fundamentals/power-bi-overview'), pbiTutorial, pbiRef],
  },

  'dashboard-2': {
    video: pbi('Power Query', 719),
    activities: [
      {
        type: 'order',
        title: 'Clean a table in Power Query',
        task: 'Tap the steps in the order they appear in Applied Steps.',
        items: [
          'Connect to the data source',
          'Promote the first row to headers',
          'Change column data types',
          'Remove duplicates',
          'Click Close & Apply',
        ],
        hint: 'Connect first, fix headers and types, remove duplicates, then load the result.',
        explanation: 'Each step is recorded in Applied Steps, and Close & Apply loads the result into the model.',
      },
      {
        type: 'quickCheck',
        question: 'Where does Power Query Editor record each cleaning step?',
        options: ['Data pane', 'Applied Steps', 'Model view', 'Slicer'],
        correct: 1,
        hint: 'The list replays on every refresh.',
        explanation: 'Applied Steps records each change, so the same cleaning runs again when the data refreshes.',
      },
    ],
    references: [
      ms('Query overview in Power BI Desktop', 'power-bi/transform-model/desktop-query-overview'),
      pbiTutorial,
      pbiRef,
    ],
  },

  'dashboard-3': {
    video: pbi('Data modeling'),
    activities: [
      {
        type: 'match',
        title: 'Read a star schema',
        task: 'Tap an item on the left, then what it means on the right.',
        pairs: [
          { left: 'Sales table', right: 'Holds numbers about events, such as Amount' },
          { left: 'Product table', right: 'Describes what was sold' },
          { left: 'Customers table', right: 'Describes who bought it' },
          { left: 'Calendar table', right: 'Describes when it happened' },
          { left: 'One-to-many', right: 'One product row matches many sales rows' },
        ],
        hint: 'The Sales table is the fact table. The others are dimensions.',
        explanation: 'The fact table holds numbers and the dimension tables describe them.',
      },
      {
        type: 'quickCheck',
        question: 'Which relationship type is the most common?',
        options: ['One-to-one', 'Many-to-many', 'One-to-many', 'Zero-to-one'],
        correct: 2,
        hint: 'One product appears in many sales.',
        explanation: 'One-to-many is the most common cardinality in a star schema.',
      },
    ],
    references: [
      ms('Create and manage relationships in Power BI Desktop', 'power-bi/transform-model/desktop-create-and-manage-relationships'),
      pbiTutorial,
      pbiRef,
    ],
  },

  'dashboard-4': {
    video: pbi('Visualizations'),
    activities: [
      {
        type: 'visualBuilder',
        title: 'Build a column chart',
        task: 'Tap fields to build the visual, like dragging them into the Visualizations pane.',
        goal: 'A column chart that shows the total Sales for each Region.',
        target: { axis: 'Region', value: 'Sales', agg: 'Sum', chart: 'Column' },
        controls: ['chart'],
        hint: 'Axis: Region. Values: Sales. Aggregation: Sum. Chart type: Column.',
        explanation: 'Column charts compare a total across categories.',
      },
      {
        type: 'quickCheck',
        question: 'Which visual best shows change over time?',
        options: ['Pie chart', 'Line chart', 'Card', 'Slicer'],
        correct: 1,
        hint: 'Think of a line that moves from month to month.',
        explanation: 'Line and area charts show change over time.',
      },
    ],
    references: [
      ms('Visualization types in Power BI', 'power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a'),
      pbiTutorial,
      pbiRef,
    ],
  },

  'dashboard-5': {
    video: pbi('Dashboards'),
    activities: [
      {
        type: 'match',
        title: 'Match the DAX function',
        task: 'Tap a function on the left, then what it does on the right.',
        pairs: [
          { left: 'SUM()', right: 'Adds up a numeric column' },
          { left: 'COUNTROWS()', right: 'Counts the rows in a table' },
          { left: 'DISTINCTCOUNT()', right: 'Counts different values, ignoring repeats' },
          { left: 'IF()', right: 'Returns one value or another based on a test' },
          { left: 'CALCULATE()', right: 'Evaluates an expression after changing the filters' },
        ],
        hint: 'Read the names: SUM adds, COUNTROWS counts rows, and IF is a test.',
        explanation: 'These are the core DAX functions for totals, counts and logic.',
      },
      {
        type: 'quickCheck',
        question: 'What is the difference between a measure and a calculated column?',
        options: [
          'They are the same thing',
          'A measure is stored on every row',
          'A measure reacts to filters, and a calculated column is stored on each row',
          'A calculated column reacts to filters only',
        ],
        correct: 2,
        hint: 'One is calculated on demand and the other is stored.',
        explanation: 'A measure is calculated on demand and reacts to the filters. A calculated column is stored per row.',
      },
    ],
    references: [ms('DAX overview', 'dax/dax-overview'), pbiTutorial, pbiRef],
  },

  'dashboard-6': {
    video: tab('Introduction'),
    activities: [
      {
        type: 'match',
        title: 'Know the Tableau products',
        task: 'Tap an item on the left, then what it is for on the right.',
        pairs: [
          { left: 'Tableau Desktop', right: 'Builds visualizations' },
          { left: 'Tableau Server', right: 'Shares workbooks inside an organization' },
          { left: 'Tableau Online (Cloud)', right: 'A hosted platform that shares views as web links' },
          { left: 'Tableau Public', right: 'Free, but the work is shared publicly' },
          { left: '.twbx file', right: 'A packaged workbook that bundles the data' },
        ],
        hint: 'Desktop builds, Server and Online share, and Public is free and open to everyone.',
        explanation: 'Desktop builds, Server and Online share, and Public is free but public.',
      },
      {
        type: 'quickCheck',
        question: 'Which Tableau product is free but makes your work public?',
        options: ['Tableau Server', 'Tableau Public', 'Tableau Desktop', 'Tableau Online'],
        correct: 1,
        hint: 'The name says who can see it.',
        explanation: 'Tableau Public is free, but anything you publish there is visible to everyone.',
      },
    ],
    references: [
      {
        text: 'Tableau Software. (n.d.). Get started tutorial. Tableau Help.',
        url: 'https://help.tableau.com/current/guides/get-started-tutorial/en-us/get-started-tutorial-home.htm',
      },
      tabTutorial,
      tabRef,
    ],
  },

  'dashboard-7': {
    video: tab('Joins and Relationships'),
    activities: [
      {
        type: 'match',
        title: 'Fields and connections',
        task: 'Tap an item on the left, then its meaning on the right.',
        pairs: [
          { left: 'Region', right: 'A dimension: a category you group by' },
          { left: 'Sales', right: 'A measure: a number you can aggregate' },
          { left: 'Live connection', right: 'Reads the current data from the source' },
          { left: 'Extract', right: 'A saved snapshot of the data' },
          { left: 'Data blending', right: 'Links different data sources by a field' },
        ],
        hint: 'Dimensions are categories, measures are numbers, and a join stays inside one source.',
        explanation: 'Dimensions group the data, measures are aggregated, and blending links different sources.',
      },
      {
        type: 'quickCheck',
        question: 'What is a dimension in Tableau?',
        options: ['A number you aggregate', 'A chart type', 'A category such as Region', 'A file type'],
        correct: 2,
        hint: 'Think of Region or Customer.',
        explanation: 'Dimensions are categories. Measures are numbers that can be aggregated.',
      },
    ],
    references: [help('Join your data', 'joining_tables.htm'), tabTutorial, tabRef],
  },

  'dashboard-8': {
    video: tab('Visualizations'),
    activities: [
      {
        type: 'visualBuilder',
        title: 'Sort and filter a view',
        task: 'Build the view, then sort it and keep only the top marks, like the Sort button and a top filter in Tableau.',
        goal: 'The top 3 Regions by total Sales, sorted from highest to lowest.',
        target: { axis: 'Region', value: 'Sales', agg: 'Sum', sort: 'Descending', limit: 'Top 3' },
        controls: ['chart', 'sort', 'limit'],
        hint: 'Axis: Region. Values: Sales (Sum). Sort: Descending. Filter: Top 3.',
        explanation: 'A top filter keeps the best N marks, and sorting puts them in order.',
      },
      {
        type: 'quickCheck',
        question: 'Which filter is applied before the other filters?',
        options: ['Top filter', 'Quick filter', 'Condition filter', 'Context filter'],
        correct: 3,
        hint: 'The other filters work only on the data it leaves.',
        explanation: 'A context filter runs first, so the other filters only see the filtered data.',
      },
    ],
    references: [help('Filter data from your views', 'filtering.htm'), tabTutorial, tabRef],
  },

  'dashboard-9': {
    video: tab('Calculated fields'),
    activities: [
      {
        type: 'match',
        title: 'Match the calculation',
        task: 'Tap an item on the left, then what it does on the right.',
        pairs: [
          { left: 'Calculated field', right: 'A new field built with a formula' },
          { left: 'Table calculation', right: 'Works on the values already in the view' },
          { left: 'FIXED LOD', right: 'Computes using only the dimensions you list' },
          { left: 'Parameter', right: 'A value the viewer can change' },
          { left: 'IF ... THEN ... END', right: 'Logic that returns different results' },
        ],
        hint: 'A table calculation works on the view, and a FIXED expression ignores the rest of the view.',
        explanation: 'These are the main ways to create new values from your data in Tableau.',
      },
      {
        type: 'quickCheck',
        question: 'Which LOD keyword uses only the dimensions you list?',
        options: ['INCLUDE', 'EXCLUDE', 'RANK', 'FIXED'],
        correct: 3,
        hint: 'It stays fixed no matter what else is in the view.',
        explanation: 'FIXED computes at exactly the level you name, whatever else is in the view.',
      },
    ],
    references: [
      help('Create level of detail expressions in Tableau', 'calculations_calculatedfields_lod.htm'),
      tabTutorial,
      tabRef,
    ],
  },

  'dashboard-10': {
    video: tab('Dashboards / Mini Project'),
    activities: [
      {
        type: 'match',
        title: 'Pick the right chart',
        task: 'Tap a chart on the left, then the question it answers on the right.',
        pairs: [
          { left: 'Bar chart', right: 'Compare categories' },
          { left: 'Line chart', right: 'Show a trend over time' },
          { left: 'Scatter plot', right: 'Show how two measures relate' },
          { left: 'Histogram', right: 'Show how values are distributed in bins' },
          { left: 'Gantt chart', right: 'Show how long tasks last' },
        ],
        hint: 'Match the chart to the question you are asking.',
        explanation: 'Choosing the chart that fits the question is the first step of telling the story.',
      },
      {
        type: 'quickCheck',
        question: 'Which dashboard action lets a click on one chart filter the others?',
        options: ['Highlight action', 'Filter action', 'Export', 'Forecast'],
        correct: 1,
        hint: 'The name says what it does to the other charts.',
        explanation: 'A filter action filters the other sheets when you select a mark.',
      },
    ],
    references: [help('Create a dashboard', 'dashboards_create.htm'), tabTutorial, tabRef],
  },
};
