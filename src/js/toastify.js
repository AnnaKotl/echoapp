const showToast = (message, isSuccess = true) => {
  const toast = document.createElement('div');
  toast.classList.add('toast', isSuccess ? 'toast-success' : 'toast-error');
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};

export default showToast;