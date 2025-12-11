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
      ? service.description.map(desc => {
        const p = document.createElement('p');
        p.className = 'service-description';
        p.textContent = desc;
        return p;
      })
      : [];

    const featuresHTML = service.features.map(feature => {
      const isNewFeature = !accumulatedFeatures.includes(feature.trim());
      const p = document.createElement('p');
      p.className = 'about-service';
      p.style.color = isNewFeature ? 'var(--yellow)' : 'inherit';
      p.textContent = feature;
      return p;
    });

    accumulatedFeatures = [...new Set([...accumulatedFeatures, ...service.features.map(f => f.trim())])];

    const li = document.createElement('li');
    li.classList.add('prices-item');
    
    const container = document.createElement('div');
    container.className = 'prices-item-container';
    
    const title = document.createElement('h4');
    title.className = 'service-name';
    title.textContent = service.name;
    
    const hr = document.createElement('hr');
    hr.className = 'prices-line';
    
    const descDiv = document.createElement('div');
    descDiv.className = 'description-container';
    descriptionHTML.forEach(p => descDiv.appendChild(p));
    
    const featuresDiv = document.createElement('div');
    featuresDiv.className = 'features-container';
    featuresHTML.forEach(p => featuresDiv.appendChild(p));
    
    const orderDiv = document.createElement('div');
    orderDiv.className = 'order-container';
    
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'order-btn js-open-modal normal-btn neon-btn';
    button.dataset.service = service.name;
    button.textContent = 'Order';
    
    orderDiv.appendChild(button);
    container.appendChild(title);
    container.appendChild(hr);
    container.appendChild(descDiv);
    container.appendChild(featuresDiv);
    container.appendChild(orderDiv);
    li.appendChild(container);
    
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
