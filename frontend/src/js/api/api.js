import API_URL from '/js/helpers/config';
import { renderServices } from '/js/pages/home/prices';

// 🖇️ CACHE & Local Storage
const CACHE_EXPIRY_TIME = 60 * 60 * 1000;
function getCachedData(key) {
  const cachedData = localStorage.getItem(key);
  const cachedTime = localStorage.getItem(`${key}_time`);
  
  if (cachedData && cachedTime) {
    const elapsedTime = Date.now() - Number(cachedTime);
    if (elapsedTime < CACHE_EXPIRY_TIME) {
      return JSON.parse(cachedData);
    } else {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}_time`);
    }
  }
  return null;
}
function setCachedData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(`${key}_time`, Date.now());
}
export function clearCache(key) {
  localStorage.removeItem(key);
  localStorage.removeItem(`${key}_time`);
}
// 🖇️ /

// 💎 Get Icons from backend
export async function fetchIcons() {
  try {
    const response = await fetch(`${API_URL}/icons`);
    if (!response.ok) {
      throw new Error('Failed to fetch icons');
    }
    const data = await response.json();
    setCachedData('icons', data.icons); // cache
    return data.icons;
  } catch (error) {
    console.error('Error fetching icons:', error);
    return [];
  }
}
// 💎 /

// 🖼️ Modal request to backend
export const sendRequest = async (data) => {
  try {
    // console.log('Sending data:', data);
    const response = await fetch(`${API_URL}/submit-request`, {
      method: 'POST',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit the form');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
// 🖼️ /

// 💸 GET prices
export async function fetchServices() {
  try {
    const response = await fetch(`${API_URL}/services`);
    if (!response.ok) {
      throw new Error(`Error fetching services: ${response.statusText} (${response.status})`);
    }
    const services = await response.json();
    setCachedData('services', services); // cache
    renderServices(services);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    const container = document.querySelector('.prices-list');
    if (container) {
      container.innerHTML = `<p class="error-message">Error loading services: ${error.message}</p>`;
    }
  }
}
// 💸 /

// 🩻 Import IMG from backend
export async function uploadImage(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    credentials: 'include', 
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Image uploaded successfully:', data.imageUrl);
    return data.imageUrl;
  } else {
    console.error('Image upload failed');
    return null;
  }
}
// 🩻 /

// 🎆 Import Products Icons from CLOUDINARY
export async function fetchProductIcons() {
  try {
    const response = await fetch(`${API_URL}/products-icons`);
    if (!response.ok) {
      throw new Error('Failed to fetch product icons');
    }
    const { icons } = await response.json();
    setCachedData('productIcons', icons); // cache
    return icons;
  } catch (error) {
    console.error('Error fetching product icons:', error);
    return [];
  }
}
// 🎆 /

// Clear CACHE 🖇️
export function clearAllCaches() {
  clearCache('icons');
  clearCache('services');
  clearCache('productIcons');
}