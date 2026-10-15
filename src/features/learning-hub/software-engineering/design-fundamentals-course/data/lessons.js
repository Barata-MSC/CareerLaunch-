// Lesson content for the Design Fundamentals course (UI/UX Designer track).

export const LESSONS = [
  {
    id: 'design-fundamentals-ui-vs-ux',
    title: 'What is UI/UX?',
    subtitle: 'Experience vs. interface',
    contentTitle: 'Two sides of one product',
    description:
      'UX (user experience) is how a product works and how it feels to use. UI (user interface) is what the user sees and touches: screens, buttons, colors, and text. A product can look beautiful and still be frustrating, so good designers care about both.',
    code: `UX  ->  Can I finish my task easily?
UI  ->  Does it look clear and consistent?

Great product = UX + UI working together`,
    sections: [
      {
        heading: 'User experience (UX)',
        text: 'UX covers the whole journey: finding the product, learning it, completing tasks, and getting help. UX designers research users, map flows, and test whether people can reach their goals.',
      },
      {
        heading: 'User interface (UI)',
        text: 'UI is the visual and interactive layer. UI designers choose colors, typography, spacing, icons, and the look of buttons and forms so that the product is clear and pleasant to use.',
      },
      {
        heading: 'A simple example',
        text: 'A food delivery app with a gorgeous design but a checkout that takes ten taps has good UI and poor UX. An app that orders in two taps but looks messy has good UX and poor UI.',
      },
      {
        heading: 'Who the user is',
        text: 'Design starts with a real person with goals, limits, and context. Always ask who will use this, what they want to do, and where they will be when they do it.',
      },
    ],
    keyPoints: [
      'UX is the overall experience; UI is the visual interface',
      'A good product needs both to work well',
      'Design starts with understanding the user',
      'Looking good does not mean working well',
    ],
  },
  {
    id: 'design-fundamentals-design-process',
    title: 'The Design Process',
    subtitle: 'From problem to solution',
    contentTitle: 'Design thinking in five steps',
    description:
      'Designers rarely jump straight to screens. They follow a process that moves from understanding people to testing ideas. A common model is design thinking: Empathize, Define, Ideate, Prototype, and Test.',
    code: `1. Empathize  -> learn about users
2. Define     -> state the problem
3. Ideate     -> explore many ideas
4. Prototype  -> make a quick version
5. Test       -> learn and improve`,
    sections: [
      {
        heading: 'Empathize and define',
        text: 'Talk to and observe users to understand their needs and frustrations. Then write a clear problem statement, for example: "Busy students need a faster way to find their class schedule."',
      },
      {
        heading: 'Ideate',
        text: 'Generate many possible solutions before choosing one. Sketching and brainstorming help you avoid settling on the first idea.',
      },
      {
        heading: 'Prototype and test',
        text: 'A prototype is a quick, simple version of the design used to learn. Test it with real users, watch where they struggle, and use what you learn to improve it.',
      },
      {
        heading: 'It is a loop',
        text: 'The process is not a straight line. Testing often sends you back to an earlier step, and that is a good thing because problems are cheaper to fix before development.',
      },
    ],
    keyPoints: [
      'Design thinking: Empathize, Define, Ideate, Prototype, Test',
      'Define the problem before designing a solution',
      'Prototypes are for learning, not perfection',
      'Iterating early saves time and cost',
    ],
  },
  {
    id: 'design-fundamentals-layout-spacing',
    title: 'Layout & Spacing',
    subtitle: 'Grids, alignment, and white space',
    contentTitle: 'Giving content room to breathe',
    description:
      'Layout is how elements are arranged on a screen. Good layouts use consistent alignment, grids, and spacing so that content feels organized and easy to scan. Empty space, called white space, is not wasted; it helps people focus.',
    code: `8-point spacing scale:
8   16   24   32   40   48

Use multiples of 8 for margins,
padding, and gaps.`,
    sections: [
      {
        heading: 'Grids',
        text: 'A grid divides the screen into columns and margins. Placing elements on a grid keeps everything aligned and makes layouts feel stable and professional.',
      },
      {
        heading: 'Alignment',
        text: 'Align related elements to the same edge. Left-aligned text is easiest to read in left-to-right languages. Random alignment makes a design look careless.',
      },
      {
        heading: 'White space',
        text: 'Space between elements groups related items and separates unrelated ones. Crowded screens feel stressful and hard to scan, while generous spacing feels calm and clear.',
      },
      {
        heading: 'Proximity',
        text: 'Items placed close together are seen as related. Put a label near its input field and keep more space between separate groups.',
      },
    ],
    keyPoints: [
      'Use a grid to keep elements aligned',
      'Keep spacing consistent with a scale such as 8 points',
      'White space improves focus and readability',
      'Close items look related (proximity)',
    ],
  },
  {
    id: 'design-fundamentals-visual-hierarchy',
    title: 'Visual Hierarchy',
    subtitle: 'Guide the eye',
    contentTitle: 'What should users see first?',
    description:
      'Visual hierarchy is the order in which people notice things on a screen. Designers control it with size, color, contrast, position, and spacing so that the most important content stands out.',
    code: `Headline        biggest, boldest
Subheading      smaller
Body text       regular
Caption         smallest, lightest`,
    sections: [
      {
        heading: 'Size and weight',
        text: 'Larger and bolder elements attract attention first. Use size to separate headings from body text and primary actions from secondary ones.',
      },
      {
        heading: 'Color and contrast',
        text: 'A bright or high-contrast element stands out against a quiet background. Use your strongest color for the main action and keep everything else calmer.',
      },
      {
        heading: 'Position',
        text: 'People in left-to-right cultures usually scan from the top-left. Place the most important content and actions where eyes naturally land first.',
      },
      {
        heading: 'One primary action',
        text: 'If every button looks equally important, none of them is. Give each screen one clear primary action and style the others as secondary.',
      },
    ],
    keyPoints: [
      'Hierarchy tells users what to look at first',
      'Size, color, contrast, and position control hierarchy',
      'Make the primary action the most prominent',
      'If everything is emphasized, nothing stands out',
    ],
  },
  {
    id: 'design-fundamentals-color',
    title: 'Color Theory',
    subtitle: 'Palettes with purpose',
    contentTitle: 'Using color on purpose',
    description:
      'Color sets mood, creates emphasis, and communicates meaning. A good interface palette is small and consistent: a primary brand color, neutrals for text and backgrounds, and a few status colors.',
    code: `Primary   #5B21F5   main actions
Neutral   #222222   text
Success   #16A34A   confirmations
Warning   #F97316   alerts`,
    sections: [
      {
        heading: 'The color wheel',
        text: 'Complementary colors sit opposite each other and create strong contrast. Analogous colors sit next to each other and feel harmonious. Pick a scheme that fits the mood of your product.',
      },
      {
        heading: 'The 60-30-10 rule',
        text: 'A balanced palette uses about 60 percent a dominant neutral, 30 percent a secondary color, and 10 percent an accent. The accent is best saved for key actions.',
      },
      {
        heading: 'Color meaning',
        text: 'Colors carry associations: green often means success, red or orange means errors or warnings, and blue suggests trust. Meanings vary across cultures, so test with your audience.',
      },
      {
        heading: 'Never rely on color alone',
        text: 'Some users cannot tell certain colors apart. Pair color with text or icons, such as an error icon and message next to a red field.',
      },
    ],
    keyPoints: [
      'Keep the palette small and consistent',
      'The 60-30-10 rule balances dominant, secondary, and accent colors',
      'Colors carry meaning that can vary by culture',
      'Do not use color as the only signal',
    ],
  },
  {
    id: 'design-fundamentals-typography',
    title: 'Typography',
    subtitle: 'Type that is easy to read',
    contentTitle: 'Choosing and using type',
    description:
      'Most of an interface is text, so typography has a huge effect on usability. Good typography is readable, consistent, and sets a clear hierarchy through a limited set of sizes and weights.',
    code: `Heading 1   28 / bold
Heading 2   20 / bold
Body        16 / regular
Caption     12 / regular

Line height: about 1.4 to 1.6 x size`,
    sections: [
      {
        heading: 'Typefaces',
        text: 'Serif fonts have small strokes on the letters, while sans-serif fonts do not. Sans-serif fonts are very common on screens. Limit yourself to one or two typefaces per product.',
      },
      {
        heading: 'Size and line height',
        text: 'Body text on mobile should generally be at least 16 pixels. Give lines enough space, around 1.4 to 1.6 times the font size, so paragraphs are comfortable to read.',
      },
      {
        heading: 'Line length',
        text: 'Very long lines are tiring to read. Aim for roughly 45 to 75 characters per line for body text.',
      },
      {
        heading: 'Type scale',
        text: 'Define a small set of sizes and weights and reuse them. A consistent type scale makes hierarchy obvious and speeds up design work.',
      },
    ],
    keyPoints: [
      'Use one or two typefaces at most',
      'Body text should be around 16 pixels or larger on mobile',
      'Comfortable line height is about 1.4 to 1.6 times the size',
      'Reuse a defined type scale for consistency',
    ],
  },
  {
    id: 'design-fundamentals-contrast-accessibility',
    title: 'Contrast & Accessibility',
    subtitle: 'Design for everyone',
    contentTitle: 'Making products usable by all',
    description:
      'Accessibility means people with different abilities can use your product. This includes people with low vision, color blindness, hearing loss, motor difficulties, and cognitive differences. Accessible design also helps everyone, such as someone using a phone in bright sunlight.',
    code: `WCAG AA minimum contrast:
Normal text   4.5 : 1
Large text    3 : 1

Light gray on white often fails.`,
    sections: [
      {
        heading: 'Color contrast',
        text: 'The Web Content Accessibility Guidelines (WCAG) set minimum contrast ratios between text and background. Level AA asks for 4.5 to 1 for normal text and 3 to 1 for large text.',
      },
      {
        heading: 'Text alternatives',
        text: 'Add alt text or labels for images and icons so screen readers can describe them to blind users. Provide captions for video and audio.',
      },
      {
        heading: 'Touch and keyboard',
        text: 'Make tap targets large enough, about 44 by 44 points or more, and spaced apart. Make sure everything can be reached and used without a mouse or precise touch.',
      },
      {
        heading: 'Clear language',
        text: 'Use plain words, short sentences, and clear labels. Avoid jargon so more people understand what to do.',
      },
    ],
    keyPoints: [
      'WCAG AA needs 4.5:1 contrast for normal text',
      'Add alt text and labels for non-text content',
      'Tap targets should be about 44 by 44 points or larger',
      'Accessible design benefits all users',
    ],
  },
  {
    id: 'design-fundamentals-usability-heuristics',
    title: 'Usability Heuristics',
    subtitle: 'Rules of thumb from Nielsen',
    contentTitle: 'Ten principles for usable design',
    description:
      'Jakob Nielsen published 10 usability heuristics that designers use to evaluate interfaces. They are broad rules of thumb rather than strict laws, and they are great for spotting problems quickly.',
    code: `Visibility of system status
Match with the real world
User control and freedom
Consistency and standards
Error prevention
Recognition over recall
Flexibility and efficiency
Minimalist design
Help users recover from errors
Help and documentation`,
    sections: [
      {
        heading: 'Visibility of system status',
        text: 'Always tell users what is happening, such as a loading spinner, a progress bar, or a confirmation message after saving.',
      },
      {
        heading: 'User control and freedom',
        text: 'People make mistakes, so give them a clear way out. Undo, cancel, and back buttons let users recover without stress.',
      },
      {
        heading: 'Error prevention',
        text: 'Good design stops problems before they happen. Disable impossible actions, confirm destructive ones, and use constraints such as date pickers instead of free text.',
      },
      {
        heading: 'Recognition over recall',
        text: 'Do not make users remember information from one screen to the next. Show options, labels, and recent items so people can recognize what they need.',
      },
    ],
    keyPoints: [
      'Nielsen defined 10 usability heuristics',
      'Keep users informed about system status',
      'Give users undo and a clear way to exit',
      'Prevent errors where possible and help users recover from the rest',
    ],
  },
  {
    id: 'design-fundamentals-consistency-components',
    title: 'Consistency & Components',
    subtitle: 'Reusable building blocks',
    contentTitle: 'Design systems in a nutshell',
    description:
      'Consistency means similar things look and behave in similar ways. People learn an interface faster when buttons, icons, and patterns are predictable. Design systems capture these decisions as reusable components and rules.',
    code: `Design system
 |- Colors, type, spacing (tokens)
 |- Components: Button, Input, Card
 |- Patterns: forms, navigation
 |- Usage guidelines`,
    sections: [
      {
        heading: 'Why consistency matters',
        text: 'When a primary button always looks and behaves the same way, users do not have to relearn it on each screen. Inconsistency creates confusion and mistakes.',
      },
      {
        heading: 'Components',
        text: 'A component is a reusable UI element such as a button, input field, or card. Components come in states: default, pressed, disabled, and error.',
      },
      {
        heading: 'Design tokens',
        text: 'Tokens are named values for colors, font sizes, and spacing. Using a token like "primary" instead of a raw hex code makes changes easy and consistent everywhere.',
      },
      {
        heading: 'Platform conventions',
        text: 'Follow patterns users already know, such as a back arrow at the top left or a tab bar at the bottom of mobile apps. Familiar patterns reduce learning time.',
      },
    ],
    keyPoints: [
      'Consistency makes interfaces predictable and faster to learn',
      'Components are reusable UI building blocks',
      'Tokens store shared colors, type sizes, and spacing',
      'Follow familiar platform conventions',
    ],
  },
  {
    id: 'design-fundamentals-responsive-mobile',
    title: 'Responsive & Mobile Design',
    subtitle: 'One product, many screens',
    contentTitle: 'Designing for every screen size',
    description:
      'People use products on phones, tablets, and desktops. Responsive design adapts a layout to the available screen size. Many teams start with mobile first, designing for the smallest screen and then expanding to larger ones.',
    code: `Phone     1 column
Tablet    2 columns
Desktop   3 or more columns

Same content, flexible layout.`,
    sections: [
      {
        heading: 'Mobile first',
        text: 'Designing for the small screen first forces you to focus on what is truly important. You can then add extra space and features for larger screens.',
      },
      {
        heading: 'Flexible layouts',
        text: 'Use flexible widths, relative units, and layouts that reflow rather than fixed sizes. Content should rearrange smoothly instead of being cut off.',
      },
      {
        heading: 'Breakpoints',
        text: 'A breakpoint is a screen width at which the layout changes, for example from one column to two. Choose breakpoints based on when your content starts to look wrong.',
      },
      {
        heading: 'Thumb-friendly design',
        text: 'On phones people use their thumbs. Put frequent actions within easy reach near the bottom of the screen and keep tap targets large and well spaced.',
      },
    ],
    keyPoints: [
      'Responsive design adapts the layout to the screen size',
      'Mobile first starts with the smallest screen',
      'Breakpoints are widths where the layout changes',
      'Keep key actions within easy thumb reach',
    ],
  },
];
