document.addEventListener('DOMContentLoaded', () => {
  // if (window.innerWidth < 787) return;

  const heroSection = document.querySelector('.cleaning-hero-section');
  const heroLeft = document.querySelector('.hero-pictures-wrapp-left');
  const heroRight = document.querySelector('.hero-pictures-wrapp-right');
  const heroEllipses = ['.bg-ellipse-1', '.bg-ellipse-2'].map(sel => document.querySelector(sel));

  const ideaSection = document.querySelector('.idea-section');
  const ideaLeft = document.querySelector('.idea-pictures-1-wrapp');
  const ideaRight = document.querySelector('.idea-pictures-2-wrapp');
  const ideaEllipses = ['.idea-bg-ellipse-1', '.idea-bg-ellipse-2'].map(sel => document.querySelector(sel));
  const ideaShadows = [
    document.querySelector('.shadow-left-1'),
    document.querySelector('.shadow-left-2'),
    document.querySelector('.shadow-right-1')
  ];

  const phoneTick = (leftEl, rightEl, duration = 400, amplitude = 6) => {
    if (!leftEl || !rightEl) return;
    leftEl.style.transition = `transform ${duration}ms ease-in-out`;
    rightEl.style.transition = `transform ${duration}ms ease-in-out ${duration / 4}ms`;
    leftEl.style.transform = `translateX(${amplitude}px)`;
    rightEl.style.transform = `translateX(-${amplitude}px)`;
    setTimeout(() => {
      leftEl.style.transform = 'translateX(0)';
      rightEl.style.transform = 'translateX(0)';
    }, duration + duration / 4);
  };

  const showEllipses = ellipses => {
    ellipses.forEach(el => {
      if (!el) return;
      el.style.transition = 'opacity 2s ease-in-out, transform 1s ease-in-out';
      el.style.opacity = '1';
      if (el.classList.contains('bg-ellipse-1')) {
        el.style.transform = 'translateX(-50%) scale(1)';
        el.style.transformOrigin = 'center center';
      } else {
        el.style.transform = 'scale(1)';
        el.style.transformOrigin = 'center center';
      }
      if (el.classList.contains('idea-bg-ellipse-1') || el.classList.contains('idea-bg-ellipse-2')) {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.7)';
        requestAnimationFrame(() => {
          el.style.transition = 'opacity 2s ease-out, transform 1.2s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'scale(1)';
        });
      }
    });
  };

  const animateHero = () => {
    phoneTick(heroLeft, heroRight, 400);
    setTimeout(() => {
      showEllipses(heroEllipses);
    }, 250);
  };

  const animateIdea = () => {
    const images = ideaSection.querySelectorAll('img');
    const loaded = Array.from(images).every(img => img.complete);
    if (!loaded) {
      images.forEach(img => {
        if (!img.complete) img.addEventListener('load', () => animateIdea());
      });
      return;
    }
    ideaShadows.forEach(sh => { if (sh) sh.style.opacity = '0'; });
    ideaEllipses.forEach(el => { if (el) el.style.opacity = '0'; });
    phoneTick(ideaLeft, ideaRight, 400);
    setTimeout(() => {
      ideaShadows.forEach(sh => { if (sh) { sh.style.transition = 'opacity 0.8s ease-in-out'; sh.style.opacity = '1'; } });
      showEllipses(ideaEllipses);
    }, 250);
  };

  window.addEventListener('load', () => { animateHero(); });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateIdea();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  if (ideaSection) observer.observe(ideaSection);

  const hoverTick = (leftEl, rightEl) => {
    if (!leftEl || !rightEl) return;
    phoneTick(leftEl, rightEl, 250, 4);
  };

  [heroLeft, heroRight].forEach(el => {
    if (!el) return;
    el.addEventListener('mouseenter', () => hoverTick(heroLeft, heroRight));
  });

  [ideaLeft, ideaRight].forEach(el => {
    if (!el) return;
    el.addEventListener('mouseenter', () => hoverTick(ideaLeft, ideaRight));
  });
});
