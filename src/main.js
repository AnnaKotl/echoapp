import '/js/home-page';
import '/js/config';
import '/js/api/api';
import './js/scroll-to-top';
import './js/modal-form';

// 🖼️ Modal open
import validationSchema from './js/validate-form';
import { sendRequest } from './js/api/api';
import showToast from './js/toastify';
import './js/modal-form';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');  // LOG ----------------------------- > DELETE after DEV
  const form = document.getElementById('requestForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      console.log('Submit event triggered');  // LOG ----------------------------- > DELETE after DEV
      e.preventDefault();
      const formData = new FormData(form);
      const formObj = Object.fromEntries(formData);

      try {
        await validationSchema.validate(formObj, { abortEarly: false });
        const response = await sendRequest(formObj);
        console.log('Form submitted successfully:', response);
        showToast('Form submitted successfully!', true);
      } catch (error) {
        console.error('Error submitting form:', error);
        showToast(error.message, false);
      }
    });
  }
});
// 🖼️ /

// TEST 1
// import { fetchIcons, uploadImage } from '/js/api/api';
// async function init() {
//   // GET icons
//   const icons = await fetchIcons();
//   console.log('Fetched icons:', icons);  // LOG ----------------------------- > DELETE after DEV
// init();

// TEST 2
{/* <div id="icons-container"></div> */}
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
