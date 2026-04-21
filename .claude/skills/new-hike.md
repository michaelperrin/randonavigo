# New Hike

Use this skill when the user wants to create a new hike, initialize a hike, or add a randonnée.

## Steps

1. **Ask for the hike title** (if not already provided).
2. **Ask for the hike date** in YYYY-MM-DD format (if not already provided).
3. **Generate the slug** from the title:
   - Lowercase everything
   - Replace accented characters: é→e, è→e, ê→e, à→a, â→a, ù→u, û→u, ô→o, î→i, ï→i, ç→c, œ→oe, æ→ae
   - Replace spaces and `_` with `-`
   - Remove any character that is not `a-z`, `0-9`, or `-`
   - Collapse multiple consecutive `-` into one
   - Strip leading/trailing `-`
4. **Extract** `YYYY`, `MM`, `DD` from the date.
5. **Create the following directories** (use `mkdir -p` via Bash):
   - `src/assets/hikes/YYYY/MM/slug/pictures/`
   - `public/hikes/YYYY/MM/slug/gpx/`
6. **Create the MDX file** at `src/content/hike/slug.mdx` with this exact content (fill in title, slug, pubDate):

```mdx
---
title: TITLE
description: ""
slug: SLUG
pubDate: "YYYY-MM-DD"
categories: []
tags: []
pictures: []
main_picture: ""
distance: 0
gpx_file: SLUG.gpx
starting_point:
  station: ""
  line: ""
  comment: ""
favorite: false
---

À rédiger.
```

8. **Confirm** to the user:
   - The slug generated
   - The three paths created (pictures dir, gpx dir, mdx file)
