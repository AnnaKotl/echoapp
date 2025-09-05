// PRELOADER 🔺
const preloader = document.getElementById('preloader');
const preloaderLogo = document.getElementById('preloader-logo');
const navLogo = document.getElementById('nav-logo');
const isFirstVisit = !sessionStorage.getItem('visited');

if (isFirstVisit) {
  preloader.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    preloaderLogo.style.animation = 'logoFadeOut 2.5s forwards ease';
  }, 2000);

  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = 'visible';
    navLogo.style.visibility = 'visible';
    sessionStorage.setItem('visited', 'true');
  }, 3500);
} else {
  preloader.remove();
  navLogo.style.visibility = 'visible';
}
// 🔺 /