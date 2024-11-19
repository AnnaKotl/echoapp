// === PRODUCTS ===

// document.addEventListener('DOMContentLoaded', function() {
//   const productsList = document.getElementById('products-list');
//   const items = productsList.querySelectorAll('.products-item');

//   const numCopies = 10;
//   for (let i = 0; i < numCopies - 1; i++) {
//     items.forEach(item => {
//       const clonedItem = item.cloneNode(true);
//       productsList.appendChild(clonedItem);
//     });
//   }
// });

// === /PRODUCTS ===

document.addEventListener('DOMContentLoaded', function () {
  // Функція для клонування елементів списку
  function cloneListItems(listId, itemClass, numCopies) {
    const list = document.getElementById(listId);
    const items = list.querySelectorAll(itemClass);

    for (let i = 0; i < numCopies; i++) {
      items.forEach(item => {
        const clonedItem = item.cloneNode(true);
        list.appendChild(clonedItem);
      });
    }
  }

  cloneListItems('first-products-list', '.first-products-item', 10);

  cloneListItems('second-products-list', '.second-products-item', 10);
});


