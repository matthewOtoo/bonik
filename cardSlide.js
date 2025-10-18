// === Mobile-Only Card Slide (No extra CSS required) ===

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".booking_container");
  const cards = document.querySelectorAll(".booking_container .card");
  let currentIndex = 0;

  // Helper: check if it's mobile view
  function isMobile() {
    return window.innerWidth < 1200;
  }

  // Initial setup (stack cards on mobile)
  function setupCards() {
    if (isMobile()) {
      // stack cards on top of each other
      container.style.position = "relative";
      container.style.overflow = "hidden";

      // find height of one card for container
      const cardHeight = cards[0].offsetHeight;
      container.style.height = `${cardHeight}px`;

      cards.forEach((card, i) => {
        card.style.position = "absolute";
        card.style.top = "0";
        card.style.left = "0";
        card.style.right = "0";
        card.style.width = "100%";
        card.style.transition = "transform 0.6s ease, opacity 0.6s ease";

        if (i === 0) {
          card.style.opacity = "1";
          card.style.transform = "translateX(0)";
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateX(100%)";
        }
      });
    } else {
      // reset all inline styles for desktop
      container.style.position = "";
      container.style.overflow = "";
      container.style.height = "";

      cards.forEach((card) => {
        card.style.position = "";
        card.style.top = "";
        card.style.left = "";
        card.style.right = "";
        card.style.width = "";
        card.style.transform = "";
        card.style.opacity = "";
        card.style.transition = "";
      });
    }
  }

  setupCards();

  // Function to slide to the next card
  function showNextCard() {
    if (!isMobile()) return;

    const nextIndex = (currentIndex + 1) % cards.length;

    // current card slides left
    cards[currentIndex].style.transform = "translateX(-100%)";
    cards[currentIndex].style.opacity = "0";

    // next card slides in
    cards[nextIndex].style.transform = "translateX(0)";
    cards[nextIndex].style.opacity = "1";

    // do NOT reset the old card immediately; keep it off-screen until next hover
    currentIndex = nextIndex;
  }

  // Trigger slide on hover or tap
  container.addEventListener("mouseenter", showNextCard);
  container.addEventListener("click", showNextCard);

  // Re-check layout when window is resized
  window.addEventListener("resize", setupCards);
});
