import validationSchema from '/js/validate-form';
import { sendRequest } from '/js/api/api';
import showToast from '/js/toastify';

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
            <use href="/icons/sprite.svg#icon-cross"></use>
         </svg>
    </a>

    <form id="requestForm" class="form">
        <div class="form-group">
            <input type="text" id="name" name="name" class="form-input" placeholder="Enter your name" required>
        </div>
        
        <div class="form-group">
            <input type="text" id="mobileNumber" name="mobileNumber" class="form-input" placeholder="Enter your mobile number" required>
        </div>
        
        <div class="form-group">
            <input type="email" id="email" name="email" class="form-input" placeholder="Enter your email" required>
        </div>

        <div class="form-group">
            <input type="text" id="socialNetwork" name="socialNetwork" class="form-input" placeholder="Enter your social network">
        </div>
        
        <div class="form-group">
            <input type="text" id="country" name="country" class="form-input" placeholder="Enter your country" required>
        </div>
        
            <p class="radio-title-label">Select a service:</p>
        <div class="form-group radio-group" id="selectedServiceGroup">
            <label class="radio-label">
            <input type="radio" name="selectedService" value="Basic" required />
            Basic
            </label>
            <label class="radio-label">
            <input type="radio" name="selectedService" value="Standard" required />
            Standard
            </label>
            <label class="radio-label">
            <input type="radio" name="selectedService" value="Pro" required />
            Pro
            </label>
            <label class="radio-label">
            <input type="radio" name="selectedService" value="Premium" required />
            Premium
            </label>
            <label class="radio-label">
            <input type="radio" name="selectedService" value="Enterprise" required />
            Enterprise
            </label>
        </div>

        <div class="form-group">
            <textarea id="message" name="message" class="form-textarea" placeholder="Enter your message"></textarea>
        </div>

        <button type="submit" class="form-button">Submit</button>
    </form>
  </div>
`;


        const closeModalBtn = document.getElementById('close-button');
        const form = document.getElementById('requestForm');

        closeModalBtn.addEventListener('click', closeModal);

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const formObj = Object.fromEntries(formData);

                try {
                    await validationSchema.validate(formObj, { abortEarly: false });
                    const response = await sendRequest(formObj);
                    showToast('Form submitted successfully!', true);
                    closeModal();
                } catch (error) {
                    console.error('Error submitting form:', error);
                    showToast(error.message, false);
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


// const BACKENDSCEMA = ({
//     name: {
//         type: String,
//         required: [true, 'Name is required'],
//         minlength: 3,
//         maxlength: 50
//     },
//     mobileNumber: {
//         type: String,
//         required: [true, 'Mobile number is required'],
//         validate: {
//             validator: (v) => /^(?:\+?380\d{9}|\d{10})$/.test(v),
//             message: 'Mobile number must be in a valid format: +380XXXXXXXXX or 096XXXXXXXX'
//         }
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         validate: {
//             validator: (v) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
//             message: 'Invalid email format'
//         }
//     },
//     socialNetwork: {
//         type: String,
//         maxlength: 100,
//     },
//     country: {
//         type: String,
//         required: [true, 'Country is required'],
//         minlength: 2,
//         maxlength: 50
//     },
//     city: {
//         type: String,
//         minlength: 2,
//         maxlength: 50
//     },
//     selectedService: {
//         type: String,
//         required: [true, 'Selected service is required'],
//         enum: ['Basic',
//             'Standard',
//             'Pro',
//             'Premium',
//             'Enterprise']
//     },
//     message: {
//         type: String,
//         maxlength: 2000
//     }
// });