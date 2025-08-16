import { fetchAdminRequests } from '/js/api/adminApi.js';

document.addEventListener('DOMContentLoaded', async () => {
  const requestsContainer = document.querySelector('.requests-list');

  try {
    const requests = await fetchAdminRequests();
    requestsContainer.innerHTML = requests.length
      ? requests.map(r => `<p>${r.name} (${r.email})</p>`).join('')
      : '<p>No requests</p>';
  } catch (err) {
    console.error('Auth error or fetch failed:', err);
    if (err.message.includes('401')) {
      window.location.href = '/';
    }
  }
});

// document.addEventListener('DOMContentLoaded', async () => {
//   const requestsContainer = document.querySelector('.requests-list');

//   try {
//     const requests = await fetchAdminRequests();

//     if (requests.length > 0) {
//       requestsContainer.innerHTML = requests.map(req => `
//         <div class="request-item">
//           <p><strong>Name:</strong> ${req.name}</p>
//           <p><strong>Email:</strong> ${req.email}</p>
//           <p><strong>Mobile:</strong> ${req.mobileNumber || 'N/A'}</p>
//           <p><strong>Country:</strong> ${req.country}</p>
//           <p><strong>Social Network:</strong> ${req.socialNetwork || 'N/A'}</p>
//           <p><strong>Service:</strong> ${req.selectedService}</p>
//           <p><strong>Message:</strong> ${req.message || 'No message provided'}</p>
//           <p><strong>Date:</strong> ${new Date(req.createdAt).toLocaleDateString()}</p>
//         </div>
//       `).join('');
//     } else {
//       requestsContainer.innerHTML = '<p>No requests found.</p>';
//     }
//   } catch (error) {
//     window.location.href = '/';
//   }
// });
