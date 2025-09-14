import '/js/helpers/lazy-load-sections';
import { lazyLoadCSS } from '/js/helpers/lazy-load-css.js';

// ⚡ Lazy-load 
window.addEventListener('load', () => {
  lazyLoadCSS([
    '/css/partials/footer.css',
    '/css/partials/portfolio-cleaning-up.css',
    '/css/partials/portfolio-e-commerce.css',
    '/css/partials/portfolio-food-drink.css'
  ]);
});