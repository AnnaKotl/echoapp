const API_URL = '/admin/requests';
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export async function fetchAdminRequests() {
  const res = await fetch('/admin/requests', {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_SECRET_KEY}`
    }
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
}

// export async function fetchAdminRequests() {
//   try {
//     const response = await fetch(API_URL, {
//       headers: {
//         'Authorization': `Bearer ${SECRET_KEY}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Unauthorized or failed fetch');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }