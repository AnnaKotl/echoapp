const API_URL = '/admin/requests';
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export async function fetchAdminRequests() {
  try {
    const response = await fetch(`${API_URL}?secret=${SECRET_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch admin requests');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching requests:', error);
    return [];
  }
}
