const API_URL = import.meta.env.DEV
  ? 'http://localhost:5001/admin/requests'
  : '/admin/requests';

console.log('VITE_ADMIN_SECRET:', import.meta.env.VITE_ADMIN_SECRET);

export async function fetchAdminRequests() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_SECRET}`,
      },
    });

    console.log('Status:', response.status);
    console.log('Response text:', await response.clone().text());

    if (!response.ok) {
      throw new Error('Auth error or fetch failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to load requests:', error);
    throw error;
  }
}

export async function deleteAdminRequest(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_SECRET}`,
      },
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }
    return true;
  } catch (err) {
    console.error('Failed to delete request:', err);
    return false;
  }
}
