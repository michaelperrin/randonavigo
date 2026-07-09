export type ThemeKey = "eau" | "foret" | "champetre" | "patrimoine";

export interface ThemeConfig {
  label: string;
  slug: string;
  description: string;
  color: string;
  accent: string;
  /** Contenu SVG (paths) de l'icône du thème, tracé en line-art dans un viewBox 24×24 */
  icon: string;
}

export const themes: Record<ThemeKey, ThemeConfig> = {
  eau: {
    label: "Au bord de l'eau",
    slug: "au-bord-de-leau",
    description:
      "Étangs, rivières, canaux : des randonnées au fil de l'eau en Île-de-France.",
    color: "sky",
    accent: "#0284c7",
    icon: '<path d="M3 7c1 .7 2 .7 3 0s2-.7 3 0 2 .7 3 0 2-.7 3 0 2 .7 3 0"/><path d="M3 12c1 .7 2 .7 3 0s2-.7 3 0 2 .7 3 0 2-.7 3 0 2 .7 3 0"/><path d="M3 17c1 .7 2 .7 3 0s2-.7 3 0 2 .7 3 0 2-.7 3 0 2 .7 3 0"/>',
  },
  foret: {
    label: "En forêt",
    slug: "en-foret",
    description:
      "Sous les arbres, loin du bruit : les plus belles forêts d'Île-de-France.",
    color: "emerald",
    accent: "#059669",
    icon: '<path d="M12 3 8.5 8.5h2L7 13.5h2.5L6 18.5h12L14.5 13.5H17l-3.5-5h2z"/><path d="M12 18.5V22"/>',
  },
  champetre: {
    label: "Champêtre",
    slug: "champetre",
    description:
      "Champs, vignobles et plateaux vallonnés pour une escapade au grand air.",
    color: "amber",
    accent: "#d97706",
    icon: '<path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>',
  },
  patrimoine: {
    label: "Patrimoine",
    slug: "patrimoine",
    description:
      "Abbayes, châteaux et villages de caractère à découvrir à pied.",
    color: "rose",
    accent: "#e11d48",
    icon: '<path d="M4 20h16"/><path d="M6 20v-9M10 20v-9M14 20v-9M18 20v-9"/><path d="M4.5 11h15"/><path d="M12 3 19 8H5z"/>',
  },
} as const;

export const themeKeys = Object.keys(themes) as ThemeKey[];

export function getThemeBySlug(
  slug: string,
): { key: ThemeKey; config: ThemeConfig } | undefined {
  for (const [key, config] of Object.entries(themes)) {
    if (config.slug === slug) {
      return { key: key as ThemeKey, config };
    }
  }
  return undefined;
}
