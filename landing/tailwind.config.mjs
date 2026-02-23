/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C86CC2',
          dark: '#681C64',
          light: '#E8A0E4',
        },
        background: '#000000',
        foreground: '#FFFFFF',
        muted: {
          DEFAULT: '#171717',
          foreground: '#A3A3A3',
        },
        card: {
          DEFAULT: '#0A0A0A',
          foreground: '#FFFFFF',
        },
        border: '#262626',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [],
};
