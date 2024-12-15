import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

export default function showToast(message, isSuccess = true) {
  Toastify({
    text: message,
    duration: 6000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: isSuccess ? "#20f3dd" : "##dc3545",
    },
    stopOnFocus: true,
  }).showToast();
}