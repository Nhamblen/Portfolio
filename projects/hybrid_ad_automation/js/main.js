// Author Name: Noah Hamblen
// File Name: main.js

let currentCardIndex = 0;
let cardsArray = [];

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("image_lightbox");
  const carousel = document.getElementById("project_carousel");
  const leftBtn = document.getElementById("scroll_left_btn");
  const rightBtn = document.getElementById("scroll_right_btn");

  cardsArray = Array.from(document.querySelectorAll(".carousel_card"));

  // Main Page Carousel Controls
  if (carousel && leftBtn && rightBtn) {
    leftBtn.addEventListener("click", (e) => {
      e.preventDefault();
      carousel.scrollBy({ left: -360, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", (e) => {
      e.preventDefault();
      carousel.scrollBy({ left: 360, behavior: "smooth" });
    });
  }

  // Single card click handler targeting index tracking
  cardsArray.forEach((card, index) => {
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightboxIndex(index);
    });
  });
});

// Render dynamic card content in Lightbox by index
function openLightboxIndex(index) {
  const modal = document.getElementById("image_lightbox");
  const modalImg = document.getElementById("lightbox_img");
  const captionText = document.getElementById("lightbox_caption");

  if (!cardsArray.length) return;

  // Wrap around index boundaries
  if (index < 0) {
    currentCardIndex = cardsArray.length - 1;
  } else if (index >= cardsArray.length) {
    currentCardIndex = 0;
  } else {
    currentCardIndex = index;
  }

  const selectedCard = cardsArray[currentCardIndex];
  const img = selectedCard.querySelector("img");
  const title = selectedCard.querySelector("h4")
    ? selectedCard.querySelector("h4").innerText
    : "";
  const desc = selectedCard.querySelector("p")
    ? selectedCard.querySelector("p").innerText
    : "";

  if (img && modal) {
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = `<strong>${title}</strong><br>${desc}`;
  }
}

// Navigate Lightbox Next/Prev
function navigateLightbox(event, direction) {
  if (event) event.stopPropagation();
  openLightboxIndex(currentCardIndex + direction);
}

// Close Lightbox
function closeLightbox() {
  const modal = document.getElementById("image_lightbox");
  if (modal) {
    modal.style.display = "none";
  }
}

// Keyboard navigation (Escape, Left Arrow, Right Arrow)
document.addEventListener("keydown", (event) => {
  const modal = document.getElementById("image_lightbox");
  if (modal && modal.style.display === "block") {
    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      navigateLightbox(null, -1);
    } else if (event.key === "ArrowRight") {
      navigateLightbox(null, 1);
    }
  }
});
