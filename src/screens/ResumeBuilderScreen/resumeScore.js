/**
 * Evaluates active global resume data metrics and outputs an absolute completeness score.
 * Total possible points maxes out at 100.
 */
export function calculateResumeScore(resumeData) {
  if (!resumeData) return 0;

  let score = 0;

  // 1. Personal Info Completeness (Max 25 Points)
  const info = resumeData.personalInfo || {};
  if (info.fullName?.trim()) score += 10;
  if (info.email?.trim()) score += 5;
  if (info.phone?.trim()) score += 5;
  if (info.summary?.trim()) score += 5;

  // 2. Work Experience (Max 25 Points)
  const exp = resumeData.experience || [];
  if (exp.length > 0) score += 15;      // Has at least 1 job record
  if (exp.length > 1) score += 10;      // Has multiple job entries for deeper depth

  // 3. Technical Skills (Max 20 Points)
  const skills = resumeData.skills || [];
  if (skills.length > 0) {
    // Scales dynamically: 4 points per skill item up to 5 items max
    const skillsWeight = Math.min(skills.length * 4, 20);
    score += skillsWeight;
  }

  // 4. Academic History / Education (Max 15 Points)
  const edu = resumeData.education || [];
  if (edu.length > 0) score += 10;
  if (edu.length > 1) score += 5;

  // 5. Portfolio Projects (Max 10 Points)
  const projects = resumeData.projects || [];
  if (projects.length > 0) score += 10;

  // 6. Certificates & Badges (Max 5 Points)
  const certs = resumeData.certificates || [];
  if (certs.length > 0) score += 5;

  return Math.min(score, 100);
}
