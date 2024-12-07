// 💸 PRICES
export function renderServices(services) {
  const container = document.querySelector('.prices-list');

  if (!container) return;

  const servicesHTML = services.map(service => {

    const descriptionHTML = service.description && service.description.length > 0
      ? service.description.map(desc => `<p>${desc}</p>`).join('')
      : '';

    const featuresHTML = service.features.join(', ');

    return `
      <li class="prices-item">

        <div class="prices-item-container">

          <h4 class="service-name">${service.name}</h4>

          ${descriptionHTML ? `<div class="service-description">${descriptionHTML}</div>` : ''}

          <div class="about-service">
            <span>The price of development includes:</span>
            <p class="about-features">${featuresHTML}</p>
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