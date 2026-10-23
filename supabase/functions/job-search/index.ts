import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders, requireFullAccount } from '../_shared/requireFullAccount.ts';
import {
	fetchJSearchJobs,
	JSearchProviderError,
	type NormalizedJob,
} from './jsearchAdapter.ts';

const CATEGORY_QUERIES: Record<string, string> = {
	All: '',
	IT: 'software developer',
	Design: 'graphic designer',
	Finance: 'accountant',
	Marketing: 'marketing specialist',
	'Customer Service / BPO': 'customer service call center BPO',
	Education: 'teacher education',
	Healthcare: 'healthcare medical',
	Engineering: 'engineer',
	Accounting: 'accountant accounting',
	'Hospitality & Tourism': 'hospitality tourism hotel travel',
	'Admin / Office': 'administrative office assistant',
	Sales: 'sales representative',
	'Human Resources': 'human resources recruiter',
	Legal: 'legal paralegal',
};

const ALLOWED_EMPLOYMENT_TYPES = new Set([
	'FULLTIME',
	'CONTRACTOR',
	'PARTTIME',
	'INTERN',
]);
const ALLOWED_JOB_REQUIREMENTS = new Set([
	'no_experience',
	'under_3_years_experience',
	'more_than_3_years_experience',
	'no_degree',
]);
const ALLOWED_DATE_POSTED = new Set(['all', 'today', '3days', 'week', 'month']);
const LOCATION_QUERIES: Record<string, string> = {
	philippines: 'Philippines',
	metro_manila: 'Metro Manila, Philippines',
	cebu: 'Cebu, Philippines',
	davao: 'Davao, Philippines',
	cavite: 'Cavite, Philippines',
};

type SearchFilters = {
	employmentTypes: string[];
	remoteOnly: boolean;
	datePosted: string;
	jobRequirements: string[];
	location: string;
};

const DAILY_USER_LIMIT = 5;
const DEFAULT_MONTHLY_CAP = 150;
const MAX_MONTHLY_CAP = 200;
const DEFAULT_CACHE_TTL_HOURS = 72;

type CacheEntry = {
	results: NormalizedJob[];
	fetched_at: string;
	expires_at: string;
};

const jsonResponse = (status: number, body: Record<string, unknown>) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { ...corsHeaders, 'Content-Type': 'application/json' },
	});

