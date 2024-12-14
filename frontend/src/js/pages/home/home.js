import '/js/helpers/config';
import '/js/pages/home/products';
import '/js/pages/home/modal-form';
import { initializeModalForm } from '/js/pages/home/modal-init';
import { fetchServices } from '/js/api/api';
import { cloneListItems } from '/js/pages/home/clone-items';
import { activateAdvantages } from '/js/pages/home/team-slider';
import showToast from '/js/helpers/show-toast';

document.addEventListener('DOMContentLoaded', () => {
  // 🖼️ 
  initializeModalForm(showToast);
  // 💸 
  fetchServices();
  // 📲 
  cloneListItems('running-list', '.running-item', 10);
  // 👩🏻‍💻👨🏼‍💻 
  activateAdvantages();
});