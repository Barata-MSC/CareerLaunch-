// Interactive extras for each SQL lesson, matched by lesson id (ids must stay the same).
// lessons.js merges these into the lessons, so the original text content is untouched.
//
// SQL cannot run inside the app, so each `playground` is a "type the query" exercise:
// the editor text is checked with patterns. (The preview only shows the goal card.)
// Tables are the W3Schools sample tables (Customers, Products, Orders), as in the lessons.
//
// TODO (optional): every video starts at the beginning for now. To jump to a topic, set the
// second value in VIDEO_FOR (seconds) from the chapter list in the YouTube description.

const VIDEOS = {
  baraa: {
    id: 'SSKVgrwhzus',
    title: 'SQL Full Course for Beginners (30 Hours) – From Zero to Hero',
    apaTitle: 'SQL full course for beginners (30 hours) – From zero to hero',
    channel: 'Data with Baraa',
    date: '2025, March 27', // "Premiered on 27 Mar 2025" on the YouTube page
  },
};

// lesson id -> [video key, start seconds, chapter label]
const VIDEO_FOR = {
  'sql-1': ['baraa', 0],
  'sql-2': ['baraa', 0],
  'sql-3': ['baraa', 0],
  'sql-4': ['baraa', 0],
  'sql-5': ['baraa', 0],
  'sql-6': ['baraa', 0],
  'sql-7': ['baraa', 0],
  'sql-8': ['baraa', 0],
  'sql-9': ['baraa', 0],
  'sql-10': ['baraa', 0],
};

const video = (lessonId) => {
  const [key, start = 0, chapter = ''] = VIDEO_FOR[lessonId];
  const v = VIDEOS[key];
  return { id: v.id, start, chapter, title: v.title, channel: v.channel };
};

// References are in APA 7th style (LessonReferences shows text + link)
const videoRef = (lessonId) => {
  const v = VIDEOS[VIDEO_FOR[lessonId][0]];
  return {
    text: `${v.channel}. (${v.date}). ${v.apaTitle} [Video]. YouTube.`,
    url: `https://youtu.be/${v.id}`,
  };
};
const w3 = (title, page) => ({
  text: `W3Schools. (n.d.). ${title}.`,
  url: `https://www.w3schools.com/sql/${page}`,
});
const pg = (title, page) => ({
  text: `PostgreSQL Global Development Group. (n.d.). ${title}. In PostgreSQL documentation.`,
  url: `https://www.postgresql.org/docs/current/${page}.html`,
});

// ---- Playground helpers -------------------------------------------------------------
// CodePlayground lowercases the text, removes /* */ comments and collapses all whitespace
// into single spaces before running a check. Keywords, table and column names are
// therefore case-insensitive. Strings must use single quotes (double quotes are
// identifiers in standard SQL).
const TERM_CSS =
  '.t{background:#211A38;color:#fff;font-family:monospace;padding:12px;border-radius:8px;font-size:12px;line-height:1.5}.t b{color:#b9a4ff}';
const goal = (task, shows) =>
  `<div class="t"><b>GOAL</b><br>${task}${shows ? `<br><br><b>YOU SHOULD SEE</b><br>${shows}` : ''}</div>`;
const sql = {
  label: 'TRY IT · TYPE THE QUERY',
  previewLabel: 'Goal',
  successText: 'Correct! That query does it.',
};

