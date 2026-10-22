import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders, requireFullAccount } from '../_shared/requireFullAccount.ts';
import {
	fetchJSearchJobs,
	JSearchProviderError,
	type NormalizedJob,
} from './jsearchAdapter.ts';

const CATEGORY_QUERIES: Record<string, string> = {
	All: 'jobs in Philippines',
	IT: 'software developer in Philippines',
	Design: 'graphic designer in Philippines',
	Finance: 'accountant in Philippines',
	Marketing: 'marketing specialist in Philippines',
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
			error: { code },
		});
	}

	return jsonResponse(status, {
		jobs: [],
		quotaExhausted,
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

	let body: { category?: unknown; page?: unknown };
	try {
		body = await req.json();
	} catch {
		return jsonResponse(400, { error: { code: 'invalid_json' } });
	}

	const category = typeof body?.category === 'string' ? body.category : '';
	const query = CATEGORY_QUERIES[category];
	if (!query) return jsonResponse(400, { error: { code: 'invalid_category' } });

	// This version deliberately ignores page and returns only the first page (up to 10 listings) per category.
	const page = 1;
	const queryKey = await sha256(`${query.trim().toLowerCase()}\n${page}`);

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
		const jobs = await fetchJSearchJobs(query, apiKey);
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
