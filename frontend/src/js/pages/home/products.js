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

const createImage = (icon) => {
  const img = document.createElement('img');
  img.src = icon.url;
  img.alt = icon.name || 'Product Icon';
  img.loading = 'lazy';
  img.onerror = () => { img.src = '/images/logo/icon-transp.png'; };
  return img;
};

const renderProductIcons = async () => {
  if (!productsWrap) return;

  try {
    const icons = await fetchCachedProductIcons();
    if (!icons.length) {
      productsWrap.innerHTML = `<p class="error-message">Sorry, we couldn't load the product icons right now 😕<br>Please check back shortly!</p>`;
      return;
    }

    const uniqueIconsMap = new Map();
    for (const icon of icons) {
      if (icon.url && !uniqueIconsMap.has(icon.url)) {
        uniqueIconsMap.set(icon.url, icon);
      }
    }
    const uniqueIcons = Array.from(uniqueIconsMap.values());

    const validIcons = [];
    for (const icon of uniqueIcons) {
      const exists = await checkImageExists(icon.url);
      if (exists) validIcons.push(icon);
    }

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

      const iconsWithClones = isMobile 
        ? [...rowIcons] 
        : [...rowIcons, ...rowIcons, ...rowIcons, ...rowIcons];

      iconsWithClones.forEach(icon => {
        const item = document.createElement('div');
        item.classList.add('products-item');
        item.appendChild(createImage(icon));
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

export function initProductIcons() {
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

export const refreshProductIcons = async () => {
  clearCache('productIcons');
  await renderProductIcons();
};

renderProductIcons();