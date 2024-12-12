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
  }, 2000);
  /* 🔺 / */

});