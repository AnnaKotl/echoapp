// const API_URL = '/admin/requests';

const API_URL = 'http://localhost:5001/admin/requests'; 

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; 

export async function fetchAdminRequests() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Auth error or fetch failed');
    }

    const data = await response.json();
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    console.error('Failed to load requests:', err);
    return [];
  }
}

export async function deleteAdminRequest(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${SECRET_KEY}`,
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
