// Fails when a fixed page address is missing from dist/, or when a page lacks one of the FAIVR
// store links it must carry. Run `npm run build` first.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readdirSync, statSync } from 'node:fs';
import { REQUIRED_PAGES, REQUIRED_LINKS, MOVED_PAGES } from './required-pages.mjs';
import { SUPPORT_CONTACT } from '../src/config/support.mjs';

const dist = new URL('../dist/', import.meta.url).pathname;
const problems = [];

function htmlFor(page) {
  const file = join(dist, page, 'index.html');
  return existsSync(file) ? readFileSync(file, 'utf8') : null;
}

for (const page of REQUIRED_PAGES) {
  if (htmlFor(page) === null) problems.push(`missing page ${page}`);
}
for (const [page, links] of Object.entries(REQUIRED_LINKS)) {
  const html = htmlFor(page);
  if (html === null) continue;
  for (const link of links) {
    if (!html.includes(`href="${link}"`)) problems.push(`${page} does not link to ${link}`);
  }
}

// Moved pages: a permanent (301) redirect in dist/_redirects for each old address.
const redirectsFile = join(dist, '_redirects');
const redirectLines = existsSync(redirectsFile) ? readFileSync(redirectsFile, 'utf8').split('\n').map(line => line.trim().split(/\s+/)) : [];
for (const [from, to] of Object.entries(MOVED_PAGES)) {
  if (!redirectLines.some(([a, b, code]) => a === from && b === to && code === '301')) problems.push(`no 301 redirect ${from} -> ${to} in dist/_redirects`);
  if (!REQUIRED_PAGES.includes(to)) problems.push(`moved page ${from} points to ${to}, which is not a fixed page`);
}

// The support contact: on the troubleshooting page, and once in every "Not possible yet" box.
const supportLink = `href="mailto:${SUPPORT_CONTACT}"`;
const troubleshooting = htmlFor('/troubleshooting/');
if (troubleshooting !== null && !troubleshooting.includes(supportLink)) problems.push(`/troubleshooting/ does not show the support contact ${SUPPORT_CONTACT}`);
function htmlFiles(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) htmlFiles(path, files);
    else if (name.endsWith('.html')) files.push(path);
  }
  return files;
}
let boxes = 0;
for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  for (const box of html.match(/<aside aria-label="Not possible yet"[\s\S]*?<\/aside>/g) || []) {
    boxes += 1;
    if (!box.includes(supportLink)) problems.push(`${file.slice(dist.length)}: a "Not possible yet" box without the support contact`);
  }
}
if (!boxes) problems.push('no "Not possible yet" box found in dist/: the check cannot see them');

if (problems.length) {
  console.error(`check-pages: ${problems.length} problem(s)`);
  for (const line of problems) console.error(`  ${line}`);
  process.exit(1);
}
console.log(`check-pages: all ${REQUIRED_PAGES.length} fixed pages present, ${Object.keys(MOVED_PAGES).length} moved addresses redirected (301), every required store link in place, the support contact in all ${boxes} "Not possible yet" boxes and on /troubleshooting/`);
