// Shared password policy. Used by RegisterScreen and ResetPasswordScreen.
// Edit the symbol list / regexes here to change the rules everywhere.

export const ALLOWED_SYMBOLS_TEXT = '! @ # $ % ^ & * ( ) _ + - = .';
const SYMBOL_REGEX = /[!@#$%^&*()_+\-=.]/;
const ALLOWED_CHARS_REGEX = /^[A-Za-z0-9!@#$%^&*()_+\-=.]+$/;

export const PASSWORD_RULES = [
  { key: 'length', label: 'At least 8 characters' },
  { key: 'upper', label: 'At least 1 uppercase letter (A-Z)' },
  { key: 'lower', label: 'At least 1 lowercase letter (a-z)' },
  { key: 'number', label: 'At least 1 number (0-9)' },
  { key: 'allowedChars', label: `Only letters, numbers and symbols: ${ALLOWED_SYMBOLS_TEXT}` },
];

export const getPasswordChecks = (pw) => ({
  length: pw.length >= 8,
  upper: /[A-Z]/.test(pw),
  lower: /[a-z]/.test(pw),
  number: /\d/.test(pw),
  allowedChars: ALLOWED_CHARS_REGEX.test(pw),
});

export const meetsAllRules = (pw) => Object.values(getPasswordChecks(pw)).every(Boolean);

// Weak: breaks a rule. Medium: meets every rule. Strong: meets every rule,
// is 10+ characters AND contains a symbol.
export const getPasswordStrength = (pw) => {
  if (!pw) return { level: 0, label: '', color: '#E3E3E8' };
  if (!meetsAllRules(pw)) return { level: 1, label: 'Weak', color: '#E5484D' };
  if (pw.length >= 10 && SYMBOL_REGEX.test(pw)) {
    return { level: 3, label: 'Strong', color: '#2E9E5B' };
  }
  return { level: 2, label: 'Medium', color: '#F5A524' };
};
