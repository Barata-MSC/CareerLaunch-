
// Keeps digits only, drops a leading 0 or pasted 63, and caps at 10 digits.
export function sanitizePhoneInput(text = '') {
  let digits = (text || '').replace(/[^0-9]/g, '');
  if (digits.startsWith('63') && digits.length > 10) digits = digits.substring(2);
  if (digits.startsWith('0')) digits = digits.substring(1);
  return digits.slice(0, 10);
}

// Gets the digits after +63 from whatever is stored ("+639123456789",
// "0912 345 6789", "9123456789" all give "9123456789"). Stored values are always
// "+63" + digits, so that prefix is removed first; otherwise the 63 would be
// read as part of the number and the field would keep adding it while typing.
export function getLocalNumber(phone = '') {
  const value = (phone || '').trim();
  if (value.startsWith('+63')) return sanitizePhoneInput(value.slice(3));
  return sanitizePhoneInput(value);
}

// Turns the typed digits into the stored value. Empty stays empty so the
// "required" check still works.
export function toStoredPhone(localDigits = '') {
  return localDigits ? `+63${localDigits}` : '';
}

// "+639123456789" -> "+63 912 345 6789" (used on the resume preview).
export function formatPhone(phone = '') {
  const local = getLocalNumber(phone);
  if (local.length !== 10) return phone;
  return `+63 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
}

// Returns an error message, or '' when the number is valid:
// exactly 10 digits after +63, starting with 9.
export function getPhoneError(phone = '') {
  const local = getLocalNumber(phone);
  if (!local) return 'Mobile number is required.';

  // Report every problem at once, e.g. "must start with 9 and be exactly 10 digits".
  const problems = [];
  if (local[0] !== '9') problems.push('start with 9');
  if (local.length < 10) problems.push('be exactly 10 digits');
  return problems.length ? `Mobile number must ${problems.join(' and ')}.` : '';
}

export function isPhoneValid(phone) {
  return getPhoneError(phone) === '';
}

// Personal Information counts as complete only when the name, email and a
// valid mobile number are all present.
export function isPersonalInfoComplete(info = {}) {
  return !!(info.fullName?.trim() && info.email?.trim() && isPhoneValid(info.phone));
}

export const REQUIRED_RESUME_SECTION_KEYS = ['personalInfo', 'education', 'skills'];

export function isResumeSectionComplete(sectionKey, resumeData = {}) {
  if (sectionKey === 'personalInfo') {
    return isPersonalInfoComplete(resumeData.personalInfo);
  }

  if (['education', 'skills', 'experience', 'certificates', 'projects'].includes(sectionKey)) {
    return Array.isArray(resumeData[sectionKey]) && resumeData[sectionKey].length > 0;
  }

  return false;
}

export function areRequiredResumeSectionsComplete(resumeData = {}) {
  return REQUIRED_RESUME_SECTION_KEYS.every((sectionKey) =>
    isResumeSectionComplete(sectionKey, resumeData),
  );
}