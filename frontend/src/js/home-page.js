document.addEventListener('DOMContentLoaded', function () {
  // clone running-line 📲 📱
  function cloneListItems(listId, itemClass, numCopies) {
    const list = document.getElementById(listId);
    const items = list ? list.querySelectorAll(itemClass) : [];
    if (!items.length) return;
    for (let i = 0; i < numCopies; i++) {
      items.forEach((item) => {
        const clonedItem = item.cloneNode(true);
        list.appendChild(clonedItem);
      });
    }
  }
  cloneListItems('running-list', '.running-item', 10); // running-line 
  //  📲 📱 /

  // TEAM list slider 👩🏻‍💻👨🏼‍💻
  function activateAdvantages() {
    const advantages = document.querySelectorAll('.team-list .advantage');
    if (!advantages.length) return;
    let currentIndex = 0;
    function highlightNextAdvantage() {
      advantages.forEach((adv) => adv.classList.remove('active'));
      advantages[currentIndex].classList.add('active');
      currentIndex = (currentIndex + 1) % advantages.length;
    }
    setInterval(highlightNextAdvantage, 1500);
    highlightNextAdvantage();
  }
  activateAdvantages();
  // 👩🏻‍💻👨🏼‍💻 /

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
  // 📌 /

  /* PRELOADER 🔺 */
  const preloader = document.getElementById('preloader');
  const preloaderLogo = document.getElementById('preloader-logo');
  const navLogo = document.getElementById('nav-logo');
  const navLogoRect = navLogo.getBoundingClientRect();
  const preloaderLogoRect = preloaderLogo.getBoundingClientRect();
  const offsetX = navLogoRect.left - preloaderLogoRect.left;
  const offsetY = navLogoRect.top - preloaderLogoRect.top;
  const scaleRatio = navLogoRect.width / preloaderLogoRect.width;
  preloaderLogo.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scaleRatio})`;
  setTimeout(() => {
    preloader.classList.add('hidden');
    navLogo.style.visibility = 'visible';
  }, 3000); // 3000
  /* 🔺 / */

});