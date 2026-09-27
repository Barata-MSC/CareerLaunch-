export function calculateResumeScore(resumeData) {
  if (!resumeData) return 0;

  let score = 0;

  const info = resumeData.personalInfo || {};
  if (info.fullName?.trim()) score += 10;
  if (info.email?.trim()) score += 5;
  if (info.phone?.trim()) score += 5;
  if (info.summary?.trim()) score += 5;

  const exp = resumeData.experience || [];
  if (exp.length > 0) score += 15;
  if (exp.length > 1) score += 10;

  const skills = resumeData.skills || [];
  if (skills.length > 0) {
    const skillsWeight = Math.min(skills.length * 4, 20);
    score += skillsWeight;
  }

  const edu = resumeData.education || [];
  if (edu.length > 0) score += 10;
  if (edu.length > 1) score += 5;

  const projects = resumeData.projects || [];
  if (projects.length > 0) score += 10;

  const certs = resumeData.certificates || [];
  if (certs.length > 0) score += 5;

  return Math.min(score, 100);
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

  if (!info.fullName?.trim() || !info.email?.trim() || !info.phone?.trim()) {
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