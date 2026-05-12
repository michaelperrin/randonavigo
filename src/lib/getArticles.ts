import { getCollection, type CollectionEntry } from "astro:content";

/**
 * Get all articles from the collection, excluding hidden ones
 */
export async function getArticles(): Promise<CollectionEntry<"article">[]> {
  return await getCollection("article", ({ data }) => !data.hidden);
}

/**
 * Get all articles from the collection, excluding hidden ones, sorted by publication date (newest first)
 */
export async function getArticlesSorted(): Promise<
  CollectionEntry<"article">[]
> {
  const articles = await getArticles();
  return articles.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}
