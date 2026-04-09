export type ThemeKey = "eau" | "foret" | "champetre" | "patrimoine";

export interface ThemeConfig {
  label: string;
  slug: string;
  description: string;
  color: string;
  accent: string;
}

export const themes: Record<ThemeKey, ThemeConfig> = {
  eau: {
    label: "Au bord de l'eau",
    slug: "au-bord-de-leau",
    description:
      "Étangs, rivières, canaux : des randonnées au fil de l'eau en Île-de-France.",
    color: "sky",
    accent: "#0284c7",
  },
  foret: {
    label: "En forêt",
    slug: "en-foret",
    description:
      "Sous les arbres, loin du bruit : les plus belles forêts d'Île-de-France.",
    color: "emerald",
    accent: "#059669",
  },
  champetre: {
    label: "Champêtre",
    slug: "champetre",
    description:
      "Champs, vignobles et plateaux vallonnés pour une escapade au grand air.",
    color: "amber",
    accent: "#d97706",
  },
  patrimoine: {
    label: "Patrimoine",
    slug: "patrimoine",
    description:
      "Abbayes, châteaux et villages de caractère à découvrir à pied.",
    color: "rose",
    accent: "#e11d48",
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
