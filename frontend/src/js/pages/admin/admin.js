import { initAdminLogin } from './admin-login.js';

document.addEventListener('DOMContentLoaded', () => {
  // © footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  initAdminLogin();
});
