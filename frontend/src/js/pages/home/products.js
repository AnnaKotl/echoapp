import { fetchProductIcons, clearCache } from '/js/api/api';

const renderProductIcons = async () => {
  const productsWrap = document.querySelector('.products-wrap');
  if (!productsWrap) return;

  try {
    const icons = await fetchProductIcons();
    if (!icons.length) {
      productsWrap.innerHTML = `<p class="error-message">No product icons found.</p>`;
      return;
    }

    productsWrap.innerHTML = '';

    const rowsCount = 4;
    const iconsPerRow = Math.ceil(icons.length / rowsCount);
    const shuffledIcons = icons.sort(() => Math.random() - 0.5);

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

        const img = createImage(icon);
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

// ✅ Lazy-load
export function initProductIcons() {
  const productsWrap = document.querySelector('.products-wrap');
  if (!productsWrap) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        renderProductIcons();
        observer.unobserve(productsWrap);
      }
    });
  }, { rootMargin: '200px 0px', threshold: 0.1 });

  observer.observe(productsWrap);
}

renderProductIcons();

export const refreshProductIcons = async () => {
  clearCache('productIcons');
  await renderProductIcons();
};

function createImage(icon) {
  const img = document.createElement('img');
  img.src = icon.url;
  img.alt = icon.name || 'Product Icon';
  img.loading = 'lazy';
  img.onerror = () => {
    img.src = '/images/logo/icon-transp.png';
  };
  return img;
}
