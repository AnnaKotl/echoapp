// HELPERS global uses import
import '/js/helpers/scroll-to-top';
import '/js/helpers/config';

// PARTIALS global uses import
import '/js/partials/header';

// NPM global uses import
import 'toastify-js/src/toastify.css';

// 🛡️ Global Error Handling
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise rejection:', event.reason);
});

// © Footer config
document.getElementById("year").textContent = new Date().getFullYear();

// VIDEO in home-page 🎥
document.addEventListener('DOMContentLoaded', () => {
  const videoBased = document.getElementById('video-based');
  const videoTeam = document.getElementById('video-team');

  function disableVideo(video) {
    if (!video) return;
    video.pause();
    video.removeAttribute('autoplay');
    video.removeAttribute('loop');
    video.removeAttribute('src');
    video.setAttribute('preload', 'none');
    video.currentTime = 0;
    video.style.display = 'none';
  }

  // TEAM → <1224px
  if (window.innerWidth < 1224) {
    disableVideo(videoTeam);
  }

  // BASED → <768px
  if (window.innerWidth < 768) {
    disableVideo(videoBased);
  }

  // Lazy load video when section appears
  const lazyLoadVideo = (videoId, src) => {
    const video = document.getElementById(videoId);
    if (!video) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!video.querySelector('source')) {
            const source = document.createElement('source');
            source.src = src;
            source.type = 'video/mp4';
            video.appendChild(source);
          }
          video.style.display = 'block';
          video.load();
          video.play().catch(() => {});
          obs.disconnect();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(video);
  };

  lazyLoadVideo('video-based', '/videos/video-ios-bg.mp4');
  lazyLoadVideo('video-team', '/videos/video-team-bg.mp4');

  // Pause when tab inactive
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      videoBased?.pause();
      videoTeam?.pause();
    }
  });

  window.addEventListener('pagehide', () => {
    videoBased?.pause();
    videoTeam?.pause();
  });
});

