import { fetchAdminRequests, deleteAdminRequest } from '/js/api/adminApi.js';

document.addEventListener('DOMContentLoaded', () => {
  const viewBtn = document.querySelector('.btn-view-requests');
  const requestsContainer = document.querySelector('.requests-list');

  viewBtn.addEventListener('click', async () => {
    requestsContainer.innerHTML = '<p>Loading...</p>';
    const requests = await fetchAdminRequests();

    if (requests.length === 0) {
      requestsContainer.innerHTML = '<p>No requests found.</p>';
      return;
    }

    requestsContainer.innerHTML = requests.map(req => `
      <div class="a-from-wrapper" data-id="${req._id}">
        <div class="a-form-item"><strong>Name:</strong> ${req.name}</div>
        <div class="a-form-item"><strong>Email:</strong> ${req.email}</div>
        <div class="a-form-item"><strong>Mobile:</strong> ${req.mobileNumber || 'N/A'}</div>
        <div class="a-form-item"><strong>Country:</strong> ${req.country}</div>
        <div class="a-form-item"><strong>Social Network:</strong> ${req.socialNetwork || 'N/A'}</div>
        <div class="a-form-item"><strong>Service:</strong> ${req.selectedService}</div>
        <div class="a-form-item"><strong>Message:</strong> ${req.message || 'No message provided'}</div>
        <div class="a-form-item"><strong>Date:</strong> ${new Date(req.createdAt).toLocaleDateString()}</div>
        <button class="btn-delete-request">Delete</button>
      </div>
    `).join('');

    // додаємо обробку видалення
    requestsContainer.querySelectorAll('.btn-delete-request').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const wrapper = e.target.closest('.a-from-wrapper');
        const id = wrapper.dataset.id;
        const confirmed = confirm('Are you sure you want to delete this request?');
        if (!confirmed) return;

        const success = await deleteAdminRequest(id);
        if (success) {
          wrapper.remove();
        } else {
          alert('Failed to delete request.');
        }
      });
    });
  });
});
