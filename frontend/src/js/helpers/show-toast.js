import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const showToast = (message, isSuccess = true) => {
  Toastify({
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