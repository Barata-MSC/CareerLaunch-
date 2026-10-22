// Dev-only coverage test for a job-listing API (default: JSearch on RapidAPI).
// It is NOT part of the app bundle. It checks whether the API returns usable
// Philippine listings before you build the Job Finder on top of it.
//
// Usage (never commit your key; keep it in your shell, not in a file):
//   JSEARCH_API_KEY=your_key node scripts/job-api-coverage-test.mjs --save
//   JSEARCH_API_KEY=your_key node scripts/job-api-coverage-test.mjs --queries "nurse in Cebu, Philippines|teacher in Davao, Philippines"
//   node scripts/job-api-coverage-test.mjs --dry-run
//
// Each query uses ONE request from your free quota (6 by default).
// Requires Node 18+ (built-in fetch).
//
// Endpoint and field names below are the commonly documented JSearch ones, but
// they were not verified against the live docs when this file was written.
// If a field is missing in your results, check the provider docs and adjust.

import { mkdirSync, writeFileSync } from 'node:fs';

const KEY = process.env.JSEARCH_API_KEY;
const HOST = process.env.JSEARCH_HOST || 'jsearch.p.rapidapi.com';
const BASE = process.env.JSEARCH_BASE_URL || `https://${HOST}/search-v2`;
const COUNTRY = (process.env.JOB_COUNTRY || 'ph').toLowerCase();

const DEFAULT_QUERIES = [
  'software developer in Philippines',
  'customer service representative in Manila, Philippines',
  'teacher in Quezon City, Philippines',
  'nurse in Cebu, Philippines',
  'accountant in Makati, Philippines',
  'data analyst in Philippines',
];

const args = process.argv.slice(2);
const has = (name) => args.includes(name);
const valueOf = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const queries = valueOf('--queries')
  ? valueOf('--queries').split('|').map((q) => q.trim()).filter(Boolean)
  : DEFAULT_QUERIES;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const MIN_RESULTS = 5; // a query counts as usable with at least this many PH listings with apply links
const REQUIRED_USABLE = Math.ceil(queries.length * (4 / 6));

async function runQuery(query) {
  const url = new URL(BASE);
  url.searchParams.set('query', query);
  url.searchParams.set('num_pages', '1');
  url.searchParams.set('country', COUNTRY);
  url.searchParams.set('date_posted', 'all');

  const res = await fetch(url, {
    headers: { 'x-rapidapi-key': KEY, 'x-rapidapi-host': HOST },
  });

  const rateHeaders = {};
  for (const [name, value] of res.headers.entries()) {
    if (name.toLowerCase().startsWith('x-ratelimit')) rateHeaders[name] = value;
  }

  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  const jobs = Array.isArray(body?.data?.jobs) ? body.data.jobs : [];
  const inCountry = jobs.filter(
    (j) => String(j.job_country || '').toUpperCase() === COUNTRY.toUpperCase(),
  );
  const withApply = inCountry.filter((j) => j.job_apply_link);

  return {
    query,
    status: res.status,
    total: jobs.length,
    inCountry: inCountry.length,
    withApply: withApply.length,
    usable: withApply.length >= MIN_RESULTS,
    sampleTitles: inCountry.slice(0, 3).map((j) => j.job_title),
    sampleEmployers: inCountry.slice(0, 3).map((j) => j.employer_name),
    rateHeaders,
    topLevelKeys: body && typeof body === 'object' ? Object.keys(body) : [],
    firstJob: jobs[0] || null,
  };
}

function report(results) {
  const usableCount = results.filter((r) => r.usable).length;
  const verdict =
    usableCount >= REQUIRED_USABLE
      ? `PASS: ${usableCount} of ${results.length} queries returned ${MIN_RESULTS}+ listings in country "${COUNTRY.toUpperCase()}" with apply links.`
      : `FAIL: only ${usableCount} of ${results.length} queries returned ${MIN_RESULTS}+ listings in country "${COUNTRY.toUpperCase()}" with apply links (need ${REQUIRED_USABLE}).`;

  const lines = [
    '# Job API coverage test',
    '',
    `Date: ${new Date().toISOString()}`,
    `Endpoint host: ${HOST}`,
    `Country filter: ${COUNTRY.toUpperCase()}`,
    '',
    `**${verdict}**`,
    '',
    '| Query | HTTP | Results | In country | With apply link | Usable |',
    '|---|---|---|---|---|---|',
    ...results.map(
      (r) =>
        `| ${r.query} | ${r.status} | ${r.total} | ${r.inCountry} | ${r.withApply} | ${r.usable ? 'yes' : 'no'} |`,
    ),
    '',
    '## Samples',
    ...results.map(
      (r) =>
        `- ${r.query}: ${r.sampleTitles.join(' / ') || 'none'} (employers: ${r.sampleEmployers.join(', ') || 'none'})`,
    ),
    '',
    '## Rate-limit headers seen',
    ...results.map((r) => `- ${r.query}: ${JSON.stringify(r.rateHeaders)}`),
    '',
    'A sample of the raw response shape is saved next to this file as `job-api-sample.json`.',
    'Before building, read the provider terms for attribution, caching, and storage rules.',
  ];
  return { verdict, text: lines.join('\n') };
}

async function main() {
  console.log(`Queries (${queries.length}):`);
  queries.forEach((q) => console.log(`  - ${q}`));
  console.log(`This uses ${queries.length} request(s) from your quota.`);

  if (has('--dry-run')) {
    console.log('Dry run: no requests sent.');
    return;
  }
  if (!KEY) {
    console.error('Missing JSEARCH_API_KEY. Set it in your shell, do not write it into a file.');
    process.exitCode = 1;
    return;
  }

  const results = [];
  for (const query of queries) {
    try {
      const r = await runQuery(query);
      results.push(r);
      console.log(
        `[${r.status}] ${query}: ${r.total} results, ${r.inCountry} in ${COUNTRY.toUpperCase()}, ${r.withApply} with apply link`,
      );
      if (r.status === 401 || r.status === 403) {
        console.error('Authentication failed or not subscribed. Check your key and plan, then stop.');
        break;
      }
      if (r.status === 429) {
        console.error('Rate limit or quota reached. Stop and try again later.');
        break;
      }
    } catch (error) {
      console.error(`Request failed for "${query}": ${error.message}`);
      break;
    }
    await sleep(1000);
  }

  if (results.length === 0) return;

  const { verdict, text } = report(results);
  console.log(`\n${verdict}`);

  if (has('--save')) {
    mkdirSync('docs/tasks/progress', { recursive: true });
    writeFileSync('docs/tasks/progress/job-api-coverage.md', `${text}\n`);
    const withData = results.find((r) => r.firstJob);
    writeFileSync(
      'docs/tasks/progress/job-api-sample.json',
      `${JSON.stringify(
        { topLevelKeys: withData?.topLevelKeys ?? [], firstJob: withData?.firstJob ?? null },
        null,
        2,
      )}\n`,
    );
    console.log('Saved docs/tasks/progress/job-api-coverage.md and job-api-sample.json');
  }
}

main();
