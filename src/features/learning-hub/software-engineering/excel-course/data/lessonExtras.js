// Interactive extras for each Excel lesson, matched by lesson id (ids must stay the same).
// lessons.js merges these into the lessons, so the original text content is untouched.
//
// HOW VIDEOS WORK
// 1) VIDEOS lists every video you use. Fill each one from its YouTube page:
//    id (the part after v= or youtu.be/), title, channel, date, and author if different.
// 2) VIDEO_FOR says which video each lesson shows: [videoKey, startSeconds, chapterName].
//    Each video's APA reference is added to that lesson automatically.
// Use only trusted channels (for example freeCodeCamp.org, Microsoft 365, GCFLearnFree).

const VIDEO_ID = 'mDqQ1Q7qXQY';

const VIDEOS = {
  course: {
    id: 'Vl0H-qTclOg',
    title: 'Microsoft Excel tutorial for beginners - Full course',
    channel: 'freeCodeCamp.org',
    author: 'Shad Sluiter',
    date: '2020, October 28',
  },
  cellRef: {
    id: 'oSNuRasYl60',
    title: 'How to cell reference in Excel',
    channel: 'Kevin Stratvert',
    date: '2019, December 31',
  },
  countif: {
    id: 'if4i55JB58M',
    title: 'How to use COUNTIF and COUNTIFS in Microsoft Excel',
    channel: 'Kevin Stratvert',
    date: '2020, January 27',
  },
  cleaning: {
    id: 'jxq4-KSB_OA',
    title: 'Master data cleaning essentials on Excel in just 10 minutes',
    channel: 'Kenji Explains',
    author: 'Kenji Farré',
    date: '2023, June 12',
  },
  pivot: {
    id: 'dvbLrwD2SpA',
    title: 'Pivot table Excel | Step-by-step tutorial',
    channel: 'Kevin Stratvert',
    date: '2024, October 7',
  },
};

// Chapters of the full course, checked on the YouTube page: [start in seconds, chapter name]
const CHAPTERS = {
  intro: [0, 'Intro'],
  gradebook: [2375, 'Gradebook'], // 39:35
  decisionFactors: [3442, 'Decision Factors'], // 57:22
  salesDatabase: [3880, 'Sales Database'], // 1:04:40
  carInventory: [4993, 'Car Inventory'], // 1:23:13
  problemSolving: [7169, 'Problem Solving Templates'], // 1:59:29
};

// Which video each lesson shows. Every lesson uses the full course until you change it.
// Example: 'excel-9': ['course', ...CHAPTERS.salesDatabase],
const VIDEO_FOR = {
  'excel-1': ['course', ...CHAPTERS.intro],
  'excel-2': ['course'],
  'excel-3': ['course'],
  'excel-4': ['cellRef'],
  'excel-5': ['course'],
  'excel-6': ['countif'],
  'excel-7': ['course'],
  'excel-8': ['cleaning'],
  'excel-9': ['course'],
  'excel-10': ['course'],
  'excel-11': ['pivot'],
};

// References are in APA 7th style (LessonReferences shows text + link).
// W3Schools and Microsoft Support pages show no publication date, so they use (n.d.).
const w3 = (title, page) => ({
  text: `W3Schools. (n.d.). ${title}.`,
  url: `https://www.w3schools.com/Excel/${page}`,
});
const msExcel = {
  text: 'Microsoft. (n.d.). Excel help & learning. Microsoft Support.',
  url: 'https://support.microsoft.com/Excel',
};
const videoRef = (v) => ({
  text: `${v.channel}. (${v.date}). ${v.title} [Video]. YouTube.`,
  url: `https://youtu.be/${v.id}`,
});

const mdn = (title, path) => ({
  text: `MDN Web Docs. (n.d.). ${title}.`,
  url: `https://developer.mozilla.org/en-US/docs/${path}`,
});



