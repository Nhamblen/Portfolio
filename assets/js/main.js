// Author Name: Noah Hamblen
// File Name: main.js
// Date: 1/18/25

function toggleMenu() {
  const menu = document.querySelector(".ham_menu");
  const offScreenMenu = document.querySelector(".off_screen_menu");
  menu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
}
