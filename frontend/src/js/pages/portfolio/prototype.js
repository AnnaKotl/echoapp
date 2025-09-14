document.addEventListener('DOMContentLoaded', () => {
  const prototypeSection = document.querySelector('.portfolio-pages-section.lazy-section');
  if (!prototypeSection) return;

  const figmaIframe = prototypeSection.querySelector('.figma-prototype');
  if (!figmaIframe) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!figmaIframe.dataset.src) {
          figmaIframe.dataset.src = figmaIframe.src;
          figmaIframe.src = figmaIframe.dataset.src;
        }
        observer.unobserve(prototypeSection);
      }
    });
  }, { rootMargin: '300px 0px', threshold: 0.1 });

  observer.observe(prototypeSection);
});
