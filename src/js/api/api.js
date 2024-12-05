import API_URL from '/js/config';

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

// export async function uploadImage(imageFile) {
//   const formData = new FormData();
//   formData.append('image', imageFile);

//   const response = await fetch(`${API_URL}/upload`, {
//     method: 'POST',
//     body: formData,
//   });

//   if (response.ok) {
//     const data = await response.json();
//     console.log('Image uploaded successfully:', data.imageUrl);
//     return data.imageUrl;
//   } else {
//     console.error('Image upload failed');
//     return null;
//   }
// }
