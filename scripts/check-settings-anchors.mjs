// T143: fails when a place of the box's Settings list (docs/settings-places.json) has no help
// page or section, when dist/settings-anchors.json does not say so, or when an anchor is used twice on a
// page. Run `npm run build` first.
import { existsSync, readFileSync } from 'node:fs';
import { helpAddress, helpTargets } from './settings-places.mjs';

const file = new URL('../dist/settings-anchors.json', import.meta.url);
const problems = [];
if (!existsSync(file)) {
  console.error('check-settings-anchors: dist/settings-anchors.json is missing; run `npm run build` first');
  process.exit(1);
}
const published = JSON.parse(readFileSync(file, 'utf8'));
const anchors = new Set(published.anchors);
if (anchors.size !== published.anchors.length) {
  const seen = new Set();
  for (const anchor of published.anchors) {
    if (seen.has(anchor)) problems.push(`the anchor ${anchor} is used twice`);
    seen.add(anchor);
  }
}
const targets = helpTargets();
for (const row of targets) {
  const [address, name, path, anchor] = row;
  const target = helpAddress(row);
  if (!anchors.has(target)) problems.push(anchor ? `${name} (${address}) has no help section: no heading ending in "[#${anchor}]" on ${path}` : `${name} (${address}) has no help page ${path}`);
  else if (published.places[address] !== target) problems.push(`settings-anchors.json does not send ${address} to ${target}`);
}
for (const address of Object.keys(published.places)) {
  if (!targets.some(([known]) => known === address)) problems.push(`settings-anchors.json names ${address}, which is not in the box's list`);
}

if (problems.length) {
  console.error(`check-settings-anchors: ${problems.length} problem(s)`);
  for (const line of problems) console.error(`  ${line}`);
  process.exit(1);
}
console.log(`check-settings-anchors: all ${targets.length} places of the box's Settings list have their help page or section; ${published.anchors.length} anchors published`);
