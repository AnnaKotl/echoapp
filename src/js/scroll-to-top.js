document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopButton = document.getElementById("scrollToTop");
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1000) {
        scrollToTopButton.classList.add("show");
        scrollToTopButton.classList.remove("hide");
      } else {
        scrollToTopButton.classList.add("hide");
        scrollToTopButton.classList.remove("show");
      }
    });
  
    scrollToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });
  