import showToast from '/js/helpers/show-toast';
import spriteUrl from '/icons/sprite.svg';
import { fetchServices } from '/js/api/api';
import { initializeModalForm } from '/js/pages/home/modal-init';

document.addEventListener('DOMContentLoaded', () => {
    const modalForm = document.getElementById('modalForm');
    // const openModalBtns = document.querySelectorAll('#openModal');
    const openModalBtns = document.querySelectorAll('.js-open-modal');
    const container = document.querySelector('.prices-list');


    const openModal = (serviceName) => {
        modalForm.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        document.body.style.pointerEvents = 'none';
        modalForm.style.pointerEvents = 'auto';

        modalForm.innerHTML = `
  <div class="modal-content">
    <a class="close-modal-btn" id="close-button">
        <svg class="close-modal-icon" width="10" height="10">
            <use href="${spriteUrl}#icon-cross"></use>
        </svg>
    </a>

    <form id="requestForm" class="form">
        <div class="form-group">
            <svg class="required-icon" width="1" height="1">
                <use href="${spriteUrl}#chevron-right"></use>
            </svg>
            <input type="text" id="name" name="name" class="form-input" placeholder="Your name" required>
        </div>

        <div class="form-group">
            <svg class="required-icon" width="1" height="1">
                <use href="${spriteUrl}#chevron-right"></use>
            </svg>
            <input type="text" id="mobileNumber" name="mobileNumber" class="form-input" placeholder="Your mobile number" required>
        </div>

        <div class="form-group">
            <svg class="required-icon" width="1" height="1">
                <use href="${spriteUrl}#chevron-right"></use>
            </svg>
            <input type="email" id="email" name="email" class="form-input" placeholder="Your email" required>
        </div>

        <div class="form-group">
            <svg class="required-icon" width="1" height="1">
                <use href="${spriteUrl}#chevron-right"></use>
            </svg>
            <input type="text" id="country" name="country" class="form-input" placeholder="Your country" required>
        </div>

        <div class="form-group">
            <input type="text" id="socialNetwork" name="socialNetwork" class="form-input" placeholder="Social network for contact">
        </div>

        <p class="radio-title-label">Select a service:</p>
         <div class="form-group radio-group" id="selectedServiceGroup">
            ${['Basic', 'Standard', 'Pro', 'Premium', 'Enterprise']
                .map(
                    service => `
                <label for="service${service}" class="radio-label">
                    <input id="service${service}" class="radio-input" type="radio" name="selectedService" value="${service}" ${service === 'Basic' ? 'checked' : ''} required />
                    <span class="radio-circle"></span>
                    ${service}
                </label>`
                )
                .join('')}
        </div>

        <div class="form-group">
            <textarea id="message" name="message" class="form-textarea" placeholder="Add a comment if you wish"></textarea>
        </div>

        <button type="submit" class="form-button">Submit</button>
    </form>
  </div>
`;

        if (serviceName) {
            const radioBtn = document.querySelector(`input[name="selectedService"][value="${serviceName}"]`);
            if (radioBtn) {
                radioBtn.checked = true;
            }
        }

        const closeModalBtn = document.getElementById('close-button');
        closeModalBtn.addEventListener('click', closeModal);

        initializeModalForm(showToast);
    };

    const closeModal = () => {
        modalForm.classList.remove('modal-open');
        modalForm.innerHTML = '';
        document.body.style.overflow = '';
        document.body.style.pointerEvents = '';
    };

    container.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('js-open-modal')) {
            const serviceName = e.target.getAttribute('data-service');
            openModal(serviceName);
        }
    });

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceName = e.target.getAttribute('data-service');
            openModal(serviceName);
        });
    });

    modalForm.addEventListener('click', (e) => {
        if (e.target === modalForm) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
