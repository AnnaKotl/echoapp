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

// 🍔 menu
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const header = document.querySelector(".home-nav-container");
  const navItems = document.querySelector(".nav-items-container");

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    const expanded = header.classList.toggle("expanded");
    if (expanded) {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener("click", (e) => {
    if (header.classList.contains("expanded") && !header.contains(e.target)) {
      header.classList.remove("expanded");
      enableScroll();
    }
  });

  navItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) {
      header.classList.remove("expanded");
      enableScroll();
    }
  });
});
// 🍔 /

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