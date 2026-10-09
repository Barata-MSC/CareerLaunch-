// Quiz question bank. Each question points to its lesson with lessonId.

export const QUESTIONS = [
  // 1 Getting Started
  {
    lessonId: 'excel-getting-started',
    question: 'What does the range A1:C3 refer to?',
    answers: ['Only cells A1 and C3', 'A block of 9 cells', 'Three cells in column A', 'A block of 6 cells'],
    correct: 1,
    explanation: 'A colon means "from A1 to C3": 3 columns x 3 rows = 9 cells.',
  },
  {
    lessonId: 'excel-getting-started',
    question: 'Which part of the screen shows the contents of the active cell, including its formula?',
    answers: ['Name Box', 'Sheet tab', 'Formula Bar', 'Status bar'],
    correct: 2,
    explanation: 'The Formula Bar shows what is inside the active cell. The Name Box only shows its address.',
  },
  // 2 Fill, Move, Add & Delete
  {
    lessonId: 'excel-fill-move',
    question: 'What is the small square at the bottom-right corner of a selected cell used for?',
    answers: ['Deleting the cell', 'Copying or continuing a series (fill handle)', 'Changing the font', 'Merging cells'],
    correct: 1,
    explanation: 'Dragging the fill handle copies the value or continues a pattern such as 1, 2, 3 or Mon, Tue, Wed.',
  },
  {
    lessonId: 'excel-fill-move',
    question: 'Which shortcut undoes your last action?',
    answers: ['Ctrl+Y', 'Ctrl+X', 'Ctrl+Z', 'Ctrl+V'],
    correct: 2,
    explanation: 'Ctrl+Z undoes. Ctrl+Y redoes what you undid.',
  },
  // 3 Formulas
  {
    lessonId: 'excel-formulas',
    question: 'How must every Excel formula begin?',
    answers: ['With a # sign', 'With a $ sign', 'With an equals sign (=)', 'With a letter'],
    correct: 2,
    explanation: 'The = sign tells Excel that what follows is a formula to calculate.',
  },
  {
    lessonId: 'excel-formulas',
    question: 'What is the result of =2+3*4?',
    answers: ['20', '14', '24', '9'],
    correct: 1,
    explanation: 'Multiplication happens first: 3*4 = 12, then 2+12 = 14. Use (2+3)*4 to get 20.',
  },
  // 4 References
  {
    lessonId: 'excel-references',
    question: 'The formula =A2*B2 in C2 is copied down to C3. What does C3 contain?',
    answers: ['=A2*B2', '=A3*B3', '=$A$2*$B$2', '=A3*B2'],
    correct: 1,
    explanation: 'Relative references move with the formula, so A2 and B2 become A3 and B3.',
  },
  {
    lessonId: 'excel-references',
    question: 'Which reference always stays on F1 no matter where the formula is copied?',
    answers: ['F1', 'F$1', '$F$1', '$F1'],
    correct: 2,
    explanation: '$F$1 is an absolute reference: both the column and the row are locked.',
  },
  // 5 Functions
  {
    lessonId: 'excel-functions',
    question: 'Which function counts only the cells that contain numbers?',
    answers: ['COUNTA', 'COUNT', 'COUNTBLANK', 'SUM'],
    correct: 1,
    explanation: 'COUNT counts numbers only. COUNTA counts any non-empty cell and COUNTBLANK counts empty cells.',
  },
  {
    lessonId: 'excel-functions',
    question: 'B2:B4 contains 20, 35, and 50. What does =AVERAGE(B2:B4) return?',
    answers: ['20', '105', '50', '35'],
    correct: 3,
    explanation: '(20 + 35 + 50) / 3 = 105 / 3 = 35.',
  },
  // 6 Logical
  {
    lessonId: 'excel-logical',
    question: 'B2 contains 80. What does =IF(B2>=75,"Pass","Fail") return?',
    answers: ['Pass', 'Fail', 'TRUE', '80'],
    correct: 0,
    explanation: '80 is greater than or equal to 75, so the test is true and IF returns the first value, Pass.',
  },
  {
    lessonId: 'excel-logical',
    question: 'Which function counts how many cells in a range equal "North"?',
    answers: ['COUNTBLANK', 'COUNT', 'SUM', 'COUNTIF'],
    correct: 3,
    explanation: 'COUNTIF counts the cells that meet a condition, e.g. =COUNTIF(C2:C10,"North").',
  },
  // 7 Formatting
  {
    lessonId: 'excel-formatting',
    question: 'Which tool copies the formatting of one cell to other cells?',
    answers: ['Fill handle', 'Format Painter', 'Find and Replace', 'AutoSum'],
    correct: 1,
    explanation: 'Format Painter (the paintbrush on the Home tab) copies only the formatting, not the contents.',
  },
  {
    lessonId: 'excel-formatting',
    question: 'You apply the Percentage format to a cell containing 0.25. What happens?',
    answers: [
      'It shows 25% and the stored value stays 0.25',
      'It shows 25% and the stored value becomes 25',
      'It shows 0.25% and the stored value stays 0.25',
      'It shows 0.25 and nothing changes',
    ],
    correct: 0,
    explanation: 'Number formats change only how the value is displayed, not the value itself.',
  },
  // 8 Cleaning
  {
    lessonId: 'excel-cleaning',
    question: 'Which function removes extra spaces from text?',
    answers: ['LEFT', 'CONCAT', 'TRIM', 'UPPER'],
    correct: 2,
    explanation: 'TRIM removes leading, trailing, and repeated spaces.',
  },
  {
    lessonId: 'excel-cleaning',
    question: 'A2 contains "Manila". What does =LEFT(A2,3) return?',
    answers: ['Man', 'ila', 'Mani', 'Manila'],
    correct: 0,
    explanation: 'LEFT returns the first 3 characters of the text: Man.',
  },
  // 9 Sort, Filter, Tables
  {
    lessonId: 'excel-sort-filter',
    question: 'What happens to the rows that do not match a filter?',
    answers: ['They are deleted', 'They are moved to a new sheet', 'They are hidden, not deleted', 'They are sorted to the bottom'],
    correct: 2,
    explanation: 'Filtering only hides rows. Clear the filter and they are all back.',
  },
  {
    lessonId: 'excel-sort-filter',
    question: 'Which shortcut turns the selected data into a table?',
    answers: ['Ctrl+T', 'Ctrl+H', 'Ctrl+1', 'Ctrl+Z'],
    correct: 0,
    explanation: 'Ctrl+T creates a table (same as Insert > Table).',
  },
  // 10 Conditional formatting & charts
  {
    lessonId: 'excel-conditional-charts',
    question: 'Which chart type is best for showing a trend over time?',
    answers: ['Pie chart', 'Line chart', 'Donut chart', 'Icon set'],
    correct: 1,
    explanation: 'Line charts connect values in order, which makes trends over time easy to see.',
  },
  {
    lessonId: 'excel-conditional-charts',
    question: 'Which conditional formatting option draws a bar inside each cell to show its relative size?',
    answers: ['Color Scales', 'Icon Sets', 'Top/Bottom Rules', 'Data Bars'],
    correct: 3,
    explanation: 'Data Bars put a horizontal bar in each cell, longer for bigger values.',
  },
  // 11 Pivot tables
  {
    lessonId: 'excel-pivot-tables',
    question: 'In the PivotTable field list, which area holds the numbers that get summed or averaged?',
    answers: ['Filters', 'Rows', 'Columns', 'Values'],
    correct: 3,
    explanation: 'Fields placed in Values are calculated (Sum, Count, Average...). Rows and Columns group the data.',
  },
  {
    lessonId: 'excel-pivot-tables',
    question: 'The source data changed. What must you do so the pivot table shows the new numbers?',
    answers: ['Refresh the pivot table', 'Delete and retype it', 'Nothing, it always updates itself', 'Sort the source data'],
    correct: 0,
    explanation: 'Pivot tables do not update automatically. Right-click and choose Refresh (or press Alt+F5).',
  },
];
