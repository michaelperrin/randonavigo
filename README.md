# RandoNavigo

RandoNavigo helps you find the perfect hike around Paris:

- All hikes can be accessed with public transportation. All you need is a ticket or a monthly/yearly Navigo pass. Just hop on a train (RER or Transilien) and you will get to the starting point.
- All hike routes are carefully crafted to maximize time spending in nature.

## Tech stack

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/) for maps.
- [PhotoSwipe](https://photoswipe.com/) for galleries.
- [Cloudflare D1](https://developers.cloudflare.com/d1/) + [Drizzle ORM](https://orm.drizzle.team/) for on-page comments and reactions (served by [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) in `functions/`).

## Getting Started

Run the development server:

```bash
npm run dev
```

### Comments & reactions (D1) — why not only `npm run dev`?

The site is built as **static HTML** with Astro. The **API** (`/api/comments`, `/api/reactions`) lives in **Cloudflare Pages Functions**, not in the Astro dev server.

| Command | What it does |
| :------ | :----------- |
| `npm run dev` | Astro + Vite only. Fast editing and HMR. **API routes are not running** here, so the engagement block cannot talk to D1 in this mode. |
| `npm run preview:cf` | Runs `astro build`, then `wrangler pages dev dist`: static output **plus** Pages Functions and a **local D1** (same shape as production). Use this to test comments and reactions end-to-end. |

Apply SQL migrations to local D1 when the schema changes:

```bash
npm run db:migrate:local
```

For production, create/bind the D1 database in the Cloudflare Pages project (binding name `DB`), add `database_id` to `wrangler.jsonc` if needed, then:

```bash
npm run db:migrate:remote
```

Generate new migration files after editing `src/db/schema.ts`:

```bash
npm run db:generate
```

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── functions/          # Cloudflare Pages Functions (API → D1)
├── drizzle/migrations/ # Applied with wrangler d1 migrations apply
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── db/             # Drizzle schema
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── drizzle.config.ts
├── wrangler.jsonc      # D1 binding, pages_build_output_dir, etc.
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                                                 |
| :------------------------ | :--------------------------------------------------------------------- |
| `npm install`             | Installs dependencies                                                  |
| `npm run dev`             | Starts Astro dev server at `localhost:4321` (no Pages Functions / D1) |
| `npm run build`           | Build production site to `./dist/`                                     |
| `npm run preview`         | Preview the static build (no D1 API)                                   |
| `npm run preview:cf`      | Build + `wrangler pages dev dist` — static site + API + local D1       |
| `npm run db:generate`     | Generate SQL migrations from Drizzle schema                            |
| `npm run db:migrate:local`  | Apply migrations to local D1                                           |
| `npm run db:migrate:remote` | Apply migrations to remote D1 (production)                             |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check`                       |
| `npm run astro -- --help` | Get help using the Astro CLI                                           |

## Licensing

Unless explicitly stated otherwise:

- Source code and technical project files are licensed under the MIT License ([`LICENSE`](LICENSE)).
- Hike editorial and media content is all rights reserved ([`LICENSE-CONTENT.md`](LICENSE-CONTENT.md)), including:
  - `src/content/hike/**`
  - `src/assets/hikes/**`
  - `public/hikes/**`
