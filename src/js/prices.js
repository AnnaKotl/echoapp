// 💸 PRICES
export function renderServices(services) {
    const container = document.querySelector('.prices-list');

    if (!container) return;

    const servicesHTML = services.map(service => {
        return `
        <li class="prices-item">
          <div class="prices-item-container">
            <h4 class="service-name">${service.name}</h4>
            <p class="about-service">${service.description}</p>
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