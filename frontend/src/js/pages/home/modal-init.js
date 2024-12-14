import validationSchema from '/js/helpers/validate-form';
import { sendRequest } from '/js/api/api';

export function initializeModalForm(showToast) {
    const form = document.getElementById('requestForm');

    if (!form) return;

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
            await sendRequest(formObj);
            showToast('Form submitted successfully!', true);
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