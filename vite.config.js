import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  base: '/echoapp-front/',
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
});

// import { defineConfig } from 'vite';
// import glob from 'glob';
// import injectHTML from 'vite-plugin-html-inject';
// import FullReload from 'vite-plugin-full-reload';

// export default defineConfig({
//   root: 'src',
//   build: {
//     rollupOptions: {
//       input: glob.sync('./src/*.html'),
//     },
//     outDir: '../dist',
//   },
//   plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
// });