# Truchsess manual

The user documentation for administrators and members of a Truchsess box, served at
**https://docs.truchsess.com**.

Built with [Starlight](https://starlight.astro.build/) (Astro). Built-in search, light and dark
mode, and an "Edit page" link to the page source on GitHub. No analytics and no trackers.

## Build

Requires Node.js 22.12 or newer.

```sh
npm ci            # install the exact pinned versions from package-lock.json
npm run build     # writes the site to dist/ (fails on a broken internal link or anchor)
npm run preview   # serves dist/ on your computer
npm run dev       # live preview while editing
```

All checks that run on every pull request:

```sh
npm test          # check:not-yet, build, check:text, check:pages
```

| Check | What it fails on |
| --- | --- |
| `npm run check:not-yet` | `/not-yet/` does not list the same gaps as `docs/content-inventory.md` |
| `npm run build` | a broken internal link or anchor (starlight-links-validator), a sidebar entry without a page |
| `npm run check:text` | an em dash, or a raw placeholder in curly braces, in the sources or the built pages |
| `npm run check:pages` | a missing fixed page address, or a missing link to the FAIVR store docs |

## Cloudflare Pages

Cloudflare Pages builds the site with exactly these settings:

| Setting | Value |
| --- | --- |
| Framework preset | None (or Astro; the two values below are what counts) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | (empty: the repository root) |
| Production branch | `main` |
| Environment variable | `NODE_VERSION` = `22` |

`public/_redirects` is copied into `dist/` and holds the redirects for moved pages.

## Where things are

| Path | What it is |
| --- | --- |
| `src/content/docs/` | The pages. The file path is the page address: `src/content/docs/setup/backup.mdx` is `/setup/backup/`. |
| `astro.config.mjs` | Site settings, the sidebar, and `redirects` for moved pages. |
| `src/config/support.mjs` | **The support contact**, shown on every "Not possible yet" box. It is a placeholder until the CEO fills it in. |
| `src/components/` | `NotYet` (the "Not possible yet" box), `ComingNext` ("Coming with the next update"), `Unconfirmed`, `SupportContact`. |
| `docs/content-inventory.md` | Everything a person can see and do on the box, checked against a release, and the gaps. Pages are written from it. |
| `docs/release-note-template.md` | The "what changed for users" note each product task writes. |
| `scripts/` | The checks, the list of fixed page addresses, and the generator of `/not-yet/`. |
| `CONTRIBUTING.md` | How pages are written and changed. Read it before any change. |

## Changes

Every change goes through a pull request that a person reviews and merges. Nobody pushes to `main`.
See [CONTRIBUTING.md](CONTRIBUTING.md).
