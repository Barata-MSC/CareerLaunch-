// Lesson content for the Excel & Spreadsheets course (follows the W3Schools Excel tutorial order).

export const LESSONS = [
  {
    id: 'excel-getting-started',
    title: 'Getting Started',
    subtitle: 'Workbooks, cells, and ranges',
    contentTitle: 'Meet the spreadsheet',
    description:
      'Excel is a spreadsheet program for storing, calculating, and analyzing data. A file is called a workbook, and each workbook holds one or more worksheets (the tabs at the bottom). A worksheet is a grid of columns and rows, like squared exercise paper.',
    code: `      A       B       C
1   Name    Sales   Region
2   Ana     1200    North
3   Ben     950     South`,
    sections: [
      {
        heading: 'Rows, columns, and cells',
        text: 'Columns are named with letters (A, B, C...) and rows with numbers (1, 2, 3...). The box where a column and a row meet is a cell. Its address is the column letter followed by the row number, such as B2.',
      },
      {
        heading: 'Parts of the screen',
        text: 'The Ribbon holds the tabs and tools (Home, Insert, Data...). The Name Box shows the address of the active cell. The Formula Bar shows what is inside the active cell, including formulas. Sheet tabs at the bottom switch between worksheets.',
      },
      {
        heading: 'Ranges',
        text: 'A range is a group of cells written with a colon between the first and last cell.',
        code: `B2      one cell
A1:A5   a column of 5 cells
A1:C3   a block of 9 cells`,
      },
      {
        heading: 'Entering data',
        text: 'Click a cell, type, then press Enter. By default text is aligned to the left and numbers to the right, which helps you spot numbers that were typed as text.',
      },
    ],
    keyPoints: [
      'A workbook contains worksheets; a worksheet is a grid of cells',
      'A cell address is column letter + row number (C4)',
      'A range uses a colon: A1:C3',
      'The Formula Bar shows the real contents of the active cell',
    ],
  },
  {
    id: 'excel-fill-move',
    title: 'Fill, Move, Add & Delete',
    subtitle: 'Edit cells quickly',
    contentTitle: 'Working with cells',
    description:
      'Most of your time in Excel goes into entering and rearranging data. A few tools make this fast: the fill handle, cut and paste, inserting and deleting cells, and undo.',
    code: `Type 1 in A1 and 2 in A2.
Select both and drag the fill handle down:

A1=1  A2=2  A3=3  A4=4  A5=5`,
    sections: [
      {
        heading: 'Fill',
        text: 'The fill handle is the small square at the bottom-right corner of a selected cell. Drag it to copy a value or to continue a pattern. Type two values first (1 and 2) and Excel continues the series. Days and months continue automatically (Mon, Tue, Wed...).',
      },
      {
        heading: 'Move and copy cells',
        text: 'Select the cells and drag them by their border, or use Ctrl+X then Ctrl+V to cut and paste. Use Ctrl+C then Ctrl+V to copy instead of move.',
      },
      {
        heading: 'Add cells',
        text: 'Right-click a row number and choose Insert to add a new row above it. Right-click a column letter and choose Insert to add a new column to its left.',
      },
      {
        heading: 'Delete cells',
        text: 'Right-click a row, column, or cell and choose Delete to remove it and shift the others. Pressing the Delete key is different: it only clears the contents and leaves the cell in place.',
      },
      {
        heading: 'Undo and redo',
        text: 'Made a mistake? Press Ctrl+Z to undo the last action and Ctrl+Y to redo it.',
      },
    ],
    keyPoints: [
      'Drag the fill handle to copy values or continue a series',
      'Ctrl+X / Ctrl+C / Ctrl+V cut, copy, and paste',
      'Right-click > Insert adds rows or columns; Delete removes them',
      'Ctrl+Z undoes, Ctrl+Y redoes',
    ],
  },
  {
    id: 'excel-formulas',
    title: 'Formulas & Operators',
    subtitle: 'Let Excel do the math',
    contentTitle: 'Your first formulas',
    description:
      'A formula tells Excel to calculate something. Every formula starts with an equals sign (=). You can use numbers, cell addresses, or both. When a cell used in a formula changes, the result updates automatically.',
    code: `=5+3      gives 8
=B2*C2    multiplies two cells
=A1/4     divides A1 by 4`,
    sections: [
      {
        heading: 'Arithmetic operators',
        text: 'Use + to add, - to subtract, * to multiply, / to divide, and ^ for powers.',
        code: `=2^3     gives 8
=10-4    gives 6`,
      },
      {
        heading: 'Order of operations',
        text: 'Excel follows the usual math order: parentheses first, then powers, then multiplication and division, then addition and subtraction. Use parentheses to control the order.',
        code: `=2+3*4     gives 14
=(2+3)*4   gives 20`,
      },
      {
        heading: 'Editing a formula',
        text: 'Select the cell and edit in the Formula Bar, or press F2 to edit inside the cell. The cell shows the result, while the Formula Bar shows the formula.',
      },
    ],
    keyPoints: [
      'Formulas always start with =',
      'Operators: + - * / ^',
      'Multiplication and division happen before addition and subtraction',
      'Parentheses change the order of calculation',
    ],
  },
  {
    id: 'excel-references',
    title: 'Cell References',
    subtitle: 'Relative and absolute',
    contentTitle: 'How references behave when copied',
    description:
      'When you copy a formula to another cell, Excel can either adjust the cell addresses (relative) or keep them fixed (absolute). Knowing the difference saves you from many common errors.',
    sections: [
      {
        heading: 'Relative reference',
        text: 'This is the default. The reference moves with the formula. Copy C2 down one row and A2 and B2 become A3 and B3.',
        code: `C2:  =A2*B2
C3:  =A3*B3   (after copying down)`,
      },
      {
        heading: 'Absolute reference',
        text: 'Put a dollar sign before the column letter and the row number ($F$1) to lock the reference. It stays the same wherever you copy the formula. This is useful for a single value such as a tax rate.',
        code: `F1:  0.12  (tax rate)
D2:  =C2*$F$1
D3:  =C3*$F$1   (after copying down)`,
      },
      {
        heading: 'Mixed reference',
        text: '$A1 locks only the column, and A$1 locks only the row. On Windows, press F4 while editing a formula to cycle through the options.',
      },
    ],
    keyPoints: [
      'Relative references (A1) change when copied',
      'Absolute references ($A$1) never change',
      'Mixed references lock only the column ($A1) or the row (A$1)',
    ],
  },
  {
    id: 'excel-functions',
    title: 'Basic Functions',
    subtitle: 'SUM, AVERAGE, COUNT and more',
    contentTitle: 'Functions save time',
    description:
      'A function is a ready-made formula. It has a name followed by arguments in parentheses, for example =SUM(B2:B4). Functions are the core tools of every data analyst.',
    code: `      A       B
1   Item    Sales
2   Pen     20
3   Book    35
4   Bag     50

=SUM(B2:B4)      gives 105
=AVERAGE(B2:B4)  gives 35
=MIN(B2:B4)      gives 20
=MAX(B2:B4)      gives 50
=COUNT(B2:B4)    gives 3`,
    sections: [
      {
        heading: 'Totals and averages',
        text: 'SUM adds the numbers in a range. AVERAGE returns the mean. MIN and MAX return the smallest and largest values.',
      },
      {
        heading: 'Counting cells',
        text: 'COUNT counts cells that contain numbers. COUNTA counts cells that are not empty (numbers or text). COUNTBLANK counts empty cells.',
        code: `=COUNTA(A1:A5)      counts non-empty cells
=COUNTBLANK(A1:A5)  counts empty cells`,
      },
      {
        heading: 'AutoSum',
        text: 'Select a cell under a column of numbers and click AutoSum (on the Home tab) to insert =SUM for you.',
      },
    ],
    keyPoints: [
      'A function looks like =NAME(arguments)',
      'SUM, AVERAGE, MIN, and MAX summarize numbers',
      'COUNT counts numbers only; COUNTA counts any non-empty cell',
    ],
  },
  {
    id: 'excel-logical',
    title: 'Logical & Conditional Functions',
    subtitle: 'IF, IFS, AND, COUNTIF',
    contentTitle: 'Make Excel decide',
    description:
      'Logical functions return different results depending on a condition. Conditional counting and averaging functions only include the rows that match your criteria. Text in a criteria must be written in double quotes.',
    code: `=IF(B2>=75,"Pass","Fail")
=AND(B2>=75,C2>=75)
=IFS(B2>=90,"A",B2>=80,"B",TRUE,"C")`,
    sections: [
      {
        heading: 'IF',
        text: 'IF(test, value_if_true, value_if_false). If B2 is 80, the formula above returns Pass.',
      },
      {
        heading: 'AND',
        text: 'AND returns TRUE only when every condition is true, otherwise FALSE. It is often used inside IF.',
      },
      {
        heading: 'IFS',
        text: 'IFS checks several conditions in order and returns the value for the first one that is true. Ending with TRUE gives a default result when nothing else matches.',
      },
      {
        heading: 'COUNTIF and COUNTIFS',
        text: 'COUNTIF counts the cells that meet one condition. COUNTIFS counts rows that meet several conditions at once.',
        code: `=COUNTIF(C2:C10,"North")
=COUNTIFS(C2:C10,"North",B2:B10,">1000")`,
      },
      {
        heading: 'SUMIF and AVERAGEIF',
        text: 'These add or average only the matching rows: the first range is checked for the condition, the last range holds the numbers.',
        code: `=SUMIF(C2:C10,"North",B2:B10)
=AVERAGEIF(C2:C10,"North",B2:B10)`,
      },
    ],
    keyPoints: [
      'IF returns one of two results based on a test',
      'AND is TRUE only if all conditions are true',
      'COUNTIF / SUMIF / AVERAGEIF work on rows that match a condition',
      'Text criteria go inside double quotes',
    ],
  },
  {
    id: 'excel-formatting',
    title: 'Formatting Data',
    subtitle: 'Make data readable',
    contentTitle: 'Formatting basics',
    description:
      'Formatting changes how data looks without changing the data itself. Good formatting makes a worksheet easier to read and understand. Most tools are on the Home tab.',
    sections: [
      {
        heading: 'Fonts, colors, and borders',
        text: 'Use the Home tab to change font, size, bold, fill color, and borders. Bold headers and light borders make a table much clearer.',
      },
      {
        heading: 'Format Painter',
        text: 'Select a formatted cell, click Format Painter (the paintbrush), then click the cells that should look the same. Double-click the brush to paint several places in a row.',
      },
      {
        heading: 'Number formats',
        text: 'Number formats such as Currency, Percentage, and Date change how a value is displayed. The stored value stays the same.',
        code: `Stored value: 0.25
Percentage format shows: 25%`,
      },
      {
        heading: 'Format Cells and column width',
        text: 'Press Ctrl+1 to open Format Cells with every option. Double-click the border between two column letters to AutoFit the width to its content.',
      },
    ],
    keyPoints: [
      'Formatting changes the look, not the stored value',
      'Format Painter copies formatting to other cells',
      'Number formats: Currency, Percentage, Date',
      'Ctrl+1 opens Format Cells',
    ],
  },
  {
    id: 'excel-cleaning',
    title: 'Cleaning Data',
    subtitle: 'Fix messy data before analysis',
    contentTitle: 'Clean data first',
    description:
      'Real data is often messy: extra spaces, inconsistent capitalization, duplicates. Cleaning it first is one of the most important steps in analysis. Work on a copy so you always keep the original data.',
    code: `A2:  "  maria santos "

=TRIM(A2)    gives "maria santos"
=PROPER(A2)  gives "  Maria Santos "
=LEFT(A2,3)  first 3 characters`,
    sections: [
      {
        heading: 'Text functions',
        text: 'TRIM removes extra spaces. LOWER, UPPER, and PROPER change capitalization. LEFT(text, n) returns the first n characters. CONCAT joins text together.',
        code: `=CONCAT(A2," ",B2)   joins first and last name`,
      },
      {
        heading: 'Remove Duplicates',
        text: 'Select your data, open the Data tab, and click Remove Duplicates. Choose which columns decide whether a row counts as a duplicate.',
      },
      {
        heading: 'Find and Replace',
        text: 'Press Ctrl+H to replace one value with another across the sheet, for example to fix a misspelled category.',
      },
      {
        heading: 'Text to Columns',
        text: 'On the Data tab, Text to Columns splits one column into several using a separator such as a comma or space.',
      },
    ],
    keyPoints: [
      'TRIM, LOWER, UPPER, PROPER, LEFT, and CONCAT fix text',
      'Data > Remove Duplicates deletes repeated rows',
      'Ctrl+H opens Find and Replace',
      'Keep a copy of the original data',
    ],
  },
  {
    id: 'excel-sort-filter',
    title: 'Sort, Filter & Tables',
    subtitle: 'Organize and explore data',
    contentTitle: 'Find what matters',
    description:
      'Sorting arranges rows in order. Filtering shows only the rows you want. Tables bundle your data so these tools and formulas keep working as the data grows.',
    sections: [
      {
        heading: 'Sort',
        text: 'Click inside your data, open the Data tab, and sort A to Z or Z to A. Use Custom Sort to sort by more than one column, for example Region first, then Sales from largest to smallest. Make sure the option for headers is ticked so the header row stays on top.',
      },
      {
        heading: 'Filter',
        text: 'Turn on Filter from the Data tab (or press Ctrl+Shift+L). Dropdown arrows appear in the header row. Filtering hides the rows that do not match; it does not delete them.',
      },
      {
        heading: 'Tables',
        text: 'Select your data and press Ctrl+T (or Insert > Table). A table gets filter buttons, banded rows, and it grows automatically when you add new rows below it.',
      },
    ],
    keyPoints: [
      'Sort puts rows in order (A-Z, Z-A, or custom)',
      'Filter hides rows that do not match; nothing is deleted',
      'Ctrl+T turns a range into a table',
      'Tables expand automatically with new data',
    ],
  },
  {
    id: 'excel-conditional-charts',
    title: 'Conditional Formatting & Charts',
    subtitle: 'Visualize your data',
    contentTitle: 'Show, do not just tell',
    description:
      'Conditional formatting colors cells automatically based on their values, and charts turn numbers into pictures. Both help you spot patterns quickly.',
    sections: [
      {
        heading: 'Conditional formatting',
        text: 'Select the cells, then go to Home > Conditional Formatting. Highlight Cells Rules marks values greater than, less than, between, or duplicate. Top/Bottom Rules marks the highest or lowest values.',
      },
      {
        heading: 'Data bars, color scales, icon sets',
        text: 'Data Bars draw a bar inside each cell showing its size. Color Scales shade cells from low to high. Icon Sets add symbols such as arrows. Use Manage Rules to edit or remove rules.',
      },
      {
        heading: 'Creating a chart',
        text: 'Select your data including the headers, open the Insert tab, and pick a chart. Column or bar charts compare categories, line charts show trends over time, and pie charts show parts of a whole (use them for only a few categories).',
      },
      {
        heading: 'Customizing a chart',
        text: 'Use Chart Elements (the + button) or the Chart Design tab to add a title, axis titles, and a legend. A clear title tells the reader what they are looking at.',
      },
    ],
    keyPoints: [
      'Conditional formatting changes cell look based on values',
      'Data bars, color scales, and icon sets show relative size',
      'Line charts for trends, column charts for comparisons',
      'Always add a clear chart title',
    ],
  },
  {
    id: 'excel-pivot-tables',
    title: 'Pivot Tables',
    subtitle: 'Summarize big data in seconds',
    contentTitle: 'Summarize with a pivot table',
    description:
      'A pivot table summarizes a large table without writing formulas. You choose which fields become rows, columns, and values, and Excel does the calculations. Your source data should have a header for every column and no blank rows.',
    code: `Source data:
Region   Product   Sales
North    Pen       1000
North    Book      1400
South    Pen       1800

Pivot: Rows = Region, Values = Sum of Sales
North    2400
South    1800`,
    sections: [
      {
        heading: 'Create a pivot table',
        text: 'Click inside your data and choose Insert > PivotTable. Pick where to place it (a new worksheet is the simplest) and click OK.',
      },
      {
        heading: 'The four areas',
        text: 'Drag fields into Rows and Columns to group the data, into Values to calculate, and into Filters to limit what is shown. Values can be summarized with Sum, Count, Average, and more.',
      },
      {
        heading: 'Refreshing',
        text: 'A pivot table does not update by itself when the source data changes. Right-click it and choose Refresh (or press Alt+F5).',
      },
    ],
    keyPoints: [
      'Insert > PivotTable summarizes data without formulas',
      'Rows and Columns group, Values calculate, Filters limit',
      'Refresh the pivot table after the source data changes',
    ],
  },
];
