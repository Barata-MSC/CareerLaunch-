import { ref, ytVideo } from '../shared/lessonLinks';

const source = (organization, title, url, site = organization) =>
  ref(organization, title, url, site);

const SOURCES = {
  anatomy: source(
    'OpenStax',
    'Anatomy and Physiology 2e: Introduction to the Human Body',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction',
  ),
  cells: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Cellular Level of Organization',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/3-introduction',
  ),
  tissues: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Tissue Level of Organization',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/4-introduction',
  ),
  integumentary: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Integumentary System',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/5-introduction',
  ),
  bones: source(
    'OpenStax',
    'Anatomy and Physiology 2e: Bone Tissue and the Skeletal System',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/6-introduction',
  ),
  muscles: source(
    'OpenStax',
    'Anatomy and Physiology 2e: Muscle Tissue',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/10-introduction',
  ),
  muscularSystem: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Muscular System',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/11-introduction',
  ),
  nervousSystem: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Nervous System and Nervous Tissue',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/12-introduction',
  ),
  endocrine: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Endocrine System',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/17-introduction',
  ),
  blood: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Cardiovascular System: Blood',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/18-introduction',
  ),
  heart: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Cardiovascular System: The Heart',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/19-introduction',
  ),
  vessels: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Cardiovascular System: Blood Vessels and Circulation',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/20-introduction',
  ),
  immune: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Lymphatic and Immune System',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/21-introduction',
  ),
  respiratory: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Respiratory System',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/22-introduction',
  ),
  digestive: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Digestive System',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-introduction',
  ),
  urinary: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Urinary System',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/25-introduction',
  ),
  reproductive: source(
    'OpenStax',
    'Anatomy and Physiology 2e: The Reproductive System',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/27-introduction',
  ),
  nursing: source(
    'World Health Organization',
    'Nursing and midwifery',
    'https://www.who.int/health-topics/nursing',
    'WHO',
  ),
  workforce: source(
    'World Health Organization',
    'Health workforce',
    'https://www.who.int/health-topics/health-workforce',
    'WHO',
  ),
  healthPromotion: source(
    'World Health Organization',
    'Health promotion',
    'https://www.who.int/health-topics/health-promotion',
    'WHO',
  ),
  mentalHealth: source(
    'World Health Organization',
    'Mental health',
    'https://www.who.int/health-topics/mental-health',
    'WHO',
  ),
  infectionPrevention: source(
    'World Health Organization',
    'Infection prevention and control',
    'https://www.who.int/health-topics/infection-prevention-and-control',
    'WHO',
  ),
  patientSafety: source(
    'World Health Organization',
    'Patient safety',
    'https://www.who.int/health-topics/patient-safety',
    'WHO',
  ),
  healthLiteracy: source(
    'Centers for Disease Control and Prevention',
    'About health literacy',
    'https://www.cdc.gov/health-literacy/php/about/index.html',
    'CDC',
  ),
  infectionControl: source(
    'Centers for Disease Control and Prevention',
    'About infection control',
    'https://www.cdc.gov/infection-control/about/index.html',
    'CDC',
  ),
  nursingEthics: source(
    'American Nurses Association',
    'Ethics',
    'https://www.nursingworld.org/practice-policy/nursing-excellence/ethics/',
    'ANA',
  ),
  codeOfEthics: source(
    'American Nurses Association',
    'Code of Ethics for Nurses',
    'https://codeofethics.ana.org/home',
    'ANA',
  ),
  nursingPractice: source(
    'American Nurses Association',
    'Nursing excellence',
    'https://www.nursingworld.org/practice-policy/nursing-excellence/',
    'ANA',
  ),
  prc: source(
    'Professional Regulation Commission',
    'Professional Regulation Commission',
    'https://www.prc.gov.ph/',
    'PRC',
  ),
  ched: source(
    'Commission on Higher Education',
    'Commission on Higher Education',
    'https://ched.gov.ph/',
    'CHED',
  ),
};

function linksFor(prefix, sourceKeys) {
  return Object.fromEntries(
    sourceKeys.map((sourceKey, index) => [
      `${prefix}-${index + 1}`,
      {
        references: [SOURCES[sourceKey]],
        referencesHeading: 'Further reading',
      },
    ]),
  );
}

