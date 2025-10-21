import { fetchCachedProductIcons, fetchProductIcons, clearCache } from '/js/api/api';

const productsWrap = document.querySelector('.products-wrap');
if (!productsWrap) console.warn('⚠️ .products-wrap not found');

/**
 * Create product icon element with fade-in
 */
function createProductIcon(icon) {
  const div = document.createElement('div');
  div.classList.add('products-item');

  const img = document.createElement('img');
  img.src = icon.url;
  img.alt = icon.name || 'Product Icon';
  img.loading = 'lazy';
  img.onerror = () => (img.src = '/images/logo/icon-transp.png');
  img.style.opacity = '0';
  img.style.transform = 'scale(0.95)';
  img.addEventListener('load', () => {
    img.style.transition = 'opacity 0.6s ease-out, transform 0.4s ease-out';
    requestAnimationFrame(() => {
      img.style.opacity = '0.85';
      img.style.transform = 'scale(1)';
    });
  });

  div.appendChild(img);
  return div;
}

/**
 * Gradually append icons to DOM
 */
async function appendIconsGradually(container, icons, chunkSize = 10) {
  let index = 0;
  while (index < icons.length) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < chunkSize && index < icons.length; i++, index++) {
      fragment.appendChild(createProductIcon(icons[index]));
    }
    container.appendChild(fragment);
    await new Promise(r => requestIdleCallback ? requestIdleCallback(r) : setTimeout(r, 0));
  }
}

/**
 * Create scrolling row with cloned icons
 */
function createRow(icons, reverse = false, duration = 30) {
  const row = document.createElement('div');
  row.classList.add('products-row');
  row.style.animation = `scroll-row ${duration}s linear infinite`;
  if (reverse) row.style.animationDirection = 'reverse';

  appendIconsGradually(row, [...icons, ...icons]);

  row.addEventListener('mouseenter', () => (row.style.animationPlayState = 'paused'));
  row.addEventListener('mouseleave', () => (row.style.animationPlayState = 'running'));

  return row;
}

/**
 * Render icons with caching & smooth load
 */
async function renderProductIcons() {
  if (!productsWrap) return;
  try {
    let icons = await fetchCachedProductIcons();
    if (!icons?.length) icons = await fetchProductIcons();

    // Async refresh in background
    fetchProductIcons().then(fresh => {
      if (fresh?.length && JSON.stringify(fresh) !== JSON.stringify(icons)) {
        clearCache('productIcons');
        console.info('♻️ Product icons refreshed in background');
      }
    });

    const unique = Array.from(new Map(icons.map(i => [i.url, i])).values());
    const shuffled = unique.sort(() => Math.random() - 0.5);

    productsWrap.innerHTML = ''; // clean start

    const rowsCount = 4;
    const perRow = Math.ceil(shuffled.length / rowsCount);

    for (let i = 0; i < rowsCount; i++) {
      const rowIcons = shuffled.slice(i * perRow, (i + 1) * perRow);
      const row = createRow(rowIcons, i % 2 === 1);
      productsWrap.appendChild(row);
    }
  } catch (err) {
    console.error('⚠️ renderProductIcons failed:', err);
    productsWrap.innerHTML = `<p class="error-message">Error loading icons: ${err.message}</p>`;
  }
}

/**
 * Lazy initialize when near viewport
 */
export function initProductIcons() {
  if (!productsWrap) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        renderProductIcons();
        observer.unobserve(productsWrap);
      }
    });
  }, { rootMargin: '600px 0px', threshold: 0.05 });
  observer.observe(productsWrap);
}

/**
 * Manual refresh
 */
export async function refreshProductIcons() {
  clearCache('productIcons');
  await renderProductIcons();
}

// Auto-init if visible on load
if (productsWrap) {
  if (window.innerHeight > productsWrap.getBoundingClientRect().top)
    renderProductIcons();
  else
    initProductIcons();
}