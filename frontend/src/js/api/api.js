import API_URL from '/js/config';
import { renderServices } from '/js/prices';

// 💎 Get Icons from backend
export async function fetchIcons() {
  try {
    const response = await fetch(`${API_URL}/icons`);
    if (!response.ok) {
      throw new Error('Failed to fetch icons');
    }
    const data = await response.json();
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
    console.log('Sending data:', data);  // LOG ----------------------------- > DELETE after DEV
    const response = await fetch(`${API_URL}/submit-request`, {
      method: 'POST',
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
    renderServices(services);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    const container = document.querySelector('.prices-list');
    if (container) {
      container.innerHTML = `<p>Error loading services: ${error.message}</p>`;
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
    return icons;
  } catch (error) {
    console.error('Error fetching product icons:', error);
    return [];
  }
}
// 🎆 /