import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    expressiveCode({
      themes: ['github-dark'],
      styleOverrides: {
        codeFontFamily: 'Geist Mono, monospace',
        codeFontSize: '0.875rem',
        codeBackground: '#0A0A0A',
        borderColor: '#262626',
        borderRadius: '0.5rem',
      },
      defaultProps: {
        showLineNumbers: false,
        wrap: true,
      },
    }),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  site: 'https://suparank.io',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});