import API_URL from '/js/config';

async function fetchIcons() {
  try {
    const response = await fetch(`${API_URL}/icons`);
    if (!response.ok) {
      throw new Error('Failed to fetch icons');
    }
    const data = await response.json();
    console.log(data.icons);
    return data.icons;
  } catch (error) {
    console.error(error);
    return [];
  }
}