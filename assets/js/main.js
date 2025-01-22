// Author Name: Noah Hamblen
// File Name: main.js
// Date: 1/18/25

function toggleMenu() {
  const menu = document.querySelector(".ham_menu");
  const offScreenMenu = document.querySelector(".off_screen_menu");
  const overlay = document.querySelector(".overlay"); // Select overlay

  menu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
  overlay.classList.toggle("active"); // Toggle overlay visibility
}
