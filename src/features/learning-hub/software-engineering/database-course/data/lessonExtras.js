// Interactive extras for each Database lesson, matched by lesson id (ids must stay the same).
// lessons.js merges these into the lessons, so the original text content is untouched.
//
// SQL cannot run inside the app, so each `playground` is a "type the query" exercise:
// the editor text is checked with patterns. (The preview only shows the goal card.)
//
// TODO (optional): every video starts at the beginning for now. To jump to a topic, set the
// second value in VIDEO_FOR (seconds) from the chapter list in the YouTube description.

const VIDEOS = {
  fcc: {
    id: 'KBDSJU3cGkc',
    title: 'SQL For Web Developers - Complete Database Course',
    apaTitle: 'SQL for web developers - Complete database course',
    channel: 'freeCodeCamp.org',
    date: '2023, August 24', // from the YouTube page
  },
};

// lesson id -> [video key, start seconds, chapter label]
const VIDEO_FOR = {
  'db-1': ['fcc', 0],
  'db-2': ['fcc', 0],
  'db-3': ['fcc', 0],
  'db-4': ['fcc', 0],
  'db-5': ['fcc', 0],
  'db-6': ['fcc', 0],
  'db-7': ['fcc', 0],
  'db-8': ['fcc', 0],
  'db-9': ['fcc', 0],
  'db-10': ['fcc', 0], // this video does not cover transactions or NoSQL
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
// into single spaces before running a check. Starters use "--" comments that never contain
// a keyword combination from a check, so they can't pass by accident.
// Strings must use single quotes: in PostgreSQL, double quotes are identifiers.
const TERM_CSS =
  '.t{background:#211A38;color:#fff;font-family:monospace;padding:12px;border-radius:8px;font-size:12px;line-height:1.5}.t b{color:#b9a4ff}';
const goal = (task, shows) =>
  `<div class="t"><b>GOAL</b><br>${task}${shows ? `<br><br><b>YOU SHOULD SEE</b><br>${shows}` : ''}</div>`;

export const EXTRAS = {
  'db-1': {
    video: video('db-1'),
    activities: [
      {
        type: 'playground',
        title: 'Create your first table',
        task: 'Create a table named products with an id column (INT, primary key) and a name column (TEXT).',
        html: goal('Define the products table.', 'CREATE TABLE'),
        baseCss: TERM_CSS,
        label: 'TRY IT · TYPE THE QUERY',
        previewLabel: 'Goal',
        successText: 'Correct! That query does it.',
        starter: '-- write your statement below\n',
        checks: [
          /create\s+table\s+products\s*\(/,
          /\bid\s+int(?:eger)?\s+primary\s+key/,
          /\bname\s+text/,
        ],
        hint: 'CREATE TABLE products ( id INT PRIMARY KEY, name TEXT );',
      },
      {
        type: 'quickCheck',
        question: 'Why is a database better than a plain file for an app with many users?',
        options: [
          'Many users can safely read and write data at the same time',
          'It makes the app look nicer',
          'It removes the need for a server',
          'It compiles your code faster',
        ],
        correct: 0,
        hint: 'Think about two people saving to the same file.',
        explanation: 'Databases are built so many users can read and change organized data at once, safely.',
      },
    ],
    references: [w3('SQL Intro', 'sql_intro.asp'), pg('Concepts', 'tutorial-concepts'), videoRef('db-1')],
  },

  'db-2': {
    video: video('db-2'),
    activities: [
      {
        type: 'playground',
        title: 'Fetch specific columns',
        task: 'From products, select the name and price of every product that is in stock (in_stock is true).',
        html: goal('Pick two columns and keep only in-stock rows.'),
        baseCss: TERM_CSS,
        label: 'TRY IT · TYPE THE QUERY',
        previewLabel: 'Goal',
        successText: 'Correct! That query does it.',
        starter: '-- write your query below\n',
        checks: [
          /select\s+(?:name\s*,\s*price|price\s*,\s*name)\s+from\s+products\s+where\s+in_stock(?:\s*=\s*true)?(?=\s|;|$)/,
        ],
        hint: 'SELECT name, price FROM products WHERE in_stock = true;',
      },
      {
        type: 'quickCheck',
        question: 'SQL is declarative. What does that mean?',
        options: [
          'You describe what you want, not how to compute it',
          'You write every loop step by step',
          'A query can only run once',
          'It only works on text files',
        ],
        correct: 0,
        hint: 'Compare "give me the active users" with writing a loop.',
        explanation: 'In SQL you state the result you want and the database decides how to get it.',
      },
    ],
    references: [w3('SQL Select', 'sql_select.asp'), pg('SELECT', 'sql-select'), videoRef('db-2')],
  },

  'db-3': {
    video: video('db-3'),
    activities: [
      {
        type: 'playground',
        title: 'Filter, sort, limit',
        task: 'From orders, get all columns where total is over 100, newest first by created_at, and only the first 5 rows.',
        html: goal('Combine WHERE, ORDER BY and LIMIT.'),
        baseCss: TERM_CSS,
        label: 'TRY IT · TYPE THE QUERY',
        previewLabel: 'Goal',
        successText: 'Correct! That query does it.',
        starter: '-- filter, then sort, then limit\n',
        checks: [
          /select\s+\*\s+from\s+orders\s+where\s+total\s*>\s*100\s+order\s+by\s+created_at\s+desc\s+limit\s+5(?=\s|;|$)/,
        ],
        hint: 'SELECT * FROM orders WHERE total > 100 ORDER BY created_at DESC LIMIT 5;',
      },
      {
        type: 'quickCheck',
        question: 'In which order do these clauses appear in a query?',
        options: [
          'WHERE, then ORDER BY, then LIMIT',
          'LIMIT, then WHERE, then ORDER BY',
          'ORDER BY, then LIMIT, then WHERE',
          'Any order works',
        ],
        correct: 0,
        hint: 'Filter first, then sort, then cut the list.',
        explanation: 'The order is WHERE, then ORDER BY, then LIMIT. Other orders cause an error.',
      },
    ],
    references: [w3('SQL Where', 'sql_where.asp'), pg('SELECT', 'sql-select'), videoRef('db-3')],
  },

  'db-4': {
    video: video('db-4'),
    activities: [
      {
        type: 'playground',
        title: 'Connect two tables',
        task: 'List each customer name with the order total. Join customers to orders where customers.id equals orders.customer_id.',
        html: goal('INNER JOIN customers and orders.'),
        baseCss: TERM_CSS,
        label: 'TRY IT · TYPE THE QUERY',
        previewLabel: 'Goal',
        successText: 'Correct! That query does it.',
        starter: '-- use the full table names, no aliases\n',
        checks: [
          /select\s+(?:customers\.name\s*,\s*orders\.total|orders\.total\s*,\s*customers\.name)\s+from\s+customers\s+(?:inner\s+)?join\s+orders\s+on\s+(?:customers\.id\s*=\s*orders\.customer_id|orders\.customer_id\s*=\s*customers\.id)(?=\s|;|$)/,
        ],
        hint: 'SELECT customers.name, orders.total FROM customers INNER JOIN orders ON customers.id = orders.customer_id;',
      },
      {
        type: 'quickCheck',
        question: 'Which join keeps every row from the left table, even without a match?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN'],
        correct: 1,
        hint: 'The name tells you which table is kept.',
        explanation: 'LEFT JOIN keeps all rows from the left table. INNER JOIN returns only matching rows.',
      },
    ],
    references: [w3('SQL Joins', 'sql_join.asp'), pg('Joins Between Tables', 'tutorial-join'), videoRef('db-4')],
  },

  'db-5': {
    video: video('db-5'),
    activities: [
      {
        type: 'playground',
        title: 'Link tables with a key',
        task: 'Create a comments table: id INT primary key, post_id INT, body TEXT, and post_id must reference posts(id).',
        html: goal('Primary key plus a foreign key.'),
        baseCss: TERM_CSS,
        label: 'TRY IT · TYPE THE QUERY',
        previewLabel: 'Goal',
        successText: 'Correct! That query does it.',
        starter: '-- one CREATE TABLE statement\n',
        checks: [
          (t) =>
            /create\s+table\s+comments\s*\(/.test(t) &&
            /\bid\s+int(?:eger)?\s+primary\s+key/.test(t) &&
            /\bbody\s+text/.test(t) &&
            (/foreign\s+key\s*\(\s*post_id\s*\)\s*references\s+posts\s*\(\s*id\s*\)/.test(t) ||
              /\bpost_id\s+int(?:eger)?\s+references\s+posts\s*\(\s*id\s*\)/.test(t)),
        ],
        hint: 'Add FOREIGN KEY (post_id) REFERENCES posts(id) after the columns.',
      },
      {
        type: 'quickCheck',
        question: 'Which key connects a row in one table to a row in another table?',
        options: ['Foreign key', 'Primary key', 'Sort key'],
        correct: 0,
        hint: 'It points to a primary key somewhere else.',
        explanation: 'A foreign key requires a valid related row in another table. A primary key identifies a row in its own table.',
      },
    ],
    references: [w3('SQL Foreign Key', 'sql_foreignkey.asp'), pg('Foreign Keys', 'tutorial-fk'), videoRef('db-5')],
  },

  'db-6': {
    video: video('db-6'),
    activities: [
      {
        type: 'playground',
        title: 'Update one row safely',
        task: "Change the name of the user with id 2 to Sam. Other rows must not change.",
        html: goal('UPDATE with a WHERE condition.', 'UPDATE 1'),
        baseCss: TERM_CSS,
        label: 'TRY IT · TYPE THE QUERY',
        previewLabel: 'Goal',
        successText: 'Correct! That query does it.',
        starter: '-- do not forget the WHERE\n',
        checks: [/update\s+users\s+set\s+name\s*=\s*'sam'\s+where\s+id\s*=\s*2(?=\s|;|$)/],
        hint: "UPDATE users SET name = 'Sam' WHERE id = 2; Text uses single quotes.",
      },
      {
        type: 'quickCheck',
        question: 'What happens if you run DELETE FROM users; with no WHERE?',
        options: [
          'Every row in the table is deleted',
          'Only the first row is deleted',
          'Nothing happens',
          'The database asks which row you mean',
        ],
        correct: 0,
        hint: 'No condition means no filter.',
        explanation: 'Without WHERE, DELETE (and UPDATE) affects every row in the table.',
      },
    ],
    references: [w3('SQL Update', 'sql_update.asp'), pg('Updates', 'tutorial-update'), videoRef('db-6')],
  },

  'db-7': {
    video: video('db-7'),
    activities: [
      {
        type: 'playground',
        title: 'Protect your data',
        task: 'Create a members table: id INT primary key, and username TEXT that cannot be empty and must be unique.',
        html: goal('Use NOT NULL and UNIQUE.'),
        baseCss: TERM_CSS,
        label: 'TRY IT · TYPE THE QUERY',
        previewLabel: 'Goal',
        successText: 'Correct! That query does it.',
        starter: '-- one CREATE TABLE statement\n',
        checks: [
          /create\s+table\s+members\s*\(/,
          /\bid\s+int(?:eger)?\s+primary\s+key/,
          /\busername\s+text\s+(?:not\s+null\s+unique|unique\s+not\s+null)/,
        ],
        hint: 'username TEXT NOT NULL UNIQUE',
      },
      {
        type: 'quickCheck',
        question: 'Which constraint stops a column from being left empty?',
        options: ['NOT NULL', 'UNIQUE', 'FOREIGN KEY'],
        correct: 0,
        hint: 'The name says "not empty".',
        explanation: 'NOT NULL requires a value. UNIQUE prevents duplicates.',
      },
    ],
    references: [w3('SQL Constraints', 'sql_constraints.asp'), pg('Foreign Keys', 'tutorial-fk'), videoRef('db-7')],
  },

  'db-8': {
    video: video('db-8'),
    activities: [
      {
        type: 'playground',
        title: 'Summarize with GROUP BY',
        task: 'From orders, show each user_id and the sum of total named total_spent, grouped by user_id.',
        html: goal('One summary row per user.'),
        baseCss: TERM_CSS,
        label: 'TRY IT · TYPE THE QUERY',
        previewLabel: 'Goal',
        successText: 'Correct! That query does it.',
        starter: '-- aggregate, then group\n',
        checks: [
          /select\s+user_id\s*,\s*sum\s*\(\s*total\s*\)\s+as\s+total_spent\s+from\s+orders\s+group\s+by\s+user_id(?=\s|;|$)/,
        ],
        hint: 'SELECT user_id, SUM(total) AS total_spent FROM orders GROUP BY user_id;',
      },
      {
        type: 'quickCheck',
        question: 'Which function adds up the values in a column?',
        options: ['SUM', 'COUNT', 'AVG'],
        correct: 0,
        hint: 'COUNT counts rows and AVG finds the average.',
        explanation: 'SUM adds values. COUNT counts rows and AVG calculates an average.',
      },
    ],
    references: [w3('SQL Group By', 'sql_groupby.asp'), pg('Aggregate Functions', 'tutorial-agg'), videoRef('db-8')],
  },

  'db-9': {
    video: video('db-9'),
    activities: [
      {
        type: 'playground',
        title: 'Speed up a lookup',
        task: 'Create an index named idx_orders_created_at on the created_at column of orders.',
        html: goal('One CREATE INDEX statement.', 'CREATE INDEX'),
        baseCss: TERM_CSS,
        label: 'TRY IT · TYPE THE QUERY',
        previewLabel: 'Goal',
        successText: 'Correct! That query does it.',
        starter: '-- name it, then pick the table and column\n',
        checks: [/create\s+index\s+idx_orders_created_at\s+on\s+orders\s*\(\s*created_at\s*\)/],
        hint: 'CREATE INDEX idx_orders_created_at ON orders (created_at);',
      },
      {
        type: 'quickCheck',
        question: 'What is a downside of adding indexes?',
        options: [
          'They take extra storage and can slow down writes',
          'They delete old rows',
          'They change column values',
          'They hide columns from queries',
        ],
        correct: 0,
        hint: 'The lesson says not to index every column.',
        explanation: 'Indexes use extra storage and make writes slower, so add them for measured needs.',
      },
    ],
    references: [w3('SQL Create Index', 'sql_create_index.asp'), videoRef('db-9')],
  },

  'db-10': {
    video: video('db-10'),
    activities: [
      {
        type: 'playground',
        title: 'Move money safely',
        task: 'Take 25 from account 1 and add 25 to account 2 as one transaction. Start it, run both updates, then finish it.',
        html: goal('All-or-nothing transfer.', 'COMMIT'),
        baseCss: TERM_CSS,
        label: 'TRY IT · TYPE THE QUERY',
        previewLabel: 'Goal',
        successText: 'Correct! That query does it.',
        starter: '-- one transaction: all or nothing\n',
        checks: [
          (t) => {
            const start = t.search(/\bbegin(?=\s|;|$)/);
            const end = t.search(/\bcommit(?=\s|;|$)/);
            const take = t.search(/update\s+accounts\s+set\s+balance\s*=\s*balance\s*-\s*25\s+where\s+id\s*=\s*1(?=\s|;|$)/);
            const give = t.search(/update\s+accounts\s+set\s+balance\s*=\s*balance\s*\+\s*25\s+where\s+id\s*=\s*2(?=\s|;|$)/);
            return start >= 0 && take > start && give > start && end > take && end > give;
          },
        ],
        hint: 'BEGIN; then the two UPDATE statements, then COMMIT;',
      },
      {
        type: 'quickCheck',
        question: 'Which type of database stores flexible, JSON-like records?',
        options: ['Document database', 'Relational database', 'Foreign key'],
        correct: 0,
        hint: 'Relational databases use tables and SQL.',
        explanation: 'Document databases store flexible records, often as JSON-like documents.',
      },
    ],
    references: [pg('Transactions', 'tutorial-transactions'), videoRef('db-10')],
  },
};
