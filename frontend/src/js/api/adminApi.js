import API_URL from '/js/helpers/config';

const sessionAdminKey = 'adminToken';

const getAuthHeader = () => ({
  'Authorization': `Bearer ${sessionStorage.getItem(sessionAdminKey) || ''}`
});

// 📩 Requests
export async function fetchAdminRequests() {
  const response = await fetch(`${API_URL}/admin/requests`, {
    headers: getAuthHeader()
  });
  if (!response.ok) throw new Error('Auth error or fetch failed');
  return await response.json();
}

export async function deleteAdminRequest(id) {
  const response = await fetch(`${API_URL}/admin/requests/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  if (!response.ok) throw new Error('Delete failed');
  return true;
}

// 🩻 Upload Icon
export async function uploadIcon(file) {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${API_URL}/upload`, { 
      method: 'POST', 
      body: formData,
      headers: getAuthHeader()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message || 'Upload failed');
    return result.imageUrl;
  } catch (err) {
    console.error('Failed to upload icon:', err);
    throw err;
  }
}
