create table if not exists public.job_search_cache (
	query_key text primary key,
	category text not null,
	page integer not null default 1 check (page = 1),
	results jsonb not null check (jsonb_typeof(results) = 'array'),
	fetched_at timestamptz not null,
	expires_at timestamptz not null,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create index if not exists job_search_cache_expires_at_idx
	on public.job_search_cache (expires_at);

alter table public.job_search_cache enable row level security;
revoke all on table public.job_search_cache from public, anon, authenticated;
grant all on table public.job_search_cache to service_role;

create table if not exists public.api_usage (
	provider text not null,
	month text not null check (month ~ '^\d{4}-(0[1-9]|1[0-2])$'),
	request_count integer not null default 0 check (request_count >= 0),
	updated_at timestamptz not null default now(),
	primary key (provider, month)
);

alter table public.api_usage enable row level security;
revoke all on table public.api_usage from public, anon, authenticated;
grant all on table public.api_usage to service_role;

create table if not exists public.api_user_daily_usage (
	user_hash text not null check (user_hash ~ '^[0-9a-f]{64}$'),
	usage_date date not null,
	request_count integer not null default 0 check (request_count >= 0),
	updated_at timestamptz not null default now(),
	primary key (user_hash, usage_date)
);

create index if not exists api_user_daily_usage_date_idx
	on public.api_user_daily_usage (usage_date);

alter table public.api_user_daily_usage enable row level security;
revoke all on table public.api_user_daily_usage from public, anon, authenticated;
grant all on table public.api_user_daily_usage to service_role;

create or replace function public.reserve_job_search_monthly_request(
	p_provider text,
	p_month text,
	p_monthly_cap integer
)
returns boolean
language sql
security definer
set search_path = public
as $$
	with reservation as (
		insert into public.api_usage (provider, month, request_count)
		values (p_provider, p_month, 1)
		on conflict (provider, month) do update
			set request_count = public.api_usage.request_count + 1,
					updated_at = now()
			where public.api_usage.request_count < p_monthly_cap
		returning true
	)
	select coalesce((select true from reservation), false);
$$;

revoke all on function public.reserve_job_search_monthly_request(text, text, integer)
	from public, anon, authenticated;
grant execute on function public.reserve_job_search_monthly_request(text, text, integer)
	to service_role;

create or replace function public.reserve_job_search_daily_request(
	p_user_hash text,
	p_usage_date date,
	p_daily_limit integer
)
returns boolean
language sql
security definer
set search_path = public
as $$
	with reservation as (
		insert into public.api_user_daily_usage (user_hash, usage_date, request_count)
		values (p_user_hash, p_usage_date, 1)
		on conflict (user_hash, usage_date) do update
			set request_count = public.api_user_daily_usage.request_count + 1,
					updated_at = now()
			where public.api_user_daily_usage.request_count < p_daily_limit
		returning true
	)
	select coalesce((select true from reservation), false);
$$;

revoke all on function public.reserve_job_search_daily_request(text, date, integer)
	from public, anon, authenticated;
grant execute on function public.reserve_job_search_daily_request(text, date, integer)
	to service_role;
