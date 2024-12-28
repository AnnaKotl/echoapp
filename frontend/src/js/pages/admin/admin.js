import showToast from '/js/helpers/show-toast';
import { fetchAdminRequests } from '/js/api/adminApi';

// 

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
  
    if (secret === import.meta.env.VITE_SECRET_KEY) {
      const requestsContainer = document.querySelector('.requests-list');
      const requests = await fetchAdminRequests();
  
      if (requests.length > 0) {
        requestsContainer.innerHTML = requests.map(req => `
          <div class="request-item">
            <p><strong>Name:</strong> ${req.name}</p>
            <p><strong>Email:</strong> ${req.email}</p>
            <p><strong>Mobile:</strong> ${req.mobileNumber || 'N/A'}</p>
            <p><strong>Country:</strong> ${req.country}</p>
            <p><strong>Social Network:</strong> ${req.socialNetwork || 'N/A'}</p>
            <p><strong>Service:</strong> ${req.selectedService}</p>
            <p><strong>Message:</strong> ${req.message || 'No message provided'}</p>
            <p><strong>Date:</strong> ${new Date(req.createdAt).toLocaleDateString()}</p>
          </div>
        `).join('');
      } else {
        requestsContainer.innerHTML = '<p>No requests found.</p>';
      }
    } else {
      window.location.href = '/';
    }
  });
  