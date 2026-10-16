// Interactive extras for each Design Fundamentals lesson, matched by lesson id.
// Merged into lessons dynamically without altering original text or ids.

const VIDEOS = {
    nngOverview: {
        id: 'Em5gc2bJYO4',
        title: 'Design Thinking 101',
        channel: 'Nielsen Norman Group',
        author: 'Sarah Gibbons',
        date: '2019, January 18',
    },
    nngHeuristics: {
        id: 'BrkPEepTPZs',
        title: '10 Usability Heuristics Applied to Everyday Interfaces',
        channel: 'Nielsen Norman Group',
        date: '2020, September 15',
    },
    nngDesignSystem: {
        id: '9_X15qHytqk',
        title: 'Design Systems 101',
        channel: 'Nielsen Norman Group',
        date: '2021, June 8',
    },
};

const VIDEO_FOR = {
    'design-fundamentals-ui-vs-ux': ['nngOverview', 0, 'UI vs UX'],
    'design-fundamentals-design-process': ['nngOverview', 30, 'Design Process'],
    'design-fundamentals-layout-spacing': ['nngDesignSystem', 0, 'Layout & Spacing'],
    'design-fundamentals-visual-hierarchy': ['nngHeuristics', 0, 'Visual Hierarchy'],
    'design-fundamentals-color': ['nngHeuristics', 45, 'Color & Contrast'],
    'design-fundamentals-typography': ['nngDesignSystem', 60, 'Typography'],
    'design-fundamentals-contrast-accessibility': ['nngHeuristics', 90, 'Accessibility'],
    'design-fundamentals-usability-heuristics': ['nngHeuristics', 120, '10 Heuristics'],
    'design-fundamentals-consistency-components': ['nngDesignSystem', 180, 'Design Systems'],
    'design-fundamentals-responsive-mobile': ['nngOverview', 200, 'Responsive Design'],
};

// APA 7th references pointing to real NN/g articles & guidelines
const nngRef = (title, path, date = 'n.d.') => ({
    text: `Nielsen Norman Group. (${date}). ${title}.`,
    url: `https://www.nngroup.com/articles/${path}`,
});

const videoRef = (v) => ({
    text: `${v.channel}. (${v.date}). ${v.title} [Video]. YouTube.`,
    url: `https://youtu.be/${v.id}`,
});

