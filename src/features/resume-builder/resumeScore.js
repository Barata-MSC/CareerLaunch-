import { isPhoneValid } from './validators';

export function getScoreBreakdown(resumeData) {
  const data = resumeData || {};
  const info = data.personalInfo || {};
  const edu = data.education || [];
  const skills = data.skills || [];
  const exp = data.experience || [];
  const certs = data.certificates || [];
  const projects = data.projects || [];

  const missingInfo = [];
  if (!info.fullName?.trim()) missingInfo.push('full name');
  if (!info.email?.trim()) missingInfo.push('email');
  if (!isPhoneValid(info.phone)) missingInfo.push('a valid +63 mobile number');
  if (!info.summary?.trim()) missingInfo.push('professional summary');

  const skillsLeft = Math.max(5 - skills.length, 0);

  return [
    {
      key: 'personalInfo',
      label: 'Personal Information',
      max: 25,
      earned:
        (info.fullName?.trim() ? 10 : 0) +
        (info.email?.trim() ? 5 : 0) +
        (isPhoneValid(info.phone) ? 5 : 0) +
        (info.summary?.trim() ? 5 : 0),
      tip: missingInfo.length ? `Still missing: ${missingInfo.join(', ')}.` : '',
    },
    {
      key: 'education',
      label: 'Education',
      max: 15,
      earned: (edu.length > 0 ? 10 : 0) + (edu.length > 1 ? 5 : 0),
      tip:
        edu.length === 0
          ? 'Add your education (+10).'
          : edu.length === 1
          ? 'Add another entry, e.g. senior high school (+5).'
          : '',
    },
    {
      key: 'skills',
      label: 'Skills',
      max: 20,
      earned: Math.min(skills.length * 4, 20),
      tip: skillsLeft
        ? `Add ${skillsLeft} more skill${skillsLeft === 1 ? '' : 's'} to earn full points.`
        : '',
    },
    {
      key: 'experience',
      label: 'Experience',
      max: 25,
      earned: (exp.length > 0 ? 15 : 0) + (exp.length > 1 ? 10 : 0),
      tip:
        exp.length === 0
          ? 'Add your first job or internship (+15).'
          : exp.length === 1
          ? 'Add a second experience (+10).'
          : '',
    },
    {
      key: 'certificates',
      label: 'Certificates',
      max: 5,
      earned: certs.length > 0 ? 5 : 0,
      tip: certs.length === 0 ? 'Add a certificate or course (+5).' : '',
    },
    {
      key: 'projects',
      label: 'Projects',
      max: 10,
      earned: projects.length > 0 ? 10 : 0,
      tip: projects.length === 0 ? 'Add a project to show hands-on skills (+10).' : '',
    },
  ];
}

export function calculateResumeScore(resumeData) {
  if (!resumeData) return 0;
  const total = getScoreBreakdown(resumeData).reduce((sum, s) => sum + s.earned, 0);
  return Math.min(total, 100);
}

export function getResumeSuggestions(resumeData) {
  if (!resumeData) return [];

  const suggestions = [];
  const info = resumeData.personalInfo || {};
  const exp = resumeData.experience || [];
  const skills = resumeData.skills || [];
  const edu = resumeData.education || [];
  const projects = resumeData.projects || [];
  const certs = resumeData.certificates || [];

  const missingSections = [];

  if (!info.fullName?.trim() || !info.email?.trim() || !isPhoneValid(info.phone)) {
    missingSections.push('Personal Information');
  }
  if (!info.summary?.trim()) {
    suggestions.push('Add a short professional summary to introduce yourself at the top of your resume.');
  }

  if (edu.length === 0) {
    missingSections.push('Education');
  }

  if (skills.length === 0) {
    missingSections.push('Skills');
  } else if (skills.length < 5) {
    suggestions.push('Add more relevant skills — aim for at least 5 to strengthen your profile.');
  }

  if (exp.length === 0) {
    missingSections.push('Experience');
  } else {
    const thinDescriptions = exp.some(
      (item) => !item.description || item.description.trim().length < 20
    );
    if (thinDescriptions) {
      suggestions.push('Provide more details about your experience — describe what you did and what you achieved.');
    }
  }

  if (projects.length === 0) {
    suggestions.push('Include project experience to show practical, hands-on skills.');
  }

  if (certs.length === 0) {
    suggestions.push('Add any certificates or courses you have completed, if applicable.');
  }

  if (missingSections.length > 0) {
    suggestions.unshift('Complete missing sections: ' + missingSections.join(', ') + '.');
  }

  if (suggestions.length === 0) {
    suggestions.push('Your resume looks complete! Consider reviewing it once more for clarity and impact.');
  }

  return suggestions;
}