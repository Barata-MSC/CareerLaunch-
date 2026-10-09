// Lesson content only. Progress is NOT stored here: it comes from the lessons the
// user has completed in Supabase. ids are saved as lesson_id, so don't rename them later.
//
// Optional fields (shown by the updated shared LessonScreen):
//   sections:  [{ heading, text, code }]  extra explanations and code examples
//   keyPoints: [ 'short summary line', ... ]
export const LESSONS = [
  {
    id: "html-1",
    title: "What is HTML?",
    subtitle: "Tags, elements, and attributes",
    contentTitle: "HTML basics",
    description:
      "HTML stands for HyperText Markup Language. It describes the structure of a web page: what is a heading, a paragraph, a list, a link, or an image. HTML does not control how a page looks (that is CSS) or how it behaves (that is JavaScript).",
    code: `<h1>Hello, world!</h1>
<p>This is my first web page.</p>`,
    sections: [
      {
        heading: "Elements and tags",
        text:
          "Most elements have an opening tag, content, and a closing tag. The closing tag starts with a forward slash. Together they make one element.",
        code: `<p>I am a paragraph.</p>`,
      },
      {
        heading: "Attributes",
        text:
          "Attributes add extra information to an element. They are written inside the opening tag as name=\"value\" pairs.",
        code: `<a href="https://example.com" target="_blank">
  Visit Example
</a>`,
      },
      {
        heading: "Empty elements",
        text:
          "Some elements have no content and no closing tag, such as <br> (line break), <hr> (horizontal line), and <img> (image).",
        code: `<p>First line<br>Second line</p>
<hr>`,
      },
    ],
    keyPoints: [
      "HTML describes the structure and meaning of content",
      "An element is an opening tag, content, and a closing tag",
      "Attributes go in the opening tag as name=\"value\"",
      "CSS handles looks and JavaScript handles behavior",
    ],
  },
  {
    id: "html-2",
    title: "Page structure",
    subtitle: "Doctype, head, and body",
    contentTitle: "The HTML skeleton",
    description:
      "Every HTML page follows the same skeleton. The head holds information about the page, and the body holds everything the user sees in the browser.",
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
  </body>
</html>`,
    sections: [
      {
        heading: "The doctype and html element",
        text:
          "<!DOCTYPE html> tells the browser to use modern HTML. The <html> element wraps the whole page, and its lang attribute sets the page language.",
        code: `<!DOCTYPE html>
<html lang="en">
  ...
</html>`,
      },
      {
        heading: "What goes in the head",
        text:
          "The head is not shown on the page. It holds the title (shown in the browser tab), the character encoding, the viewport setting for phones, and links to CSS files.",
        code: `<head>
  <meta charset="UTF-8">
  <meta name="viewport"
    content="width=device-width, initial-scale=1">
  <title>My Page</title>
  <link rel="stylesheet" href="style.css">
</head>`,
      },
      {
        heading: "The body",
        text:
          "Everything visible goes in the body: headings, text, images, links, and forms. A page has only one body.",
        code: `<body>
  <h1>Welcome</h1>
  <p>Nice to meet you.</p>
</body>`,
      },
    ],
    keyPoints: [
      "<!DOCTYPE html> goes first and enables modern HTML",
      "The head holds information; the body holds visible content",
      "<title> sets the text shown in the browser tab",
      "Set lang on <html> to declare the page language",
    ],
  },
  {
    id: "html-3",
    title: "Text and headings",
    subtitle: "Headings, paragraphs, and emphasis",
    contentTitle: "Writing text in HTML",
    description:
      "Headings and paragraphs give your text structure. Headings run from <h1> (most important) to <h6> (least important), and paragraphs use <p>.",
    code: `<h1>Fruit guide</h1>
<h2>Apples</h2>
<p>Apples are <strong>crunchy</strong>
and <em>sweet</em>.</p>`,
    sections: [
      {
        heading: "Heading levels",
        text:
          "Use one <h1> per page for the main title, then <h2> for sections and <h3> for subsections. Do not skip levels, so the page reads like an outline.",
        code: `<h1>Recipes</h1>
<h2>Breakfast</h2>
<h3>Pancakes</h3>
<h2>Dinner</h2>`,
      },
      {
        heading: "Emphasis",
        text:
          "<strong> marks important text and is usually bold. <em> adds emphasis and is usually italic. <mark> highlights text. Choose them for meaning, not just for looks.",
        code: `<p>This is <strong>important</strong>,
this is <em>emphasized</em>,
and this is <mark>highlighted</mark>.</p>`,
      },
      {
        heading: "Line breaks and dividers",
        text:
          "<br> forces a new line inside a paragraph, and <hr> draws a horizontal line between sections. Use separate <p> elements for separate paragraphs instead of many <br> tags.",
        code: `<p>Line one<br>Line two</p>
<hr>
<p>A new section starts here.</p>`,
      },
    ],
    keyPoints: [
      "Use one <h1> and keep heading levels in order",
      "<p> is for paragraphs",
      "<strong> means important and <em> means emphasis",
      "Use <br> for line breaks and <hr> for dividers",
    ],
  },
  {
    id: "html-4",
    title: "Links and images",
    subtitle: "Anchors, src, and alt text",
    contentTitle: "Links and images",
    description:
      "Links connect web pages, and images make them visual. Links use the <a> (anchor) element with an href attribute. Images use the <img> element with src and alt attributes.",
    code: `<a href="https://example.com">Visit Example</a>
<img src="cat.jpg" alt="A cat sleeping on a sofa">`,
    sections: [
      {
        heading: "Links",
        text:
          "The href attribute holds the destination. It can be a full web address or a relative path to another file in your site. To open a link in a new tab, add target=\"_blank\" with rel=\"noopener\".",
        code: `<a href="about.html">About us</a>
<a href="https://example.com"
   target="_blank" rel="noopener">
  Example
</a>`,
      },
      {
        heading: "Images",
        text:
          "src is the image file and alt is a text description used by screen readers and shown if the image fails to load. <img> is an empty element, so it has no closing tag. Width and height help the page load smoothly.",
        code: `<img src="images/team.jpg"
     alt="Four developers at a meeting"
     width="400" height="250">`,
      },
      {
        heading: "Jump links and email links",
        text:
          "A link that starts with # jumps to the element with that id on the same page. A link that starts with mailto: opens the user's email app.",
        code: `<a href="#contact">Go to contact</a>
<h2 id="contact">Contact</h2>
<a href="mailto:hello@example.com">
  Email us
</a>`,
      },
    ],
    keyPoints: [
      "<a href> creates a link",
      "<img> needs src and alt",
      "<img> has no closing tag",
      "Use # for jump links and mailto: for email links",
    ],
  },
  {
    id: "html-5",
    title: "Lists and tables",
    subtitle: "Ordered lists, unordered lists, and tables",
    contentTitle: "Lists and tables",
    description:
      "Lists group related items. Use <ul> for an unordered (bulleted) list and <ol> for an ordered (numbered) list. Each item goes inside an <li> element.",
    code: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`,
    sections: [
      {
        heading: "Ordered lists",
        text:
          "Use <ol> when the order matters, such as steps in a recipe. The browser numbers the items automatically.",
        code: `<ol>
  <li>Open the editor</li>
  <li>Write your HTML</li>
  <li>Open it in a browser</li>
</ol>`,
      },
      {
        heading: "Tables",
        text:
          "Tables show data in rows and columns. <table> wraps the table, <tr> is a row, <th> is a header cell, and <td> is a data cell. Use tables for data, not for page layout.",
        code: `<table>
  <tr>
    <th>Language</th>
    <th>Use</th>
  </tr>
  <tr>
    <td>HTML</td>
    <td>Structure</td>
  </tr>
</table>`,
      },
      {
        heading: "Table sections",
        text:
          "For larger tables, group rows with <thead> for the header, <tbody> for the main data, and <tfoot> for totals. Add <caption> to describe the table, and use colspan to merge cells across columns.",
        code: `<table>
  <caption>Course schedule</caption>
  <thead>
    <tr><th>Day</th><th>Topic</th></tr>
  </thead>
  <tbody>
    <tr><td>Mon</td><td>HTML</td></tr>
  </tbody>
</table>`,
      },
    ],
    keyPoints: [
      "<ul> is bulleted and <ol> is numbered",
      "Every list item goes in an <li>",
      "<tr> is a row, <th> a header cell, <td> a data cell",
      "Use tables for data, not for layout",
    ],
  },
  {
    id: "html-6",
    title: "Semantic HTML",
    subtitle: "Meaningful structure",
    contentTitle: "Semantic elements",
    description:
      "Semantic elements describe the meaning of the content they wrap. Search engines, screen readers, and other developers use that meaning to understand your page. For example, <nav> tells everyone that its links are for navigation.",
    code: `<header>
  <h1>My Blog</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <p>Welcome!</p>
</main>
<footer>My Blog 2026</footer>`,
    sections: [
      {
        heading: "Page landmarks",
        text:
          "<header> is the intro area, <nav> holds the main navigation links, <main> holds the main content (use it once per page), and <footer> holds closing information such as contact details.",
        code: `<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>`,
      },
      {
        heading: "Grouping content",
        text:
          "<section> groups related content, usually with a heading. <article> is self-contained content like a blog post. <aside> holds side content related to the main content, such as tips or related links.",
        code: `<main>
  <article>
    <h2>First post</h2>
    <p>Hello!</p>
  </article>
  <aside>Related posts</aside>
</main>`,
      },
      {
        heading: "div and span",
        text:
          "<div> and <span> have no meaning. <div> is a block that groups elements and <span> is an inline wrapper for part of a text. Use them only when no semantic element fits, for example to group items for styling.",
        code: `<div class="card">
  <p>Total: <span class="price">$5</span></p>
</div>`,
      },
    ],
    keyPoints: [
      "Semantic tags describe what content is",
      "Use <main> once per page for the primary content",
      "Prefer <nav>, <header>, and <footer> over generic <div>s",
      "Use <div> and <span> only when nothing semantic fits",
    ],
  },
  {
    id: "html-7",
    title: "Forms",
    subtitle: "Collecting user input",
    contentTitle: "HTML forms",
    description:
      "Forms let users send information, such as signing up, searching, or logging in. The <form> element wraps the form controls, and a submit button sends the data.",
    code: `<form action="/signup" method="post">
  <label for="name">Name</label>
  <input id="name" name="name" type="text">
  <button type="submit">Sign up</button>
</form>`,
    sections: [
      {
        heading: "Labels",
        text:
          "Every control needs a <label>. The label's for attribute must match the id of its input. This links them, so tapping the label focuses the field and screen readers announce it.",
        code: `<label for="email">Email</label>
<input id="email" name="email"
       type="email">`,
      },
      {
        heading: "Common controls",
        text:
          "<input> is a single-line field and has no closing tag. <textarea> is for longer text. <select> with <option> elements makes a dropdown. <button type=\"submit\"> sends the form.",
        code: `<label for="msg">Message</label>
<textarea id="msg" name="msg"></textarea>

<label for="level">Level</label>
<select id="level" name="level">
  <option>Beginner</option>
  <option>Advanced</option>
</select>`,
      },
      {
        heading: "Sending data",
        text:
          "The action attribute is where the data is sent, and method is how: get puts data in the URL, post sends it in the request body (better for passwords). Only fields with a name attribute are sent. Use <fieldset> and <legend> to group related controls.",
        code: `<fieldset>
  <legend>Contact details</legend>
  <input name="phone" type="tel">
</fieldset>`,
      },
    ],
    keyPoints: [
      "Wrap controls in a <form> with a submit button",
      "Match each label's for to an input id",
      "action says where to send, method says how",
      "Fields need a name attribute to be sent",
    ],
  },
  {
    id: "html-8",
    title: "Input types and validation",
    subtitle: "Types, required, and patterns",
    contentTitle: "Input types and validation",
    description:
      "The type attribute changes how an input works. Choosing the right type gives users the right keyboard on phones and lets the browser check the value for you.",
    code: `<input type="email" name="email" required>
<input type="password" name="pw" minlength="8">
<input type="number" name="age" min="13" max="120">`,
    sections: [
      {
        heading: "Input types",
        text:
          "text is the default. email expects an email address, password hides the characters, number allows only numbers, date shows a date picker, and tel is for phone numbers.",
        code: `<input type="text">
<input type="email">
<input type="password">
<input type="number">
<input type="date">`,
      },
      {
        heading: "Built-in validation",
        text:
          "required stops the form from submitting if the field is empty. minlength and maxlength limit text length, min and max limit numbers, and pattern checks the value against a regular expression. placeholder only shows a hint and does not replace a label.",
        code: `<input name="code"
       type="text"
       pattern="[A-Z]{3}"
       placeholder="ABC"
       required>`,
      },
      {
        heading: "Choices",
        text:
          "Checkboxes let users pick any number of options. Radio buttons let users pick only one, and radio buttons in the same group share the same name.",
        code: `<input type="checkbox" id="news"
       name="news">
<label for="news">Send me news</label>

<input type="radio" name="plan"
       value="free"> Free
<input type="radio" name="plan"
       value="pro"> Pro`,
      },
    ],
    keyPoints: [
      "Pick the input type that matches the data",
      "required, minlength, min, max, and pattern validate input",
      "placeholder is a hint, not a label",
      "Radio buttons in a group share the same name",
    ],
  },
  {
    id: "html-9",
    title: "Accessibility basics",
    subtitle: "Making pages usable for everyone",
    contentTitle: "Accessibility",
    description:
      "Accessible pages work for everyone, including people who use screen readers, navigate with a keyboard, or have low vision. Most accessibility comes from writing good, semantic HTML.",
    code: `<img src="team.jpg"
     alt="Four developers at a standup meeting">

<!-- Decorative image: empty alt -->
<img src="divider.png" alt="">`,
    sections: [
      {
        heading: "Alt text",
        text:
          "Give every meaningful image alt text that describes what it shows. If an image is purely decorative, use an empty alt (alt=\"\") so screen readers skip it.",
        code: `<img src="chart.png"
     alt="Sales grew 20% in 2026">`,
      },
      {
        heading: "Links and buttons",
        text:
          "Link text should make sense on its own, because screen reader users often browse a list of links. Use <a> to go somewhere and <button> to do something. When a button has only an icon, add an aria-label.",
        code: `<!-- Avoid -->
<a href="/guide">Click here</a>

<!-- Better -->
<a href="/guide">Read the HTML guide</a>

<button aria-label="Close">X</button>`,
      },
      {
        heading: "Headings, language, and keyboard",
        text:
          "Keep headings in a logical order and set lang on <html> so screen readers use the right pronunciation. Make sure everything works with the keyboard (Tab and Enter), and use enough color contrast between text and background.",
        code: `<html lang="en">
  <body>
    <h1>Page title</h1>
    <h2>Section</h2>
  </body>
</html>`,
      },
    ],
    keyPoints: [
      "Add descriptive alt text to meaningful images",
      "Use descriptive link text and the right element for the job",
      "Set lang, keep headings in order, and check contrast",
      "Test your page using only the keyboard",
    ],
  },
  {
    id: "html-10",
    title: "Best practices",
    subtitle: "Clean, valid, and search-friendly HTML",
    contentTitle: "HTML best practices",
    description:
      "Good HTML is clean, valid, and easy for other people to read. Following a few simple habits makes your pages easier to maintain and helps search engines understand them.",
    code: `<!-- Page header -->
<head>
  <title>Learn HTML | CareerLaunch</title>
  <meta name="description"
    content="A beginner guide to HTML.">
</head>`,
    sections: [
      {
        heading: "Write clean code",
        text:
          "Indent nested elements, use lowercase tag names, put quotes around attribute values, and always close your tags. Add comments with <!-- --> to explain parts of your page. Browsers do not show comments.",
        code: `<!-- Main menu -->
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>`,
      },
      {
        heading: "Search-friendly pages",
        text:
          "Give each page a unique <title> and a short meta description, use a single <h1>, write descriptive alt text and link text, and prefer semantic elements. These help search engines and people.",
        code: `<title>HTML Forms | CareerLaunch</title>
<meta name="description"
  content="Learn how to build forms.">`,
      },
      {
        heading: "Performance and checking",
        text:
          "Keep CSS in an external file with <link>, set width and height on images, and use loading=\"lazy\" for images far down the page so they load only when needed. Check your page with the W3C validator to catch mistakes.",
        code: `<link rel="stylesheet" href="style.css">
<img src="photo.jpg" alt="Mountain at sunrise"
     width="600" height="400"
     loading="lazy">`,
      },
    ],
    keyPoints: [
      "Indent, use lowercase, quote attributes, and close tags",
      "Comments use <!-- --> and are not shown on the page",
      "Unique titles and meta descriptions help search",
      "Validate your HTML to catch errors",
    ],
  },
];
