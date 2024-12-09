import { fetchProductIcons } from '/js/api/api';

const renderProductIcons = async () => {
  const productsListContainer = document.querySelector('.products-wrap');

  try {
    const icons = await fetchProductIcons();

    if (!icons.length) {
      productsListContainer.innerHTML = '<p>No icons available</p>';
      return;
    }

    const rows = 4;
    const itemsPerRow = Math.ceil(icons.length / rows);

    productsListContainer.innerHTML = '';
    for (let i = 0; i < rows; i++) {
      const ul = document.createElement('ul');
      ul.classList.add('products-list');
      productsListContainer.appendChild(ul);
    }

    const lists = productsListContainer.querySelectorAll('.products-list');
    icons.forEach((icon, index) => {
      const rowIndex = index % rows;
      const li = document.createElement('li');
      li.classList.add('products-item');

      li.innerHTML = `
        <img
          src="${icon.url}"
          alt="${icon.name}"
          width="100"
          height="100"
        />
      `;

      lists[rowIndex].appendChild(li);
    });
  } catch (error) {
    console.error('Error rendering product icons:', error);
    productsListContainer.innerHTML = `<p>Error loading icons: ${error.message}</p>`;
  }
};

renderProductIcons();