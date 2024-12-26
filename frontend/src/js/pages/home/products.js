// NEED to FIX animation with row icons 📌

import { fetchProductIcons } from '/js/api/api';

const renderProductIcons = async () => {
  const productsWrap = document.querySelector('.products-wrap');

  try {
    const icons = await fetchProductIcons();
    if (!icons.length) {
      productsWrap.innerHTML = '<p class="error-message">Oops! Unable to load product icons due to a server connection issue...<br/>Please try refreshing the page or try again later 🥲</p>';
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

      const iconsWithClones = [...rowIcons, ...rowIcons, ...rowIcons, ...rowIcons, ...rowIcons, ...rowIcons]; // 🩼 so many copy ICONS 🌜🌛

      iconsWithClones.forEach(icon => {
        const item = document.createElement('div');
        item.classList.add('products-item');
        item.innerHTML = `
          <img src="${icon.url}" alt="${icon.name}" />
        `;
        rowContainer.appendChild(item);
      });

      productsWrap.appendChild(rowContainer);

      const animationSpeed = 80; // 70-norm (SPEED ANIMATION 🐆->🐌)

      rowContainer.style.animation = `scroll-row ${animationSpeed}s linear infinite`;
      if (rowIndex % 2 === 1) {
        rowContainer.style.animationDirection = 'reverse';
      }

      rowContainer.addEventListener('mouseenter', () => {
        rowContainer.style.animationPlayState = 'paused';
      });

      rowContainer.addEventListener('mouseleave', () => {
        rowContainer.style.animationPlayState = 'running';
      });
    }
  } catch (error) {
    console.error('Error rendering product icons:', error);
    productsWrap.innerHTML = `<p class="error-message">Error loading icons: ${error.message}</p>`;
  }
};

renderProductIcons();