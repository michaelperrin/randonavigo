# Engagement Stats

Use this skill when the user asks for stats, a recap, or a summary of engagement data (reactions, comments) from the production D1 database.

## Context

- D1 database: `randonavigo-engagement` (binding `DB` in `wrangler.jsonc`).
- Tables: `reactions` and `comments` (schema in `drizzle/migrations/0000_init.sql`).
- Reaction types in schema: `inspire`, `prepare`, `done`. Only `inspire` (✨ "Ça donne envie") and `done` (🥾 "J'y suis allé(e)") are rendered in the UI (`src/components/Hike/HikeEngagement.tsx`).
- `route_slug` format: `YYYY/MM/DD/slug`. The final `slug` segment matches `src/content/hike/{slug}.mdx`.

## Running queries

Always use the local wrangler binary against **remote** prod (not local SQLite):

```bash
./node_modules/.bin/wrangler d1 execute randonavigo-engagement --remote --command "SQL_HERE" --json
```

`npx wrangler` is intercepted by rtk and will fail — use the direct path above.

## Common queries

### Reactions recap per hike

```sql
SELECT route_slug, type, COUNT(*) AS count
FROM reactions
GROUP BY route_slug, type
ORDER BY route_slug, type;
```

Pivot the results into one row per hike with two columns (`inspire`, `done`) and a `total`. Sort by total desc. Enrich each row with the human title by reading the `title:` frontmatter of `src/content/hike/{final-slug}.mdx` (the last path segment of `route_slug`).

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
- Use the hike title (not the slug) as the main column. Keep the slug out unless the user asks for it.
- Mention the reaction breakdown in a one-line commentary (e.g. dominant button, share of hikes with at least one vote).
- If a slug's `.mdx` file is missing (hike deleted/renamed), fall back to the slug and flag it.
