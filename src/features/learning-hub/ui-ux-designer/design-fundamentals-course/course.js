import { QUESTIONS } from './questions';

const course = {
    id: 'design-fundamentals',
    title: 'Design Fundamentals',
    subtitle: 'Color, typography, grid systems, visual hierarchy, and composition.',
    category: 'UI/UX Design',
    estimatedTime: '1.5 hours',
    quizSize: 10,
    passingPercentage: 70,
    badgeTitle: 'Design Fundamentals Mastered',
    badgeDescription: 'You have mastered core visual design principles, hierarchy, grid systems, and typography.',

    lessons: [
        {
            id: 'design-fund-1',
            title: '1. Introduction to UI & UX Design',
            duration: '5 min',
            summary: 'Distinguish between UI aesthetics and UX functionality, and understand their synergy.',
            content: [
                {
                    type: 'text',
                    value: 'UI (User Interface) design focuses on the visual layer—colors, typography, buttons, and layout. UX (User Experience) design covers the functional journey, usability, research, and structure.',
                },
                {
                    type: 'definition',
                    term: 'Synergy in Product Design',
                    definition: 'A product with beautiful UI but poor UX is confusing to use; a product with great UX but poor UI feels unpolished and unappealing.',
                },
            ],
        },
        {
            id: 'design-fund-2',
            title: '2. Visual Hierarchy & Focal Points',
            duration: '6 min',
            summary: 'Learn how to guide user attention using scale, contrast, weight, and position.',
            content: [
                {
                    type: 'text',
                    value: 'Visual hierarchy directs the user’s eye to the most important elements first. Primary action buttons, large headers, and high-contrast badges naturally command immediate focus.',
                },
                {
                    type: 'definition',
                    term: 'The F & Z Reading Patterns',
                    definition: 'Users scan dense text screens in an "F" pattern, and visually sparse promotional screens in a "Z" pattern.',
                },
            ],
        },
        {
            id: 'design-fund-3',
            title: '3. Color Theory & Color Palettes',
            duration: '7 min',
            summary: 'Master primary, secondary, functional, and neutral colors in UI design.',
            content: [
                {
                    type: 'text',
                    value: 'Color conveys meaning and brand identity. Use the 60-30-10 rule: 60% dominant neutral color, 30% secondary structure color, and 10% accent color for primary call-to-actions.',
                },
                {
                    type: 'definition',
                    term: 'Functional Colors',
                    definition: 'Standardized colors used for system states: Green (Success), Red (Error), Yellow (Warning), Blue (Information).',
                },
            ],
        },
        {
            id: 'design-fund-4',
            title: '4. Typography & Type Scales',
            duration: '6 min',
            summary: 'Choose readable typefaces, establish line height, and build modular type scales.',
            content: [
                {
                    type: 'text',
                    value: 'Typography establishes legibility and hierarchy. Stick to 1-2 font families per project and define systematic font sizes (e.g., 12px caption, 16px body, 20px subhead, 28px title).',
                },
                {
                    type: 'definition',
                    term: 'Line Height (Leading)',
                    definition: 'Optimal line height for body text is generally 140%–150% of the font size for ideal readability.',
                },
            ],
        },
        {
            id: 'design-fund-5',
            title: '5. White Space & Layout Density',
            duration: '5 min',
            summary: 'Utilize active and passive negative space to group content and avoid clutter.',
            content: [
                {
                    type: 'text',
                    value: 'White space is not empty space—it is an active design element. Generous margins and paddings give interfaces a modern, breathable, and premium feel.',
                },
            ],
        },
        {
            id: 'design-fund-6',
            title: '6. The 8pt Grid & Spacing Systems',
            duration: '6 min',
            summary: 'Implement consistent spacing using 8px increments across component designs.',
            content: [
                {
                    type: 'text',
                    value: 'Using multiples of 8 (8, 16, 24, 32, 40, 48) simplifies developer handoff and ensures consistent spatial rhythm throughout mobile and web screens.',
                },
            ],
        },
        {
            id: 'design-fund-7',
            title: '7. Gestalt Principles in UI',
            duration: '7 min',
            summary: 'Apply Proximity, Similarity, Continuity, and Closure to organize content.',
            content: [
                {
                    type: 'text',
                    value: 'Gestalt psychology explains how humans perceive groups of objects. Placing cards together signals related content, while distinct spacing separates categories.',
                },
            ],
        },
        {
            id: 'design-fund-8',
            title: '8. Contrast & Visual Accessibility',
            duration: '6 min',
            summary: 'Design inclusive interfaces meeting WCAG AA contrast standard ratios.',
            content: [
                {
                    type: 'text',
                    value: 'Ensure readable contrast between foreground text and background colors. Standard text requires at least a 4.5:1 contrast ratio.',
                },
            ],
        },
        {
            id: 'design-fund-9',
            title: '9. Affordances & Signifiers',
            duration: '5 min',
            summary: 'Create intuitive UI components that signal how users should interact with them.',
            content: [
                {
                    type: 'text',
                    value: 'Signifiers communicate affordances. A subtle drop shadow on a card or a pill shape on a button explicitly indicates to users that the element can be tapped.',
                },
            ],
        },
        {
            id: 'design-fund-10',
            title: '10. Alignment, Grids & Balance',
            duration: '6 min',
            summary: 'Align elements consistently to build visual structure and stability.',
            content: [
                {
                    type: 'text',
                    value: 'Avoid placing elements arbitrarily. Align items along strong horizontal and vertical grid lines to achieve clean visual balance.',
                },
            ],
        },
    ],

    questions: QUESTIONS,
};

export default course;