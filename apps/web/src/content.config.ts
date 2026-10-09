import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Fair Tenancy', 'Member Benefits', 'Retail Movement Report', 'Industry Insights', 'Member News']),
    excerpt: z.string(),
    image: z.string().optional(),
    /** Original WordPress URL path, used to generate 301 redirects */
    legacyPath: z.string().optional(),
  }),
});

export const collections = { news };
