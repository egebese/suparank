import type { APIRoute } from 'astro';

export const prerender = true;

const siteUrl = 'https://suparank.io';

export const GET: APIRoute = async () => {
  const sitemaps = [
    { loc: `${siteUrl}/sitemap-pages.xml` },
    { loc: `${siteUrl}/sitemap-blog.xml` },
    { loc: `${siteUrl}/sitemap-categories.xml` },
    { loc: `${siteUrl}/sitemap-authors.xml` },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.loc}</loc>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
