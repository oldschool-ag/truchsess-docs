// The releases page answers to every address the box links, and to the old ones. Run `npm run build`
// first. Fails when:
// - src/data/releases.json breaks its format (scripts/sync-releases.mjs --check says the same);
// - a release (from the data file, or written by hand in releases.mdx) has no anchor with its tag,
//   the box's link: /releases/#truchsess-iso-20261030-3a29f20;
// - an entry written as "## Truchsess 2026.10.24-2bb4bff" lost its old anchor, truchsess-20261024-2bb4bff.
import { existsSync, readFileSync } from 'node:fs';
import { problemsOf } from './sync-releases.mjs';

const data = JSON.parse(readFileSync(new URL('../src/data/releases.json', import.meta.url), 'utf8'));
const source = readFileSync(new URL('../src/content/docs/releases.mdx', import.meta.url), 'utf8');
const page = new URL('../dist/releases/index.html', import.meta.url).pathname;
const problems = problemsOf(data).map(problem => `releases.json: ${problem}`);

const tags = new Set(data.releases.map(entry => entry.tag));
const oldAnchors = new Set();
for (const found of source.matchAll(/^## Truchsess (\d{4})\.(\d{2})\.(\d{2})-([0-9a-f]{7})$/gm)) {
  tags.add(`truchsess-iso-${found[1]}${found[2]}${found[3]}-${found[4]}`);
  oldAnchors.add(`truchsess-${found[1]}${found[2]}${found[3]}-${found[4]}`);
}
for (const found of source.matchAll(/^## (truchsess-iso-\d{8}-[0-9a-f]{7})$/gm)) tags.add(found[1]);

if (!existsSync(page)) {
  problems.push('dist/releases/index.html is missing: run npm run build first');
} else {
  const html = readFileSync(page, 'utf8');
  for (const tag of tags) if (!html.includes(`id="${tag}"`)) problems.push(`the releases page has no anchor for ${tag}`);
  for (const anchor of oldAnchors) if (!html.includes(`id="${anchor}"`)) problems.push(`the releases page lost its old anchor ${anchor}`);
}

for (const problem of problems) console.error(problem);
if (problems.length) process.exit(1);
console.log(`check:releases: ${tags.size} release anchors and ${oldAnchors.size} old anchors on /releases/.`);
