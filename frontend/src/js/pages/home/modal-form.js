import showToast from '/js/helpers/show-toast';
import spriteUrl from '/icons/sprite.svg';
import { initializeModalForm } from '/js/pages/home/modal-init';

document.addEventListener('DOMContentLoaded', () => {
    const modalForm = document.getElementById('modalForm');
    const openModalBtns = document.querySelectorAll('.js-open-modal');
    const container = document.querySelector('.prices-list');
    
    const adjustHeight = (field) => {
        field.style.height = 'auto';
        field.style.height = `${field.scrollHeight}px`;
    };

    const initializeMessageField = () => {
        const messageField = document.getElementById('message');
    
        if (!messageField) return;
    
        let toastShown = false;
    
        messageField.addEventListener('input', (event) => {
            const maxLength = 2000;
            const currentLength = event.target.value.length;
    
            if (currentLength > maxLength) {
                event.target.value = event.target.value.slice(0, maxLength);
    
                if (!toastShown) {
                    showToast('Message exceeds the maximum length of 2000 characters. Excess text has been removed.', false);
                    toastShown = true;
                }
            }
    
            adjustHeight(event.target);
        });
    
        adjustHeight(messageField);
    };    

    const openModal = (serviceName) => {
        modalForm.classList.add('modal-open');

        modalForm.setAttribute('aria-hidden', 'false');
        modalForm.setAttribute('role', 'dialog');
        modalForm.setAttribute('aria-labelledby', 'modal-title');

        document.body.style.overflow = 'hidden';
        document.body.style.pointerEvents = 'none';
        modalForm.style.pointerEvents = 'auto';

        modalForm.innerHTML = `
  <div class="modal-content">
    <a class="close-modal-btn" id="close-button">
        <svg class="close-modal-icon" width="30" height="30">
            <use href="${spriteUrl}#icon-cross"></use>
        </svg>
    </a>

    <h2 id="modal-title" class="modal-title visually-hidden">Request a Service</h2>

    <form id="requestForm" class="form">
        <div class="form-group">
            <svg class="required-icon" width="1" height="1">
                <use href="${spriteUrl}#chevron-right"></use>
            </svg>
            <input 
                type="text" 
                id="name" 
                name="name" 
                class="form-input" 
                placeholder="Your name" 
                autocomplete="name" 
                required
            >
        </div>

        <div class="form-group">
            <svg class="required-icon" width="1" height="1">
                <use href="${spriteUrl}#chevron-right"></use>
            </svg>
            <input 
                type="text" 
                id="mobileNumber" 
                name="mobileNumber" 
                class="form-input" 
                placeholder="Your mobile number" 
                autocomplete="tel" 
                required
            >
        </div>

        <div class="form-group">
            <svg class="required-icon" width="1" height="1">
                <use href="${spriteUrl}#chevron-right"></use>
            </svg>
            <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-input" 
                placeholder="Your email" 
                autocomplete="email" 
                required
            >
        </div>

        <div class="form-group">
            <svg class="required-icon" width="1" height="1">
                <use href="${spriteUrl}#chevron-right"></use>
            </svg>
            <input 
                type="text" 
                id="country" 
                name="country" 
                class="form-input" 
                placeholder="Your country" 
                autocomplete="country-name" 
                required
            >
        </div>

        <div class="form-group">
            <input 
            type="text" 
            id="socialNetwork" 
            name="socialNetwork" 
            class="form-input" 
            placeholder="Social network for contact"
            autocomplete="off"
            >
        </div>

        <div class="form-group-wrapp">
        <p class="radio-title-label">Select a service:</p>
         <div class="form-group radio-group" id="selectedServiceGroup">
            ${['Basic', 'Standard', 'Pro', 'Premium', 'Enterprise']
                .map(
                    service => `
                <label for="service${service}" class="radio-label">
                    <input 
                        id="service${service}" 
                        class="radio-input" 
                        type="radio" 
                        name="selectedService" 
                        value="${service}" ${service === 'Basic' ? 'checked' : ''} 
                        required 
                    />
                    <span class="radio-circle"></span>
                    ${service}
                </label>`
                )
                .join('')}
        </div>
        </div>

        <div class="form-group">
            <textarea 
                id="message" 
                name="message" 
                class="form-textarea" 
                placeholder="Add a comment if you wish"
                autocomplete="off"
                maxlength="2000"
            ></textarea>
        </div>

        <button type="submit" class="form-button neon-btn">Submit</button>
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

        document.getElementById('name').focus();

        initializeModalForm(showToast);
        initializeMessageField();
    };

    const closeModal = () => {
        modalForm.classList.remove('modal-open');
        modalForm.setAttribute('aria-hidden', 'true');
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

