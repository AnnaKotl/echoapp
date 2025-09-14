import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import purgecss from 'vite-plugin-purgecss';
import path from 'path';

export default defineConfig({
  base: './',
  root: 'src',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        portfolio: path.resolve(__dirname, 'src/pages/portfolio.html'),
        cleaningApp: path.resolve(__dirname, 'src/pages/cleaning-app.html'),
        eCommerce: path.resolve(__dirname, 'src/pages/e-commerce.html'),
        foodDrink: path.resolve(__dirname, 'src/pages/food-drink.html'),
        admin: path.resolve(__dirname, 'src/pages/admin.html'),
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    injectHTML(),
    purgecss({
      content: [
        path.resolve(__dirname, 'src/**/*.html'),
        path.resolve(__dirname, 'src/**/*.js'),
      ],
      safelist: [
        /^modal/,
        /^running/,
        /^active/,
        /^visible/,
      ],
    }),
  ],
});


// HELPERS:

// cd /Users/annakotlyar/Desktop/projects/echoapp
// npm run start

// push:
// git status
// git add .
// git commit -m " "
// git push origin main

// build:
// cd frontend
// npm run build

// or this build:
// cd frontend
// npm install
// npm run build