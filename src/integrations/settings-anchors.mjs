// T143: writes dist/settings-anchors.json at build: every help page and anchor under /settings/
// (and each alias a renamed anchor keeps), and for each place of the box's list
// (docs/settings-places.json) the page or section that explains it. The box links each Settings page to its entry in "places".
// scripts/check-settings-anchors.mjs fails the docs check when a place has no section.
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { helpAddress, helpTargets } from '../../scripts/settings-places.mjs';

const PLACE_ID = /<[a-z0-9]+\s[^>]*?\bid="([^"]+)"[^>]*?\bdata-place(?:-alias)?="[^"]*"/g;

function htmlFiles(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) htmlFiles(path, files);
    else if (name === 'index.html') files.push(path);
  }
  return files;
}

/** Every help page under /settings/ ("/settings/updates/") and every anchor on one ("/settings/advanced/support/#ssh"). */
export function collectAnchors(dist) {
  const anchors = [];
  for (const file of htmlFiles(join(dist, 'settings'))) {
    const path = `/${relative(dist, file).split(sep).slice(0, -1).join('/')}/`;
    anchors.push(path);
    for (const match of readFileSync(file, 'utf8').matchAll(PLACE_ID)) anchors.push(`${path}#${match[1]}`);
  }
  return anchors.sort();
}

export function settingsAnchors() {
  return {
    name: 'settings-anchors',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        const anchors = collectAnchors(dist);
        const known = new Set(anchors);
        const places = {};
        for (const target of helpTargets()) {
          if (known.has(helpAddress(target))) places[target[0]] = helpAddress(target);
        }
        const out = { schemaVersion: 1, site: 'https://docs.truchsess.com', places, anchors };
        writeFileSync(join(dist, 'settings-anchors.json'), `${JSON.stringify(out, null, 1)}\n`);
        logger.info(`settings-anchors.json: ${anchors.length} anchors, ${Object.keys(places).length} places`);
      },
    },
  };
}
