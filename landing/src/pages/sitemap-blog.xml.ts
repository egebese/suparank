import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/blog';

export const prerender = true;

const siteUrl = 'https://suparank.io';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const urls = posts.map(post => ({
    loc: `${siteUrl}/blog/${post.id}`,
    lastmod: (post.data.updatedAt || post.data.publishedAt).toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
