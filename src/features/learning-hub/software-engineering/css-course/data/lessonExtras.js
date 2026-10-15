// Interactive extras for each CSS lesson, matched by lesson id (ids must stay the same).
// lessons.js merges these into the lessons, so the original text content is untouched.
//
// TODO: fill in each `start` (seconds) from the chapter list in the YouTube description
// (e.g. chapter at 1:02:30 -> 3750). Until then every video starts at the beginning.

const VIDEO_ID = 'OXGznpKZ_sA'; // freeCodeCamp.org: CSS Tutorial - Full Course for Beginners (Dave Gray)

const video = (chapter, start = 0) => ({
  id: VIDEO_ID,
  start,
  chapter,
  title: 'CSS Tutorial – Full Course for Beginners',
  channel: 'freeCodeCamp.org (Dave Gray)',
});

// References are in APA 7th style (LessonReferences shows text + link)
const w3 = (title, page) => ({
  text: `W3Schools. (n.d.). ${title}.`,
  url: `https://www.w3schools.com/css/${page}`,
});
const mdn = (title, path) => ({
  text: `MDN Web Docs. (n.d.). ${title}.`,
  url: `https://developer.mozilla.org/en-US/docs/Web/CSS/${path}`,
});
const videoRef = {
  text: 'Gray, D. (2022). CSS tutorial – Full course for beginners [Video]. freeCodeCamp.org.',
  url: `https://youtu.be/${VIDEO_ID}`,
};

const BOX = '.box{background:#ddd0ff;padding:12px;margin:4px;border-radius:6px}';
const CELLS = '.gallery div{background:#ddd0ff;padding:16px;text-align:center;border-radius:6px}';

