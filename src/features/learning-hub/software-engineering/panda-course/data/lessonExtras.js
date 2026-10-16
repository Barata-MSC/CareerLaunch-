// Interactive extras for each Pandas lesson, matched by lesson id (ids must stay the same).
// lessons.js merges these into the lessons, so the original text content is untouched.
//
// HOW VIDEOS WORK
// 1) VIDEOS lists every video you use. Fill each one from its YouTube page:
//    id (the part after v= or youtu.be/), title, channel, date, and author if different.
// 2) VIDEO_FOR says which video each lesson shows: [videoKey, startSeconds, chapterName].
//    Each video's APA reference is added to that lesson automatically.
//
// Python exercises (type 'pyRunner') run real Python and Pandas (Pyodide) and need internet.
// Their `expected` output was produced by running the solution in Pyodide 0.28.1 (Pandas 2.3.1).

const VIDEOS = {
  course: {
    id: 'EhYC02PD_gc',
    title: 'Pandas full Python course - Data science fundamentals',
    channel: 'NeuralNine',
    date: '2025, January 25',
  },
};

// Which video each lesson shows. Every lesson uses the full course until you change it.
// To start a lesson at a chapter, read its time on YouTube, e.g. 'pandas-viewing': ['course', 1260, 'Viewing data']
const VIDEO_FOR = {
  'pandas-intro': ['course'],
  'pandas-series': ['course'],
  'pandas-dataframes': ['course'],
  'pandas-read-csv': ['course'],
  'pandas-read-json': ['course'],
  'pandas-viewing': ['course'],
  'pandas-clean-empty': ['course'],
  'pandas-clean-wrong': ['course'],
  'pandas-correlations': ['course'],
  'pandas-plotting': ['course'],
};

// References are in APA 7th style (LessonReferences shows text + link).
// W3Schools and the pandas documentation show no publication date, so they use (n.d.).
const w3 = (title, page) => ({
  text: `W3Schools. (n.d.). ${title}.`,
  url: `https://www.w3schools.com/Python/pandas/${page}`,
});
const pd = (title, page) => ({
  text: `pandas development team. (n.d.). ${title}. pandas documentation.`,
  url: `https://pandas.pydata.org/docs/reference/api/${page}`,
});
const videoRef = (v) => ({
  text: `${v.channel}. (${v.date}). ${v.title} [Video]. YouTube.`,
  url: `https://youtu.be/${v.id}`,
});

