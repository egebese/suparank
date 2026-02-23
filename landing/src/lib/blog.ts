import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, type CategoryKey } from '../content/config';
import readingTime from 'reading-time';

export type BlogPost = CollectionEntry<'blog'>;
export type Author = CollectionEntry<'authors'>;

/**
 * Get all published blog posts, sorted by date (newest first)
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  return posts.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.data.featured);
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: CategoryKey): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.data.category === category);
}

/**
 * Get posts by author
 */
export async function getPostsByAuthor(authorSlug: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.data.author === authorSlug);
}

/**
 * Get related posts (same category, excluding current post)
 */
export async function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3
): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts
    .filter(
      (post) =>
        post.id !== currentPost.id &&
        post.data.category === currentPost.data.category
    )
    .slice(0, limit);
}

/**
 * Get author by slug
 */
export async function getAuthor(slug: string): Promise<Author | undefined> {
  const authors = await getCollection('authors');
  return authors.find((author) => author.data.slug === slug);
}

/**
 * Get all authors
 */
export async function getAllAuthors(): Promise<Author[]> {
  return getCollection('authors');
}

/**
 * Get all unique categories with post counts
 */
export async function getCategoriesWithCounts(): Promise<
  { key: CategoryKey; name: string; count: number }[]
> {
  const posts = await getPublishedPosts();
  const counts: Record<string, number> = {};

  posts.forEach((post) => {
    counts[post.data.category] = (counts[post.data.category] || 0) + 1;
  });

  return Object.entries(categories).map(([key, value]) => ({
    key: key as CategoryKey,
    name: value.name,
    count: counts[key] || 0,
  }));
}

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(content: string): number {
  const stats = readingTime(content);
  return Math.ceil(stats.minutes);
}

/**
 * Get category metadata
 */
export function getCategoryMeta(category: CategoryKey) {
  return categories[category];
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date for schema (ISO 8601)
 */
export function formatDateISO(date: Date): string {
  return date.toISOString();
}

/**
 * Generate a deterministic hash from a string (for gradient seeds)
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Generate gradient colors for a post based on category and slug
 */
export function getPostGradient(category: CategoryKey, slug: string) {
  const categoryColors = categories[category].color;
  const hash = hashString(slug);

  // Slightly vary the colors based on hash for uniqueness
  const variance = (hash % 20) - 10; // -10 to +10

  return {
    from: categoryColors.from,
    to: categoryColors.to,
    angle: (hash % 360), // Random angle
    variance,
  };
}

/**
 * Paginate array
 */
export function paginate<T>(
  items: T[],
  page: number,
  perPage: number
): { data: T[]; totalPages: number; currentPage: number; hasNext: boolean; hasPrev: boolean } {
  const totalPages = Math.ceil(items.length / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * perPage;
  const data = items.slice(start, start + perPage);

  return {
    data,
    totalPages,
    currentPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}

/**
 * Extract headings from markdown content for ToC
 */
export function extractHeadings(
  content: string
): { depth: number; text: string; slug: string }[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: { depth: number; text: string; slug: string }[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    headings.push({ depth, text, slug });
  }

  return headings;
}
