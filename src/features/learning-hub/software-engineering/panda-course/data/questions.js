export const QUESTIONS = [
  {
    lessonId: 'pandas-intro',
    question: 'What is the standard community alias used when importing Pandas into code?',
    answers: ['pd', 'pan', 'pds', 'dataframe'],
    correct: 0,
    explanation: 'The convention is to use "import pandas as pd" to keep syntax typing efficient.',
  },
  {
    lessonId: 'pandas-series',
    question: 'Which statement accurately describes a Pandas Series?',
    answers: [
      'A multi-dimensional nested database structure',
      'A one-dimensional labeled array representing a single column',
      'A file reading tool built exclusively for text',
      'An automated data cleaning algorithm'
    ],
    correct: 1,
    explanation: 'A Series holds data along a single dimension, functioning like a single standalone table column.',
  },
  {
    lessonId: 'pandas-dataframes',
    question: 'Which keyword attribute does a DataFrame use to fetch specific individual rows by index label names?',
    answers: ['.fetch()', '.row()', '.loc', '.query()'],
    correct: 2,
    explanation: 'The loc parameter uses names or index coordinate values to retrieve row matrices safely.',
  },
  {
    lessonId: 'pandas-read-csv',
    question: 'What is the primary operational difference between printing a DataFrame directly versus using .to_string()?',
    answers: [
      '.to_string() converts numbers into integers permanently.',
      'Printing directly alters formatting rules.',
      '.to_string() forces the layout engine to render the complete table without collapsing mid-rows.',
      'There is no operational difference.'
    ],
    correct: 2,
    explanation: 'Without to_string(), large tables collapse into tiny 5-row summaries to prevent screen pollution.',
  },
  {
    lessonId: 'pandas-read-json',
    question: 'Which Python standard data structure maps most naturally into JSON object text blocks?',
    answers: ['Lists', 'Tuples', 'Dictionaries', 'Sets'],
    correct: 2,
    explanation: 'JSON models match the key-value layout rules of Python dictionaries perfectly.',
  },
  {
    lessonId: 'pandas-viewing',
    question: 'If you execute df.tail() without passing an explicit numerical argument, how many rows are returned?',
    answers: ['All rows', '1 row', '10 rows', '5 rows'],
    correct: 3,
    explanation: 'Both head() and tail() default to showing exactly 5 rows when arguments are left blank.',
  },
  {
    lessonId: 'pandas-clean-empty',
    question: 'What does setting the parameter "inplace = True" accomplish inside cleaning methods like dropna()?',
    answers: [
      'It isolates edits onto an independent array copy.',
      'It applies changes directly to the original active DataFrame without generating copies.',
      'It exports data directly into an external folder path.',
      'It ignores all validation warnings automatically.'
    ],
    correct: 1,
    explanation: 'Inplace options overwrite raw baseline instances in memory directly, saving system resources.',
  },
  {
    lessonId: 'pandas-clean-wrong',
    question: 'Which method should you run to drop rows containing exact duplicates from your tracking blocks?',
    answers: ['df.clean_duplicates()', 'df.drop_duplicates()', 'df.remove()', 'df.dropna()'],
    correct: 1,
    explanation: 'drop_duplicates() clears repeated rows out of the collection, leaving unique indices untouched.',
  },
  {
    lessonId: 'pandas-correlations',
    question: 'What does a calculated correlation coefficient score of exactly 0 indicate between two fields?',
    answers: [
      'A perfect positive straight line match',
      'A broken system processing failure',
      'No linear relationship or correlation exists between those features',
      'A perfect negative relationship'
    ],
    correct: 2,
    explanation: 'Correlation coordinates move from -1 to 1. A zero reading denotes an absolute absence of a linear trend relationship.',
  },
  {
    lessonId: 'pandas-plotting',
    question: 'Which argument parameter should you pass inside plot() to generate a visualization comparing two continuous data features?',
    answers: ["kind = 'hist'", "kind = 'scatter'", "kind = 'line'", "kind = 'pie'"],
    correct: 1,
    explanation: "Setting kind='scatter' maps data coordinates cleanly across X and Y coordinate axes, ideal for relationship lookups.",
  },
];