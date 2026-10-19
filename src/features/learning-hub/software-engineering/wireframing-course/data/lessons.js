// Lesson content for the Wireframing course (UI/UX Designer track).
// lessonExtras.js adds activities and references by lesson id (ids must stay the same).
import { EXTRAS } from './lessonExtras';

const BASE_LESSONS = [
  {
    id: 'wireframing-what-is',
    title: 'What is a Wireframe?',
    subtitle: 'The blueprint of a screen',
    contentTitle: 'Structure before style',
    description:
      'A wireframe is a simple drawing of a screen that shows its layout, content, and functions without final colors, images, or fonts. Like the blueprint of a house, it lets you agree on structure before spending time on visual polish.',
    code: `Sketch     -> quick hand-drawn idea
Wireframe  -> layout and structure
Mockup     -> static visual design
Prototype  -> clickable simulation`,
    sections: [
      {
        heading: 'Why wireframe',
        text: 'Wireframes make it cheap to try ideas and change them. It is far easier to move a box on a wireframe than to rebuild a finished design or finished code.',
      },
      {
        heading: 'Levels of fidelity',
        text: 'Low-fidelity wireframes use plain boxes and labels. Mid-fidelity wireframes add more accurate spacing and real text. High-fidelity wireframes look close to the final product. Start low and add detail only when needed.',
      },
      {
        heading: 'Wireframe, mockup, prototype',
        text: 'A wireframe shows structure. A mockup adds colors, type, and images. A prototype makes screens clickable so you can test how it feels to use.',
      },
      {
        heading: 'What to leave out',
        text: 'Skip decoration. Focus on what is on the screen, where it goes, and what happens when someone taps or clicks.',
      },
    ],
    keyPoints: [
      'A wireframe shows layout and structure, not visual style',
      'Low fidelity is fast and easy to change',
      'Mockups add visuals; prototypes add interaction',
      'Start simple and add detail only when needed',
    ],
  },
  {
    id: 'wireframing-sketching',
    title: 'Sketching Ideas',
    subtitle: 'Think on paper first',
    contentTitle: 'Explore many ideas quickly',
    description:
      'Paper and pen are the fastest wireframing tools. Sketching lets you explore several layouts in minutes, share them with teammates, and throw away weak ideas without any cost. You do not need to draw well; you only need to show where things go.',
    code: `[ Logo ]        [ Menu ]
+------------------+
|   Hero image     |
+------------------+
[ Title ]
[ Button: Sign up ]`,
    sections: [
      {
        heading: 'Use simple shapes',
        text: 'Use boxes for images, lines for text, and rectangles for buttons. Add short labels so everyone understands each element.',
      },
      {
        heading: 'Draw many versions',
        text: 'Do not stop at your first idea. Quickly sketch several different layouts for the same screen, then compare them and pick the strongest.',
      },
      {
        heading: 'Use screen templates',
        text: 'Draw a phone outline or use a printed template so every sketch has the right proportions and you remember the real screen size.',
      },
      {
        heading: 'Share early',
        text: 'Show rough sketches to teammates and users. Early feedback is cheaper and more honest when the work clearly looks unfinished.',
      },
    ],
    keyPoints: [
      'Paper sketches are the fastest way to explore layouts',
      'Use boxes, lines, and short labels',
      'Draw several versions before choosing one',
      'Share rough work early for honest feedback',
    ],
  },
  {
    id: 'wireframing-information-architecture',
    title: 'Information Architecture',
    subtitle: 'Organize before you draw',
    contentTitle: 'Helping people find things',
    description:
      'Information architecture (IA) is how content is organized and labeled so people can find what they need. Good IA comes before detailed screens, because a beautiful layout cannot fix content that is hard to find.',
    code: `Home
 |- Courses
 |   |- Lessons
 |   |- Quizzes
 |- Profile
 |- Settings`,
    sections: [
      {
        heading: 'Sitemaps',
        text: 'A sitemap is a diagram of all the screens in a product and how they connect. It shows the hierarchy, from main sections down to detailed pages.',
      },
      {
        heading: 'Labels',
        text: 'Use words your users use. A clear label such as "My Courses" beats a clever or vague one. Keep names consistent across the product.',
      },
      {
        heading: 'Card sorting',
        text: 'In card sorting, participants group content cards in a way that makes sense to them. The results show how users think about your content.',
      },
      {
        heading: 'Keep it shallow',
        text: 'Important content should be reachable in few steps. Too many nested menus hide features and frustrate users.',
      },
    ],
    keyPoints: [
      'IA is how content is organized and labeled',
      'A sitemap shows screens and their hierarchy',
      'Card sorting reveals how users group content',
      'Use clear labels and keep navigation shallow',
    ],
  },
  {
    id: 'wireframing-user-flows',
    title: 'User Flows',
    subtitle: 'Map the path',
    contentTitle: 'From start to goal',
    description:
      'A user flow shows the steps a person takes to complete a task, such as signing up or buying something. Drawing the flow before the screens helps you find missing steps, dead ends, and unnecessary effort.',
    code: `(Start) -> [Open app] -> [Login screen]
        -> <Password correct?>
            yes -> [Home] -> (End)
            no  -> [Error] -> [Login screen]`,
    sections: [
      {
        heading: 'Flowchart shapes',
        text: 'Ovals mark the start and end. Rectangles are screens or steps. Diamonds are decisions with yes or no paths. Arrows show direction.',
      },
      {
        heading: 'Start with one goal',
        text: 'Pick a single task and map the shortest path to complete it. Then add alternate paths, such as errors or going back.',
      },
      {
        heading: 'Find friction',
        text: 'Count the steps. Each extra tap or form field is a chance for users to quit, so remove steps that do not help the goal.',
      },
      {
        heading: 'Connect flows to screens',
        text: 'Every rectangle in the flow becomes a wireframe. Check that each screen offers a clear way forward and a way back.',
      },
    ],
    keyPoints: [
      'A user flow maps the steps to complete a task',
      'Ovals, rectangles, and diamonds each have a meaning',
      'Fewer steps usually means less friction',
      'Every step in the flow needs a wireframe',
    ],
  },
  {
    id: 'wireframing-layout',
    title: 'Layout & Hierarchy',
    subtitle: 'Place content with purpose',
    contentTitle: 'Guide the eye',
    description:
      'Layout decides where each element goes and how much attention it gets. On a wireframe, use size, position, and spacing to show what matters most, so the most important content and action are easy to see.',
    code: `Top:     Title and key message
Middle:  Main content
Bottom:  Primary action

One screen = one main goal`,
    sections: [
      {
        heading: 'Grids',
        text: 'A grid aligns elements into columns and keeps spacing consistent. Aligned layouts look organized and are easier to scan.',
      },
      {
        heading: 'Content priority',
        text: 'List your content in order of importance, then give the top items the most size and the best position. Less important items can be smaller or lower.',
      },
      {
        heading: 'White space',
        text: 'Empty space separates groups and gives the eye a rest. Do not fill every gap just because there is room.',
      },
      {
        heading: 'Proximity and grouping',
        text: 'Place related items close together and separate unrelated groups. Users read nearby items as belonging together.',
      },
    ],
    keyPoints: [
      'Use a grid for alignment and consistent spacing',
      'Give the most important content the most prominence',
      'White space groups and separates content',
      'Related items belong close together',
    ],
  },
  {
    id: 'wireframing-components',
    title: 'UI Components & Patterns',
    subtitle: 'Reusable building blocks',
    contentTitle: 'Familiar parts users already know',
    description:
      'Most screens are built from common components such as buttons, forms, cards, lists, and navigation bars. Using familiar patterns helps users understand your design immediately, and it saves you from reinventing basic parts.',
    code: `Navigation: tab bar, back button, menu
Input:      text field, toggle, checkbox
Content:    card, list, image, header
Action:     primary and secondary buttons`,
    sections: [
      {
        heading: 'Navigation',
        text: 'A bottom tab bar suits three to five main sections on mobile. A back button returns to the previous screen. Keep navigation in the same place on every screen.',
      },
      {
        heading: 'Forms and inputs',
        text: 'Label every field, mark required ones, and ask only for information you really need. Shorter forms get completed more often.',
      },
      {
        heading: 'Cards and lists',
        text: 'Cards group related information into one block, such as a course with a title and progress. Lists show many similar items in a scannable way.',
      },
      {
        heading: 'Buttons',
        text: 'Use one clear primary button per screen and style secondary actions more quietly. Use action words such as "Save" or "Continue".',
      },
    ],
    keyPoints: [
      'Reuse familiar components and patterns',
      'Tab bars suit three to five main sections on mobile',
      'Keep forms short and fields clearly labeled',
      'One primary button per screen',
    ],
  },
  {
    id: 'wireframing-mobile',
    title: 'Wireframing for Mobile',
    subtitle: 'Small screens, thumbs, and taps',
    contentTitle: 'Designing for one hand',
    description:
      'Phones have small screens and people use them with their thumbs, often while moving. Mobile wireframes should keep content focused, make tap targets comfortable, and put frequent actions where thumbs can reach.',
    code: `Tap target:   about 44 x 44 points or larger
Easy reach:   lower half of the screen
Hard reach:   top corners
One screen -> one main purpose`,
    sections: [
      {
        heading: 'Focus on one goal',
        text: 'A small screen cannot hold everything. Show only what is needed for the current task and move the rest to other screens or menus.',
      },
      {
        heading: 'Thumb reach',
        text: 'Place the most used actions in the lower part of the screen where a thumb reaches easily. The top corners are harder to reach with one hand.',
      },
      {
        heading: 'Tap target size',
        text: 'Make buttons and links at least about 44 by 44 points and leave space between them, so people do not tap the wrong thing.',
      },
      {
        heading: 'Plan for different sizes',
        text: 'Phones come in many sizes. Use flexible layouts and test your wireframes on a small screen and a large one.',
      },
    ],
    keyPoints: [
      'Show only what the current task needs',
      'Put frequent actions within thumb reach',
      'Tap targets should be about 44 by 44 points or larger',
      'Check layouts on small and large phones',
    ],
  },
  {
    id: 'wireframing-annotations-states',
    title: 'Annotations & States',
    subtitle: 'Explain how it behaves',
    contentTitle: 'Beyond the happy path',
    description:
      'A wireframe shows what a screen looks like, but not always how it behaves. Annotations explain behavior in short notes, and state wireframes show what the screen looks like when something is empty, loading, or wrong.',
    code: `1. Tap "Save" -> shows spinner, then toast
2. Name field: required, max 40 characters
States: default | loading | empty | error`,
    sections: [
      {
        heading: 'Annotations',
        text: 'Number the elements and add short notes beside the wireframe. Explain what happens on tap, what is required, and any rules a developer needs to know.',
      },
      {
        heading: 'Screen states',
        text: 'Plan the empty state (no data yet), loading state (content on the way), error state (something went wrong), and success state. Users meet these often.',
      },
      {
        heading: 'Real content',
        text: 'Use realistic text and numbers instead of placeholder text. Real lengths show layout problems, such as a long name that breaks a card.',
      },
      {
        heading: 'Keep notes short',
        text: 'Annotations should be brief and clear. If a note needs a paragraph, the design may be too complicated.',
      },
    ],
    keyPoints: [
      'Annotations explain behavior and rules',
      'Design empty, loading, error, and success states',
      'Real content reveals layout problems early',
      'Keep notes short and clear',
    ],
  },
  {
    id: 'wireframing-testing',
    title: 'Testing Wireframes',
    subtitle: 'Learn before you build',
    contentTitle: 'Check ideas while they are cheap to change',
    description:
      'Wireframes are perfect for early testing, because users focus on structure and flow rather than visual polish. Even a paper version can show whether people understand your layout and can complete key tasks.',
    code: `Paper test  -> hand-drawn screens
Click-through -> linked wireframes
5-second test -> what do people remember?`,
    sections: [
      {
        heading: 'Paper and click-through tests',
        text: 'With paper, a teammate acts as the computer and swaps sheets when the user taps. With a click-through, wireframes are linked so users can tap through the flow.',
      },
      {
        heading: 'Give realistic tasks',
        text: 'Ask people to do a task, such as "Find your saved lessons", rather than asking if they like the design. Then watch where they hesitate.',
      },
      {
        heading: 'Five-second test',
        text: 'Show a screen for five seconds, then ask what they remember and what the screen was for. It reveals whether the main message is clear.',
      },
      {
        heading: 'Iterate',
        text: 'Fix the biggest problems, update the wireframes, and test again. A few short rounds beat one big test at the end.',
      },
    ],
    keyPoints: [
      'Wireframes can be tested before any code exists',
      'Give tasks and observe instead of asking opinions',
      'A five-second test checks if the message is clear',
      'Test, fix, and test again in short rounds',
    ],
  },
  {
    id: 'wireframing-handoff',
    title: 'From Wireframe to Design',
    subtitle: 'Moving to high fidelity',
    contentTitle: 'Know when you are ready',
    description:
      'Once the structure and flow work well in testing, you can add visual design. Good habits, such as clear naming, versioning, and critique, keep the work organized and make handoff to the next stage or to developers smooth.',
    code: `Checklist before high fidelity:
[x] Flow tested with users
[x] Key screens and states covered
[x] Feedback from team and stakeholders`,
    sections: [
      {
        heading: 'Readiness',
        text: 'Move to high fidelity when the structure is validated, key screens and states are covered, and feedback has been addressed. Adding polish too early wastes effort.',
      },
      {
        heading: 'Naming and versions',
        text: 'Name screens clearly, such as "Login - error state", and keep versions so you can see what changed and go back if needed.',
      },
      {
        heading: 'Design critique',
        text: 'A critique is structured feedback on a design. Focus on goals and user needs, not personal taste, and describe problems instead of prescribing fixes.',
      },
      {
        heading: 'Handoff',
        text: 'Share the wireframes, flows, and annotations so the next person understands the intent and the rules, not only the boxes.',
      },
    ],
    keyPoints: [
      'Add visual design only after structure is validated',
      'Name screens clearly and keep versions',
      'Critique focuses on goals, not taste',
      'Handoff shares intent along with the screens',
    ],
  },
];

// Merge the interactive extras (activities, references) into each lesson by id
export const LESSONS = BASE_LESSONS.map((lesson) => ({ ...lesson, ...(EXTRAS[lesson.id] || {}) }));
