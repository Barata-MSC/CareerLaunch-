// Lesson content only. Progress ("completed", "in progress") is NOT stored here:
// it comes from the lessons the user has completed in Supabase.
// ids are saved as lesson_id in Supabase, so don't rename them later.
// Optional fields used by LessonScreen: code, sections[{heading, text, code}], keyPoints[].
export const LESSONS = [
  {
    id: 'stats-1',
    title: 'Introduction to statistics',
    subtitle: 'Data, populations, and variable types',
    contentTitle: 'What is statistics?',
    description:
      'Statistics is the science of collecting, organizing, analyzing, and interpreting data. Descriptive statistics summarizes the data you have, using numbers and charts. Inferential statistics uses a sample to draw conclusions about a larger group.',
    code: `Population -> the entire group you want to learn about
Sample     -> the part of the population you actually measure
Parameter  -> a number describing a population
Statistic  -> a number describing a sample`,
    sections: [
      {
        heading: 'Types of variables',
        text: 'A variable is a characteristic that can differ from one individual to another. Categorical variables place individuals into groups, such as eye color. Numerical variables are measured or counted, such as height or number of siblings.',
      },
      {
        heading: 'Categorical variables',
        text: 'Nominal variables have no natural order (eye color, city). Ordinal variables have a meaningful order, but the gaps between values are not equal (shirt size S, M, L, XL).',
      },
      {
        heading: 'Numerical variables',
        text: 'Discrete variables are counts that take separate whole values (number of customers per day). Continuous variables can take any value in a range (weight, time, temperature).',
      },
    ],
    keyPoints: [
      'Descriptive statistics summarizes data; inferential statistics generalizes from a sample',
      'A parameter describes a population; a statistic describes a sample',
      'Categorical: nominal or ordinal. Numerical: discrete or continuous',
    ],
  },
  {
    id: 'stats-2',
    title: 'Measures of center',
    subtitle: 'Mean, median, and mode',
    contentTitle: 'Finding the typical value',
    description:
      'A measure of center describes the typical value of a dataset. The mean is the sum of all values divided by the number of values. The median is the middle value when the data is sorted. The mode is the value that appears most often.',
    code: `Data: 4, 6, 6, 8, 11

mean   = (4 + 6 + 6 + 8 + 11) / 5 = 7
median = 6   (middle of the sorted list)
mode   = 6   (appears twice)`,
    sections: [
      {
        heading: 'Even number of values',
        text: 'When the dataset has an even number of values, the median is the average of the two middle values. For 2, 4, 6, 10 the median is (4 + 6) / 2 = 5.',
      },
      {
        heading: 'Outliers and skew',
        text: 'The mean uses every value, so outliers pull it strongly. The median is resistant to outliers. In right-skewed data the mean is usually greater than the median.',
        code: `Data: 4, 6, 6, 8, 50

mean   = 74 / 5 = 14.8   (pulled up by 50)
median = 6               (unchanged)`,
      },
      {
        heading: 'The mode',
        text: 'A dataset can have one mode, two modes (bimodal), or none. The mode is the only measure of center that works for categorical data, such as the most popular favorite color.',
      },
    ],
    keyPoints: [
      'Mean = sum of values / number of values',
      'Median is the middle value and is resistant to outliers',
      'Mode is the most frequent value and works for categories too',
    ],
  },
  {
    id: 'stats-3',
    title: 'Measures of spread',
    subtitle: 'Range, IQR, variance, standard deviation',
    contentTitle: 'How spread out is the data?',
    description:
      'Two datasets can have the same mean but be very different. Measures of spread describe how far values are from the center. The range is the maximum minus the minimum. Variance and standard deviation measure the typical distance of values from the mean.',
    code: `Data: 2, 4, 4, 4, 5, 5, 7, 9      mean = 5

squared deviations: 9, 1, 1, 1, 0, 0, 4, 16   sum = 32

population variance = 32 / 8 = 4
population SD       = sqrt(4) = 2`,
    sections: [
      {
        heading: 'Variance and standard deviation',
        text: 'Variance is the average of the squared deviations from the mean. The standard deviation is the square root of the variance, so it is in the same units as the data. A larger standard deviation means more spread.',
      },
      {
        heading: 'Sample vs population',
        text: 'For a population, divide the sum of squared deviations by n. For a sample, divide by n - 1. This correction makes the sample variance a better estimate of the population variance.',
        code: `sample variance = sum of squared deviations / (n - 1)
                = 32 / 7 = about 4.57`,
      },
      {
        heading: 'Interquartile range',
        text: 'The IQR is Q3 - Q1, the spread of the middle 50% of the data. It is resistant to outliers, unlike the range.',
      },
    ],
    keyPoints: [
      'Range = max - min; IQR = Q3 - Q1',
      'Standard deviation = square root of variance',
      'Sample variance divides by n - 1; population variance divides by n',
      'If all values are equal, the standard deviation is 0',
    ],
  },
  {
    id: 'stats-4',
    title: 'Visualizing data',
    subtitle: 'Histograms, box plots, and scatter plots',
    contentTitle: 'Charts that show the story',
    description:
      'Choosing the right chart is part of the analysis. A bar chart compares categories. A histogram shows the distribution of one numerical variable by grouping values into bins. A scatter plot shows the relationship between two numerical variables. A box plot summarizes a distribution using five numbers.',
    code: `Five-number summary:
minimum, Q1, median, Q3, maximum`,
    sections: [
      {
        heading: 'Histograms and shape',
        text: 'Histogram bars touch because the bins are consecutive intervals of a continuous scale. A distribution can be symmetric, right-skewed (long tail to the right), or left-skewed (long tail to the left).',
      },
      {
        heading: 'Reading a box plot',
        text: 'The box runs from Q1 to Q3, and the line inside the box is the median. The whiskers extend to the smallest and largest values that are not outliers. Points beyond the whiskers are plotted individually as outliers.',
      },
      {
        heading: 'The 1.5 x IQR rule',
        text: 'A value is flagged as a potential outlier if it is below Q1 - 1.5 x IQR or above Q3 + 1.5 x IQR.',
        code: `Q1 = 20, Q3 = 30  ->  IQR = 10

lower fence = 20 - 1.5 * 10 = 5
upper fence = 30 + 1.5 * 10 = 45`,
      },
    ],
    keyPoints: [
      'Bar chart: categories. Histogram: distribution of a numerical variable',
      'Scatter plot: relationship between two numerical variables',
      'A box plot shows the minimum, Q1, median, Q3, and maximum',
    ],
  },
  {
    id: 'stats-5',
    title: 'Probability basics',
    subtitle: 'Events, rules, and conditional probability',
    contentTitle: 'Measuring chance',
    description:
      'Probability measures how likely an event is. It is always a number from 0 (impossible) to 1 (certain). When all outcomes are equally likely, the probability of an event is the number of favorable outcomes divided by the total number of outcomes.',
    code: `P(event) = favorable outcomes / total outcomes

P(rolling a 4 on a fair die) = 1/6
P(not A) = 1 - P(A)`,
    sections: [
      {
        heading: 'Addition rule',
        text: 'For any two events, P(A or B) = P(A) + P(B) - P(A and B). If the events are mutually exclusive (they cannot happen together), P(A and B) = 0, so you just add.',
        code: `P(A) = 0.5, P(B) = 0.4, P(A and B) = 0.2
P(A or B) = 0.5 + 0.4 - 0.2 = 0.7`,
      },
      {
        heading: 'Independent events',
        text: 'Two events are independent if one happening does not change the probability of the other. For independent events, P(A and B) = P(A) x P(B).',
        code: `P(two heads in two flips) = 1/2 * 1/2 = 1/4`,
      },
      {
        heading: 'Conditional probability',
        text: 'P(A | B) is the probability of A given that B has already happened.',
        code: `P(A | B) = P(A and B) / P(B)

P(A and B) = 0.2, P(B) = 0.5
P(A | B) = 0.2 / 0.5 = 0.4`,
      },
    ],
    keyPoints: [
      'Probabilities are between 0 and 1',
      'Complement rule: P(not A) = 1 - P(A)',
      'Independent events: multiply. Mutually exclusive events: add',
    ],
  },
  {
    id: 'stats-6',
    title: 'Probability distributions',
    subtitle: 'Random variables and the binomial distribution',
    contentTitle: 'Describing random outcomes',
    description:
      'A random variable assigns a number to the outcome of a random process. A discrete random variable takes separate values, such as the number of heads in 10 flips. A continuous random variable takes any value in a range, such as a waiting time. A probability distribution lists the possible values and how likely each is. For a discrete distribution, all probabilities add up to 1.',
    code: `Expected value: E(X) = sum of ( x * P(x) )

Fair die: (1+2+3+4+5+6) / 6 = 3.5`,
    sections: [
      {
        heading: 'The binomial distribution',
        text: 'A binomial random variable counts the successes in n trials. It requires a fixed number of trials, only two outcomes per trial (success or failure), the same success probability p on every trial, and independent trials.',
        code: `P(X = k) = C(n, k) * p^k * (1 - p)^(n - k)
mean = n * p

3 fair flips, exactly 2 heads:
C(3, 2) * 0.5^2 * 0.5^1 = 3 * 0.125 = 0.375`,
      },
      {
        heading: 'Continuous distributions',
        text: 'For a continuous variable, probability is the area under a curve over an interval. The probability of any single exact value is 0.',
      },
    ],
    keyPoints: [
      'Discrete: countable values. Continuous: any value in a range',
      'Discrete probabilities sum to 1',
      'Binomial mean = n x p',
    ],
  },
  {
    id: 'stats-7',
    title: 'The normal distribution',
    subtitle: 'The empirical rule and z-scores',
    contentTitle: 'The bell curve',
    description:
      'The normal distribution is a symmetric, bell-shaped curve described by its mean and standard deviation. Its mean, median, and mode are all equal and sit at the center. Many natural measurements, such as heights and test scores, are approximately normal.',
    code: `Empirical rule (68-95-99.7):
about 68% of values are within 1 SD of the mean
about 95% of values are within 2 SD of the mean
about 99.7% of values are within 3 SD of the mean`,
    sections: [
      {
        heading: 'Z-scores',
        text: 'A z-score tells you how many standard deviations a value is from the mean. Positive means above the mean and negative means below.',
        code: `z = (x - mean) / SD

x = 85, mean = 70, SD = 10
z = (85 - 70) / 10 = 1.5`,
      },
      {
        heading: 'Comparing values',
        text: 'Z-scores let you compare values from different scales. A z-score of 1.8 on one exam is a stronger relative result than a z-score of 0.9 on another.',
      },
      {
        heading: 'The standard normal distribution',
        text: 'The standard normal distribution is the normal distribution with mean 0 and standard deviation 1. Converting values to z-scores places them on this scale.',
      },
    ],
    keyPoints: [
      'Normal curve: symmetric, bell-shaped, mean = median = mode',
      'Empirical rule: 68%, 95%, 99.7%',
      'z = (x - mean) / SD',
    ],
  },
  {
    id: 'stats-8',
    title: 'Sampling and the CLT',
    subtitle: 'Sampling methods, standard error, confidence intervals',
    contentTitle: 'From samples to populations',
    description:
      'We rarely measure a whole population, so we take a sample. In a simple random sample every member of the population has an equal chance of being chosen. In stratified sampling the population is split into groups (strata) and a sample is taken from each group. Bias happens when a sample does not represent the population, for example a voluntary online poll.',
    sections: [
      {
        heading: 'Sampling distribution',
        text: 'A sampling distribution is the distribution of a statistic, such as the sample mean, across many samples of the same size.',
      },
      {
        heading: 'Central Limit Theorem',
        text: 'The Central Limit Theorem says that for a large enough sample size, the distribution of sample means is approximately normal, no matter the shape of the population. A common rule of thumb is n of 30 or more.',
      },
      {
        heading: 'Standard error',
        text: 'The standard error is the standard deviation of the sample mean. It shrinks as the sample size grows.',
        code: `SE = SD / sqrt(n)

SD = 15, n = 25
SE = 15 / 5 = 3`,
      },
      {
        heading: 'Confidence intervals',
        text: 'A confidence interval gives a range of plausible values for a population parameter. A 95% confidence interval means that if you repeated the sampling many times, about 95% of the intervals built this way would contain the true value.',
        code: `95% CI for a mean = x-bar +/- 1.96 * SE

x-bar = 50, SE = 2
50 +/- 3.92  ->  46.08 to 53.92`,
      },
    ],
    keyPoints: [
      'Random sampling reduces bias',
      'CLT: sample means become approximately normal as n grows',
      'SE = SD / sqrt(n), so bigger samples give smaller SE',
    ],
  },
  {
    id: 'stats-9',
    title: 'Hypothesis testing',
    subtitle: 'Null hypothesis, p-values, and errors',
    contentTitle: 'Testing a claim with data',
    description:
      'A hypothesis test uses sample data to decide whether there is enough evidence against a claim. The null hypothesis (H0) is the default claim of no effect or no difference. The alternative hypothesis (Ha) is what you look for evidence of.',
    code: `H0: the new design does not change conversion rate
Ha: the new design changes conversion rate`,
    sections: [
      {
        heading: 'p-value and significance level',
        text: 'The p-value is the probability of getting results at least as extreme as the ones observed, assuming H0 is true. The significance level alpha (commonly 0.05) is the cutoff you choose before the test.',
        code: `p-value <= alpha  ->  reject H0
p-value >  alpha  ->  fail to reject H0

p = 0.03, alpha = 0.05  ->  reject H0
p = 0.20, alpha = 0.05  ->  fail to reject H0`,
      },
      {
        heading: 'Wording the conclusion',
        text: 'We say "fail to reject H0" rather than "accept H0", because a lack of evidence against a claim is not proof that it is true. The p-value is not the probability that H0 is true.',
      },
      {
        heading: 'Type I and Type II errors',
        text: 'A Type I error is rejecting H0 when it is actually true (a false positive). Its probability is alpha. A Type II error is failing to reject H0 when it is actually false (a false negative).',
      },
    ],
    keyPoints: [
      'Small p-value: the data would be unlikely if H0 were true',
      'Reject H0 when p <= alpha',
      'Type I = false positive; Type II = false negative',
    ],
  },
  {
    id: 'stats-10',
    title: 'Correlation and regression',
    subtitle: 'Relationships between two variables',
    contentTitle: 'Measuring and modeling relationships',
    description:
      'The correlation coefficient r measures the strength and direction of a linear relationship between two numerical variables. It ranges from -1 to 1. Values near 1 mean a strong positive relationship, values near -1 a strong negative one, and values near 0 mean little or no linear relationship.',
    code: `r = -1   perfect negative line
r =  0   no linear relationship
r = +1   perfect positive line`,
    sections: [
      {
        heading: 'Correlation is not causation',
        text: 'Two variables can move together without one causing the other. A hidden third variable (a confounder) may explain both. Ice cream sales and sunburns both rise in summer, but ice cream does not cause sunburn.',
      },
      {
        heading: 'Simple linear regression',
        text: 'Regression fits a line to predict y from x. The slope is the predicted change in y for each 1-unit increase in x. The intercept is the predicted y when x is 0.',
        code: `y-hat = 20 + 5x

x = 4  ->  y-hat = 20 + 5 * 4 = 40`,
      },
      {
        heading: 'Residuals and R-squared',
        text: 'A residual is the actual value minus the predicted value. R-squared is the share of the variation in y explained by the model. An R-squared of 0.64 means 64% of the variation is explained.',
      },
      {
        heading: 'Extrapolation',
        text: 'Predicting far outside the range of your data is called extrapolation and is unreliable, because the pattern may not continue.',
      },
    ],
    keyPoints: [
      'r ranges from -1 to 1',
      'Correlation does not imply causation',
      'Residual = actual - predicted',
      'R-squared = share of variation in y explained by x',
    ],
  },
];