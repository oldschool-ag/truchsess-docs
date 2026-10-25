// T143: refreshes docs/settings-places.json, the copy of the box's Settings list, from the box's
// portal page. Run it when the box's list changes, and say which commit in the pull request:
//   node scripts/sync-settings-places.mjs <path to company-os-portal.html> "<repository at commit>"
import { readFileSync, writeFileSync } from 'node:fs';
import { PLACES_FILE } from './settings-places.mjs';

const [portal, source] = process.argv.slice(2);
if (!portal || !source) {
  console.error('usage: node scripts/sync-settings-places.mjs <path to company-os-portal.html> "<repository at commit>"');
  process.exit(2);
}
const match = /\/\* settingsPlaces:begin \*\/(.*?)\/\* settingsPlaces:end \*\//s.exec(readFileSync(portal, 'utf8'));
if (!match) {
  console.error(`${portal} has no settingsPlaces block`);
  process.exit(1);
}
const places = JSON.parse(match[1]);
writeFileSync(PLACES_FILE, `${JSON.stringify({ source, places }, null, 1)}\n`);
console.log(`docs/settings-places.json: ${places.pages.length} pages from ${source}`);
