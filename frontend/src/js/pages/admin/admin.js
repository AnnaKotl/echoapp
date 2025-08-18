// © Footer config
document.getElementById("year").textContent = new Date().getFullYear();

import { initAdminRequests } from './admin-requests.js';
import { initAdminUpload } from './admin-upload.js';

initAdminRequests();
initAdminUpload();