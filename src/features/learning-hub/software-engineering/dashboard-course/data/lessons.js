// Lesson content only. Progress ("completed", "in progress") is NOT stored here:
// it comes from the lessons the user has completed in Supabase.
// ids are saved as lesson_id in Supabase, so don't rename them later.
// Lessons 1-5 cover Power BI and lessons 6-10 cover Tableau.
// Topics follow the Tutorialspoint Power BI and Tableau tutorials.
export const LESSONS = [
  {
    id: 'dashboard-1',
    title: 'Power BI introduction',
    subtitle: 'BI, components, and Desktop vs Service',
    contentTitle: 'What is Power BI?',
    description:
      'Power BI is a data visualization and Business Intelligence (BI) tool. It turns data from many different sources into interactive reports and dashboards. The Power BI suite has three main parts: Power BI Desktop (a free Windows app used to build reports), the Power BI Service (a cloud service used to share and view reports online), and the mobile apps. Its major components are Power Query (cleans and transforms data), Power Pivot (data modeling with DAX), Power View (charts and visuals), Power Map (3D maps for location data), and Power Q&A (ask questions in natural language). Power BI Desktop is free, but sharing in the Service needs a paid Pro or Premium license.',
    code: `Get data
  -> Transform (Power Query)
  -> Model (relationships, DAX)
  -> Visualize (Report view)
  -> Publish and share (Power BI Service)`,
    keyPoints: [
      'BI = Business Intelligence',
      'Desktop builds reports, the Service shares them',
      'Power Query cleans data, Power Pivot models it',
      'Desktop is free; Pro and Premium are paid',
    ],
  },
  {
    id: 'dashboard-2',
    title: 'Get and clean data',
    subtitle: 'Data sources and Power Query Editor',
    contentTitle: 'Connect to data and prepare it',
    description:
      'Power BI can connect to many data sources: flat files (Excel and CSV), databases (SQL Server, MySQL), cloud platforms (Azure), and online services. After connecting, open the Power Query Editor to clean and reshape the data before it is loaded. Common steps are promoting the first row to headers, changing a column data type, removing duplicates, replacing values, and splitting columns. Every step is recorded in the Applied Steps list, so the same cleaning runs again when the data refreshes. Merge Queries combines two tables by matching columns, like a SQL join. The join kinds are Inner, Left Outer, Right Outer, Full Outer, Left Anti, and Right Anti. Click Close & Apply to load the result into the model.',
    code: `Applied Steps
1. Source
2. Promoted Headers
3. Changed Type
4. Removed Duplicates
5. Merged Queries (Left Outer)`,
    keyPoints: [
      'Power Query Editor cleans data before it is loaded',
      'Applied Steps record each change and replay on refresh',
      'Merge Queries joins tables on matching columns',
      'Close & Apply loads the data into the model',
    ],
  },
  {
    id: 'dashboard-3',
    title: 'Data modeling',
    subtitle: 'Star schema, relationships, and cardinality',
    contentTitle: 'Connect your tables',
    description:
      'Data modeling means organizing tables and linking them with relationships. A good layout is the star schema: one central fact table (numbers about events, such as sales amount) connected to several dimension tables (descriptive data such as customers, products, and dates). Tables are linked through a shared key column, for example ProductID. You can see and manage the links in Model view, where you can auto-detect, create, edit, or delete relationships. Cardinality describes how rows match: one-to-many is the most common, and one-to-one and many-to-many also exist. Cross-filter direction decides how a filter flows between tables, and a single direction is the safe default. You can also add a calculated column, which is a new column created with a DAX formula.',
    code: `Sales (fact)       Product (dimension)
ProductID  *  --->  1  ProductID
CustomerID *  --->  1  Customers[CustomerID]
OrderDate  *  --->  1  Calendar[Date]`,
    keyPoints: [
      'Fact tables hold numbers, dimension tables hold descriptions',
      'Relationships connect tables through key columns',
      'One-to-many is the most common cardinality',
      'Model view is where relationships are managed',
    ],
  },
  {
    id: 'dashboard-4',
    title: 'Visuals and reports',
    subtitle: 'Charts, tables, cards, and slicers',
    contentTitle: 'Build a report page',
    description:
      'In Report view you drag fields from the Data pane into a visual and set it up in the Visualizations pane. Pick the visual that fits the question. Bar and column charts compare categories. Line and area charts show change over time. Pie and donut charts show parts of a whole when there are only a few categories. Scatter charts show how two numbers relate. Map, filled map, and treemap visuals show location or hierarchy. A table lists detailed rows, while a matrix groups data by both rows and columns like a pivot table. A card shows one big number, a KPI compares a value with a target, and a slicer lets viewers filter the other visuals on the page. A waterfall chart shows how increases and decreases build up to a total.',
    code: `Clustered column chart
  X-axis:  Month
  Y-axis:  Total Sales
  Legend:  Region

Card
  Fields:  Total Sales`,
    keyPoints: [
      'Bar and column compare, line shows trends',
      'Pie and donut suit only a few categories',
      'Card shows one number, slicer filters the page',
      'Matrix groups by rows and columns, table lists rows',
    ],
  },
  {
    id: 'dashboard-5',
    title: 'DAX and dashboards',
    subtitle: 'Measures, formulas, and sharing',
    contentTitle: 'Calculate and share your insights',
    description:
      'DAX (Data Analysis Expressions) is the formula language of Power BI. A measure is calculated on demand and reacts to the filters in each visual, while a calculated column is calculated for every row and stored in the table. Common DAX functions are SUM, AVERAGE, MIN, and MAX for totals, COUNTROWS and DISTINCTCOUNT for counting, and IF for logic. CALCULATE evaluates an expression after changing the filters. A dashboard lives in the Power BI Service. It is a single page of tiles that you pin from one or more reports using Pin to dashboard. Get Quick Insights asks Power BI to look for patterns automatically, and Share sends the dashboard to other users.',
    code: `Total Sales = SUM(Sales[Amount])

Order Count = COUNTROWS(Sales)

Customers = DISTINCTCOUNT(Sales[CustomerID])

Size = IF(Sales[Amount] > 1000, "Big", "Small")

Sales USA =
CALCULATE([Total Sales], Customers[Country] = "USA")`,
    keyPoints: [
      'Measures react to filters, calculated columns are stored per row',
      'SUM, COUNTROWS, DISTINCTCOUNT, and IF are common DAX functions',
      'CALCULATE changes the filters of an expression',
      'Dashboards are pages of pinned tiles in the Service',
    ],
  },
  {
    id: 'dashboard-6',
    title: 'Tableau introduction',
    subtitle: 'Products, workspace, and file types',
    contentTitle: 'What is Tableau?',
    description:
      'Tableau is a Business Intelligence tool for visually analysing data. It connects to files, relational databases, and big data sources, and lets you build interactive dashboards by dragging and dropping fields. The main products are Tableau Desktop (builds visualizations), Tableau Server (shares workbooks inside an organization), Tableau Online or Cloud (a hosted platform that shares views as web links), and Tableau Public (free, but the work is shared publicly). The workspace has a Data pane with your fields, the Columns and Rows shelves that build the view, the Marks card for color, size, and labels, a Filters shelf, and Show Me, which suggests chart types. A workbook (.twb) stores sheets and dashboards, while a packaged workbook (.twbx) also bundles the data.',
    code: `Connect to data
  -> Build views on worksheets
  -> Combine them in a dashboard
  -> Publish and share

.twb    workbook
.twbx   packaged workbook (with data)
.tds    data source
.hyper  extract`,
    keyPoints: [
      'Tableau builds visuals by drag and drop',
      'Desktop builds, Server and Online share',
      'Rows and Columns shelves create the view',
      '.twbx bundles the data, .twb does not',
    ],
  },
  {
    id: 'dashboard-7',
    title: 'Connect to data',
    subtitle: 'Data types, joins, and blending',
    contentTitle: 'Bring data into Tableau',
    description:
      'Tableau connects to text files, Excel, databases, cloud sources, and more. A live connection reads the current data from the source each time, while an extract is a saved snapshot that is usually faster. Fields have data types: text, date, number, boolean, and geographic. Tableau also sorts fields into dimensions (categories such as Region or Customer) and measures (numbers such as Sales or Profit that can be aggregated). A join combines tables from the same data source using a matching field, with Inner, Left, Right, and Full Outer joins. Data blending combines data from different data sources: the first source used in the view is the primary source, and a linking field connects the secondary source. Editing metadata lets you rename fields, change data types, and hide fields.',
    code: `Join (same source)
  Orders.CustomerID = Customers.CustomerID

Blend (different sources)
  Primary:    Sales database
  Secondary:  Targets spreadsheet
  Link field: Region`,
    keyPoints: [
      'Live reads current data, extract is a saved snapshot',
      'Dimensions are categories, measures are numbers',
      'Joins work inside one data source',
      'Blending links different data sources',
    ],
  },
  {
    id: 'dashboard-8',
    title: 'Worksheets, sorting, filters',
    subtitle: 'Building and narrowing a view',
    contentTitle: 'Show only what matters',
    description:
      'A worksheet is the screen space where you build one view. A workbook is a collection of worksheets, and you can add, rename, reorder, and delete them. Drag a dimension to Rows or Columns and a measure next to it to start a chart. Sorting puts the marks in order, for example highest sales first, and you can sort from the toolbar or the axis. Filters narrow the data. A basic filter picks values to keep or exclude. A quick filter shows a control in the view so the viewer can change it. A context filter is applied before the other filters, so they only work on the filtered data. A condition filter keeps values that meet a rule, and a top filter keeps only the top or bottom N values by a measure. Drag a field to the Filters shelf to filter by it.',
    code: `Rows:     Customer Name
Columns:  SUM(Sales)
Sort:     Descending by Sales

Condition filter:  SUM([Sales]) > 5000
Top filter:        Top 10 by SUM([Profit])`,
    keyPoints: [
      'A workbook is a collection of worksheets',
      'Quick filters give viewers a control',
      'Context filters run before other filters',
      'Condition and top filters use a rule or a top N',
    ],
  },
  {
    id: 'dashboard-9',
    title: 'Calculations',
    subtitle: 'Calculated fields, LOD, and parameters',
    contentTitle: 'Create new values from your data',
    description:
      'A calculated field is a new field that you build with a formula. Formulas use operators (arithmetic, comparison, and logical ones such as AND, OR, and NOT) and built-in functions for numbers (ROUND), strings (LEFT, UPPER), dates (DATEDIFF, DATEPART), aggregates (SUM, AVG), and logic (IF, THEN, ELSE, END). Table calculations run on the values already in the view, for example RUNNING_SUM or RANK. A Level of Detail (LOD) expression computes at a level you choose, whatever is in the view. FIXED uses only the dimensions you list, while INCLUDE and EXCLUDE add or remove dimensions. A parameter is a value the viewer can change, and it can drive a calculation or a filter. Filters only remove records, but parameters can change how a calculation works.',
    code: `Profit Ratio = SUM([Profit]) / SUM([Sales])

IF [Sales] > 1000 THEN "High" ELSE "Low" END

DATEDIFF('day', [Order Date], [Ship Date])

RUNNING_SUM(SUM([Sales]))

{ FIXED [Region] : SUM([Sales]) }`,
    keyPoints: [
      'Calculated fields use operators and functions',
      'Table calculations work on the values in the view',
      'FIXED LOD ignores the rest of the view',
      'Parameters let viewers change a calculation or filter',
    ],
  },
  {
    id: 'dashboard-10',
    title: 'Charts and dashboards',
    subtitle: 'Choosing charts and sharing results',
    contentTitle: 'Tell the story with charts',
    description:
      'Tableau has many chart types. Bar charts compare categories, line charts show trends over time, pie charts show parts of a whole, scatter plots show how two measures relate, and treemaps use nested rectangles for parts of a whole. A histogram shows how values are distributed in bins, a Gantt chart shows how long tasks last, and a box plot shows spread. Trend lines show the direction of the data, and forecasting predicts future values from past patterns on a date field. A dashboard combines several worksheets on one canvas. Dashboard actions make it interactive: a filter action lets a click on one chart filter the others, and a highlight action emphasizes related marks. Results can be exported as an image, PDF, or CSV, or published to Tableau Server, Cloud, or Public.',
    code: `Line chart
  Columns:  MONTH(Order Date)
  Rows:     SUM(Sales)
  Analytics: Trend Line, Forecast

Dashboard
  Sheet 1: Sales by Region (bar)
  Sheet 2: Sales over time (line)
  Action:  Filter on select`,
    keyPoints: [
      'Match the chart to the question you are asking',
      'Trend lines and forecasts need a date or number axis',
      'Dashboards combine worksheets on one canvas',
      'Actions make dashboards interactive',
    ],
  },
];