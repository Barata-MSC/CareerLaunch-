const courseId = 'acct-profession-ethics';

const lessonDrafts = [
  {
    title: 'An Orientation to Accountancy',
    objective: 'State “Educational orientation, not accounting, tax, or financial advice” and distinguish general learning from individualized professional advice.',
    explanation: 'This course introduces how accountancy supports trustworthy financial information. It is for learning concepts and career orientation; a real person or organization should take situation-specific questions to a qualified professional and current official sources.',
    example: 'Example: A learner studying a fictional shop’s records can discuss what a summary shows, but should not use the classroom exercise to decide how to report a real shop’s activity.',
    question: 'What is the main boundary of this course?',
    answer: 'It teaches general concepts, not advice for a specific financial situation.',
    distractors: ['It provides instructions for handling an individual tax case.', 'It prepares learners for board exam questions.', 'It guarantees that a real business has reported correctly.'],
    keyPoints: ['The course is educational orientation.', 'It is not accounting, tax, or financial advice.', 'Real situations require current, qualified guidance.'],
  },
  {
    title: 'What Accounting Helps People Understand',
    objective: "Explain how organized financial information can help different users understand an organization's activities.",
    explanation: 'Accounting organizes information about resources, obligations, and activity so people can ask clearer questions. Different readers may need different summaries, and a summary should be interpreted in its context.',
    example: 'Example: In a made-up school-supply stall, the owner reviews a weekly summary to understand sales and costs, while a project teammate uses it to discuss how much stock remains.',
    question: 'Why might different people use an organized financial summary?',
    answer: 'They use it to understand activity and ask questions relevant to their roles.',
    distractors: ['It predicts every future result with certainty.', 'It contains every detail about the organization.', 'It removes the need to understand the activity.'],
    keyPoints: ['Organized information supports understanding.', 'Different users ask different questions.', 'A summary needs context.'],
  },
  {
    title: "The Accountant's Work in Context",
    objective: 'Compare broad tasks such as organizing information, communicating summaries, and supporting responsible decisions in different work contexts.',
    explanation: 'Accountancy work can involve preparing information, reviewing how it was assembled, explaining results, or helping a team plan. The exact tasks depend on the organization and role; this overview does not define a professional scope.',
    example: 'Example: A fictional community cooperative has one staff member organize source records and another prepare a plain-language monthly summary for a committee discussion.',
    question: 'Which pair best represents broad accountancy tasks from this lesson?',
    answer: 'Organizing information and communicating summaries.',
    distractors: ['Setting public policy and guaranteeing outcomes.', 'Predicting every organization’s future activity.', 'Replacing every other organizational role.'],
    keyPoints: ['Accountancy includes varied broad tasks.', 'Work context shapes day-to-day responsibilities.', 'Clear communication connects information to questions.'],
  },
  {
    title: 'Integrity in Everyday Work',
    objective: 'Choose a transparent response when a fictional record appears incomplete or inconsistent.',
    explanation: 'Integrity means presenting information honestly, including uncertainty or missing support. A neat-looking total is not a reason to hide a discrepancy; it is a reason to document what is known and ask the responsible person to review it.',
    example: 'Example: A made-up campus canteen summary lists 20 meal vouchers, but the supporting count is 18. The preparer records the mismatch and asks the supervisor to check the source instead of silently changing a number.',
    question: 'What is the integrity-based response to the canteen mismatch?',
    answer: 'Document the difference and ask the responsible person to review the source.',
    distractors: ['Change the count to the larger number without a note.', 'Remove the supporting count so the summary looks consistent.', 'Choose whichever count supports the preferred result.'],
    keyPoints: ['Do not conceal a mismatch.', 'Separate observed facts from assumptions.', 'Escalate questions through an appropriate review path.'],
  },
  {
    title: 'Objectivity and Fair Judgment',
    objective: 'Explain how considering evidence rather than personal preference supports a balanced conclusion.',
    explanation: 'Objectivity is the habit of weighing relevant information consistently instead of choosing the result that feels most convenient. It also means being open about limitations in the evidence.',
    example: 'Example: Two fictional project summaries disagree about supply use. A reviewer compares the dated records and notes which entries are still unconfirmed rather than favoring a friend’s estimate.',
    question: 'What makes the reviewer’s approach objective?',
    answer: 'They compare relevant evidence and state which details remain unconfirmed.',
    distractors: ['They favor a friend’s estimate without checking it.', 'They select the result that best fits a personal preference.', 'They ignore uncertainty to reach a faster conclusion.'],
    keyPoints: ['Use relevant evidence consistently.', 'Do not let preference determine the conclusion.', 'State uncertainty when evidence is incomplete.'],
  },
  {
    title: 'Confidentiality and Respectful Information Use',
    objective: 'Identify why financial details should be shared only with appropriate people for a legitimate purpose.',
    explanation: 'Financial records may reveal private information about people or organizations. Respectful handling means limiting access and discussion to those who need the information for an assigned purpose.',
    example: 'Example: A student helping with a fictional club budget shares the summary with the authorized treasurer, not in a public class chat that includes unrelated people.',
    question: 'Who should receive the fictional club budget summary?',
    answer: 'The authorized treasurer who needs it for the assigned purpose.',
    distractors: ['Every person in a public chat.', 'Unrelated classmates who are curious.', 'Anyone who requests it without a role or purpose.'],
    keyPoints: ['Financial details can be sensitive.', 'Share only with appropriate people.', 'Use information only for its intended purpose.'],
  },
  {
    title: 'Financial Reporting and Recognized Standards',
    objective: 'Explain at a high level that financial reporting follows recognized standards, is studied in greater depth later, and requires consulting official sources for current reporting rules.',
    explanation: 'Recognized financial reporting standards provide a shared foundation for presenting information. This lesson names that idea only; it does not interpret a standard or state a current requirement. Learners will study the topic in more depth and should consult official sources for current rules.',
    example: 'Example: A fictional learner sees two organizations present similar summaries in a consistent format and asks which recognized guidance applies, then records that question for later study rather than guessing.',
    question: 'What should the learner do about a current reporting-rule question?',
    answer: 'Consult official sources and study the recognized guidance further.',
    distractors: ['Guess from the visual format of the summaries.', 'Invent a rule based on a classroom example.', 'Assume the same rule applies without checking current sources.'],
    keyPoints: ['Financial reporting follows recognized standards.', 'This course does not name or interpret a standard.', 'Use official sources for current reporting rules.'],
  },
  {
    title: 'Clear Communication and Documentation',
    objective: 'Describe how precise, understandable explanations help users distinguish recorded facts from assumptions.',
    explanation: 'A useful explanation identifies what information was recorded, what it suggests, and what remains uncertain. Documentation gives another reader a path to understand how a summary was prepared.',
    example: 'Example: A fictional activity note says “12 notebooks purchased according to the dated receipt” and separately flags a handwritten estimate of remaining stock as unverified.',
    question: 'How does the activity note distinguish a fact from an estimate?',
    answer: 'It ties the purchase count to a dated receipt and labels stock as unverified.',
    distractors: ['It presents both details as independently confirmed.', 'It removes the source and uncertainty labels.', 'It changes the estimate to match the purchase count.'],
    keyPoints: ['Use precise, plain language.', 'Distinguish a record from an estimate.', 'Document enough context for another reader.'],
  },
  {
    title: 'Working with Others and Knowing Limits',
    objective: 'Explain why accountants may collaborate with other roles and seek qualified guidance when a question exceeds their knowledge.',
    explanation: 'Financial work often depends on context held by other people, such as operations staff or program managers. Asking a knowledgeable person for clarification is responsible when information is unfamiliar or incomplete.',
    example: 'Example: A fictional event coordinator explains why a venue deposit was recorded; the accounting learner asks the coordinator to confirm the date instead of inferring it from an unrelated note.',
    question: 'How should the learner handle the unclear deposit date?',
    answer: 'Ask the coordinator who has the relevant context to confirm it.',
    distractors: ['Infer it from an unrelated note.', 'Choose a likely date and record it as confirmed.', 'Avoid asking because collaboration is unnecessary.'],
    keyPoints: ['Context may come from other roles.', 'Clarifying questions improve understanding.', 'Recognize when qualified guidance is needed.'],
  },
  {
    title: 'Trust as a Professional Habit',
    objective: 'Connect integrity, objectivity, confidentiality, and careful communication in a fictional workplace scenario.',
    explanation: 'Trust is built through repeated choices: report information honestly, consider evidence fairly, protect sensitive details, and explain conclusions carefully. These habits reinforce each other in routine work.',
    example: 'Example: A fictional project assistant notices an unclear expense, restricts the supporting note to the review team, documents the uncertainty, and asks the record owner for confirmation.',
    question: 'Which action best combines trust-supporting habits?',
    answer: 'Document uncertainty, protect the note, and ask its owner for clarification.',
    distractors: ['Share the note publicly and speculate about its meaning.', 'Hide the expense until a preferred answer is found.', 'Treat an unclear detail as certain without checking.'],
    keyPoints: ['Trust depends on consistent conduct.', 'Protect information while resolving questions.', 'Explain what is known and what remains unclear.'],
  },
];

