import type { ImageMetadata } from "astro";

// This will be populated with all the hike images
const hikeImages = import.meta.glob<ImageMetadata>(
  "/src/assets/hikes/**/*.{jpg,jpeg,png,webp,gif}",
  {
    eager: true,
  }
);

export function getHikeImage(path: string): ImageMetadata | null {
  // Convert public path to assets path
  // From: /hikes/2023/03/balade-champetre-sur-les-plateaux-de-mareil-sur-mauldre/pictures/autour-de-mareil-sur-mauldre - 1.jpeg
  // To: /src/assets/hikes/2023/03/balade-champetre-sur-les-plateaux-de-mareil-sur-mauldre/pictures/autour-de-mareil-sur-mauldre - 1.jpeg

  const assetsPath = `/src/assets${path}`;

  // Find the matching image in the glob results
  for (const [filePath, image] of Object.entries(hikeImages)) {
    if (filePath === assetsPath) {
      // TODO: why default?
      return image.default;
    }
  }

  console.warn(`Image not found: ${path}`);
  return null;
}

// Helper function to get all available image paths
export function getAvailableHikeImages(): string[] {
  return Object.keys(hikeImages).map((path) => path.replace("/src/assets", ""));
}

export function getHikeImagePath(
  pubDate: Date,
  slug: string,
  picture: string
): string {
  const year = pubDate.getFullYear();
  const month = (pubDate.getMonth() + 1).toString().padStart(2, "0");

  return `/hikes/${year}/${month}/${slug}/pictures/${picture}`;
}
