// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://www.randonavigo.fr",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    mdx({
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    sitemap(),
    react(),
  ],
  vite: { plugins: [tailwindcss()] },
});
