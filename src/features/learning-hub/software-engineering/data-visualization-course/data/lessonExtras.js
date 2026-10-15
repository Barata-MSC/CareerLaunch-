// Interactive extras for each Data Visualization lesson, matched by lesson id (ids must stay the same).
// lessons.js merges these into the lessons, so the original text content is untouched.
//
// TODO (videos): fill in each `start` (seconds) and `chapter` from the chapter list in the
// YouTube description (e.g. 1:02:30 -> 3750). Until then every lesson starts at the beginning.
// Channel is small (3.41K subscribers); swap VIDEO_ID later if you find a trusted-channel video.
//
// TODO (links): entries marked VERIFY follow the site's menu naming and URL pattern but were
// not opened. Tap each one in the app before release.

const VIDEO_ID = 'RzHQ4FySiYg'; // Datais good: Data Visualization Full Course in 1 Hour

const video = (chapter, start = 0) => ({
  id: VIDEO_ID,
  start,
  chapter,
  title: 'Data Visualization for Data Science | Data Visualization Full Course in 1 Hour',
  channel: 'Datais good',
});

// References are in APA 7th style (LessonReferences shows text + link)
const w3 = (title, page) => ({
  text: `W3Schools. (n.d.). ${title}.`,
  url: `https://www.w3schools.com/python/${page}`,
});
const videoRef = {
  text: 'Datais good. (2021, November 20). Data visualization for data science | Data visualization full course in 1 hour [Video]. YouTube.',
  url: `https://youtu.be/${VIDEO_ID}`,
};
const mplPlotTypes = {
  // VERIFY: official Matplotlib "Plot types" page, stable version path
  text: 'Matplotlib development team. (n.d.). Plot types. Matplotlib.',
  url: 'https://matplotlib.org/stable/plot_types/index.html',
};

