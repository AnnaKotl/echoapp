document.addEventListener('DOMContentLoaded', () => {

  const scrollButton = document.getElementById('scroll-button');

  if (scrollButton) {
    const toggleScrollButton = () => {
      if (window.scrollY > 1000) {
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
  }

  const scrollLinks = document.querySelectorAll('.js-scroll-link');

  if (scrollLinks.length > 0) {
    scrollLinks.forEach((scrollLink) => {
      scrollLink.addEventListener('click', (event) => {
        event.preventDefault();

        const targetSelector = scrollLink.getAttribute('href');
        const targetSection = document.querySelector(targetSelector);

        if (targetSection) {
          const sectionTop = targetSection.offsetTop;
          const sectionHeight = targetSection.offsetHeight;
          const windowHeight = window.innerHeight;

          const scrollPosition = sectionTop + sectionHeight / 2 - windowHeight / 2;

          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
          });
        }

        scrollLink.blur();
      });
    });
  }

});
