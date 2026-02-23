import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Category definitions with metadata
export const categories = {
  seo: {
    name: 'SEO',
    description: 'Search engine optimization strategies and best practices',
    color: { from: '#C86CC2', to: '#681C64' }, // Purple (primary)
  },
  'content-strategy': {
    name: 'Content Strategy',
    description: 'Planning and creating content that drives results',
    color: { from: '#3B82F6', to: '#1D4ED8' }, // Blue
  },
  'technical-seo': {
    name: 'Technical SEO',
    description: 'Site architecture, performance, and crawlability',
    color: { from: '#10B981', to: '#047857' }, // Green
  },
  'case-studies': {
    name: 'Case Studies',
    description: 'Real-world examples and success stories',
    color: { from: '#F59E0B', to: '#B45309' }, // Amber
  },
  'product-updates': {
    name: 'Product Updates',
    description: 'New features and improvements to Suparank',
    color: { from: '#EC4899', to: '#BE185D' }, // Pink
  },
} as const;

export type CategoryKey = keyof typeof categories;

// Blog post collection
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    // Core fields
    title: z.string().max(100),
    description: z.string().max(300),

    // SEO overrides
    metaTitle: z.string().max(60).optional(),
    metaDescription: z.string().max(160).optional(),

    // Dates
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),

    // Taxonomy
    author: z.string(), // References authors collection by slug
    category: z.enum(['seo', 'content-strategy', 'technical-seo', 'case-studies', 'product-updates']),
    tags: z.array(z.string()).default([]),

    // Display options
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),

    // Reading time (auto-calculated, can override)
    readingTime: z.number().optional(),

    // Custom hero image (optional, defaults to generated gradient)
    heroImage: z.string().optional(),

    // FAQ Schema
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

// Authors collection
const authors = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    title: z.string(), // Job title
    avatar: z.string(),
    bio: z.string().max(500),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().url().optional(),
  }),
});

export const collections = { blog, authors };
