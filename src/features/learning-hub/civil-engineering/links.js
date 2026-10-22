import { ref } from '../shared/lessonLinks';

const ASCE = 'American Society of Civil Engineers';
const USGS = 'U.S. Geological Survey';
const EPA = 'U.S. Environmental Protection Agency';
const FEMA = 'Federal Emergency Management Agency';
const FHWA = 'Federal Highway Administration';

const sources = {
  asceOverview: ref(
    ASCE,
    'About Civil Engineering',
    'https://www.asce.org/about-civil-engineering',
    'ASCE',
  ),
  asceEthics: ref(
    ASCE,
    'Ethics',
    'https://www.asce.org/career-growth/ethics',
    'ASCE',
  ),
  asceCode: ref(
    ASCE,
    'Code of Ethics',
    'https://www.asce.org/career-growth/ethics/code-of-ethics',
    'ASCE',
  ),
  nspeCode: ref(
    'National Society of Professional Engineers',
    'NSPE Code of Ethics for Engineers',
    'https://www.nspe.org/career-growth/ethics/nspe-code-ethics-engineers',
    'NSPE',
  ),
  nistUnits: ref(
    'National Institute of Standards and Technology',
    'SI Units',
    'https://www.nist.gov/pml/owm/metric-si/si-units',
    'NIST',
  ),
  nistMetric: ref(
    'National Institute of Standards and Technology',
    'Metric Program',
    'https://www.nist.gov/pml/owm/metric-si',
    'NIST',
  ),
  forces: ref(
    'Khan Academy',
    'Forces and Newton’s Laws of Motion',
    'https://www.khanacademy.org/science/physics/forces-newtons-laws',
    'Khan Academy',
  ),
  geometry: ref(
    'Khan Academy',
    'Geometry',
    'https://www.khanacademy.org/math/geometry',
    'Khan Academy',
  ),
  pavement: ref(
    FHWA,
    'Pavements and Materials Program',
    'https://www.fhwa.dot.gov/pavement/',
    'U.S. Department of Transportation',
  ),
  femaBuilding: ref(
    FEMA,
    'Building Science',
    'https://www.fema.gov/emergency-managers/risk-management/building-science',
    'FEMA',
  ),
  pavementMaterials: ref(
    FHWA,
    'Pavement Materials',
    'https://www.fhwa.dot.gov/pavement/pavemat.cfm',
    'U.S. Department of Transportation',
  ),
  usgsEarthquake: ref(
    USGS,
    'Earthquake Hazards Program',
    'https://www.usgs.gov/programs/earthquake-hazards',
    'USGS',
  ),
  femaRisk: ref(
    FEMA,
    'Risk Management',
    'https://www.fema.gov/emergency-managers/risk-management',
    'FEMA',
  ),
  topographicMaps: ref(
    USGS,
    'Topographic Maps',
    'https://www.usgs.gov/programs/national-geospatial-program/topographic-maps',
    'USGS National Geospatial Program',
  ),
  geodesy: ref(
    'National Geodetic Survey',
    'National Geodetic Survey',
    'https://geodesy.noaa.gov/',
    'NOAA',
  ),
  constructionSafety: ref(
    'Occupational Safety and Health Administration',
    'Construction',
    'https://www.osha.gov/construction',
    'OSHA',
  ),
  dpwh: ref(
    'Department of Public Works and Highways',
    'Department of Public Works and Highways',
    'https://www.dpwh.gov.ph/dpwh/',
    'DPWH',
  ),
  // VERIFY: CHED returned HTTP 403 during source review; check manually.
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
  pice: ref(
    'Philippine Institute of Civil Engineers',
    'Philippine Institute of Civil Engineers',
    'https://pice.org.ph/',
    'PICE',
  ),
  waterResearch: ref(
    EPA,
    'Water Research',
    'https://www.epa.gov/water-research',
    'EPA',
  ),
  fhwaEnvironment: ref(
    FHWA,
    'Environment',
    'https://www.fhwa.dot.gov/environment/',
    'U.S. Department of Transportation',
  ),
  fhwaPlanning: ref(
    FHWA,
    'Planning',
    'https://www.fhwa.dot.gov/planning/',
    'U.S. Department of Transportation',
  ),
  fhwaPlanningProcesses: ref(
    FHWA,
    'Planning Processes',
    'https://www.fhwa.dot.gov/planning/processes/',
    'U.S. Department of Transportation',
  ),
  waterResources: ref(
    USGS,
    'Water Resources Science',
    'https://www.usgs.gov/mission-areas/water-resources/science',
    'USGS',
  ),
  greenInfrastructure: ref(
    EPA,
    'Green Infrastructure',
    'https://www.epa.gov/green-infrastructure',
    'EPA',
  ),
  watershed: ref(
    USGS,
    'Watersheds and Drainage Basins',
    'https://www.usgs.gov/water-science-school/science/watersheds-and-drainage-basins',
    'USGS Water Science School',
  ),
  surfaceWater: ref(
    USGS,
    'Surface Water Information by Topic',
    'https://www.usgs.gov/water-science-school/science/surface-water-information-topic',
    'USGS Water Science School',
  ),
  landslides: ref(
    USGS,
    'Landslide Hazards Program',
    'https://www.usgs.gov/programs/landslide-hazards',
    'USGS',
  ),
  landslideBasics: ref(
    USGS,
    'Landslide Basics',
    'https://www.usgs.gov/programs/landslide-hazards/landslide-basics',
    'USGS',
  ),
};

