# Engagement Stats

Use this skill when the user asks for stats, a recap, or a summary of engagement data (reactions, comments) from the production D1 database.

## Context

- D1 database: `randonavigo-engagement` (binding `DB` in `wrangler.jsonc`).
- Tables: `reactions` and `comments` (schema in `drizzle/migrations/0000_init.sql`).
- Reaction types in schema: `inspire`, `prepare`, `done`. Only `inspire` (✨ "Ça donne envie") and `done` (🥾 "J'y suis allé(e)") are rendered in the UI (`src/components/Hike/HikeEngagement.tsx`).
- `route_slug` format: `YYYY/MM/DD/slug`. The final `slug` segment matches `src/content/hike/{slug}.mdx`.

## Running queries

Always query **remote** prod (not local SQLite). Either of these works:

```bash
./node_modules/.bin/wrangler d1 execute randonavigo-engagement --remote --command "SQL_HERE" --json
# or, if the direct binary is unavailable:
rtk proxy npx wrangler d1 execute randonavigo-engagement --remote --command="SQL_HERE"
```

Plain `npx wrangler …` will fail: the rtk hook rewrites it to `npm run wrangler`, which has no matching script. Use `rtk proxy` to bypass the hook, or call the direct binary above.

## Common queries

### Reactions recap per hike

```sql
SELECT route_slug, type, COUNT(*) AS count
FROM reactions
GROUP BY route_slug, type
ORDER BY route_slug, type;
```

Then, in this order:

1. **Pivot** the rows into one row per hike with columns `inspire`, `done`, `total`. Sort by `total` desc.
2. **Enrich with titles — mandatory.** For each row, extract the last path segment of `route_slug` and read the `title:` frontmatter of `src/content/hike/{slug}.mdx`. Display the title as the main column; keep the slug out of the table unless the user asks.
3. If an `.mdx` file is missing (deleted/renamed hike), fall back to the slug and flag it inline.

Do not ship a response that still shows raw `route_slug` values when titles were available — that is the most common failure mode for this skill.

### Top N most reacted hikes

Same query as above, but wrap the pivot/enrichment to keep only the top N (default: 10). Always include both `inspire` and `done` columns even if one is zero — readers want the breakdown.

### Recent comments

```sql
SELECT id, route_slug, author_name, content, datetime(created_at, 'unixepoch') AS created_at, is_approved
FROM comments
ORDER BY created_at DESC
LIMIT 50;
```

### Global overview

```sql
SELECT
  (SELECT COUNT(*) FROM reactions WHERE type = 'inspire') AS inspire_total,
  (SELECT COUNT(*) FROM reactions WHERE type = 'done')    AS done_total,
  (SELECT COUNT(DISTINCT route_slug) FROM reactions)      AS hikes_with_reactions,
  (SELECT COUNT(*) FROM comments WHERE is_approved = 1)   AS comments_approved,
  (SELECT COUNT(*) FROM comments WHERE is_approved = 0)   AS comments_pending;
```

## Presentation

- Always present as a Markdown table. Include a bold **Total** row when a recap spans multiple hikes.
- Hike **title** (from `.mdx` frontmatter) is the main column — not the slug. See the enrichment step above.
- End with a short commentary (2–4 bullets): overall totals, `inspire` vs `done` ratio, number of distinct hikes that got at least one reaction, any outlier (e.g. a hike with more `done` than `inspire`).
