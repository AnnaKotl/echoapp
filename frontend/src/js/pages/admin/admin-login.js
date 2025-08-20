import API_URL from '/js/helpers/config';

const sessionAdminKey = 'adminToken';
const loginForm = document.getElementById('admin-login-form');
const passwordInput = document.getElementById('admin-password');
const loginError = document.getElementById('login-error');
const adminContent = document.getElementById('admin-content');
const loginContainer = document.getElementById('admin-login-container');

export const getAuthHeader = () => ({
  'Authorization': `Bearer ${sessionStorage.getItem(sessionAdminKey) || ''}`
});

export function initAdminLogin() {
  if (sessionStorage.getItem(sessionAdminKey)) {
    showAdminContent();
  }

  function showAdminContent() {
    loginContainer.style.display = 'none';
    adminContent.style.display = 'block';

    import('./admin-requests.js').then(({ initAdminRequests }) => initAdminRequests());
    import('./admin-upload.js').then(({ initAdminUpload }) => initAdminUpload());
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = passwordInput.value.trim();
    if (!password) return;

    try {
      const response = await fetch(`${API_URL}/pages/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) throw new Error('Invalid password');

      const { token } = await response.json();
      sessionStorage.setItem(sessionAdminKey, token);

      showAdminContent();
    } catch (err) {
      loginError.style.display = 'block';
      loginError.textContent = '🚫 Invalid password';
      console.error('Admin login failed:', err);
    }
  });
}

