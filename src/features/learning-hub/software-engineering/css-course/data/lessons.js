// Lesson content only. Progress ("completed", "in progress") is NOT stored here:
// it comes from the lessons the user has completed in Supabase.
// ids are saved as lesson_id in Supabase, so don't rename them later.
export const LESSONS = [
  {
    id: 'css-1',
    title: 'CSS fundamentals',
    subtitle: 'Selectors, properties, and values',
    contentTitle: 'CSS basics',
    description:
      'CSS is used to style HTML elements. It controls colors, spacing, fonts, layouts, and the overall appearance of a webpage.',
    code: `body {
  background-color: white;
  color: black;
}`,
  },
  {
    id: 'css-2',
    title: 'Selectors',
    subtitle: 'Targeting HTML elements',
    contentTitle: 'CSS selectors',
    description:
      'Selectors are used to choose which HTML elements you want to style. Common selectors include element, class, and ID selectors.',
    code: `.title {
  color: purple;
  font-size: 24px;
}`,
  },
  {
    id: 'css-3',
    title: 'Box model',
    subtitle: 'Margin, border, padding, content',
    contentTitle: 'The CSS box model',
    description:
      'Every HTML element can be understood as a box. The box model contains content, padding, border, and margin.',
    code: `.card {
  padding: 20px;
  border: 1px solid gray;
  margin: 10px;
}`,
  },
  {
    id: 'css-4',
    title: 'Flexbox',
    subtitle: 'Creating flexible layouts',
    contentTitle: 'Flexbox layout',
    description:
      'Flexbox makes it easier to arrange elements in rows or columns and control their alignment and spacing.',
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
  },
  {
    id: 'css-5',
    title: 'Responsive design',
    subtitle: 'Making websites adapt',
    contentTitle: 'Responsive CSS',
    description:
      'Responsive design allows a webpage to adjust to different screen sizes using flexible layouts and media queries.',
    code: `@media (max-width: 600px) {
  .container {
    width: 100%;
  }
}`,
  },
  {
    id: 'css-6',
    title: 'Colors and backgrounds',
    subtitle: 'color, background-color, images',
    contentTitle: 'Add color to your page',
    description:
      'CSS can color text and backgrounds. The color property sets the text color, and background-color sets the color behind an element. Colors can be written as names like purple, as hex codes like #5b21f5, or with rgb(). The background-image property places an image behind an element.',
    code: `h1 {
  color: #5b21f5;
}

.banner {
  background-color: rgb(240, 235, 255);
  background-image: url('pattern.png');
}`,
  },
  {
    id: 'css-7',
    title: 'Fonts and text',
    subtitle: 'font-family, font-size, line-height',
    contentTitle: 'Style your text',
    description:
      'font-family picks the typeface, and you should list a fallback such as sans-serif in case the first font is missing. font-size sets the size and font-weight sets how bold the text is. text-align aligns the text, and line-height sets the space between lines. A line-height of about 1.5 makes paragraphs easier to read.',
    code: `p {
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
}`,
  },
  {
    id: 'css-8',
    title: 'Display and position',
    subtitle: 'block, inline, relative, absolute',
    contentTitle: 'Control how elements are laid out',
    description:
      'The display property decides how an element behaves. A block element, such as a div, starts on a new line and takes the full width. An inline element, such as a span, only takes the space it needs. display: none hides an element completely. The position property moves elements: relative shifts an element from its normal place, absolute places it relative to its nearest positioned parent, and fixed keeps it in the same spot on the screen while scrolling.',
    code: `.hidden {
  display: none;
}

.card {
  position: relative;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}`,
  },
  {
    id: 'css-9',
    title: 'Pseudo-classes',
    subtitle: ':hover, :focus, :first-child',
    contentTitle: 'Style elements by their state',
    description:
      'A pseudo-class styles an element in a special state. It is added to a selector after a colon. :hover applies when the mouse is over an element, :focus applies when a field is selected, and :first-child selects the first child inside its parent. Pair :hover with the transition property to animate the change smoothly.',
    code: `button {
  background: #5b21f5;
  transition: background 0.3s;
}

button:hover {
  background: #3d0fc4;
}

li:first-child {
  font-weight: bold;
}`,
  },
  {
    id: 'css-10',
    title: 'CSS Grid',
    subtitle: 'Rows and columns layouts',
    contentTitle: 'Build layouts with a grid',
    description:
      'CSS Grid lays out items in rows and columns at the same time. Turn it on with display: grid on the parent. grid-template-columns defines the columns, and the fr unit shares the free space in equal parts. gap adds space between the rows and columns. Use Grid for page layouts and Flexbox for a single row or column.',
    code: `.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}`,
  },
];
