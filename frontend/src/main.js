import '/js/home-page';
import '/js/config';
import './js/scroll-to-top';
import './js/products';
import { sendRequest, fetchServices } from './js/api/api';

// 🖼️ Modal imports
import validationSchema from './js/validate-form';
import './js/modal-form';

// 💸 PRICES impors
import './js/prices';

// TOAST 🍞 
import { toast } from 'toastify-js';
import 'toastify-js/src/toastify.css';
const showToast = (message, isSuccess = true) => {
  console.log('Inside showToast function', message);
  console.log('Toast message:', message);
  toast({
    text: message,
    className: isSuccess ? 'toast toast-success' : 'toast toast-error',
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'center',
    stopOnFocus: true,
  }).showToast();
};
export default showToast;
// 🍞 /

// init DOM
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('requestForm');

  // 🖼️ Modal open
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('requestForm');

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
  });
  // 🖼️ /

  // 💸 PRICES
  fetchServices();
  // 💸 /
});


// TEST 1
// import { fetchIcons, uploadImage } from '/js/api/api';
// async function init() {
//   // GET icons
//   const icons = await fetchIcons();
//   console.log('Fetched icons:', icons);  // LOG ----------------------------- > DELETE after DEV
// init();

// TEST 2
{/* <div id="icons-container"></div> */ }
// import { fetchIcons } from '/js/api/api';
// async function init() {
//   const icons = await fetchIcons();
//   console.log('Fetched icons:', icons);  // LOG ----------------------------- > DELETE after DEV
//   const iconsContainer = document.getElementById('icons-container');
//   icons.forEach(icon => {
//     const imgElement = document.createElement('img');
//     imgElement.src = icon.url;
//     imgElement.alt = `Icon: ${icon.id}`;
//     iconsContainer.appendChild(imgElement);
//   });
// }
// init();
