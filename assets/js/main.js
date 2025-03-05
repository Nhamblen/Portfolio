// Author Name: Noah Hamblen
// File Name: main.js

// Enables strict mode to catch common coding mistakes and prevent the use of potentially unsafe features.
"use strict";

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

// Updates the year for footer
document.getElementById("year").textContent = new Date().getFullYear();

//
// JavaScript for contact.html (manipulating form)
//

// Ensure the elements exist before adding event listeners
const modal = document.getElementById("thank_you_modal");
const closeModalBtn = document.getElementById("close_modal");
const form = document.getElementById("contact_form");

if (form && modal && closeModalBtn) {
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
}

//
// JavaScript for resume.html (manipulating resume)
//

// Get button and iframe elements
const button = document.getElementById("toggle_resume");
const resumeFrame = document.getElementById("resume");

if (button && resumeFrame) {
  window.onload = function () {
    let isWebDevResume = true; // Tracks the current resume state

    // Add event listener for the button click
    button.addEventListener("click", function () {
      if (isWebDevResume) {
        resumeFrame.src = "../pdf/noah_hamblen_portfolio_resume2.pdf"; // IT Resume
        button.textContent = "Web Development Resume";
        button.classList.toggle("expanded"); // Toggle the expanded class for button
      } else {
        resumeFrame.src = "../pdf/noah_hamblen_portfolio_resume1.pdf"; // Web Dev Resume
        button.textContent = "IT Resume";
        button.classList.remove("expanded"); // Remove the expanded class for button
      }

      isWebDevResume = !isWebDevResume; // Toggle state
    });
  };
}

//
// JavaScript for projects.html (sorting projects)
//

const sortDropdown = document.getElementById("sort_projects");

if (sortDropdown) {
  window.onload = function () {
    const projectsGrid = document.querySelector(".projects_grid");
    const projectItems = Array.from(
      projectsGrid.querySelectorAll(".project_item")
    );

    if (sortDropdown && projectsGrid && projectItems) {
      sortDropdown.addEventListener("change", function () {
        sortProjects(sortDropdown.value);
      });

      function sortProjects(order) {
        const sortedItems = projectItems.sort((a, b) => {
          const dateA = new Date(a.getAttribute("data-date"));
          const dateB = new Date(b.getAttribute("data-date"));
          return order === "new" ? dateB - dateA : dateA - dateB;
        });

        projectsGrid.innerHTML = "";
        sortedItems.forEach((item) => projectsGrid.appendChild(item));
      }
    }
  };
}
