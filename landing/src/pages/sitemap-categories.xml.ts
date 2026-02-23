import type { APIRoute } from 'astro';
import { categories, type CategoryKey } from '../content/config';

export const prerender = true;

const siteUrl = 'https://suparank.io';

export const GET: APIRoute = async () => {
  const categoryKeys = Object.keys(categories) as CategoryKey[];

  const urls = categoryKeys.map(category => ({
    loc: `${siteUrl}/blog/category/${category}`,
    changefreq: 'weekly',
    priority: 0.7,
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
