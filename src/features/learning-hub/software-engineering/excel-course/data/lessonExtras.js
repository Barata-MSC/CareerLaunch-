// Interactive extras for each Excel lesson, matched by lesson id.
// The course screens render these fields when present and keep the original lesson text untouched.

const VIDEO_ID = 'mDqQ1Q7qXQY';

const video = (chapter, start = 0) => ({
  id: VIDEO_ID,
  start,
  chapter,
  title: 'Excel for Beginners',
  channel: 'Microsoft 365',
});

const w3 = (title, page) => ({
  text: `W3Schools. (n.d.). ${title}.`,
  url: `https://www.w3schools.com/excel/${page}`,
});

const mdn = (title, path) => ({
  text: `MDN Web Docs. (n.d.). ${title}.`,
  url: `https://developer.mozilla.org/en-US/docs/${path}`,
});

const videoRef = {
  text: 'Microsoft 365. (n.d.). Excel for beginners [Video].',
  url: `https://youtu.be/${VIDEO_ID}`,
};

export const EXTRAS = {
  'excel-1': {
    video: video('Getting Started'),
    activities: [],
    references: [w3('Excel introduction', 'index.php'), videoRef],
  },
  'excel-2': {
    video: video('Fill and Edit'),
    activities: [],
    references: [w3('Excel fill data', 'index.php'), mdn('How to use Microsoft Excel', 'Web/Glossary/Excel')],
  },
  'excel-3': {
    video: video('Formulas'),
    activities: [],
    references: [w3('Excel formulas', 'excel_formulas.asp'), videoRef],
  },
  'excel-4': {
    video: video('Cell References'),
    activities: [],
    references: [w3('Excel cell references', 'excel_references.asp'), videoRef],
  },
  'excel-5': {
    video: video('Functions'),
    activities: [],
    references: [w3('Excel functions', 'excel_functions.asp'), videoRef],
  },
  'excel-6': {
    video: video('Formatting'),
    activities: [],
    references: [w3('Excel formatting', 'index.php'), videoRef],
  },
  'excel-7': {
    video: video('Working with Data'),
    activities: [],
    references: [w3('Excel sorting and filtering', 'excel_sort.asp'), videoRef],
  },
  'excel-8': {
    video: video('Data Validation'),
    activities: [],
    references: [w3('Excel data validation', 'excel_data_validation.asp'), videoRef],
  },
  'excel-9': {
    video: video('Charts'),
    activities: [],
    references: [w3('Excel charts', 'excel_charts.asp'), videoRef],
  },
  'excel-10': {
    video: video('Conditional Formatting'),
    activities: [],
    references: [w3('Excel conditional formatting', 'excel_conditional_formatting.asp'), videoRef],
  },
  'excel-11': {
    video: video('Pivot Tables'),
    activities: [],
    references: [w3('Excel pivot tables', 'excel_pivot_tables.asp'), videoRef],
  },
};
