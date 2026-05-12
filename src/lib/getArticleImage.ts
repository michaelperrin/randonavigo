import type { ImageMetadata } from "astro";

const articleImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/articles/**/*.{jpg,jpeg,png,webp,gif}",
  { eager: true }
);

export function getArticleImage(
  slug: string,
  picture: string
): ImageMetadata | null {
  const path = `/src/assets/articles/${slug}/${picture}`;
  const entry = articleImages[path];
  if (!entry) {
    console.warn(`Article image not found: ${path}`);
    return null;
  }
  return entry.default;
}
