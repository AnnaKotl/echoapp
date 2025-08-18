import { fetchAdminRequests, deleteAdminRequest } from '/js/api/adminApi.js';
import moment from 'moment';

const initAdminRequests = () => {
  const viewBtn = document.querySelector('.admin-btn-requests');
  const requestsContainer = document.querySelector('.admin-requests-list');
  let isVisible = false;

  const formatDate = (createdAt) => {
    if (!createdAt) return 'Invalid date';
    const d = new Date(createdAt);
    return isNaN(d.getTime()) ? 'Invalid date' : moment(d).format('YYYY-MM-DD HH:mm:ss');
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const createFieldElement = (label, value) => {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = label + ':';
    strong.classList.add('a-field-label');
    p.appendChild(strong);
    const span = document.createElement('span');
    span.textContent = ' ' + value;
    span.style.fontWeight = 'normal';
    p.appendChild(span);
    return p;
  };

  const createRequestItem = (req, index) => {
    const li = document.createElement('li');
    li.dataset.id = req._id;
    li.classList.add('a-requests-item');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('a-btn-delete-request');
    deleteBtn.addEventListener('click', async () => {
      if (!confirm('Are you sure you want to delete this request?')) return;
      if (await deleteAdminRequest(req._id)) li.remove();
      else alert('Failed to delete request.');
    });
    li.appendChild(deleteBtn);

    const div = document.createElement('div');
    div.classList.add('a-requests-wrapper');

    const fields = [
      { label: 'Name', value: req.name },
      { label: 'Email', value: req.email },
      { label: 'Mobile', value: req.mobileNumber || 'N/A' },
      { label: 'Country', value: req.country },
      { label: 'Social Network', value: req.socialNetwork || 'N/A' },
      { label: 'Service', value: req.selectedService },
      { label: 'Message', value: req.message || 'No message provided' },
      { label: 'Date', value: formatDate(req.createdAt) }
    ];
    fields.forEach(f => div.appendChild(createFieldElement(f.label, f.value)));

    li.appendChild(div);
    li.style.opacity = 0;
    li.style.transform = 'translateY(20px)';
    setTimeout(() => {
      li.style.transition = 'all 0.4s ease';
      li.style.opacity = 1;
      li.style.transform = 'translateY(0)';
    }, index * 50);

    return li;
  };

  const renderRequests = async () => {
    requestsContainer.innerHTML = '<p>Loading...</p>';
    await delay(200);

    const requests = await fetchAdminRequests();
    if (!requests || requests.length === 0) {
      requestsContainer.innerHTML = '<p>No requests found.</p>';
      return;
    }

    requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const ul = document.createElement('ul');
    ul.classList.add('a-requests-items');
    requests.forEach((req, index) => ul.appendChild(createRequestItem(req, index)));

    requestsContainer.innerHTML = '';
    requestsContainer.appendChild(ul);
  };

  viewBtn.addEventListener('click', async () => {
    if (!isVisible) {
      await renderRequests();
      viewBtn.textContent = 'Hide requests';
    } else {
      const items = requestsContainer.querySelectorAll('.a-requests-item');
      items.forEach((li, index) => {
        setTimeout(() => {
          li.style.opacity = 0;
          li.style.transform = 'translateY(20px)';
          setTimeout(() => li.remove(), 300);
        }, index * 50);
      });
      viewBtn.textContent = 'View requests';
    }
    isVisible = !isVisible;
  });
};

export { initAdminRequests };