function answerChoices(draft, correctIndex) {
  return [
    ...draft.distractors.slice(0, correctIndex),
    draft.answer,
    ...draft.distractors.slice(correctIndex),
  ];
}

const lessons = lessonDrafts.map((draft, index) => {
  const correct = index % 4;
  const options = answerChoices(draft, correct);
  return {
    id: `profession-ethics-${index + 1}`,
    title: draft.title,
    subtitle: 'Foundations of accountancy',
    contentTitle: 'Key idea',
    description: `${index === 0 ? 'Prerequisite: No prior accounting study is required. ' : ''}${draft.explanation} ${draft.example}`,
    sections: [
      { heading: 'Learning objective', text: draft.objective },
      { heading: 'Worked example', text: draft.example },
    ],
    keyPoints: draft.keyPoints,
    ...(index % 3 !== 1
      ? {
          activities: [{
            type: 'quickCheck',
            question: draft.question,
            options,
            correct,
            hint: 'Choose the answer that matches the lesson’s central idea.',
            explanation: draft.objective,
          }],
        }
      : {}),
  };
});

const questions = lessonDrafts.map((draft, index) => ({
  lessonId: `profession-ethics-${index + 1}`,
  question: draft.question,
  answers: answerChoices(draft, index % 4),
  correct: index % 4,
  explanation: `${draft.answer} ${draft.objective}`,
}));

export default {
  id: courseId,
  title: 'The Accountancy Profession and Ethics',
  shortCode: 'APE',
  subtitle: 'What accountants do and the trust they carry.',
  outcome: 'Describe the roles of accountants and why integrity, objectivity, and confidentiality matter.',
  prerequisite: 'No prior accountancy study is required.',
  passingPercent: 70,
  quizSize: 10,
  lessons,
  questions,
};