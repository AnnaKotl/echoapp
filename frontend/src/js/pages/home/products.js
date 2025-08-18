import { fetchProductIcons, clearCache } from '/js/api/api';

const checkImageExists = async (url) => {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
};

const renderProductIcons = async () => {
  const productsWrap = document.querySelector('.products-wrap');

  try {
    const icons = await fetchProductIcons();

    if (!icons.length) {
      productsWrap.innerHTML = `<p class="error-message">No product icons found.</p>`;
      return;
    }

    productsWrap.innerHTML = '';

    const validIcons = [];
    for (const icon of icons) {
      const exists = await checkImageExists(icon.url);
      if (exists) validIcons.push(icon);
    }

    if (!validIcons.length) {
      validIcons.push({ url: '/images/logo/icon-transp.png', name: 'placeholder' });
    }

    const rowsCount = 4;
    const iconsPerRow = Math.ceil(validIcons.length / rowsCount);
    const shuffledIcons = validIcons.sort(() => Math.random() - 0.5);

    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
      const rowContainer = document.createElement('div');
      rowContainer.classList.add('products-row');

      const rowIcons = shuffledIcons.slice(
        rowIndex * iconsPerRow,
        (rowIndex + 1) * iconsPerRow
      );

      const iconsWithClones = [...rowIcons, ...rowIcons, ...rowIcons, ...rowIcons];

      iconsWithClones.forEach(icon => {
        const item = document.createElement('div');
        item.classList.add('products-item');

        const img = document.createElement('img');
        img.src = icon.url;
        img.alt = icon.name || 'Product Icon';
        item.appendChild(img);

        rowContainer.appendChild(item);
      });

      productsWrap.appendChild(rowContainer);

      const animationSpeed = 80;
      rowContainer.style.animation = `scroll-row ${animationSpeed}s linear infinite`;
      if (rowIndex % 2 === 1) rowContainer.style.animationDirection = 'reverse';

      rowContainer.addEventListener('mouseenter', () => {
        rowContainer.style.animationPlayState = 'paused';
      });
      rowContainer.addEventListener('mouseleave', () => {
        rowContainer.style.animationPlayState = 'running';
      });
    }
  } catch (err) {
    console.error(err);
    productsWrap.innerHTML = `<p class="error-message">Error loading icons: ${err.message}</p>`;
  }
};

renderProductIcons();

export const refreshProductIcons = async () => {
  clearCache('productIcons');
  await renderProductIcons();
};
