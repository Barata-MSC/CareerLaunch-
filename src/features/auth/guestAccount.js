// Everything about guest accounts that more than one screen needs.
//
// A guest signs up with a username and a password. Supabase Auth needs an email
// for that, so we build a private one from the username (jane_doe becomes
// jane_doe@<GUEST_EMAIL_DOMAIN>). That address never receives mail and is never
// shown to the guest.
//
// GUEST_EMAIL_DOMAIN is the one setting to change if Supabase refuses it.
// ".invalid" is a reserved ending that can never belong to anyone, so no
// password-reset mail can ever reach a stranger. If Supabase says the address is
// invalid, switch this to a domain you control (for example guest.yourdomain.com).
export const GUEST_EMAIL_DOMAIN = 'guest.careerlaunch.invalid';

export const USERNAME_MIN = 2;
export const USERNAME_MAX = 30;

// Letters, numbers, underscore and hyphen only, so the username is always a
// valid first half of an email address.
const USERNAME_PATTERN = /^[A-Za-z0-9_-]+$/;

// Returns an error message, or '' when the username is fine.
export const validateGuestUsername = (raw) => {
  const name = (raw || '').trim();

  if (name.length < USERNAME_MIN) {
    return `Please enter a username (at least ${USERNAME_MIN} characters)`;
  }
  if (name.length > USERNAME_MAX) {
    return `Username can be at most ${USERNAME_MAX} characters`;
  }
  if (!USERNAME_PATTERN.test(name)) {
    return 'Use only letters, numbers, underscores and hyphens';
  }
  return '';
};

// Same username in any letter case gives the same address, matching the
// case-insensitive check in is_guest_username_taken.
export const guestEmailFromUsername = (username) =>
  `${(username || '').trim().toLowerCase()}@${GUEST_EMAIL_DOMAIN}`;

export const isGuestEmail = (email) =>
  typeof email === 'string' && email.trim().toLowerCase().endsWith(`@${GUEST_EMAIL_DOMAIN}`);

// A guest is either an old anonymous account or a username-and-password account
// carrying the is_guest flag. The flag lives in the sign-up data and is only used
// to decide what the app shows, never to grant access to anything.
export const isGuestUser = (user) =>
  !!user && (!!user.is_anonymous || user.user_metadata?.is_guest === true);
