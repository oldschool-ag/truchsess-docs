// Fails when the manual contains an em dash or a raw {placeholder}.
//
// 1. Em dash (U+2014): searched in every source text file of the manual (pages, components,
//    configuration, the maintainer documents) and in the built pages in dist/.
// 2. Raw placeholder: a word in curly braces such as {name} or {store function id} that a reader
//    would see. Searched in the visible text of the built pages (scripts and styles removed) and
//    in the Markdown sources that are not MDX (in MDX, braces are code, so the built page is
//    what counts). Run `npm run build` first.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const EM_DASH = '—';
const PLACEHOLDER = /\{\s*[A-Za-z][A-Za-z0-9_ .\-]{0,60}\}/g;
const SKIP_DIRS = new Set(['node_modules', '.git', '.astro', 'dist']);
const SOURCE_EXT = new Set(['.md', '.mdx', '.astro', '.mjs', '.js', '.ts', '.json', '.yml', '.yaml', '.css', '.txt']);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else files.push(path);
  }
  return files;
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

const problems = [];

// Sources: every text file outside node_modules, dist and .git (package-lock.json is generated).
for (const file of walk(root)) {
  const rel = relative(root, file);
  if (rel === 'package-lock.json') continue;
  if (rel === 'scripts/check-text.mjs') continue; // this file names the character it looks for
  if (!SOURCE_EXT.has(extname(file)) && !['README', 'CONTRIBUTING', 'LICENSE'].some(n => rel.startsWith(n))) continue;
  const text = readFileSync(file, 'utf8');
  let at = text.indexOf(EM_DASH);
  while (at !== -1) {
    problems.push(`${rel}:${lineOf(text, at)}: em dash`);
    at = text.indexOf(EM_DASH, at + 1);
  }
  if (extname(file) === '.md') {
    // Fenced code blocks are left out: a code example may show braces on purpose.
    const prose = text.replace(/```[\s\S]*?```/g, block => block.replace(/[^\n]/g, ' '));
    for (const match of prose.matchAll(PLACEHOLDER)) {
      problems.push(`${rel}:${lineOf(prose, match.index)}: raw placeholder ${match[0]}`);
    }
  }
}

// Built pages: what a reader sees.
const dist = join(root, 'dist');
if (!existsSync(dist)) {
  problems.push('dist/ is missing: run `npm run build` before this check');
} else {
  for (const file of walk(dist).filter(path => path.endsWith('.html'))) {
    const rel = relative(root, file);
    const html = readFileSync(file, 'utf8');
    const visible = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&#123;/g, '{').replace(/&#125;/g, '}')
      .replace(/&lbrace;/g, '{').replace(/&rbrace;/g, '}');
    if (visible.includes(EM_DASH) || html.includes('&mdash;') || html.includes('&#8212;')) {
      problems.push(`${rel}: em dash in the built page`);
    }
    for (const match of visible.matchAll(PLACEHOLDER)) {
      problems.push(`${rel}: raw placeholder ${match[0]} in the built page`);
    }
  }
}

if (problems.length) {
  console.error(`check-text: ${problems.length} problem(s)`);
  for (const line of problems) console.error(`  ${line}`);
  process.exit(1);
}
console.log('check-text: no em dash and no raw placeholder found');