function linksForCourse(courseId, sourceKeys) {
  return Object.fromEntries(
    sourceKeys.map((sourceKey, index) => [
      `${courseId.replace(/^civ-/, '')}-${index + 1}`,
      { references: [sources[sourceKey]], referencesHeading: 'Further reading' },
    ]),
  );
}

export const LESSON_LINKS = {
  ...linksForCourse('civ-profession-ethics', [
    'asceOverview', 'asceEthics', 'asceCode', 'nspeCode',
    'asceOverview', 'asceEthics', 'asceCode', 'nspeCode',
    'asceOverview', 'asceEthics',
  ]),
  ...linksForCourse('civ-math-science', [
    'nistUnits', 'forces', 'nistMetric', 'geometry',
    'nistUnits', 'forces', 'nistMetric', 'geometry',
    'nistUnits', 'forces',
  ]),
  ...linksForCourse('civ-materials', [
    'pavement', 'femaBuilding',     'pavementMaterials', 'asceOverview',
    'pavement', 'femaBuilding', 'pavementMaterials', 'asceOverview',
    'pavement', 'femaBuilding',
  ]),
  ...linksForCourse('civ-structures-concepts', [
    'femaBuilding', 'asceOverview', 'usgsEarthquake', 'asceCode',
    'femaBuilding', 'asceOverview', 'usgsEarthquake', 'asceCode',
    'femaBuilding', 'asceOverview',
  ]),
  ...linksForCourse('civ-drawings-surveying', [
    'topographicMaps', 'geodesy', 'nistUnits', 'asceOverview',
    'topographicMaps', 'geodesy', 'nistUnits', 'asceOverview',
    'topographicMaps', 'geodesy',
  ]),
  ...linksForCourse('civ-construction-mgmt', [
    'constructionSafety', 'dpwh', 'femaRisk', 'asceEthics',
    'constructionSafety', 'dpwh', 'femaRisk', 'asceEthics',
    'constructionSafety', 'dpwh',
  ]),
  ...linksForCourse('civ-infra-overview', [
    'asceOverview', 'dpwh', 'waterResearch', 'fhwaEnvironment',
    'asceOverview', 'dpwh', 'waterResearch', 'fhwaEnvironment',
    'asceOverview', 'dpwh',
  ]),
  ...linksForCourse('civ-transportation', [
    'fhwaPlanning', 'fhwaPlanning', 'dpwh', 'pavement',
    'pavement', 'fhwaPlanning', 'fhwaPlanningProcesses', 'fhwaEnvironment',
    'pavement', 'fhwaPlanningProcesses',
  ]),
  ...linksForCourse('civ-water-resources', [
    'watershed', 'greenInfrastructure', 'waterResearch', 'surfaceWater',
    'watershed', 'greenInfrastructure', 'waterResearch', 'surfaceWater',
    'watershed', 'greenInfrastructure',
  ]),
  ...linksForCourse('civ-geotechnical', [
    'landslides', 'landslideBasics', 'usgsEarthquake', 'femaBuilding',
    'landslides', 'landslideBasics', 'usgsEarthquake', 'femaBuilding',
    'landslides', 'landslideBasics',
  ]),
  ...linksForCourse('civ-resilience-environment', [
    'femaRisk', 'femaBuilding', 'greenInfrastructure', 'landslides',
    'femaRisk', 'femaBuilding', 'greenInfrastructure', 'landslides',
    'femaRisk', 'femaBuilding',
  ]),
  ...linksForCourse('civ-path-to-practice', [
    'asceOverview', 'prc', 'ched', 'pice',
    'asceOverview', 'prc', 'ched', 'pice',
    'asceOverview', 'prc',
  ]),
};
