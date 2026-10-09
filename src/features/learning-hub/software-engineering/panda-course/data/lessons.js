// src/features/learning-hub/software-engineering/pandas-course/data/lessons.js
export const LESSONS = [
  {
    id: 'pandas-intro',
    title: 'Introduction to Pandas',
    subtitle: 'What is Pandas and how to start',
    contentTitle: 'Meet your data assistant',
    description:
      'Pandas is an open-source Python library used for working with data sets. It has functions for analyzing, cleaning, exploring, and manipulating data. The name "Pandas" has a reference to both "Panel Data" and "Python Data Analysis".',
    code: `import pandas as pd

mydataset = {
  'cars': ["BMW", "Volvo", "Ford"],
  'passings': [3, 7, 2]
}

myvar = pd.DataFrame(mydataset)
print(myvar)`,
    sections: [
      {
        heading: 'Why Use Pandas?',
        text: 'Pandas allows us to analyze big data and make conclusions based on statistical theories. It can clean messy data sets, make them readable, and delete irrelevant data like empty or wrong values.',
      },
      {
        heading: 'Importing Pandas',
        text: 'Pandas is usually imported under the pd alias. Now Pandas is referred to as pd instead of pandas.',
        code: 'import pandas as pd',
      },
    ],
    keyPoints: [
      'Pandas is used for data analysis, cleaning, and exploration',
      'The standard community alias for importing Pandas is pd',
      'It handles large datasets inside efficient tabular structural frames',
    ],
  },
  {
    id: 'pandas-series',
    title: 'Pandas Series',
    subtitle: 'Working with 1D labeled arrays',
    contentTitle: 'Understanding Series',
    description:
      'A Pandas Series is like a column in a table. It is a one-dimensional array holding data of any type (integer, string, float, python objects, etc.). You can use a list to create a basic series.',
    code: `import pandas as pd

a = [1, 7, 2]
myvar = pd.Series(a)

print(myvar)`,
    sections: [
      {
        heading: 'Labels and Indexing',
        text: 'If nothing else is specified, the values are labeled with their index number (0, 1, 2, etc.). You can refer to a specific value by using its label name.',
        code: 'print(myvar[1]) // returns 7',
      },
      {
        heading: 'Custom Index Labels',
        text: 'With the index argument, you can name your own labels. This makes it act like a dictionary key.',
        code: `myvar = pd.Series(a, index = ["x", "y", "z"])
print(myvar["y"]) // returns 7`,
      },
    ],
    keyPoints: [
      'A Series represents a single column of flat data arrays',
      'Default indices start at 0 if no custom labels are explicitly assigned',
      'Use the index argument to specify named strings for key lookups',
    ],
  },
  {
    id: 'pandas-dataframes',
    title: 'Pandas DataFrames',
    subtitle: 'Working with 2D tables',
    contentTitle: 'DataFrames Explained',
    description:
      'A Pandas DataFrame is a 2-dimensional data structure, like a 2D array, or a table with rows and columns. While a Series is a column, a DataFrame is the entire multi-column spreadsheet table.',
    code: `import pandas as pd

data = {
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
}

df = pd.DataFrame(data)
print(df)`,
    sections: [
      {
        heading: 'Locate Row (loc)',
        text: 'Pandas uses the loc attribute to return one or more specified rows from a DataFrame.',
        code: `// refer to the row index
print(df.loc[0])

// use a list of indexes to get multiple rows
print(df.loc[[0, 1]])`,
      },
      {
        heading: 'Named Indexes',
        text: 'Like a Series, you can assign custom names to DataFrame rows with the index parameter.',
        code: `df = pd.DataFrame(data, index = ["day1", "day2", "day3"])
print(df.loc["day2"])`,
      },
    ],
    keyPoints: [
      'A DataFrame is a full two-dimensional multi-column data structure',
      'Use df.loc[index] to query specific individual rows securely',
      'DataFrames are easily built out of standard Python dictionary collections',
    ],
  },
  {
    id: 'pandas-read-csv',
    title: 'Reading CSV Files',
    subtitle: 'Load flat spreadsheet records',
    contentTitle: 'Working with CSV data',
    description:
      'A simple way to store big data sets is to use CSV files (comma-separated values). CSV files contain plain text and are a well-known format that can be read by everyone, including Pandas.',
    code: `import pandas as pd

df = pd.read_csv('data.csv')
print(df.to_string())`,
    sections: [
      {
        heading: 'to_string() vs print()',
        text: 'By default, if you print a large DataFrame without to_string(), Pandas will only return the first 5 rows and the last 5 rows. to_string() forces the console to print the entire DataFrame.',
      },
      {
        heading: 'Max Rows Configuration',
        text: 'You can check or change the maximum number of rows your system environment prints globally using display adjustments.',
        code: `print(pd.options.display.max_rows)
pd.options.display.max_rows = 9999`,
      },
    ],
    keyPoints: [
      'Use pd.read_csv() to load continuous external plain text tables',
      'Use .to_string() to render large tabular logs into terminal displays',
      'Pandas automatically collapses long files if they exceed max_rows bounds',
    ],
  },
  {
    id: 'pandas-read-json',
    title: 'Reading JSON Files',
    subtitle: 'Load nested objects and dictionaries',
    contentTitle: 'Working with JSON arrays',
    description:
      'Big data sets are often stored or moved as JSON (JavaScript Object Notation). JSON is plain text, but has the format of an object/dictionary, which aligns perfectly with Python systems.',
    code: `import pandas as pd

df = pd.read_json('data.json')
print(df.to_string())`,
    sections: [
      {
        heading: 'Dictionaries as JSON',
        text: 'JSON objects have the same format as Python dictionaries. If your JSON data is sitting directly in your code as a dictionary, you can load it into a DataFrame directly without loading an external file.',
      },
    ],
    keyPoints: [
      'Use pd.read_json() to parse standard key-value web metadata formats',
      'JSON maps naturally onto the rows and columns of empty DataFrames',
      'Nested JSON documents may require flattening processing arrays',
    ],
  },
  {
    id: 'pandas-viewing',
    title: 'Viewing & Inspecting Data',
    subtitle: 'Analyze the shape of your tables',
    contentTitle: 'First look inspection methods',
    description:
      'One of the first things you do when you open a new data set is to get a quick overview of what it contains. Pandas provides tools to peek at rows and summarize structural integrity.',
    code: `import pandas as pd
df = pd.read_csv('data.csv')

print(df.head(10)) # Top 10 rows
print(df.tail())   # Bottom 5 rows
print(df.info())   # Summary of metadata`,
    sections: [
      {
        heading: 'The head() Method',
        text: 'The head() method returns the headers and a specified number of rows, starting from the top. If the number is omitted, it defaults to returning 5 rows.',
      },
      {
        heading: 'The info() Method',
        text: 'The info() method gives you a structural overview of the dataset: number of rows, columns, names, data types, and count of non-null values.',
      },
    ],
    keyPoints: [
      'head(n) views the first n rows; tail(n) views the last n rows',
      'Omitting parameters defaults head/tail view lengths to exactly 5 elements',
      'info() displays critical summaries regarding null values and column data types',
    ],
  },
  {
    id: 'pandas-clean-empty',
    title: 'Cleaning Empty Cells',
    subtitle: 'Handling missing or null values',
    contentTitle: 'Fixing missing entries',
    description:
      'Empty cells can give you a wrong result when you analyze data. One way to deal with empty cells is to remove rows that contain empty cells. This is usually OK, since data sets can be very large, and removing a few rows will not ruin the analysis.',
    code: `import pandas as pd
df = pd.read_csv('data.csv')

new_df = df.dropna() # Returns a new copy
df.dropna(inplace = True) # Overwrites original`,
    sections: [
      {
        heading: 'Replacing Empty Values',
        text: 'If you do not want to drop rows, you can insert a new value instead using fillna(). This allows you to keep rows intact.',
        code: "df.fillna(130, inplace = True)",
      },
      {
        heading: 'Replacing Specific Columns',
        text: 'To avoid filling all columns with the same number, specify the exact column label name.',
        code: "df['Calories'].fillna(130, inplace = True)",
      },
    ],
    keyPoints: [
      'dropna() removes rows containing empty fields or missing data values',
      'use inplace = True to modify the original DataFrame directly without copying',
      'fillna() swaps out empty cells for defined replacement values or metrics',
    ],
  },
  {
    id: 'pandas-clean-wrong',
    title: 'Cleaning Wrong Formats & Duplicates',
    subtitle: 'Fix types and drop repeated lines',
    contentTitle: 'Data type adjustments',
    description:
      'Cells with data in the wrong format can make it difficult or impossible to analyze data properly. To fix this, you can convert the entire column to a consistent type, or drop matching faulty rows entirely.',
    code: `import pandas as pd
df = pd.read_csv('data.csv')

# Convert string dates to active datetime formats
df['Date'] = pd.to_datetime(df['Date'])`,
    sections: [
      {
        heading: 'Fixing Wrong Values',
        text: 'If a specific row contains an abnormal value (e.g. 450 instead of 45), you can overwrite it using loc coordinates or clear it with conditional drops.',
        code: "df.loc[7, 'Duration'] = 45",
      },
      {
        heading: 'Removing Duplicates',
        text: 'Duplicate rows are rows that have been entered more than once. Use duplicated() to find them and drop_duplicates() to erase them.',
        code: `print(df.duplicated())
df.drop_duplicates(inplace=True)`,
      },
    ],
    keyPoints: [
      'Convert columns to the correct data type before analysis',
      'Use loc to correct individual values',
      'duplicated() identifies duplicates; drop_duplicates() removes them',
    ],
  },
  {
    id: 'pandas-correlations',
    title: 'Correlation',
    subtitle: 'Explore relationships between columns',
    contentTitle: 'Measure how values move together',
    description:
      'Correlation describes how strongly two numeric columns move together in a linear pattern. Pandas can calculate correlations between numeric columns with corr(). A value near 1 indicates a strong positive relationship, near -1 a strong negative relationship, and near 0 little linear relationship. Correlation alone does not prove that one value causes another.',
    code: `import pandas as pd

df = pd.read_csv('data.csv')
print(df.corr(numeric_only=True))`,
    sections: [
      {
        heading: 'Read the result',
        text: 'Correlation values range from -1 to 1. Positive values indicate that two columns tend to increase together; negative values indicate that one tends to decrease as the other increases.',
      },
      {
        heading: 'Use care when interpreting',
        text: 'A correlation does not establish cause and effect. Check the data, sample size, and context before drawing conclusions.',
      },
    ],
    keyPoints: [
      'corr() calculates pairwise correlations for numeric columns',
      'Values closer to 1 or -1 indicate stronger linear relationships',
      'Correlation does not prove causation',
    ],
  },
  {
    id: 'pandas-plotting',
    title: 'Plotting Data',
    subtitle: 'Visualize patterns in your data',
    contentTitle: 'Turn data into a chart',
    description:
      'Charts help you understand distributions, comparisons, and relationships. Pandas includes plotting methods that work with Matplotlib. Choose a chart type that matches the question: histograms show distributions, line charts show ordered trends, and scatter plots show relationships between two numeric columns.',
    code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('data.csv')
df.plot(kind='scatter', x='Duration', y='Calories')
plt.show()`,
    sections: [
      {
        heading: 'Choose a chart type',
        text: 'Use a histogram to inspect a numeric distribution, a line chart for ordered values over time, or a scatter plot to compare two numeric columns.',
      },
      {
        heading: 'Label and review',
        text: 'Add clear titles and labels, then check that the selected columns and scales communicate the data accurately.',
      },
    ],
    keyPoints: [
      'Pandas plotting uses Matplotlib for chart rendering',
      'Pick chart types based on the data and the question',
      'Clear titles and labels make charts easier to interpret',
    ],
  },
];
