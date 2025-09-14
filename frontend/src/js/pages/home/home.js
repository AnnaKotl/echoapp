import '/js/helpers/config';
import '/js/pages/home/products';
import '/js/pages/home/modal-form';
import '/js/partials/preloader';
import { fetchServices } from '/js/api/api';
import { cloneListItems } from '/js/pages/home/clone-items';
import { activateAdvantages } from '/js/pages/home/team-slider';

document.addEventListener('DOMContentLoaded', () => {
  // 📲 
  cloneListItems('running-list', '.running-item', 10);
  // 💸  
  fetchServices();
  // 👩🏻‍💻👨🏼‍💻 
  activateAdvantages();
});

// ⚡ Lazy-load
const loadNonCriticalCSS = (href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

const nonCriticalStyles = [
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

window.addEventListener('load', () => {
  nonCriticalStyles.forEach(loadNonCriticalCSS);
});