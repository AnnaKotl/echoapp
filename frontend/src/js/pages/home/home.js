import '/js/helpers/config';
import '/js/pages/home/products';
import '/js/pages/home/modal-form';
import '/js/partials/preloader';
import { fetchServices } from '/js/api/api';
import { cloneListItems } from '/js/pages/home/clone-items';
import { activateAdvantages } from '/js/pages/home/team-slider';

// ⚡ Lazy-load 
window.addEventListener('load', () => {
  const nonCriticalCSS = [
    '/css/partials/home-products.css',
    '/css/partials/home-prices.css',
    '/css/partials/home-partnership.css',
    '/css/partials/running-line.css',
    '/css/partials/home-team.css',
    '/css/partials/home-career.css',
    '/css/partials/home-contacts.css',
    '/css/partials/modal.css',
    '/css/partials/footer.css'
  ];

  nonCriticalCSS.forEach(path => {
    const href = new URL(path, import.meta.url).href;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // 📲 
  cloneListItems('running-list', '.running-item', 10);
  // 💸  
  fetchServices();
  // 👩🏻‍💻👨🏼‍💻 
  activateAdvantages();
});