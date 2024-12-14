import validationSchema from '/js/helpers/validate-form';
import { sendRequest } from '/js/api/api';
import showToast from '/js/helpers/show-toast';
import spriteUrl from '/icons/sprite.svg';

document.addEventListener('DOMContentLoaded', () => {
    const modalForm = document.getElementById('modalForm');
    const openModalBtns = document.querySelectorAll('#openModal');

    const openModal = () => {
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
            <label class="radio-label" aria-label="Basic service" title="Detailed information in the Prices section">
                <input class="radio-input" type="radio" name="selectedService" value="Basic" required tabindex="0" />
                <span class="radio-circle"></span>
                Basic
            </label>
            <label class="radio-label" aria-label="Standard service" title="Detailed information in the Prices section">
                <input class="radio-input" type="radio" name="selectedService" value="Standard" required tabindex="0" />
                <span class="radio-circle"></span>
                Standard
            </label>
            <label class="radio-label" aria-label="Pro service" title="Detailed information in the Prices section">
                <input class="radio-input" type="radio" name="selectedService" value="Pro" required tabindex="0" />
                <span class="radio-circle"></span>
                Pro
            </label>
            <label class="radio-label" aria-label="Premium service" title="Detailed information in the Prices section">
                <input class="radio-input" type="radio" name="selectedService" value="Premium" required tabindex="0" />
                <span class="radio-circle"></span>
                Premium
            </label>
            <label class="radio-label" aria-label="Enterprise service" title="Detailed information in the Prices section">
                <input class="radio-input" type="radio" name="selectedService" value="Enterprise" required tabindex="0" />
                <span class="radio-circle"></span>
                Enterprise
            </label>
        </div>


        <div class="form-group">
            <textarea id="message" name="message" class="form-textarea" placeholder="Add a comment if you wish"></textarea>
        </div>

        <button type="submit" class="form-button">Submit</button>
    </form>
    
  </div>
`;
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.focus();
        }

        const closeModalBtn = document.getElementById('close-button');
        const form = document.getElementById('requestForm');

        closeModalBtn.addEventListener('click', closeModal);

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const formObj = Object.fromEntries(formData);

                const selectedService = document.querySelector('input[name="selectedService"]:checked');
                if (!selectedService) {
                    showToast("Please select a service.", false);
                    return;
                }

                try {
                    await validationSchema.validate(formObj, { abortEarly: false });
                    const response = await sendRequest(formObj);
                    showToast('Form submitted successfully!', true);
                    closeModal();
                } catch (error) {
                    console.error('Error submitting form:', error);

                    if (error.inner) {
                        error.inner.forEach((err) => {
                            showToast(err.message, false);
                        });
                    } else {
                        showToast(error.message, false);
                    }
                }
            });
        }
    };

    const closeModal = () => {
        modalForm.classList.remove('modal-open');
        modalForm.innerHTML = '';
        document.body.style.overflow = '';
        document.body.style.pointerEvents = '';
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
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
