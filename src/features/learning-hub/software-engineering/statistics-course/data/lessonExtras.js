
/*
 * Statistics lesson extras
 * Lesson IDs must match data/lessons.js.
 *
 * If your LessonActivities component uses different activity
 * field names, keep its existing schema and adapt these objects.
 */

export const LESSON_EXTRAS = {
  'stats-1': {
    activities: [
      {
        type: 'quickCheck',
        title: 'Population or sample?',
        question:
          'A researcher surveys 100 students from a university of 2,000 students. What is the sample?',
        options: [
          'All 2,000 students',
          'The 100 surveyed students',
          'The researcher',
          'All universities',
        ],
        answer: 1,
        explanation:
          'The sample is the group actually surveyed: the 100 students.',
      },
      {
        type: 'quickCheck',
        title: 'Identify the variable',
        question:
          'The number of absences recorded for each student is what type of variable?',
        options: [
          'Nominal',
          'Ordinal',
          'Discrete numerical',
          'Continuous numerical',
        ],
        answer: 2,
        explanation:
          'Absences are counted in separate whole numbers, making the variable discrete numerical.',
      },
    ],
    video: {
      title: 'Introduction to Statistics',
      channel: 'Khan Academy',
      url: 'https://www.khanacademy.org/math/statistics-probability',
    },
    references: [
      {
        title: 'Statistics and probability',
        author: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/statistics-probability',
      },
      {
        title: 'Introductory Statistics',
        author: 'OpenStax',
        url: 'https://openstax.org/details/books/introductory-statistics',
      },
    ],
  },

  'stats-2': {
    activities: [
      {
        type: 'quickCheck',
        title: 'Calculate the mean',
        question: 'What is the mean of 3, 5, 7, 9, and 11?',
        options: ['5', '6', '7', '9'],
        answer: 2,
        explanation: '(3 + 5 + 7 + 9 + 11) / 5 = 7.',
      },
      {
        type: 'quickCheck',
        title: 'Find the median',
        question: 'What is the median of 2, 4, 8, and 10?',
        options: ['4', '5', '6', '8'],
        answer: 2,
        explanation: 'The two middle values are 4 and 8. Their average is 6.',
      },
    ],
    video: {
      title: 'Measures of Center',
      channel: 'Khan Academy',
      url: 'https://www.khanacademy.org/math/statistics-probability',
    },
    references: [
      {
        title: 'Introductory Statistics',
        author: 'OpenStax',
        url: 'https://openstax.org/details/books/introductory-statistics',
      },
      {
        title: 'Statistics and probability',
        author: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/statistics-probability',
      },
    ],
  },

  'stats-3': {
    activities: [
      {
        type: 'quickCheck',
        title: 'Calculate the range',
        question: 'What is the range of 4, 6, 9, 12, and 15?',
        options: ['9', '11', '12', '15'],
        answer: 1,
        explanation: 'Range = maximum − minimum = 15 − 4 = 11.',
      },
      {
        type: 'quickCheck',
        title: 'Understand standard deviation',
        question:
          'What does a larger standard deviation usually indicate?',
        options: [
          'The values are more spread out',
          'All values are equal',
          'The mean must be zero',
          'There are no outliers',
        ],
        answer: 0,
        explanation:
          'A larger standard deviation indicates greater spread around the mean.',
      },
    ],
    video: {
      title: 'Measures of Variability',
      channel: 'Khan Academy',
      url: 'https://www.khanacademy.org/math/statistics-probability',
    },
    references: [
      {
        title: 'Introductory Statistics',
        author: 'OpenStax',
        url: 'https://openstax.org/details/books/introductory-statistics',
      },
      {
        title: 'Statistics and probability',
        author: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/statistics-probability',
      },
    ],
  },

  'stats-4': {
    activities: [
      {
        type: 'quickCheck',
        title: 'Choose the right chart',
        question:
          'Which graph is best for displaying the distribution of students’ exam scores?',
        options: [
          'Histogram',
          'Organizational chart',
          'Flowchart',
          'Network diagram',
        ],
        answer: 0,
        explanation:
          'A histogram groups numerical values into intervals to show their distribution.',
      },
      {
        type: 'quickCheck',
        title: 'Read a box plot',
        question:
          'The interquartile range represents which portion of the data?',
        options: [
          'The lowest 10%',
          'The middle 50%',
          'The highest 25%',
          'All values outside the range',
        ],
        answer: 1,
        explanation: 'IQR = Q3 − Q1 and describes the middle 50% of the data.',
      },
    ],
    video: {
      title: 'Displaying and Comparing Quantitative Data',
      channel: 'Khan Academy',
      url: 'https://www.khanacademy.org/math/statistics-probability',
    },
    references: [
      {
        title: 'Introductory Statistics',
        author: 'OpenStax',
        url: 'https://openstax.org/details/books/introductory-statistics',
      },
      {
        title: 'Statistics and probability',
        author: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/statistics-probability',
      },
    ],
  },

  'stats-5': {
    activities: [
      {
        type: 'quickCheck',
        title: 'Probability of an event',
        question: 'What is the probability of rolling a 4 on a fair six-sided die?',
        options: ['1/2', '1/3', '1/6', '1'],
        answer: 2,
        explanation:
          'There is one favorable outcome among six equally likely outcomes.',
      },
      {
        type: 'quickCheck',
        title: 'Use the complement rule',
        question: 'If P(A) = 0.35, what is P(not A)?',
        options: ['0.35', '0.50', '0.65', '1.35'],
        answer: 2,
        explanation: 'P(not A) = 1 − P(A) = 1 − 0.35 = 0.65.',
      },
    ],
    video: {
      title: 'Basic Probability',
      channel: 'Khan Academy',
      url: 'https://www.khanacademy.org/math/statistics-probability/probability-library',
    },
    references: [
      {
        title: 'Introductory Statistics',
        author: 'OpenStax',
        url: 'https://openstax.org/details/books/introductory-statistics',
      },
      {
        title: 'Probability',
        author: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/statistics-probability/probability-library',
      },
    ],
  },

  'stats-6': {
    activities: [
      {
        type: 'quickCheck',
        title: 'Expected value',
        question: 'What is the expected value of a fair six-sided die?',
        options: ['3', '3.5', '4', '6'],
        answer: 1,
        explanation:
          'E(X) = (1 + 2 + 3 + 4 + 5 + 6) / 6 = 3.5.',
      },
      {
        type: 'quickCheck',
        title: 'Recognize a binomial setting',
        question:
          'Which situation can be modeled using a binomial distribution?',
        options: [
          'Measuring the height of one person',
          'Counting heads in 10 independent coin flips',
          'Recording the time of every bus arrival',
          'Measuring daily temperature',
        ],
        answer: 1,
        explanation:
          'Coin flips have two outcomes, and the number of trials is fixed.',
      },
    ],
    video: {
      title: 'Random Variables and Probability Distributions',
      channel: 'Khan Academy',
      url: 'https://www.khanacademy.org/math/statistics-probability/random-variables-stats-library',
    },
    references: [
      {
        title: 'Introductory Statistics',
        author: 'OpenStax',
        url: 'https://openstax.org/details/books/introductory-statistics',
      },
      {
        title: 'Statistics and probability',
        author: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/statistics-probability',
      },
    ],
  },

  'stats-7': {
    activities: [
      {
        type: 'quickCheck',
        title: 'Apply the empirical rule',
        question:
          'Approximately what percentage of normally distributed data lies within one standard deviation of the mean?',
        options: ['50%', '68%', '95%', '99.7%'],
        answer: 1,
        explanation:
          'The empirical rule estimates that about 68% lies within one standard deviation.',
      },
      {
        type: 'quickCheck',
        title: 'Calculate a z-score',
        question:
          'A score is 80, the mean is 70, and the standard deviation is 5. What is the z-score?',
        options: ['1', '2', '5', '10'],
        answer: 1,
        explanation: 'z = (80 − 70) / 5 = 2.',
      },
    ],
    video: {
      title: 'The Normal Distribution and the Empirical Rule',
      channel: 'Khan Academy',
      url: 'https://www.khanacademy.org/math/statistics-probability/modeling-distributions-of-data',
    },
    references: [
      {
        title: 'Introductory Statistics',
        author: 'OpenStax',
        url: 'https://openstax.org/details/books/introductory-statistics',
      },
      {
        title: 'Statistics and probability',
        author: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/statistics-probability',
      },
    ],
  },

  'stats-8': {
    activities: [
      {
        type: 'quickCheck',
        title: 'Identify sampling bias',
        question:
          'A school surveys only students in its honors program about school satisfaction. What is the main concern?',
        options: [
          'The sample may not represent all students',
          'The population is always too small',
          'The data must be continuous',
          'The survey has no variables',
        ],
        answer: 0,
        explanation:
          'Students in one program may have different experiences from the rest of the school.',
      },
      {
        type: 'quickCheck',
        title: 'Calculate standard error',
        question:
          'If the population standard deviation is 12 and the sample size is 36, what is the standard error of the mean?',
        options: ['2', '3', '6', '12'],
        answer: 0,
        explanation: 'SE = SD / √n = 12 / √36 = 12 / 6 = 2.',
      },
    ],
    video: {
      title: 'Sampling Distributions and the Central Limit Theorem',
      channel: 'Khan Academy',
      url: 'https://www.khanacademy.org/math/statistics-probability',
    },
    references: [
      {
        title: 'Introductory Statistics',
        author: 'OpenStax',
        url: 'https://openstax.org/details/books/introductory-statistics',
      },
      {
        title: 'Statistics and probability',
        author: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/statistics-probability',
      },
    ],
  },

  'stats-9': {
    activities: [
      {
        type: 'quickCheck',
        title: 'Interpret a p-value',
        question:
          'A test gives p = 0.02 with a significance level of 0.05. What is the decision?',
        options: [
          'Reject the null hypothesis',
          'Accept the null hypothesis as certainly true',
          'Increase the p-value to 0.05',
          'The test cannot have a conclusion',
        ],
        answer: 0,
        explanation:
          'Because 0.02 is less than 0.05, reject the null hypothesis.',
      },
      {
        type: 'quickCheck',
        title: 'Identify a Type I error',
        question:
          'What is a Type I error in hypothesis testing?',
        options: [
          'Failing to reject a false null hypothesis',
          'Rejecting a true null hypothesis',
          'Using a sample instead of a population',
          'Calculating the mean incorrectly',
        ],
        answer: 1,
        explanation:
          'A Type I error is a false positive: rejecting the null hypothesis when it is true.',
      },
    ],
    video: {
      title: 'Introduction to Hypothesis Testing',
      channel: 'Khan Academy',
      url: 'https://www.khanacademy.org/math/statistics-probability/significance-tests-one-sample',
    },
    references: [
      {
        title: 'Introductory Statistics',
        author: 'OpenStax',
        url: 'https://openstax.org/details/books/introductory-statistics',
      },
      {
        title: 'Statistics and probability',
        author: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/statistics-probability',
      },
    ],
  },

  'stats-10': {
    activities: [
      {
        type: 'quickCheck',
        title: 'Interpret correlation',
        question:
          'A correlation coefficient of r = -0.90 indicates what kind of relationship?',
        options: [
          'Strong positive linear relationship',
          'Strong negative linear relationship',
          'No linear relationship',
          'Proof that one variable causes the other',
        ],
        answer: 1,
        explanation:
          'A value close to -1 indicates a strong negative linear relationship.',
      },
      {
        type: 'quickCheck',
        title: 'Calculate a prediction',
        question:
          'A regression model is y = 20 + 5x. What is the predicted y when x = 4?',
        options: ['25', '30', '40', '100'],
        answer: 2,
        explanation: 'y = 20 + 5(4) = 40.',
      },
    ],
    video: {
      title: 'Correlation and Regression',
      channel: 'Khan Academy',
      url: 'https://www.khanacademy.org/math/statistics-probability/describing-relationships-quantitative-data',
    },
    references: [
      {
        title: 'Introductory Statistics',
        author: 'OpenStax',
        url: 'https://openstax.org/details/books/introductory-statistics',
      },
      {
        title: 'Statistics and probability',
        author: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/statistics-probability',
      },
    ],
  },
};

export default LESSON_EXTRAS;
