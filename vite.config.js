import { defineConfig } from 'vite';

export default defineConfig({
  base: '/echoapp/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
