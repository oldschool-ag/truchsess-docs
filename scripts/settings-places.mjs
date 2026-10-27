// T143: the box's Settings places and the help section each one opens.
//
// docs/settings-places.json is a copy of SETTINGS_PLACES from the box's portal page
// (scripts/sync-settings-places.mjs refreshes it). Every place has an address in the box; its help
// is a fixed docs path and an anchor that is the place's own key:
//   /#settings            -> /settings/#settings
//   /#settings/<page>     -> /settings/<page key>/#<page key>   (The AI and costs: key ai, address plan)
//   /#advanced            -> /settings/advanced/#advanced
//   /#advanced/<topic>    -> /settings/advanced/<topic>/#<topic>
//   /#advanced/<t>/<s>    -> /settings/advanced/<t>/#<s>        (a topic with one section opens it at
//                                                               the topic's own address)
import { readFileSync } from 'node:fs';

export const PLACES_FILE = new URL('../docs/settings-places.json', import.meta.url);

export function loadPlaces(file = PLACES_FILE) {
  return JSON.parse(readFileSync(file, 'utf8')).places;
}

/** [box address, place name, docs path, section anchor or null] for every place, in the box's order. */
export function helpTargets(places = loadPlaces()) {
  const rows = [['/#settings', 'Settings', '/settings/', null]];
  for (const page of places.pages) {
    if (page.key !== 'advanced') {
      rows.push([page.href, `Settings > ${page.title}`, `/settings/${page.key}/`, null]);
      continue;
    }
    rows.push([page.href, 'Settings > Advanced', '/settings/advanced/', null]);
    for (const topic of page.topics) {
      const path = `/settings/advanced/${topic.key}/`;
      rows.push([`/#advanced/${topic.key}`, `Settings > Advanced > ${topic.title}`, path, null]);
      if (topic.sections.length > 1) {
        for (const section of topic.sections) {
          rows.push([`/#advanced/${topic.key}/${section.key}`, `Settings > Advanced > ${topic.title} > ${section.title}`, path, section.key]);
        }
      }
    }
  }
  return rows;
}

/** The help address of a place: the docs path, with the section's anchor when it has one. */
export function helpAddress([, , path, anchor]) {
  return anchor ? `${path}#${anchor}` : path;
}
