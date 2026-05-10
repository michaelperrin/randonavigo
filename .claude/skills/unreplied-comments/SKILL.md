---
name: unreplied-comments
description: Liste les commentaires sur RandoNavigo qui n'ont pas encore reçu de réponse de Michaël (auteur "RandoNavigo"). Utiliser quand l'utilisateur demande les commentaires en attente de réponse, ce qui reste à répondre, les commentaires sans suite, ou les visiteurs à recontacter.
---

# Unreplied Comments

Liste les commentaires d'autres auteurs auxquels Michaël n'a pas répondu sur la prod.

## Contexte

- D1 prod : `randonavigo-engagement`. Schéma de `comments` dans `drizzle/migrations/0000_init.sql` — table **plate**, pas de `parent_id` ni de `reply_to`.
- Heuristique : "sans réponse" = aucun commentaire écrit par `RandoNavigo` n'a été posté **après** ce commentaire sur la même `route_slug`.
- Michaël poste sous le nom `RandoNavigo`. Ne pas confondre avec :
  - `Mich` — visiteur (Michel/Michelle), pas Michaël.
  - `aubinonavigo` — visiteur (alias d'un randonneur, pas Michaël).
  - Tous les autres prénoms — visiteurs.

## Requête

Toujours en remote, jamais en local :

```bash
./node_modules/.bin/wrangler d1 execute randonavigo-engagement --remote --command "
SELECT c.id,
       c.route_slug,
       c.author_name,
       c.content,
       datetime(c.created_at, 'unixepoch') AS created_at,
       c.is_approved
FROM comments c
WHERE c.author_name != 'RandoNavigo'
  AND NOT EXISTS (
    SELECT 1 FROM comments r
    WHERE r.route_slug = c.route_slug
      AND r.author_name = 'RandoNavigo'
      AND r.created_at > c.created_at
  )
ORDER BY c.created_at DESC;
" --json
```

Si `wrangler` n'est pas dans `node_modules`, replier sur `rtk proxy npx wrangler …` (la rewrite hook envoie sinon `npm run wrangler` qui n'existe pas).

## Enrichissement (obligatoire)

Pour chaque ligne, extraire le dernier segment de `route_slug` et lire le `title:` du frontmatter de `src/content/hike/{slug}.mdx`. Afficher le titre en colonne principale, pas le slug brut. Si le `.mdx` est introuvable, retomber sur le slug et le signaler en italique.

Construire aussi le lien public `https://randonavigo.fr/{route_slug}` pour faciliter la réponse.

## Présentation

Une seule table Markdown, triée par `created_at` décroissant :

| # | Date | Rando | Auteur | Extrait |
|---|---|---|---|---|

- `#` = `id` du commentaire.
- `Extrait` = contenu complet si court, sinon ~200 caractères avec `…` final.
- Mettre le titre de la rando en lien vers l'URL publique.
- Si `is_approved = 0`, ajouter `⚠ en modération` dans la colonne Auteur.

## Limites à mentionner systématiquement

À écrire en notes après la table :

- Heuristique faillible : si Michaël a répondu à un fil A puis qu'un visiteur poste sur un fil B (même rando) après cette réponse, le commentaire B ressort en "sans réponse" même si le fil A est traité. C'est un effet de la table plate.
- Si un alias visiteur s'avère être Michaël (ex : nouveau pseudo qu'il utiliserait), demander confirmation avant de relancer la requête en l'ajoutant à la liste d'exclusion.
