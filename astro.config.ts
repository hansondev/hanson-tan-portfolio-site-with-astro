import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

const siteUrl = process.env.PUBLIC_SITE_URL || 'https://portfolio.hansondev.me';

export default defineConfig({
  output: 'static',
  site: siteUrl,
  server: {
    port: 3000,
    host: true,
  },
  integrations: [react()],
  vite: {
    envPrefix: ['PUBLIC_'],
    assetsInclude: ['**/*.svg'],
  },
});
