# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Astro + Vite)
npm run build      # Production build
npm run preview    # Preview production build locally
```

Deployment is via Cloudflare Pages (`wrangler.jsonc`). No test suite exists.

## Architecture

**RandoNavigo** is an Astro static site for Île-de-France hiking trails accessible by public transport (Navigo pass).

### Content layer

Hikes live in `src/content/hike/` as `.mdx` files. Each file's frontmatter defines the hike metadata (see `src/content.config.ts` for the full Zod schema). Key frontmatter fields:

- `slug` — used to build the URL and locate assets
- `pubDate` — determines the URL path (`/YYYY/MM/DD/slug`) and the asset path (`src/assets/hikes/YYYY/MM/slug/pictures/`)
- `starting_point.line` / `ending_point.line` — transport line identifier (e.g. `"R"`, `"A"`, `["B", "D"]`)
- `gpx_file` — filename stored under `public/hikes/YYYY/MM/slug/gpx/` (the `YYYY/MM/slug` segments come from `pubDate` and `slug`)
- `hidden: true` — excludes the hike from all listings

**French typography in prose:** use the typographic apostrophe `’` (U+2019) in body text (`l’étang`, `j’ai`, `c’est`). Reserve the straight apostrophe `'` for frontmatter strings and MDX component attributes (e.g. `caption="..."`, image paths) where it avoids any parsing risk.

### Routing

| URL pattern | Source |
|---|---|
| `/` | `src/pages/index.astro` |
| `/YYYY/MM/DD/[slug]` | `src/pages/[...year]/[...month]/[...day]/[...slug].astro` |
| `/randonnees/` | `src/pages/randonnees/index.astro` |
| `/randonnees/[theme-slug]` | `src/pages/randonnees/[theme].astro` |
| `/randonnees-par-ligne/[line]` | `src/pages/randonnees-par-ligne/*.astro` (one file per line) |

### Images

Hike images are stored under `src/assets/hikes/YYYY/MM/slug/pictures/` and resolved at build time via `import.meta.glob` in `src/lib/getHikeImage.ts`. Pass the result of `getHikeImagePath(pubDate, slug, filename)` to `getHikeImage()` to get the `ImageMetadata` for Astro's `<Image>` component.

### Themes

Four hike themes are defined in `src/data/themes.ts` (`eau`, `foret`, `champetre`, `patrimoine`). Each hike's `.mdx` frontmatter `categories` array is matched against these keys to populate theme pages.

### Transport

`src/lib/transport.ts` classifies lines into `Network.RER`, `Network.Tram`, or `Network.Transilien`. Line identifiers are plain strings (`"A"`, `"T6"`, `"R"`, etc.). Pages under `randonnees-par-ligne/` are generated one-per-line (not dynamically) and call `getHikesForTransportLine(line)`.

### Cloudflare integration

The site is deployed to Cloudflare Pages. A D1 database (`randonavigo-engagement`) is bound as `DB` and holds `comments` and `reactions` tables (see `drizzle/migrations/`). The `functions/` directory contains Cloudflare Pages Functions (edge handlers), currently only `functions/api/kofi-webhook.js`.

### Styling

Tailwind CSS v4 (via `@tailwindcss/vite`). Fonts: Barlow / Barlow Condensed (sans, headings), Lora (serif, body text in hike posts). The `font-condensed` utility maps to Barlow Condensed.

### Key layout components

- `BaseLayout.astro` — root HTML shell, head, header, footer
- `HikePost.astro` — layout for individual hike pages (sidebar properties + main prose + gallery)
- `TopBanner.astro` — hero banner accepting `picture` (ImageMetadata), optional `video` (URL string), `overlay`, and `overlayVariant` (`"default"` | `"hero"`) props
