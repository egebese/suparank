import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

const siteUrl = 'https://suparank.io';

export const GET: APIRoute = async () => {
  const authors = await getCollection('authors');

  const urls = authors.map(author => ({
    loc: `${siteUrl}/blog/authors/${author.data.slug}`,
    changefreq: 'monthly',
    priority: 0.6,
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
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
