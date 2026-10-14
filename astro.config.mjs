// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://crashinteractive.dev',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  // sharp is the default image service; it emits webp with fallbacks.
  // `image.responsiveStyles` is deliberately off: it only applies to images using the
  // `layout` prop, so here it would ship ~1KB of CSS that never matches anything.
});
