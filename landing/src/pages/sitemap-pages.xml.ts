import type { APIRoute } from 'astro';

export const prerender = true;

const siteUrl = 'https://suparank.io';

// Static pages
const staticPages = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/blog', changefreq: 'daily', priority: 0.9 },
  { url: '/changelog', changefreq: 'weekly', priority: 0.6 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  { url: '/terms', changefreq: 'monthly', priority: 0.3 },
  { url: '/privacy', changefreq: 'monthly', priority: 0.3 },
];

export const GET: APIRoute = async () => {
  const urls = staticPages.map(page => ({
    loc: `${siteUrl}${page.url}`,
    changefreq: page.changefreq,
    priority: page.priority,
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
