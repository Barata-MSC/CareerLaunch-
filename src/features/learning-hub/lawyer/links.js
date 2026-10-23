import { ref, ytVideo } from '../shared/lessonLinks';

const source = (organization, title, url, site = organization) =>
  ref(organization, title, url, site);

const SOURCES = {
  lawphil: source(
    'Arellano Law Foundation',
    'LawPhil Project',
    'https://lawphil.net/',
    'LawPhil',
  ),
  lawphilAbout: source(
    'Arellano Law Foundation',
    'About Us',
    'https://lawphil.net/aboutus.html',
    'LawPhil',
  ),
  lawphilDisclaimer: source(
    'Arellano Law Foundation',
    'Disclaimer',
    'https://lawphil.net/disclaim.html',
    'LawPhil',
  ),
  constitution: source(
    'Arellano Law Foundation',
    'The 1987 Constitution of the Republic of the Philippines',
    'https://lawphil.net/consti/cons1987.html',
    'LawPhil',
  ),
  ibp: source(
    'Integrated Bar of the Philippines',
    'Integrated Bar of the Philippines',
    'https://ibp.ph/',
    'IBP',
  ),
  ibpResources: source(
    'Integrated Bar of the Philippines',
    'Public Resources',
    'https://ibp.ph/public-resources',
    'IBP',
  ),
  ibpPublications: source(
    'Integrated Bar of the Philippines',
    'IBP Publications',
    'https://ibp.ph/publications',
    'IBP',
  ),
  upLaw: source(
    'University of the Philippines College of Law',
    'About UP Law',
    'https://law.upd.edu.ph/about-up-law/',
    'UP College of Law',
  ),
  upLawHome: source(
    'University of the Philippines College of Law',
    'UP College of Law',
    'https://law.upd.edu.ph/',
    'UP College of Law',
  ),
  privacy: source(
    'National Privacy Commission',
    'National Privacy Commission',
    'https://privacy.gov.ph/',
    'NPC',
  ),
  privacyAct: source(
    'National Privacy Commission',
    'Data Privacy Act',
    'https://privacy.gov.ph/data-privacy-act/',
    'NPC',
  ),
  officialConstitution: source(
    'Official Gazette of the Republic of the Philippines',
    '1987 Constitution',
    'https://www.officialgazette.gov.ph/constitutions/1987-constitution/',
    'Official Gazette',
  ),
  congress: source(
    'House of Representatives of the Philippines',
    'House of Representatives of the Philippines',
    'https://www.congress.gov.ph/',
    'House of Representatives',
  ),
  senate: source(
    'Senate of the Philippines',
    'Senate of the Philippines',
    'https://www.senate.gov.ph/',
    'Senate of the Philippines',
  ),
};

function linksFor(courseId, sourceKeys) {
  return Object.fromEntries(
    sourceKeys.map((sourceKey, index) => [
      `${courseId}-${index + 1}`,
      {
        references: [SOURCES[sourceKey]],
        referencesHeading: 'Further reading',
      },
    ]),
  );
}