export const EXTRAS = {
  'css-1': {
    video: video('Start Here'),
    activities: [
      {
        type: 'playground',
        title: 'Style the page',
        task: 'Change the background to lightyellow and the text color to purple, then press Run.',
        html: '<h1>Hello CSS</h1><p>Style me!</p>',
        starter: 'body {\n  background-color: white;\n  color: black;\n}',
        checks: [/background(?:-color)?\s*:\s*lightyellow/i, /\bcolor\s*:\s*purple\b/i],
        hint: 'Use background-color: lightyellow; and color: purple;',
      },
      {
        type: 'quickCheck',
        question: 'In "color: red;", which part is the property?',
        options: ['color', 'red', ';', ':'],
        correct: 0,
        hint: 'The property is the name of the style you change. The value comes after the colon.',
        explanation: 'color is the property and red is its value.',
      },
    ],
    references: [w3('CSS introduction', 'css_intro.asp'), mdn('CSS syntax', 'Syntax'), videoRef],
  },

  'css-2': {
    video: video('Selectors', 3750),
    activities: [
      {
        type: 'playground',
        title: 'Target by class',
        task: 'Make everything with the class "title" 32px in font-size.',
        html: '<h1 class="title">Title</h1><p>Plain text</p><p class="title">Another title</p>',
        starter: '.title {\n  color: purple;\n}',
        checks: [/\.title/i, /font-size\s*:\s*32px/i],
        hint: 'Add font-size: 32px; inside the .title rule.',
      },
      {
        type: 'quickCheck',
        question: 'Which selector targets the element with id="main"?',
        options: ['.main', '#main', 'main', '*main'],
        correct: 1,
        hint: 'IDs start with the # symbol.',
        explanation: '#main targets the id. A class selector starts with a dot instead.',
      },
    ],
    references: [w3('CSS selectors', 'css_selectors.asp'), mdn('CSS selectors', 'CSS_selectors'), videoRef],
  },

  'css-3': {
    video: video('Box Model'),
    activities: [
      {
        type: 'playground',
        title: 'Resize the box',
        task: 'Set the padding to 40px and make the border 3px solid purple.',
        html: '<div class="card">Box model card</div>',
        starter: '.card {\n  padding: 20px;\n  border: 1px solid gray;\n  margin: 10px;\n}',
        checks: [/padding\s*:\s*40px/i, /border\s*:\s*3px\s+solid\s+purple/i],
        hint: 'Try padding: 40px; and border: 3px solid purple;',
      },
      {
        type: 'quickCheck',
        question: 'Which part of the box model sits between the content and the border?',
        options: ['Margin', 'Padding', 'Outline', 'Gap'],
        correct: 1,
        hint: 'It is the space inside the element.',
        explanation: 'Padding is the space inside the border. Margin is outside it.',
      },
    ],
    references: [w3('CSS box model', 'css_boxmodel.asp'), mdn('CSS box model', 'CSS_box_model'), videoRef],
  },

  'css-4': {
    video: video('Flexbox'),
    activities: [
      {
        type: 'playground',
        title: 'Center with Flexbox',
        task: 'Center the three boxes horizontally using justify-content.',
        html: '<div class="container"><div class="box">1</div><div class="box">2</div><div class="box">3</div></div>',
        baseCss: `${BOX}.container{border:1px dashed #999;min-height:90px}`,
        starter: '.container {\n  display: flex;\n}',
        checks: [/display\s*:\s*flex/i, /justify-content\s*:\s*center/i],
        hint: 'Add justify-content: center; to .container.',
      },
      {
        type: 'quickCheck',
        question: 'Which property aligns flex items along the main axis?',
        options: ['align-items', 'justify-content', 'flex-wrap', 'order'],
        correct: 1,
        hint: 'The one you just used in the editor.',
        explanation: 'justify-content aligns items along the main axis. align-items uses the cross axis.',
      },
    ],
    references: [w3('CSS flexbox', 'css3_flexbox.asp'), mdn('CSS flexible box layout', 'CSS_flexible_box_layout'), videoRef],
  },

  'css-5': {
    video: video('Media Queries'),
    activities: [
      {
        type: 'playground',
        title: 'React to screen size',
        task: 'Your phone is narrower than 600px, so this query is active. Inside it, set font-size: 20px for .box.',
        html: '<div class="box">I change on small screens</div>',
        starter:
          '.box {\n  background: lightgray;\n  padding: 16px;\n}\n\n@media (max-width: 600px) {\n  .box {\n    background: plum;\n  }\n}',
        checks: [/@media\s*\(\s*max-width\s*:\s*600px\s*\)/i, /font-size\s*:\s*20px/i],
        hint: 'Add font-size: 20px; inside the .box rule that is inside @media.',
      },
      {
        type: 'quickCheck',
        question: 'Which rule applies styles only for certain screen sizes?',
        options: ['@screen', '@media', '@responsive', '@size'],
        correct: 1,
        hint: 'You just edited one in the editor.',
        explanation: '@media applies styles only when its condition, such as screen width, is true.',
      },
    ],
    references: [w3('CSS responsive web design introduction', 'css_rwd_intro.asp'), mdn('Using media queries', 'CSS_media_queries'), videoRef],
  },

  'css-6': {
    video: video('Colors'),
    activities: [
      {
        type: 'playground',
        title: 'Recolor the page',
        task: 'Make the h1 red and the banner background lightgreen.',
        html: '<h1>Colors</h1><div class="banner">Banner</div>',
        baseCss: '.banner{padding:20px}',
        starter: 'h1 {\n  color: #5b21f5;\n}\n\n.banner {\n  background-color: rgb(240, 235, 255);\n}',
        checks: [/h1\s*\{[^}]*color\s*:\s*red/i, /background(-color)?\s*:\s*lightgreen/i],
        hint: 'Change the h1 color to red and the banner background-color to lightgreen.',
      },
      {
        type: 'quickCheck',
        question: 'Which one is a valid hex color?',
        options: ['#5b21f5', '5b21f5#', 'hex(5b21f5)', '#5b21f5g'],
        correct: 0,
        hint: 'Hex colors start with # and use only 0-9 and a-f.',
        explanation: '#5b21f5 is valid. "g" is not a hex digit.',
      },
    ],
    references: [w3('CSS colors', 'css_colors.asp'), mdn('background', 'background'), videoRef],
  },

  'css-7': {
    video: video('Typography'),
    activities: [
      {
        type: 'playground',
        title: 'Style the paragraph',
        task: 'Center the text, set font-size to 20px, and line-height to 1.8.',
        html: '<p>The quick brown fox jumps over the lazy dog. Typography changes how this paragraph feels to read.</p>',
        starter: 'p {\n  font-family: Arial, sans-serif;\n  font-size: 16px;\n  line-height: 1.5;\n}',
        checks: [/text-align\s*:\s*center/i, /font-size\s*:\s*20px/i, /line-height\s*:\s*1\.8/i],
        hint: 'Three properties: text-align, font-size and line-height.',
      },
      {
        type: 'quickCheck',
        question: 'Why write "Arial, sans-serif" instead of just "Arial"?',
        options: [
          'sans-serif is a fallback if Arial is missing',
          'It makes the text bold',
          'It centers the text',
          'It increases the size',
        ],
        correct: 0,
        hint: 'Think about what happens if a device does not have Arial.',
        explanation: 'The browser uses the next font in the list when the first one is unavailable.',
      },
    ],
    references: [w3('CSS fonts', 'css_font.asp'), mdn('font-family', 'font-family'), videoRef],
  },

  'css-8': {
    video: video('Display, Position'),
    activities: [
      {
        type: 'playground',
        title: 'Hide an element',
        task: 'Hide the paragraph with class "hidden" using display. Watch the badge stay pinned to the card.',
        html: '<div class="card">Card <span class="badge">NEW</span></div><p class="hidden">Can you see me?</p>',
        baseCss: '.card{background:#eee;padding:24px;height:50px}.badge{background:#5b21f5;color:#fff;padding:2px 6px;border-radius:6px}',
        starter:
          '.card {\n  position: relative;\n}\n\n.badge {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}\n\n.hidden {\n  display: block;\n}',
        checks: [/\.hidden\s*\{[^}]*display\s*:\s*none/i],
        hint: 'Change display: block; to display: none; in the .hidden rule.',
      },
      {
        type: 'quickCheck',
        question: 'Which position value keeps an element in the same spot while scrolling?',
        options: ['relative', 'absolute', 'fixed', 'static'],
        correct: 2,
        hint: 'The element is fixed to the screen.',
        explanation: 'position: fixed stays in the same place on the screen while the page scrolls.',
      },
    ],
    references: [w3('CSS display and visibility', 'css_display_visibility.asp'), mdn('position', 'position'), videoRef],
  },

  'css-9': {
    video: video('Pseudo'),
    activities: [
      {
        type: 'playground',
        title: 'Style by state',
        task: 'Make the first list item bold using li:first-child. Tap the button in the preview to see :hover.',
        html: '<button class="btn">Tap me</button><ul><li>One</li><li>Two</li><li>Three</li></ul>',
        starter:
          '.btn {\n  background: #5b21f5;\n  color: white;\n  border: none;\n  padding: 10px 16px;\n}\n\n.btn:hover {\n  background: #3d0fc4;\n}',
        checks: [/li:first-child\s*\{[^}]*font-weight\s*:\s*(bold|700)/i],
        hint: 'Add a new rule: li:first-child { font-weight: bold; }',
      },
      {
        type: 'quickCheck',
        question: 'Which pseudo-class applies when a form field is selected?',
        options: [':hover', ':focus', ':first-child', ':active'],
        correct: 1,
        hint: 'The field is "in focus".',
        explanation: ':focus applies to the element that is currently selected, such as a text field.',
      },
    ],
    references: [w3('CSS pseudo-classes', 'css_pseudo_classes.asp'), mdn('Pseudo-classes', 'Pseudo-classes'), videoRef],
  },

  'css-10': {
    video: video('Grid Layout'),
    activities: [
      {
        type: 'playground',
        title: 'Reshape the grid',
        task: 'Change the grid to 2 columns and set the gap to 20px.',
        html: '<div class="gallery"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>',
        baseCss: CELLS,
        starter: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}',
        checks: [/repeat\(\s*2\s*,\s*1fr\s*\)/i, /gap\s*:\s*20px/i],
        hint: 'Use repeat(2, 1fr) and gap: 20px;',
      },
      {
        type: 'quickCheck',
        question: 'In a grid, what does 1fr mean?',
        options: ['One pixel', 'One equal share of the free space', 'One full row', 'One font size'],
        correct: 1,
        hint: 'fr stands for "fraction".',
        explanation: 'The fr unit splits the free space into equal parts.',
      },
    ],
    references: [w3('CSS grid intro', 'css_grid.asp'), mdn('CSS grid layout', 'CSS_grid_layout'), videoRef],
  },
};
