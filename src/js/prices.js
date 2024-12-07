// 💸 PRICES

export function renderServices(services) {
  const container = document.querySelector('.prices-list');

  if (!container) return;
  const baseFeatures = ['UI/UX Design', 'Develop', 'QA', 'Source code', 'Custom Project Management'];
  const servicesHTML = services.map(service => {
    const featuresHTML = service.features.map(feature => {
      const isNotBaseFeature = !baseFeatures.some(base => base.trim() === feature.trim());
      return `<p class="about-features" style="color: ${isNotBaseFeature ? 'var(--red)' : 'inherit'};">${feature}</p>`;
    }).join('');

    const descriptionHTML = service.description && service.description.length > 0
      ? service.description.map(desc => `<p>${desc}</p>`).join('')
      : '';

    return `
      <li class="prices-item">
        <div class="prices-item-container">
          <h4 class="service-name">${service.name}</h4>
          ${descriptionHTML ? `<div class="service-description">${descriptionHTML}</div>` : ''}
          <div class="about-service">
            ${featuresHTML}
          </div>
          <div class="order-container">
            <p class="price">${service.price}</p>
            <button type="button" class="order-btn">Order</button>
          </div>
        </div>
      </li>`;
  }).join('');

  container.innerHTML = servicesHTML;
}

// 💸 /