export const EXTRAS = {
  'dv-1': {
    video: video(),
    activities: [
      {
        type: 'miniSheet',
        title: 'Find the pattern in the table',
        columns: ['A', 'B'],
        rows: [
          ['Month', 'Sales'],
          ['Jan', 120],
          ['Feb', 180],
          ['Mar', 210],
          ['Apr', 260],
          ['May', 300],
        ],
        challenge: { target: 'B6', text: 'Tap the cell with the highest sales value.' },
      },
      {
        type: 'quickCheck',
        question: 'You want to compare sales across four regions. What kind of question is this?',
        options: ['Comparing categories', 'Change over time', 'Relationship between two variables', 'Spread of values'],
        correct: 0,
        hint: 'Regions are separate groups, not points in time.',
        explanation: 'Comparing values across groups such as regions is a category comparison.',
      },
    ],
    references: [w3('Matplotlib intro', 'matplotlib_intro.asp'), videoRef], // VERIFY
  },

  'dv-2': {
    video: video(),
    references: [videoRef],
    activities: [
      {
        type: 'miniSheet',
        title: 'Spot the data problem',
        columns: ['A', 'B', 'C'],
        rows: [
          ['region', 'revenue', 'month'],
          ['North', 1200, '2024-01'],
          ['North', 950, '2024-02'],
          ['South', '', '2024-01'],
          ['South', 900, '2024-02'],
        ],
        challenge: { target: 'B4', text: 'Tap the missing revenue value (the row dropna would remove).' },
      },
      {
        type: 'quickCheck',
        question: "What does df.dropna(subset=['region', 'revenue']) do?",
        options: [
          'Removes rows where region or revenue is missing',
          'Fills missing values with 0',
          'Deletes the region and revenue columns',
          'Sorts the rows by revenue',
        ],
        correct: 0,
        hint: 'dropna means "drop missing values". subset limits which columns are checked.',
        explanation: 'dropna removes rows that have a missing value in any of the columns listed in subset.',
      },
    ],
  },

  'dv-3': {
    video: video(),
    activities: [
      {
        type: 'quickCheck',
        question: 'You want to see whether higher ad spend goes with more conversions. Which chart fits?',
        options: ['Scatter plot', 'Bar chart of regions', 'Line chart over months', 'Histogram of one column'],
        correct: 0,
        hint: 'You are looking at the relationship between two numeric variables.',
        explanation: 'A scatter plot shows how one variable changes with another.',
      },
      {
        type: 'quickCheck',
        question: 'Which call draws revenue totals for four regions as bars?',
        options: [
          'plt.bar(regions, revenue)',
          'plt.hist(revenue)',
          'plt.scatter(regions, revenue)',
          'plt.plot(revenue)',
        ],
        correct: 0,
        hint: 'The function name is the chart type.',
        explanation: 'plt.bar(x, height) draws one bar per category.',
      },
    ],
    references: [w3('Matplotlib bars', 'matplotlib_bars.asp'), mplPlotTypes, videoRef],
  },

  'dv-4': {
    video: video(),
    activities: [
      {
        type: 'miniSheet',
        title: 'Response times (ms)',
        columns: ['A', 'B'],
        rows: [
          ['Request', 'Time (ms)'],
          ['R1', 120],
          ['R2', 135],
          ['R3', 128],
          ['R4', 142],
          ['R5', 131],
          ['R6', 980],
          ['R7', 125],
        ],
        challenge: { target: 'B7', text: 'Tap the outlier that an average would hide.' },
      },
      {
        type: 'quickCheck',
        question: 'In plt.hist(data, bins=12), what does bins control?',
        options: [
          'How many intervals the value range is divided into',
          'How many data points are plotted',
          'The color of the bars',
          'The maximum value on the axis',
        ],
        correct: 0,
        hint: 'Each bar covers one interval of values.',
        explanation: 'bins sets the number of intervals, so each bar counts the values in one interval.',
      },
    ],
    references: [w3('Matplotlib histograms', 'matplotlib_histograms.asp'), mplPlotTypes, videoRef],
  },

  'dv-5': {
    video: video(),
    activities: [
      {
        type: 'quickCheck',
        question: "What does plt.xlabel('Month') do?",
        options: [
          'Sets the text label of the x-axis',
          'Changes the values on the x-axis',
          'Draws a vertical line at Month',
          'Adds a title above the chart',
        ],
        correct: 0,
        hint: 'A label names the axis. A title is a different call.',
        explanation: 'plt.xlabel sets the x-axis label. plt.title sets the chart title.',
      },
      {
        type: 'quickCheck',
        question: 'A campaign launched in March. How should the trend chart show it?',
        options: [
          'One annotation at March',
          'An annotation on every month',
          'Remove the line so only the campaign shows',
          'Switch to a pie chart',
        ],
        correct: 0,
        hint: 'Annotate moments that matter, not every fluctuation.',
        explanation: 'A single annotation explains the change without cluttering the trend.',
      },
    ],
    references: [w3('Matplotlib line', 'matplotlib_line.asp'), mplPlotTypes, videoRef], // line page: VERIFY
  },

  'dv-6': {
    video: video(),
    activities: [
      {
        type: 'quickCheck',
        question: 'You want viewers to notice only the West region. Which color choice works best?',
        options: [
          'West in one strong color, other regions in gray',
          'Every region in a different bright color',
          'All regions in the same strong color',
          'A rainbow palette',
        ],
        correct: 0,
        hint: 'Color should guide attention.',
        explanation: 'One highlight color with neutral context draws the eye to the point you want.',
      },
      {
        type: 'quickCheck',
        question: 'Which call draws red bars in Matplotlib?',
        options: [
          'plt.bar(x, y, color="red")',
          'plt.bar(x, y, colour="red")',
          'plt.bar(x, y, bar_color="red")',
          'plt.bar(x, y, paint="red")',
        ],
        correct: 0,
        hint: 'Matplotlib uses the American spelling as the keyword argument.',
        explanation: 'bar() takes the keyword argument color.',
      },
    ],
    references: [w3('Matplotlib bars', 'matplotlib_bars.asp'), videoRef],
  },

  'dv-7': {
    video: video(),
    activities: [
      {
        type: 'quickCheck',
        question: 'Where should the most important KPI cards go on a dashboard?',
        options: [
          'At the top, where the viewer looks first',
          'At the bottom, after all the details',
          'Hidden behind a filter',
          'Spread randomly so users explore',
        ],
        correct: 0,
        hint: 'Lead with the headline.',
        explanation: 'Placing key metrics first lets the dashboard start with the decision, not the details.',
      },
      {
        type: 'quickCheck',
        question: 'Users can only see the main trend after setting five filters. What is the best fix?',
        options: [
          'Show the main trend by default and keep filters as optional drilldown',
          'Add more filters',
          'Remove the trend chart',
          'Make the filters larger than the chart',
        ],
        correct: 0,
        hint: 'Interactions should support the story, not hide it.',
        explanation: 'Showing the headline first and revealing detail on request keeps the story visible.',
      },
    ],
    references: [w3('Matplotlib subplot', 'matplotlib_subplot.asp'), videoRef], // VERIFY
  },

  'dv-8': {
    video: video(),
    references: [videoRef],
    activities: [
      {
        type: 'quickCheck',
        question: 'Which is the clearest takeaway to put under a chart?',
        options: [
          'Conversion increased 14% after the campaign launch',
          'Here is a chart of conversion',
          'See the data below',
          'Many lines, many colors',
        ],
        correct: 0,
        hint: 'State the main point in plain language, with the number.',
        explanation: 'A good takeaway says what changed and by how much.',
      },
      {
        type: 'quickCheck',
        question: 'Sales rose after a campaign. Which wording avoids overclaiming?',
        options: [
          'Sales rose after the campaign; other factors may also have contributed',
          'The campaign caused the increase',
          'The chart proves the campaign works',
          'Campaigns always raise sales',
        ],
        correct: 0,
        hint: 'A chart alone rarely proves causation.',
        explanation: 'Describing the timing without claiming proof keeps the claim within what the data supports.',
      },
    ],
  },

  'dv-9': {
    video: video(),
    references: [videoRef],
    activities: [
      {
        type: 'quickCheck',
        question: 'In the workflow SQL, Python, chart library, dashboard tool, which step usually aggregates structured data first?',
        options: ['SQL', 'Dashboard tool', 'Chart library', 'Presentation'],
        correct: 0,
        hint: 'It is the first tool in the workflow.',
        explanation: 'SQL queries and aggregates structured data before it is cleaned and visualized.',
      },
      {
        type: 'quickCheck',
        question: 'Why document where the data came from and how it was transformed?',
        options: [
          'So others can trust and reproduce the chart',
          'To make the chart load faster',
          'To avoid choosing a chart type',
          'To make the dataset larger',
        ],
        correct: 0,
        hint: 'Think about someone else repeating your work.',
        explanation: 'A reproducible pipeline builds trust because anyone can check each step.',
      },
    ],
  },

  'dv-10': {
    video: video(),
    references: [videoRef],
    activities: [
      {
        type: 'quickCheck',
        question: 'Which portfolio project is strongest?',
        options: [
          'One chart answering "Which customer segments drive the most retention revenue?" with a short method note',
          'Ten unrelated charts with no text',
          'A screenshot with no explanation',
          'A long description with no chart',
        ],
        correct: 0,
        hint: 'A viewer should see the question, method, and insight in minutes.',
        explanation: 'A clear question, honest method, and polished result make the project credible.',
      },
      {
        type: 'quickCheck',
        question: 'What belongs in the method summary of a portfolio project?',
        options: [
          'How the data was cleaned, the metric tracked, and why the chart type was chosen',
          'Only the tool names',
          'Only the final chart',
          'A list of colors used',
        ],
        correct: 0,
        hint: 'The method shows your rigor.',
        explanation: 'Explaining cleaning, metric, and chart choice makes the story credible.',
      },
    ],
  },
};