export const EXTRAS = {
  'sql-1': {
    video: video('sql-1'),
    activities: [
      {
        type: 'playground',
        ...sql,
        title: 'Your first query',
        task: 'Select all columns from the Products table.',
        html: goal('Read every column of Products.'),
        baseCss: TERM_CSS,
        starter: '-- write your query below\n',
        checks: [/select\s+\*\s+from\s+products(?=\s|;|$)/],
        hint: 'SELECT * FROM Products;',
      },
      {
        type: 'quickCheck',
        question: 'Are SQL keywords case-sensitive? Do SELECT and select work the same?',
        options: [
          'No, SELECT and select work the same',
          'Yes, only uppercase works',
          'Yes, only lowercase works',
          'Only in MySQL',
        ],
        correct: 0,
        hint: 'Check the key points of this lesson.',
        explanation: 'SQL keywords are not case-sensitive. Uppercase is just a common habit that makes queries easier to read.',
      },
    ],
    references: [w3('SQL Intro', 'sql_intro.asp'), pg('Concepts', 'tutorial-concepts'), videoRef('sql-1')],
  },

  'sql-2': {
    video: video('sql-2'),
    activities: [
      {
        type: 'playground',
        ...sql,
        title: 'Pick two columns',
        task: 'From Products, select only ProductName and Price.',
        html: goal('Two columns, one table.'),
        baseCss: TERM_CSS,
        starter: '-- name the columns, then the table\n',
        checks: [/select\s+(?:productname\s*,\s*price|price\s*,\s*productname)\s+from\s+products(?=\s|;|$)/],
        hint: 'SELECT ProductName, Price FROM Products;',
      },
      {
        type: 'quickCheck',
        question: 'What does SELECT DISTINCT Country FROM Customers return?',
        options: [
          'Each different country once',
          'Only the first country',
          'The number of countries',
          'Every row, including repeats',
        ],
        correct: 0,
        hint: 'DISTINCT removes repeated values.',
        explanation: 'DISTINCT lists each different value once. COUNT(DISTINCT Country) would give the number.',
      },
    ],
    references: [w3('SQL Select', 'sql_select.asp'), pg('SELECT', 'sql-select'), videoRef('sql-2')],
  },

  'sql-3': {
    video: video('sql-3'),
    activities: [
      {
        type: 'playground',
        ...sql,
        title: 'Filter the rows',
        task: "From Customers, select all columns where Country is 'Germany'.",
        html: goal('Keep only the matching rows.'),
        baseCss: TERM_CSS,
        starter: '-- remember: text goes in single quotes\n',
        checks: [/select\s+\*\s+from\s+customers\s+where\s+country\s*=\s*'germany'(?=\s|;|$)/],
        hint: "SELECT * FROM Customers WHERE Country = 'Germany';",
      },
      {
        type: 'quickCheck',
        question: 'Which operator means "not equal"?',
        options: ['<>', '=>', '=!', '=='],
        correct: 0,
        hint: 'It looks like "less than" and "greater than" together.',
        explanation: '<> means not equal in WHERE conditions.',
      },
    ],
    references: [w3('SQL Where', 'sql_where.asp'), pg('SELECT', 'sql-select'), videoRef('sql-3')],
  },

  'sql-4': {
    video: video('sql-4'),
    activities: [
      {
        type: 'playground',
        ...sql,
        title: 'Sort the result',
        task: 'From Products, select all columns sorted by ProductName from Z to A.',
        html: goal('Sort in descending order.'),
        baseCss: TERM_CSS,
        starter: '-- sorting goes at the end of the query\n',
        checks: [/select\s+\*\s+from\s+products\s+order\s+by\s+productname\s+desc(?=\s|;|$)/],
        hint: 'SELECT * FROM Products ORDER BY ProductName DESC;',
      },
      {
        type: 'quickCheck',
        question: 'What is the default order of ORDER BY?',
        options: ['Ascending (ASC)', 'Descending (DESC)', 'Random', 'Alphabetical only'],
        correct: 0,
        hint: 'You only write DESC when you want the reverse.',
        explanation: 'The default is ascending: A to Z for text and smallest to largest for numbers.',
      },
    ],
    references: [w3('SQL Order By', 'sql_orderby.asp'), pg('SELECT', 'sql-select'), videoRef('sql-4')],
  },

  'sql-5': {
    video: video('sql-5'),
    activities: [
      {
        type: 'playground',
        ...sql,
        title: 'Match either condition',
        task: "From Customers, select all columns where Country is 'France' or Country is 'Italy'. Use OR.",
        html: goal('One of two conditions is enough.'),
        baseCss: TERM_CSS,
        starter: '-- two conditions joined with a keyword\n',
        checks: [
          /select\s+\*\s+from\s+customers\s+where\s+(?:country\s*=\s*'france'\s+or\s+country\s*=\s*'italy'|country\s*=\s*'italy'\s+or\s+country\s*=\s*'france')(?=\s|;|$)/,
        ],
        hint: "WHERE Country = 'France' OR Country = 'Italy'",
      },
      {
        type: 'quickCheck',
        question: 'Which keyword shows a row only if ALL conditions are true?',
        options: ['AND', 'OR', 'NOT'],
        correct: 0,
        hint: 'OR needs just one true condition.',
        explanation: 'AND needs every condition to be true. OR needs at least one. NOT reverses a condition.',
      },
    ],
    references: [w3('SQL And', 'sql_and.asp'), videoRef('sql-5')],
  },

  'sql-6': {
    video: video('sql-6'),
    activities: [
      {
        type: 'playground',
        ...sql,
        title: 'Add a new row',
        task: "Insert into Customers (CustomerName, City, Country) the values 'Mango Hut', 'Manila', 'Philippines'.",
        html: goal('List the columns, then the matching values.', '1 row inserted'),
        baseCss: TERM_CSS,
        starter: '-- columns in parentheses, then VALUES\n',
        checks: [
          /insert\s+into\s+customers\s*\(\s*customername\s*,\s*city\s*,\s*country\s*\)\s*values\s*\(\s*'mango hut'\s*,\s*'manila'\s*,\s*'philippines'\s*\)/,
        ],
        hint: "INSERT INTO Customers (CustomerName, City, Country) VALUES ('Mango Hut', 'Manila', 'Philippines');",
      },
      {
        type: 'quickCheck',
        question: 'What happens to a column you leave out of INSERT INTO?',
        options: [
          'It gets NULL or its default value',
          'It is deleted from the table',
          'It copies the previous row',
          'The insert always fails',
        ],
        correct: 0,
        hint: 'The lesson says what skipped columns receive.',
        explanation: 'Skipped columns get NULL or their default value. (A column that requires a value will cause an error.)',
      },
    ],
    references: [w3('SQL Insert Into', 'sql_insert.asp'), videoRef('sql-6')],
  },

  'sql-7': {
    video: video('sql-7'),
    activities: [
      {
        type: 'playground',
        ...sql,
        title: 'Update one row safely',
        task: "Change the City to 'Manila' for the customer with CustomerID 5. Other rows must not change.",
        html: goal('UPDATE with a WHERE condition.'),
        baseCss: TERM_CSS,
        starter: '-- do not forget the WHERE\n',
        checks: [/update\s+customers\s+set\s+city\s*=\s*'manila'\s+where\s+customerid\s*=\s*5(?=\s|;|$)/],
        hint: "UPDATE Customers SET City = 'Manila' WHERE CustomerID = 5;",
      },
      {
        type: 'quickCheck',
        question: 'What happens if an UPDATE has no WHERE clause?',
        options: [
          'Every row in the table is updated',
          'Only the first row is updated',
          'Nothing is updated',
          'The database asks which row you mean',
        ],
        correct: 0,
        hint: 'No condition means no filter.',
        explanation: 'Without WHERE, UPDATE changes all the rows in the table.',
      },
    ],
    references: [w3('SQL Update', 'sql_update.asp'), pg('Updates', 'tutorial-update'), videoRef('sql-7')],
  },

  'sql-8': {
    video: video('sql-8'),
    activities: [
      {
        type: 'playground',
        ...sql,
        title: 'Delete one row',
        task: 'Delete the product with ProductID 3 from Products. Other rows must stay.',
        html: goal('DELETE with a WHERE condition.'),
        baseCss: TERM_CSS,
        starter: '-- choose the row with WHERE\n',
        checks: [/delete\s+from\s+products\s+where\s+productid\s*=\s*3(?=\s|;|$)/],
        hint: 'DELETE FROM Products WHERE ProductID = 3;',
      },
      {
        type: 'quickCheck',
        question: 'Which statement removes the entire table, not just its rows?',
        options: ['DROP TABLE', 'DELETE FROM', 'REMOVE TABLE', 'CLEAR TABLE'],
        correct: 0,
        hint: 'DELETE FROM without WHERE keeps the table and its columns.',
        explanation: 'DROP TABLE removes the table itself. DELETE FROM only removes rows.',
      },
    ],
    references: [w3('SQL Delete', 'sql_delete.asp'), pg('Deletions', 'tutorial-delete'), videoRef('sql-8')],
  },

  'sql-9': {
    video: video('sql-9'),
    activities: [
      {
        type: 'playground',
        ...sql,
        title: 'Calculate an average',
        task: 'From Products, select the average Price and name the result AveragePrice.',
        html: goal('One value from many rows.'),
        baseCss: TERM_CSS,
        starter: '-- use a function and an alias\n',
        checks: [/select\s+avg\s*\(\s*price\s*\)\s+as\s+averageprice\s+from\s+products(?=\s|;|$)/],
        hint: 'SELECT AVG(Price) AS AveragePrice FROM Products;',
      },
      {
        type: 'quickCheck',
        question: 'Which function returns the number of rows that match?',
        options: ['COUNT', 'SUM', 'MAX'],
        correct: 0,
        hint: 'SUM adds values and MAX finds the largest.',
        explanation: 'COUNT returns the number of matching rows. SUM totals a numeric column.',
      },
    ],
    references: [w3('SQL Aggregate Functions', 'sql_aggregate_functions.asp'), pg('Aggregate Functions', 'tutorial-agg'), videoRef('sql-9')],
  },

  'sql-10': {
    video: video('sql-10'),
    activities: [
      {
        type: 'playground',
        ...sql,
        title: 'Join two tables',
        task: "List each order's OrderDate with the customer's CustomerName. Join Orders to Customers on CustomerID using INNER JOIN.",
        html: goal('Combine rows through CustomerID.'),
        baseCss: TERM_CSS,
        starter: '-- use full table names, no aliases\n',
        checks: [
          /select\s+(?:orders\.orderdate\s*,\s*customers\.customername|customers\.customername\s*,\s*orders\.orderdate)\s+from\s+orders\s+inner\s+join\s+customers\s+on\s+(?:orders\.customerid\s*=\s*customers\.customerid|customers\.customerid\s*=\s*orders\.customerid)(?=\s|;|$)/,
        ],
        hint: 'SELECT Orders.OrderDate, Customers.CustomerName FROM Orders INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;',
      },
      {
        type: 'quickCheck',
        question: 'Which join returns all rows from the left table, with NULL where there is no match?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN'],
        correct: 1,
        hint: 'The name tells you which table is kept.',
        explanation: 'LEFT JOIN keeps every left-table row. INNER JOIN keeps only rows that match in both tables.',
      },
    ],
    references: [w3('SQL Joins', 'sql_join.asp'), pg('Joins Between Tables', 'tutorial-join'), videoRef('sql-10')],
  },
};
