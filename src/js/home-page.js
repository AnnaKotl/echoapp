document.addEventListener('DOMContentLoaded', function () {
  // clone PRODUCTS & running-line 📲 📱
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

  cloneListItems('first-products-list', '.first-products-item', 10);
  cloneListItems('second-products-list', '.second-products-item', 10);
  cloneListItems('running-list', '.running-item', 10);
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
});
