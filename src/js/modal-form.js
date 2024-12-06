import validationSchema from '/js/validate-form';
import { sendRequest } from '/js/api/api';
import showToast from '/js/toastify';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

    const modalForm = document.getElementById('modalForm');
    const openModalBtns = document.querySelectorAll('#openModal');
    const closeModalBtn = document.createElement('button');

    closeModalBtn.textContent = 'Close';
    closeModalBtn.classList.add('close-modal-btn');

    const openModal = () => {
        modalForm.classList.add('modal-open');
        modalForm.innerHTML = `
      <div class="modal-content">
        <h2>Request Form</h2>
        <form id="requestForm">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
  
          <label for="mobileNumber">Mobile Number:</label>
          <input type="text" id="mobileNumber" name="mobileNumber" required>
  
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
  
          <label for="country">Country:</label>
          <input type="text" id="country" name="country" required>
  
          <label for="city">City:</label>
          <input type="text" id="city" name="city">
  
          <label for="selectedService">Service:</label>
          <select id="selectedService" name="selectedService" required>
            <option value="IOS-app-1">IOS-app-1</option>
            <option value="IOS-app-2">IOS-app-2</option>
            <option value="IOS-app-3">IOS-app-3</option>
            <option value="IOS-app-4">IOS-app-4</option>
            <option value="IOS-app-5">IOS-app-5</option>
            <option value="IOS-app-6">IOS-app-6</option>
          </select>
  
          <label for="socialNetwork">Social Network:</label>
          <input type="text" id="socialNetwork" name="socialNetwork">
  
          <label for="message">Message:</label>
          <textarea id="message" name="message"></textarea>
  
          <button type="submit">Submit</button>
        </form>
      </div>
    `;
        modalForm.appendChild(closeModalBtn);
        document.body.style.overflow = 'hidden';

        const form = document.getElementById('requestForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                console.log('Submit event triggered');
                e.preventDefault();
                const formData = new FormData(form);
                const formObj = Object.fromEntries(formData);
                console.log('Form data:', formObj);

                try {
                    await validationSchema.validate(formObj, { abortEarly: false });
                    const response = await sendRequest(formObj);
                    console.log('Form submitted successfully:', response);
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
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    closeModalBtn.addEventListener('click', closeModal);

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
