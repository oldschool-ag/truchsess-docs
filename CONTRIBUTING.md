# Contributing to the Truchsess manual

This manual is kept current by people and by the Website Owner package on the CEO's box. The
rules below apply to both.

## 1. Every change goes through a pull request

- Never push to `main`. Work on a branch and open one pull request.
- A person reviews and merges it. An agent never merges its own pull request.
- The pull request must be green: the checks in `.github/workflows/docs.yml` run on it.
  Run `npm test` before you open it.
- One pull request per release note or topic. Say in the description which box release the
  change was checked against.

## 2. The fixed-address rule

The page addresses are a contract: the FAIVR store docs link to them. The full list is in
`scripts/required-pages.mjs`, and `npm run check:pages` fails when one is missing.

- Never rename, move or delete a page on that list.
- If a page really must move, keep the old address working with a redirect, in the same pull
  request:
  1. in `astro.config.mjs`, under `redirects`: `'/old-address/': '/new-address/'`;
  2. in `public/_redirects`: `/old-address/ /new-address/ 301`;
  3. in `scripts/required-pages.mjs`: add the new address and keep the old one. The redirect
     serves the old address, so the check still finds it.
- New pages may be added. Add their address to `scripts/required-pages.mjs` and to the sidebar
  in `astro.config.mjs`.
- Agent pages live at `/agents/<store function id>/` (the old `/workers/...` addresses redirect there), one per function in the store. The id is
  the store's, never a name you choose. Each worker page links to
  `https://faivr.ai/catalog/` followed by the same id.
- The store links are fixed too (`REQUIRED_LINKS` in `scripts/required-pages.mjs`). Use exactly
  those addresses.

## 3. Verify first, then write

- The source of truth is the box itself: the Truchsess source at a published release tag.
  Read the portal page, its server and its modules; where a design note and the code disagree,
  the code wins.
- Change `docs/content-inventory.md` first: the exact label, who sees it, what it does, whether
  it can be undone, and the release it was checked against. Then change the pages.
- Something only on the main line, not yet in a published release: wrap it in
  `<ComingNext>...</ComingNext>` ("Coming with the next update"). Remove the box when the
  release is published.
- Never describe something the release does not do. When you are unsure, leave it out and note
  it in the inventory.
- Worker details from the store catalog that you have not checked on a box: keep them inside
  `<Unconfirmed>...</Unconfirmed>`.

## 4. How every task page is written

Readers are not native English speakers and not technical. Write for them:

- Plain English. Short sentences. One idea per sentence.
- No em dashes. Use a full stop, a comma or a colon. `npm run check:text` fails on an em dash.
- No raw placeholders in curly braces. Write the real value, or describe it in words.
- No jargon without a link to the glossary (`/start/glossary/`). Add new words to the glossary.
- Exact labels in bold, exactly as the portal shows them: **Update now**, **Save policy**.
- No secrets, no internal host names or IP addresses, no names of internal or partner software.
  The box's own address `https://myai.local/` is fine.

Every task page has these sections, in this order:

```md
---
title: "Short task name"
description: One sentence: what the reader can do with this page.
---
import NotYet from '~/components/NotYet.astro';

## Who can do this

Administrator, member, or both. Say where (in the office, or also on the remote address).

## Before you start

What the reader needs first, with links to the pages that cover it.

## Steps

1. One action per step, with the page and the exact label in bold.
2. Open **Administration**, sub-tab **General**, panel **Backups**.
3. Press **Back up now**.

## What you see afterwards

What the portal shows when it worked, with the exact words.

## Your choices

| Choice | What it does | When to pick it | Can you undo it? |
| --- | --- | --- | --- |
| **Label** | ... | ... | Yes / No / Partly: what stays |

<NotYet>
What the reader cannot do yet, and what to do instead.
</NotYet>

## Related pages

- [Page name](/address/)
```

The `NotYet` box adds the support contact from `src/config/support.mjs` by itself. Never type
the contact into a page.

## 5. Gaps and `/not-yet/`

- The gaps live in one table in `docs/content-inventory.md` (section "Gaps"): number, area, gap,
  workaround, who to ask.
- `/not-yet/` is generated from that table. After a change, run `npm run sync:not-yet` and
  commit both files. CI fails when they differ.
- When a release closes a gap, remove its row (keep the other numbers as they are), remove the
  `NotYet` text on the pages that mention it, and describe the new feature.

## 6. Adding a release entry

For each published box release (`truchsess-iso-<date>-<code>`):

1. Collect the release notes of the tasks in that release (`docs/release-note-template.md`).
2. Update `docs/content-inventory.md`: the "Checked against" line, new labels, closed and new gaps.
3. Update the pages each note names under "Pages to update". Remove `ComingNext` boxes for
   what this release ships.
4. Add an entry at the **top** of `src/content/docs/releases.mdx`:

   ```md
   ## truchsess-iso-20261008-f6fb33a

   Published 8 October 2026. The current release.

   - New: what a person can now do, with a link to the page.
   - Changed: what works differently.
   - Fixed: what works again.
   ```

   Move "The current release." from the previous entry to the new one. Only list what people
   see or use. Keep each entry short.
5. Run `npm run sync:not-yet` and `npm test`, then open the pull request.

## 7. Local preview

```sh
npm ci
npm run dev
```
