import { fetchCachedProductIcons, clearCache } from '/js/api/api';

const productsWrap = document.querySelector('.products-wrap');
if (!productsWrap) console.warn('No .products-wrap container found');

const checkImageExists = async (url) => {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
};

const createImageHTML = (icon) => `
  <div class="products-item">
    <img src="${icon.url}" alt="${icon.name || 'Product Icon'}" loading="lazy" 
         onerror="this.src='/images/logo/icon-transp.png'"/>
  </div>
`;

const renderProductIcons = async () => {
  if (!productsWrap) return;

  try {
    const icons = await fetchCachedProductIcons();
    if (!icons.length) {
      productsWrap.innerHTML = `<p class="error-message">Sorry, we couldn't load the product icons right now 😕<br>Please check back shortly!</p>`;
      return;
    }

    const uniqueIconsMap = new Map();
    icons.forEach(icon => { if (icon.url && !uniqueIconsMap.has(icon.url)) uniqueIconsMap.set(icon.url, icon); });
    const uniqueIcons = Array.from(uniqueIconsMap.values());

    const validIcons = (await Promise.all(
      uniqueIcons.map(async icon => (await checkImageExists(icon.url)) ? icon : null)
    )).filter(Boolean);

    if (!validIcons.length) {
      validIcons.push({ url: '/images/logo/icon-transp.png', name: 'placeholder' });
    }

    productsWrap.innerHTML = '';

    const rowsCount = 4;
    const iconsPerRow = Math.ceil(validIcons.length / rowsCount);
    const shuffledIcons = validIcons.sort(() => Math.random() - 0.5);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
      const rowContainer = document.createElement('div');
      rowContainer.classList.add('products-row');

      const rowIcons = shuffledIcons.slice(
        rowIndex * iconsPerRow,
        (rowIndex + 1) * iconsPerRow
      );

      const iconsWithClones = [...rowIcons, ...rowIcons];

      rowContainer.innerHTML = iconsWithClones.map(createImageHTML).join('');

      productsWrap.appendChild(rowContainer);

      const animationSpeed = 30;
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

export function initProductIcons() {
  if (!productsWrap) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        renderProductIcons();
        observer.unobserve(productsWrap);
      }
    });
  }, { rootMargin: '500px 0px', threshold: 0.1 });

  observer.observe(productsWrap);
}

export const refreshProductIcons = async () => {
  clearCache('productIcons');
  await renderProductIcons();
};

renderProductIcons();
