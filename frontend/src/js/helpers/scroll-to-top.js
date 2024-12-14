document.addEventListener('DOMContentLoaded', () => {
  const scrollButton = document.getElementById('scroll-button');

  const toggleScrollButton = () => {
    if (window.scrollY > 2000) {
      scrollButton.classList.add('visible');
      scrollButton.classList.remove('hidden');
    } else {
      scrollButton.classList.add('hidden');
      scrollButton.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleScrollButton);

  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  const scrollLink = document.querySelector('.hero-scroll-link');

  scrollLink.addEventListener('click', (event) => {
    event.preventDefault();

    const targetSection = document.querySelector(scrollLink.getAttribute('href'));

    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth',
    });

    scrollLink.blur();
  });
});