const lessonLinks = {
  ...linksFor('nurs-profession-ethics', [
    'nursing',
    'nursingPractice',
    'nursing',
    'nursingEthics',
    'codeOfEthics',
    'nursingEthics',
    'codeOfEthics',
    'nursingEthics',
    'nursingPractice',
    'nursing',
  ]),
  ...linksFor('nurs-body-basics', [
    'anatomy',
    'cells',
    'heart',
    'respiratory',
    'digestive',
    'nervousSystem',
    'bones',
    'immune',
    'endocrine',
    'anatomy',
  ]),
  ...linksFor('nurs-patient-communication', [
    'healthLiteracy',
    'healthLiteracy',
    'healthLiteracy',
    'nursingEthics',
    'codeOfEthics',
    'nursingEthics',
    'patientSafety',
    'patientSafety',
    'nursing',
    'nursingPractice',
  ]),
  ...linksFor('nurs-fundamentals-of-care', [
    'nursing',
    'anatomy',
    'nursingPractice',
    'codeOfEthics',
    'nursingEthics',
    'tissues',
    'patientSafety',
    'patientSafety',
    'infectionControl',
    'nursing',
  ]),
  ...linksFor('nurs-infection-prevention', [
    'infectionControl',
    'infectionControl',
    'infectionControl',
    'infectionPrevention',
    'infectionPrevention',
    'infectionPrevention',
    'immune',
    'immune',
    'immune',
    'nursing',
  ]),
  ...linksFor('nurs-health-promotion', [
    'healthPromotion',
    'healthLiteracy',
    'healthPromotion',
    'mentalHealth',
    'workforce',
    'healthPromotion',
    'nursing',
    'healthLiteracy',
    'healthLiteracy',
    'workforce',
  ]),
  ...linksFor('nurs-safety-documentation', [
    'patientSafety',
    'nursingPractice',
    'nursingEthics',
    'patientSafety',
    'patientSafety',
    'nursingPractice',
    'nursing',
    'codeOfEthics',
    'codeOfEthics',
    'workforce',
  ]),
  ...linksFor('nurs-path-to-practice', [
    'nursing',
    'nursingPractice',
    'ched',
    'nursing',
    'prc',
    'workforce',
    'nursingEthics',
    'mentalHealth',
    'nursingPractice',
    'nursing',
  ]),
  'nurs-path-to-practice-5': {
    references: [SOURCES.prc, SOURCES.ched],
    referencesHeading: 'Further reading',
  },
};

const professionEthicsVideo = ytVideo(
  'CGvjk7hgASQ',
  502,
  'Principle of Autonomy',
  'Nursing Profession and Ethics - Fundamentals of Nursing  | @LevelUpRN',
  'Level Up RN',
);
const bodyBasicsVideo = ytVideo(
  '0JDCViWGn-0',
  34,
  'Levels of Organization',
  'Human Body Systems Overview (Updated 2024)',
  'Amoeba Sisters',
);
const patientCommunicationVideo = ytVideo(
  'ZomOEH97xIk',
  0,
  'Full video',
  'Therapeutic Communication Techniques | Mental Health Nursing',
  'NursingSOS',
);
const fundamentalsOfCareVideo = ytVideo(
  'bRp2L0N7ppI',
  0,
  'Full video',
  'ADPIE Nursing Process Fundamentals | 5 Steps Made Simple',
  'SimpleNursing',
);
const infectionPreventionVideo = ytVideo(
  'r7LbCwyxzug',
  95,
  'Mode of Transmission',
  'The Chain and Stages of Infection - Fundamentals of Nursing - Principles | @LevelUpRN',
  'Level Up RN',
);
const healthPromotionVideo = ytVideo(
  'xZCEjrj4yWg',
  0,
  'Full video',
  'Nursing Fundamentals: Prevention, Education, and Promotion',
  'CASS RN',
);
const safetyDocumentationVideo = ytVideo(
  'Uos5uDihnXE',
  262,
  'Patient Safety Events',
  'Quality Improvement, Patient Safety Events, Incident Reporting: Fundamentals of Nursing |@LevelUpRN',
  'Level Up RN',
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
  ['nurs-profession-ethics-6', professionEthicsVideo, 2021],
  [
    'nurs-profession-ethics-8',
    ytVideo(
      professionEthicsVideo.id,
      474,
      'Ethical Principles',
      professionEthicsVideo.title,
      professionEthicsVideo.channel,
    ),
    2021,
  ],
  ['nurs-body-basics-2', bodyBasicsVideo, 2024],
  [
    'nurs-body-basics-3',
    ytVideo(bodyBasicsVideo.id, 81, 'Circulatory', bodyBasicsVideo.title, bodyBasicsVideo.channel),
    2024,
  ],
  [
    'nurs-body-basics-4',
    ytVideo(bodyBasicsVideo.id, 463, 'Respiratory', bodyBasicsVideo.title, bodyBasicsVideo.channel),
    2024,
  ],
  ['nurs-patient-communication-2', patientCommunicationVideo, 2021],
  ['nurs-patient-communication-3', patientCommunicationVideo, 2021],
  ['nurs-patient-communication-5', patientCommunicationVideo, 2021],
  ['nurs-fundamentals-of-care-2', fundamentalsOfCareVideo, 2025],
  [
    'nurs-infection-prevention-2',
    infectionPreventionVideo,
    2021,
  ],
  [
    'nurs-infection-prevention-8',
    ytVideo(
      infectionPreventionVideo.id,
      20,
      'Chain of Infection',
      infectionPreventionVideo.title,
      infectionPreventionVideo.channel,
    ),
    2021,
  ],
  ['nurs-health-promotion-1', healthPromotionVideo, 2022],
  ['nurs-health-promotion-2', healthPromotionVideo, 2022],
  ['nurs-safety-documentation-7', safetyDocumentationVideo, 2023],
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
