---
name: new-hike
description: Initialise une nouvelle randonnée sur RandoNavigo — crée le fichier MDX dans src/content/hike/, le dossier d'images src/assets/hikes/YYYY/MM/slug/pictures/ et le dossier GPX public/hikes/YYYY/MM/slug/gpx/, avec frontmatter pré-rempli. Utiliser quand l'utilisateur demande à créer une nouvelle rando, initialiser une rando, ajouter une randonnée ou démarrer un nouveau post de rando.
---

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
5. **Create a new git branch from `master`** named `hike/SLUG`:
   - First check the working tree is clean: `git status --porcelain`. If it is not clean, **stop and ask the user** how to proceed (stash, commit, or abort) — never silently discard work.
   - Then run: `git checkout master && git pull --ff-only && git checkout -b hike/SLUG`.
   - If a branch with that name already exists locally, append a short suffix (e.g. `-2`) rather than overwriting.
6. **Create the following directories** (use `mkdir -p` via Bash):
   - `src/assets/hikes/YYYY/MM/slug/pictures/`
   - `public/hikes/YYYY/MM/slug/gpx/`
7. **Create the MDX file** at `src/content/hike/slug.mdx` with this exact content (fill in title, slug, pubDate):

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
   - The branch created (`hike/SLUG`)
   - The slug generated
   - The three paths created (pictures dir, gpx dir, mdx file)
