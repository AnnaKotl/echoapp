import { fetchProductIcons } from '/js/api/api';

const renderProductIcons = async () => {
  const productsWrap = document.querySelector('.products-wrap');

  try {
    const icons = await fetchProductIcons();
    if (!icons.length) {
      productsWrap.innerHTML = '<p>No icons available</p>';
      return;
    }

    const rowsCount = 4;
    const iconsPerRow = Math.ceil(icons.length / rowsCount);

    productsWrap.innerHTML = '';

    const shuffledIcons = icons.sort(() => Math.random() - 0.5);

    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
      const rowContainer = document.createElement('div');
      rowContainer.classList.add('products-row');

      const rowIcons = shuffledIcons.slice(
        rowIndex * iconsPerRow,
        (rowIndex + 1) * iconsPerRow
      );

      const iconsWithClones = [...rowIcons, ...rowIcons];

      iconsWithClones.forEach(icon => {
        const item = document.createElement('div');
        item.classList.add('products-item');
        item.innerHTML = `
          <img src="${icon.url}" alt="${icon.name}" />
        `;
        rowContainer.appendChild(item);
      });

      productsWrap.appendChild(rowContainer);

      const animationSpeed = 30;
      rowContainer.style.animation = `scroll-row ${animationSpeed}s linear infinite`;
      if (rowIndex % 2 === 1) {
        rowContainer.style.animationDirection = 'reverse';
      }
    }
  } catch (error) {
    console.error('Error rendering product icons:', error);
    productsWrap.innerHTML = `<p>Error loading icons: ${error.message}</p>`;
  }
};

renderProductIcons();
