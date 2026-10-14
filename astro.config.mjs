// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://crashinteractive.dev',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // sharp is the default service; it emits avif/webp with fallbacks
    responsiveStyles: true,
  },
});