const lessonLinks = {
  ...linksFor('law-profession-ethics', [
    'upLaw',
    'ibpResources',
    'ibp',
    'ibpPublications',
    'ibp',
    'ibpResources',
    'lawphilDisclaimer',
    'ibpPublications',
    'ibpResources',
    'upLaw',
  ]),
  ...linksFor('law-legal-system', [
    'lawphil',
    'senate',
    'congress',
    'lawphil',
    'constitution',
    'officialConstitution',
    'upLaw',
    'constitution',
    'lawphil',
    'lawphilDisclaimer',
  ]),
  ...linksFor('law-legal-research', [
    'lawphilAbout',
    'lawphil',
    'upLaw',
    'upLawHome',
    'lawphilAbout',
    'lawphilDisclaimer',
    'lawphil',
    'lawphil',
    'lawphilAbout',
    'upLawHome',
  ]),
  ...linksFor('law-legal-writing', [
    'upLaw',
    'upLawHome',
    'lawphilDisclaimer',
    'ibpPublications',
    'lawphilAbout',
    'lawphilDisclaimer',
    'upLaw',
    'ibpPublications',
    'lawphilAbout',
    'ibpResources',
  ]),
  ...linksFor('law-constitutional-basics', [
    'constitution',
    'officialConstitution',
    'constitution',
    'officialConstitution',
    'lawphil',
    'constitution',
    'lawphilDisclaimer',
    'upLawHome',
    'upLawHome',
    'upLaw',
  ]),
  ...linksFor('law-civil-criminal-overview', [
    'lawphil',
    'lawphilAbout',
    'lawphilAbout',
    'upLaw',
    'lawphil',
    'upLaw',
    'lawphilDisclaimer',
    'ibp',
    'upLawHome',
    'lawphilAbout',
  ]),
  ...linksFor('law-procedure-advocacy', [
    'lawphil',
    'lawphil',
    'ibp',
    'upLawHome',
    'lawphilDisclaimer',
    'ibpPublications',
    'upLaw',
    'ibpResources',
    'lawphil',
    'ibp',
  ]),
  ...linksFor('law-path-to-practice', [
    'upLaw',
    'ibp',
    'ibpResources',
    'upLawHome',
    'ibpResources',
    'ibpPublications',
    'ibp',
    'ibp',
    'lawphilDisclaimer',
    'ibpPublications',
  ]),
  ...linksFor('law-legal-office-ops', [
    'ibpResources',
    'ibp',
    'privacy',
    'upLaw',
    'ibpPublications',
    'privacy',
    'lawphilDisclaimer',
    'ibpResources',
    'ibp',
    'upLawHome',
  ]),
  ...linksFor('law-document-drafting', [
    'lawphil',
    'upLaw',
    'ibpPublications',
    'privacy',
    'lawphilAbout',
    'lawphilDisclaimer',
    'lawphil',
    'ibpPublications',
    'upLawHome',
    'lawphilDisclaimer',
  ]),
  ...linksFor('law-court-filing', [
    'lawphil',
    'lawphil',
    'lawphilAbout',
    'ibpResources',
    'upLawHome',
    'lawphilDisclaimer',
    'ibp',
    'ibp',
    'lawphil',
    'ibpPublications',
  ]),
  ...linksFor('law-research-support', [
    'lawphilAbout',
    'lawphil',
    'lawphil',
    'upLaw',
    'lawphilDisclaimer',
    'upLawHome',
    'lawphilAbout',
    'upLawHome',
    'lawphilDisclaimer',
    'ibpPublications',
  ]),
  ...linksFor('law-client-intake-confidentiality', [
    'ibp',
    'privacy',
    'upLaw',
    'lawphilDisclaimer',
    'privacyAct',
    'privacy',
    'ibpResources',
    'lawphilDisclaimer',
    'ibpPublications',
    'privacyAct',
  ]),
  ...linksFor('law-legal-tech-records', [
    'ibpResources',
    'privacy',
    'privacyAct',
    'lawphil',
    'privacy',
    'privacyAct',
    'ibpPublications',
    'privacy',
    'privacyAct',
    'lawphilDisclaimer',
  ]),
};

const legalResearchVideo = ytVideo(
  'yqteIDakNHY',
  120,
  'The legal research framework (overview)',
  'Legal Research for Beginners: A Step-by-Step Framework (Primary + Secondary Sources)',
  'Rowena Maxwell',
);
const legalWritingVideo = ytVideo(
  'O7G-y6vepos',
  0,
  'Full video',
  'IRAC Method',
  'Learn Law Better',
);
const constitutionalBasicsVideo = ytVideo(
  '_882Xztbh5Q',
  0,
  'Full video',
  'What is the Separation of Powers?',
  'Civics Academy SA',
);
const civilCriminalOverviewVideo = ytVideo(
  'Zg5ex8WZUao',
  0,
  'Full video',
  'What is the difference between civil cases and criminal cases?',
  'LegalYou',
);
const legalTechRecordsVideo = ytVideo(
  '1biHm0Xb5-M',
  150,
  'Identifying Your Records and Responsibilities',
  'Introduction to Records Management',
  'Odyssey Learning Project',
);

function withVideo(lessonId, video, year) {
  const lesson = lessonLinks[lessonId];

  return {
    ...lesson,
    references: [
      ...lesson.references,
      {
        text: `${video.channel}. (${year}). ${video.title} [Video]. YouTube.`,
        url: `https://youtu.be/${video.id}`,
      },
    ],
    video,
  };
}

const videoLessonEntries = [
  [
    'law-legal-research-1',
    ytVideo(
      legalResearchVideo.id,
      120,
      'The legal research framework (overview)',
      legalResearchVideo.title,
      legalResearchVideo.channel,
    ),
    2025,
  ],
  [
    'law-legal-research-2',
    ytVideo(
      legalResearchVideo.id,
      42,
      'Primary vs secondary sources',
      legalResearchVideo.title,
      legalResearchVideo.channel,
    ),
    2025,
  ],
  ['law-legal-writing-2', legalWritingVideo, 2017],
  ['law-constitutional-basics-2', constitutionalBasicsVideo, 2020],
  ['law-civil-criminal-overview-1', civilCriminalOverviewVideo, 2015],
  ['law-civil-criminal-overview-2', civilCriminalOverviewVideo, 2015],
  ['law-civil-criminal-overview-5', civilCriminalOverviewVideo, 2015],
  ['law-legal-tech-records-10', legalTechRecordsVideo, 2023],
];

export const LESSON_LINKS = {
  ...lessonLinks,
  ...Object.fromEntries(
    videoLessonEntries.map(([lessonId, video, year]) => [
      lessonId,
      withVideo(lessonId, video, year),
    ]),
  ),
};
