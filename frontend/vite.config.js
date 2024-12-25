import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  base: './',
  root: 'src',
  build: {
    rollupOptions: {
      input: {
        main: './src/index.html',
        career: './src/pages/career.html',
        contacts: './src/pages/contacts.html',
        partnership: './src/pages/partnership.html',
        prices: './src/pages/prices.html',
        products: './src/pages/products.html',
        team: './src/pages/team.html',
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    injectHTML(),
  ],
  define: {
    'process.env': process.env
  },
});

// cd /Users/annakotlyar/Desktop/projects/echoapp
// npm run start

// push
// git status
// git add .
// git commit -m " "
// git push origin main

// build
// cd frontend
// npm run build

// or this build
// cd frontend
// npm install
// npm run build
