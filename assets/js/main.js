// Author Name: Noah Hamblen
// File Name: main.js
// Date: 1/18/25

const hamMenu = document.querySelector(".ham_menu");
const offScreenMenu = document.querySelector(".off_screen_menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});
