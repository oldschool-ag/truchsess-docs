// The releases page's newer entries (src/data/releases.json), from the box releases on GitHub.
//
// Each box release's body starts with its "What is new" section, one line per change in the format
// the Truchsess release job writes (.github/scripts/whats_new.py in oldschool-ag/truchsess):
//
//   What is new:
//   - **Update and grant**: When an update asks for a new permission, one Confirm installs it and grants it.
//
// Every release since `since` (tag date) with such lines gets an entry; a release whose body has
// none (an older format, or a release whose notes are being written by hand) keeps the entry that
// is already in the file. The page anchors each entry by its tag, the address the box links:
// /releases/#truchsess-iso-20261030-3a29f20.
//
//   node scripts/sync-releases.mjs           read GitHub, rewrite the file, fail when GitHub fails
//   node scripts/sync-releases.mjs --soft    the same, but keep the file when GitHub cannot be read
//                                            (npm run build runs this first: a build never fails on it)
//   node scripts/sync-releases.mjs --check   only check the file's format (npm test)
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = new URL('../src/data/releases.json', import.meta.url);
const API = 'https://api.github.com/repos/oldschool-ag/truchsess/releases?per_page=100';
export const TAG_RE = /^truchsess-iso-(20\d{2})(\d{2})(\d{2})-([0-9a-f]{7,40})$/;
// the same line the release job writes and the box reads: "- **Title**: sentence"
export const LINE_RE = /^\s*[-*+]\s+\*\*([^*]+?)\*\*\s*:?\s*(.+)$/;

export function whatIsNew(body) {
  const lines = [];
  const text = String(body || '').replace(/\r\n/g, '\n');
  const start = text.search(/^\s*(?:#+\s*)?what is new\s*:?\s*$/im);
  if (start < 0) return lines;
  for (const raw of text.slice(start).split('\n').slice(1)) {
    if (!raw.trim()) {
      if (lines.length) break;
      continue;
    }
    const found = raw.match(LINE_RE);
    if (!found) break;
    lines.push({ title: found[1].trim().replace(/[:.]$/, ''), text: found[2].trim() });
  }
  return lines;
}

export function version(tag) {
  const found = tag.match(TAG_RE);
  return `${found[1]}.${found[2]}.${found[3]}-${found[4].slice(0, 7)}`;
}

export function problemsOf(doc) {
  const problems = [];
  if (!doc || !Array.isArray(doc.releases)) return ['the file has no "releases" list'];
  const seen = new Set();
  doc.releases.forEach((entry, index) => {
    const name = entry && entry.tag ? entry.tag : `entry ${index + 1}`;
    if (!entry || !TAG_RE.test(entry.tag || '')) problems.push(`${name}: no truchsess-iso tag`);
    else if (entry.version !== version(entry.tag)) problems.push(`${name}: version ${entry.version} does not match its tag`);
    if (seen.has(entry && entry.tag)) problems.push(`${name}: listed twice`);
    seen.add(entry && entry.tag);
    if (!entry || Number.isNaN(Date.parse(entry.publishedAt))) problems.push(`${name}: no publishedAt`);
    if (!entry || !Array.isArray(entry.lines) || !entry.lines.length) problems.push(`${name}: no lines`);
    for (const line of (entry && entry.lines) || []) {
      if (!line || !String(line.title || '').trim() || !String(line.text || '').trim()) problems.push(`${name}: a line without its title or its sentence`);
      else if (line.title.trim().split(/\s+/).length > 8) problems.push(`${name}: "${line.title}" is longer than 8 words`);
    }
  });
  const order = doc.releases.map(entry => Date.parse(entry && entry.publishedAt));
  if (order.some((value, index) => index && value > order[index - 1])) problems.push('the releases are not newest first');
  return problems;
}

export function merge(doc, releases) {
  const kept = new Map((doc.releases || []).map(entry => [entry.tag, entry]));
  const since = String(doc.since || '').replace(/-/g, '');
  for (const release of releases) {
    const found = String(release.tag_name || '').match(TAG_RE);
    if (!found || release.draft || `${found[1]}${found[2]}${found[3]}` < since) continue;
    const lines = whatIsNew(release.body);
    if (!lines.length) continue;
    kept.set(release.tag_name, { tag: release.tag_name, version: version(release.tag_name), publishedAt: release.published_at || release.created_at, lines });
  }
  const entries = [...kept.values()].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  return { ...doc, releases: entries };
}

async function main(args) {
  const doc = JSON.parse(readFileSync(FILE, 'utf8'));
  if (args.includes('--check')) {
    const problems = problemsOf(doc);
    for (const problem of problems) console.error(`releases.json: ${problem}`);
    if (problems.length) process.exit(1);
    console.log(`releases.json: ${doc.releases.length} releases, the format is right.`);
    return;
  }
  let releases;
  try {
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'truchsess-docs' };
    let response = null;
    if (process.env.GITHUB_TOKEN) {
      response = await fetch(API, { headers: { ...headers, Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }, signal: AbortSignal.timeout(20000) });
    }
    // the releases are public: a token that does not fit this repository is not needed
    if (!response || response.status === 401 || response.status === 403) response = await fetch(API, { headers, signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error(`GitHub answered ${response.status}`);
    releases = await response.json();
  } catch (error) {
    if (args.includes('--soft')) {
      console.warn(`sync-releases: ${error.message}; the releases page keeps src/data/releases.json as it is.`);
      return;
    }
    throw error;
  }
  const merged = merge(doc, releases);
  const problems = problemsOf(merged);
  if (problems.length) throw new Error(problems.join('; '));
  writeFileSync(FILE, JSON.stringify(merged, null, 2) + '\n');
  console.log(`sync-releases: ${merged.releases.length} releases since ${doc.since}.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main(process.argv.slice(2)).catch(error => {
    console.error(`sync-releases: ${error.message}`);
    process.exit(1);
  });
}
