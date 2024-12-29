// HEADER 📌
const header = document.querySelector('.home-nav-container');
const maxHeight = 150;
const minHeight = 100;
const scaleMin = 0.8;
const scaleRange = 1 - scaleMin;
const maxScroll = 200;
function updateHeaderStyles() {
  const scrollTop = window.scrollY;
  const scrollFraction = Math.min(scrollTop / maxScroll, 1);
  const newHeight = maxHeight - scrollFraction * (maxHeight - minHeight);
  const newScale = 1 - scrollFraction * scaleRange;
  header.style.height = `${newHeight}px`;
  header.style.transform = `translateX(-50%) scale(${newScale})`;
  if (scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
updateHeaderStyles();
window.addEventListener('scroll', updateHeaderStyles);

// ACTIVE PAGE logic 📌
const navLinks = document.querySelectorAll('.nav-link');
function setActiveLink() {
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (
      (currentPath === '/' && linkPath === '/index.html') ||
      currentPath === linkPath
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
setActiveLink();
// 📌 /

// HOME link with LOGO 🔺
const logo = document.querySelector('#nav-logo');
const homeText = document.querySelector('#home-text');
const homeLinkLogo = document.querySelector('.home-link-logo');
homeLinkLogo.addEventListener('mouseenter', () => {
  logo.style.visibility = 'hidden';
  logo.style.opacity = '0';
  homeText.style.visibility = 'visible';
  homeText.style.opacity = '1';
});
homeLinkLogo.addEventListener('mouseleave', () => {
  logo.style.visibility = 'visible';
  logo.style.opacity = '1';
  homeText.style.visibility = 'hidden';
  homeText.style.opacity = '0';
});
// 📌 /

// PRELOADER 🔺
const preloader = document.getElementById('preloader');
const preloaderLogo = document.getElementById('preloader-logo');
const navLogo = document.getElementById('nav-logo');
const isFirstVisit = !sessionStorage.getItem('visited');
if (isFirstVisit) {
  preloader.classList.remove('hidden');
  const navLogoRect = navLogo.getBoundingClientRect();
  const preloaderLogoRect = preloaderLogo.getBoundingClientRect();
  const offsetX = navLogoRect.left - preloaderLogoRect.left;
  const offsetY = navLogoRect.top - preloaderLogoRect.top;
  const scaleRatio = navLogoRect.width / preloaderLogoRect.width;
  preloaderLogo.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scaleRatio})`;
  document.body.style.overflow = 'hidden';
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