// import Swiper from 'swiper';
// import 'swiper/css';

document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".productsSwiper", {
      effect: "cards",
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 800,
        disableOnInteraction: false,
      },
    });
  });
  