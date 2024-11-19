// === PRODUCTS ===

document.addEventListener('DOMContentLoaded', function() {
  const productsList = document.getElementById('products-list');
  const items = productsList.querySelectorAll('.products-item');

  const numCopies = 10;
  for (let i = 0; i < numCopies - 1; i++) {
    items.forEach(item => {
      const clonedItem = item.cloneNode(true);
      productsList.appendChild(clonedItem);
    });
  }
});

// === /PRODUCTS ===