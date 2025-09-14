// ⚡ Lazy-load 
window.addEventListener('load', () => {
  const nonCriticalCSS = [
    '/css/partials/footer.css',
    '/css/partials/portfolio-cleaning-up.css',
    '/css/partials/portfolio-e-commerce.css',
    '/css/partials/portfolio-food-drink.css'
  ];

  nonCriticalCSS.forEach(path => {
    const href = new URL(path, import.meta.url).href;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });
});
