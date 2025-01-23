// Author Name: Noah Hamblen
// File Name: main.js
// Date: 1/18/25

// Get the elements
const hamburgerButton = document.querySelector(".ham_menu"); // The hamburger button
const menu = document.querySelector(".off_screen_menu"); // The hamburger menu
const overlay = document.querySelector(".overlay"); // The overlay

// Toggle the hamburger menu
hamburgerButton.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent the click from bubbling up
  menu.classList.toggle("active"); // Toggle the menu open/close class
  overlay.classList.toggle("active"); // Show/hide the overlay
  hamburgerButton.classList.toggle("active"); // Toggle hamburger button animation
});

// Close the hamburger menu if clicked on the menu or overlay
menu.addEventListener("click", () => {
  menu.classList.remove("active");
  overlay.classList.remove("active");
  hamburgerButton.classList.remove("active"); // Reset the hamburger animation
});

overlay.addEventListener("click", () => {
  menu.classList.remove("active");
  overlay.classList.remove("active");
  hamburgerButton.classList.remove("active"); // Reset the hamburger animation
});

// Close the hamburger menu if clicked outside of the menu, button, and overlay
document.addEventListener("click", (event) => {
  if (
    !menu.contains(event.target) &&
    !hamburgerButton.contains(event.target) &&
    !overlay.contains(event.target)
  ) {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    hamburgerButton.classList.remove("active"); // Reset the hamburger animation
  }
});
