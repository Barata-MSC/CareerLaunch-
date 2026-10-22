export type NormalizedJob = {
  externalId: string;
  source: 'jsearch';
  title: string;
  company: string;
  location: string;
  employmentType: string | null;
  postedAt: string | null;
  applyUrl: string;
  description: string;
  publisher: string | null;
};

type ProviderJob = {
  job_uid?: unknown;
  job_id?: unknown;
  job_title?: unknown;
  employer_name?: unknown;
  job_publisher?: unknown;
  job_employment_type?: unknown;
  job_apply_link?: unknown;
  apply_options?: Array<{ apply_link?: unknown }> | null;
  job_description?: unknown;
  job_location?: unknown;
  job_city?: unknown;
  job_state?: unknown;
  job_country?: unknown;
};

export class JSearchProviderError extends Error {
  constructor(
    readonly code: string,
    readonly status: number | null = null,
  ) {
    super(code);
    this.name = 'JSearchProviderError';
  }
}

function text(value: unknown): string | null {
  if (typeof value !== 'string' && typeof value !== 'number') return null;
  const normalized = String(value).trim();
  return normalized || null;
}

function isHttpUrl(value: string | null): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function normalizeDescription(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]*\n(?:[ \t]*\n)+/g, '\n\n')
    .trim()
    .slice(0, 4000);
}

export function normalizeJSearchResponse(payload: unknown): NormalizedJob[] {
  if (!payload || typeof payload !== 'object') {
    throw new JSearchProviderError('invalid_response');
  }

  const data = (payload as { data?: { jobs?: unknown } }).data;
  if (!data || typeof data !== 'object' || !Array.isArray(data.jobs)) {
    throw new JSearchProviderError('missing_jobs');
  }

  return data.jobs.flatMap((entry: ProviderJob) => {
    if (!entry || typeof entry !== 'object') return [];
    if (text(entry.job_country)?.toUpperCase() !== 'PH') return [];

    const applyOption = Array.isArray(entry.apply_options) ? entry.apply_options[0] : null;
    const applyUrl = [text(entry.job_apply_link), text(applyOption?.apply_link)].find(isHttpUrl);
    const externalId = text(entry.job_uid) || text(entry.job_id);
    if (!applyUrl || !externalId) return [];

    const cityState = [text(entry.job_city), text(entry.job_state)].filter(Boolean).join(', ');
    return [
      {
        externalId,
        source: 'jsearch' as const,
        title: text(entry.job_title) || 'Untitled role',
        company: text(entry.employer_name) || '',
        location: text(entry.job_location) || cityState,
        employmentType: text(entry.job_employment_type),
        postedAt: text((entry as { job_posted_at_datetime_utc?: unknown }).job_posted_at_datetime_utc),
        applyUrl,
        description: normalizeDescription(entry.job_description),
        publisher: text(entry.job_publisher),
      },
    ];
  });
}

export async function fetchJSearchJobs(query: string, apiKey: string): Promise<NormalizedJob[]> {
  const url = new URL('https://jsearch.p.rapidapi.com/search-v2');
  url.searchParams.set('query', query);
  url.searchParams.set('num_pages', '1');
  url.searchParams.set('country', 'ph');
  url.searchParams.set('date_posted', 'all');

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    });
  } catch {
    throw new JSearchProviderError('provider_unreachable');
  }

  if (!response.ok) {
    throw new JSearchProviderError('provider_http_error', response.status);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new JSearchProviderError('provider_non_json');
  }

  return normalizeJSearchResponse(payload);
}
