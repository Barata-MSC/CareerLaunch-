

const VIDEOS = {
  course: {
    id: 'kUMe1FH4CHE',
    title: 'Learn HTML – Full tutorial for beginners',
    channel: 'freeCodeCamp.org',
    author: 'Dave Gray',
    date: '2022, March 9',
  },
};

// Which video each lesson shows. Every lesson uses the full course until you change it.
const VIDEO_FOR = {
  'html-1': ['course'],
  'html-2': ['course'],
  'html-3': ['course'],
  'html-4': ['course'],
  'html-5': ['course'],
  'html-6': ['course'],
  'html-7': ['course'],
  'html-8': ['course'],
  'html-9': ['course'],
  'html-10': ['course'],
};

// References are in APA 7th style (LessonReferences shows text + link).
// W3Schools and MDN pages show no publication date, so they use (n.d.).
const w3 = (title, page) => ({
  text: `W3Schools. (n.d.). ${title}.`,
  url: `https://www.w3schools.com/HTML/${page}`,
});
const mdn = (title, path) => ({
  text: `MDN Web Docs. (n.d.). ${title}.`,
  url: `https://developer.mozilla.org/en-US/docs/${path}`,
});
const videoRef = (v) => ({
  text: `${v.channel}. (${v.date}). ${v.title} [Video]. YouTube.`,
  url: `https://youtu.be/${v.id}`,
});

