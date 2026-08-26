// Author Name: Noah Hamblen
// File Name: main.js

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("image_lightbox");
  const modalImg = document.getElementById("lightbox_img");
  const captionText = document.getElementById("lightbox_caption");
  const cards = document.querySelectorAll(".carousel_card");

  // Attach click listener to every carousel card
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Prevent child elements from blocking the click event
      e.stopPropagation();

      const img = card.querySelector("img");
      const title = card.querySelector("h4")
        ? card.querySelector("h4").innerText
        : "";
      const desc = card.querySelector("p")
        ? card.querySelector("p").innerText
        : "";

      if (img && modal) {
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerHTML = `<strong>${title}</strong><br>${desc}`;
      }
    });
  });
});

// Close Lightbox
function closeLightbox() {
  const modal = document.getElementById("image_lightbox");
  if (modal) {
    modal.style.display = "none";
  }
}

// Close on Escape key press
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
