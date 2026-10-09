import { QUESTIONS } from './questions';

const course = {
    id: 'user-research',
    title: 'User Research',
    subtitle: 'Interviews, personas, empathy maps, user journeys, and qualitative testing.',
    category: 'UI/UX Design',
    estimatedTime: '1.5 hours',
    quizSize: 10,
    passingPercentage: 70,
    badgeTitle: 'User Research Specialist',
    badgeDescription: 'You have mastered qualitative and quantitative research methods, empathy mapping, and user journey creation.',

    lessons: [
        {
            id: 'user-res-1',
            title: '1. Fundamentals of User Research',
            duration: '5 min',
            summary: 'Learn why user research is crucial for building user-centric products.',
            content: [
                {
                    type: 'text',
                    value: 'User research grounds design decisions in evidence rather than assumptions. It helps identify real problems before building solutions.',
                },
            ],
        },
        {
            id: 'user-res-2',
            title: '2. Qualitative vs Quantitative Research',
            duration: '6 min',
            summary: 'Understand when to use qualitative insights versus quantitative data metrics.',
            content: [
                {
                    type: 'text',
                    value: 'Qualitative research (interviews, usability tests) answers "Why" users behave a certain way. Quantitative research (surveys, analytics) answers "How many" users perform an action.',
                },
            ],
        },
        {
            id: 'user-res-3',
            title: '3. Conducting Effective User Interviews',
            duration: '7 min',
            summary: 'Master open-ended questioning and active listening techniques.',
            content: [
                {
                    type: 'text',
                    value: 'Avoid leading questions like "Do you like this button?". Instead, ask open-ended questions like "How do you currently complete this task?".',
                },
            ],
        },
        {
            id: 'user-res-4',
            title: '4. Creating User Personas',
            duration: '6 min',
            summary: 'Synthesize research data into actionable user profiles.',
            content: [
                {
                    type: 'text',
                    value: 'Personas represent target user archetypes, detailing goals, motivations, behaviors, and pain points discovered during research.',
                },
            ],
        },
        {
            id: 'user-res-5',
            title: '5. Empathy Mapping',
            duration: '5 min',
            summary: 'Map out what users Say, Think, Do, and Feel.',
            content: [
                {
                    type: 'text',
                    value: 'Empathy maps help cross-functional teams align on user mindsets and uncover hidden pain points or contradictions.',
                },
            ],
        },
        {
            id: 'user-res-6',
            title: '6. User Journey Mapping',
            duration: '7 min',
            summary: 'Plot end-to-end user experiences across touchpoints.',
            content: [
                {
                    type: 'text',
                    value: 'A journey map visualizes the user timeline step-by-step, highlighting emotional highs and friction points throughout a task.',
                },
            ],
        },
        {
            id: 'user-res-7',
            title: '7. Card Sorting & Information Architecture',
            duration: '6 min',
            summary: 'Organize app structures matching mental models.',
            content: [
                {
                    type: 'text',
                    value: 'Card sorting reveals how users naturally group categories, helping designers build intuitive navigation menus.',
                },
            ],
        },
        {
            id: 'user-res-8',
            title: '8. Contextual Inquiry & Observation',
            duration: '5 min',
            summary: 'Observe users in their native working environment.',
            content: [
                {
                    type: 'text',
                    value: 'Observing real-world workflows reveals environment distractions and workarounds users might forget to mention during sit-down interviews.',
                },
            ],
        },
        {
            id: 'user-res-9',
            title: '9. Surveys & Quantitative Data',
            duration: '6 min',
            summary: 'Design unbiased surveys to gather statistical insights.',
            content: [
                {
                    type: 'text',
                    value: 'Surveys validate qualitative findings at scale. Keep them short, clear, and focused on specific research objectives.',
                },
            ],
        },
        {
            id: 'user-res-10',
            title: '10. Synthesizing Insights into Action',
            duration: '7 min',
            summary: 'Turn affinity diagrams into problem statements and design goals.',
            content: [
                {
                    type: 'text',
                    value: 'Group findings into themes using affinity mapping to formulate "How Might We" statements that guide product features.',
                },
            ],
        },
    ],

    questions: QUESTIONS,
};

export default course;