const BASE = {
  'html-1': {
    activities: [
      {
        type: 'playground',
        mode: 'html',
        title: 'Make a link',
        task: 'Turn the text into a link to https://example.com by adding an href attribute.',
        starter: '<a>Visit Example</a>',
        checks: [/<a\s[^>]*href\s*=\s*["']https:\/\/example\.com\/?["'][^>]*>\s*visit example\s*<\/a>/i],
        hint: 'Put href="https://example.com" inside the opening <a> tag.',
      },
      {
        type: 'quickCheck',
        question: "In <a href=\"https://example.com\">Visit</a>, what is href?",
        options: ["An attribute", "An element", "A closing tag", "A heading"],
        correct: 0,
        hint: "It is written inside the opening tag as a name=\"value\" pair.",
        explanation: "href is an attribute. It adds extra information (the link address) to the <a> element.",
      },
    ],
    references: [w3('HTML introduction', 'html_intro.asp'), w3('HTML elements', 'html_elements.asp'), mdn('Basic HTML syntax', 'Learn_web_development/Core/Structuring_content/Basic_HTML_syntax')],
  },

  'html-2': {
    activities: [
      {
        type: 'playground',
        mode: 'html',
        title: 'Complete the page skeleton',
        task: 'Add a <title> with any text inside the <head>, and an <h1> heading inside the <body>.',
        starter: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n  </head>\n  <body>\n  </body>\n</html>',
        checks: [/<!doctype html>/i, /<head>.*<title>[^<]+<\/title>.*<\/head>/i, /<body>.*<h1>[^<]+<\/h1>.*<\/body>/i],
        hint: 'The <title> goes between <head> and </head>. The <h1> goes between <body> and </body>.',
      },
      {
        type: 'quickCheck',
        question: "Where do the page title and other page information (metadata) go?",
        options: ["Inside the <head>", "Inside the <body>", "After the closing </html> tag", "Inside the <footer>"],
        correct: 0,
        hint: "The head holds information about the page, not what the user sees.",
        explanation: "The <head> holds the title, character set and other metadata. The <body> holds the visible content.",
      },
    ],
    references: [w3('HTML basic', 'html_basic.asp'), w3('HTML head element', 'html_head.asp'), mdn("What's in the head? Web page metadata", 'Learn_web_development/Core/Structuring_content/Webpage_metadata')],
  },

  'html-3': {
    activities: [
      {
        type: 'playground',
        mode: 'html',
        title: 'Structure the text',
        task: 'Make "Fruit guide" a level 1 heading and make the word "crunchy" important with <strong>.',
        starter: 'Fruit guide\n<p>Apples are crunchy and sweet.</p>',
        checks: [/<h1>\s*fruit guide\s*<\/h1>/i, /<strong>\s*crunchy\s*<\/strong>/i],
        hint: 'Wrap Fruit guide in <h1>...</h1> and crunchy in <strong>...</strong>.',
      },
      {
        type: 'quickCheck',
        question: "Which element is the most important heading?",
        options: ["<h6>", "<h1>", "<header>", "<head>"],
        correct: 1,
        hint: "Heading levels run from 1 (most important) to 6 (least important).",
        explanation: "<h1> is the most important heading level and <h6> is the least important.",
      },
    ],
    references: [w3('HTML headings', 'html_headings.asp'), w3('HTML paragraphs', 'html_paragraphs.asp'), mdn('Headings and paragraphs', 'Learn_web_development/Core/Structuring_content/Headings_and_paragraphs')],
  },

  'html-4': {
    activities: [
      {
        type: 'playground',
        mode: 'html',
        title: 'Add alt text',
        task: 'Add the alt text "A sleeping cat" to the image. The preview shows it because cat.jpg does not exist.',
        starter: '<img src="cat.jpg">',
        checks: [/<img\s[^>]*alt\s*=\s*["']a sleeping cat["']/i],
        hint: 'Add alt="A sleeping cat" inside the <img> tag.',
      },
      {
        type: 'quickCheck',
        question: "Which attribute gives an image a text description for screen readers?",
        options: ["src", "alt", "href", "width"],
        correct: 1,
        hint: "It stands for \"alternative text\".",
        explanation: "alt holds the text description. It is also shown if the image cannot load.",
      },
    ],
    references: [w3('HTML links', 'html_links.asp'), w3('HTML images', 'html_images.asp'), mdn('Creating links', 'Learn_web_development/Core/Structuring_content/Creating_links'), mdn('HTML images', 'Learn_web_development/Core/Structuring_content/HTML_images')],
  },

  'html-5': {
    activities: [
      {
        type: 'playground',
        mode: 'html',
        title: 'Build a numbered list',
        task: 'Turn the three lines into a numbered list: wrap them in <ol> and give each line its own <li>.',
        starter: 'Open the editor\nWrite your HTML\nOpen it in a browser',
        checks: [/<ol>(\s*<li>[^<]+<\/li>){3}\s*<\/ol>/i],
        hint: 'Write <ol>, then three <li>...</li> lines, then </ol>.',
      },
      {
        type: 'quickCheck',
        question: "Which element creates a numbered (ordered) list?",
        options: ["<ul>", "<ol>", "<li>", "<table>"],
        correct: 1,
        hint: "The letters stand for \"ordered list\".",
        explanation: "<ol> makes a numbered list. <ul> makes a bulleted list, and each item goes inside an <li>.",
      },
    ],
    references: [w3('HTML lists', 'html_lists.asp'), w3('HTML tables', 'html_tables.asp'), mdn('Lists', 'Learn_web_development/Core/Structuring_content/Lists'), mdn('HTML table basics', 'Learn_web_development/Core/Structuring_content/HTML_table_basics')],
  },

  'html-6': {
    activities: [
      {
        type: 'playground',
        mode: 'html',
        title: 'Use semantic elements',
        task: 'Replace both <div> wrappers with the meaningful elements <header> and <footer>.',
        starter: '<div>\n  <h1>My Blog</h1>\n</div>\n<div>\n  <p>Copyright 2026</p>\n</div>',
        checks: [/<header>.*<\/header>/i, /<footer>.*<\/footer>/i, (text) => !text.includes('<div')],
        hint: 'Change the first div to header and the second to footer (opening and closing tags).',
      },
      {
        type: 'quickCheck',
        question: "Which element is best for the main navigation links of a page?",
        options: ["<nav>", "<div>", "<aside>", "<span>"],
        correct: 0,
        hint: "Choose the element whose name describes its meaning.",
        explanation: "<nav> is a semantic element for major navigation links. <div> and <span> have no meaning of their own.",
      },
    ],
    references: [w3('HTML semantic elements', 'html5_semantic_elements.asp'), w3('HTML block and inline elements', 'html_blocks.asp'), mdn('Structuring documents', 'Learn_web_development/Core/Structuring_content/Structuring_documents')],
  },

  'html-7': {
    activities: [
      {
        type: 'playground',
        mode: 'html',
        title: 'Connect a label',
        task: 'Give the input an id that matches the label\'s for value, so tapping the label focuses the input.',
        starter: '<label for="email">Email</label>\n<input type="text" name="email">',
        checks: [/<label\s[^>]*for\s*=\s*["']email["']/i, /<input\s[^>]*id\s*=\s*["']email["']/i],
        hint: 'Add id="email" to the <input> tag.',
      },
      {
        type: 'quickCheck',
        question: "How do you connect a <label> to its input?",
        options: ["The label's for matches the input's id", "The label's name matches the input's name", "Put both inside the same <p>", "The label's class matches the input's class"],
        correct: 0,
        hint: "One value in the label points to one value in the input.",
        explanation: "The label for attribute must equal the input id. Then tapping the label focuses the input.",
      },
    ],
    references: [w3('HTML forms', 'html_forms.asp'), w3('HTML form elements', 'html_form_elements.asp'), mdn('Forms and buttons in HTML', 'Learn_web_development/Core/Structuring_content/HTML_forms')],
  },

  'html-8': {
    activities: [
      {
        type: 'playground',
        mode: 'html',
        title: 'Choose the right input',
        task: 'Make this field an email field and require a value before the form can be submitted.',
        starter: '<input type="text" name="email">',
        checks: [/<input\s[^>]*type\s*=\s*["']email["']/i, /<input\s[^>]*\brequired\b/i],
        hint: 'Change type to "email" and add the required attribute.',
      },
      {
        type: 'quickCheck',
        question: "Which attribute stops a form from being submitted when a field is empty?",
        options: ["placeholder", "required", "type", "name"],
        correct: 1,
        hint: "It makes the field mandatory.",
        explanation: "required tells the browser the field must have a value. placeholder only shows a hint.",
      },
    ],
    references: [w3('HTML input types', 'html_form_input_types.asp'), w3('HTML input attributes', 'html_form_attributes.asp'), mdn('The HTML5 input types', 'Learn_web_development/Extensions/Forms/HTML5_input_types'), mdn('Client-side form validation', 'Learn_web_development/Extensions/Forms/Form_validation')],
  },

  'html-9': {
    activities: [
      {
        type: 'playground',
        mode: 'html',
        title: 'Make it accessible',
        task: 'Add helpful alt text (at least 3 characters) to the image and replace the link text "Click here" with a description of where it goes.',
        starter: '<img src="chart.png">\n<a href="/guide">Click here</a>',
        checks: [
          /<img\s[^>]*alt\s*=\s*["'][^"']{3,}["']/i,
          /<a\s[^>]*href\s*=\s*["']\/guide["'][^>]*>\s*[^<\s][^<]*<\/a>/i,
          (text) => !text.includes('click here'),
        ],
        hint: 'Try alt="Sales chart" and link text like "Read the HTML guide".',
      },
      {
        type: 'quickCheck',
        question: "What alt text should a purely decorative image have?",
        options: ["An empty alt (alt=\"\")", "The file name", "The word \"image\"", "No alt attribute at all"],
        correct: 0,
        hint: "Screen readers should skip images that add no information.",
        explanation: "An empty alt tells screen readers to skip a decorative image. A missing alt may make them read the file name.",
      },
    ],
    references: [w3('HTML accessibility', 'html_accessibility.asp'), mdn('Accessible HTML', 'Learn_web_development/Core/Accessibility/HTML')],
  },

  'html-10': {
    activities: [
      {
        type: 'playground',
        mode: 'html',
        title: 'Make the page search-friendly',
        task: 'Give the page a descriptive <title> and add a meta description of at least 10 characters inside the head.',
        starter: '<head>\n  <title></title>\n</head>',
        checks: [
          /<title>[^<]{3,}<\/title>/i,
          /<meta\s[^>]*name\s*=\s*["']description["']/i,
          /<meta\s[^>]*content\s*=\s*["'][^"']{10,}["']/i,
        ],
        hint: 'Add <meta name="description" content="A short summary of the page."> inside the head.',
      },
      {
        type: 'quickCheck',
        question: "What is a meta description mainly for?",
        options: ["A summary search engines can show in results", "Changing the page colors", "Making images load faster", "Adding keyboard shortcuts"],
        correct: 0,
        hint: "Think about what appears under a page title in search results.",
        explanation: "The meta description summarizes the page. Search engines may show it under the page title in results.",
      },
    ],
    references: [w3('HTML style guide', 'html5_syntax.asp'), w3('HTML head element', 'html_head.asp'), mdn('Web page metadata', 'Learn_web_development/Core/Structuring_content/Webpage_metadata'), mdn('Debugging HTML', 'Learn_web_development/Core/Structuring_content/Debugging_HTML')],
  },
};

// Attach each lesson's video and its reference.
export const EXTRAS = Object.fromEntries(
  Object.entries(BASE).map(([lessonId, extra]) => {
    const [key, start = 0, chapter] = VIDEO_FOR[lessonId] || ['course'];
    const v = VIDEOS[key];
    return [
      lessonId,
      {
        ...extra,
        video: {
          id: v.id,
          start,
          chapter,
          title: v.title,
          channel: v.author ? `${v.channel} (${v.author})` : v.channel,
        },
        references: [...extra.references, videoRef(v)],
      },
    ];
  }),
);
