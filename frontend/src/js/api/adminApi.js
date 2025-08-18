import API_URL from '/js/helpers/config';

const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET;

// 📩 Requests
export async function fetchAdminRequests() {
  try {
    const response = await fetch(`${API_URL}/admin/requests`, {
      headers: { 'Authorization': `Bearer ${ADMIN_SECRET}` }
    });
    if (!response.ok) throw new Error('Auth error or fetch failed');
    return await response.json();
  } catch (error) {
    console.error('Failed to load requests:', error);
    throw error;
  }
}

export async function deleteAdminRequest(id) {
  try {
    const response = await fetch(`${API_URL}/admin/requests/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${ADMIN_SECRET}` }
    });
    if (!response.ok) throw new Error('Delete failed');
    return true;
  } catch (err) {
    console.error('Failed to delete request:', err);
    return false;
  }
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
