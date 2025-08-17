import { fetchAdminRequests, deleteAdminRequest } from '/js/api/adminApi.js';

document.addEventListener('DOMContentLoaded', () => {
  const viewBtn = document.querySelector('.btn-view-requests');
  const requestsContainer = document.querySelector('.requests-list');

  let isVisible = false;

  // Функція для форматування дати
  const formatDate = (req) => {
    // Використовуємо createdAt якщо є, інакше беремо дату з ObjectId
    const dateValue = req.createdAt ? new Date(req.createdAt) : req._id?.getTimestamp?.();
    if (!dateValue || isNaN(dateValue.getTime())) return 'Invalid date';
    return dateValue.toLocaleString();
  };

  const renderRequests = async () => {
    requestsContainer.innerHTML = '<p>Loading...</p>';

    try {
      const requests = await fetchAdminRequests();

      if (!requests || requests.length === 0) {
        requestsContainer.innerHTML = '<p>No requests found.</p>';
        return;
      }

      const ul = document.createElement('ul');

      requests.forEach(req => {
        const li = document.createElement('li');
        li.dataset.id = req._id;

        const div = document.createElement('div');

        const fields = [
          `Name: ${req.name}`,
          `Email: ${req.email}`,
          `Mobile: ${req.mobileNumber || 'N/A'}`,
          `Country: ${req.country}`,
          `Social Network: ${req.socialNetwork || 'N/A'}`,
          `Service: ${req.selectedService}`,
          `Message: ${req.message || 'No message provided'}`,
          `Date: ${formatDate(req)}`
        ];

        fields.forEach(text => {
          const p = document.createElement('p');
          p.textContent = text;
          div.appendChild(p);
        });

        // Кнопка видалення/архівації
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', async () => {
          const confirmed = confirm('Are you sure you want to delete this request?');
          if (!confirmed) return;

          const success = await deleteAdminRequest(req._id);
          if (success) li.remove();
          else alert('Failed to delete request.');
        });

        div.appendChild(deleteBtn);
        li.appendChild(div);
        ul.appendChild(li);
      });

      requestsContainer.innerHTML = '';
      requestsContainer.appendChild(ul);

    } catch (err) {
      console.error('Failed to load requests:', err);
      requestsContainer.innerHTML = '<p>Error loading requests.</p>';
    }
  };

  viewBtn.addEventListener('click', async () => {
    if (!isVisible) {
      await renderRequests();
      viewBtn.textContent = 'Hide requests';
    } else {
      requestsContainer.innerHTML = '';
      viewBtn.textContent = 'View requests';
    }
    isVisible = !isVisible;
  });
});
