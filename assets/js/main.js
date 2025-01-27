// Author Name: Noah Hamblen
// File Name: main.js
// Date: 1/18/25

// Get the hamburger elements
const hamburger_button = document.querySelector(".ham_menu"); // The hamburger button
const menu = document.querySelector(".off_screen_menu"); // The hamburger menu
const overlay = document.querySelector(".overlay"); // The overlay

// Toggle the hamburger menu
hamburger_button.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent the click from bubbling up
  menu.classList.toggle("active"); // Toggle the menu open/close class
  overlay.classList.toggle("active"); // Show/hide the overlay
  hamburger_button.classList.toggle("active"); // Toggle hamburger button animation
});

// Close the hamburger menu if clicked on the overlay
overlay.addEventListener("click", () => {
  menu.classList.remove("active");
  overlay.classList.remove("active");
  hamburger_button.classList.remove("active"); // Reset the hamburger animation
});

// Get modal and form elements
const modal = document.getElementById("thank_you_modal");
const closeModalBtn = document.getElementById("close_modal");
const form = document.getElementById("contact_form");

// Show the modal after form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Send form data using Fetch API
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
  })
    .then((response) => {
      if (response.ok) {
        modal.style.display = "flex"; // Show modal
        form.reset(); // Clear form fields
      } else {
        alert(
          "There was an issue sending your message. Please try again later."
        );
      }
    })
    .catch(() => {
      modal.style.display = "flex"; // Show modal even if there’s an error
      form.reset();
    });
});

// Close the modal when the close button is clicked
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none"; // Hide modal
});

// Close the modal if the user clicks outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
