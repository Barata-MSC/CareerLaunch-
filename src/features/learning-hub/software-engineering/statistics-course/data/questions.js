// 10 questions per lesson (100 total). The quiz picks one random question per lesson
// each attempt (see quizSize in course.js and pickQuizQuestions in courseUtils.js).
// lessonId links each question to the lesson to review when it is missed.
// explanation is shown on the result screen.
export const QUESTIONS = [
  // ---------- Lesson 1: Introduction to statistics ----------
  {
    lessonId: 'stats-1',
    question: 'What is the main goal of descriptive statistics?',
    answers: [
      'To summarize and describe the data you have',
      'To predict future events with certainty',
      'To prove that a hypothesis is false',
      'To collect data from a population',
    ],
    correct: 0,
    explanation:
      'Descriptive statistics summarizes and describes a dataset using numbers and charts. Drawing conclusions beyond the data is inferential statistics.',
  },
  {
    lessonId: 'stats-1',
    question: 'In statistics, what is a population?',
    answers: [
      'A small group chosen for a study',
      'The entire group you want to learn about',
      'A single number that summarizes data',
      'Any group with more than 100 people',
    ],
    correct: 1,
    explanation:
      'A population is the entire group of interest. The part you actually measure is called a sample.',
  },
  {
    lessonId: 'stats-1',
    question: 'A number that describes a sample is called a:',
    answers: ['Parameter', 'Population', 'Statistic', 'Variable'],
    correct: 2,
    explanation:
      'A statistic describes a sample, while a parameter describes a population.',
  },
  {
    lessonId: 'stats-1',
    question: 'Which of these is a categorical variable?',
    answers: ['Height in centimeters', 'Number of siblings', 'Temperature in degrees', 'Eye color'],
    correct: 3,
    explanation:
      'Eye color places people into groups, so it is categorical. The others are measured or counted numbers.',
  },
  {
    lessonId: 'stats-1',
    question: 'Shirt size (S, M, L, XL) is what type of variable?',
    answers: ['Nominal', 'Ordinal', 'Discrete numerical', 'Continuous'],
    correct: 1,
    explanation:
      'Shirt size is categorical with a meaningful order, which makes it ordinal.',
  },
  {
    lessonId: 'stats-1',
    question: 'The number of customers who visit a store each day is:',
    answers: ['Continuous', 'Nominal', 'Ordinal', 'Discrete numerical'],
    correct: 3,
    explanation:
      'It is a count that takes separate whole values, so it is a discrete numerical variable.',
  },
  {
    lessonId: 'stats-1',
    question: 'Which of these is a continuous variable?',
    answers: [
      'Number of cars in a parking lot',
      'Number of students in a class',
      'Weight of a package',
      'Goals scored in a match',
    ],
    correct: 2,
    explanation:
      'Weight can take any value in a range, so it is continuous. The other options are counts.',
  },
  {
    lessonId: 'stats-1',
    question: 'What does inferential statistics do?',
    answers: [
      'Uses a sample to draw conclusions about a larger population',
      'Lists every value in a dataset',
      'Only draws charts of the data',
      'Removes outliers from the data',
    ],
    correct: 0,
    explanation:
      'Inferential statistics generalizes from a sample to a population.',
  },
  {
    lessonId: 'stats-1',
    question:
      'A researcher surveys 200 voters to estimate support among all voters in a country. The 200 voters are:',
    answers: ['The population', 'A parameter', 'A variable', 'The sample'],
    correct: 3,
    explanation:
      'The 200 voters are the part of the population that was actually measured, so they are the sample.',
  },
  {
    lessonId: 'stats-1',
    question:
      'The average income of every employee at a company, with all employees measured, is a:',
    answers: ['Statistic', 'Parameter', 'Sample', 'Estimate'],
    correct: 1,
    explanation:
      'Because every member of the group was measured, the value describes the population, so it is a parameter.',
  },

  // ---------- Lesson 2: Measures of center ----------
  {
    lessonId: 'stats-2',
    question: 'What is the mean of 4, 6, 6, 8, 11?',
    answers: ['6', '7', '8', '35'],
    correct: 1,
    explanation: 'The sum is 35 and there are 5 values, so the mean is 35 / 5 = 7.',
  },
  {
    lessonId: 'stats-2',
    question: 'What is the median of 3, 9, 5, 1, 7?',
    answers: ['3', '4', '5', '7'],
    correct: 2,
    explanation: 'Sorted: 1, 3, 5, 7, 9. The middle value is 5.',
  },
  {
    lessonId: 'stats-2',
    question: 'What is the median of 2, 4, 6, 10?',
    answers: ['4', '5', '6', '10'],
    correct: 1,
    explanation:
      'With an even number of values, the median is the average of the two middle values: (4 + 6) / 2 = 5.',
  },
  {
    lessonId: 'stats-2',
    question: 'What is the mode of 2, 3, 3, 5, 7, 3, 9?',
    answers: ['7', '5', '2', '3'],
    correct: 3,
    explanation: 'The value 3 appears three times, more than any other value.',
  },
  {
    lessonId: 'stats-2',
    question: 'Which measure of center is least affected by outliers?',
    answers: ['Mean', 'Sum', 'Range', 'Median'],
    correct: 3,
    explanation:
      'The median depends only on the middle of the sorted data, so extreme values barely change it.',
  },
  {
    lessonId: 'stats-2',
    question: 'In right-skewed data, how do the mean and median usually compare?',
    answers: [
      'The mean is greater than the median',
      'The mean is less than the median',
      'They are always equal',
      'The mode is greater than the mean',
    ],
    correct: 0,
    explanation:
      'The long right tail pulls the mean upward, so it is usually greater than the median.',
  },
  {
    lessonId: 'stats-2',
    question:
      'For the data 4, 6, 6, 8, 50, which value better represents a typical value?',
    answers: [
      'The mean (14.8)',
      'The median (6)',
      'The sum (74)',
      'The range (46)',
    ],
    correct: 1,
    explanation:
      'The outlier 50 pulls the mean up to 14.8, while the median stays at 6, which is closer to most values.',
  },
  {
    lessonId: 'stats-2',
    question: 'A dataset with two values tied for most frequent is called:',
    answers: ['Unimodal', 'Bimodal', 'Skewed', 'Symmetric'],
    correct: 1,
    explanation: 'Two modes means the data is bimodal.',
  },
  {
    lessonId: 'stats-2',
    question: 'Which statement about the mode is true?',
    answers: [
      'It only works for numerical data',
      'It requires data without outliers',
      'It can describe categorical data, such as favorite color',
      'It is always equal to the mean',
    ],
    correct: 2,
    explanation:
      'The mode is the most frequent value, so it is the only measure of center that works for categories.',
  },
  {
    lessonId: 'stats-2',
    question: 'A dataset has 5 values and a mean of 10. What is the sum of the values?',
    answers: ['15', '5', '50', '2'],
    correct: 2,
    explanation: 'Mean = sum / n, so sum = mean x n = 10 x 5 = 50.',
  },

  // ---------- Lesson 3: Measures of spread ----------
  {
    lessonId: 'stats-3',
    question: 'What is the range of 3, 8, 12, 20?',
    answers: ['12', '17', '20', '23'],
    correct: 1,
    explanation: 'Range = maximum - minimum = 20 - 3 = 17.',
  },
  {
    lessonId: 'stats-3',
    question: 'What does the standard deviation measure?',
    answers: [
      'The center of the data',
      'The most common value',
      'How spread out the values are around the mean',
      'The total of all values',
    ],
    correct: 2,
    explanation:
      'The standard deviation measures the typical distance of values from the mean.',
  },
  {
    lessonId: 'stats-3',
    question:
      'A population has a sum of squared deviations of 32 and n = 8. What is the population variance?',
    answers: ['2', '4', '32', '5'],
    correct: 1,
    explanation: 'Population variance = 32 / 8 = 4.',
  },
  {
    lessonId: 'stats-3',
    question: 'A population variance is 4. What is the standard deviation?',
    answers: ['2', '4', '16', '8'],
    correct: 0,
    explanation: 'The standard deviation is the square root of the variance: sqrt(4) = 2.',
  },
  {
    lessonId: 'stats-3',
    question: 'The sample variance divides the sum of squared deviations by:',
    answers: ['n', 'n + 1', '2n', 'n - 1'],
    correct: 3,
    explanation:
      'Dividing by n - 1 corrects the bias and makes the sample variance a better estimate of the population variance.',
  },
  {
    lessonId: 'stats-3',
    question:
      'A sample has n = 6 and a sum of squared deviations of 40. What is the sample variance?',
    answers: ['6.67', '7.50', '8.00', '40.00'],
    correct: 2,
    explanation: 'Sample variance = 40 / (6 - 1) = 40 / 5 = 8.',
  },
  {
    lessonId: 'stats-3',
    question: 'If every value in a dataset is the same, the standard deviation is:',
    answers: ['1', '0', 'Equal to the mean', 'Undefined'],
    correct: 1,
    explanation: 'There is no spread at all, so every deviation and the standard deviation are 0.',
  },
  {
    lessonId: 'stats-3',
    question: 'How is the interquartile range (IQR) calculated?',
    answers: ['Q3 - Q1', 'Maximum - minimum', 'Median - Q1', 'Mean - median'],
    correct: 0,
    explanation: 'IQR = Q3 - Q1, the spread of the middle 50% of the data.',
  },
  {
    lessonId: 'stats-3',
    question: 'Why is the IQR often preferred over the range when outliers are present?',
    answers: [
      'It uses every value in the dataset',
      'It is always larger than the range',
      'It is the same as the variance',
      'It only uses the middle 50% of the data, so outliers do not affect it',
    ],
    correct: 3,
    explanation:
      'The IQR ignores the extreme values, so it is resistant to outliers. The range depends entirely on the two extremes.',
  },
  {
    lessonId: 'stats-3',
    question:
      'Two classes both have a mean score of 70. Class A has an SD of 5 and Class B has an SD of 15. Which class has more spread?',
    answers: ['Class A', 'Class B', 'They are the same', 'It cannot be determined'],
    correct: 1,
    explanation: 'A larger standard deviation means the scores are more spread out, so Class B.',
  },

  // ---------- Lesson 4: Visualizing data ----------
  {
    lessonId: 'stats-4',
    question: 'Which chart is best for showing the distribution of one numerical variable?',
    answers: ['Pie chart', 'Histogram', 'Venn diagram', 'Table of names'],
    correct: 1,
    explanation: 'A histogram groups numerical values into bins to show how they are distributed.',
  },
  {
    lessonId: 'stats-4',
    question: 'What does a scatter plot show?',
    answers: [
      'The share of each category in a whole',
      'The five-number summary of one variable',
      'The relationship between two numerical variables',
      'The frequency of one categorical variable',
    ],
    correct: 2,
    explanation: 'Each point is one observation plotted by its x and y values, so patterns between two variables are visible.',
  },
  {
    lessonId: 'stats-4',
    question: 'A bar chart is most appropriate for:',
    answers: [
      'Comparing categories',
      'Showing a correlation',
      'Showing quartiles',
      'Finding outliers in a numerical variable',
    ],
    correct: 0,
    explanation: 'Bar charts compare the size of separate categories.',
  },
  {
    lessonId: 'stats-4',
    question: 'Which values make up the five-number summary?',
    answers: [
      'Mean, median, mode, range, SD',
      'Minimum, Q1, median, Q3, maximum',
      'Q1, Q2, Q3, Q4, Q5',
      'Minimum, mean, mode, variance, maximum',
    ],
    correct: 1,
    explanation: 'The five-number summary is the minimum, Q1, median, Q3, and maximum.',
  },
  {
    lessonId: 'stats-4',
    question: 'In a box plot, the line inside the box represents the:',
    answers: ['Mean', 'Mode', 'Third quartile', 'Median'],
    correct: 3,
    explanation: 'The line inside the box marks the median.',
  },
  {
    lessonId: 'stats-4',
    question: 'The box in a box plot spans from:',
    answers: [
      'The minimum to the maximum',
      'The mean minus one SD to the mean plus one SD',
      'Q1 to Q3',
      'The median to the maximum',
    ],
    correct: 2,
    explanation: 'The box covers the middle 50% of the data, from Q1 to Q3.',
  },
  {
    lessonId: 'stats-4',
    question: 'Under the 1.5 x IQR rule, a value is a potential outlier if it is:',
    answers: [
      'Beyond Q1 - 1.5 x IQR or Q3 + 1.5 x IQR',
      'More than 1.5 units from the mean',
      'Greater than 1.5 times the median',
      'Outside the range of the box',
    ],
    correct: 0,
    explanation: 'Values outside the fences Q1 - 1.5 x IQR and Q3 + 1.5 x IQR are flagged as potential outliers.',
  },
  {
    lessonId: 'stats-4',
    question: 'If Q1 = 20 and Q3 = 30, what is the upper fence for outliers?',
    answers: ['40', '45', '50', '60'],
    correct: 1,
    explanation: 'IQR = 10, so the upper fence is 30 + 1.5 x 10 = 45.',
  },
  {
    lessonId: 'stats-4',
    question: 'A histogram with a long tail stretching to the right is:',
    answers: ['Symmetric', 'Uniform', 'Left-skewed', 'Right-skewed'],
    correct: 3,
    explanation: 'The direction of the long tail names the skew, so a tail to the right means right-skewed.',
  },
  {
    lessonId: 'stats-4',
    question: 'Why do the bars of a histogram touch each other?',
    answers: [
      'The bins are consecutive intervals of a continuous scale',
      'The bars always have equal heights',
      'It is only a decorative choice',
      'The categories have no order',
    ],
    correct: 0,
    explanation: 'Each bar covers an interval, and the intervals are adjacent, so there are no gaps.',
  },

  // ---------- Lesson 5: Probability basics ----------
  {
    lessonId: 'stats-5',
    question: 'What is the probability of rolling a 4 on a fair six-sided die?',
    answers: ['1/4', '1/3', '1/6', '4/6'],
    correct: 2,
    explanation: 'One favorable outcome out of six equally likely outcomes gives 1/6.',
  },
  {
    lessonId: 'stats-5',
    question: 'A probability must always be between:',
    answers: ['0 and 1', '-1 and 1', '0 and 100', '1 and 10'],
    correct: 0,
    explanation: '0 means impossible and 1 means certain, so every probability lies between them.',
  },
  {
    lessonId: 'stats-5',
    question: 'If P(rain) = 0.3, what is P(no rain)?',
    answers: ['0.3', '0.7', '0.03', '1.3'],
    correct: 1,
    explanation: 'By the complement rule, P(not A) = 1 - P(A) = 1 - 0.3 = 0.7.',
  },
  {
    lessonId: 'stats-5',
    question: 'What is the probability of drawing a red card from a standard 52-card deck?',
    answers: ['1/4', '1/13', '1/52', '1/2'],
    correct: 3,
    explanation: 'There are 26 red cards out of 52, so the probability is 26/52 = 1/2.',
  },
  {
    lessonId: 'stats-5',
    question: 'What is the probability of getting two heads in two fair coin flips?',
    answers: ['1/2', '1/3', '1/4', '1/8'],
    correct: 2,
    explanation: 'The flips are independent, so multiply: 1/2 x 1/2 = 1/4.',
  },
  {
    lessonId: 'stats-5',
    question: 'What is the probability of rolling a 2 or a 5 on a fair die?',
    answers: ['1/6', '1/3', '1/2', '2/3'],
    correct: 1,
    explanation: 'The events are mutually exclusive, so add: 1/6 + 1/6 = 2/6 = 1/3.',
  },
  {
    lessonId: 'stats-5',
    question: 'P(A) = 0.5, P(B) = 0.4, and P(A and B) = 0.2. What is P(A or B)?',
    answers: ['0.9', '0.1', '0.7', '0.2'],
    correct: 2,
    explanation: 'P(A or B) = P(A) + P(B) - P(A and B) = 0.5 + 0.4 - 0.2 = 0.7.',
  },
  {
    lessonId: 'stats-5',
    question: 'P(A and B) = 0.2 and P(B) = 0.5. What is P(A | B)?',
    answers: ['0.4', '0.1', '0.7', '2.5'],
    correct: 0,
    explanation: 'P(A | B) = P(A and B) / P(B) = 0.2 / 0.5 = 0.4.',
  },
  {
    lessonId: 'stats-5',
    question: 'Two events are independent if:',
    answers: [
      'They can never happen together',
      'Their probabilities add to 1',
      'They have the same probability',
      'One happening does not change the probability of the other',
    ],
    correct: 3,
    explanation:
      'Independence means knowing one event happened tells you nothing new about the other.',
  },
  {
    lessonId: 'stats-5',
    question: 'Which statement describes mutually exclusive events?',
    answers: [
      'They cannot both happen at the same time',
      'They always happen together',
      'One causes the other',
      'They have equal probabilities',
    ],
    correct: 0,
    explanation: 'Mutually exclusive events cannot occur together, so P(A and B) = 0.',
  },

  // ---------- Lesson 6: Probability distributions ----------
  {
    lessonId: 'stats-6',
    question: 'What is a random variable?',
    answers: [
      'A variable chosen without any rules',
      'A variable whose value is the numerical outcome of a random process',
      'A variable that is always continuous',
      'A variable that has no mean',
    ],
    correct: 1,
    explanation: 'A random variable assigns a number to each outcome of a random process.',
  },
  {
    lessonId: 'stats-6',
    question: 'Which is a discrete random variable?',
    answers: [
      'The time it takes to run a race',
      'The height of a randomly chosen person',
      'The number of heads in 10 coin flips',
      'The exact temperature at noon',
    ],
    correct: 2,
    explanation: 'The number of heads is a count that takes the separate values 0 to 10.',
  },
  {
    lessonId: 'stats-6',
    question: 'Which is a continuous random variable?',
    answers: [
      'The waiting time at a bus stop',
      'The number of students absent today',
      'The number of defective items in a batch',
      'The number shown on a die',
    ],
    correct: 0,
    explanation: 'Waiting time can take any value in a range, so it is continuous.',
  },
  {
    lessonId: 'stats-6',
    question: 'The probabilities in a discrete probability distribution add up to:',
    answers: ['0', '0.5', '100', '1'],
    correct: 3,
    explanation: 'Some outcome must occur, so all the probabilities together equal 1.',
  },
  {
    lessonId: 'stats-6',
    question: 'What is the expected value of one roll of a fair six-sided die?',
    answers: ['3', '3.5', '4', '6'],
    correct: 1,
    explanation: '(1 + 2 + 3 + 4 + 5 + 6) / 6 = 21 / 6 = 3.5.',
  },
  {
    lessonId: 'stats-6',
    question: 'Which condition is NOT required for a binomial distribution?',
    answers: [
      'A fixed number of trials',
      'The same probability of success on each trial',
      'Each trial has exactly two outcomes',
      'The trial outcomes must be normally distributed',
    ],
    correct: 3,
    explanation:
      'A binomial setting needs a fixed number of independent trials, two outcomes, and a constant p. Normality is not required.',
  },
  {
    lessonId: 'stats-6',
    question: 'A binomial variable has n = 20 and p = 0.25. What is its mean?',
    answers: ['0.25', '5', '10', '20'],
    correct: 1,
    explanation: 'The mean of a binomial is n x p = 20 x 0.25 = 5.',
  },
  {
    lessonId: 'stats-6',
    question: 'What is the probability of exactly 2 heads in 3 fair coin flips?',
    answers: ['0.125', '0.25', '0.375', '0.5'],
    correct: 2,
    explanation: 'C(3, 2) x 0.5^2 x 0.5^1 = 3 x 0.125 = 0.375.',
  },
  {
    lessonId: 'stats-6',
    question:
      'A game pays $10 with probability 0.1 and $0 otherwise. What is the expected payout?',
    answers: ['$0.10', '$1.00', '$9.00', '$10.00'],
    correct: 1,
    explanation: 'E(X) = 10 x 0.1 + 0 x 0.9 = $1.00.',
  },
  {
    lessonId: 'stats-6',
    question: 'For a continuous random variable, the probability of one exact value is:',
    answers: ['0', '0.5', '1', 'Equal to the mean'],
    correct: 0,
    explanation:
      'Probability is the area under the curve over an interval, and a single point has no width, so its area is 0.',
  },

  // ---------- Lesson 7: The normal distribution ----------
  {
    lessonId: 'stats-7',
    question: 'What is the shape of the normal distribution?',
    answers: [
      'A flat rectangle',
      'A right-skewed curve',
      'A symmetric bell shape centered at the mean',
      'A straight line',
    ],
    correct: 2,
    explanation: 'The normal distribution is symmetric and bell-shaped, centered at the mean.',
  },
  {
    lessonId: 'stats-7',
    question: 'In a normal distribution, how do the mean, median, and mode compare?',
    answers: [
      'The mean is the largest',
      'The mode is the largest',
      'The median is the smallest',
      'They are all equal',
    ],
    correct: 3,
    explanation: 'Because the curve is symmetric with one peak, all three are at the center.',
  },
  {
    lessonId: 'stats-7',
    question: 'According to the empirical rule, about what percent of values lie within 1 SD of the mean?',
    answers: ['50%', '68%', '95%', '99.7%'],
    correct: 1,
    explanation: 'The 68-95-99.7 rule gives about 68% within 1 SD.',
  },
  {
    lessonId: 'stats-7',
    question: 'About what percent of values lie within 2 SD of the mean in a normal distribution?',
    answers: ['95%', '68%', '99.7%', '75%'],
    correct: 0,
    explanation: 'About 95% of values fall within 2 standard deviations.',
  },
  {
    lessonId: 'stats-7',
    question: 'Which formula gives the z-score of a value x?',
    answers: [
      'z = (x + mean) / SD',
      'z = (mean - x) x SD',
      'z = (x - mean) / SD',
      'z = x / (mean x SD)',
    ],
    correct: 2,
    explanation: 'The z-score is the distance from the mean, measured in standard deviations: (x - mean) / SD.',
  },
  {
    lessonId: 'stats-7',
    question: 'A score is 85, the mean is 70, and the SD is 10. What is the z-score?',
    answers: ['0.67', '1.0', '1.5', '15'],
    correct: 2,
    explanation: 'z = (85 - 70) / 10 = 1.5.',
  },
  {
    lessonId: 'stats-7',
    question: 'A z-score of -2 means the value is:',
    answers: [
      '2 standard deviations above the mean',
      '2 standard deviations below the mean',
      'Equal to the mean',
      '2 units below the mean',
    ],
    correct: 1,
    explanation: 'A negative z-score is below the mean, and the number is measured in standard deviations.',
  },
  {
    lessonId: 'stats-7',
    question:
      'Scores are normal with mean 100 and SD 15. About what percent of scores are between 70 and 130?',
    answers: ['68%', '99.7%', '50%', '95%'],
    correct: 3,
    explanation: '70 and 130 are 2 SD below and above the mean, so about 95% of scores are in between.',
  },
  {
    lessonId: 'stats-7',
    question:
      'Exam A gives a z-score of 1.8 and Exam B gives a z-score of 0.9. Which is the stronger relative result?',
    answers: ['Exam A', 'Exam B', 'They are equal', 'It cannot be compared'],
    correct: 0,
    explanation: 'A higher z-score means the value is further above its mean, even when the exams use different scales.',
  },
  {
    lessonId: 'stats-7',
    question: 'What are the mean and SD of the standard normal distribution?',
    answers: ['Mean 1, SD 0', 'Mean 0, SD 1', 'Mean 0, SD 0', 'Mean 1, SD 1'],
    correct: 1,
    explanation: 'The standard normal distribution has a mean of 0 and a standard deviation of 1.',
  },

  // ---------- Lesson 8: Sampling and the CLT ----------
  {
    lessonId: 'stats-8',
    question: 'What defines a simple random sample?',
    answers: [
      'Every member of the population has an equal chance of being chosen',
      'Only volunteers are included',
      'Members are chosen from the easiest group to reach',
      'The sample includes the same number from each age group',
    ],
    correct: 0,
    explanation: 'Equal chances for every member help the sample represent the population.',
  },
  {
    lessonId: 'stats-8',
    question: 'In stratified sampling, you:',
    answers: [
      'Pick every 10th member of a list',
      'Split the population into groups and sample from each group',
      'Ask only people who volunteer',
      'Use the first people you meet',
    ],
    correct: 1,
    explanation: 'Stratified sampling divides the population into strata and takes a sample from each.',
  },
  {
    lessonId: 'stats-8',
    question: 'An online poll includes only people who choose to respond. This is likely to cause:',
    answers: [
      'Stratification',
      'A larger standard error',
      'Voluntary response bias',
      'A normal distribution',
    ],
    correct: 2,
    explanation: 'People who choose to respond often differ from those who do not, which biases the sample.',
  },
  {
    lessonId: 'stats-8',
    question: 'What is a sampling distribution?',
    answers: [
      'The list of people in a sample',
      'The shape of the population',
      'The range of a single sample',
      'The distribution of a statistic across many samples of the same size',
    ],
    correct: 3,
    explanation: 'For example, the distribution of sample means from many samples of size n.',
  },
  {
    lessonId: 'stats-8',
    question: 'What does the Central Limit Theorem say?',
    answers: [
      'All populations are normally distributed',
      'For large samples, the distribution of sample means is approximately normal',
      'The sample mean always equals the population mean',
      'Larger samples have larger variance',
    ],
    correct: 1,
    explanation: 'The CLT holds regardless of the population shape, as long as the sample size is large enough.',
  },
  {
    lessonId: 'stats-8',
    question: 'A common rule of thumb for applying the CLT is a sample size of at least:',
    answers: ['5', '10', '30', '1000'],
    correct: 2,
    explanation: 'A sample size of 30 or more is the usual rule of thumb.',
  },
  {
    lessonId: 'stats-8',
    question: 'A population has SD = 15 and the sample size is n = 25. What is the standard error?',
    answers: ['0.6', '3', '5', '15'],
    correct: 1,
    explanation: 'SE = SD / sqrt(n) = 15 / 5 = 3.',
  },
  {
    lessonId: 'stats-8',
    question: 'When the sample size increases, the standard error:',
    answers: ['Decreases', 'Increases', 'Stays the same', 'Becomes negative'],
    correct: 0,
    explanation: 'SE = SD / sqrt(n), so a larger n gives a smaller standard error.',
  },
  {
    lessonId: 'stats-8',
    question: 'A sample mean is 50 and the SE is 2. What is the approximate 95% confidence interval?',
    answers: ['48 to 52', '44 to 56', '49 to 51', '46.08 to 53.92'],
    correct: 3,
    explanation: '50 +/- 1.96 x 2 = 50 +/- 3.92, which gives 46.08 to 53.92.',
  },
  {
    lessonId: 'stats-8',
    question: 'What does a 95% confidence interval mean?',
    answers: [
      'There is a 95% chance the sample mean is correct',
      'About 95% of the data values lie inside the interval',
      'If sampling were repeated many times, about 95% of such intervals would contain the true value',
      'The true value changes 5% of the time',
    ],
    correct: 2,
    explanation:
      'The 95% describes the method: across many repeated samples, about 95% of the intervals capture the true parameter.',
  },

  // ---------- Lesson 9: Hypothesis testing ----------
  {
    lessonId: 'stats-9',
    question: 'What does the null hypothesis (H0) usually state?',
    answers: [
      'There is no effect or no difference',
      'The researcher is certainly right',
      'The sample is biased',
      'There is a large effect',
    ],
    correct: 0,
    explanation: 'H0 is the default claim of no effect or no difference.',
  },
  {
    lessonId: 'stats-9',
    question: 'The alternative hypothesis (Ha) is:',
    answers: [
      'The claim assumed true at the start of the test',
      'The claim the researcher looks for evidence of',
      'Always the same as H0',
      'The same as the p-value',
    ],
    correct: 1,
    explanation: 'Ha is what the data is tested for evidence of, such as a difference or an effect.',
  },
  {
    lessonId: 'stats-9',
    question: 'A significance level of alpha = 0.05 means you accept a 5% chance of:',
    answers: [
      'Failing to reject a false H0',
      'Having a biased sample',
      'Rejecting H0 when it is actually true',
      'Getting a p-value of exactly 0.05',
    ],
    correct: 2,
    explanation: 'Alpha is the probability of a Type I error, rejecting a true null hypothesis.',
  },
  {
    lessonId: 'stats-9',
    question: 'What is a p-value?',
    answers: [
      'The probability that H0 is true',
      'The probability that Ha is true',
      'The size of the effect',
      'The probability of results at least as extreme as observed, assuming H0 is true',
    ],
    correct: 3,
    explanation: 'The p-value is calculated assuming H0 is true. It is not the probability that H0 is true.',
  },
  {
    lessonId: 'stats-9',
    question: 'p = 0.03 and alpha = 0.05. What is the decision?',
    answers: ['Fail to reject H0', 'Reject H0', 'Accept H0', 'Collect no more data'],
    correct: 1,
    explanation: 'Since p is less than alpha, there is enough evidence to reject H0.',
  },
  {
    lessonId: 'stats-9',
    question: 'p = 0.20 and alpha = 0.05. What is the decision?',
    answers: ['Reject H0', 'Accept Ha', 'Fail to reject H0', 'Reject Ha with certainty'],
    correct: 2,
    explanation: 'Since p is greater than alpha, there is not enough evidence against H0.',
  },
  {
    lessonId: 'stats-9',
    question: 'A Type I error is:',
    answers: [
      'Rejecting H0 when H0 is true',
      'Failing to reject H0 when H0 is false',
      'Using too small a sample',
      'Calculating the p-value wrongly',
    ],
    correct: 0,
    explanation: 'A Type I error is a false positive: rejecting a true null hypothesis.',
  },
  {
    lessonId: 'stats-9',
    question: 'A Type II error is:',
    answers: [
      'Rejecting a true H0',
      'Accepting a biased sample',
      'Choosing alpha too large',
      'Failing to reject H0 when H0 is false',
    ],
    correct: 3,
    explanation: 'A Type II error is a false negative: missing a real effect.',
  },
  {
    lessonId: 'stats-9',
    question: 'Why do we say "fail to reject H0" instead of "accept H0"?',
    answers: [
      'Because H0 is always false',
      'Because a lack of evidence against H0 does not prove it is true',
      'Because p-values cannot be calculated for H0',
      'Because alpha must be 0.05',
    ],
    correct: 1,
    explanation: 'The data may simply be too limited to detect an effect, so we cannot conclude H0 is true.',
  },
  {
    lessonId: 'stats-9',
    question: 'A very small p-value suggests that:',
    answers: [
      'H0 is certainly true',
      'The sample is too small',
      'The test was done incorrectly',
      'The observed data would be unlikely if H0 were true',
    ],
    correct: 3,
    explanation: 'A small p-value means the data is hard to explain under H0, which is evidence against it.',
  },

  // ---------- Lesson 10: Correlation and regression ----------
  {
    lessonId: 'stats-10',
    question: 'The correlation coefficient r can range from:',
    answers: ['-1 to 1', '0 to 1', '0 to 100', '-100 to 100'],
    correct: 0,
    explanation: 'r is always between -1 (perfect negative) and +1 (perfect positive).',
  },
  {
    lessonId: 'stats-10',
    question: 'What does r = -0.9 indicate?',
    answers: [
      'A weak positive relationship',
      'No relationship',
      'A strong negative linear relationship',
      'A perfect positive relationship',
    ],
    correct: 2,
    explanation: 'The sign shows direction (negative) and the size shows strength (close to 1 is strong).',
  },
  {
    lessonId: 'stats-10',
    question: 'An r value close to 0 suggests:',
    answers: [
      'A strong linear relationship',
      'Little or no linear relationship',
      'A perfect curve',
      'An error in the data',
    ],
    correct: 1,
    explanation: 'r measures linear association, so a value near 0 means no clear linear pattern.',
  },
  {
    lessonId: 'stats-10',
    question: 'Which statement is correct?',
    answers: [
      'A strong correlation proves causation',
      'Correlation is the same as causation',
      'Correlation does not imply causation',
      'Causation always produces r = 1',
    ],
    correct: 2,
    explanation: 'A confounding variable or coincidence can produce a correlation without any cause and effect.',
  },
  {
    lessonId: 'stats-10',
    question: 'The regression line is y-hat = 20 + 5x. What is the predicted y when x = 4?',
    answers: ['24', '29', '40', '100'],
    correct: 2,
    explanation: 'y-hat = 20 + 5 x 4 = 40.',
  },
  {
    lessonId: 'stats-10',
    question: 'In y-hat = 20 + 5x, what does the slope of 5 mean?',
    answers: [
      'When x is 0, y is 5',
      'Each 1-unit increase in x predicts a 5-unit increase in y',
      'The correlation is 5',
      'y is always 5 times x',
    ],
    correct: 1,
    explanation: 'The slope is the predicted change in y for each 1-unit increase in x.',
  },
  {
    lessonId: 'stats-10',
    question: 'What does the intercept of a regression line represent?',
    answers: [
      'The predicted y when x = 0',
      'The strength of the relationship',
      'The average of x',
      'The size of the residuals',
    ],
    correct: 0,
    explanation: 'The intercept is the value of the line where x is 0.',
  },
  {
    lessonId: 'stats-10',
    question: 'The actual value is 52 and the predicted value is 48. What is the residual?',
    answers: ['-4', '4', '50', '100'],
    correct: 1,
    explanation: 'Residual = actual - predicted = 52 - 48 = 4.',
  },
  {
    lessonId: 'stats-10',
    question: 'What does an R-squared of 0.64 mean?',
    answers: [
      'The slope is 0.64',
      'The correlation is 0.64',
      '64% of the data points lie on the line',
      '64% of the variation in y is explained by the model',
    ],
    correct: 3,
    explanation: 'R-squared is the proportion of variation in y explained by the regression on x.',
  },
  {
    lessonId: 'stats-10',
    question: 'Why is extrapolation risky?',
    answers: [
      'It uses too much data',
      'The pattern may not continue outside the range of the data',
      'It always gives a negative slope',
      'It changes the correlation to 1',
    ],
    correct: 1,
    explanation: 'Predicting far beyond the observed x values assumes the same pattern holds, which may be false.',
  },
];