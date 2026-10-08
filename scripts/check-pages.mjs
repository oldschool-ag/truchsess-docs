// Fails when a fixed page address is missing from dist/, or when a page lacks one of the FAIVR
// store links it must carry. Run `npm run build` first.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { REQUIRED_PAGES, REQUIRED_LINKS } from './required-pages.mjs';

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

if (problems.length) {
  console.error(`check-pages: ${problems.length} problem(s)`);
  for (const line of problems) console.error(`  ${line}`);
  process.exit(1);
}
console.log(`check-pages: all ${REQUIRED_PAGES.length} fixed pages present, every required store link in place`);
