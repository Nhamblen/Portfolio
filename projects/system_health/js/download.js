// Author Name: Noah Hamblen
// File Name: download.js

// Enables strict mode to catch common coding mistakes and prevent the use of potentially unsafe features.
"use strict";

// Allows for fade in effect when scrolling on the download page
document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".main_box");

  const observerOptions = {
    threshold: 0.5, // Element must be 50% visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing after it becomes visible
      }
    });
  }, observerOptions);

  boxes.forEach((box) => {
    observer.observe(box);
  });
});
