import { TRACKS } from './registry';

export const CAREERS = [
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    subtitle: 'Build websites, apps, and software systems.',
    icon: '💻',
    color: '#6C4CE0',
    status: 'available',
    trackIds: ['Software Engineer', 'UI/UX Designer', 'Data Analyst'],
    overview:
      'Software engineering brings together logic, design, and collaboration to build tools, apps, and systems people can use every day.',
    skillsPreview: ['Problem solving', 'Programming', 'Teamwork'],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    subtitle: 'Protect systems, data, and people from digital risk.',
    icon: '🛡️',
    color: '#2E7DFF',
    status: 'coming-soon',
    trackIds: [],
    overview:
      'Cybersecurity focuses on defending digital systems and helping organizations respond to risks, threats, and security issues.',
    skillsPreview: ['Risk awareness', 'Attention to detail', 'Critical thinking'],
  },
  {
    id: 'teacher',
    title: 'Teacher',
    subtitle: 'Guide learning, support growth, and shape classroom experiences.',
    icon: '📚',
    color: '#F59E0B',
    status: 'coming-soon',
    trackIds: [],
    overview:
      'Teaching blends subject knowledge, communication, and support to help learners build skills and confidence in a classroom or training setting.',
    skillsPreview: ['Communication', 'Planning', 'Mentorship'],
  },
  {
    id: 'nursing',
    title: 'Nursing',
    subtitle: 'Support patient care, health education, and safe clinical practice.',
    icon: '🩺',
    color: '#10B981',
    status: 'coming-soon',
    trackIds: [],
    overview:
      'Nursing involves caring for patients, working with clinical teams, and helping people through health challenges with empathy and evidence-based practice.',
    skillsPreview: ['Care', 'Communication', 'Clinical thinking'],
  },
  {
    id: 'doctor',
    title: 'Doctor',
    subtitle: 'Diagnose conditions, plan care, and support long-term health.',
    icon: '🧑‍⚕️',
    color: '#EF4444',
    status: 'coming-soon',
    trackIds: [],
    overview:
      'Doctors combine medical knowledge, patient communication, and clinical judgment to evaluate health concerns and guide safe treatment decisions.',
    skillsPreview: ['Clinical reasoning', 'Empathy', 'Problem solving'],
  },
  {
    id: 'lawyer',
    title: 'Lawyer',
    subtitle: 'Advise, advocate, and help people navigate legal issues.',
    icon: '⚖️',
    color: '#7C3AED',
    status: 'available',
    trackIds: ['law-lawyer-path', 'law-paralegal'],
    overview:
      'Lawyers work with legal principles, research, and clear reasoning to advise clients, prepare arguments, and support fair outcomes.',
    skillsPreview: ['Research', 'Reading', 'Judgment'],
  },
  {
    id: 'marine',
    title: 'Marine (Seafarer / Marine Engineering)',
    subtitle: 'Support safe operations at sea and maintain marine systems.',
    icon: '🚢',
    color: '#0EA5E9',
    status: 'coming-soon',
    trackIds: [],
    overview:
      'Marine careers cover work at sea, ship operations, and the engineering systems that keep vessels running safely and efficiently.',
    skillsPreview: ['Safety', 'Teamwork', 'Technical awareness'],
  },
  {
    id: 'accountancy',
    title: 'Accountancy',
    subtitle: 'Manage records, numbers, and financial decision-making.',
    icon: '📊',
    color: '#22C55E',
    status: 'coming-soon',
    trackIds: [],
    overview:
      'Accountancy focuses on financial records, reporting, and analysis that support planning, compliance, and informed business decisions.',
    skillsPreview: ['Accuracy', 'Analysis', 'Organization'],
  },
  {
    id: 'civil-engineering',
    title: 'Civil Engineering',
    subtitle: 'Design, build, and improve safe infrastructure and communities.',
    icon: '🏗️',
    color: '#F97316',
    status: 'coming-soon',
    trackIds: [],
    overview:
      'Civil engineering brings together planning, structural thinking, and project coordination to shape roads, buildings, and public infrastructure.',
    skillsPreview: ['Planning', 'Design thinking', 'Problem solving'],
  },
  {
    id: 'hospitality-tourism',
    title: 'Hospitality & Tourism',
    subtitle: 'Create welcoming guest experiences and memorable travel journeys.',
    icon: '✈️',
    color: '#EC4899',
    status: 'coming-soon',
    trackIds: [],
    overview:
      'Hospitality and tourism combine customer service, communication, and coordination to deliver strong guest experiences and smooth travel service.',
    skillsPreview: ['Customer care', 'Adaptability', 'Service mindset'],
  },
];

export const getCareerById = (id) => CAREERS.find((career) => career.id === id) || null;

export function validateCareerData(careers = CAREERS) {
  const issues = [];
  const seenIds = new Set();
  const validTrackIds = new Set([
    ...Object.keys(TRACKS),
    ...Object.values(TRACKS).map((track) => track.id).filter(Boolean),
  ]);

  careers.forEach((career) => {
    if (!career || typeof career.id !== 'string') {
      issues.push('A career entry is missing a valid id.');
      return;
    }

    if (seenIds.has(career.id)) {
      issues.push(`Duplicate career id: ${career.id}`);
    }
    seenIds.add(career.id);

    if (career.status === 'available' && (!Array.isArray(career.trackIds) || career.trackIds.length === 0)) {
      issues.push(`Available career has no tracks: ${career.id}`);
    }

    if (!Array.isArray(career.trackIds)) {
      issues.push(`Career trackIds must be an array for: ${career.id}`);
      return;
    }

    career.trackIds.forEach((trackId) => {
      if (!validTrackIds.has(trackId)) {
        issues.push(`Unresolved track id for ${career.id}: ${trackId}`);
      }
    });
  });

  return issues;
}

if (__DEV__) {
  const issues = validateCareerData();
  if (issues.length > 0) {
    console.warn('Career data warnings:', issues);
  }
}
