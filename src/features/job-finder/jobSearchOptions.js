export const JOB_CATEGORIES = [
  { value: 'All', label: 'All' },
  { value: 'IT', label: 'IT' },
  { value: 'Design', label: 'Design' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Customer Service / BPO', label: 'Customer Service' },
  { value: 'Education', label: 'Education' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Accounting', label: 'Accounting' },
  { value: 'Hospitality & Tourism', label: 'Hospitality' },
  { value: 'Admin / Office', label: 'Admin / Office' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Human Resources', label: 'HR' },
  { value: 'Legal', label: 'Legal' },
];

export const EMPLOYMENT_TYPES = [
  { value: 'FULLTIME', label: 'Full-time' },
  { value: 'PARTTIME', label: 'Part-time' },
  { value: 'CONTRACTOR', label: 'Contract' },
  { value: 'INTERN', label: 'Internship' },
];

export const DATE_POSTED_OPTIONS = [
  { value: 'all', label: 'Any time' },
  { value: 'today', label: 'Today' },
  { value: '3days', label: 'Last 3 days' },
  { value: 'week', label: 'Last week' },
  { value: 'month', label: 'Last month' },
];

export const JOB_REQUIREMENTS = [
  { value: 'no_experience', label: 'No experience / fresh grad' },
  { value: 'under_3_years_experience', label: 'Under 3 years' },
  { value: 'more_than_3_years_experience', label: '3+ years' },
  { value: 'no_degree', label: 'No degree required' },
];

export const JOB_LOCATIONS = [
  { value: 'philippines', label: 'Anywhere in the Philippines' },
  { value: 'metro_manila', label: 'Metro Manila' },
  { value: 'cebu', label: 'Cebu' },
  { value: 'davao', label: 'Davao' },
  { value: 'cavite', label: 'Cavite' },
];

export function createEmptyJobFilters() {
  return {
    employmentTypes: [],
    remoteOnly: false,
    datePosted: 'all',
    jobRequirements: [],
    location: 'philippines',
  };
}

export function countJobFilters(filters) {
  return (
    filters.employmentTypes.length +
    Number(filters.remoteOnly) +
    Number(filters.datePosted !== 'all') +
    filters.jobRequirements.length +
    Number(filters.location !== 'philippines')
  );
}

export function getJobFilterSummary(filters) {
  return [
    ...EMPLOYMENT_TYPES
      .filter((option) => filters.employmentTypes.includes(option.value))
      .map((option) => ({ key: 'employmentTypes', value: option.value, label: option.label })),
    ...(filters.remoteOnly ? [{ key: 'remoteOnly', value: 'true', label: 'Remote only' }] : []),
    ...(filters.datePosted !== 'all'
      ? [{
          key: 'datePosted',
          value: filters.datePosted,
          label: DATE_POSTED_OPTIONS.find((option) => option.value === filters.datePosted)?.label,
        }]
      : []),
    ...JOB_REQUIREMENTS
      .filter((option) => filters.jobRequirements.includes(option.value))
      .map((option) => ({ key: 'jobRequirements', value: option.value, label: option.label })),
    ...(filters.location !== 'philippines'
      ? [{
          key: 'location',
          value: filters.location,
          label: JOB_LOCATIONS.find((option) => option.value === filters.location)?.label,
        }]
      : []),
  ];
}

export function removeJobFilter(filters, key, value) {
  if (key === 'employmentTypes') {
    if (!filters.employmentTypes.includes(value)) return filters;
    return {
      ...filters,
      employmentTypes: filters.employmentTypes.filter((item) => item !== value),
    };
  }
  if (key === 'jobRequirements') {
    if (!filters.jobRequirements.includes(value)) return filters;
    return {
      ...filters,
      jobRequirements: filters.jobRequirements.filter((item) => item !== value),
    };
  }
  if (key === 'remoteOnly' && filters.remoteOnly) return { ...filters, remoteOnly: false };
  if (key === 'datePosted' && filters.datePosted === value) return { ...filters, datePosted: 'all' };
  if (key === 'location' && filters.location === value) return { ...filters, location: 'philippines' };
  return filters;
}
