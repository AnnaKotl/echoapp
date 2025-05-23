import '/js/helpers/config';
import '/js/pages/home/products';
import '/js/pages/home/modal-form';
import { fetchServices } from '/js/api/api';
import { cloneListItems } from '/js/pages/home/clone-items';
import { activateAdvantages } from '/js/pages/home/team-slider';

document.addEventListener('DOMContentLoaded', () => {
  // 💸 
  fetchServices();
  // 📲 
  cloneListItems('running-list', '.running-item', 10);
  // 👩🏻‍💻👨🏼‍💻 
  activateAdvantages();

  // BASED ON video
  const video = document.getElementById('video-based');
  const isHidden = window.getComputedStyle(video).display === 'none';

  if (isHidden && video) {
    video.pause();
    video.removeAttribute('autoplay');
  }
});

// © Footer config
document.getElementById("year").textContent = new Date().getFullYear();