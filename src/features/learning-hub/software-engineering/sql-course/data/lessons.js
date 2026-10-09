// Lesson content only. Progress ("completed", "in progress") is NOT stored here:
// it comes from the lessons the user has completed in Supabase.
// ids are saved as lesson_id in Supabase, so don't rename them later.
// Examples use the Customers / Products / Orders tables from the W3Schools SQL tutorial.
export const LESSONS = [
  {
    id: 'sql-1',
    title: 'SQL introduction',
    subtitle: 'Databases, tables, and statements',
    contentTitle: 'What is SQL?',
    description:
      'SQL stands for Structured Query Language. It is used to store, retrieve, and manage data in a relational database. A relational database keeps data in tables, and each table is made of rows (records) and columns (fields). Popular systems that use SQL include MySQL, SQL Server, Oracle, and PostgreSQL. SQL keywords are not case-sensitive, so SELECT and select work the same. A semicolon is the standard way to separate SQL statements.',
    code: `SELECT * FROM Customers;`,
    keyPoints: [
      'SQL = Structured Query Language',
      'A table has rows (records) and columns (fields)',
      'SQL keywords are not case-sensitive',
      'A semicolon separates SQL statements',
    ],
  },
  {
    id: 'sql-2',
    title: 'SELECT',
    subtitle: 'SELECT, *, and DISTINCT',
    contentTitle: 'Read data from a table',
    description:
      'SELECT is used to get data from a database. The data it returns is stored in a result-set. Write the column names you want after SELECT and the table name after FROM. Use * to select all columns. SELECT only reads data, it never changes the table. SELECT DISTINCT returns only different values, so repeated values are listed once. COUNT(DISTINCT column) tells you how many different values there are.',
    code: `SELECT CustomerName, City
FROM Customers;

SELECT * FROM Customers;

SELECT DISTINCT Country
FROM Customers;

SELECT COUNT(DISTINCT Country)
FROM Customers;`,
    keyPoints: [
      'SELECT picks the columns, FROM names the table',
      '* means all columns',
      'DISTINCT removes repeated values from the result',
      'SELECT does not change the stored data',
    ],
  },
  {
    id: 'sql-3',
    title: 'WHERE',
    subtitle: 'Filtering records',
    contentTitle: 'Filter your results',
    description:
      'The WHERE clause filters records so you only get the rows that meet a condition. It goes after FROM. Text values are written in single quotes, but numbers are written without quotes. Besides =, you can use > < >= <=, and <> for not equal. BETWEEN selects values in a range (including the start and end values), IN lets you list several possible values, and LIKE searches for a pattern, where % stands for any number of characters. WHERE is also used with UPDATE and DELETE.',
    code: `SELECT * FROM Customers
WHERE Country = 'Mexico';

SELECT * FROM Products
WHERE Price BETWEEN 50 AND 60;

SELECT * FROM Customers
WHERE Country IN ('Germany', 'France');

SELECT * FROM Customers
WHERE CustomerName LIKE 'a%';`,
    keyPoints: [
      'WHERE filters rows and goes after FROM',
      "Text uses single quotes, numbers don't",
      '<> means not equal',
      'BETWEEN, IN, and LIKE are handy operators',
    ],
  },
  {
    id: 'sql-4',
    title: 'ORDER BY',
    subtitle: 'Sorting the result',
    contentTitle: 'Sort your results',
    description:
      'ORDER BY sorts the result-set. The default order is ascending (ASC), which means A to Z for text and smallest to largest for numbers. Add DESC to sort in descending order. You can sort by more than one column: the rows are sorted by the first column, and the next column is used when values in the first are equal. ORDER BY goes at the end of the query, after WHERE.',
    code: `SELECT * FROM Products
ORDER BY Price DESC;

SELECT * FROM Customers
ORDER BY Country, CustomerName;

SELECT * FROM Customers
ORDER BY Country ASC, CustomerName DESC;`,
    keyPoints: [
      'Default order is ascending (ASC)',
      'DESC sorts from highest to lowest or Z to A',
      'Multiple columns are sorted from left to right',
      'ORDER BY comes after WHERE',
    ],
  },
  {
    id: 'sql-5',
    title: 'AND, OR, NOT',
    subtitle: 'Combining conditions',
    contentTitle: 'Combine conditions in WHERE',
    description:
      'You can combine conditions in a WHERE clause. AND shows a record only if all the conditions are true. OR shows a record if at least one condition is true. NOT shows a record if the condition is not true, and it also works with other operators, like NOT LIKE. When you mix AND with OR, use parentheses to make the order clear.',
    code: `SELECT * FROM Customers
WHERE Country = 'Germany' AND City = 'Berlin';

SELECT * FROM Customers
WHERE Country = 'Germany' OR Country = 'Spain';

SELECT * FROM Customers
WHERE NOT Country = 'Spain';

SELECT * FROM Customers
WHERE CustomerName NOT LIKE 'A%';`,
    keyPoints: [
      'AND needs every condition to be true',
      'OR needs at least one condition to be true',
      'NOT reverses a condition',
      'Use parentheses when mixing AND with OR',
    ],
  },
  {
    id: 'sql-6',
    title: 'INSERT INTO',
    subtitle: 'Adding new records',
    contentTitle: 'Add rows to a table',
    description:
      'INSERT INTO adds new rows to a table. List the column names in parentheses, then give the matching values after VALUES, in the same order. Text values go in single quotes. Columns you leave out get NULL or their default value. If you give a value for every column in table order, you can skip the column names. You can add several rows in one statement by separating the sets of values with commas.',
    code: `INSERT INTO Customers (CustomerName, City, Country)
VALUES ('Cardinal', 'Stavanger', 'Norway');

INSERT INTO Customers (CustomerName, City, Country)
VALUES
  ('Greasy Burger', 'Cork', 'Ireland'),
  ('Tasty Tee', 'Oslo', 'Norway');`,
    keyPoints: [
      'INSERT INTO adds new rows',
      'Values must match the listed columns in order',
      'Skipped columns get NULL or a default value',
      'One statement can add many rows',
    ],
  },
  {
    id: 'sql-7',
    title: 'UPDATE',
    subtitle: 'Changing existing records',
    contentTitle: 'Modify existing rows',
    description:
      'UPDATE changes records that already exist in a table. Use SET to give the new values, and separate several column = value pairs with commas. The WHERE clause decides which rows are updated. Be careful: if you leave out WHERE, all the rows in the table are updated.',
    code: `UPDATE Customers
SET City = 'Oslo'
WHERE CustomerID = 1;

UPDATE Customers
SET ContactName = 'Juan', Country = 'Mexico'
WHERE CustomerID = 1;`,
    keyPoints: [
      'UPDATE changes existing rows',
      'SET lists the new values',
      'WHERE picks the rows to change',
      'No WHERE means every row is updated',
    ],
  },
  {
    id: 'sql-8',
    title: 'DELETE',
    subtitle: 'Removing records',
    contentTitle: 'Delete rows from a table',
    description:
      'DELETE removes existing rows from a table. The WHERE clause decides which rows are deleted. If you leave out WHERE, all the rows are deleted, but the table and its columns stay. DELETE removes whole rows, never a single column. To remove the entire table, use DROP TABLE. Before deleting, a good habit is to run a SELECT with the same WHERE condition to check which rows will match.',
    code: `DELETE FROM Customers
WHERE CustomerName = 'Alfreds Futterkiste';

-- deletes all rows, keeps the table
DELETE FROM Customers;

-- removes the whole table
DROP TABLE Customers;`,
    keyPoints: [
      'DELETE removes whole rows',
      'WHERE picks which rows are deleted',
      'No WHERE means all rows are deleted',
      'DROP TABLE removes the table itself',
    ],
  },
  {
    id: 'sql-9',
    title: 'MIN, MAX, COUNT, SUM, AVG',
    subtitle: 'Functions that summarize data',
    contentTitle: 'Summarize your data',
    description:
      'Aggregate functions calculate one value from many rows. MIN() returns the smallest value and MAX() returns the largest. COUNT() returns the number of rows that match. SUM() returns the total of a numeric column, and AVG() returns its average. You can give the result column a temporary name with the AS keyword, which is called an alias. These functions can be used together with WHERE.',
    code: `SELECT MIN(Price) FROM Products;

SELECT MAX(Price) FROM Products;

SELECT COUNT(*) AS TotalProducts
FROM Products
WHERE Price > 20;

SELECT SUM(Quantity) FROM OrderDetails;

SELECT AVG(Price) FROM Products;`,
    keyPoints: [
      'MIN and MAX find the smallest and largest value',
      'COUNT counts rows',
      'SUM and AVG work on numeric columns',
      'AS gives a column a temporary name',
    ],
  },
  {
    id: 'sql-10',
    title: 'JOINs',
    subtitle: 'Combining tables',
    contentTitle: 'Combine rows from related tables',
    description:
      'A JOIN combines rows from two or more tables using a related column, usually a foreign key in one table that matches a primary key in another. The ON keyword gives the matching condition. INNER JOIN returns only rows that match in both tables. LEFT JOIN returns all rows from the left table plus the matches from the right, with NULL where there is no match. RIGHT JOIN does the same for the right table. FULL OUTER JOIN returns all rows when there is a match in either table.',
    code: `SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers
ON Orders.CustomerID = Customers.CustomerID;

SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders
ON Customers.CustomerID = Orders.CustomerID;`,
    keyPoints: [
      'JOIN links tables through a related column',
      'INNER JOIN keeps only matching rows',
      'LEFT and RIGHT JOIN keep all rows of one side',
      'ON states how the tables match',
    ],
  },
];