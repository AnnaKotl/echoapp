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
});

// cd /Users/annakotlyar/Desktop/projects/echoapp-front
// cd
// /Users/annakotlyar/Desktop/projects/echoapp-front
// npm run start
// Ctrl + Shift + R / (Command + Shift + R) - hard reset page
// git status
// git add .
// git commit -m " "
// git push origin main






// import { defineConfig } from 'vite';
// import glob from 'glob';
// import injectHTML from 'vite-plugin-html-inject';
// import FullReload from 'vite-plugin-full-reload';

// export default defineConfig({
//   base: '/echoapp-front/frontend/',
//   root: 'src',
//   build: {
//     rollupOptions: {
//       input: {
//         main: './src/index.html',
//         career: './src/pages/career.html',
//         contacts: './src/pages/contacts.html',
//         partnership: './src/pages/partnership.html',
//         prices: './src/pages/prices.html',
//         products: './src/pages/products.html',
//         team: './src/pages/team.html',
//       },
//     },
//     outDir: '../dist', // Куди збирається проєкт
//     emptyOutDir: true, // Очищення папки перед новою збіркою
//   },
//   plugins: [
//     injectHTML(), // Плагін для ін'єкції HTML
//     FullReload(['src/**/*'], { delay: 300 }), // Автоматичне оновлення при змінах у файлах
//   ],
//   server: {
//     port: 5173, // Локальний порт сервера
//     open: true, // Автоматичне відкриття в браузері
//     watch: {
//       usePolling: true, // Виправлення проблем з автоматичним перезапуском на деяких ОС
//     },
//   },
//   resolve: {
//     alias: {
//       '@': '/src', // Швидкий доступ до папки `src`
//     },
//   },
// });