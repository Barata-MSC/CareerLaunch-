import { ref } from '../shared/lessonLinks';

const DOT = 'Department of Tourism';
const CHED = 'Commission on Higher Education';
const TESDA = 'Technical Education and Skills Development Authority';
const UN_TOURISM = 'UN Tourism';

const sources = {
  // VERIFY: The DOT homepage returned HTTP 403; check manually.
  dot: ref(DOT, 'Department of Tourism', 'https://tourism.gov.ph/', 'DOT'),
  // VERIFY: The CHED homepage returned HTTP 403; check manually.
  ched: ref(CHED, 'Commission on Higher Education', 'https://ched.gov.ph/', 'CHED'),
  tesda: ref(TESDA, 'Technical Education and Skills Development Authority', 'https://www.tesda.gov.ph/', 'TESDA'),
  tesdaPrograms: ref(
    TESDA,
    'TVET Programs',
    'https://www.tesda.gov.ph/About/TESDA/24',
    'TESDA',
  ),
  tesdaStandards: ref(
    TESDA,
    'Competency Standards Development',
    'https://www.tesda.gov.ph/About/TESDA/85',
    'TESDA',
  ),
  tesdaCertification: ref(
    TESDA,
    'Competency Assessment and Certification',
    'https://www.tesda.gov.ph/About/TESDA/25',
    'TESDA',
  ),
  tesdaRegulations: ref(
    TESDA,
    'Training Regulations',
    'https://www.tesda.gov.ph/Download/Training_Regulations?Searchcat=Training%20Regulations',
    'TESDA',
  ),
  tesdaCompetencies: ref(
    TESDA,
    'Competency Standards',
    'https://www.tesda.gov.ph/Download/Competency_Standards',
    'TESDA',
  ),
  glossary: ref(
    UN_TOURISM,
    'Glossary of Tourism Terms',
    'https://www.untourism.int/glossary-tourism-terms',
    'UN Tourism',
  ),
  about: ref(
    UN_TOURISM,
    'About UN Tourism',
    'https://www.untourism.int/about-us',
    'UN Tourism',
  ),
  culture: ref(
    UN_TOURISM,
    'Tourism and Culture',
    'https://www.untourism.int/tourism-and-culture',
    'UN Tourism',
  ),
  sustainability: ref(
    UN_TOURISM,
    'Sustainable Development',
    'https://www.untourism.int/sustainable-development',
    'UN Tourism',
  ),
};

function linksForCourse(courseId, sourceKeys) {
  return Object.fromEntries(
    sourceKeys.map((sourceKey, index) => [
      `${courseId}-${index + 1}`,
      { references: [sources[sourceKey]], referencesHeading: 'Further reading' },
    ]),
  );
}

export const LESSON_LINKS = {
  ...linksForCourse('ht-hospitality-industry', [
    'about', 'glossary', 'tesdaPrograms', 'dot',
    'tesdaStandards', 'glossary', 'about', 'tesdaPrograms',
    'culture', 'tesdaStandards',
  ]),
  ...linksForCourse('ht-guest-service', [
    'tesdaCompetencies', 'glossary', 'about', 'tesdaStandards',
    'culture', 'tesdaCompetencies', 'glossary', 'tesdaPrograms',
    'about', 'culture',
  ]),
  ...linksForCourse('ht-front-office', [
    'tesdaStandards', 'tesdaCompetencies', 'tesdaRegulations', 'glossary',
    'tesdaPrograms', 'tesdaStandards', 'about', 'tesdaCompetencies',
    'tesdaRegulations', 'glossary',
  ]),
  ...linksForCourse('ht-food-beverage', [
    'tesdaRegulations', 'tesdaCompetencies', 'tesdaStandards', 'glossary',
    'tesdaPrograms', 'tesdaRegulations', 'culture', 'tesdaCompetencies',
    'tesdaStandards', 'glossary',
  ]),
  ...linksForCourse('ht-events-mice', [
    'glossary', 'tesdaPrograms', 'about', 'tesdaStandards',
    'tesdaCompetencies', 'glossary', 'culture', 'tesdaPrograms',
    'tesdaStandards', 'about',
  ]),
  ...linksForCourse('ht-hospitality-business', [
    'about', 'sustainability', 'tesdaPrograms', 'dot',
    'glossary', 'about', 'tesdaStandards', 'sustainability',
    'tesdaPrograms', 'glossary',
  ]),
  ...linksForCourse('ht-tourism-industry', [
    'glossary', 'about', 'dot', 'sustainability',
    'culture', 'glossary', 'about', 'dot',
    'sustainability', 'culture',
  ]),
  ...linksForCourse('ht-philippine-destinations', [
    'culture', 'dot', 'glossary', 'sustainability',
    'culture', 'about', 'dot', 'glossary',
    'sustainability', 'culture',
  ]),
  ...linksForCourse('ht-tour-planning', [
    'glossary', 'tesdaCompetencies', 'dot', 'about',
    'tesdaStandards', 'glossary', 'culture', 'tesdaCompetencies',
    'about', 'tesdaStandards',
  ]),
  ...linksForCourse('ht-travel-services', [
    'glossary', 'dot', 'tesdaCompetencies', 'about',
    'tesdaStandards', 'glossary', 'sustainability', 'dot',
    'tesdaCompetencies', 'about',
  ]),
  ...linksForCourse('ht-sustainable-tourism', [
    'sustainability', 'culture', 'dot', 'glossary',
    'about', 'sustainability', 'culture', 'dot',
    'glossary', 'about',
  ]),
  ...linksForCourse('ht-path-to-practice', [
    'about', 'tesdaPrograms', 'glossary', 'culture',
    'sustainability', 'about', 'tesdaStandards', 'glossary',
    'dot', 'sustainability',
  ]),
  'ht-path-to-practice-9': {
    references: [sources.dot, sources.ched, sources.tesda],
    referencesHeading: 'Further reading',
  },
};
