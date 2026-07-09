import type { ImageMetadata } from "astro";
import { themes, themeKeys, type ThemeKey, type ThemeConfig } from "~/data/themes";
import { getHikesForTheme } from "~/lib/getHikes";
import { getHikeImage, getHikeImagePath } from "~/lib/getHikeImage";

export interface ThemeData {
  key: ThemeKey;
  config: ThemeConfig;
  total: number;
  /** Photo d'ambiance du thème : la photo principale de sa randonnée la plus récente */
  coverImage: ImageMetadata | null;
}

export async function getThemeData(key: ThemeKey): Promise<ThemeData> {
  const hikes = await getHikesForTheme(key);
  const cover = hikes[0];
  const coverImage = cover
    ? getHikeImage(
        getHikeImagePath(
          cover.data.pubDate,
          cover.data.slug,
          cover.data.main_picture,
        ),
      )
    : null;

  return {
    key,
    config: themes[key],
    total: hikes.length,
    coverImage,
  };
}

export async function getThemesData(): Promise<ThemeData[]> {
  return Promise.all(themeKeys.map(getThemeData));
}
