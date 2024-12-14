import validationSchema from '/js/helpers/validate-form';
import { sendRequest } from '/js/api/api';
import showToast from '/js/helpers/show-toast';

export function initializeModalForm(showToast) {
    const form = document.getElementById('requestForm');
    const modalForm = document.getElementById('modalForm');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const formObj = Object.fromEntries(formData);

        const requiredFields = ['name', 'mobileNumber', 'email', 'country'];
        const emptyFields = requiredFields.filter((field) => !formObj[field]);

        if (emptyFields.length > 0) {
            emptyFields.forEach((field) => {
                console.log(`Field ${field} is empty.`);
                showToast(`Please fill the ${field} field.`, false);
            });
            return;
        }

        const selectedService = form.querySelector('input[name="selectedService"]:checked');
        // console.log('Selected service:', selectedService);

        if (!selectedService) {
            console.log('No service selected');
            showToast("Please select a service.", false);
            return;
        }

        try {
            await validationSchema.validate(formObj, { abortEarly: false });
            await sendRequest(formObj);
            showToast('Form submitted successfully!', true);

            form.reset();

            modalForm.classList.remove('modal-open');
            modalForm.innerHTML = '';
            document.body.style.overflow = '';
            document.body.style.pointerEvents = '';
        } catch (error) {
            console.error('Error submitting form:', error);

            if (error.inner) {
                error.inner.forEach((err) => {
                    console.log('Error message:', err.message);
                    showToast(err.message, false);
                });
            } else {
                console.log('Error message:', error.message);
                showToast(error.message, false);
            }
        }
    });
}
