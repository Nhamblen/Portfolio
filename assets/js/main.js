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

// Close the hamburger menu if clicked on the overlay
overlay.addEventListener("click", () => {
  menu.classList.remove("active");
  overlay.classList.remove("active");
  hamburgerButton.classList.remove("active"); // Reset the hamburger animation
});

// Retrieves current URL
const url = window.location.href;

// Check if the URL contains ".html" and remove it in the URL
if (url.includes(".html")) {
  const cleanUrl = url.replace(".html", "");
  window.history.replaceState({}, document.title, cleanUrl);
}