const BASE = {
  'pandas-intro': {
    activities: [
      {
        type: 'pyRunner',
        title: 'Create a DataFrame',
        task: 'Create a DataFrame from mydataset and print it.',
        starter: `import pandas as pd

mydataset = {
  'cars': ["BMW", "Volvo", "Ford"],
  'passings': [3, 7, 2]
}

# Create a DataFrame from mydataset and print it
`,
        expected: ['    cars  passings', '0    BMW         3', '1  Volvo         7', '2   Ford         2'],
        checks: [/pd\.DataFrame\(\s*mydataset\s*\)/],
        hint: 'Use pd.DataFrame(mydataset), then print the result.',
      },
      {
        type: 'quickCheck',
        question: 'What does "import pandas as pd" let you do?',
        options: [
          'Write pd instead of pandas',
          'Install Pandas on your computer',
          'Create a new DataFrame',
          'Read a CSV file',
        ],
        correct: 0,
        hint: 'Think about the word "as".',
        explanation: 'The alias pd is just a shorter name, so you can write pd.DataFrame(...) instead of pandas.DataFrame(...).',
      },
    ],
    references: [w3('Pandas intro', 'pandas_intro.asp'), w3('Pandas getting started', 'pandas_getting_started.asp'), pd('pandas.DataFrame', 'pandas.DataFrame.html')],
  },

  'pandas-series': {
    activities: [
      {
        type: 'pyRunner',
        title: 'Label a Series',
        task: 'Create a Series from a with the labels "x", "y", "z", then print the value labeled "y".',
        starter: `import pandas as pd

a = [1, 7, 2]

# Create a Series with the labels "x", "y", "z"
# Then print the value labeled "y"
`,
        expected: ['7'],
        checks: [/pd\.Series\(/, /index\s*=\s*\[/],
        hint: 'Use pd.Series(a, index=["x", "y", "z"]) and print(myvar["y"]).',
      },
      {
        type: 'quickCheck',
        question: 'A Series is created without an index argument. What labels do its values get?',
        options: ['0, 1, 2, ...', 'a, b, c, ...', 'x, y, z', '1, 2, 3, ...'],
        correct: 0,
        hint: 'Python counts from zero.',
        explanation: 'Without an index argument, the values are labeled with their index numbers starting at 0.',
      },
    ],
    references: [w3('Pandas Series', 'pandas_series.asp'), pd('pandas.Series', 'pandas.Series.html')],
  },

  'pandas-dataframes': {
    activities: [
      {
        type: 'pyRunner',
        title: 'Locate a row',
        task: 'Print the row labeled "day2" using loc.',
        starter: `import pandas as pd

data = {
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
}

df = pd.DataFrame(data, index=["day1", "day2", "day3"])

# Print the row labeled "day2"
`,
        expected: ['calories    380', 'duration     40', 'Name: day2, dtype: int64'],
        checks: [/\.loc\[\s*["']day2["']\s*\]/],
        hint: 'Use print(df.loc["day2"]).',
      },
      {
        type: 'quickCheck',
        question: 'What is the difference between a Series and a DataFrame?',
        options: [
          'A Series is one column; a DataFrame is a table with rows and columns',
          'A Series holds text only; a DataFrame holds numbers only',
          'A DataFrame is one column; a Series is a table',
          'There is no difference',
        ],
        correct: 0,
        hint: 'One is a single column, the other is the whole table.',
        explanation: 'A Series is a single labeled column. A DataFrame is a 2-dimensional table made of columns.',
      },
    ],
    references: [w3('Pandas DataFrames', 'pandas_dataframes.asp'), pd('pandas.DataFrame.loc', 'pandas.DataFrame.loc.html')],
  },

  'pandas-read-csv': {
    activities: [
      {
        type: 'pyRunner',
        title: 'Read a CSV file',
        task: 'Read data.csv and print the whole table with to_string().',
        files: { 'data.csv': 'Duration,Pulse,Calories\n60,110,409\n60,117,479\n60,103,340\n45,109,282\n45,117,406\n' },
        starter: `import pandas as pd

# Read data.csv and print the whole table with to_string()
`,
        expected: [
          '   Duration  Pulse  Calories',
          '0        60    110       409',
          '1        60    117       479',
          '2        60    103       340',
          '3        45    109       282',
          '4        45    117       406',
        ],
        checks: [/pd\.read_csv\(\s*["']data\.csv["']\s*\)/, /\.to_string\(\s*\)/],
        hint: 'Use df = pd.read_csv(\'data.csv\') and print(df.to_string()).',
      },
      {
        type: 'quickCheck',
        question: 'A DataFrame is too long to show. What does print(df) display by default?',
        options: ['Only the first 5 and last 5 rows', 'All rows', 'Only the column names', 'Nothing'],
        correct: 0,
        hint: 'Pandas shortens long tables.',
        explanation: 'Long tables are shortened to the first 5 and last 5 rows. to_string() prints the whole table.',
      },
    ],
    references: [w3('Pandas read CSV', 'pandas_csv.asp'), pd('pandas.read_csv', 'pandas.read_csv.html')],
  },

  'pandas-read-json': {
    activities: [
      {
        type: 'pyRunner',
        title: 'Read a JSON file',
        task: 'Load data.json into a DataFrame and print it with to_string().',
        files: { 'data.json': '{"Duration":{"0":60,"1":60,"2":45},"Pulse":{"0":110,"1":117,"2":109}}' },
        starter: `import pandas as pd

# Load data.json and print the whole table with to_string()
`,
        expected: ['   Duration  Pulse', '0        60    110', '1        60    117', '2        45    109'],
        checks: [/pd\.read_json\(\s*["']data\.json["']\s*\)/, /\.to_string\(\s*\)/],
        hint: 'Use df = pd.read_json(\'data.json\') and print(df.to_string()).',
      },
      {
        type: 'quickCheck',
        question: 'What does pd.read_json(\'data.json\') return?',
        options: ['A DataFrame', 'A plain string', 'A CSV file', 'A Series of strings'],
        correct: 0,
        hint: 'Think about what read_csv returns.',
        explanation: 'Like read_csv, read_json loads the file into a DataFrame.',
      },
    ],
    references: [w3('Pandas read JSON', 'pandas_json.asp'), pd('pandas.read_json', 'pandas.read_json.html')],
  },

  'pandas-viewing': {
    activities: [
      {
        type: 'pyRunner',
        title: 'Peek at the data',
        task: 'Print the first 3 rows, then print the last 2 rows.',
        files: { 'data.csv': 'Duration,Pulse,Calories\n60,110,409\n60,117,479\n60,103,340\n45,109,282\n45,117,406\n60,102,300\n60,110,374\n45,104,253\n' },
        starter: `import pandas as pd

df = pd.read_csv('data.csv')

# Print the first 3 rows, then the last 2 rows
`,
        expected: [
          '   Duration  Pulse  Calories',
          '0        60    110       409',
          '1        60    117       479',
          '2        60    103       340',
          '   Duration  Pulse  Calories',
          '6        60    110       374',
          '7        45    104       253',
        ],
        checks: [/\.head\(\s*3\s*\)/, /\.tail\(\s*2\s*\)/],
        hint: 'Use print(df.head(3)) and print(df.tail(2)).',
      },
      {
        type: 'quickCheck',
        question: 'Which method shows the number of non-null values and the data type of each column?',
        options: ['df.info()', 'df.head()', 'df.tail()', 'df.show()'],
        correct: 0,
        hint: 'It gives a structural summary.',
        explanation: 'info() summarizes rows, columns, data types and non-null counts. head() and tail() only show rows.',
      },
    ],
    references: [w3('Pandas analyzing data', 'pandas_analyzing.asp'), pd('pandas.DataFrame.head', 'pandas.DataFrame.head.html'), pd('pandas.DataFrame.info', 'pandas.DataFrame.info.html')],
  },

  'pandas-clean-empty': {
    activities: [
      {
        type: 'pyRunner',
        title: 'Remove empty cells',
        task: 'data.csv has one empty Calories cell. Read the file, remove the rows that contain empty cells, and print the result.',
        files: { 'data.csv': 'Duration,Calories\n60,409\n45,\n60,340\n45,282\n' },
        starter: `import pandas as pd

# Read data.csv, remove the rows with empty cells, and print the result
`,
        expected: [
          '   Duration  Calories',
          '0        60     409.0',
          '2        60     340.0',
          '3        45     282.0',
        ],
        checks: [/\.dropna\(/],
        hint: 'Use new_df = df.dropna() and print(new_df).',
      },
      {
        type: 'quickCheck',
        question: 'What does df.fillna(130) do?',
        options: [
          'Replaces empty cells with 130',
          'Removes rows with empty cells',
          'Adds 130 to every cell',
          'Fills the file with 130 rows',
        ],
        correct: 0,
        hint: 'Fill the NAs.',
        explanation: 'fillna replaces empty (NaN) cells with the value you give it, here 130.',
      },
    ],
    references: [w3('Cleaning data', 'pandas_cleaning.asp'), w3('Cleaning empty cells', 'pandas_cleaning_empty_cells.asp'), pd('pandas.DataFrame.dropna', 'pandas.DataFrame.dropna.html'), pd('pandas.DataFrame.fillna', 'pandas.DataFrame.fillna.html')],
  },

  'pandas-clean-wrong': {
    activities: [
      {
        type: 'pyRunner',
        title: 'Remove duplicates',
        task: 'Remove the duplicate row and print the DataFrame.',
        starter: `import pandas as pd

df = pd.DataFrame({
  "name": ["Ana", "Ben", "Ana"],
  "score": [90, 85, 90]
})

# Remove the duplicate row and print the DataFrame
`,
        expected: ['  name  score', '0  Ana     90', '1  Ben     85'],
        checks: [/drop_duplicates\(/],
        hint: 'Use df.drop_duplicates(inplace=True), then print(df).',
      },
      {
        type: 'quickCheck',
        question: 'Which function converts a column of date strings into real dates?',
        options: ['pd.to_datetime()', 'pd.read_date()', 'df.dates()', 'pd.Series()'],
        correct: 0,
        hint: 'The name says what it does.',
        explanation: 'pd.to_datetime() converts values to datetime objects so they can be compared and sorted correctly.',
      },
    ],
    references: [w3('Cleaning wrong format', 'pandas_cleaning_wrong_format.asp'), w3('Cleaning wrong data', 'pandas_cleaning_wrong_data.asp'), w3('Removing duplicates', 'pandas_cleaning_duplicates.asp'), pd('pandas.to_datetime', 'pandas.to_datetime.html'), pd('pandas.DataFrame.drop_duplicates', 'pandas.DataFrame.drop_duplicates.html')],
  },

  'pandas-correlations': {
    activities: [
      {
        type: 'pyRunner',
        title: 'Measure a correlation',
        task: 'Print the correlation between Duration and Calories, rounded to 2 decimals (use corr() and round()).',
        starter: `import pandas as pd

df = pd.DataFrame({
  "Duration": [30, 45, 60, 75],
  "Calories": [150, 260, 280, 390]
})

# Print the correlation between Duration and Calories, rounded to 2 decimals
`,
        expected: ['0.97'],
        checks: [/\.corr\(/, /round\(/],
        hint: 'Try print(round(df["Duration"].corr(df["Calories"]), 2)).',
      },
      {
        type: 'quickCheck',
        question: 'Two columns have a correlation of -0.9. What does that suggest?',
        options: [
          'When one goes up, the other tends to go down',
          'When one goes up, the other tends to go up',
          'The columns are unrelated',
          'One column causes the other',
        ],
        correct: 0,
        hint: 'Negative means opposite directions.',
        explanation: 'A value near -1 is a strong negative linear relationship. Correlation alone does not prove causation.',
      },
    ],
    references: [w3('Pandas correlations', 'pandas_correlations.asp'), pd('pandas.DataFrame.corr', 'pandas.DataFrame.corr.html')],
  },

  'pandas-plotting': {
    activities: [
      {
        type: 'order',
        title: 'Build a scatter plot',
        task: 'Tap the lines in the order you would write them: imports (pandas, then Matplotlib), load the data, plot, show.',
        items: [
          'import pandas as pd',
          'import matplotlib.pyplot as plt',
          'df = pd.read_csv(\'data.csv\')',
          'df.plot(kind=\'scatter\', x=\'Duration\', y=\'Calories\')',
          'plt.show()',
        ],
        hint: 'Imports come first, then loading the data, then plotting, and show the chart last.',
        explanation: 'Import the libraries, load the data, create the plot, then show it.',
      },
      {
        type: 'quickCheck',
        question: 'Which chart is best for showing how often values occur in one numeric column?',
        options: ['Histogram', 'Scatter plot', 'Line chart', 'Pie chart'],
        correct: 0,
        hint: 'Think about distributions.',
        explanation: 'A histogram shows the distribution of a numeric column. Scatter plots compare two columns.',
      },
    ],
    references: [w3('Pandas plotting', 'pandas_plotting.asp'), pd('pandas.DataFrame.plot', 'pandas.DataFrame.plot.html')],
  },
};

// Attach each lesson's video and its reference.
export const EXTRAS = Object.fromEntries(
  Object.entries(BASE).map(([lessonId, extra]) => {
    const [key, start = 0, chapter] = VIDEO_FOR[lessonId] || ['course'];
    const v = VIDEOS[key];
    return [
      lessonId,
      {
        ...extra,
        video: {
          id: v.id,
          start,
          chapter,
          title: v.title,
          channel: v.author ? `${v.channel} (${v.author})` : v.channel,
        },
        references: [...extra.references, videoRef(v)],
      },
    ];
  }),
);
