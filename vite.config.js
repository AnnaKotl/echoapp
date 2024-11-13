import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        career: './src/pages/career.html',
        contact: './src/pages/contact.html',
        partnership: './src/pages/partnership.html',
        prices: './src/pages/prices.html',
        products: './src/pages/products.html',
        team: './src/pages/team.html',
      },
    },
  },
});
