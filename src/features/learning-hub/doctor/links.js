import { ref } from '../shared/lessonLinks';

const source = (organization, title, url, site = organization) =>
  ref(organization, title, url, site);

const SOURCES = {
  ethics: source(
    'World Health Organization',
    'Global health ethics',
    'https://www.who.int/health-topics/ethics-and-health',
    'WHO',
  ),
  governance: source(
    'World Health Organization',
    'Health systems governance',
    'https://www.who.int/health-topics/health-systems-governance',
    'WHO',
  ),
  workforce: source(
    'World Health Organization',
    'Health workforce',
    'https://www.who.int/health-topics/health-workforce',
    'WHO',
  ),
  patientSafety: source(
    'World Health Organization',
    'Patient safety',
    'https://www.who.int/health-topics/patient-safety',
    'WHO',
  ),
  healthPromotion: source(
    'World Health Organization',
    'Health promotion',
    'https://www.who.int/health-topics/health-promotion',
    'WHO',
  ),
  socialDeterminants: source(
    'World Health Organization',
    'Social determinants of health',
    'https://www.who.int/health-topics/social-determinants-of-health',
    'WHO',
  ),
  universalCoverage: source(
    'World Health Organization',
    'Universal health coverage',
    'https://www.who.int/health-topics/universal-health-coverage',
    'WHO',
  ),
  healthLiteracy: source(
    'Centers for Disease Control and Prevention',
    'About health literacy',
    'https://www.cdc.gov/health-literacy/php/about/index.html',
    'CDC',
  ),
  medlineHealthLiteracy: source(
    'MedlinePlus',
    'Health literacy',
    'https://medlineplus.gov/healthliteracy.html',
  ),
  biology: source(
    'OpenStax',
    '1.1 The Science of Biology',
    'https://openstax.org/books/biology-2e/pages/1-1-the-science-of-biology',
  ),
  biologyThemes: source(
    'OpenStax',
    '1.2 Themes and Concepts of Biology',
    'https://openstax.org/books/biology-2e/pages/1-2-themes-and-concepts-of-biology',
  ),
  biologyChemistry: source(
    'OpenStax',
    'Ch. 2 Introduction - Biology 2e',
    'https://openstax.org/books/biology-2e/pages/2-introduction',
  ),
  biologyCells: source(
    'OpenStax',
    'Ch. 4 Introduction - Biology 2e',
    'https://openstax.org/books/biology-2e/pages/4-introduction',
  ),
  biologyMembranes: source(
    'OpenStax',
    'Ch. 5 Introduction - Biology 2e',
    'https://openstax.org/books/biology-2e/pages/5-introduction',
  ),
  biologyMetabolism: source(
    'OpenStax',
    'Ch. 6 Introduction - Biology 2e',
    'https://openstax.org/books/biology-2e/pages/6-introduction',
  ),
  biologyCommunication: source(
    'OpenStax',
    'Ch. 9 Introduction - Biology 2e',
    'https://openstax.org/books/biology-2e/pages/9-introduction',
  ),
  biologyDna: source(
    'OpenStax',
    'Ch. 14 Introduction - Biology 2e',
    'https://openstax.org/books/biology-2e/pages/14-introduction',
  ),
  biologyGenes: source(
    'OpenStax',
    'Ch. 15 Introduction - Biology 2e',
    'https://openstax.org/books/biology-2e/pages/15-introduction',
  ),
  chemistry: source(
    'OpenStax',
    'Ch. 1 Introduction - Chemistry 2e',
    'https://openstax.org/books/chemistry-2e/pages/1-introduction',
  ),
  chemistryAtoms: source(
    'OpenStax',
    '2.3 Atomic Structure and Symbolism',
    'https://openstax.org/books/chemistry-2e/pages/2-3-atomic-structure-and-symbolism',
  ),
  chemistryBonds: source(
    'OpenStax',
    'Ch. 8 Introduction - Chemistry 2e',
    'https://openstax.org/books/chemistry-2e/pages/8-introduction',
  ),
  chemistrySolutions: source(
    'OpenStax',
    'Ch. 11 Introduction - Chemistry 2e',
    'https://openstax.org/books/chemistry-2e/pages/11-introduction',
  ),
  chemistryAcidsBases: source(
    'OpenStax',
    '14.1 Brønsted-Lowry Acids and Bases',
    'https://openstax.org/books/chemistry-2e/pages/14-1-bronsted-lowry-acids-and-bases',
  ),
  chemistryReactions: source(
    'OpenStax',
    '4.1 Writing and Balancing Chemical Equations',
    'https://openstax.org/books/chemistry-2e/pages/4-1-writing-and-balancing-chemical-equations',
  ),
  chemistryEnergy: source(
    'OpenStax',
    'Ch. 5 Introduction - Chemistry 2e',
    'https://openstax.org/books/chemistry-2e/pages/5-introduction',
  ),
  chemistryThermodynamics: source(
    'OpenStax',
    'Ch. 16 Introduction - Chemistry 2e',
    'https://openstax.org/books/chemistry-2e/pages/16-introduction',
  ),
  measurement: source(
    'OpenStax',
    '1.5 Measurement Uncertainty, Accuracy, and Precision',
    'https://openstax.org/books/chemistry-2e/pages/1-5-measurement-uncertainty-accuracy-and-precision',
  ),
  anatomy: source(
    'OpenStax',
    'Ch. 1 Introduction - Anatomy and Physiology 2e',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction',
  ),
  skeleton: source(
    'OpenStax',
    'Ch. 6 Introduction - Anatomy and Physiology 2e',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/6-introduction',
  ),
  muscles: source(
    'OpenStax',
    'Ch. 11 Introduction - Anatomy and Physiology 2e',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/11-introduction',
  ),
  nervousSystem: source(
    'OpenStax',
    'Ch. 12 Introduction - Anatomy and Physiology 2e',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/12-introduction',
  ),
  blood: source(
    'OpenStax',
    'Ch. 18 Introduction - Anatomy and Physiology 2e',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/18-introduction',
  ),
  heart: source(
    'OpenStax',
    'Ch. 19 Introduction - Anatomy and Physiology 2e',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/19-introduction',
  ),
  respiratory: source(
    'OpenStax',
    'Ch. 22 Introduction - Anatomy and Physiology 2e',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/22-introduction',
  ),
  digestive: source(
    'OpenStax',
    'Ch. 23 Introduction - Anatomy and Physiology 2e',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/23-introduction',
  ),
  urinary: source(
    'OpenStax',
    'Ch. 25 Introduction - Anatomy and Physiology 2e',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/25-introduction',
  ),
  endocrine: source(
    'OpenStax',
    'Ch. 17 Introduction - Anatomy and Physiology 2e',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/17-introduction',
  ),
  reproductive: source(
    'OpenStax',
    'Ch. 27 Introduction - Anatomy and Physiology 2e',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/27-introduction',
  ),
  immune: source(
    'OpenStax',
    'Ch. 21 Introduction - Anatomy and Physiology 2e',
    'https://openstax.org/books/anatomy-and-physiology-2e/pages/21-introduction',
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

function linksFor(courseId, sourceKeys) {
  return Object.fromEntries(
    sourceKeys.map((sourceKey, index) => [
      `${courseId}-${index + 1}`,
      {
        references: Array.isArray(sourceKey)
          ? sourceKey.map((key) => SOURCES[key])
          : [SOURCES[sourceKey]],
        referencesHeading: 'Further reading',
      },
    ]),
  );
}

export const LESSON_LINKS = {
  ...linksFor('med-profession-ethics', [
    'ethics',
    'governance',
    'workforce',
    'ethics',
    'patientSafety',
    'ethics',
    'governance',
    'workforce',
    'patientSafety',
    'governance',
  ]),
  ...linksFor('med-biology-foundations', [
    'biology',
    'biologyCells',
    'biologyCells',
    'biologyDna',
    'biologyGenes',
    'biologyMembranes',
    'anatomy',
    'biologyMetabolism',
    'biologyCommunication',
    'biologyThemes',
  ]),
  ...linksFor('med-chemistry-foundations', [
    'chemistry',
    'chemistryAtoms',
    'chemistryBonds',
    'biologyChemistry',
    'chemistrySolutions',
    'chemistryAcidsBases',
    'chemistryReactions',
    'chemistryEnergy',
    'chemistryThermodynamics',
    'measurement',
  ]),
  ...linksFor('med-body-systems', [
    'anatomy',
    ['skeleton', 'muscles'],
    'nervousSystem',
    ['blood', 'heart'],
    'respiratory',
    'digestive',
    'urinary',
    ['endocrine', 'reproductive'],
    'immune',
    ['anatomy', 'respiratory'],
  ]),
  ...linksFor('med-health-communication', [
    'healthLiteracy',
    'healthLiteracy',
    'healthLiteracy',
    'medlineHealthLiteracy',
    'ethics',
    'governance',
    'workforce',
    'healthPromotion',
    'ethics',
    'healthPromotion',
  ]),
  ...linksFor('med-clinical-thinking', [
    'biology',
    'measurement',
    'biology',
    'biologyThemes',
    'measurement',
    'measurement',
    'biologyThemes',
    'governance',
    'biology',
    'biologyThemes',
  ]),
  ...linksFor('med-public-health', [
    'socialDeterminants',
    'healthPromotion',
    'healthPromotion',
    'governance',
    'workforce',
    'healthLiteracy',
    'governance',
    'healthPromotion',
    'universalCoverage',
    'socialDeterminants',
  ]),
  ...linksFor('med-path-to-practice', [
    'workforce',
    'biology',
    'governance',
    'workforce',
    ['prc', 'ched'],
    'healthPromotion',
    'ethics',
    'healthLiteracy',
    'universalCoverage',
    'workforce',
  ]),
};
