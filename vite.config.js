import { defineConfig } from 'vite';

export default defineConfig({
  base: '/echoapp-front/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        career: './public/pages/career.html',
        contact: './public/pages/contact.html',
        partnership: './public/pages/partnership.html',
        prices: './public/pages/prices.html',
        products: './public/pages/products.html',
        team: './public/pages/team.html',
      },
    },
  },
});
