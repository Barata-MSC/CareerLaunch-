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
];
