import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import purgecss from 'vite-plugin-purgecss';
import path from 'path';
import { execSync } from 'child_process';

export default defineConfig({
  base: '/',
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
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
    cssCodeSplit: true,
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
    {
      name: 'move-html-files',
      apply: 'build',
      enforce: 'post',
      closeBundle() {
        try {
          execSync('mv ../dist/pages/*.html ../dist/ 2>/dev/null || true', { cwd: __dirname });
          execSync('rm -rf ../dist/pages/ 2>/dev/null || true', { cwd: __dirname });
        } catch (e) {
        }
      },
    },
  ],
});


// HELPERS:

// cd /Users/annakotlyar/Desktop/projects/echoapp
// npm run start

// cd /Users/annakotlyar/Desktop/projects/echoapp
// npm install
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

// cd frontend
// npm ci
// npm run build
// ls -1 dist/*.html