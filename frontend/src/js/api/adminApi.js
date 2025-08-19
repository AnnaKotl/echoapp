import API_URL from '/js/helpers/config';

const params = new URLSearchParams(window.location.search);
const ADMIN_SECRET = params.get('secret') || sessionStorage.getItem('adminSecret');

if (ADMIN_SECRET) sessionStorage.setItem('adminSecret', ADMIN_SECRET);

// 📩 Requests
export async function fetchAdminRequests() {
  const response = await fetch(`${API_URL}/admin/requests`, {
    headers: { 'Authorization': `Bearer ${ADMIN_SECRET}` }
  });
  if (!response.ok) throw new Error('Auth error or fetch failed');
  return await response.json();
}

export async function deleteAdminRequest(id) {
  const response = await fetch(`${API_URL}/admin/requests/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${ADMIN_SECRET}` }
  });
  if (!response.ok) throw new Error('Delete failed');
  return true;
}

// 🩻 Upload Icon
export async function uploadIcon(file) {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
    const result = await response.json();
    if (!result.success) throw new Error(result.message || 'Upload failed');
    return result.imageUrl;
  } catch (err) {
    console.error('Failed to upload icon:', err);
    throw err;
  }
}
