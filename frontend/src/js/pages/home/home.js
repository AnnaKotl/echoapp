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
