import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      // Additional fields for your blog posts
      slug: z.string().optional(),
      categories: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      pictures: z.array(z.string()).optional(),
      main_picture: z.string().optional(),
      distance: z.number().optional(),
      gpx_file: z.string().optional(),
      starting_point: z
        .object({
          station: z.string(),
          line: z.union([z.string(), z.array(z.string())]),
        })
        .optional(),
      ending_point: z
        .object({
          station: z.string(),
          line: z.union([z.string(), z.array(z.string())]),
        })
        .optional(),
      favorite: z.boolean().optional(),
      hidden: z.boolean().optional(),
    }),
});

export const collections = { blog };
