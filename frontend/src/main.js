// HELPERS global uses import
import '/js/helpers/scroll-to-top';
import '/js/helpers/config';

// PARTIALS global uses import
import '/js/partials/header';

// NPM global uses import
import 'toastify-js/src/toastify.css';

// © Footer config
document.getElementById("year").textContent = new Date().getFullYear();

// VIDEO in home-page
document.addEventListener('DOMContentLoaded', () => {
  const videoBased = document.getElementById('video-based');
  const videoTeam = document.getElementById('video-team');

  function disableVideo(video) {
    if (!video) return;
    video.pause();
    video.removeAttribute('autoplay');
    video.removeAttribute('loop');
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