function positiveInteger(value: string | undefined, fallback: number): number {
	const parsed = Number(value);
	return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function monthlyCap(): number {
	return Math.min(
		positiveInteger(Deno.env.get('JOB_API_MONTHLY_CAP'), DEFAULT_MONTHLY_CAP),
		MAX_MONTHLY_CAP,
	);
}

function cacheTtlHours(): number {
	return Math.min(
		positiveInteger(Deno.env.get('JOB_CACHE_TTL_HOURS'), DEFAULT_CACHE_TTL_HOURS),
		720,
	);
}

function allowedValues(value: unknown, allowlist: Set<string>): string[] {
	if (!Array.isArray(value)) return [];
	return [...new Set(value.filter(
		(item): item is string => typeof item === 'string' && allowlist.has(item),
	))];
}

function readSearchFilters(body: Record<string, unknown>): SearchFilters {
	const requestedDate = body.datePosted;
	const requestedLocation = body.location;
	return {
		employmentTypes: allowedValues(body.employmentTypes, ALLOWED_EMPLOYMENT_TYPES),
		remoteOnly: body.remoteOnly === true,
		datePosted:
			typeof requestedDate === 'string' && ALLOWED_DATE_POSTED.has(requestedDate)
				? requestedDate
				: 'all',
		jobRequirements: allowedValues(body.jobRequirements, ALLOWED_JOB_REQUIREMENTS),
		location:
			typeof requestedLocation === 'string' &&
			Object.prototype.hasOwnProperty.call(LOCATION_QUERIES, requestedLocation)
				? requestedLocation
				: 'philippines',
	};
}

function buildSearchQuery(categoryQuery: string, searchText: string, location: string): string {
	const terms = [searchText, categoryQuery].filter(Boolean).join(' ');
	return `${terms || 'jobs'} in ${LOCATION_QUERIES[location]}`;
}

function buildFilterKey(filters: SearchFilters): string {
	return JSON.stringify({
		employmentTypes: [...filters.employmentTypes].sort(),
		remoteOnly: filters.remoteOnly,
		datePosted: filters.datePosted,
		jobRequirements: [...filters.jobRequirements].sort(),
		location: filters.location,
	});
}

async function sha256(value: string): Promise<string> {
	const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function isCacheEntry(value: unknown): value is CacheEntry {
	if (!value || typeof value !== 'object') return false;
	const entry = value as Partial<CacheEntry>;
	return (
		Array.isArray(entry.results) &&
		typeof entry.fetched_at === 'string' &&
		typeof entry.expires_at === 'string'
	);
}

function staleOrError(
	cache: CacheEntry | null,
	status: number,
	code: string,
	quotaExhausted = false,
): Response {
	if (cache?.results.length) {
		return jsonResponse(200, {
			jobs: cache.results,
			source: 'stale',
			fetchedAt: cache.fetched_at,
			quotaExhausted,
			filtersApplied: true,
			error: { code },
		});
	}

	return jsonResponse(status, {
		jobs: [],
		quotaExhausted,
		filtersApplied: false,
		error: { code },
	});
}

Deno.serve(async (req) => {
	if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
	if (req.method !== 'POST') {
		return jsonResponse(405, { error: { code: 'method_not_allowed' } });
	}

	const auth = await requireFullAccount(req);
	if (auth instanceof Response) return auth;

	let body: Record<string, unknown>;
	try {
		const parsedBody: unknown = await req.json();
		if (!parsedBody || typeof parsedBody !== 'object' || Array.isArray(parsedBody)) {
			return jsonResponse(400, { error: { code: 'invalid_request_body' } });
		}
		body = parsedBody as Record<string, unknown>;
	} catch {
		return jsonResponse(400, { error: { code: 'invalid_json' } });
	}

	const category = typeof body?.category === 'string' ? body.category : '';
	const categoryQuery = CATEGORY_QUERIES[category];
	if (typeof categoryQuery !== 'string') {
		return jsonResponse(400, { error: { code: 'invalid_category' } });
	}
	const searchText = typeof body.searchText === 'string' ? body.searchText.trim() : '';
	if (searchText.length > 120) {
		return jsonResponse(400, { error: { code: 'search_text_too_long' } });
	}
	const filters = readSearchFilters(body);
	const query = buildSearchQuery(categoryQuery, searchText, filters.location);

	// This version deliberately ignores page and returns only the first page (up to 10 listings) per category.
	const page = 1;
	const queryKey = await sha256(
		`${query.trim().toLowerCase()}\n${buildFilterKey(filters)}\n${page}`,
	);

	const supabaseUrl = Deno.env.get('SUPABASE_URL');
	const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
	if (!supabaseUrl || !serviceRoleKey) {
		return jsonResponse(500, { error: { code: 'server_not_configured' } });
	}

	const serviceClient = createClient(supabaseUrl, serviceRoleKey, {
		auth: { autoRefreshToken: false, persistSession: false },
	});

	const { data: cachedData, error: cacheReadError } = await serviceClient
		.from('job_search_cache')
		.select('results, fetched_at, expires_at')
		.eq('query_key', queryKey)
		.maybeSingle();

	if (cacheReadError) {
		return jsonResponse(503, { error: { code: 'cache_unavailable' }, jobs: [] });
	}

	const cache = isCacheEntry(cachedData) ? cachedData : null;
	const now = Date.now();
	if (cache && Date.parse(cache.expires_at) > now) {
		return jsonResponse(200, {
			jobs: cache.results,
			source: 'cache',
			fetchedAt: cache.fetched_at,
			quotaExhausted: false,
			filtersApplied: true,
		});
	}

	const apiKey = Deno.env.get('JOB_API_KEY');
	if (!apiKey) return staleOrError(cache, 503, 'provider_not_configured');

	const userHash = await sha256(`job-search:${auth.user.id}`);
	const usageDate = new Date(now).toISOString().slice(0, 10);
	const { data: dailyReserved, error: dailyReserveError } = await serviceClient.rpc(
		'reserve_job_search_daily_request',
		{
			p_user_hash: userHash,
			p_usage_date: usageDate,
			p_daily_limit: DAILY_USER_LIMIT,
		},
	);

	if (dailyReserveError) return staleOrError(cache, 503, 'daily_limit_unavailable');
	if (dailyReserved !== true) return staleOrError(cache, 429, 'daily_limit_reached', true);

	const currentMonth = new Date(now).toISOString().slice(0, 7);
	const { data: monthlyReserved, error: monthlyReserveError } = await serviceClient.rpc(
		'reserve_job_search_monthly_request',
		{
			p_provider: 'jsearch',
			p_month: currentMonth,
			p_monthly_cap: monthlyCap(),
		},
	);

	if (monthlyReserveError) return staleOrError(cache, 503, 'monthly_limit_unavailable');
	if (monthlyReserved !== true) return staleOrError(cache, 429, 'monthly_quota_exhausted', true);

	try {
		// Each uncached refresh costs one credit; the free plan allows 200/month, with
		// about 19 already used in testing. A 150 cap leaves headroom under the plan.
		// About 6 calls/day across 8 categories with a 72-hour TTL is roughly 80 refreshes/month.
		const jobs = await fetchJSearchJobs(query, apiKey, filters);
		const fetchedAt = new Date().toISOString();
		const expiresAt = new Date(Date.now() + cacheTtlHours() * 60 * 60 * 1000).toISOString();
		const { error: cacheWriteError } = await serviceClient.from('job_search_cache').upsert(
			{
				query_key: queryKey,
				category,
				page,
				results: jobs,
				fetched_at: fetchedAt,
				expires_at: expiresAt,
			},
			{ onConflict: 'query_key' },
		);

		if (cacheWriteError) return staleOrError(cache, 503, 'cache_write_failed');

		return jsonResponse(200, {
			jobs,
			source: 'live',
			fetchedAt,
			quotaExhausted: false,
			filtersApplied: true,
		});
	} catch (error) {
		if (error instanceof JSearchProviderError) {
			const isQuotaError = error.status === 429;
			const code = isQuotaError ? 'provider_quota_exhausted' : error.code;
			return staleOrError(cache, isQuotaError ? 429 : 502, code, isQuotaError);
		}

		return staleOrError(cache, 502, 'provider_unavailable');
	}
});
