const loadNonCriticalCSS = (href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

const nonCriticalStyles = [
  '/css/partials/footer.css',
  '/css/partials/portfolio-cleaning-up.css',
  '/css/partials/portfolio-e-commerce.css',
  '/css/partials/portfolio-food-drink.css'
];

window.addEventListener('load', () => {
  nonCriticalStyles.forEach(loadNonCriticalCSS);
});