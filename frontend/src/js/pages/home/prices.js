export function renderServices(services) {
  const container = document.querySelector('.prices-list');

  if (!container) {
    console.error('Container .prices-list not found');
    return;
  }

  if (!services || services.length === 0) {
    console.error('No services available');
    return;
  }

  const baseFeatures = ['UI/UX Design', 'Develop', 'QA', 'Source code', 'Custom Project Management'];
  let accumulatedFeatures = [...baseFeatures];

  const createServiceItem = (service) => {
    const descriptionHTML = service.description?.length
      ? service.description.map(desc => `<p class="service-description">${desc}</p>`).join('')
      : '';

    const featuresHTML = service.features.map(feature => {
      const isNewFeature = !accumulatedFeatures.includes(feature.trim());
      return `<p class="about-service" style="color: ${isNewFeature ? 'var(--yellow)' : 'inherit'};">${feature}</p>`;
    }).join('');

    accumulatedFeatures = [...new Set([...accumulatedFeatures, ...service.features.map(f => f.trim())])];

    const li = document.createElement('li');
    li.classList.add('prices-item');
    li.innerHTML = `
      <div class="prices-item-container">
        <h4 class="service-name">${service.name}</h4>
        <hr class="prices-line"/>
        <div class="description-container">${descriptionHTML}</div>
        <div class="features-container">${featuresHTML}</div>
        <div class="order-container">
          <button type="button" class="order-btn js-open-modal normal-btn neon-btn" data-service="${service.name}">Order</button>
        </div>
      </div>
    `;
    return li;
  };

  const renderGradually = async () => {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    const chunkSize = 2;
    for (let i = 0; i < services.length; i += chunkSize) {
      const chunk = services.slice(i, i + chunkSize);
      chunk.forEach(service => fragment.appendChild(createServiceItem(service)));
      container.appendChild(fragment);

      await new Promise(r => requestAnimationFrame(r));
    }
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        renderGradually();
        observer.unobserve(container);
      }
    });
  }, { rootMargin: '200px 0px', threshold: 0.1 });

  observer.observe(container);
}
