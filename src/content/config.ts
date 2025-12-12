import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
	}),
});

const projects = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        heroImage: image().optional(),
        projectUrl: z.string().optional(),
        repoUrl: z.string().optional(),
        stack: z.array(z.string()),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = { blog, projects };
