import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  base: '/echoapp-front/', 
  root: 'src',
  build: {
    rollupOptions: {
      input: glob.sync('./src/index.html'),
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [injectHTML(), FullReload(['./src/**/*.html'])],
});
