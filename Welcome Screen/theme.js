// theme.js
// Central place for colors, spacing and typography used across the
// CareerLaunch onboarding screen. Keeping these in one file makes it easy
// to re-theme the screen without touching component code.

export const colors = {
  black: '#141414',
  purple: '#5B21F5',       // primary brand purple (buttons, "Launch", tagline)
  purpleDark: '#4A17D6',
  rocketBlue: '#2F5BFF',   // rocket icon blue
  bubbleBg: '#EFF1FC',     // large soft circle behind the illustration
  badgeBg: '#FFFFFF',
  badgeShadow: 'rgba(30, 30, 60, 0.12)',
  skinTone: '#F2B389',
  hair: '#1F1B2E',
  hoodie: '#3448E0',
  hoodieDark: '#2534B0',
  phoneBody: '#22223A',
  white: '#FFFFFF',
  grayText: '#8A8A93',
  dot: '#C9CCEE',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  logo: 30,
  tagline: 30,
  button: 17,
  footer: 15,
};

export default { colors, spacing, typography };
