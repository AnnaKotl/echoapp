import { fetchIcons } from '/js/api/api';

fetchIcons().then((icons) => {
  console.log('Loaded icons:', icons);
});