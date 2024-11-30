document.addEventListener('DOMContentLoaded', function () {
  function cloneListItems(listId, itemClass, numCopies) {
    const list = document.getElementById(listId);
    const items = list ? list.querySelectorAll(itemClass) : [];

    if (!items.length) return;

    for (let i = 0; i < numCopies; i++) {
      items.forEach(item => {
        const clonedItem = item.cloneNode(true);
        list.appendChild(clonedItem);
      });
    }
  }

  cloneListItems('first-products-list', '.first-products-item', 10);
  cloneListItems('second-products-list', '.second-products-item', 10);
  cloneListItems('running-list', '.running-item', 10);
});

