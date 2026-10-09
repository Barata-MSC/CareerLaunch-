// 100 questions: 10 per lesson. Each quiz attempt shows 10 of them (one per lesson,
// picked at random - see quizSize in course.js and pickQuizQuestions in courseUtils.js).
// lessonId links a question to the lesson to review when it is missed.
export const QUESTIONS = [
  {
    lessonId: "html-1",
    question: "What does HTML stand for?",
    answers: [
      "High Tech Modern Language",
      "HyperText Markup Language",
      "Hyperlinks and Text Management Language",
      "Home Tool Markup Language",
    ],
    correct: 1,
    explanation:
      "HTML stands for HyperText Markup Language. It describes the structure of web pages.",
  },
  {
    lessonId: "html-1",
    question: "What does HTML describe about a web page?",
    answers: [
      "Its structure and content",
      "Its colors and fonts",
      "Its animations",
      "Its database",
    ],
    correct: 0,
    explanation:
      "HTML describes structure and meaning. CSS handles the look, and JavaScript handles behavior.",
  },
  {
    lessonId: "html-1",
    question: "Which is a correctly written paragraph element?",
    answers: [
      "<p>Hello<p>",
      "</p>Hello<p>",
      "<paragraph>Hello</paragraph>",
      "<p>Hello</p>",
    ],
    correct: 3,
    explanation:
      "An element needs an opening tag and a closing tag that starts with a slash: <p>Hello</p>.",
  },
  {
    lessonId: "html-1",
    question: "In <a href=\"page.html\">, what is href?",
    answers: [
      "A closing tag",
      "An element",
      "An attribute",
      "A comment",
    ],
    correct: 2,
    explanation:
      "href is an attribute. Its value, page.html, is the destination of the link.",
  },
  {
    lessonId: "html-1",
    question: "Where are attributes written?",
    answers: [
      "Inside the closing tag",
      "After the closing tag",
      "Inside the opening tag",
      "Only in a separate file",
    ],
    correct: 2,
    explanation:
      "Attributes go inside the opening tag as name=\"value\" pairs.",
  },
  {
    lessonId: "html-1",
    question: "Which language is used to style a web page?",
    answers: [
      "HTML",
      "CSS",
      "SQL",
      "JSON",
    ],
    correct: 1,
    explanation:
      "CSS controls colors, spacing, fonts, and layout. HTML only describes structure.",
  },
  {
    lessonId: "html-1",
    question: "Which element has no closing tag?",
    answers: [
      "<br>",
      "<p>",
      "<h1>",
      "<div>",
    ],
    correct: 0,
    explanation:
      "<br> is an empty element. Others like <img> and <hr> are also empty elements.",
  },
  {
    lessonId: "html-1",
    question: "What is the closing tag for <h1>?",
    answers: [
      "<h1/>",
      "</h>",
      "<end h1>",
      "</h1>",
    ],
    correct: 3,
    explanation:
      "A closing tag repeats the tag name with a forward slash: </h1>.",
  },
  {
    lessonId: "html-1",
    question: "An HTML element is made up of what?",
    answers: [
      "Only a CSS rule",
      "A JavaScript function",
      "A file name and an extension",
      "An opening tag, content, and a closing tag",
    ],
    correct: 3,
    explanation:
      "Most elements consist of an opening tag, some content, and a closing tag.",
  },
  {
    lessonId: "html-1",
    question: "Which file extension is normally used for a web page written in HTML?",
    answers: [
      ".css",
      ".js",
      ".html",
      ".png",
    ],
    correct: 2,
    explanation:
      "HTML pages are saved with the .html extension, for example index.html.",
  },
  {
    lessonId: "html-2",
    question: "What is the purpose of <!DOCTYPE html>?",
    answers: [
      "It adds a title to the page",
      "It tells the browser to use modern HTML",
      "It links a CSS file",
      "It creates a heading",
    ],
    correct: 1,
    explanation:
      "The doctype goes first on the page and puts the browser in standards mode for modern HTML.",
  },
  {
    lessonId: "html-2",
    question: "Where does the content that users see on a page go?",
    answers: [
      "<body>",
      "<head>",
      "<meta>",
      "<title>",
    ],
    correct: 0,
    explanation:
      "The <body> holds all visible content. The <head> holds information about the page.",
  },
  {
    lessonId: "html-2",
    question: "Which element sets the text shown in the browser tab?",
    answers: [
      "<title>",
      "<h1>",
      "<header>",
      "<meta>",
    ],
    correct: 0,
    explanation:
      "The <title> element inside <head> sets the page name shown in the browser tab.",
  },
  {
    lessonId: "html-2",
    question: "Which meta tag sets the character encoding?",
    answers: [
      "<meta lang=\"UTF-8\">",
      "<meta type=\"text\">",
      "<meta name=\"charset\">",
      "<meta charset=\"UTF-8\">",
    ],
    correct: 3,
    explanation:
      "<meta charset=\"UTF-8\"> tells the browser how to read the text, so special characters display correctly.",
  },
  {
    lessonId: "html-2",
    question: "What does the viewport meta tag help with?",
    answers: [
      "Adding a page title",
      "Loading images faster",
      "Scaling the page correctly on phones",
      "Hiding the page from search engines",
    ],
    correct: 2,
    explanation:
      "The viewport setting makes the page match the device width so it displays well on mobile screens.",
  },
  {
    lessonId: "html-2",
    question: "Which attribute on <html> declares the page language?",
    answers: [
      "language",
      "lang",
      "type",
      "dir",
    ],
    correct: 1,
    explanation:
      "lang=\"en\" tells browsers and screen readers the language of the page.",
  },
  {
    lessonId: "html-2",
    question: "Which element links an external CSS file?",
    answers: [
      "<style src>",
      "<link>",
      "<script>",
      "<css>",
    ],
    correct: 1,
    explanation:
      "<link rel=\"stylesheet\" href=\"style.css\"> goes in the head and connects a stylesheet.",
  },
  {
    lessonId: "html-2",
    question: "What is the correct order inside <html>?",
    answers: [
      "<head> first, then <body>",
      "<body> first, then <head>",
      "<title> then <footer>",
      "Only <body> is allowed",
    ],
    correct: 0,
    explanation:
      "The head comes first with information about the page, followed by the body with the visible content.",
  },
  {
    lessonId: "html-2",
    question: "Is the content inside <head> displayed on the page?",
    answers: [
      "Yes, it appears at the top",
      "Yes, but only on phones",
      "Only when the user scrolls",
      "No, except the title in the browser tab",
    ],
    correct: 3,
    explanation:
      "The head holds information such as the title, meta tags, and links. It is not displayed in the page area.",
  },
  {
    lessonId: "html-2",
    question: "Which element wraps the entire HTML page?",
    answers: [
      "<body>",
      "<head>",
      "<html>",
      "<main>",
    ],
    correct: 2,
    explanation:
      "The <html> element is the root. It contains the head and the body.",
  },
  {
    lessonId: "html-3",
    question: "Which heading level is the most important?",
    answers: [
      "<h6>",
      "<h3>",
      "<h1>",
      "<head>",
    ],
    correct: 2,
    explanation:
      "<h1> is the top-level heading. <h6> is the least important.",
  },
  {
    lessonId: "html-3",
    question: "How many <h1> elements should a page normally have?",
    answers: [
      "Six",
      "One",
      "None",
      "As many as possible",
    ],
    correct: 1,
    explanation:
      "Use a single <h1> for the main title so the page has a clear outline.",
  },
  {
    lessonId: "html-3",
    question: "Which element marks text as important?",
    answers: [
      "<strong>",
      "<small>",
      "<br>",
      "<span>",
    ],
    correct: 0,
    explanation:
      "<strong> marks text with strong importance and is usually shown in bold.",
  },
  {
    lessonId: "html-3",
    question: "Which element adds emphasis and is usually shown in italics?",
    answers: [
      "<strong>",
      "<mark>",
      "<hr>",
      "<em>",
    ],
    correct: 3,
    explanation:
      "<em> stresses a word or phrase. It is usually displayed in italics.",
  },
  {
    lessonId: "html-3",
    question: "Which element creates a line break?",
    answers: [
      "<lb>",
      "<break>",
      "<hr>",
      "<br>",
    ],
    correct: 3,
    explanation:
      "<br> breaks the line inside a paragraph. <hr> draws a horizontal rule.",
  },
  {
    lessonId: "html-3",
    question: "Which element creates a paragraph?",
    answers: [
      "<para>",
      "<text>",
      "<p>",
      "<pg>",
    ],
    correct: 2,
    explanation:
      "<p> is the paragraph element.",
  },
  {
    lessonId: "html-3",
    question: "Which element highlights text like a marker?",
    answers: [
      "<highlight>",
      "<mark>",
      "<em>",
      "<hr>",
    ],
    correct: 1,
    explanation:
      "<mark> highlights text, usually with a yellow background.",
  },
  {
    lessonId: "html-3",
    question: "Why should you not skip heading levels (for example h1 to h4)?",
    answers: [
      "It breaks the page outline for readers and screen readers",
      "The browser will crash",
      "The text will disappear",
      "CSS will stop working",
    ],
    correct: 0,
    explanation:
      "Headings form an outline. Skipping levels makes the structure confusing, especially for assistive tools.",
  },
  {
    lessonId: "html-3",
    question: "How many heading levels does HTML have?",
    answers: [
      "Six (h1 to h6)",
      "Three",
      "Four",
      "Ten",
    ],
    correct: 0,
    explanation:
      "HTML provides six heading levels, from <h1> to <h6>.",
  },
  {
    lessonId: "html-3",
    question: "Which element draws a horizontal line between sections?",
    answers: [
      "<br>",
      "<line>",
      "<divider>",
      "<hr>",
    ],
    correct: 3,
    explanation:
      "<hr> is a thematic break and is shown as a horizontal line.",
  },
  {
    lessonId: "html-4",
    question: "Which element creates a link?",
    answers: [
      "<link>",
      "<href>",
      "<a>",
      "<url>",
    ],
    correct: 2,
    explanation:
      "The <a> (anchor) element creates links. <link> in the head connects files like stylesheets.",
  },
  {
    lessonId: "html-4",
    question: "Which attribute holds the destination of a link?",
    answers: [
      "src",
      "href",
      "alt",
      "target",
    ],
    correct: 1,
    explanation:
      "href stands for hypertext reference and holds the destination address.",
  },
  {
    lessonId: "html-4",
    question: "Which element displays an image?",
    answers: [
      "<image>",
      "<img>",
      "<picture-src>",
      "<src>",
    ],
    correct: 1,
    explanation:
      "<img> embeds an image. It is an empty element.",
  },
  {
    lessonId: "html-4",
    question: "Which attribute gives the file location of an image?",
    answers: [
      "src",
      "href",
      "alt",
      "link",
    ],
    correct: 0,
    explanation:
      "src is the source of the image file, such as images/cat.jpg.",
  },
  {
    lessonId: "html-4",
    question: "What is the alt attribute used for?",
    answers: [
      "Setting the image size",
      "Adding a border",
      "Linking to another page",
      "A text description of the image",
    ],
    correct: 3,
    explanation:
      "alt text is read by screen readers and shown if the image cannot load.",
  },
  {
    lessonId: "html-4",
    question: "How do you open a link in a new tab?",
    answers: [
      "new=\"tab\"",
      "open=\"blank\"",
      "target=\"_blank\"",
      "href=\"_new\"",
    ],
    correct: 2,
    explanation:
      "target=\"_blank\" opens the link in a new tab. Add rel=\"noopener\" for safety.",
  },
  {
    lessonId: "html-4",
    question: "Which href opens the user's email app?",
    answers: [
      "email:hello@example.com",
      "href:hello@example.com",
      "mailto:hello@example.com",
      "send:hello@example.com",
    ],
    correct: 2,
    explanation:
      "A link that starts with mailto: opens the default email app with that address.",
  },
  {
    lessonId: "html-4",
    question: "Which is a relative link to a file in the same folder?",
    answers: [
      "<a href=\"C:/about.html\">",
      "<a href=\"about.html\">",
      "<a src=\"about.html\">",
      "<a link=\"about.html\">",
    ],
    correct: 1,
    explanation:
      "A relative link points to another file in your site, such as about.html.",
  },
  {
    lessonId: "html-4",
    question: "Does the <img> element need a closing tag?",
    answers: [
      "No, it is an empty element",
      "Yes, </img>",
      "Yes, </image>",
      "Only on phones",
    ],
    correct: 0,
    explanation:
      "<img> has no content, so it has no closing tag.",
  },
  {
    lessonId: "html-4",
    question: "What does href=\"#contact\" do?",
    answers: [
      "Opens a contact page in a new tab",
      "Sends an email",
      "Downloads a file",
      "Jumps to the element with id=\"contact\" on the same page",
    ],
    correct: 3,
    explanation:
      "A link starting with # scrolls to the element with the matching id on the current page.",
  },
  {
    lessonId: "html-5",
    question: "Which element creates a bulleted list?",
    answers: [
      "<ol>",
      "<li>",
      "<list>",
      "<ul>",
    ],
    correct: 3,
    explanation:
      "<ul> is an unordered list. Browsers show it with bullets by default.",
  },
  {
    lessonId: "html-5",
    question: "Which element creates a numbered list?",
    answers: [
      "<ul>",
      "<nl>",
      "<ol>",
      "<dl>",
    ],
    correct: 2,
    explanation:
      "<ol> is an ordered list, numbered automatically.",
  },
  {
    lessonId: "html-5",
    question: "Which element defines a list item?",
    answers: [
      "<item>",
      "<li>",
      "<ul>",
      "<td>",
    ],
    correct: 1,
    explanation:
      "Each item in a <ul> or <ol> is wrapped in an <li>.",
  },
  {
    lessonId: "html-5",
    question: "Which element creates a table row?",
    answers: [
      "<tr>",
      "<td>",
      "<th>",
      "<row>",
    ],
    correct: 0,
    explanation:
      "<tr> stands for table row.",
  },
  {
    lessonId: "html-5",
    question: "Which element is a table header cell?",
    answers: [
      "<th>",
      "<td>",
      "<head>",
      "<thead-cell>",
    ],
    correct: 0,
    explanation:
      "<th> marks a header cell. It is usually bold and centered.",
  },
  {
    lessonId: "html-5",
    question: "Which element is a regular table data cell?",
    answers: [
      "<th>",
      "<tr>",
      "<cell>",
      "<td>",
    ],
    correct: 3,
    explanation:
      "<td> stands for table data.",
  },
  {
    lessonId: "html-5",
    question: "When should you use a table?",
    answers: [
      "To position the page layout",
      "To add a background image",
      "To show data in rows and columns",
      "To make text bold",
    ],
    correct: 2,
    explanation:
      "Tables are for tabular data. Page layout should be done with CSS.",
  },
  {
    lessonId: "html-5",
    question: "Which element groups the header rows of a table?",
    answers: [
      "<header>",
      "<thead>",
      "<top>",
      "<tablehead>",
    ],
    correct: 1,
    explanation:
      "<thead> groups header rows. <tbody> groups the main rows and <tfoot> groups the footer rows.",
  },
  {
    lessonId: "html-5",
    question: "Which element gives a table a title?",
    answers: [
      "<title>",
      "<caption>",
      "<legend>",
      "<h1>",
    ],
    correct: 1,
    explanation:
      "<caption> describes the table and helps accessibility.",
  },
  {
    lessonId: "html-5",
    question: "Which attribute lets a cell span several columns?",
    answers: [
      "colspan",
      "rowwidth",
      "merge",
      "span-all",
    ],
    correct: 0,
    explanation:
      "colspan makes a cell stretch across multiple columns. rowspan does the same for rows.",
  },
  {
    lessonId: "html-6",
    question: "Which element should wrap the main navigation links of a page?",
    answers: [
      "<div>",
      "<section>",
      "<aside>",
      "<nav>",
    ],
    correct: 3,
    explanation:
      "<nav> is the semantic element for navigation links. It helps screen readers and search engines understand your layout.",
  },
  {
    lessonId: "html-6",
    question: "Which element holds the main content and should be used only once per page?",
    answers: [
      "<article>",
      "<section>",
      "<main>",
      "<footer>",
    ],
    correct: 2,
    explanation:
      "<main> marks the primary content of the page. There should be only one per page.",
  },
  {
    lessonId: "html-6",
    question: "Which element is best for closing information such as copyright?",
    answers: [
      "<header>",
      "<aside>",
      "<footer>",
      "<main>",
    ],
    correct: 2,
    explanation:
      "<footer> holds closing information like copyright or contact details.",
  },
  {
    lessonId: "html-6",
    question: "Which element is best for a self-contained blog post?",
    answers: [
      "<span>",
      "<article>",
      "<nav>",
      "<footer>",
    ],
    correct: 1,
    explanation:
      "<article> is for content that makes sense on its own, such as a post or news story.",
  },
  {
    lessonId: "html-6",
    question: "Which element is for side content related to the main content?",
    answers: [
      "<aside>",
      "<section>",
      "<main>",
      "<header>",
    ],
    correct: 0,
    explanation:
      "<aside> holds related but secondary content, such as tips or related links.",
  },
  {
    lessonId: "html-6",
    question: "Which element is the intro area at the top of a page or section?",
    answers: [
      "<head>",
      "<top>",
      "<intro>",
      "<header>",
    ],
    correct: 3,
    explanation:
      "<header> holds introductory content. It is different from <head>, which holds page information.",
  },
  {
    lessonId: "html-6",
    question: "What does a <div> element tell the browser about its content?",
    answers: [
      "That it is navigation",
      "That it is the main content",
      "That it is a heading",
      "Nothing, it has no meaning",
    ],
    correct: 3,
    explanation:
      "<div> is a generic container with no semantic meaning. Use semantic elements when one fits.",
  },
  {
    lessonId: "html-6",
    question: "Which element groups related content, usually with a heading?",
    answers: [
      "<span>",
      "<br>",
      "<section>",
      "<meta>",
    ],
    correct: 2,
    explanation:
      "<section> groups a themed part of the page, typically introduced by a heading.",
  },
  {
    lessonId: "html-6",
    question: "Why use semantic elements?",
    answers: [
      "They make the page load faster",
      "They help accessibility and search engines understand the page",
      "They change the font",
      "They replace CSS",
    ],
    correct: 1,
    explanation:
      "Semantic elements describe meaning, which helps screen readers, search engines, and developers.",
  },
  {
    lessonId: "html-6",
    question: "What is the difference between <div> and <span>?",
    answers: [
      "<div> is a block container and <span> is an inline wrapper",
      "<div> is for text and <span> is for images",
      "They are exactly the same",
      "<span> is a block and <div> is inline",
    ],
    correct: 0,
    explanation:
      "<div> groups blocks of content, while <span> wraps a small part of text inside a line.",
  },
  {
    lessonId: "html-7",
    question: "Which element wraps the controls of a form?",
    answers: [
      "<form>",
      "<input>",
      "<controls>",
      "<fieldset-wrap>",
    ],
    correct: 0,
    explanation:
      "The <form> element contains the controls and sends their data when submitted.",
  },
  {
    lessonId: "html-7",
    question: "How do you link a <label> to its input?",
    answers: [
      "Give both the same class",
      "Place the label after the input",
      "Use the href attribute",
      "Match the label's for to the input's id",
    ],
    correct: 3,
    explanation:
      "The label's for attribute must match the input's id. This links them for clicks and screen readers.",
  },
  {
    lessonId: "html-7",
    question: "Which element creates a multi-line text box?",
    answers: [
      "<input type=\"text\">",
      "<textbox>",
      "<textarea>",
      "<multiline>",
    ],
    correct: 2,
    explanation:
      "<textarea> lets users type longer text over several lines.",
  },
  {
    lessonId: "html-7",
    question: "Which elements create a dropdown list?",
    answers: [
      "<dropdown> with <item>",
      "<select> with <option>",
      "<input> with <list>",
      "<ul> with <li>",
    ],
    correct: 1,
    explanation:
      "<select> creates the dropdown and each <option> is one choice.",
  },
  {
    lessonId: "html-7",
    question: "Which button type submits the form?",
    answers: [
      "<button type=\"send-form\">",
      "<button type=\"submit\">",
      "<button type=\"go\">",
      "<button type=\"link\">",
    ],
    correct: 1,
    explanation:
      "A button with type=\"submit\" sends the form. It is also the default type inside a form.",
  },
  {
    lessonId: "html-7",
    question: "What does the action attribute of a form specify?",
    answers: [
      "Where the data is sent",
      "How the form looks",
      "The label text",
      "The input type",
    ],
    correct: 0,
    explanation:
      "action is the URL that receives the form data.",
  },
  {
    lessonId: "html-7",
    question: "Which method is better for sending a password?",
    answers: [
      "get",
      "fetch",
      "show",
      "post",
    ],
    correct: 3,
    explanation:
      "post sends data in the request body. get puts it in the URL, which is visible.",
  },
  {
    lessonId: "html-7",
    question: "Why does an input need a name attribute?",
    answers: [
      "To style the field",
      "To make it required",
      "Only fields with a name are sent with the form",
      "To set its label",
    ],
    correct: 2,
    explanation:
      "The name is the key used when the form data is sent.",
  },
  {
    lessonId: "html-7",
    question: "Which element groups related form controls?",
    answers: [
      "<group>",
      "<box>",
      "<fieldset>",
      "<formgroup>",
    ],
    correct: 2,
    explanation:
      "<fieldset> groups related controls, and <legend> gives the group a caption.",
  },
  {
    lessonId: "html-7",
    question: "Is <input> an empty element with no closing tag?",
    answers: [
      "No, it needs </input>",
      "Yes",
      "Only for text inputs",
      "Only inside a fieldset",
    ],
    correct: 1,
    explanation:
      "<input> has no content, so it does not have a closing tag.",
  },
  {
    lessonId: "html-8",
    question: "Which input type expects an email address?",
    answers: [
      "type=\"email\"",
      "type=\"mail\"",
      "type=\"text-email\"",
      "type=\"at\"",
    ],
    correct: 0,
    explanation:
      "type=\"email\" lets the browser check the format and show a suitable keyboard on phones.",
  },
  {
    lessonId: "html-8",
    question: "Which input type hides the characters that are typed?",
    answers: [
      "type=\"hidden-text\"",
      "type=\"secret\"",
      "type=\"mask\"",
      "type=\"password\"",
    ],
    correct: 3,
    explanation:
      "type=\"password\" shows dots or stars instead of the typed characters.",
  },
  {
    lessonId: "html-8",
    question: "Which input type allows only numbers?",
    answers: [
      "type=\"digits\"",
      "type=\"integer\"",
      "type=\"num-text\"",
      "type=\"number\"",
    ],
    correct: 3,
    explanation:
      "type=\"number\" restricts the field to numeric values and supports min and max.",
  },
  {
    lessonId: "html-8",
    question: "Which input type lets the user pick any number of options?",
    answers: [
      "type=\"radio\"",
      "type=\"option\"",
      "type=\"checkbox\"",
      "type=\"multi\"",
    ],
    correct: 2,
    explanation:
      "Checkboxes can be ticked independently. Radio buttons allow only one choice in a group.",
  },
  {
    lessonId: "html-8",
    question: "How do radio buttons belong to the same group?",
    answers: [
      "They share the same id",
      "They share the same name",
      "They are inside a <ul>",
      "They have the same value",
    ],
    correct: 1,
    explanation:
      "Radio buttons with the same name attribute act as one group where only one can be selected.",
  },
  {
    lessonId: "html-8",
    question: "What does the required attribute do?",
    answers: [
      "Stops the form from submitting if the field is empty",
      "Makes the text bold",
      "Hides the field",
      "Sets a default value",
    ],
    correct: 0,
    explanation:
      "required tells the browser to block submission until the field is filled in.",
  },
  {
    lessonId: "html-8",
    question: "Which attribute sets the minimum number of characters in a text field?",
    answers: [
      "minlength",
      "min",
      "smallest",
      "lengthmin",
    ],
    correct: 0,
    explanation:
      "minlength sets the minimum length for text. min is for numeric values.",
  },
  {
    lessonId: "html-8",
    question: "Which attribute checks a value against a regular expression?",
    answers: [
      "match",
      "regex",
      "format",
      "pattern",
    ],
    correct: 3,
    explanation:
      "pattern accepts a regular expression the value must match.",
  },
  {
    lessonId: "html-8",
    question: "What is the placeholder attribute for?",
    answers: [
      "Replacing the label",
      "Making the field required",
      "Showing a hint inside an empty field",
      "Naming the field",
    ],
    correct: 2,
    explanation:
      "placeholder shows a short hint. It does not replace a <label>.",
  },
  {
    lessonId: "html-8",
    question: "Which input type shows a date picker?",
    answers: [
      "type=\"calendar\"",
      "type=\"date\"",
      "type=\"day\"",
      "type=\"time-date\"",
    ],
    correct: 1,
    explanation:
      "type=\"date\" shows a date picker in most browsers.",
  },
  {
    lessonId: "html-9",
    question: "What is the purpose of alt text on an image?",
    answers: [
      "To resize the image",
      "To describe the image for people who cannot see it",
      "To add a link",
      "To make the image load faster",
    ],
    correct: 1,
    explanation:
      "alt text is read by screen readers and shown if the image fails to load.",
  },
  {
    lessonId: "html-9",
    question: "What alt value should a purely decorative image have?",
    answers: [
      "An empty alt (alt=\"\")",
      "alt=\"image\"",
      "alt=\"decorative picture\"",
      "No img tag at all",
    ],
    correct: 0,
    explanation:
      "An empty alt tells screen readers to skip the image.",
  },
  {
    lessonId: "html-9",
    question: "Which link text is best for accessibility?",
    answers: [
      "Click here",
      "Read more",
      "Link",
      "Read the HTML accessibility guide",
    ],
    correct: 3,
    explanation:
      "Descriptive link text makes sense even when read out of context.",
  },
  {
    lessonId: "html-9",
    question: "Which element should be used for an action like opening a menu?",
    answers: [
      "<a href=\"#\">",
      "<span>",
      "<button>",
      "<div>",
    ],
    correct: 2,
    explanation:
      "Use <button> to do something and <a> to go somewhere. Buttons work with the keyboard by default.",
  },
  {
    lessonId: "html-9",
    question: "What does the lang attribute on <html> help with?",
    answers: [
      "Making the page load faster",
      "Changing the font",
      "Screen readers pronounce the text correctly",
      "Blocking translation",
    ],
    correct: 2,
    explanation:
      "lang tells assistive technology and browsers which language the page uses.",
  },
  {
    lessonId: "html-9",
    question: "Why should headings be kept in order?",
    answers: [
      "It makes the text bigger",
      "Screen reader users navigate the page by headings",
      "It adds colors",
      "It is required for CSS",
    ],
    correct: 1,
    explanation:
      "A logical heading order gives the page a clear outline for everyone.",
  },
  {
    lessonId: "html-9",
    question: "Which keys help someone test keyboard accessibility?",
    answers: [
      "Tab and Enter",
      "Ctrl and P",
      "F5 and F12",
      "Caps Lock and Shift",
    ],
    correct: 0,
    explanation:
      "Users should be able to reach and activate every control with Tab and Enter.",
  },
  {
    lessonId: "html-9",
    question: "What does aria-label provide?",
    answers: [
      "A new color",
      "A tooltip for the mouse only",
      "A link to another page",
      "An accessible name for an element such as an icon button",
    ],
    correct: 3,
    explanation:
      "aria-label gives a text name to elements that have no visible text.",
  },
  {
    lessonId: "html-9",
    question: "Why does every form input need a label?",
    answers: [
      "Labels change the input type",
      "Labels are required for CSS",
      "Labels make fields required",
      "Screen readers announce the label with the field",
    ],
    correct: 3,
    explanation:
      "Labels tell users what to enter and make fields easier to tap.",
  },
  {
    lessonId: "html-9",
    question: "Why is color contrast important?",
    answers: [
      "It makes pages load faster",
      "It is needed for search engines",
      "Text must be readable for people with low vision",
      "It changes the HTML structure",
    ],
    correct: 2,
    explanation:
      "Enough contrast between text and background keeps content readable for everyone.",
  },
  {
    lessonId: "html-10",
    question: "How do you write a comment in HTML?",
    answers: [
      "// This is a comment",
      "<!-- This is a comment -->",
      "/* This is a comment */",
      "# This is a comment",
    ],
    correct: 1,
    explanation:
      "HTML comments start with <!-- and end with -->. Browsers do not display them.",
  },
  {
    lessonId: "html-10",
    question: "Where does the meta description go?",
    answers: [
      "In the <head>",
      "In the <footer>",
      "Inside an <h1>",
      "After </html>",
    ],
    correct: 0,
    explanation:
      "<meta name=\"description\"> goes inside <head>. Search engines may show it under your page title.",
  },
  {
    lessonId: "html-10",
    question: "Why should nested elements be indented?",
    answers: [
      "It makes the code easier to read",
      "It makes the page load faster",
      "The browser requires it",
      "It changes how the page looks",
    ],
    correct: 0,
    explanation:
      "Indentation shows the structure of the page and helps people read and maintain the code.",
  },
  {
    lessonId: "html-10",
    question: "Which is the recommended way to write tag names?",
    answers: [
      "Uppercase only",
      "Mixed case",
      "Random case",
      "Lowercase",
    ],
    correct: 3,
    explanation:
      "Lowercase tag names are the common convention and keep your code consistent.",
  },
  {
    lessonId: "html-10",
    question: "How should attribute values be written?",
    answers: [
      "Without any quotes",
      "Inside curly braces",
      "Inside quotes",
      "Inside angle brackets",
    ],
    correct: 2,
    explanation:
      "Putting attribute values in quotes avoids errors, especially with values that contain spaces.",
  },
  {
    lessonId: "html-10",
    question: "Which tool checks your HTML for errors?",
    answers: [
      "A spell checker",
      "The W3C validator",
      "An image editor",
      "A database tool",
    ],
    correct: 1,
    explanation:
      "The W3C Markup Validator finds mistakes such as unclosed tags and invalid attributes.",
  },
  {
    lessonId: "html-10",
    question: "What does loading=\"lazy\" do on an image?",
    answers: [
      "Makes the image blurry",
      "Loads the image only when it is near the screen",
      "Hides the image",
      "Loads the image twice",
    ],
    correct: 1,
    explanation:
      "Lazy loading saves bandwidth by loading images only when the user scrolls near them.",
  },
  {
    lessonId: "html-10",
    question: "What makes a good page title?",
    answers: [
      "A unique, descriptive title for each page",
      "The same title on every page",
      "A very long list of keywords",
      "An empty title",
    ],
    correct: 0,
    explanation:
      "A unique title helps people and search engines tell pages apart.",
  },
  {
    lessonId: "html-10",
    question: "Where is CSS best kept for a larger site?",
    answers: [
      "Inside every paragraph",
      "In the <title>",
      "Inside the <body> only",
      "In an external file linked with <link>",
    ],
    correct: 3,
    explanation:
      "An external stylesheet keeps your HTML clean and lets many pages share the same styles.",
  },
  {
    lessonId: "html-10",
    question: "Which option is better for page structure?",
    answers: [
      "Many nested <div> elements only",
      "Tables for layout",
      "Semantic elements such as <nav> and <main>",
      "Comments",
    ],
    correct: 2,
    explanation:
      "Semantic elements communicate meaning, improving accessibility, search, and readability.",
  },
];
