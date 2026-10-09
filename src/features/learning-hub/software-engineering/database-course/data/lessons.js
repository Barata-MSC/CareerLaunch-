// Database lessons. Each lesson's status is derived from saved progress.
export const LESSONS = [
  {
    id: 'db-1',
    title: 'What is a database?',
    subtitle: 'Structured storage for app data',
    contentTitle: 'Store information in a reliable place',
    description:
      'A database is a structured way to store and retrieve data. Applications use databases to keep information like users, products, orders, and settings safe, organized, and searchable. Databases are much better than saving everything in plain files when multiple users need access at the same time.',
    code: `CREATE TABLE users (
  id INT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE
);`,
  },
  {
    id: 'db-2',
    title: 'SQL basics',
    subtitle: 'Read and write data',
    contentTitle: 'Use SQL to query data',
    description:
      'SQL is the standard language for working with relational databases. You use it to create tables, insert rows, fetch records, update values, and delete data. SQL is declarative, which means you describe what you want instead of how to compute it step by step.',
    code: `SELECT id, name
FROM users
WHERE active = true;`,
  },
  {
    id: 'db-3',
    title: 'Filtering and sorting',
    subtitle: 'Narrow the results you need',
    contentTitle: 'Find exactly the rows you want',
    description:
      'Filtering and sorting help you narrow a result set and control the order of returned rows. The WHERE clause keeps only matching data, while ORDER BY sorts by a column such as date, price, or name. LIMIT can reduce the number of results when you only need a few rows.',
    code: `SELECT *
FROM orders
WHERE total > 100
ORDER BY created_at DESC
LIMIT 10;`,
  },
  {
    id: 'db-4',
    title: 'Joins',
    subtitle: 'Combine related tables',
    contentTitle: 'Connect records across tables',
    description:
      'A join links rows from two or more tables based on a related column, such as customer_id. INNER JOIN returns only matching records, while LEFT JOIN keeps all rows from the left table even if there are no matches. Joins are how relational databases connect information spread across tables.',
    code: `SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;`,
  },
  {
    id: 'db-5',
    title: 'Normalization and schema',
    subtitle: 'Design cleaner data models',
    contentTitle: 'Structure data without repetition',
    description:
      'Normalization reduces duplicated data by splitting information into logical tables and linking them with keys. A good schema makes updates safer and queries easier to understand. Primary keys uniquely identify each row, and foreign keys connect one table to another.',
    code: `CREATE TABLE posts (
  id INT PRIMARY KEY,
  user_id INT,
  title TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);`,
  },
  {
    id: 'db-6',
    title: 'Changing data with SQL',
    subtitle: 'Insert, update, and delete records',
    contentTitle: 'Manage records safely',
    description:
      'Use INSERT to add records, UPDATE to change existing records, and DELETE to remove them. Always use a WHERE condition when changing or deleting selected rows; without it, an update or delete may affect every row in the table.',
    code: `INSERT INTO users (id, name, email)
VALUES (1, 'Ari', 'ari@example.com');

UPDATE users
SET name = 'Ari Lee'
WHERE id = 1;`,
  },
  {
    id: 'db-7',
    title: 'Keys and constraints',
    subtitle: 'Keep data valid and connected',
    contentTitle: 'Let the database protect data quality',
    description:
      'Constraints enforce rules on stored data. A primary key uniquely identifies each row, a foreign key requires a valid related row, and constraints such as NOT NULL and UNIQUE prevent missing or duplicate values. These rules help protect consistency even when data is written by different parts of an application.',
    code: `CREATE TABLE accounts (
  id INT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  owner_id INT REFERENCES users(id)
);`,
  },
  {
    id: 'db-8',
    title: 'Aggregations',
    subtitle: 'Summarize many rows',
    contentTitle: 'Calculate totals and grouped results',
    description:
      'Aggregate functions summarize values across rows. COUNT counts records, SUM adds values, and AVG calculates an average. GROUP BY creates a separate summary for each value or combination of values, such as total orders per customer.',
    code: `SELECT user_id, COUNT(*) AS order_count,
       SUM(total) AS total_spent
FROM orders
GROUP BY user_id;`,
  },
  {
    id: 'db-9',
    title: 'Indexes and performance',
    subtitle: 'Speed up common lookups',
    contentTitle: 'Help queries find rows faster',
    description:
      'An index is an additional data structure that can speed up searches and sorting on selected columns. Indexes are useful for columns frequently used in WHERE, JOIN, or ORDER BY clauses. They take extra storage and can make writes slower, so create them for measured query needs rather than every column.',
    code: `CREATE INDEX idx_orders_user_id
ON orders (user_id);`,
  },
  {
    id: 'db-10',
    title: 'Transactions and database types',
    subtitle: 'Choose reliable data operations',
    contentTitle: 'Keep related changes consistent',
    description:
      'A transaction groups multiple database operations so they succeed or fail together. This is important when one action involves several related changes. Relational databases organize structured data into tables and support SQL and relationships; document databases store flexible records, often as JSON-like documents. Choose based on your data and application needs.',
    code: `BEGIN;

UPDATE accounts
SET balance = balance - 25
WHERE id = 1;

UPDATE accounts
SET balance = balance + 25
WHERE id = 2;

COMMIT;`,
  },
];
