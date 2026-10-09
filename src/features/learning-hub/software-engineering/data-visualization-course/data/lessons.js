// Lesson content only. Progress ("completed", "in progress") is NOT stored here:
// it comes from the lessons the user has completed in Supabase.
// ids are saved as lesson_id in Supabase, so don't rename them later.
export const LESSONS = [
  {
    id: 'dv-1',
    title: 'Why visuals matter',
    subtitle: 'Turn data into insight',
    contentTitle: 'The purpose of data visualization',
    description:
      'A chart is not decoration. It is the fastest way to reveal patterns, compare values, and communicate decisions to a busy audience.',
    code: `# Good visualization answers a question quickly
sales = [120, 180, 210, 260, 300]
# A chart turns raw numbers into a story`,
    sections: [
      {
        heading: 'Patterns over lists',
        text: 'People process visual shapes faster than raw tables. Bar charts, line charts, and maps help identify direction, scale, and outliers immediately.',
      },
      {
        heading: 'Ask the right question',
        text: 'Before building a chart, define the question: Are we comparing categories, tracking change over time, or finding a relationship?',
      },
      {
        heading: 'Visuals for decisions',
        text: 'Strong data stories help stakeholders understand performance, spot risk, and justify the next action without reading a spreadsheet.',
      },
    ],
    keyPoints: [
      'Visuals help people grasp patterns faster than rows of numbers',
      'Choose the chart based on the question you want to answer',
      'A good chart supports a decision, not just decoration',
    ],
  },
  {
    id: 'dv-2',
    title: 'Clean and structure the data',
    subtitle: 'Prep before plotting',
    contentTitle: 'Start with reliable data',
    description:
      'Most chart mistakes happen before the first visualization is drawn. Clean data, consistent labels, and a clear schema make the final chart trustworthy.',
    code: `import pandas as pd

df = pd.read_csv('sales.csv')
df = df.dropna(subset=['region', 'revenue'])
df['month'] = pd.to_datetime(df['month'])`,
    sections: [
      {
        heading: 'Fix the basics',
        text: 'Remove duplicates, handle missing values, and standardize categories so one inconsistent label does not distort the story.',
      },
      {
        heading: 'Think in tidy rows',
        text: 'A tidy dataset usually has one observation per row and one variable per column. This makes grouping, filtering, and charting much easier.',
      },
      {
        heading: 'Document assumptions',
        text: 'If you exclude a category or transform a value, note it. Good analysis has traceable choices.',
      },
    ],
    keyPoints: [
      'Clean data is the foundation of trustworthy visuals',
      'Tidy data makes charts easier to build and explain',
      'Document filters, assumptions, and transformations',
    ],
  },
  {
    id: 'dv-3',
    title: 'Choose the right chart',
    subtitle: 'Match the graph to the question',
    contentTitle: 'Chart selection',
    description:
      'Different chart types answer different questions. A bar chart compares categories, a line chart shows trend over time, and a scatter plot reveals relationships between variables.',
    code: `# Examples of common chart choices
# bar: compare category totals
# line: track a metric over time
# scatter: see relationship between two variables`,
    sections: [
      {
        heading: 'Comparison',
        text: 'Use bar charts when you need to compare values across discrete categories such as product lines or regions.',
      },
      {
        heading: 'Change over time',
        text: 'Use line charts for chronological patterns like sales, website traffic, or temperature changes across weeks or months.',
      },
      {
        heading: 'Relationship',
        text: 'Use scatter plots to investigate whether one variable changes with another, such as ad spend and conversions.',
      },
    ],
    keyPoints: [
      'Bar charts compare categories',
      'Line charts show trends over time',
      'Scatter plots reveal relationships between variables',
    ],
  },
  {
    id: 'dv-4',
    title: 'Show distributions and variation',
    subtitle: 'The shape of the data matters',
    contentTitle: 'Distribution and spread',
    description:
      'Averages alone can hide important variation. A histogram or box plot helps reveal the spread, skew, and outliers in a dataset.',
    code: `import matplotlib.pyplot as plt

plt.hist(data, bins=12)
plt.title('Response time distribution')`,
    sections: [
      {
        heading: 'Histograms',
        text: 'Histograms show how values are distributed across a range, making it easier to see clusters and skew.',
      },
      {
        heading: 'Box plots',
        text: 'Box plots summarize median, spread, and extreme values at a glance, which is useful when comparing groups.',
      },
      {
        heading: 'Don\'t hide the variability',
        text: 'When a metric changes a lot, show the story behind that variability instead of only the average line.',
      },
    ],
    keyPoints: [
      'Histograms reveal distribution shape',
      'Box plots make spread and outliers easy to compare',
      'Variation is often the real story',
    ],
  },
  {
    id: 'dv-5',
    title: 'Highlight trends and time series',
    subtitle: 'Track change over time',
    contentTitle: 'Time series storytelling',
    description:
      'Time series visuals show whether a metric is increasing, decreasing, or changing seasonally. The goal is clarity and context, not a crowded chart.',
    code: `# Plot trend over time
plt.plot(months, revenue)
plt.xlabel('Month')
plt.ylabel('Revenue')`,
    sections: [
      {
        heading: 'Choose a time baseline',
        text: 'Monthly or weekly trends are easier to understand when you add context such as seasonality, goals, or previous-year comparisons.',
      },
      {
        heading: 'Use annotations carefully',
        text: 'Call out campaign launches, product changes, or external events only when they help explain a trend.',
      },
      {
        heading: 'Avoid false precision',
        text: 'A chart should help people interpret the signal, not overwhelm them with every minor fluctuation.',
      },
    ],
    keyPoints: [
      'Line charts are best for trends over time',
      'Context helps viewers explain what changed',
      'Annotate moments that matter, not every fluctuation',
    ],
  },
  {
    id: 'dv-6',
    title: 'Use color and typography well',
    subtitle: 'Design for fast understanding',
    contentTitle: 'Visual design choices',
    description:
      'Good visual design reduces friction. Thoughtful color, consistent text, and clean spacing help people read the chart without confusion.',
    code: `# Good colors are intentional
# Use one highlight color and neutral tones for context`,
    sections: [
      {
        heading: 'Color with purpose',
        text: 'Use color to highlight a category or point of emphasis, not to decorate the chart. Keep contrast high enough for readability.',
      },
      {
        heading: 'Keep labels readable',
        text: 'Use legible fonts, clear axes, and direct labels. If readers need to squint, the chart is not ready.',
      },
      {
        heading: 'Consistency is clarity',
        text: 'Use the same style for the same metric across dashboards or reports so viewers know what to look for.',
      },
    ],
    keyPoints: [
      'Color should guide attention, not distract it',
      'Readable labels and contrast matter for accessibility',
      'Consistent styling creates familiarity',
    ],
  },
  {
    id: 'dv-7',
    title: 'Build dashboards that tell a story',
    subtitle: 'Make the layout intentional',
    contentTitle: 'Dashboard design',
    description:
      'A dashboard is a communication tool. It should answer the most important questions at a glance and support exploration without overwhelming the viewer.',
    code: `# Layout example
# KPI cards | trend chart | comparison chart | notes`,
    sections: [
      {
        heading: 'Lead with the headline',
        text: 'Place the most important metrics and trends where users expect them. The dashboard should start with the decision, not the details.',
      },
      {
        heading: 'Group related information',
        text: 'Keep categories together and leave whitespace around high-priority charts. Clean layout improves scanning and reduces confusion.',
      },
      {
        heading: 'Use interactions cautiously',
        text: 'Filters and drilldowns can help, but they should not hide the main story behind too much navigation.',
      },
    ],
    keyPoints: [
      'Dashboards answer a business question first',
      'Layout should guide scanning and focus',
      'Interactions should support the story, not replace it',
    ],
  },
  {
    id: 'dv-8',
    title: 'Tell the right story',
    subtitle: 'Insight without noise',
    contentTitle: 'Narrative and interpretation',
    description:
      'The final chart is only part of the communication. The real value comes from the narrative: what changed, why it matters, and what action should follow.',
    code: `# Good insight example
# Conversion increased 14% after the campaign launch`,
    sections: [
      {
        heading: 'Context matters',
        text: 'A chart without context can be misleading. Explain key events, changes in business conditions, or unusual anomalies before drawing conclusions.',
      },
      {
        heading: 'Make the point explicit',
        text: 'State the main takeaway in plain language. For example: “Retention fell sharply in Q3 after onboarding friction in the mobile app.”',
      },
      {
        heading: 'Avoid overclaiming',
        text: 'Do not say a chart proves causation unless the method and data support that conclusion. Be careful and precise.',
      },
    ],
    keyPoints: [
      'Narrative explains what the chart means',
      'Context prevents misinterpretation',
      'Be honest about what the evidence supports',
    ],
  },
  {
    id: 'dv-9',
    title: 'Tools and workflows',
    subtitle: 'Excel, SQL, Python, BI tools',
    contentTitle: 'Use the right tool for the job',
    description:
      'Data visualization often spans multiple tools. Start with a spreadsheet or SQL query, shape the dataset in Python, and then polish the final presentation in a BI tool or plotting library.',
    code: `# Common workflow
# SQL to aggregate -> Python to clean -> chart library to visualize -> dashboard tool to present`,
    sections: [
      {
        heading: 'Work across tools',
        text: 'Excel is great for quick exploration, SQL helps aggregate structured data, and Python and BI tools help create polished interactive outputs.',
      },
      {
        heading: 'Keep the pipeline reproducible',
        text: 'Document where data came from, what was transformed, and how the chart was built so other people can trust and reproduce it.',
      },
      {
        heading: 'Build for the audience',
        text: 'Executives, customers, or internal analysts each need different levels of detail and different chart styles. Design for the person reading it.',
      },
    ],
    keyPoints: [
      'The best tool depends on the task and the audience',
      'Reproducible workflows build trust',
      'Audience needs should guide design choices',
    ],
  },
  {
    id: 'dv-10',
    title: 'Build a portfolio with visuals',
    subtitle: 'Show work people can trust',
    contentTitle: 'Present your visual work well',
    description:
      'Every chart you share should explain a business question, show the right method, and make the insight easy to understand. This is how your portfolio becomes evidence of skill.',
    code: `# Portfolio project example
# "Which customer segments drive the most retention revenue?"`,
    sections: [
      {
        heading: 'Show the problem clearly',
        text: 'A portfolio project is stronger when a viewer sees the question, the data source, and the final insight in a few minutes.',
      },
      {
        heading: 'Explain the method',
        text: 'Summarize how the data was cleaned, what metric you tracked, and why you chose the chart type. That makes the story credible.',
      },
      {
        heading: 'Keep the final output polished',
        text: 'Strong visuals, a concise explanation, and honest interpretation are more persuasive than a large but confusing dashboard.',
      },
    ],
    keyPoints: [
      'A portfolio should describe the question and result clearly',
      'Explain the method to show rigor',
      'Polished, honest storytelling is more persuasive than complexity',
    ],
  },
];