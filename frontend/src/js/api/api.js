import API_URL from '/js/helpers/config';
import { renderServices } from '/js/pages/home/prices';

// 🖇️ CACHE & Local Storage
const CACHE_EXPIRY_TIME = 60 * 60 * 1000;
const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB limit

function getCacheSize() {
  let size = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      size += localStorage[key].length + key.length;
    }
  }
  return size;
}

function getCachedData(key) {
  try {
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
  } catch (error) {
    console.error('Cache retrieval error:', error);
    return null;
  }
}

function setCachedData(key, data) {
  try {
    const currentSize = getCacheSize();
    const dataSize = JSON.stringify(data).length;
    
    if (currentSize + dataSize > MAX_CACHE_SIZE) {
      const keys = Object.keys(localStorage).filter(k => k.endsWith('_time'));
      keys.sort((a, b) => localStorage[a] - localStorage[b]);
      for (let i = 0; i < Math.ceil(keys.length / 2); i++) {
        const keyToDelete = keys[i].replace('_time', '');
        localStorage.removeItem(keyToDelete);
        localStorage.removeItem(keys[i]);
      }
    }
    
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`${key}_time`, Date.now());
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.warn('localStorage limit exceeded, clearing cache');
      clearAllCaches();
    }
  }
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
    const response = await fetch(`${API_URL}/submit-request`, {
      method: 'POST',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: Failed to submit the form`);
    }

    return await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(message);
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
    setCachedData('services', services);
    renderServices(services);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const container = document.querySelector('.prices-list');
    if (container) {
      const errorEl = document.createElement('p');
      errorEl.className = 'error-message';
      errorEl.textContent = `Error loading services: ${message}`;
      container.textContent = '';
      container.appendChild(errorEl);
    }
  }
}
// 💸 /

// 🩻 Import IMG from backend
export async function uploadImage(imageFile) {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      credentials: 'include', 
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Image upload failed';
    throw new Error(message);
  }
}
// 🩻 /

// 🎆 Import Products Icons from CLOUDINARY
export async function fetchProductIcons() {
  try {
    const response = await fetch(`${API_URL}/products-icons`);
    if (!response.ok) throw new Error('Failed to fetch product icons');
    
    const { icons } = await response.json();

    const validIcons = icons
      .filter(icon => icon.url && icon.url.trim() !== '')
      .map(icon => ({
        ...icon,
        url: icon.url.replace(/\.(svg|png|jpg|jpeg)$/, '.webp')
      }));

    setCachedData('productIcons', validIcons);
    return validIcons;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(message);
  }
}

export async function fetchCachedProductIcons() {
  const cached = getCachedData('productIcons');
  if (cached) return cached;

  const icons = await fetchProductIcons();
  return icons;
}
// 🎆 /

// Clear CACHE 🖇️
export function clearAllCaches() {
  clearCache('icons');
  clearCache('services');
  clearCache('productIcons');
}