const BASE = {
  'excel-1': {
    activities: [
      {
        type: 'miniSheet',
        title: 'Try it: tap the cells',
        columns: ['A', 'B', 'C'],
        rows: [['Name', 'Sales', 'Region'], ['Ana', 1200, 'North'], ['Ben', 950, 'South']],
        challenge: { text: "Challenge: tap the cell with Ben's sales.", target: 'B3' },
      },
      {
        type: 'quickCheck',
        question: 'Which cell holds the word "North"?',
        options: ['A2', 'C2', 'B3', 'C3'],
        correct: 1,
        hint: 'Say the column letter first, then the row number.',
        explanation: 'North is in column C, row 2, so its address is C2.',
      },
    ],
    references: [w3('Excel get started', 'excel_get_started.php'), w3('Excel ranges', 'excel_ranges.php'), msExcel],
  },

  'excel-2': {
    activities: [
      {
        type: 'quickCheck',
        question: 'You type 1 in A1 and 2 in A2, select both, and drag the fill handle down to A5. What does A5 contain?',
        options: ['5', '2', '1', '3'],
        correct: 0,
        hint: 'Excel continues the pattern 1, 2, 3...',
        explanation: 'The series continues one step per cell: A3=3, A4=4, A5=5.',
      },
      {
        type: 'quickCheck',
        question: 'You select a cell and press the Delete key. What happens?',
        options: [
          'The cell is removed and others shift',
          'Only its contents are cleared',
          'The whole row is deleted',
          'Nothing happens',
        ],
        correct: 1,
        hint: 'Think about the difference from right-click > Delete.',
        explanation: 'The Delete key only clears the contents. Right-click > Delete removes the cell and shifts others.',
      },
    ],
    references: [w3('Excel fill', 'excel_filling.php'), w3('Excel move cells', 'excel_move_cells.php'), msExcel],
  },

  'excel-3': {
    activities: [
      {
        type: 'miniSheet',
        title: 'Try it: formulas in cells',
        columns: ['A', 'B', 'C'],
        rows: [
          ['Price', 'Qty', 'Total'],
          [50, 3, { f: '=A2*B2', v: 150 }],
          [20, 5, { f: '=A3*B3', v: 100 }],
        ],
        challenge: {
          text: 'Challenge: tap the cell that calculates the total for the second item.',
          target: 'C3',
        },
      },
      {
        type: 'quickCheck',
        question: 'What is the result of =10-2*3?',
        options: ['24', '4', '16', '1'],
        correct: 1,
        hint: 'Multiplication happens before subtraction.',
        explanation: '2*3 = 6 first, then 10-6 = 4.',
      },
    ],
    references: [w3('Excel formulas', 'excel_formulas.php'), w3('Excel parentheses', 'excel_parantheses.php'), msExcel],
  },

  'excel-4': {
    activities: [
      {
        type: 'miniSheet',
        title: 'Try it: the locked tax rate',
        columns: ['A', 'B', 'C'],
        rows: [
          ['Price', 'Tax rate', 'Total'],
          [100, 0.12, { f: '=A2*(1+$B$2)', v: 112 }],
          [200, '', { f: '=A3*(1+$B$2)', v: 224 }],
        ],
        challenge: { text: 'Challenge: tap the cell that every formula locks with $B$2.', target: 'B2' },
      },
      {
        type: 'quickCheck',
        question: 'D2 contains =C2*$F$1 and is copied down to D5. What does D5 contain?',
        options: ['=C5*$F$1', '=C2*$F$1', '=C5*$F$4', '=$C$5*F1'],
        correct: 0,
        hint: 'The C part is relative, the $F$1 part is locked.',
        explanation: 'C2 moves down to C5 (relative), while $F$1 stays locked.',
      },
    ],
    references: [w3('Excel relative reference', 'excel_rel_ref.php'), w3('Excel absolute reference', 'excel_abs_ref.php'), msExcel],
  },

  'excel-5': {
    activities: [
      {
        type: 'miniSheet',
        title: 'Try it: SUM in a cell',
        columns: ['A', 'B'],
        rows: [
          ['Item', 'Sales'],
          ['Pen', 20],
          ['Book', 35],
          ['Bag', 50],
          ['Total', { f: '=SUM(B2:B4)', v: 105 }],
        ],
        challenge: { text: 'Challenge: tap the cell that adds up the sales.', target: 'B5' },
      },
      {
        type: 'quickCheck',
        question: 'A1:A4 contain Item, Pen, Book, Bag and A5 is empty. What does =COUNTA(A1:A5) return?',
        options: ['5', '4', '1', '0'],
        correct: 1,
        hint: 'COUNTA skips empty cells.',
        explanation: 'Four cells are not empty, so COUNTA returns 4.',
      },
    ],
    references: [w3('Excel functions', 'excel_functions.php'), w3('Excel SUM function', 'excel_sum.php'), msExcel],
  },

  'excel-6': {
    activities: [
      {
        type: 'miniSheet',
        title: 'Try it: IF results',
        columns: ['A', 'B', 'C'],
        rows: [
          ['Name', 'Score', 'Result'],
          ['Ana', 82, { f: '=IF(B2>=75,"Pass","Fail")', v: 'Pass' }],
          ['Ben', 70, { f: '=IF(B3>=75,"Pass","Fail")', v: 'Fail' }],
        ],
        challenge: { text: 'Challenge: tap the cell whose formula returns Fail.', target: 'C3' },
      },
      {
        type: 'quickCheck',
        question: 'B2 is 80 and C2 is 60. What does =AND(B2>=75,C2>=75) return?',
        options: ['TRUE', 'FALSE', '80', '60'],
        correct: 1,
        hint: 'AND needs every condition to be true.',
        explanation: 'C2 is below 75, so not all conditions are true and AND returns FALSE.',
      },
    ],
    references: [w3('Excel IF function', 'excel_if.php'), w3('Excel COUNTIF function', 'excel_countif.php'), msExcel],
  },

  'excel-7': {
    activities: [
      {
        type: 'quickCheck',
        question: 'Which shortcut opens the Format Cells dialog?',
        options: ['Ctrl+H', 'Ctrl+T', 'Ctrl+1', 'Ctrl+Z'],
        correct: 2,
        hint: 'It is a number, not a letter.',
        explanation: 'Ctrl+1 opens Format Cells with every formatting option.',
      },
      {
        type: 'quickCheck',
        question: 'How do you AutoFit a column to its content?',
        options: [
          'Double-click the border between two column letters',
          'Press Ctrl+W',
          'Right-click the sheet tab',
          'Click the Name Box',
        ],
        correct: 0,
        hint: 'Look at the line between the column letters.',
        explanation: 'Double-clicking the column border fits the width to the longest content.',
      },
    ],
    references: [w3('Excel formatting', 'excel_formatting.php'), w3('Excel format painter', 'excel_format_painter.php'), msExcel],
  },

  'excel-8': {
    activities: [
      {
        type: 'miniSheet',
        title: 'Try it: cleaning text',
        columns: ['A', 'B'],
        rows: [
          ['Raw', 'Clean'],
          ['  ana cruz ', { f: '=PROPER(TRIM(A2))', v: 'Ana Cruz' }],
          ['BEN reyes', { f: '=PROPER(TRIM(A3))', v: 'Ben Reyes' }],
        ],
        challenge: { text: 'Challenge: tap the cell that cleans the text in row 3.', target: 'B3' },
      },
      {
        type: 'quickCheck',
        question: 'Which Data tab tool deletes repeated rows?',
        options: ['Find and Replace', 'Remove Duplicates', 'Text to Columns', 'Format Painter'],
        correct: 1,
        hint: 'The name says what it does.',
        explanation: 'Remove Duplicates keeps one copy of each row based on the columns you choose.',
      },
    ],
    references: [w3('Excel TRIM function', 'excel_trim.php'), w3('Excel remove duplicates', 'excel_howto_remove_duplicates.php'), msExcel],
  },

  'excel-9': {
    activities: [
      {
        type: 'quickCheck',
        question: 'You want to sort by Region first, then by Sales from largest to smallest. Which feature do you use?',
        options: ['Quick Filter', 'Custom Sort', 'Remove Duplicates', 'Format Painter'],
        correct: 1,
        hint: 'You need more than one sort level.',
        explanation: 'Custom Sort lets you add several sort levels, one per column.',
      },
      {
        type: 'quickCheck',
        question: 'You type a new row directly below a table. What happens?',
        options: [
          'Nothing, the table stays the same',
          'The table expands to include it',
          'Excel deletes the row',
          'The table is sorted',
        ],
        correct: 1,
        hint: 'Think about why tables are useful.',
        explanation: 'Tables grow automatically when you add data right below them.',
      },
    ],
    references: [w3('Excel sort', 'excel_sort.php'), w3('Excel filter', 'excel_filter.php'), w3('Excel tables', 'excel_tables.php'), msExcel],
  },

  'excel-10': {
    activities: [
      {
        type: 'quickCheck',
        question: 'You want to show the share of 4 categories in a whole. Which chart fits best?',
        options: ['Pie chart', 'Line chart', 'Scatter chart', 'Histogram'],
        correct: 0,
        hint: 'Parts of a whole, with only a few categories.',
        explanation: 'Pie charts show parts of a whole and work best with a few categories.',
      },
      {
        type: 'quickCheck',
        question: 'Which rule highlights every value above a number you choose?',
        options: ['Data Bars', 'Color Scales', 'Highlight Cells Rules > Greater Than', 'Icon Sets'],
        correct: 2,
        hint: 'Look for the rule that compares with a number.',
        explanation: 'Greater Than under Highlight Cells Rules marks cells above your number.',
      },
    ],
    references: [w3('Excel conditional format', 'excel_conditional_formatting.php'), w3('Excel charts', 'excel_charts.php'), msExcel],
  },

  'excel-11': {
    activities: [
      {
        type: 'miniSheet',
        title: 'Try it: a pivot table result',
        columns: ['A', 'B'],
        rows: [
          ['Region', 'Sum of Sales'],
          ['North', 2400],
          ['South', 1800],
          ['Grand Total', 4200],
        ],
        challenge: { text: 'Challenge: tap the cell showing total sales for South.', target: 'B3' },
      },
      {
        type: 'quickCheck',
        question: 'You want each region listed as its own row in a pivot table. Where do you drag the Region field?',
        options: ['Rows', 'Values', 'Filters', 'Nowhere'],
        correct: 0,
        hint: 'Rows group, Values calculate.',
        explanation: 'Fields in Rows become the row labels of the pivot table.',
      },
    ],
    references: [w3('Excel PivotTable intro', 'excel_table_pivot_intro.php'), msExcel],
  },
};

const video = (chapter, start = 0, key = 'course') => ({
  id: VIDEOS[key].id,
  start,
  chapter,
  title: VIDEOS[key].title,
  channel: VIDEOS[key].channel,
});

export const EXTRAS = Object.fromEntries(
  Object.entries(BASE).map(([lessonId, extra]) => {
    const [key, start = 0, chapter] = VIDEO_FOR[lessonId] || ['course'];
    const v = VIDEOS[key];
    return [
      lessonId,
      {
        ...extra,
        video: video(chapter ?? 'Course', start, key),
        references: [...(extra.references ?? []), videoRef(v)],
      },
    ];
  }),
);
