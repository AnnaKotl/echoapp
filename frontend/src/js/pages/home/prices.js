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

  const render = () => {
    const baseFeatures = ['UI/UX Design', 'Develop', 'QA', 'Source code', 'Custom Project Management'];
    let accumulatedFeatures = [...baseFeatures];

    const servicesHTML = services.map(service => {
      const descriptionHTML = service.description?.length
        ? service.description.map(desc => `<p class="service-description">${desc}</p>`).join('')
        : '';

      const featuresHTML = service.features.map(feature => {
        const isNewFeature = !accumulatedFeatures.some(f => f.trim() === feature.trim());
        return `<p class="about-service" style="color: ${isNewFeature ? 'var(--yellow)' : 'inherit'};">${feature}</p>`;
      }).join('');

      accumulatedFeatures = [...new Set([...accumulatedFeatures, ...service.features.map(f => f.trim())])];

      return `
        <li class="prices-item">
          <div class="prices-item-container">
            <h4 class="service-name">${service.name}</h4>
            <hr class="prices-line"/>

            <div class="description-container">
              ${descriptionHTML}
            </div>

            <div class="features-container">
              ${featuresHTML}
            </div>

            <div class="order-container">
              <button 
                type="button" 
                class="order-btn js-open-modal normal-btn neon-btn" 
                data-service="${service.name}">
                Order
              </button>
            </div>
          </div>
        </li>`;
    }).join('');

    container.innerHTML = servicesHTML;
  };

  // IntersectionObserver 
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        render();
        observer.unobserve(container);
      }
    });
  }, {
    rootMargin: '200px 0px',
    threshold: 0.1
  });

  observer.observe(container);
}
