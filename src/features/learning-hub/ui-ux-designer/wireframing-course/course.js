import { QUESTIONS } from './questions';

const course = {
    id: 'wireframing',
    title: 'Wireframing',
    subtitle: 'Layout abstraction, low vs high fidelity, wireflows, and responsive layouts.',
    category: 'UI/UX Design',
    estimatedTime: '1.5 hours',
    quizSize: 10,
    passingPercentage: 70,
    badgeTitle: 'Wireframing Architect',
    badgeDescription: 'You have mastered paper sketching, low/mid-fidelity wireframing, wireflows, and spatial layout planning.',

    lessons: [
        {
            id: 'wireframe-1',
            title: '1. Introduction to Wireframing',
            duration: '5 min',
            summary: 'Understand wireframes as the structural blueprint of UI design.',
            content: [
                {
                    type: 'text',
                    value: 'Wireframes define layout structure, spatial distribution, and interaction behavior without visual distractions like colors or custom fonts.',
                },
            ],
        },
        {
            id: 'wireframe-2',
            title: '2. Low-Fidelity vs High-Fidelity',
            duration: '6 min',
            summary: 'Compare quick sketches against detailed visual screens.',
            content: [
                {
                    type: 'text',
                    value: 'Low-fidelity focuses on fast structural validation. High-fidelity focuses on visual design, typography, brand identity, and fine details.',
                },
            ],
        },
        {
            id: 'wireframe-3',
            title: '3. Sketching & Ideation',
            duration: '5 min',
            summary: 'Explore paper prototyping and rapid layout generation.',
            content: [
                {
                    type: 'text',
                    value: 'Paper sketching allows designers to explore multiple UI concepts quickly before committing time to digital tools.',
                },
            ],
        },
        {
            id: 'wireframe-4',
            title: '4. Information Architecture & Navigation',
            duration: '7 min',
            summary: 'Map out content hierarchy and primary navigation models.',
            content: [
                {
                    type: 'text',
                    value: 'Organize screen elements logically to reflect how users naturally search for and interact with content.',
                },
            ],
        },
        {
            id: 'wireframe-5',
            title: '5. Wireframing Conventions & Symbols',
            duration: '6 min',
            summary: 'Learn standard UI placeholder notations.',
            content: [
                {
                    type: 'text',
                    value: 'Use standard conventions: crossed boxes for images, simple rectangles for buttons, and line bars for text paragraphs.',
                },
            ],
        },
        {
            id: 'wireframe-6',
            title: '6. Creating Wireflows',
            duration: '6 min',
            summary: 'Connect wireframes into screen interaction diagrams.',
            content: [
                {
                    type: 'text',
                    value: 'Wireflows map out entire screen journeys with interaction arrows, validating multi-step user tasks.',
                },
            ],
        },
        {
            id: 'wireframe-7',
            title: '7. Responsive Layout Planning',
            duration: '7 min',
            summary: 'Adapt layouts across mobile, tablet, and desktop viewports.',
            content: [
                {
                    type: 'text',
                    value: 'Plan how multi-column desktop layouts stack vertically into single-column mobile structures.',
                },
            ],
        },
        {
            id: 'wireframe-8',
            title: '8. Mid-Fidelity Digital Wireframing',
            duration: '6 min',
            summary: 'Transition sketches into digital layout tools.',
            content: [
                {
                    type: 'text',
                    value: 'Digital mid-fidelity wireframes introduce exact pixel dimensions, alignment grids, and realistic spacing.',
                },
            ],
        },
        {
            id: 'wireframe-9',
            title: '9. Gathering Early Structural Feedback',
            duration: '5 min',
            summary: 'Test wireframes with users to identify friction early.',
            content: [
                {
                    type: 'text',
                    value: 'Usability testing on wireframes catches navigation and mental model issues long before visual polish begins.',
                },
            ],
        },
        {
            id: 'wireframe-10',
            title: '10. Preparing Wireframes for Visual Design',
            duration: '6 min',
            summary: 'Handoff clean wireframe skeletons for visual UI design.',
            content: [
                {
                    type: 'text',
                    value: 'Clean wireframe handoffs allow visual designers to apply typography, colors, and components on top of validated layouts.',
                },
            ],
        },
    ],

    questions: QUESTIONS,
};

export default course;