import { ref } from '../shared/lessonLinks';

const IMO = 'International Maritime Organization';
const NOAA = 'National Oceanic and Atmospheric Administration';

const sources = {
  imoWork: ref(IMO, 'Our Work', 'https://www.imo.org/en/ourwork/pages/default.aspx', IMO),
  imoSafety: ref(IMO, 'Maritime Safety', 'https://www.imo.org/en/ourwork/safety/pages/default.aspx', IMO),
  imoHumanElement: ref(IMO, 'Human Element', 'https://www.imo.org/en/ourwork/humanelement/pages/default.aspx', IMO),
  imoEnvironment: ref(IMO, 'Marine Environment', 'https://www.imo.org/en/ourwork/environment/pages/default.aspx', IMO),
  imoFacilitation: ref(IMO, 'Facilitation', 'https://www.imo.org/en/ourwork/facilitation/pages/default.aspx', IMO),
  noaaCharts: ref(
    NOAA,
    'What is a nautical chart?',
    'https://oceanservice.noaa.gov/facts/nauticalcharts.html',
    'NOAA Ocean Service',
  ),
  noaaCurrents: ref(
    NOAA,
    'What is a current?',
    'https://oceanservice.noaa.gov/facts/currents.html',
    'NOAA Ocean Service',
  ),
  noaaTides: ref(
    NOAA,
    'What are tides?',
    'https://oceanservice.noaa.gov/facts/tides.html',
    'NOAA Ocean Service',
  ),
  noaaWaves: ref(
    NOAA,
    'What are waves?',
    'https://oceanservice.noaa.gov/facts/waves.html',
    'NOAA Ocean Service',
  ),
  marina: ref(
    'Maritime Industry Authority',
    'Maritime Industry Authority',
    'https://marina.gov.ph/',
    'MARINA',
  ),
  // VERIFY: The official site returned HTTP 403 during link checking; confirm it manually.
  ched: ref(
    'Commission on Higher Education',
    'Commission on Higher Education',
    'https://ched.gov.ph/',
    'CHED',
  ),
  prc: ref(
    'Professional Regulation Commission',
    'Professional Regulation Commission',
    'https://www.prc.gov.ph/',
    'PRC',
  ),
  pagasa: ref(
    'Philippine Atmospheric, Geophysical and Astronomical Services Administration',
    'Philippine Atmospheric, Geophysical and Astronomical Services Administration',
    'https://www.pagasa.dost.gov.ph/',
    'PAGASA',
  ),
};

function linksForCourse(courseId, lessonSources) {
  return Object.fromEntries(
    lessonSources.map((source, index) => [
      `${courseId}-${index + 1}`,
      { references: [sources[source]], referencesHeading: 'Further reading' },
    ]),
  );
}

export const LESSON_LINKS = {
  ...linksForCourse('mar-seafaring-profession', [
    'imoWork',
    'imoHumanElement',
    'imoSafety',
    'imoHumanElement',
    'imoHumanElement',
    'imoWork',
    'imoSafety',
    'marina',
    'ched',
    'imoWork',
  ]),
  ...linksForCourse('mar-ship-basics', [
    'imoWork',
    'imoWork',
    'noaaCharts',
    'noaaCharts',
    'imoSafety',
    'imoSafety',
    'imoHumanElement',
    'noaaCharts',
    'imoHumanElement',
    'imoWork',
  ]),
  ...linksForCourse('mar-navigation-concepts', [
    'imoSafety',
    'noaaCharts',
    'noaaCharts',
    'noaaCharts',
    'pagasa',
    'imoSafety',
    'imoSafety',
    'noaaCurrents',
    'imoHumanElement',
    'noaaTides',
  ]),
  ...linksForCourse('mar-seamanship-cargo', [
    'imoHumanElement',
    'imoHumanElement',
    'imoFacilitation',
    'imoFacilitation',
    'noaaTides',
    'imoSafety',
    'imoWork',
    'imoFacilitation',
    'imoEnvironment',
    'imoSafety',
  ]),
  ...linksForCourse('mar-weather-ocean', [
    'pagasa',
    'pagasa',
    'noaaWaves',
    'noaaWaves',
    'noaaCurrents',
    'noaaTides',
    'pagasa',
    'imoSafety',
    'imoSafety',
    'noaaWaves',
  ]),
  ...linksForCourse('mar-safety-environment', [
    'imoHumanElement',
    'imoSafety',
    'imoSafety',
    'imoHumanElement',
    'imoHumanElement',
    'marina',
    'imoEnvironment',
    'imoEnvironment',
    'imoEnvironment',
    'imoSafety',
  ]),
  ...linksForCourse('mar-path-to-practice', [
    'imoHumanElement',
    'ched',
    'imoHumanElement',
    'marina',
    'prc',
    'imoHumanElement',
    'imoSafety',
    'marina',
    'ched',
    'imoWork',
  ]),
};