const BASE = {
    'design-fundamentals-ui-vs-ux': {
        activities: [
            {
                type: 'quickCheck',
                question: 'An app has stunning modern visuals and animations, but completing a checkout requires 12 confusing steps. What does this represent?',
                options: [
                    'Good UI and good UX',
                    'Good UI and poor UX',
                    'Poor UI and good UX',
                    'Poor UI and poor UX',
                ],
                correct: 1,
                hint: 'Visuals refer to UI, while task completion flow refers to UX.',
                explanation: 'Great visual design elements make up good UI, while a frustrating, lengthy task flow represents poor UX.',
            },
            {
                type: 'quickCheck',
                question: 'Which of the following activities is primarily focused on UX rather than UI?',
                options: [
                    'Choosing a 60-30-10 color palette',
                    'Selecting font weights and line height',
                    'Conducting user interviews to find pain points',
                    'Designing vector icons for the navigation bar',
                ],
                correct: 2,
                hint: 'UX deals with overall human behavior, research, and problem journeys.',
                explanation: 'UX design centers on user research, task flows, and understanding needs, whereas UI focuses on visual styling.',
            },
        ],
        references: [nngRef('Definition of User Experience', 'definition-user-experience/'), nngRef('UX vs. UI: An Introduction', 'ux-vs-ui/')],
    },

    'design-fundamentals-design-process': {
        activities: [
            {
                type: 'quickCheck',
                question: 'In the design thinking process, what is the primary goal of creating a low-fidelity prototype?',
                options: [
                    'To launch the final product to production',
                    'To test ideas and learn from user feedback quickly',
                    'To replace user research entirely',
                    'To impress stakeholders with visual polish',
                ],
                correct: 1,
                hint: 'Prototypes are built for learning, not for perfection.',
                explanation: 'Prototypes allow teams to test concepts early, discover flaws, and iterate before spending time on code.',
            },
            {
                type: 'quickCheck',
                question: 'During which phase of design thinking do you formulate a clear user need or problem statement?',
                options: ['Empathize', 'Define', 'Ideate', 'Test'],
                correct: 1,
                hint: 'The stage comes right after gathering qualitative research.',
                explanation: 'The Define stage synthesizes research findings into an actionable problem statement or user need.',
            },
        ],
        references: [nngRef('Design Thinking 101', 'design-thinking/', '2016')],
    },

    'design-fundamentals-layout-spacing': {
        activities: [
            {
                type: 'quickCheck',
                question: 'Why do many modern digital product designers use an 8-point spacing scale?',
                options: [
                    'It guarantees absolute zero code bugs',
                    'It creates consistent, harmonious layouts and simplifies spacing choices',
                    'Screens are always 800 pixels wide',
                    'It is required by the operating system kernel',
                ],
                correct: 1,
                hint: 'Consistent multiples prevent arbitrary, mismatched padding.',
                explanation: 'Using multiples of 8 (e.g., 8, 16, 24, 32) brings mathematical rhythm and visual consistency to layouts.',
            },
            {
                type: 'quickCheck',
                question: 'According to the Gestalt principles of grouping, what does visual proximity imply?',
                options: [
                    'Elements placed close together are perceived as related',
                    'Elements with different colors are completely unrelated',
                    'Larger elements are always more important',
                    'Text should always be centered',
                ],
                correct: 0,
                hint: 'Proximity means closeness in space.',
                explanation: 'Proximity dictates that items near each other are naturally grouped together by the human eye.',
            },
        ],
        references: [nngRef('Gestalt Principles Applied in UX', 'gestalt-proximity/')],
    },

    'design-fundamentals-visual-hierarchy': {
        activities: [
            {
                type: 'quickCheck',
                question: 'If every single button on a mobile screen uses bright primary brand colors and heavy drop shadows, what happens?',
                options: [
                    'Users complete tasks twice as fast',
                    'The primary action stands out perfectly',
                    'Visual noise increases and users cannot tell what to click first',
                    'Accessibility contrast ratios automatically improve',
                ],
                correct: 2,
                hint: 'If everything is emphasized, nothing stands out.',
                explanation: 'Visual hierarchy requires contrast; making everything prominent destroys priority and overwhelms the user.',
            },
            {
                type: 'quickCheck',
                question: 'In left-to-right reading cultures, where do users typically look first when scanning a new screen?',
                options: [
                    'Bottom-right corner',
                    'Top-left area',
                    'Exact center',
                    'Bottom-left footer',
                ],
                correct: 1,
                hint: 'Think about how you read a book page.',
                explanation: 'Users in western reading cultures naturally begin scanning content from the top-left corner.',
            },
        ],
        references: [nngRef('Visual Hierarchy in UX', 'visual-hierarchy/')],
    },

    'design-fundamentals-color': {
        activities: [
            {
                type: 'quickCheck',
                question: 'What does the 60-30-10 rule recommend for interface color palettes?',
                options: [
                    '60% accent, 30% primary, 10% neutral',
                    '60% dominant neutral, 30% secondary/structure, 10% accent',
                    '60 colors, 30 fonts, 10 shadows',
                    '60 seconds of design time per 30 pixels',
                ],
                correct: 1,
                hint: 'The largest percentage belongs to background neutrals.',
                explanation: 'The 60-30-10 rule balances 60% neutral space, 30% structural secondary color, and 10% striking accent.',
            },
            {
                type: 'quickCheck',
                question: 'Why should you never rely solely on color (like red text) to communicate an error state?',
                options: [
                    'Color code files are too large',
                    'Users with color vision deficiencies might miss the signal',
                    'Screens automatically strip out red hues',
                    'CSS standards forbid red error messages',
                ],
                correct: 1,
                hint: 'Inaccessibility affects color-blind users.',
                explanation: 'Some users cannot distinguish certain colors; errors must be paired with icons, text labels, or patterns.',
            },
        ],
        references: [nngRef('Color Theory for Digital Displays', 'color-contrast/')],
    },

    'design-fundamentals-typography': {
        activities: [
            {
                type: 'quickCheck',
                question: 'What is a recommended comfortable line height (leading) ratio for body text relative to font size?',
                options: [
                    '0.8 to 1.0 times',
                    '1.4 to 1.6 times',
                    '3.0 to 4.0 times',
                    'Exactly 2 pixels',
                ],
                correct: 1,
                hint: 'Text needs vertical breathing room between lines.',
                explanation: 'A line height of 1.4 to 1.6 times the font size ensures lines do not crowd each other, boosting legibility.',
            },
            {
                type: 'quickCheck',
                question: 'Which font category is traditionally preferred for high readability on digital screens?',
                options: ['Sans-serif', 'Heavy decorative display', 'Complex blackletter', 'Ornate script'],
                correct: 0,
                hint: 'Clean letterforms without decorative feet work best on pixels.',
                explanation: 'Sans-serif typefaces offer clean, clear character forms that render exceptionally well on digital screens.',
            },
        ],
        references: [nngRef('Typography Readability and Web Design', 'web-typography/')],
    },

    'design-fundamentals-contrast-accessibility': {
        activities: [
            {
                type: 'quickCheck',
                question: 'According to WCAG AA guidelines, what is the minimum contrast ratio required for normal body text against its background?',
                options: ['2:1', '3:1', '4.5:1', '10:1'],
                correct: 2,
                hint: 'Normal text needs higher contrast than large headings.',
                explanation: 'WCAG AA requires at least a 4.5:1 contrast ratio for normal text to ensure legibility for users with low vision.',
            },
            {
                type: 'quickCheck',
                question: 'What is the recommended minimum touch target size for interactive mobile elements like buttons?',
                options: [
                    '10 x 10 points',
                    '20 x 20 points',
                    '44 x 44 points',
                    '100 x 100 points',
                ],
                correct: 1,
                hint: 'Think about finger pad sizes on mobile touchscreens.',
                explanation: 'Interactive elements should measure at least 44x44 points to comfortably accommodate finger taps.',
            },
        ],
        references: [nngRef('Accessibility for Visual Design', 'accessibility-visual-design/')],
    },

    'design-fundamentals-usability-heuristics': {
        activities: [
            {
                type: 'quickCheck',
                question: 'Which usability heuristic emphasizes keeping users informed through loaders, progress indicators, and status messages?',
                options: [
                    'Consistency and standards',
                    'Visibility of system status',
                    'Error prevention',
                    'Recognition over recall',
                ],
                correct: 1,
                hint: 'The system should never leave the user wondering if it froze.',
                explanation: 'Visibility of system status ensures users always know what the system is doing via timely feedback.',
            },
            {
                type: 'quickCheck',
                question: 'What does the heuristic "Recognition rather than recall" advise designers to do?',
                options: [
                    'Hide navigation menus to test memory',
                    'Make options, actions, and items visible so users do not have to memorize information',
                    'Require users to type out database IDs manually',
                    'Disable browser back buttons',
                ],
                correct: 1,
                hint: 'Recognizing an item from a list is much easier than recalling it from scratch.',
                explanation: 'Minimizing cognitive load by displaying choices directly reduces user effort.',
            },
        ],
        references: [nngRef('10 Usability Heuristics for User Interface Design', 'ten-usability-heuristics/', '2024')],
    },

    'design-fundamentals-consistency-components': {
        activities: [
            {
                type: 'quickCheck',
                question: 'What is a design token in a modern design system?',
                options: [
                    'A physical coin given to UI designers',
                    'A named variable storing design values like colors, spacing, or typography',
                    'A password required to open Figma',
                    'An obsolete CSS stylesheet format',
                ],
                correct: 1,
                hint: 'Tokens replace raw hex codes with meaningful names.',
                explanation: 'Design tokens store UI properties (like color or spacing) as variables, enabling seamless updates across platforms.',
            },
            {
                type: 'quickCheck',
                question: 'Why are UI components valuable in product development?',
                options: [
                    'They allow teams to reuse building blocks and maintain consistency',
                    'They eliminate the need for any user testing',
                    'They prevent code from compiling in React Native',
                    'They remove all design decisions from projects',
                ],
                correct: 0,
                hint: 'Reusable elements save time and ensure brand uniformity.',
                explanation: 'Components act as standard, modular building blocks that streamline design and development.',
            },
        ],
        references: [nngRef('Design Systems: Definition and Guidelines', 'design-systems-101/')],
    },

    'design-fundamentals-responsive-mobile': {
        activities: [
            {
                type: 'quickCheck',
                question: 'What is the primary benefit of adopting a "mobile-first" design approach?',
                options: [
                    'It forces teams to prioritize core content and critical features first',
                    'It completely eliminates desktop computer layouts',
                    'It reduces internet bandwidth consumption',
                    'It prevents responsive breakpoints entirely',
                ],
                correct: 0,
                hint: 'Designing for constraints clarifies what truly matters.',
                explanation: 'Starting with small screens forces focus on essential user journeys before expanding features for larger screens.',
            },
            {
                type: 'quickCheck',
                question: 'What does a responsive design breakpoint represent?',
                options: [
                    'A bug that causes app crashes',
                    'A specific screen width where the layout adjusts to fit the viewport',
                    'The maximum character count in a heading',
                    'The time it takes an image to load',
                ],
                correct: 1,
                hint: 'Layouts reflow when crossing certain pixel thresholds.',
                explanation: 'Breakpoints define screen width thresholds where columns and UI structures reflow for readability.',
            },
        ],
        references: [nngRef('Responsive Web Design: Avoid These Pitfalls', 'responsive-web-design-mistakes/')],
    },
};

export const EXTRAS = Object.fromEntries(
    Object.entries(BASE).map(([lessonId, extra]) => {
        const [key, start = 0, chapter] = VIDEO_FOR[lessonId] || ['nngOverview'];
        const v = VIDEOS[key];
        return [
            lessonId,
            {
                ...extra,
                video: { id: v.id, start, chapter, title: v.title, channel: v.channel },
                references: [...(extra.references ?? []), videoRef(v)],
            },
        ];
    }),
);